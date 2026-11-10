# FVS Obras — TERGOS · Registro do projeto

**Atualizado em:** 10/11/2026
**Objetivo deste documento:** guardar tudo o que já foi feito na ferramenta de Fichas de Verificação de Serviço (FVS) da Tergos, como ela funciona, onde está cada coisa e o que ainda está pendente, para retomar o trabalho sem perder contexto.

> Este registro complementa o arquivo `documentos/HISTORICO_PROJETO.md` que existe dentro do repositório. Aquele cobre a origem do projeto e as fases de julho a outubro de 2026 com mais detalhe técnico.

---

## 1. Endereços e acessos

| O quê | Onde |
|---|---|
| **App (endereço oficial)** | `https://obras.tergosconstrutora.com.br` |
| App (endereço provisório, redireciona para o oficial) | `https://tergos-construtora.github.io/fvs-obras-tergos/` |
| Endereço antigo (desativado em 26/10/2026) | ~~`izabelamaira.github.io/fvs-obras-tergos`~~ |
| **Código do app (GitHub)** | `https://github.com/tergos-construtora/fvs-obras-tergos` |
| **Banco de dados, fotos e login (Firebase)** | `https://console.firebase.google.com` → projeto **FVS OBRAS TERGOS** (ID `fvs-obras-tergos`) |
| Faturamento e Cloud Shell (Google Cloud) | `https://console.cloud.google.com` → projeto **FVS OBRAS TERGOS** |

**Contas**

- **GitHub:** organização **`tergos-construtora`**, dona do repositório. Proprietárias da organização: conta **`tergosconstrutora`** (conta da empresa) e conta **`izabelamaira`** (pode sair depois, desde que a `tergosconstrutora` continue como proprietária).
- **2FA do GitHub:** ativado na conta `tergosconstrutora` em 28/10/2026 (aplicativo autenticador + chave de acesso). **Códigos de recuperação guardados** em local seguro da empresa.
- **Login no app:** e-mail e senha cadastrados em Firebase → Authentication. Contas da equipe: `obra4@tergosconstrutora.com.br`, `obra5@tergosconstrutora.com.br` (e outras @tergosconstrutora.com.br, se as regras abaixo estiverem com a versão por domínio).
- **Plano do Firebase:** Blaze (pago por uso). Conta de pagamentos em **pós-pagamento**: a cobrança é feita no dia 1º de cada mês, ou antes se o saldo chegar a R$ 200 (limite definido pelo Google, não é mensalidade). Para o porte de uso atual, o gasto esperado é perto de zero.

---

## 2. Como a ferramenta funciona

### Partes do sistema

| Parte | O que guarda | Onde fica |
|---|---|---|
| **GitHub Pages** | O "programa": telas, botões, catálogo de FVS | Repositório `tergos-construtora/fvs-obras-tergos` |
| **Firestore** (Firebase) | Os dados: obras, pavimentos, ambientes/elementos, FVS, status, observações, fornecedores | Coleção `obras/{obraId}`, com subcoleções `pavimentos` e `ambientes` |
| **Storage** (Firebase) | As fotos das verificações | `obras/{obraId}/fotos/{id}.jpg` |
| **Authentication** (Firebase) | Login da equipe (e-mail e senha) | Firebase → Authentication |
| **Navegador de cada aparelho** | Cópia local dos dados e das fotos, para funcionar sem internet | `localStorage` e IndexedDB |

**Princípio "local primeiro":** o app sempre salva primeiro no aparelho e, com internet e login, sincroniza com a nuvem. Sem internet ele continua funcionando, e envia quando a conexão voltar.

### Arquivos do repositório

```
CNAME                      ← domínio próprio (obras.tergosconstrutora.com.br)
index.html                 ← o app (telas, relatórios, lógica principal)
sw.js                      ← "service worker": permite usar offline e instalar como app
manifest.json              ← dados para instalar o app na tela inicial
scripts/
  firebase-config.js       ← configuração de conexão com o Firebase
  firebase-sync.js         ← sincronização com a nuvem (dados e fotos)
  catalogo-fvs.js          ← catálogo das FVS (46 fichas), normas e itens
  subchecks-fvs.js         ← subitens de cada item de cada FVS
  nomes-comodo.js          ← nomes de cômodos (importação de planta)
assets/                    ← logos e ícones
documentos/HISTORICO_PROJETO.md ← histórico técnico anterior
```

