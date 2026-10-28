// Sincronização em nuvem (FVS Obras - TERGOS).
//
// Este arquivo roda como módulo ES (type="module"), separado do script principal
// (clássico) do index.html. Os dois conversam através de `window`: o script
// principal expõe `window.db`, `window.saveDB`, `window.render` etc. (toda
// declaração `var`/`function` de nível superior num <script> clássico vira
// propriedade de window), e este módulo expõe `window.enviarFotoNuvem`,
// `window.buscarFotoNuvem`, `window.excluirFotoNuvem`, `window.fvsLogout`,
// `window.fvsLogado` e `window.statusSincronizacao` para o script principal usar.
//
// Design "local-first": se não houver internet, ou o Firebase não carregar por
// qualquer motivo, o app continua funcionando normalmente só com os dados locais
// (localStorage + IndexedDB) — a nuvem é um extra, nunca um bloqueio.

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  collection, collectionGroup, doc, setDoc, deleteDoc, onSnapshot, getFirestore, getDocs
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import {
  getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-storage.js";

(async function iniciarSincronizacaoNuvem(){
  let app, auth, firestoreDb, storage;
  try{
    app = initializeApp(window.FIREBASE_CONFIG);
    auth = getAuth(app);
    try{
      firestoreDb = initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      });
    }catch(e){
      firestoreDb = getFirestore(app); // sem cache offline (ex.: aba privada) — ainda funciona online
    }
    storage = getStorage(app);
  }catch(e){
    console.warn("Sincronização na nuvem não iniciou (sem internet ou Firebase indisponível). O app continua funcionando com os dados locais.", e);
    return;
  }

  // ---------- estado ----------
  let usuarioAtual = null;
  let desinscreverObras = null;
  let desinscreverPavimentos = null;
  let desinscreverAmbientes = null;
  let idsRemotosConhecidos = new Set();
  let pavimentosRemotosConhecidos = new Set();
  let ambientesRemotosConhecidos = new Set();
  let primeiroSnapObras = false, primeiroSnapPavimentos = false, primeiroSnapAmbientes = false;
  let verificacaoCompletaFeita = false;
  let timerSync = null;
  let estadoSync = "offline"; // offline | aguardando-login | sincronizado | sincronizando | erro

  window.fvsLogado = ()=> !!usuarioAtual;
  window.statusSincronizacao = ()=>{
    if(!usuarioAtual) return "Sem sincronização — entre com sua conta da equipe para sincronizar com os outros aparelhos.";
    if(!navigator.onLine) return "Sem internet no momento. As alterações serão enviadas quando a conexão voltar.";
    if(estadoSync === "sincronizando") return "Sincronizando com a nuvem...";
    if(estadoSync === "erro") return "Não foi possível sincronizar agora. Suas alterações continuam salvas neste aparelho.";
    return "Sincronizado com a equipe (" + usuarioAtual.email + ").";
  };

  // ---------- compressão de fotos (padrão "leve": até 2000px, JPEG 85%) ----------
  function comprimirImagem(arquivo){
    return new Promise((resolve)=>{
      const imgEl = new Image();
      const url = URL.createObjectURL(arquivo);
      imgEl.onload = ()=>{
        const MAX = 2000;
        let { width, height } = imgEl;
        if(width > MAX || height > MAX){
          const escala = MAX / Math.max(width, height);
          width = Math.round(width * escala);
          height = Math.round(height * escala);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(imgEl, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob)=>resolve(blob || arquivo), "image/jpeg", 0.85);
      };
      imgEl.onerror = ()=>{ URL.revokeObjectURL(url); resolve(arquivo); };
      imgEl.src = url;
    });
  }

  function caminhoFoto(obraId, shortId){
    return "obras/" + obraId + "/fotos/" + shortId + ".jpg";
  }

  window.enviarFotoNuvem = async function(obraId, shortId, arquivo){
    if(!usuarioAtual) return;
    const comprimida = await comprimirImagem(arquivo);
    await uploadBytes(storageRef(storage, caminhoFoto(obraId, shortId)), comprimida);
  };
  window.buscarFotoNuvem = async function(obraId, shortId){
    if(!usuarioAtual) return null;
    try{
      const url = await getDownloadURL(storageRef(storage, caminhoFoto(obraId, shortId)));
      const resp = await fetch(url);
      if(!resp.ok) throw new Error("fetch respondeu " + resp.status);
      return await resp.blob();
    }catch(e){
      console.warn("Falha ao buscar foto da nuvem:", obraId, shortId, e);
      return null;
    }
  };
  window.excluirFotoNuvem = async function(obraId, shortId){
    if(!usuarioAtual) return;
    try{ await deleteObject(storageRef(storage, caminhoFoto(obraId, shortId))); }catch(e){ /* já não existe */ }
  };

  // ---------- envio dos dados da obra ----------
  // Documento do Firestore tem limite de 1 MB. Mesmo UM pavimento sozinho pode passar
  // disso (prédios grandes, muitas unidades/ambientes). Por isso a divisão vai até o
  // nível de ambiente — três camadas de documentos:
  //   obras/{obraId}                                  → nome, endereço, fornecedores, foto
  //   obras/{obraId}/pavimentos/{pavId}                → nomes/estrutura (ambientes, unidades,
  //                                                       categorias), sem o conteúdo de FVS
  //   obras/{obraId}/ambientes/{ambId}                 → o conteúdo pesado: fvsList completa
  function cloneSeguro(obj){
    // remove undefined e qualquer coisa não serializável; Firestore não aceita "undefined".
    return JSON.parse(JSON.stringify(obj));
  }

  function semFvsList(amb){ const { fvsList, fvsRemovidas, ...resto } = amb; return resto; }

  // ---------- uso simultâneo em vários aparelhos ----------
  // Antes, cada salvamento reenviava a obra INTEIRA, com data "agora" em tudo. Um
  // aparelho com a tela aberta havia algum tempo (cópia desatualizada) apagava, ao
  // salvar, o que outro aparelho tinha lançado no meio-tempo. Agora:
  //  1) cada FVS tem sua própria data de alteração (atualizadoEm), carimbada só quando
  //     o conteúdo daquela FVS muda de fato;
  //  2) ao receber um ambiente da nuvem, as FVS são mescladas uma a uma — vence a mais
  //     recente, e uma FVS com edição ainda não salva neste aparelho nunca é trocada;
  //  3) só é enviado para a nuvem o documento que realmente mudou;
  //  4) FVS removidas deixam um registro (fvsRemovidas) para não "ressuscitarem".
  function jsonEstavel(v){
    if(v === null || v === undefined) return "null";
    if(typeof v !== "object") return JSON.stringify(v);
    if(Array.isArray(v)) return "[" + v.map(jsonEstavel).join(",") + "]";
    return "{" + Object.keys(v).filter(k=>v[k] !== undefined).sort()
      .map(k=>JSON.stringify(k) + ":" + jsonEstavel(v[k])).join(",") + "}";
  }
  function hashTexto(str){
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for(let i = 0; i < str.length; i++){
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  function semCarimbo(obj){ const { atualizadoEm, atualizadoPor, ...resto } = obj || {}; return resto; }
  function hashConteudo(obj){ return hashTexto(jsonEstavel(semCarimbo(obj))); }

  // Último conteúdo SALVO de cada FVS neste aparelho (persistido): permite saber se a
  // FVS mudou desde o último salvamento e em qual ambiente ela estava.
  const CHAVE_HASH_SALVO = "fvs_sync_hash_v1";
  let hashSalvo = null;
  try{ hashSalvo = JSON.parse(localStorage.getItem(CHAVE_HASH_SALVO) || "null"); }catch(e){ hashSalvo = null; }
  function persistirHashSalvo(){ try{ localStorage.setItem(CHAVE_HASH_SALVO, JSON.stringify(hashSalvo)); }catch(e){} }
  function percorrerAmbientes(fn){
    for(const obra of (window.db.obras || []))
      for(const pav of (obra.pavimentos || []))
        for(const amb of window.todosAmbientesDoPavimento(pav)) fn(obra, amb);
  }
  if(!hashSalvo){
    // primeira vez com esta versão: o estado atual vira a referência, SEM carimbar nada
    // (senão um aparelho desatualizado passaria a "ganhar" de todos os outros).
    hashSalvo = {};
    try{
      percorrerAmbientes((obra, amb)=> (amb.fvsList || []).forEach(f=>{
        if(f.instId) hashSalvo[f.instId] = { h: hashConteudo(f), a: obra.id + "/" + amb.id };
      }));
    }catch(e){ /* sem dados ainda */ }
    persistirHashSalvo();
  }
  function editadaSemSalvar(f){
    const reg = f && f.instId && hashSalvo[f.instId];
    return !!reg && reg.h !== hashConteudo(f);
  }

  // Roda a cada saveDB(): carimba as FVS que mudaram e registra as que foram removidas.
  function carimbarAlteracoes(){
    const agora = Date.now();
    const email = usuarioAtual ? usuarioAtual.email : null;
    const ambientesPorChave = {};
    const vistas = new Set();
    percorrerAmbientes((obra, amb)=>{
      const chave = obra.id + "/" + amb.id;
      ambientesPorChave[chave] = amb;
      (amb.fvsList || []).forEach(f=>{
        if(!f.instId) return;
        vistas.add(f.instId);
        const h = hashConteudo(f);
        const reg = hashSalvo[f.instId];
        if(!reg || reg.h !== h){
          f.atualizadoEm = agora;
          if(email) f.atualizadoPor = email;
        }
        hashSalvo[f.instId] = { h, a: chave };
      });
    });
    Object.keys(hashSalvo).forEach(id=>{
      if(vistas.has(id)) return;
      const amb = ambientesPorChave[hashSalvo[id].a];
      if(amb){ amb.fvsRemovidas = amb.fvsRemovidas || {}; amb.fvsRemovidas[id] = agora; }
      delete hashSalvo[id];
    });
    persistirHashSalvo();
  }

  function substituirConteudo(destino, origem){
    Object.keys(destino).forEach(k=>{ delete destino[k]; });
    Object.assign(destino, cloneSeguro(origem));
  }

  // Mescla um ambiente vindo da nuvem no ambiente local, FVS por FVS. Devolve true se o
  // resultado ficou diferente do que está na nuvem (ou seja, precisa reenviar).
  function mesclarAmbiente(obraId, local, remoto){
    const chave = obraId + "/" + local.id;
    const removidas = Object.assign({}, local.fvsRemovidas || {});
    Object.entries(remoto.fvsRemovidas || {}).forEach(([id, t])=>{ removidas[id] = Math.max(removidas[id] || 0, t || 0); });

    const locais = new Map((local.fvsList || []).filter(f=>f.instId).map(f=>[f.instId, f]));
    const remotas = new Map((remoto.fvsList || []).filter(f=>f.instId).map(f=>[f.instId, f]));
    const ids = [...remotas.keys(), ...[...locais.keys()].filter(id=>!remotas.has(id))];
    const resultado = [];
    for(const id of ids){
      const l = locais.get(id), r = remotas.get(id);
      const lPendente = l && editadaSemSalvar(l);
      let escolhida;
      if(l && r){
        if(lPendente || (l.atualizadoEm || 0) > (r.atualizadoEm || 0)) escolhida = l;
        else { substituirConteudo(l, r); escolhida = l; hashSalvo[id] = { h: hashConteudo(l), a: chave }; }
      } else if(l){
        escolhida = l;
      } else {
        escolhida = cloneSeguro(r);
        hashSalvo[id] = { h: hashConteudo(escolhida), a: chave };
      }
      const removidaEm = removidas[id];
      if(removidaEm && removidaEm >= (escolhida.atualizadoEm || 0) && !lPendente){
        delete hashSalvo[id];
        continue;
      }
      resultado.push(escolhida);
    }
    // FVS sem instId (não deveria existir) ficam como estão
    (local.fvsList || []).filter(f=>!f.instId).forEach(f=>resultado.push(f));

    if((remoto.atualizadoEm || 0) > (local.atualizadoEm || 0)){
      Object.keys(remoto).forEach(k=>{ if(k !== "fvsList" && k !== "fvsRemovidas") local[k] = cloneSeguro(remoto[k]); });
    }
    local.fvsList = resultado;
    if(Object.keys(removidas).length) local.fvsRemovidas = removidas;
    persistirHashSalvo();
    return hashConteudo(local) !== hashConteudo(remoto);
  }

  // O que a nuvem tem de cada documento (hash do conteúdo, sem as datas). Só envia o
  // que estiver diferente disso.
  const hashNuvem = {};

  function pavimentoLeve(pav){
    const limpo = cloneSeguro(pav);
    limpo.ambientes = (limpo.ambientes || []).map(semFvsList);
    (limpo.unidades || []).forEach(u=>{ u.ambientes = (u.ambientes || []).map(semFvsList); });
    (limpo.estrutura || []).forEach(c=>{ c.elementos = (c.elementos || []).map(semFvsList); });
    return limpo;
  }

  // Lista cada "slot" de foto da obra (obra.foto, obra.fotoCapa, cada foto de cada
  // verificação) com um jeito de ler e trocar aquele valor específico — permite
  // processar várias fotos ao mesmo tempo (em vez de uma por vez) mais abaixo.
  function listarSlotsDeImagem(obra){
    const alvos = [];
    if(obra.foto) alvos.push({ get: ()=>obra.foto, set: v=>{ obra.foto = v; } });
    if(obra.fotoCapa) alvos.push({ get: ()=>obra.fotoCapa, set: v=>{ obra.fotoCapa = v; } });
    for(const pav of obra.pavimentos || []){
      for(const amb of window.todosAmbientesDoPavimento(pav)){
        for(const f of amb.fvsList || []){
          for(const it of f.itens || []){
            if(it.foto){ it.fotos = [it.foto, ...(it.fotos || [])]; delete it.foto; }
            (it.fotos || []).forEach((_, i)=> alvos.push({ get: ()=>it.fotos[i], set: v=>{ it.fotos[i] = v; } }));
          }
        }
      }
    }
    return alvos;
  }

  // Processa até 5 fotos ao mesmo tempo (em vez de uma de cada vez) — acelera bastante
  // obras com muitas fotos, sem sobrecarregar o aparelho.
  async function processarComLimite(itens, limite, fn){
    let indice = 0;
    async function trabalhador(){
      while(indice < itens.length) await fn(itens[indice++]);
    }
    await Promise.all(Array.from({ length: Math.min(limite, itens.length) }, trabalhador));
  }

  // Garante que toda foto desta obra que existe neste aparelho (seja uma foto antiga,
  // de antes da sincronização, seja uma foto nova cujo envio em segundo plano falhou
  // silenciosamente — ex.: durante o período em que a regra do Storage ainda estava
  // errada) está de fato no Storage, comprimida. Ter o id da obra na referência NÃO
  // significa que o arquivo chegou a ser enviado com sucesso (o envio de foto nova é
  // "fire and forget"), então reenvia sempre que o arquivo original ainda existir
  // neste aparelho — reenviar algo que já está lá não tem custo real.
  async function garantirFotosNaNuvem(obra){
    let mudouReferencia = false;
    await processarComLimite(listarSlotsDeImagem(obra), 10, async (alvo)=>{
      const ref = alvo.get();
      if(!window.ehRefImagem(ref)) return;
      const [obraIdNaRef, shortId] = window.obraIdDaRef(ref);
      const obraIdAlvo = obraIdNaRef || obra.id;
      try{
        const arquivo = await window.lerImagemIdb(window.idDaRef(ref));
        if(!arquivo) return; // não existe neste aparelho — nada a fazer aqui
        const comprimida = await comprimirImagem(arquivo);
        await uploadBytes(storageRef(storage, "obras/" + obraIdAlvo + "/fotos/" + shortId + ".jpg"), comprimida);
        if(!obraIdNaRef){ mudouReferencia = true; alvo.set("img:" + obraIdAlvo + ":" + shortId); }
      }catch(e){ /* mantém a referência como estava, tenta de novo na próxima */ }
    });
    return mudouReferencia;
  }

  // Cada escrita (obra, cada pavimento, cada ambiente) tem seu próprio try/catch: uma
  // falha isolada (ex.: um ambiente específico grande demais) não pode travar o envio
  // de todo o resto, senão uma obra inteira fica presa esperando algo que nunca chega
  // a ser reenviado sozinho.
  async function enviarObra(obra){
    if(!usuarioAtual) return;
    estadoSync = "sincronizando";
    const falhas = [];
    const email = usuarioAtual.email;

    try{
      const obraLeve = cloneSeguro(obra);
      obraLeve.pavimentos = (obraLeve.pavimentos || []).map(p=>({ id: p.id, nome: p.nome }));
      const h = hashConteudo(obraLeve);
      if(hashNuvem["o/" + obra.id] !== h){
        obra.atualizadoEm = obraLeve.atualizadoEm = Date.now();
        obra.atualizadoPor = obraLeve.atualizadoPor = email;
        await setDoc(doc(firestoreDb, "obras", obra.id), obraLeve);
        hashNuvem["o/" + obra.id] = h;
      }
      idsRemotosConhecidos.add(obra.id);
    }catch(e){
      console.warn("Falha ao enviar obra:", obra.nome, e);
      falhas.push("obra \"" + obra.nome + "\": " + (e && e.code) + " — " + (e && e.message));
    }

    for(const pav of (obra.pavimentos || [])){
      try{
        const leve = pavimentoLeve(pav);
        const h = hashConteudo(leve);
        if(hashNuvem["p/" + obra.id + "/" + pav.id] !== h){
          pav.atualizadoEm = leve.atualizadoEm = Date.now();
          pav.atualizadoPor = leve.atualizadoPor = email;
          await setDoc(doc(firestoreDb, "obras", obra.id, "pavimentos", pav.id), leve);
          hashNuvem["p/" + obra.id + "/" + pav.id] = h;
        }
        pavimentosRemotosConhecidos.add(obra.id + "/" + pav.id);
      }catch(e){
        console.warn("Falha ao enviar pavimento:", pav.nome, e);
        falhas.push("pavimento \"" + pav.nome + "\": " + (e && e.code) + " — " + (e && e.message));
      }

      for(const amb of window.todosAmbientesDoPavimento(pav)){
        try{
          const copia = cloneSeguro(amb);
          const h = hashConteudo(copia);
          if(hashNuvem["a/" + obra.id + "/" + amb.id] !== h){
            amb.atualizadoEm = copia.atualizadoEm = Date.now();
            amb.atualizadoPor = copia.atualizadoPor = email;
            await setDoc(doc(firestoreDb, "obras", obra.id, "ambientes", amb.id), copia);
            hashNuvem["a/" + obra.id + "/" + amb.id] = h;
          }
          ambientesRemotosConhecidos.add(obra.id + "/" + amb.id);
        }catch(e){
          console.warn("Falha ao enviar ambiente:", amb.nome, e);
          falhas.push("ambiente \"" + (amb.nome || amb.id) + "\" (" + pav.nome + "): " + (e && e.code) + " — " + (e && e.message));
        }
      }
    }

    salvarLocal();
    estadoSync = falhas.length ? "erro" : "sincronizado";
    if(falhas.length){
      alert("Aviso de sincronização: " + falhas.length + " item(ns) não foram enviados para a nuvem agora.\n\n" + falhas.slice(0,5).join("\n\n") + (falhas.length>5 ? "\n\n(+" + (falhas.length-5) + " outros)" : "") + "\n\nOs dados continuam salvos neste aparelho. O resto foi enviado normalmente — tire um print e me mande se isso persistir.");
    }
  }

  async function enviarObras(obras){
    for(const obra of obras) await enviarObra(obra);
  }

  // Exclusão só acontece por ação explícita da pessoa (botão de lixeira), nunca por
  // comparação automática — isso já causou apagamento indevido de dados reais quando
  // um aparelho com visão incompleta achou, por engano, que algo "deveria" ser removido.
  window.excluirObraNuvem = async function(obraId, pavimentos){
    if(!usuarioAtual) return;
    idsRemotosConhecidos.delete(obraId);
    try{
      for(const pav of (pavimentos || [])){
        for(const ambId of (pav.ambienteIds || [])){
          await deleteDoc(doc(firestoreDb, "obras", obraId, "ambientes", ambId)).catch(()=>{});
          ambientesRemotosConhecidos.delete(obraId + "/" + ambId);
        }
        await deleteDoc(doc(firestoreDb, "obras", obraId, "pavimentos", pav.id)).catch(()=>{});
        pavimentosRemotosConhecidos.delete(obraId + "/" + pav.id);
      }
      await deleteDoc(doc(firestoreDb, "obras", obraId));
    }catch(e){ console.warn("Falha ao excluir obra na nuvem:", e); }
  };
  window.excluirPavimentoNuvem = async function(obraId, pav){
    if(!usuarioAtual) return;
    pavimentosRemotosConhecidos.delete(obraId + "/" + pav.id);
    try{
      for(const amb of window.todosAmbientesDoPavimento(pav)){
        await deleteDoc(doc(firestoreDb, "obras", obraId, "ambientes", amb.id)).catch(()=>{});
        ambientesRemotosConhecidos.delete(obraId + "/" + amb.id);
      }
      await deleteDoc(doc(firestoreDb, "obras", obraId, "pavimentos", pav.id));
    }catch(e){ console.warn("Falha ao excluir pavimento na nuvem:", e); }
  };

  // Só envia depois de receber o estado da nuvem (os três primeiros "snapshots"):
  // enviar antes disso poderia sobrescrever com uma cópia desatualizada deste aparelho.
  let envioPendente = false, enviando = false;
  function prontoParaEnviar(){ return primeiroSnapObras && primeiroSnapPavimentos && primeiroSnapAmbientes; }
  function agendarSincronizacao(){
    if(!usuarioAtual) return;
    clearTimeout(timerSync);
    timerSync = setTimeout(async ()=>{
      if(!prontoParaEnviar() || enviando){ envioPendente = true; return; }
      enviando = true; envioPendente = false;
      try{ await enviarObras(window.db.obras || []); }
      finally{
        enviando = false;
        if(envioPendente) agendarSincronizacao();
      }
    }, 800);
  }

  // A checagem de completude (tentarVerificacaoCompleta) só olha pavimentos/ambientes,
  // então uma obra com checklist já sincronizado mas com fotos antigas (sem id da obra
  // na referência) nunca aparece como "incompleta" e o envio nunca é disparado sozinho.
  // Isso roda uma vez por login, direto, sem depender de nada "parecer" faltando.
  let migracaoFotosFeita = false;
  async function tentarMigrarFotosAntigas(){
    if(migracaoFotosFeita) return;
    migracaoFotosFeita = true;
    for(const obra of (window.db.obras || [])){
      try{
        if(await garantirFotosNaNuvem(obra)){
          salvarComCarimbo(window.db);
        }
      }catch(e){ console.warn("Falha ao migrar fotos antigas da obra \"" + obra.nome + "\":", e); }
    }
  }

  function salvarLocal(){
    try{ localStorage.setItem("qualitab_obra_v1", JSON.stringify(window.db)); }catch(e){ /* ignora: já estava salvo localmente antes */ }
  }

  // Depois que os três listeners (obras/pavimentos/ambientes) entregaram sua primeira
  // leitura, confere se cada obra local está completa na nuvem — cobre tanto obras
  // criadas antes do login quanto tentativas anteriores que pararam no meio (ex.: por
  // causa de uma regra do Firestore desatualizada) sem precisar a pessoa mandar de
  // novo manualmente.
  // Depois que os três listeners entregaram a primeira leitura, envia o que este aparelho
  // tem de diferente da nuvem (obras criadas antes do login, envios que falharam, edições
  // feitas sem internet). O que já está igual na nuvem é pulado.
  function tentarVerificacaoCompleta(){
    if(verificacaoCompletaFeita || !prontoParaEnviar()) return;
    verificacaoCompletaFeita = true;
    agendarSincronizacao();
  }

  // Documentos que chegam antes do "pai" correspondente existir localmente (corrida
  // entre os três listeners) ficam guardados aqui até o pai aparecer.
  let pavimentosOrfaos = [];
  let ambientesOrfaos = [];
  function aplicarPavimentosOrfaos(obra){
    pavimentosOrfaos = pavimentosOrfaos.filter(orf=>{
      if(orf.obraId !== obra.id) return true;
      mesclarPavimentoLeve(obra, orf.pav);
      return false;
    });
  }
  function aplicarAmbientesOrfaos(obraId){
    ambientesOrfaos = ambientesOrfaos.filter(orf=>{
      if(orf.obraId !== obraId) return true; // de outra obra — mantém na fila, não é a vez dele ainda
      const obra = window.db.obras.find(o=>o.id === obraId);
      const alvo = obra && localizarAmbiente(obra, orf.amb.id);
      if(alvo){
        hashNuvem["a/" + obraId + "/" + orf.amb.id] = hashConteudo(orf.amb);
        if(mesclarAmbiente(obraId, alvo, orf.amb)) agendarSincronizacao();
        return false;
      } // aplicado — sai da fila
      return true; // o pavimento desse ambiente ainda não chegou — mantém na fila pra tentar de novo
    });
  }

  // Encontra um ambiente (direto, de unidade, ou elemento de estrutura) em qualquer
  // pavimento da obra, pelo id — usa o mesmo helper que o app principal já usa pra
  // listar ambientes de um pavimento (window.todosAmbientesDoPavimento).
  function localizarAmbiente(obra, ambId){
    for(const pav of (obra.pavimentos || [])){
      const achado = window.todosAmbientesDoPavimento(pav).find(a=>a.id === ambId);
      if(achado) return achado;
    }
    return null;
  }

  // Mescla uma lista "leve" de ambientes (sem fvsList) vinda da nuvem com a lista local,
  // preservando a fvsList já existente em cada ambiente local (que só chega pelo
  // listener de ambientes, não pelo de pavimento).
  function mesclarListaAmbientesLeve(locais, remotos){
    return (remotos || []).map(r=>{
      const existente = (locais || []).find(l=>l.id === r.id);
      return existente ? Object.assign(existente, { nome: r.nome }) : Object.assign({ fvsList: [] }, r);
    });
  }
  function mesclarPavimentoLeve(obra, remotoPav){
    let local = obra.pavimentos.find(p=>p.id === remotoPav.id);
    if(!local){ local = { id: remotoPav.id, ambientes:[], unidades:[], estrutura:[] }; obra.pavimentos.push(local); }
    local.nome = remotoPav.nome;
    local.ambientes = mesclarListaAmbientesLeve(local.ambientes, remotoPav.ambientes);
    local.unidades = (remotoPav.unidades || []).map(ru=>{
      const existente = (local.unidades || []).find(lu=>lu.id === ru.id) || { id: ru.id, ambientes: [] };
      existente.nome = ru.nome;
      existente.ambientes = mesclarListaAmbientesLeve(existente.ambientes, ru.ambientes);
      return existente;
    });
    local.estrutura = (remotoPav.estrutura || []).map(rc=>{
      const existente = (local.estrutura || []).find(lc=>lc.id === rc.id) || { id: rc.id, elementos: [] };
      existente.nome = rc.nome;
      existente.elementos = mesclarListaAmbientesLeve(existente.elementos, rc.elementos);
      return existente;
    });
    aplicarAmbientesOrfaos(obra.id);
    return local;
  }

  // Quando um aparelho novo recebe uma obra que nunca tinha visto, busca os pavimentos
  // e ambientes diretamente (em vez de depender da ordem de chegada dos três listeners
  // em tempo real, que pode variar) — garante que tudo chega completo de uma vez, sem
  // depender de fila de "órfãos".
  async function hidratarObraCompleta(obra){
    try{
      const pavsSnap = await getDocs(collection(firestoreDb, "obras", obra.id, "pavimentos"));
      pavsSnap.forEach(d=>{ pavimentosRemotosConhecidos.add(obra.id + "/" + d.id); hashNuvem["p/" + obra.id + "/" + d.id] = hashConteudo(d.data()); mesclarPavimentoLeve(obra, d.data()); });

      const ambsSnap = await getDocs(collection(firestoreDb, "obras", obra.id, "ambientes"));
      ambsSnap.forEach(d=>{
        ambientesRemotosConhecidos.add(obra.id + "/" + d.id);
        const alvo = localizarAmbiente(obra, d.id);
        hashNuvem["a/" + obra.id + "/" + d.id] = hashConteudo(d.data());
        if(alvo && mesclarAmbiente(obra.id, alvo, d.data())) agendarSincronizacao();
      });

      salvarLocal();
      if(typeof window.render === "function") window.render();
    }catch(e){
      console.warn("Falha ao carregar pavimentos/ambientes da obra \"" + obra.nome + "\":", e);
    }
  }

  // Escuta em tempo real: qualquer alteração feita por outro aparelho chega aqui.
  function iniciarEscuta(){
    if(desinscreverObras) return;

    desinscreverObras = onSnapshot(collection(firestoreDb, "obras"), (snapshot)=>{
      let mudouLocal = false;
      snapshot.docChanges().forEach((mudanca)=>{
        const remota = mudanca.doc.data();
        if(mudanca.type === "removed"){
          idsRemotosConhecidos.delete(remota.id);
          const obraRemovida = window.db.obras.find(o=>o.id === remota.id);
          const antes = window.db.obras.length;
          window.db.obras = window.db.obras.filter(o=>o.id !== remota.id);
          if(window.db.obras.length !== antes){
            mudouLocal = true;
            alert("Aviso de sincronização: a obra \"" + (obraRemovida ? obraRemovida.nome : remota.id) + "\" foi removida da nuvem (por este ou outro aparelho) e por isso saiu da lista aqui também.\n\nSe você não excluiu essa obra de propósito, tire um print desta mensagem e me mande.");
          }
          return;
        }
        idsRemotosConhecidos.add(remota.id);
        hashNuvem["o/" + remota.id] = hashConteudo(remota);
        let local = window.db.obras.find(o=>o.id === remota.id);
        if(!local){
          local = Object.assign({}, remota, { pavimentos: [] });
          (remota.pavimentos || []).forEach(p=> local.pavimentos.push({ id: p.id, nome: p.nome, ambientes: [], unidades: [], estrutura: [] }));
          window.db.obras.push(local);
          aplicarPavimentosOrfaos(local);
          hidratarObraCompleta(local);
          mudouLocal = true;
        } else if((remota.atualizadoEm || 0) > (local.atualizadoEm || 0)){
          // Só atualiza um campo se ele REALMENTE veio no documento remoto. Um campo
          // ausente lá (ex.: um aparelho que nunca teve a foto e salvou outra coisa)
          // não pode apagar o valor que já existia aqui — isso já causou a foto de
          // capa e a logo da obra sumirem sem ninguém ter mexido nelas.
          ["nome","endereco","foto","fotoCapa","fotoCapaPos","fornecedores","ifcStoreyMap"].forEach(campo=>{
            if(remota[campo] !== undefined) local[campo] = remota[campo];
          });
          local.atualizadoEm = remota.atualizadoEm;
          local.atualizadoPor = remota.atualizadoPor;
          // conteúdo de cada pavimento (ambientes etc.) só chega pelos listeners de
          // pavimentos/ambientes — aqui só garante que a LISTA de pavimentos (nomes/ordem)
          // bate com a nuvem, sem apagar o que já tínhamos de cada um.
          local.pavimentos = (remota.pavimentos || []).map(p=>{
            const existente = local.pavimentos.find(lp=>lp.id === p.id);
            return existente ? Object.assign(existente, { nome: p.nome }) : { id: p.id, nome: p.nome, ambientes: [], unidades: [], estrutura: [] };
          });
          mudouLocal = true;
        }
      });

      if(mudouLocal){ salvarLocal(); if(typeof window.render === "function") window.render(); }
      estadoSync = "sincronizado";
      primeiroSnapObras = true;
      tentarVerificacaoCompleta();
      tentarMigrarFotosAntigas();
    }, (erro)=>{
      console.warn("Escuta da nuvem interrompida:", erro);
      estadoSync = "erro";
    });

    desinscreverPavimentos = onSnapshot(collectionGroup(firestoreDb, "pavimentos"), (snapshot)=>{
      let mudouLocal = false;
      snapshot.docChanges().forEach((mudanca)=>{
        const remotoPav = mudanca.doc.data();
        const obraId = mudanca.doc.ref.parent.parent.id;
        const chave = obraId + "/" + remotoPav.id;
        const obra = window.db.obras.find(o=>o.id === obraId);

        if(mudanca.type === "removed"){
          pavimentosRemotosConhecidos.delete(chave);
          if(obra){
            const antes = obra.pavimentos.length;
            obra.pavimentos = obra.pavimentos.filter(p=>p.id !== remotoPav.id);
            if(obra.pavimentos.length !== antes) mudouLocal = true;
          }
          return;
        }
        pavimentosRemotosConhecidos.add(chave);
        hashNuvem["p/" + chave] = hashConteudo(remotoPav);
        if(!obra){ pavimentosOrfaos.push({ obraId, pav: remotoPav }); return; }
        const localPav = obra.pavimentos.find(p=>p.id === remotoPav.id);
        if(!localPav || (remotoPav.atualizadoEm || 0) > (localPav.atualizadoEm || 0)){
          mesclarPavimentoLeve(obra, remotoPav);
          mudouLocal = true;
        }
      });
      if(mudouLocal){ salvarLocal(); if(typeof window.render === "function") window.render(); }
      primeiroSnapPavimentos = true;
      tentarVerificacaoCompleta();
    }, (erro)=>{
      console.warn("Escuta de pavimentos interrompida:", erro);
    });

    desinscreverAmbientes = onSnapshot(collectionGroup(firestoreDb, "ambientes"), (snapshot)=>{
      let mudouLocal = false, precisaReenviar = false;
      snapshot.docChanges().forEach((mudanca)=>{
        const remotoAmb = mudanca.doc.data();
        const obraId = mudanca.doc.ref.parent.parent.id;
        const chave = obraId + "/" + remotoAmb.id;
        const obra = window.db.obras.find(o=>o.id === obraId);

        if(mudanca.type === "removed"){
          ambientesRemotosConhecidos.delete(chave);
          return; // a remoção do ambiente acontece junto com a do pavimento/obra que o contém
        }
        ambientesRemotosConhecidos.add(chave);
        if(!obra){ ambientesOrfaos.push({ obraId, amb: remotoAmb }); return; }
        const local = localizarAmbiente(obra, remotoAmb.id);
        if(!local){ ambientesOrfaos.push({ obraId, amb: remotoAmb }); return; }
        hashNuvem["a/" + obraId + "/" + remotoAmb.id] = hashConteudo(remotoAmb);
        const antes = hashConteudo(local);
        if(mesclarAmbiente(obraId, local, remotoAmb)) precisaReenviar = true;
        if(hashConteudo(local) !== antes) mudouLocal = true;
      });
      if(mudouLocal){ salvarLocal(); if(typeof window.render === "function") window.render(); }
      if(precisaReenviar) agendarSincronizacao();
      primeiroSnapAmbientes = true;
      tentarVerificacaoCompleta();
    }, (erro)=>{
      console.warn("Escuta de ambientes interrompida:", erro);
    });
  }

  function pararEscuta(){
    if(desinscreverObras){ desinscreverObras(); desinscreverObras = null; }
    if(desinscreverPavimentos){ desinscreverPavimentos(); desinscreverPavimentos = null; }
    if(desinscreverAmbientes){ desinscreverAmbientes(); desinscreverAmbientes = null; }
    idsRemotosConhecidos = new Set();
    pavimentosRemotosConhecidos = new Set();
    ambientesRemotosConhecidos = new Set();
    pavimentosOrfaos = [];
    ambientesOrfaos = [];
    primeiroSnapObras = false;
    primeiroSnapPavimentos = false;
    primeiroSnapAmbientes = false;
    verificacaoCompletaFeita = false;
    migracaoFotosFeita = false;
    envioPendente = false;
    Object.keys(hashNuvem).forEach(k=>{ delete hashNuvem[k]; });
  }

  // ---------- tela de login ----------
  function traduzirErroAuth(codigo){
    switch(codigo){
      case "auth/invalid-email": return "E-mail inválido.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential": return "E-mail ou senha incorretos.";
      case "auth/too-many-requests": return "Muitas tentativas. Aguarde um pouco e tente de novo.";
      case "auth/network-request-failed": return "Sem conexão com a internet. Verifique sua rede.";
      default: return "Não foi possível entrar. Tente novamente.";
    }
  }

  function injetarEstilos(){
    if(document.getElementById("fvs-sync-estilos")) return;
    const style = document.createElement("style");
    style.id = "fvs-sync-estilos";
    style.textContent = `
      #fvs-login-overlay{position:fixed;inset:0;background:#38384a;display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;}
      #fvs-login-overlay .caixa{background:#fff;border-radius:16px;padding:28px 24px;max-width:340px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,.3);}
      #fvs-login-overlay h1{font-size:18px;margin:0 0 4px;color:#38384a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
      #fvs-login-overlay p.sub{font-size:13px;color:#878791;margin:0 0 18px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
      #fvs-login-overlay label{font-size:13px;color:#878791;font-weight:600;display:block;margin-top:12px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
      #fvs-login-overlay input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #e6e2d6;border-radius:8px;font-size:15px;margin-top:4px;font-family:inherit;}
      #fvs-login-overlay button{width:100%;margin-top:18px;padding:12px;border:none;border-radius:8px;background:#e5736e;color:#fff;font-size:15px;font-weight:600;cursor:pointer;}
      #fvs-login-overlay button:disabled{opacity:.6;}
      #fvs-login-overlay .erro{color:#c85850;font-size:13px;margin-top:10px;min-height:16px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
    `;
    document.head.appendChild(style);
  }

  function mostrarLogin(){
    injetarEstilos();
    if(document.getElementById("fvs-login-overlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "fvs-login-overlay";
    overlay.innerHTML = `
      <div class="caixa">
        <h1>FVS Obras — TERGOS</h1>
        <p class="sub">Entre com a conta da equipe para sincronizar com todos os aparelhos.</p>
        <form id="fvs-login-form">
          <label>E-mail</label>
          <input type="email" id="fvs-login-email" autocomplete="username" required>
          <label>Senha</label>
          <input type="password" id="fvs-login-senha" autocomplete="current-password" required>
          <div class="erro" id="fvs-login-erro"></div>
          <button type="submit" id="fvs-login-btn">Entrar</button>
        </form>
      </div>`;
    document.body.appendChild(overlay);
    const form = document.getElementById("fvs-login-form");
    const btn = document.getElementById("fvs-login-btn");
    const erroEl = document.getElementById("fvs-login-erro");
    form.onsubmit = async (ev)=>{
      ev.preventDefault();
      erroEl.textContent = "";
      btn.disabled = true; btn.textContent = "Entrando...";
      const email = document.getElementById("fvs-login-email").value.trim();
      const senha = document.getElementById("fvs-login-senha").value;
      try{
        await signInWithEmailAndPassword(auth, email, senha);
      }catch(e){
        erroEl.textContent = traduzirErroAuth(e.code);
        btn.disabled = false; btn.textContent = "Entrar";
      }
    };
  }

  function esconderLogin(){
    const overlay = document.getElementById("fvs-login-overlay");
    if(overlay) overlay.remove();
  }

  window.fvsLogout = function(){ signOut(auth).catch(()=>{}); };

  // ---------- liga tudo ----------
  onAuthStateChanged(auth, (usuario)=>{
    usuarioAtual = usuario;
    if(usuario){
      esconderLogin();
      iniciarEscuta();
    } else {
      pararEscuta();
      mostrarLogin();
    }
    if(typeof window.render === "function") window.render();
  });

  // Ponto único: toda chamada a saveDB() (usada em ~40 lugares do app) passa a também
  // agendar o envio para a nuvem, sem precisar mexer em cada lugar separadamente.
  const saveDBOriginal = window.saveDB;
  function salvarComCarimbo(dbObj){
    try{ carimbarAlteracoes(); }catch(e){ console.warn("Falha ao registrar alterações:", e); }
    const ok = saveDBOriginal(dbObj);
    if(ok) agendarSincronizacao();
    return ok;
  }
  window.saveDB = salvarComCarimbo;
})();
