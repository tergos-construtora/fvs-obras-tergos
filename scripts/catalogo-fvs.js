// Catálogo de FVS (Fichas de Verificação de Serviço) — Qualitab Obra
// Conteúdo técnico recriado em 2026-08 a partir de pesquisa de normas ABNT vigentes,
// reproduzindo o trabalho original perdido. FVS-02, FVS-05 e FVS-19 usam texto
// idêntico ao de um backup real de uso do app; os demais foram recriados do zero.
// IMPORTANTE: este conteúdo ainda precisa ser validado por um engenheiro/responsável
// técnico antes de uso formal em campo (itens, normas e tolerâncias sujeitos a revisão).
const FVS_CATALOGO = [
  { codigo:"FVS-01", nome:"Demolições e Movimentações de Terra", rev:"00",
    normas:["NR-18 - Segurança e Saúde no Trabalho na Indústria da Construção","NBR 5681:2015 - Controle tecnológico da execução de aterros em obras de edificação","PES 2 - Demolições e Movimentações de Terra (procedimento interno TERGOS)","FVS 2 - Demolições e Movimentações de Terra (planilha real da TERGOS, 2023)"],
    itens:[
      "Plano de demolição disponível, contemplando os riscos ocupacionais em todas as etapas e as medidas de prevenção — considerando linhas de energia/água, construções vizinhas, remoção de entulho, aberturas no piso, áreas de circulação de emergência e trânsito de veículos/pessoas",
      "Linhas de abastecimento de energia elétrica, água, gás e canalizações de esgoto/águas pluviais protegidas ou removidas antes do início da demolição",
      "Instalações, muros ou construções vizinhas que possam ser atingidas escoradas e protegidas antes do início da demolição",
      "Demolição iniciada pelas partes superiores da edificação, após avaliada a necessidade de escoramentos",
      "Elementos a demolir umedecidos previamente para reduzir a suspensão de particulados, quando aplicável",
      "Resíduos de demolição destinados a unidades ambientalmente licenciadas, com reaproveitamento priorizado quando possível",
      "Terreno limpo e desimpedido, sem chuva, antes do início dos serviços de movimentação de terra — geotécnico presente",
      "Instalações, muros ou construções vizinhas escoradas e protegidas antes do início da movimentação de terra",
      "Equipe alinhada quanto à cota de nível do terreno desejada, com acompanhamento a cada evolução do aterro/desaterro",
      "Referência de nível (RN) definida para a locação altimétrica dos platôs de corte e aterro",
      "Cortes executados conforme cotas e perfis de projeto, permitindo escoamento de águas pluviais",
      "Taludes executados com declive máximo de 45°, marcados com esquadro e nível de bolha — superfície rugosa quando resultante de corte mecanizado, e patamares/banquetas de largura mínima de 3 m em taludes de altura elevada",
      "Material de aterro selecionado (sem turfas, argilas orgânicas ou solos expansivos), lançado em camadas de até 30 cm, com umidade ajustada por irrigação — nunca compactado com terra seca (o ensaio de compactação em si é verificado na FVS-02)",
      "Tubulações que permanecerão na área aterrada travadas antes da compactação, para evitar deslocamento"
    ]
  },
  { codigo:"FVS-02", nome:"Compactação de Aterro", rev:"00",
    normas:["NBR 5681:2015 - Controle tecnológico da execução de aterros em obras de edificação","NBR 7182:2020 - Solo - Ensaio de compactação","NBR 7185:2016 - Solo - Determinação da massa específica aparente, in situ, com emprego de frasco de areia","NBR 9813:2016 - Solo - Determinação da massa específica aparente, in situ, com emprego de cilindro de cravação"],
    itens:[
      "Ensaio de compactação (Proctor) realizado para o material de aterro utilizado",
      "Umidade do material de aterro na faixa admissível em relação à umidade ótima",
      "Espessura das camadas de aterro conforme especificação de projeto",
      "Grau de compactação atingido conforme exigência de projeto",
      "Equipamento de compactação adequado ao tipo de solo",
      "Ausência de matéria orgânica, entulho ou material inadequado no aterro",
      "Drenagem e proteção do aterro contra erosão/saturação"
    ]
  },
  { codigo:"FVS-03", nome:"Locação de Obra", rev:"00",
    normas:["NBR 13133:2021 - Execução de levantamento topográfico","PES 3 - Locação de Obra (procedimento interno TERGOS)","FVS 3 - Locação de Obra (planilha real da TERGOS, 2023) — fonte das tolerâncias e métodos revisados a partir dela"],
    itens:[
      "Terreno limpo e escavado até as cotas corretas para execução das fundações, antes do início da locação",
      "Referência de nível (RN) e cotas conferidas com o levantamento topográfico",
      "Esquadro do gabarito conferido pelas diagonais do retângulo formado pelo encontro dos eixos principais — tolerância de 5 mm a cada 10 m (0,05%)",
      "Afastamentos/recuos conforme projeto legal aprovado",
      "Gabarito nivelado (nível de mangueira) e fixado de modo a resistir aos esforços dos fios de marcação — tolerância de 5 mm",
      "Marcação de todos os elementos estruturais conferida a partir dos eixos X e Y com trena metálica — tolerância de 5 mm",
      "Cotas de arrasamento e nível de soleira conferidos (tolerância de projeto)",
      "Alinhamento de pilares/eixos estruturais conferido",
      "Memorial de locação assinado por responsável técnico"
    ]
  },
  { codigo:"FVS-04", nome:"Estacas Hélice Contínua", rev:"00",
    normas:["NBR 6122:2022 - Projeto e execução de fundações","NBR 6122 (Emenda 1:2022, Anexo O) - Concreto para estacas hélice contínua monitorada","NBR 16903:2020 - Prova de carga estática em fundação profunda","NBR 13208:2007 - Estacas - Ensaios de carregamento dinâmico","ASTM D5882/16 - Standard Test Method for Low Strain Impact Integrity Testing of Deep Foundations","Caderno de Encargos SUDECAP - Capítulo 4: Fundações, item 4.5 (Tabela 8 - Hélice Contínua Monitorada)","PES 4.2 - Fundações Profundas - Estacas Hélice Contínua (procedimento interno TERGOS) — itens marcados \"prática interna TERGOS\" abaixo não constam nas normas ABNT, são cultura/exigência própria da empresa","FVS 4.2 - Fundações Profundas - Estacas Hélice Contínua (planilha real da TERGOS, usada em campo) — fonte das tolerâncias e itens revisados/adicionados a partir dela"],
    itens:[
      "Centro da estaca conferido com arame e prumo de centro antes do início da perfuração — desvio máximo de 5 mm em relação ao eixo de projeto, com embocamento executado",
      "Identificação de cada estaca conferida de acordo com o projeto",
      "Perfuração monitorada eletronicamente (torque, velocidade de avanço/rotação e profundidade) até a cota de projeto, com torque e força de arranque compatíveis com o diâmetro da estaca e a resistência do solo",
      "Posicionamento do trado reconferido no centro da estaca imediatamente antes do início de cada perfuração",
      "Concretagem executada por injeção pelo tubo central do trado, simultânea e contínua à retirada, com pressão controlada — sem interrupções que gerem vazios ou estrangulamento no fuste",
      "Volume de concreto consumido por estaca comparado ao volume teórico do fuste (fator de injeção controlado, sem sobre ou sub-consumo)",
      "Classe de concreto (fck) e armadura mínima conforme classe de agressividade ambiental do projeto — C30 (CAA I/II) ou C40 (CAA III/IV), armadura mín. 0,4%, comprimento útil mín. 4,0 m incluindo trecho de ligação com o bloco",
      "Consumo mínimo de cimento e abatimento (slump) do concreto conforme Anexo O da NBR 6122 — concreto bombeável específico para hélice contínua // conferir valor vigente, norma alterada pela Emenda 1/2022",
      "Armadura introduzida somente após o lançamento do concreto, até a profundidade especificada, sem danificar o fuste ainda fresco",
      "Ensaio de integridade (PIT) e/ou prova de carga estática realizados, com resultado aprovado pela fiscalização antes da concretagem do bloco de coroamento",
      "Relatório de profundidades emitido pela empresa de fundação conferido com o projeto e inserido na ficha de controle da estaca",
      "Fornecimento de concreto integralmente planejado antes do início da perfuração — traço aprovado, volume total da estaca, programação de entrega dos caminhões-betoneira e disponibilidade de bomba compatíveis com o ritmo de execução (prática interna TERGOS)",
      "Escavação de cada estaca iniciada somente quando o concreto disponível em obra for suficiente para concretá-la por completo, considerando a perda (prática interna TERGOS)",
      "Sequência de perfuração planejada previamente, com estacas situadas em raio de até 6 vezes o diâmetro da estaca a ser escavada concretadas há pelo menos 24 horas, evitando soterramento ou contaminação de peças recém-concretadas",
      "Cilindros de isopor instalados na parte superior interna da estaca antes da concretagem, para impedir que o concreto preencha a região da armadura no interior do bloco de coroamento e evitar demolição posterior (prática interna TERGOS)",
      "Posicionamento das barras de aterramento (SPDA) conferido no projeto — quando previsto, a haste desce junto com a armação",
      "Ferragens expostas protegidas após a concretagem, até a execução do bloco de coroamento",
      "Demolição do topo da estaca até a cota de arrasamento executada de baixo para cima ou na horizontal, sem comprometer a armação — seção final plana e perpendicular ao eixo, com ponteiros/marteletes leves (prática interna TERGOS)",
      "4 corpos de prova moldados para cada caminhão de concreto utilizado (prática interna TERGOS)",
      "Mapeamento colorido, no projeto de fundações impresso, identificando a região concretada por cada caminhão-betoneira, para rastreabilidade do lançamento de concreto (prática interna TERGOS)",
      "Formulário \"Controle de Execução de Estaca Hélice Contínua\" preenchido para cada estaca executada, a partir de cópia do modelo salva na pasta da obra — nunca editado por cima da planilha modelo (prática interna TERGOS)"
    ]
  },
  { codigo:"FVS-05", nome:"Tubulão (fuste mecanizado, base manual)", rev:"00",
    normas:["NBR 6122:2022 - Projeto e execução de fundações","NBR 16903:2020 - Prova de carga estática em fundação profunda","NR-18 (item 18.7.2) - Segurança e Saúde no Trabalho na Indústria da Construção — Escavações, Fundações e Desmonte de Rochas","NR-33 - Segurança e Saúde nos Trabalhos em Espaços Confinados","Caderno de Encargos SUDECAP - Capítulo 4: Fundações, item 4.5 (Tabela 10 - Tubulão)","FVS 4.1 - Fundações Profundas - Tubulões (planilha real da TERGOS, 2023) — fonte dos itens dimensionais/de proteção adicionados a partir dela","PES 4.1 - Fundações Profundas - Tubulões (procedimento interno TERGOS) — itens marcados \"prática interna TERGOS\" não constam nas normas ABNT"],
    itens:[
      "Perfuração do fuste executada mecanicamente (perfuratriz) até a profundidade especificada em projeto, com verticalidade e diâmetro conferidos",
      "Boca do furo protegida contra queda de materiais, entrada de água e acidentes, com sinalização visível enquanto o fuste estiver aberto",
      "Diâmetro do fuste conferido — mínimo de 0,9 m no trecho onde houver entrada do trabalhador para o alargamento da base (NR-18.7.2.17)",
      "Encamisamento do fuste instalado antes da descida do trabalhador para a etapa de alargamento da base, garantindo proteção contra desmoronamento",
      "Liberação de serviço específica emitida pelo responsável técnico para a etapa de alargamento da base, antes de qualquer descida (NR-18.7.2.22.1)",
      "Equipamento de descida/içamento (sarilho) projetado por profissional habilitado, fixado no terreno, com dupla trava de segurança e corda com no mínimo 6 voltas sobre o tambor",
      "Ventilação por insuflação de ar em funcionamento e teste de atmosfera (gases e oxigênio) realizado antes da descida do trabalhador, conforme NR-33",
      "Sequência de abertura de tubulões planejada previamente — tubulões vizinhos dentro da distância mínima verificada com o geotécnico só abertos após a concretagem do anterior (prática interna TERGOS)",
      "Fornecimento de concreto planejado com margem de aproximadamente 15% acima do volume de projeto — concretagem nunca paralisada no meio do elemento; se o volume for insuficiente, o conteúdo é desprezado e o elemento concretado em um segundo momento (prática interna TERGOS)",
      "Base alargada executada nas dimensões de projeto, com fundo limpo, e concretagem iniciada em até 24 horas após a conclusão do alargamento",
      "Medidas da base alargada conferidas com trena (altura, diâmetro e rodapé, quando houver) — tolerância de ±5 mm",
      "Posicionamento da armação conferido — espaçadores corretamente instalados, dimensões/seções conforme projeto, respeitando a distância mínima da armação até a parede do fuste",
      "Posicionamento das barras de aterramento (SPDA) conferido no projeto — quando previsto, a haste é introduzida junto com a armadura do tubulão, antes da concretagem",
      "Cota de arrasamento conferida conforme projeto, incluindo vigas alavancas e poço de elevador quando aplicável — tolerância de ±5 mm a cada 10 m",
      "Concreto lançado no centro do furo com uso de funil de madeira, evitando mistura de torrões de terra (prática interna TERGOS)",
      "Esperas dos pilares posicionadas com o concreto ainda fresco, imediatamente após a concretagem",
      "Pontas dos vergalhões expostos e buracos de tubulões protegidos com fita zebrada e sinalizados contra acidentes",
      "Formulário de Controle de Execução preenchido para cada tubulão — cota do terreno, cota de arrasamento, dimensões reais x teóricas, traço, volume real x teórico e anormalidades (desaprumo, desvio de locação, aterro, matacões) (prática interna TERGOS)",
      "Ensaio de integridade e/ou prova de carga realizados conforme especificado pelo projetista, com resultado aprovado antes da concretagem do bloco de coroamento"
    ]
  },
  { codigo:"FVS-06", nome:"Fundações Rasas - Blocos e Cintas", rev:"00",
    normas:["NBR 6122:2022 - Projeto e execução de fundações","NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento","NBR 6489:2019 - Solo - Prova de carga estática em fundação direta","NBR 16889:2020 - Concreto - Determinação da consistência pelo abatimento do tronco de cone","NBR 14931:2023 - Execução de estruturas de concreto - Procedimento","Caderno de Encargos SUDECAP - Capítulo 4: Fundações, itens 4.4 (Fundações em Superfície) e 4.4.2 (Condições Específicas)","PES 5 - Fundações Rasas - Blocos e Cintas (procedimento interno TERGOS)","FVS 5 - Fundações Rasas - Blocos e Cintas (planilha real da TERGOS, 2023) — fonte dos itens revisados/adicionados a partir dela, marcados \"prática interna TERGOS\""],
    itens:[
      "Medidas do projeto topográfico conferidas antes da locação, para evitar erros de levantamento e marcações indevidas",
      "Centro dos blocos/sapatas/cintas conferido com arame e prumo de centro, antes da escavação — verificada a necessidade de apicoar a cabeça das estacas/tubulões",
      "Identificação de cada bloco/sapata/cinta conferida de acordo com o projeto",
      "Cotas de arrasamento das estacas/tubulões e cotas dos blocos/cintas conferidas conforme projeto",
      "Fundo da vala/cava compactado e recoberto com lastro de concreto magro (não estrutural) de 5 cm de espessura, antes da armação",
      "Formas de madeira instaladas nas laterais das cavas — não é permitido concretar contra o barranco (solo)",
      "Cava limpa e isenta de materiais nocivos (madeira, solo carreado por chuva, água acumulada), com blocos/cintas umedecidos imediatamente antes do lançamento do concreto, para não absorver água do concreto fresco",
      "Bitola, quantidade, posicionamento e cobrimento da armadura da sapata/viga (cinta) conferidos com o projeto estrutural no momento da descida, com espaçadores garantindo o cobrimento mínimo",
      "Posicionamento das barras de aterramento (SPDA) conferido no projeto — quando previsto, a haste é posicionada junto com a armação dos blocos/cintas",
      "Eventuais alterações em relação ao projeto original (tipo de aço, espaçamentos, posicionamento, seções) conferidas e registradas",
      "Classe de resistência do concreto (fck) e consistência (slump) conferidos conforme especificação de projeto, com corpos de prova moldados para ensaio",
      "Dimensões executadas (largura, comprimento, altura/espessura) dos blocos/sapatas/cintas conferidas com o projeto — sem lançamento de volumes/quantitativos indevidos",
      "Formulário de Controle de Execução preenchido para cada bloco/cinta — cota do terreno, cota de arrasamento, medidas, volume de concreto (projeto x executado), traço, sobreconsumo e existência de barra de aterramento (prática interna TERGOS)",
      "Prova de carga estática em fundação direta realizada conforme NBR 6489 (quando exigida pelo projetista), com resultado aprovado pela fiscalização antes da execução"
    ]
  },
  { codigo:"FVS-07", nome:"Tubulação a céu aberto", rev:"00",
    normas:["NBR 5626:2020 - Água fria e água quente","NBR 8160 - Esgoto sanitário","NBR 10844 - Águas pluviais"],
    itens:[
      "Declividade mínima conforme diâmetro e tipo de tubulação",
      "Assentamento sobre berço de areia compactada",
      "Profundidade mínima de cobertura sobre tubulação enterrada",
      "Estanqueidade das juntas testada antes do reaterro",
      "Proteção mecânica antes do reaterro",
      "Caixas de passagem e inspeção niveladas e acessíveis",
      "Diâmetros e materiais conforme projeto hidrossanitário"
    ]
  },
  { codigo:"FVS-08", nome:"Colarinho e Arranque de Pilares", rev:"00",
    normas:["NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento","NBR 14931:2004 - Execução de estruturas de concreto - Procedimento"],
    itens:[
      "Posicionamento e prumo dos arranques (barras de espera) conforme projeto estrutural",
      "Comprimento de transpasse/emenda dos arranques conforme detalhamento do projeto",
      "Cobrimento mínimo da armadura do colarinho garantido com espaçadores",
      "Nível do topo do colarinho conferido conforme projeto",
      "Dimensões da seção do colarinho conferidas com o projeto de fôrmas",
      "Ausência de corrosão, óleo ou desmoldante nas barras de arranque antes da concretagem",
      "Arranques expostos protegidos contra danos e deformações até a concretagem do lance seguinte"
    ]
  },
  { codigo:"FVS-09", nome:"Laje de Piso (piso de concreto sobre solo)", rev:"00",
    normas:["NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento","NBR 14931:2023 - Execução de estruturas de concreto - Procedimento","PES 6 - Lajes de Piso (procedimento interno TERGOS) — itens não sourceados em norma ABNT específica de piso sobre solo, seguem integralmente o procedimento interno"],
    itens:[
      "Terreno limpo e escavado, com fundações rasas e arranques dos pilares do próximo nível já executados, antes do início",
      "Processos das etapas anteriores conferidos como executados em conformidade com os procedimentos respectivos",
      "Traço do concreto definido e alinhado com a concreteira; equipe de sarrafeamento/polimento presente com equipamento; necessidade de cura química avaliada",
      "Cotas de nível das fundações rasas conferidas; caixas de passagem e tubulações sanitárias, elétricas e de telefonia executadas antes da concretagem",
      "Solo compactado para evitar vazios na base do piso, coberto por lona ou colchão de areia para isolamento entre o solo e o concreto",
      "Piquetes de madeira posicionados como referência de nível (galga) do concreto por toda a extensão a concretar",
      "Folha de isopor instalada nos muros de divisa e bases de pilares para formar junta de dilatação, descolando o piso das estruturas existentes",
      "Brita graduada simples (BGS) distribuída uniformemente conforme a cota dos piquetes, com o solo compactado novamente após sua aplicação",
      "Tela soldada posicionada com espaçadores tipo caranguejo, evitando que a tela se acomode sobre a camada de BGS",
      "Barras de reforço de canto instaladas em torno de caixas de passagem e pilares, para evitar fissuras no piso",
      "Concreto lançado e sarrafeamento/polimento iniciado somente após a conclusão de todas as etapas anteriores",
      "Juntas serradas do piso executadas conforme projeto específico, após a cura do concreto"
    ]
  },
  { codigo:"FVS-10", nome:"Montagem de Armadura", rev:"00",
    normas:["NBR 7480:2022 - Aço destinado a armaduras para estruturas de concreto armado - Requisitos","NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento"],
    itens:[
      "Bitola, quantidade e posicionamento das barras conforme projeto estrutural",
      "Cobrimento mínimo da armadura garantido com espaçadores",
      "Emendas e traspasses conforme comprimento especificado",
      "Amarração da armadura firme, sem deslocamentos durante a concretagem",
      "Ausência de corrosão, óleo ou contaminantes nas barras",
      "Espaçamento entre barras respeitando o mínimo normativo",
      "Embutidos e passagens (elétrica/hidráulica) sem interferência na armadura"
    ]
  },
  { codigo:"FVS-11", nome:"Montagem de forma e desforma", rev:"00",
    normas:["NBR 15696:2009 - Fôrmas e escoramentos para estruturas de concreto - Projeto, dimensionamento e procedimentos executivos","NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento","PES 6 - Estrutura em Concreto Armado (procedimento interno TERGOS)","FVS 6 - Estrutura em Concreto Armado - Fôrmas (planilha real da TERGOS, 2023) — fonte dos itens revisados/adicionados a partir dela"],
    itens:[
      "Projetos necessários disponíveis e funcionários, equipamentos e centrais de trabalho liberados pela segurança do trabalho, antes do início da montagem",
      "Eixos principais do edifício e nível de referência transferidos e conferidos em campo antes da montagem das fôrmas — tolerância de 5 mm",
      "Medidas entre pilares conferidas para garantir dimensões críticas (vagas de garagem, poço de elevador, caixa de escada, limites da torre, dimensões internas dos ambientes, alinhamento de pilares com alvenarias) — tolerância de 5 mm",
      "Prumo dos pilares conferido, incluindo o encontro das faces no topo do pilar com esquadro metálico — tolerância de 5 mm",
      "Estanqueidade e alinhamento das fôrmas conferidos antes da concretagem",
      "Dimensões internas das fôrmas conferidas com projeto estrutural",
      "Limpeza e desmoldante aplicados antes da concretagem",
      "Escoramento dimensionado e travado conforme o projeto específico do pavimento/peça — nunca em quantidade menor que a indicada em projeto",
      "Fôrmas de vigas invertidas e semi-invertidas executadas separadamente nas partes inferior e superior à laje",
      "Aberturas e furos em vigas para passagem de tubulações conferidos com o projeto executivo, com reforço nas bordas quando necessário",
      "Necessidade e posicionamento de contra-flechas conferidos conforme o projeto de fôrmas",
      "Eventuais alterações em relação ao projeto original (tipo de aço, espaçamentos, posicionamento, seções) conferidas e registradas",
      "Prazo mínimo de desforma respeitado conforme resistência do concreto",
      "Retirada das fôrmas sem danos à peça concretada",
      "Superfície do concreto após desforma sem falhas de concretagem (bicheiras/ninhos)"
    ]
  },
  { codigo:"FVS-12", nome:"Concretagem de Peças Estruturais", rev:"00",
    normas:["NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento","NBR 12655:2022 - Concreto de cimento Portland - Preparo, controle, recebimento e aceitação - Procedimento","NBR 5738:2015 - Concreto - Procedimento para moldagem e cura de corpos de prova","NBR 5739:2018 - Concreto - Ensaio de compressão de corpos de prova cilíndricos"],
    itens:[
      "Nota fiscal/ficha de concreto conferida com especificação de projeto (fck, slump, brita)",
      "Ensaio de abatimento (slump test) realizado no recebimento",
      "Moldagem de corpos de prova para controle de resistência",
      "Lançamento do concreto sem segregação e com altura de queda controlada",
      "Adensamento com vibrador realizado corretamente",
      "Cura do concreto realizada pelo período mínimo especificado",
      "Juntas de concretagem posicionadas e tratadas conforme projeto",
      "Temperatura e condições climáticas de concretagem controladas"
    ]
  },
  { codigo:"FVS-13", nome:"Instalações Elétricas", rev:"00",
    normas:["NBR 5410:2004 - Instalações elétricas de baixa tensão"],
    itens:[
      "Dimensionamento de condutores conforme carga e queda de tensão de projeto",
      "Proteção e seccionamento (disjuntores/DR) conforme projeto",
      "Aterramento executado e continuidade elétrica testada",
      "Eletrodutos e caixas de passagem instalados conforme projeto",
      "Pontos de tomadas e iluminação nas quantidades e posições de projeto",
      "Teste de funcionamento e isolamento dos circuitos antes do fechamento",
      "Quadro de distribuição identificado e com diagrama unifilar disponível"
    ]
  },
  { codigo:"FVS-14", nome:"Instalação Hidráulica", rev:"00",
    normas:["NBR 5626:2020 - Sistemas prediais de água fria e água quente - Projeto, execução, ensaios e manutenção","NBR 8160:1999 - Sistemas prediais de esgoto sanitário - Projeto e execução"],
    itens:[
      "Diâmetros e materiais das tubulações conforme projeto hidrossanitário",
      "Fixação e distância dos pontos conforme projeto",
      "Teste de estanqueidade da água fria/quente antes do fechamento",
      "Declividade e ventilação do sistema de esgoto conforme projeto",
      "Teste de estanqueidade do esgoto e ausência de obstruções",
      "Registros e válvulas instalados e acessíveis",
      "Isolamento térmico da tubulação de água quente conforme especificação"
    ]
  },
  { codigo:"FVS-15", nome:"Infra. Para Ar Condicionado", rev:"00",
    normas:["NBR 16401-1:2024 - Instalações de ar-condicionado - Sistemas centrais e unitários - Parte 1: Projetos das instalações","NBR 16401-3:2008 - Parte 3: Qualidade do ar interior","NBR 7541:2015 - Tubos de cobre sem costura para ar-condicionado e refrigeração"],
    itens:[
      "Dimensionamento de dutos conforme carga térmica e projeto",
      "Infraestrutura de dreno de condensado com caimento adequado",
      "Tubulação frigorígena (linha de cobre) instalada e testada",
      "Infraestrutura elétrica dedicada aos equipamentos conforme projeto",
      "Aberturas e passagens para tomada de ar externo/exaustão conforme projeto",
      "Base/suporte das unidades condensadoras dimensionado e nivelado"
    ]
  },
  { codigo:"FVS-16", nome:"Instalação de Gás", rev:"00",
    normas:["NBR 15526:2016 - Redes de distribuição interna para gases combustíveis em instalações residenciais e comerciais - Projeto e execução","NBR 13103 - Aparelhos a gás para uso residencial - Instalação (verificar edição vigente)"],
    itens:[
      "Traçado e diâmetro da tubulação conforme projeto e memorial de cálculo",
      "Teste de estanqueidade da rede antes da entrada em operação",
      "Ventilação do ambiente onde há aparelhos a gás conforme especificação",
      "Registros e conexões instalados conforme especificação",
      "Central de GLP/medição e proteções instaladas conforme projeto",
      "Documentação técnica (ART/memorial) disponível para liberação"
    ]
  },
  { codigo:"FVS-17", nome:"Alvenaria Estrutural", rev:"00",
    normas:["NBR 16868-1:2020 - Alvenaria estrutural - Parte 1: Projeto","NBR 16868-2:2020 - Parte 2: Execução e controle de obras","NBR 16868-3:2020 - Parte 3: Métodos de ensaio"],
    itens:[
      "Bloco estrutural conforme especificação de resistência e classe de projeto",
      "Modulação e amarração dos blocos conforme projeto de fiadas",
      "Espessura e preenchimento das juntas de argamassa conforme especificação",
      "Grauteamento de furos conforme projeto estrutural",
      "Armadura horizontal e vertical instalada conforme detalhamento",
      "Verificação de esquadro e prumo das paredes estruturais",
      "Vergas, contravergas e reforços em aberturas conforme projeto"
    ]
  },
  { codigo:"FVS-18", nome:"Alvenaria de Vedação", rev:"00",
    normas:["NBR 15270-1:2017 - Componentes cerâmicos - Blocos e tijolos para alvenaria - Parte 1: Requisitos (verificar edição vigente)","NBR 15575-4:2021 - Edificações habitacionais - Desempenho - Parte 4: Sistemas de vedações verticais internas e externas (norma de execução NBR 8545 está cancelada, sem substituta direta confirmada)","5. Alvenarias de Vedação (procedimento interno TERGOS) — itens não sourceados em norma ABNT específica, seguem o procedimento interno"],
    itens:[
      "Bloco/tijolo cerâmico conforme especificação dimensional e resistência",
      "Modulação e amarração da alvenaria conforme projeto de paginação",
      "Laje limpa e desimpedida, com saliências de concreto retiradas, periferia protegida e pontos de ancoragem/amarração de cintos de segurança definidos e liberados pela segurança do trabalho, antes do início",
      "Projeto de marcação de alvenaria disponível — medidas internas dos cômodos (com espessuras reais), medidas das faces a partir dos eixos principais, trechos com blocos/canaletas cheias sinalizados, vãos de portas/janelas com folga para contramarcos",
      "Resistência da estrutura avaliada para receber a carga da alvenaria — escoramento do pavimento inferior estudado quando houver concentração de blocos na laje",
      "Chapisco colante aplicado nos pilares e vigas que receberão alvenaria com pelo menos 3 dias de antecedência, usando desempenadeira de aço denteada",
      "Tela de amarração fixada nos pilares com chapisco a cada duas fiadas, com pistola fincapinos, executada por profissional treinado e habilitado",
      "Traço da argamassa de assentamento conforme especificado/ensaiado para a alvenaria em questão",
      "Impermeabilização com material asfáltico executada na base de alvenarias em contato direto com a fundação, em toda a extensão que receberá o bloco",
      "Eixos de referência transferidos para o pavimento; medidas da periferia da laje e prumo dos pilares periféricos conferidos",
      "Nivelamento da laje conferido, com correção de desníveis já na 1ª fiada — enchimento superior a 3 cm distribuído nas fiadas superiores",
      "Marcação das paredes de periferia e ambientes internos com linha de nylon, local molhado antes do assentamento da 1ª fiada — amarração, nível, prumo e esquadro conferidos",
      "Locação dos vãos de portas com escantilhão/gabarito — bonecas com no mínimo 7 cm acabados (recomendado 9 cm), marcação do vão com 9 cm a mais que o vão acabado",
      "Passagem das tubulações elétricas, hidráulicas e de gás conferida durante a marcação e elevação da alvenaria",
      "Alinhamento, nível, prumo e esquadro conferidos a cada fiada durante a elevação, com juntas de assentamento (verticais e horizontais) de 1 a 1,5 cm",
      "Vergas e contra-vergas executadas em bloco ou estrutura pré-moldada cheio e armado, com comprimento do vão mais pelo menos 30 cm de cada lado e duas barras de 8 mm",
      "Junta de dilatação executada entre a laje e a última fiada da alvenaria de cada pavimento, com folga máxima de 2 cm para aplicação de espuma expansiva de poliuretano",
      "Encunhamento executado somente após 14 dias da alvenaria finalizada e com pelo menos 2 andares superiores com alvenaria executada há mais de 7 dias",
      "Amarração entre blocos por intertravamento, com comprimento mínimo equivalente a um terço do tijolo — tela de reforço utilizada nos trechos onde a amarração não for respeitada",
      "Cortes para fixação de tubulações e caixas de instalações executados somente após o encunhamento finalizado, sem quebrar os cantos dos vãos durante o transporte de materiais"
    ]
  },
  { codigo:"FVS-19", nome:"Impermeabilização com Manta Asfáltica", rev:"00",
    normas:["NBR 9575:2010 - Impermeabilização - Seleção e projeto","NBR 9574:2008 - Execução de impermeabilização","NBR 13707:2018 - Manta asfáltica para impermeabilização - Requisitos (verificar edição vigente)"],
    itens:[
      "Substrato regularizado, seco e sem fissuras antes da aplicação",
      "Primer aplicado conforme especificação antes da manta",
      "Sobreposição de emendas conforme especificação mínima",
      "Reforços em pontos singulares (ralos, tubulações, encontros) executados",
      "Teste de estanqueidade (lâmina d'água) realizado antes do contrapiso/proteção",
      "Camada de proteção mecânica executada sobre a manta",
      "Ralos e caimentos finais conferidos após a impermeabilização"
    ]
  },
  { codigo:"FVS-20", nome:"Impermeabilização com Argamassa Polimérica", rev:"00",
    normas:["NBR 9575:2010 - Impermeabilização - Seleção e projeto","NBR 9574:2008 - Execução de impermeabilização","NBR 11905:2015 - Argamassa polimérica industrializada para impermeabilização - Requisitos"],
    itens:[
      "Substrato preparado, regularizado e curado antes da aplicação",
      "Traço e preparo da argamassa polimérica conforme especificação do fabricante",
      "Número de demãos e espessura total conforme especificação",
      "Reforço com tela/manta em pontos críticos (juntas, ralos, encontros)",
      "Cura da argamassa polimérica conforme recomendação do fabricante",
      "Teste de estanqueidade realizado antes da proteção mecânica",
      "Camada de proteção mecânica aplicada sem danificar a impermeabilização"
    ]
  },
  { codigo:"FVS-21", nome:"Colocação de Contramarco", rev:"00",
    normas:["NBR 10821-4:2017 - Esquadrias para edificações - Parte 4: Requisitos de desempenho adicionais e instalação (referência de instalação; não há norma específica exclusiva para contramarco confirmada)"],
    itens:[
      "Prumo, nível e esquadro do contramarco conferidos antes da fixação",
      "Fixação do contramarco à alvenaria/estrutura conforme especificação",
      "Vedação entre contramarco e alvenaria executada",
      "Dimensões internas do contramarco compatíveis com a esquadria a instalar"
    ]
  },
  { codigo:"FVS-22", nome:"Reboco Interno", rev:"00",
    normas:["NBR 13749:2013 - Revestimento de paredes e tetos de argamassas inorgânicas - Especificação","NBR 7200:1998 - Execução de revestimento de paredes e tetos de argamassas inorgânicas - Procedimento"],
    itens:[
      "Chapisco aplicado como base de aderência antes do emboço",
      "Espessura do reboco/emboço conforme especificação",
      "Planeza e prumo da superfície acabada dentro da tolerância",
      "Traço e preparo da argamassa conforme especificação de projeto",
      "Cura do reboco realizada para evitar fissuração",
      "Juntas de trabalho e encontros com outros materiais tratados"
    ]
  },
  { codigo:"FVS-23", nome:"Reboco Externo", rev:"00",
    normas:["NBR 13749:2013 - Revestimento de paredes e tetos de argamassas inorgânicas - Especificação","NBR 7200:1998 - Execução de revestimento de paredes e tetos de argamassas inorgânicas - Procedimento","NR-18 (item 18.15) - Trabalho em altura/proteção contra quedas","REVESTIMENTO EXTERNO - REBOCO (procedimento interno TERGOS) — itens não sourceados em norma ABNT específica seguem o procedimento interno"],
    itens:[
      "Todas as alvenarias concluídas e encunhadas (interna e externa), com contramarcos das janelas chumbados, antes do início",
      "Instalações hidráulicas, elétricas, gás canalizado e passagens para exaustão/ar-condicionado em alvenarias de fachada concluídas",
      "Fachada protegida com tela fachadeiro (nylon); EPIs (cintos, trava-quedas, cordas de linha de vida, talabartes) e balancinhos montados e verificados antes do início",
      "Argamassa para o reboco definida e validada, com traço conforme indicação do fabricante",
      "Referência de prumo (calango) definida por trecho de fachada — no mínimo 2 prumos descidos por trecho para comparar a diferença de espessura",
      "Pontos para o reboco posicionados com taliscas, a distância horizontal máxima de 2 m entre si",
      "Chapisco colante aplicado com desempenadeira denteada nas faces lisas de elementos estruturais (vigas e pilares)",
      "Toda a alvenaria a revestir chapiscada com argamassa de cimento e areia lavada grossa (traço conforme fabricante, ex. 1:3), com camada de espessura máxima de 5 mm e textura final rugosa",
      "Armadura eventualmente exposta protegida com argamassa estrutural, traçada conforme indicação do fabricante",
      "Tela de amarração soldada galvanizada (nunca tela galinheiro/pinteiro ou similar) aplicada nos encontros de alvenaria com elementos estruturais, passando cerca de 25 cm de cada lado",
      "Chapisco curado no mínimo 3 dias antes de receber a argamassa de revestimento, e umedecido com brocha imediatamente antes da aplicação",
      "Emboço chapado com espessura máxima de 3 cm por camada — espessuras entre 3 e 5 cm executadas em duas cheias, e entre 5 e 8 cm em três cheias, com tela eletrosoldada galvanizada fixada entre a primeira e a segunda cheia",
      "Planeza e prumo da fachada dentro da tolerância",
      "Sarrafeamento realizado no ponto correto (teste de pressão com os dedos), com régua apoiada nas mestras, de baixo para cima",
      "Aditivo colante aplicado entre camadas de revestimento executadas em dias diferentes, para melhorar a aderência",
      "Proteção contra chuva e insolação direta durante a cura",
      "Acabamento em textura aplicado com filtro/espuma após o ponto de desempeno, com desempenadeira frisada, quando o revestimento final for em textura",
      "Acabamento final (textura/desempenado) uniforme",
      "Caimento e pingadeiras em platibandas e peitoris executados",
      "Juntas de dilatação posicionadas na altura dos fundos das vigas, no encontro com as alvenarias, em todos os pavimentos — marcadas com mangueira de nível e abertas com frisador ou corte, conforme o estágio de cura"
    ]
  },
  { codigo:"FVS-24", nome:"Fachada Aerada", rev:"00",
    normas:["Sem norma ABNT específica confirmada para fachada ventilada/aerada em geral — prática de mercado/fabricante do sistema (verificar antes de uso formal)","Correlato: NBR 15575-4:2021 - Desempenho de edificações habitacionais - Sistemas de vedações verticais"],
    itens:[
      "Estrutura de fixação (perfis/mísulas) nivelada e ancorada // verificar",
      "Câmara de ar ventilada com dimensão conforme projeto do sistema // verificar",
      "Painéis de revestimento fixados sem folga excessiva // verificar",
      "Estanqueidade e remates (encontros, cantos, platibandas) tratados // verificar"
    ]
  },
  { codigo:"FVS-25", nome:"Rufos", rev:"00",
    normas:["NBR 16323:2014 - Telhas de aço - Requisitos e métodos de ensaio (correlato, componentes metálicos de cobertura)","RUFOS (procedimento interno TERGOS) — sem norma ABNT específica de execução de rufos identificada, segue o procedimento interno"],
    itens:[
      "Ferramentas e equipamentos em condições adequadas de uso; rufos disponíveis nas medidas e dobras corretas; acabamentos/tratamentos do muro finalizados; atividade realizada em dia sem chuva",
      "Rufos limpos com álcool no trecho que receberá o selante, antes da aplicação",
      "Rufos posicionados sobre a alvenaria com selante à base de PU (ou similar) na sobreposição — trespasse mínimo de 3 cm (1,5 cm de cada peça)",
      "Furos para fixação feitos somente após a sobreposição — bucha inserida e parafuso instalado com canhão compatível",
      "Cordão de selante aplicado no encontro entre rufos e na cabeça de cada parafuso instalado, garantindo vedação completa",
      "Em rufo entre muros ou sobre telhados, aba superior embutida na alvenaria superior, com corte feito com serra mármore na marcação previamente definida",
      "Formato, dobras e demais detalhes do rufo conferidos conforme a situação específica de cada trecho, antes da solicitação/fabricação das peças"
    ]
  },
  { codigo:"FVS-26", nome:"Assentamento de Peitoris e Soleiras", rev:"01",
    normas:["Sem norma ABNT específica confirmada para assentamento de peitoris e soleiras — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 13755:2017 - Revestimentos cerâmicos de fachadas e paredes externas com utilização de argamassa colante (quando o material da peça for cerâmico/porcelanato)","PEITORIS (procedimento interno TERGOS) — sem norma ABNT específica de execução de peitoris em pedra identificada, segue o procedimento interno"],
    itens:[
      "Ferramentas em condições de uso; pedras disponíveis nas medidas corretas; contramarcos de janela já assentados (para peitoris); base arrematada com no mínimo 7 dias de cura; validade dos produtos de assentamento conferida",
      "Pedras solicitadas à marmoraria com no mínimo 3 cm de sobra para pingadeira em cada lado, com friso na face inferior — em acabamento de muro, medida total igual à espessura da alvenaria mais 6 cm (3 cm de cada lado)",
      "Medidas dos locais de assentamento e das respectivas pedras conferidas antes do início; material (tipo de rocha) conferido conforme solicitado na marmoraria",
      "Argamassa ACIII utilizada para o assentamento — branca quando necessário para evitar manchas, traçada nas proporções indicadas pelo fabricante",
      "Colagem executada em dupla camada (argamassa na base e na peça), com os cordões seguindo o mesmo sentido em ambas para facilitar a expulsão de bolhas de ar",
      "Peça posicionada e pressionada com martelo de borracha ou vibrador de cerâmica mecânico",
      "Caimento de aproximadamente 2% instalado — para dentro da obra em acabamento de muro, para fora da fachada em peitoris de janela",
      "Nivelamento e assentamento firme da soleira // verificar",
      "Espaço de 0,5 cm entre a peça e o contramarco previsto em peitoris de janela, para aplicação de selante à base de PU",
      "Espaço entre peça e contramarco selado com PU, delimitado com fita crepe, com as pedras secas e livres de oleosidade antes da selagem",
      "Vedação e rejunte das bordas da peça // verificar",
      "Todas as peças de peitoril conferidas quanto a danos/fissuras antes da instalação das esquadrias das janelas",
      "Cordão de silicone/PU aplicado nas extremidades da pedra que se prolongam além da fachada, antes da instalação das janelas, para evitar manchamento por escorrimento de água"
    ]
  },
  { codigo:"FVS-27", nome:"Contrapiso", rev:"00",
    normas:["NBR 13753:1996 - Revestimento de piso interno e/ou externo com placas cerâmicas e com utilização de argamassa colante (referência de execução de contrapiso; verificar edição vigente)","NBR 12655:2022 - Concreto - Preparo, controle e recebimento (aplicável quando contrapiso for em concreto)","CONTRAPISO (procedimento interno TERGOS) — fonte dos itens sobre caimento/caída para ralo, marcados abaixo"],
    itens:[
      "Instalações elétricas e hidráulicas de piso executadas e testadas, com ralos fechados (tubo dobrado ou preenchido com papel amassado) antes do início do contrapiso",
      "Marcação da alvenaria concluída e projetos de arquitetura disponíveis, antes do início",
      "Laje limpa e livre de restos de argamassa, entulho ou qualquer material aderido",
      "Nível da laje conferido em todo o pavimento, identificando o ponto mais elevado",
      "Ponto mais alto do pavimento transferido para os banheiros, definindo as caídas de cada ambiente a partir dele",
      "Contrapiso com ralo executado em duas etapas — caída primária direcionando todo o piso para o ralo principal (lavabos/áreas de serviço) ou para o ralo fora do box (banheiros), formando um único ponto mais baixo",
      "Ponto de referência de nível marcado com talisca no ralo (ponto mais baixo), a 0,5 cm acima do nível mais alto do pavimento — demais pontos do banheiro com +1 cm de altura em relação ao ponto do ralo",
      "Taliscas posicionadas na base, de preferência dois dias antes da execução do contrapiso",
      "Base preparada — superfície limpa, cimento polvilhado sobre superfície molhada com adesivo de alto desempenho conforme especificação do fabricante, formando nata de ligação entre a base de concreto e a argamassa",
      "Argamassa farofa lançada entre as taliscas para execução das mestras, com os intervalos preenchidos e compactados com soquete ou enxada",
      "Sarrafeamento executado com régua apoiada nas mestras, em movimentos de vai e vem, até a superfície atingir o nível das mestras",
      "Acabamento final executado com cimento polvilhado e desempenadeira (madeira ou aço, conforme o revestimento final)",
      "Junta de dilatação/encontro executada conforme especificação",
      "Aderência à base ou desolidarização conforme tipo de contrapiso",
      "Cura do contrapiso realizada pelo período mínimo"
    ]
  },
  { codigo:"FVS-28", nome:"Revestimento Interno em Gesso", rev:"00",
    normas:["NBR 13867:1997 - Revestimento interno de paredes e tetos com pasta de gesso - Materiais, preparo, aplicação e acabamento (norma cancelada, sem substituta direta claramente identificada nesta pesquisa — verificar edição vigente antes de uso formal)"],
    itens:[
      "Superfície base preparada antes da aplicação do gesso",
      "Espessura da camada de gesso conforme especificação",
      "Planeza, esquadro e prumo da superfície acabada",
      "Preparo e tempo de utilização da pasta de gesso respeitados",
      "Acabamento final liso e pronto para pintura"
    ]
  },
  { codigo:"FVS-29", nome:"Forro de Gesso Acartonado", rev:"00",
    normas:["NBR 15758-2:2009 - Sistemas construtivos em chapas de gesso para drywall - Parte 2: Requisitos para sistemas usados como forros (norma cancelada em 09/2025, revisão em consulta nacional — verificar edição vigente)","NBR 14715-1:2021 - Chapas de gesso para drywall - Requisitos"],
    itens:[
      "Nível da estrutura metálica (perfis) conferido antes da fixação das chapas",
      "Fixação das chapas de gesso conforme especificação",
      "Tratamento de juntas (fita e massa) conforme especificação",
      "Recortes para luminárias, difusores e passagens conferidos",
      "Nível final do forro conferido em toda a área"
    ]
  },
  { codigo:"FVS-31", nome:"Shaft Drywall", rev:"00",
    normas:["NBR 15758-1:2009 - Sistemas construtivos em chapas de gesso para drywall - Parte 1: Requisitos para sistemas usados como paredes (norma cancelada em 09/2025, revisão em consulta nacional — verificar edição vigente)","NBR 14715-1:2021 - Chapas de gesso para drywall - Requisitos"],
    itens:[
      "Estrutura metálica (guias e montantes) fixada e nivelada",
      "Chapas resistentes ao fogo/umidade utilizadas conforme exigência",
      "Vedação de passagens de tubulações/instalações no shaft",
      "Acabamento das juntas e fixação final das chapas",
      "Isolamento acústico e estanqueidade do shaft conforme projeto"
    ]
  },
  { codigo:"FVS-32", nome:"Divisórias e Portas de Vidro", rev:"00",
    normas:["NBR 7199:2016 - Aplicações de vidros na construção civil - Requisitos (com emenda vigente a partir de 30/06/2025)"],
    itens:[
      "Espessura e tipo de vidro conforme especificação e aplicação",
      "Fixação e vedação dos painéis conforme especificação",
      "Ferragens (dobradiças, puxadores, molas de piso) instaladas e testadas",
      "Sinalização de segurança em painéis de grande área",
      "Ausência de trincas, lascas ou defeitos aparentes após instalação"
    ]
  },
  { codigo:"FVS-33", nome:"Pintura e Textura", rev:"00",
    normas:["NBR 15079-1:2025 - Tintas para construção civil - Requisitos de desempenho - Parte 1: Tinta fosca nas cores claras","NBR 15079-2:2025 - Parte 2: Tintas semiacetinada, acetinada e semibrilho nas cores claras (edição de 04/2025; verificar vigência antes de uso formal, pois edições anteriores da NBR 15079 foram canceladas)","NBR 13245:1995 - Execução de pinturas em edificações não industriais - Preparação de superfície (verificar edição vigente)","PINTURA INTERNA (procedimento interno TERGOS)"],
    itens:[
      "Projetos e instruções de revestimento disponíveis e alinhados, equipe treinada, antes do início",
      "Superfície de gesso/reboco curada e aprovada para receber o emassamento, com paredes desimpedidas",
      "Preparo e limpeza da superfície antes da pintura",
      "Superfícies metálicas (ferro e similares) inspecionadas quanto a oxidação, com remoção de ferrugem e pó solto por lixamento antes da pintura",
      "Produto conferido como adequado à área e superfície específica (interna x externa não usam o mesmo produto)",
      "Umidade da base dentro do limite aceitável para pintura",
      "Fundo preparador/selador aplicado conforme especificação",
      "Número de demãos e diluição conforme especificação do fabricante",
      "Uniformidade de cor, textura e acabamento final",
      "Proteção de esquadrias, pisos e áreas adjacentes durante a pintura",
      "Lote/validade da tinta conferido e produto conforme especificação"
    ]
  },
  { codigo:"FVS-34", nome:"Execução de Revestimento de Piso Interno: Cerâmica e Porcelanato", rev:"00",
    normas:["NBR 13818/NBR 15463 - Placas cerâmicas","NBR 14081 (partes 1-5) - Argamassa colante","PORCELANATOS (procedimento interno TERGOS)","Manual de Recebimento e Armazenamento Portobello (fabricante) — fonte dos itens revisados/adicionados a partir do procedimento interno"],
    itens:[
      "Peças limpas com escova de nylon e água para retirar a película de proteção do tardoz, com descrição, tamanho, cor e lote conferidos com o projeto",
      "Base nivelada, limpa e curada (mínimo de 14 dias para contrapiso e emboço) antes do assentamento",
      "Validade dos produtos de assentamento conferida; local de instalação livre e desimpedido; impermeabilização já executada em áreas molhadas",
      "Início do assentamento (partida das peças) marcado com linha de esquadro e laser, conforme projeto/layout de paginação",
      "Tipo de argamassa colante correto conforme a aplicação — Tipo III para paredes internas e pisos em áreas externas; argamassa branca para peças em rocha natural clara",
      "Base umedecida antes do assentamento; seta de indicação no tardoz das peças alinhada no mesmo sentido em todas as peças, para facilitar o nivelamento",
      "Argamassa aplicada em quantidade suficiente para o tamanho da peça, sem abrir pano maior que a peça — cordões em mesmo sentido, respeitando o tempo em aberto",
      "Peça posicionada e arrastada cerca de 5 cm até a posição final, com movimento de vaivém em sentido contrário aos cordões de argamassa, garantindo aderência completa",
      "Dupla colagem aplicada em porcelanatos de grande formato, com argamassa espalhada também no verso da peça",
      "Percentual de argamassa aderida no verso conferido (amostral)",
      "Espaçadores e cunhas posicionados e pressionados uniformemente com alicate de pressão — cunhas voltadas para o mesmo lado, afastadas cerca de 5 cm das bordas e no máximo 40 cm entre si",
      "Juntas de assentamento com largura e espaçadores conforme especificação",
      "Peça vibrada com vibrador para porcelanatos, garantindo ausência de vazios sob a placa",
      "Juntas de dilatação/movimentação a cada área e junto a paredes",
      "Caimento correto em áreas molhadas para ralos",
      "Ausência de peças soltas (som cavo) antes do rejuntamento",
      "Cunhas removidas entre 48h e 72h após a instalação, com uso de martelo de borracha na lateral do nivelador",
      "Peças limpas após a retirada das cunhas, com piso protegido (papelão e plástico bolha) até a entrega"
    ]
  },
  { codigo:"FVS-35", nome:"Rejuntamento", rev:"00",
    normas:["NBR 14992:2003 - Argamassa à base de cimento Portland para rejuntamento de placas cerâmicas - Requisitos e métodos de ensaio (verificar edição vigente)"],
    itens:[
      "Tempo de espera após assentamento respeitado antes do rejunte",
      "Tipo de rejunte conforme especificação (largura de junta e ambiente)",
      "Preenchimento completo e uniforme das juntas",
      "Limpeza do excesso de rejunte na superfície das placas",
      "Juntas de movimentação preservadas (não rejuntadas com argamassa rígida)",
      "Cura do rejunte protegida de água e tráfego prematuro"
    ]
  },
  { codigo:"FVS-36", nome:"Piso vinílico", rev:"00",
    normas:["NBR 14917-1:2017 - Revestimentos resilientes para pisos - Manta e placa vinílica flexível homogênea ou heterogênea em PVC - Parte 1: Requisitos","NBR 14917-2:2022 - Parte 2: Procedimentos (instalação)"],
    itens:[
      "Nivelamento e planeza do substrato antes da instalação",
      "Aclimatação do material antes da instalação",
      "Aplicação do adesivo conforme especificação do fabricante",
      "Emendas e juntas tratadas conforme especificação",
      "Ausência de bolhas, ondulações ou descolamento após instalação",
      "Acabamento em soleiras, ralos e transições de piso"
    ]
  },
  { codigo:"FVS-37", nome:"Instalação de Rodapés", rev:"00",
    normas:["Sem norma ABNT específica de execução de rodapés identificada nesta pesquisa — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 15575-3:2021 - Desempenho de edificações habitacionais - Sistemas de pisos"],
    itens:[
      "Nivelamento e alinhamento do rodapé com o piso",
      "Fixação firme sem folgas ou som cavo",
      "Encontros e cantos (internos/externos) bem acabados",
      "Rejunte/silicone aplicado entre rodapé e piso/parede"
    ]
  },
  { codigo:"FVS-38", nome:"Esquadria de Madeira", rev:"00",
    normas:["NBR 15930-1:2011 - Portas de madeira para edificações - Parte 1: Terminologia","NBR 15930-2:2011 - Parte 2: Requisitos","NBR 15930-3:2011 - Parte 3: Requisitos adicionais","NBR 15930-4:2011 - Parte 4: Instalação e manutenção"],
    itens:[
      "Dimensões e esquadro da esquadria conforme projeto",
      "Fixação do marco/batente na alvenaria conforme especificação",
      "Funcionamento de dobradiças, fechaduras e ferragens",
      "Acabamento superficial (pintura/verniz) conforme especificação",
      "Requisitos complementares atendidos (acústico/corta-fogo), quando especificados"
    ]
  },
  { codigo:"FVS-39", nome:"Execução de Instalação de Esquadria de Alumínio", rev:"01",
    normas:["NBR 10821-1:2017 - Esquadrias para edificações - Parte 1: Terminologia","NBR 10821-2:2017 - Parte 2: Requisitos e classificação","NBR 10821-4:2017 - Parte 4: Requisitos de desempenho adicionais e instalação","NBR 10821-5:2017 - Parte 5: Manutenção e desempenho acústico"],
    itens:[
      "Dimensões e esquadro do vão e da esquadria conferidos",
      "Fixação da esquadria ao vão conforme especificação",
      "Estanqueidade à água e permeabilidade ao ar conforme classificação de projeto",
      "Funcionamento de folhas móveis e ferragens",
      "Vidro e acabamento da esquadria conforme especificação",
      "Requisitos de segurança (guarda-corpo/queda) atendidos quando aplicável"
    ]
  },
  { codigo:"FVS-40", nome:"Colocação de Guarda Corpo e Corrimão", rev:"00",
    normas:["NBR 14718 - Guarda-corpos para edificação (verificar edição vigente)"],
    itens:[
      "Altura do guarda-corpo conforme mínimo normativo",
      "Vãos entre elementos verticais dentro do limite admissível",
      "Resistência estrutural do guarda-corpo (fixação e ancoragem)",
      "Corrimão contínuo e com dimensão de empunhadura adequada",
      "Material e acabamento sem riscos de corte ou ferimento"
    ]
  },
  { codigo:"FVS-41", nome:"Colocação de Bancadas", rev:"00",
    normas:["Sem norma ABNT específica confirmada para colocação de bancadas — prática de mercado/fabricante do material (granito, mármore, quartzo) (verificar antes de uso formal)","Correlato: NBR 15575-3:2021 - Desempenho de edificações habitacionais - Sistemas de pisos"],
    itens:[
      "Nivelamento e prumo da bancada conferidos // verificar",
      "Fixação e apoio estrutural adequados ao peso da peça // verificar",
      "Recortes para cuba, cooktop e torneira conferidos com os equipamentos // verificar",
      "Emendas entre módulos executadas com alinhamento e vedação // verificar",
      "Ausência de trincas, manchas ou defeitos aparentes na peça // verificar"
    ]
  },
  { codigo:"FVS-42", nome:"Nicho", rev:"00",
    normas:["Sem norma ABNT específica confirmada para execução de nichos — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 9575:2010 - Impermeabilização - Seleção e projeto (quando o nicho estiver em área molhada e exigir impermeabilização)"],
    itens:[
      "Dimensões e posição do nicho conforme projeto // verificar",
      "Impermeabilização do nicho em área molhada // verificar",
      "Caimento do fundo do nicho evitando acúmulo de água // verificar",
      "Revestimento interno do nicho alinhado com o revestimento do ambiente // verificar"
    ]
  },
  { codigo:"FVS-43", nome:"Instalação de Louças e Metais", rev:"00",
    normas:["NBR 15097-1:2011 - Aparelhos sanitários de material cerâmico - Parte 1: Requisitos e métodos de ensaio","NBR 15097-2:2011 - Parte 2: Procedimento para instalação","NBR 10281:2015 - Torneiras - Requisitos e métodos de ensaio","NBR 16749:2016 - Aparelhos sanitários - Misturadores - Requisitos e métodos de ensaio"],
    itens:[
      "Fixação da bacia sanitária/lavatório firme e nivelada",
      "Vedação entre louça e tubulação sem vazamentos",
      "Funcionamento da caixa acoplada/válvula de descarga testado",
      "Metais (torneiras, registros, misturadores) instalados e testados",
      "Alinhamento e nivelamento das peças com o revestimento do ambiente",
      "Limpeza e proteção das peças até a entrega"
    ]
  },
  { codigo:"FVS-44", nome:"Instalação de Torneiras", rev:"00",
    normas:["Sem norma ABNT específica confirmada para o serviço de instalação de torneiras (como produto específico) — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 10281:2015 - Torneiras - Requisitos e métodos de ensaio (norma de produto, não de instalação)"],
    itens:[
      "Vedação da conexão com a tubulação sem vazamentos // verificar",
      "Fixação e alinhamento da torneira // verificar",
      "Funcionamento e vazão testados // verificar",
      "Acabamento e limpeza da torneira instalada // verificar"
    ]
  },
  { codigo:"FVS-45", nome:"Exaustões Mecânicas", rev:"00",
    normas:["Sem norma ABNT específica confirmada para exaustão mecânica residencial simples — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 16401-3:2008 - Instalações de ar-condicionado - Sistemas centrais e unitários - Parte 3: Qualidade do ar interior (quando integrada a sistema de climatização)"],
    itens:[
      "Dimensionamento do duto e exaustor conforme ambiente // verificar",
      "Saída de exaustão para o exterior sem retorno de ar/odores // verificar",
      "Fixação e nivelamento do exaustor // verificar",
      "Funcionamento testado antes da entrega // verificar"
    ]
  },
  { codigo:"FVS-46", nome:"Portas Corta-Fogo e Acessibilidade (NBR 9050)", rev:"00",
    normas:["NBR 11742 - Porta resistente ao fogo para saída de emergência // confirmar a edição vigente diretamente na ABNT antes de uso formal — catálogos comerciais consultados em 10/2026 indicavam nova edição publicada, mas não foi possível confirmar no site oficial da ABNT","NBR 11711 - Dispositivo de abertura de emergência para saída de emergência (barra antipânico)","NBR 13434-2 - Sinalização de segurança contra incêndio e pânico - Parte 2: Símbolos e suas formas, dimensões e cores","NBR 9050:2020 - Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos","IT-07/CBMMG - Compartimentação Horizontal e Vertical (exige porta corta-fogo conforme NBR 11742 nas saídas de emergência) // confirmar edição vigente e substituir pela IT do Corpo de Bombeiros do estado da obra, se diferente de Minas Gerais","IT-08/CBMMG - Saídas de Emergência em Edificações (dimensionamento de rotas e larguras de saída) // mesma ressalva acima quanto ao estado"],
    itens:[
      "Porta corta-fogo instalada corresponde ao modelo, dimensões e TRRF (tempo requerido de resistência ao fogo) especificados em projeto, com etiqueta de identificação do fabricante afixada e legível",
      "Barra antipânico instalada e testada, liberando a porta sem uso de chave, cartão ou qualquer conhecimento prévio, em um único movimento",
      "Mola hidráulica ou braço de fechamento automático instalado e ajustado, garantindo o fechamento completo da porta (até o batente) sem necessidade de ação manual",
      "Vedação (gaxeta intumescente) e dobradiças/ferragens íntegras, sem furos, cortes ou adaptações fora do especificado pelo fabricante",
      "Porta abre no sentido do fluxo de saída (sentido de fuga) e sua área de giro está livre de obstáculos (mobiliário, quadro elétrico, extintor etc.)",
      "Sinalização \"Mantenha esta porta fechada\" afixada na face da porta, visível, conforme NBR 13434-2",
      "Largura livre de corredores e rotas de fuga conforme dimensionamento de projeto e NBR 9050:2020 — mínimo 1,50 m, ou a largura calculada para o fluxo de pessoas previsto",
      "Vão livre de porta em rota acessível com no mínimo 0,80 m, maçaneta tipo alavanca instalada entre 0,80 m e 1,10 m de altura do piso acabado",
      "Piso tátil de alerta e direcional instalado conforme projeto e NBR 9050, nas mudanças de direção, desníveis e proximidades de escadas/rampas",
      "Área de manobra para rotação de 180° (1,50 m x 1,20 m, com segmento reto mínimo de 0,80 m) livre de obstáculos nos pontos previstos em projeto (acessos, halls de elevador, sanitários acessíveis)",
      "Área de resgate executada conforme projeto, com dimensão mínima para acomodar uma cadeira de rodas, posicionada junto à escada de segurança ou rota de fuga, sem obstrução",
      "Sinalização da área de resgate afixada conforme NBR 13434, indicando o ponto de espera para pessoas com mobilidade reduzida em caso de emergência",
      "Comunicação (interfone/intercomunicador) na área de resgate testada e funcionando, quando prevista em projeto"
    ]
  },

];
window.FVS_CATALOGO = FVS_CATALOGO;