### Estrutura dos dados

Obra → Pavimento → (Estrutura: categoria → elemento) / Unidades → ambientes / Ambientes comuns → FVS aplicada → itens → subitens.

Status possíveis de item e subitem: **Conforme**, **Não Conforme**, **Parcialmente Conforme** (com comentário), **N/A**, **Pendente**.

---

## 3. Configurações do Google Cloud / Firebase (referência)

### 3.1 Regras do Firestore (Firebase → Firestore → Regras)

Versão recomendada, que libera qualquer e-mail **@tergosconstrutora.com.br** e inclui as regras de "busca em grupo" usadas pela sincronização em tempo real:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function equipe(){
      return request.auth != null
        && request.auth.token.email.matches('.*@tergosconstrutora[.]com[.]br$');
    }

    match /obras/{obraId} {
      allow read, write: if equipe();
      match /{document=**} {
        allow read, write: if equipe();
      }
    }

    match /{path=**}/pavimentos/{pavId} {
      allow read: if equipe();
    }
    match /{path=**}/ambientes/{ambId} {
      allow read: if equipe();
    }
  }
}
```

### 3.2 Regras do Storage (Firebase → Storage → Regras)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /obras/{obraId}/{allPaths=**} {

      function equipe(){
        return request.auth != null
          && request.auth.token.email.matches('.*@tergosconstrutora[.]com[.]br$');
      }

      allow read: if equipe();
      allow write: if equipe() && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

> ⚠️ **As duas regras precisam estar iguais quanto a quem tem acesso.** Se um e-mail estiver liberado só no Firestore, a pessoa vê as FVS, mas as fotos aparecem quebradas. Se as regras publicadas ainda listarem só `obra4@` e `obra5@`, qualquer outro login fica isolado da equipe, sem aviso.

### 3.3 CORS do Storage (permite que o site baixe as fotos)

Rodado no **Cloud Shell** (Google Cloud → ícone `>_`). Versão com todos os endereços do app:

```
echo '[{"origin":["https://obras.tergosconstrutora.com.br","https://www.obras.tergosconstrutora.com.br","https://tergos-construtora.github.io","https://izabelamaira.github.io"],"method":["GET"],"maxAgeSeconds":3600}]' > cors.json
```
```
gcloud storage buckets update gs://fvs-obras-tergos.firebasestorage.app --cors-file=cors.json
```
Para conferir:
```
gcloud storage buckets describe gs://fvs-obras-tergos.firebasestorage.app --format="default(cors_config)"
```

> Sempre que o endereço do app mudar, o novo endereço precisa entrar nessa lista. Sem isso, as fotos aparecem quebradas nos outros aparelhos (erro "CORS" no F12 → Console).

### 3.4 Domínios autorizados do login

Firebase → Authentication → Configurações → Domínios autorizados: `tergos-construtora.github.io`, `www.obras.tergosconstrutora.com.br` e `obras.tergosconstrutora.com.br`.

### 3.5 Chave de API (Google Cloud → APIs e serviços → Credenciais → Browser key)

Restrições de aplicativo: **Nenhuma** (conferido em 26/10/2026). Pode ser restringida no futuro, com cuidado, depois que todos estiverem usando o endereço oficial.

### 3.6 DNS do domínio (administrado por terceiros; a Tergos não tem acesso ao painel)

| Tipo | Nome | Conteúdo | Situação |
|---|---|---|---|
| CNAME | `obras` | `tergos-construtora.github.io` | ✅ Criado em 04/11/2026, funcionando |
| CNAME | `www.obras` | `tergos-construtora.github.io` | ⏳ Solicitado em 04/11/2026 |

---

## 4. Histórico de alterações (outubro e novembro de 2026)

| Data | Alteração | Arquivo |
|---|---|---|
| 13/10 | **Fotos não apareciam em outros aparelhos.** Causas: regras do Firestore bloqueavam os ouvintes em tempo real (faltava a regra de busca em grupo) e o Storage não tinha CORS. Corrigidos os dois no Firebase e no Cloud Shell. | Configuração |
| 15/10 | **Relatório sem página em branco antes dos anexos.** Os PDFs anexados agora têm a margem branca cortada, páginas curtas dividem a mesma folha e o título "Documentos anexados" fica junto do primeiro anexo. Página de impressão definida como A4 com margens de 10 mm. | `index.html` |
| 21/10 | Preenchimento em lote pela Claude: FVS-11 conforme, com fornecedora **Juliana - Engeminas**, nas 27 vigas do 1º Nível Térreo; cadastro das FVS-10, 11 e 12 nas vigas V211 a V216. | Dados |
| 23/10 | **Visualizar fotos:** tocar na miniatura abre a foto em tela cheia, com setas e deslizar entre fotos, e o botão "Remover foto". Antes, tocar só apagava. | `index.html` |
| 23/10 | **App sempre carrega a versão mais nova:** o service worker passou a buscar primeiro no site ("rede primeiro"). Com internet, atualizações publicadas aparecem no próximo carregamento. Sem internet, usa a cópia guardada. | `sw.js` |
| 26/10 | **Transferência para a Tergos:** criada a organização `tergos-construtora` no GitHub e o repositório foi transferido da conta `izabelamaira`. Firebase e CORS preparados antes, sem interrupção. | GitHub |
| 28/10 | **Uso simultâneo em vários aparelhos.** Antes, cada salvamento reenviava a obra inteira e um aparelho desatualizado apagava o que outro tinha lançado. Agora cada FVS tem sua própria data de alteração, a mesclagem é feita FVS por FVS (vence a mais recente), uma ficha aberta com edição não salva nunca é trocada, só o que mudou é enviado e FVS removidas não "ressuscitam". Testado com simulação de 2 aparelhos (11 cenários). Também reduz muito o volume de gravações no Firestore. | `scripts/firebase-sync.js` |
| 28/10 | 2FA ativado na conta GitHub `tergosconstrutora`. | GitHub |
| 29/10 | **Relatórios sem N/A:** itens e subitens marcados como Não aplicável não aparecem nas fichas em PDF. A numeração continua a mesma do app. Se todos os itens de uma FVS forem N/A, aparece uma linha avisando. | `index.html` |
| 04/11 | **Domínio próprio:** `obras.tergosconstrutora.com.br` configurado no GitHub Pages, com verificação de DNS bem-sucedida. | `CNAME` |
| 04/11 | **Relatório sem espaços vazios:** cada elemento (P2, P3...) não força mais página nova, itens podem continuar na página seguinte (sem cortar a linha do item, um subitem ou a fileira de fotos), títulos não ficam sozinhos no pé da página e as fotos ficaram com 125 px de altura. No teste, 17 → 14 páginas e espaço vazio de 19% → 6%. | `index.html` |

---

## 5. Pendências

- [ ] **`www.obras`:** aguardar o DNS criar o CNAME `www.obras` e depois testar se o GitHub redireciona para `obras.tergosconstrutora.com.br`. Se não redirecionar, ajustar no GitHub.
- [ ] **HTTPS:** em GitHub → repositório → Settings → Pages, marcar **Impor HTTPS** assim que o certificado for emitido. Só então divulgar o link `https://obras.tergosconstrutora.com.br` para a equipe.
- [ ] **Conferir no Firebase** se as regras do Firestore e do Storage publicadas estão na versão por domínio (seção 3.1 e 3.2).
- [ ] **Conferir** se o CORS (3.3) e os domínios autorizados (3.4) já incluem `obras.tergosconstrutora.com.br` (sem www).
- [ ] **Equipe:** cada aparelho deve abrir o app pelo endereço oficial, fazer login de novo e reinstalar o atalho na tela inicial. Antes da troca, abrir o app no endereço antigo com internet e confirmar "Sincronizado com a equipe".
- [ ] (Opcional) **Alerta de orçamento** no Google Cloud (Faturamento → Orçamentos e alertas), sugerido em R$ 20/mês. O alerta avisa, mas não bloqueia. Não recomendado o corte automático, porque o Storage pararia e as fotos deixariam de funcionar.
- [ ] (Opcional) Conta `izabelamaira` sair da organização no GitHub.
- [ ] (Futuro) Restringir a chave de API aos endereços do app.

---

## 6. Problemas já resolvidos: como reconhecer e o que fazer

| Sintoma | Causa provável | Solução |
|---|---|---|
| Foto aparece como ícone quebrado em outro aparelho | Aparelho logado com e-mail sem acesso ao Storage, endereço fora do CORS, ou foto que nunca subiu | Conferir o e-mail logado (ícone da nuvem); conferir as regras do Storage (3.2) e o CORS (3.3); abrir o app no aparelho onde a foto foi tirada, com internet |
| Dados de um aparelho não aparecem nos outros | Conta sem acesso nas regras, aparelho com versão antiga ou endereço antigo | Regras 3.1/3.2; fechar e abrir o app; usar o endereço oficial |
| Alteração publicada no GitHub não aparece no app | Cópia antiga guardada no aparelho | Ctrl + Shift + R no computador; no celular ou tablet, fechar totalmente o app e abrir de novo (às vezes duas vezes) |
| F12 → Console mostra "Missing or insufficient permissions" | Regras do Firestore sem as regras de busca em grupo | Publicar as regras da seção 3.1 |
| F12 → Console mostra "CORS" / "Access-Control-Allow-Origin" | Endereço do app fora da lista de CORS | Rodar o comando da seção 3.3 |
| "Não é possível acessar esse site" com **www**.obras | Navegador completou o endereço com www, que ainda não existe | Digitar `obras.tergosconstrutora.com.br` sem www (até o CNAME `www.obras` ser criado) |

**Limitação conhecida:** se duas pessoas editarem **a mesma FVS** ao mesmo tempo, vale a versão de quem salvar por último. FVS diferentes, mesmo do mesmo elemento, são mescladas sem perda.

---

## 7. Como publicar uma atualização do app

1. Baixar o arquivo atualizado (`index.html`, `sw.js` ou `scripts/firebase-sync.js`).
2. Entrar no GitHub como **`tergosconstrutora`** → `github.com/tergos-construtora/fvs-obras-tergos`.
3. **`index.html` e `sw.js`:** na página inicial do repositório. **`firebase-sync.js`:** dentro da pasta **scripts**.
4. **Add file → Upload files** → arrastar o arquivo → escrever o que mudou → **Commit changes** (direto no ramo **master**).
5. Acompanhar em **Actions**: ✓ verde significa publicado (1 a 3 minutos).
6. Fechar e abrir o app nos aparelhos.

> Antes de pedir uma alteração à Claude, não é preciso mandar o arquivo: ela baixa a versão mais recente direto do repositório público, o que evita sobrescrever mudanças.

---

## 8. Ideias para o futuro: plataforma de gestão de obras

O endereço `obras.tergosconstrutora.com.br` foi escolhido pensando em virar uma **plataforma**, com o app de FVS como uma das ferramentas:

- `obras.tergosconstrutora.com.br` → página inicial (obras, menu de ferramentas)
- `/fvs` → o app de FVS atual
- Outras ferramentas possíveis: diário de obra, cronograma físico, controle de materiais e locações, medições de empreiteiros, assistência técnica pós-obra.

Como tudo fica no mesmo endereço, login, obras, pavimentos e fornecedores podem ser compartilhados entre as ferramentas, sem novo login ao mover o FVS para `/fvs`.

O que vai precisar evoluir:
- **Permissões por função** (hoje é "tudo ou nada");
- **Organização do código** em partes separadas;
- **Tarefas automáticas** (Cloud Functions, já disponível no plano Blaze);
- **LGPD**, se entrarem dados de clientes.
