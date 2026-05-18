/**
 * ============================================================================
 *  VISÃO — Landing Page + Funil de Qualificação
 *  Consultoria Financeira & Contábil Humanizada
 * ============================================================================
 *
 *  Este arquivo é a fonte da verdade (single source of truth) com todos os
 *  requisitos funcionais, conteúdos validados e decisões estratégicas da
 *  landing page da Visão, conforme briefing aprovado.
 *
 *  Estrutura:
 *    1. BRAND          — identidade visual, tipografia, tom de voz
 *    2. COMPANY        — dados institucionais, contato, sócios
 *    3. AUDIENCE       — público-alvo, dores, objetivos
 *    4. SERVICES       — serviços, ticket médio, planos
 *    5. DIFFERENTIALS  — diferenciais competitivos
 *    6. SECTIONS       — 10 seções da landing page (conteúdo aprovado)
 *    7. QUIZ           — fluxo de qualificação + perfis + roteamento
 *    8. PDF_DIAGNOSIS  — geração do PDF personalizado por perfil
 *    9. FUNNEL         — fluxos por origem de tráfego
 *   10. INTEGRATIONS   — Google Calendar, WhatsApp, CRM, e-mail, pixels
 *   11. REFERRAL       — programa de cashback por indicação
 *   12. GOALS          — metas de leads, ticket médio, conversão
 *   13. CHECKLIST      — checklist de produção (estratégica / conteúdo / técnica)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. BRAND — Identidade visual e tom de voz
// ----------------------------------------------------------------------------
export const BRAND = {
  name: "Visão",
  legalName: "Azevedo Guimarães Produções LTDA",
  cnpj: "54.589.204/0001-39",
  slogan: "Pega a Visão!",
  tagline: "Consultoria Financeira & Contábil Humanizada",

  // Posicionamento (até 4 atributos)
  positioning: [
    "Acessível / Popular",
    "Técnica / Profissional",
    "Humanizada / Acolhedora",
    "Descolada / Cultural",
    "Educativa / Didática",
  ],

  // Promessa central — vendemos ALÍVIO MENTAL, não serviços
  brandPromise:
    "A Visão transforma organização financeira em clareza acessível, humana e possível para a vida real.",

  emotionalTriad: ["CLAREZA", "ORGANIZAÇÃO", "ACOMPANHAMENTO"],

  toneOfVoice: {
    style: "Mistura — depende da seção (conversacional, próximo, sem economês)",
    must: [
      "Linguagem conversacional",
      "Acolhimento",
      "Identificação cultural com o cliente",
      "Clareza, sem jargão técnico",
    ],
    mustNot: [
      "Gatilhos de urgência baratos",
      "Gírias específicas de comunidades",
      "Jargão financeiro / 'economês'",
      "Tom de julgamento",
    ],
  },

  colors: {
    primary: {
      purple: "#8350F2",
      black: "#322B41",
    },
    secondary: {
      blue: "#859EF6",
      green: "#C0F685",
      offWhite: "#F9FAF9",
    },
    accent: {
      yellowCTA: "#F2E850",
    },
  },

  typography: {
    headings: "Poppins",       // títulos
    body: "Inter",             // corpo de texto
    humanHighlights: "Nunito", // frases de impacto e inspiração
    sloganOnly: "Brittany",    // exclusivamente para "Pega a Visão!"
  },

  visualStyle: ["Humanizado e acolhedor", "Cultural e criativo"],

  pillarVisuals: {
    clarezaFinanceira: {
      color: "#8350F2",
      shape: "Curvas orbitais (sensação de visão/amplitude)",
    },
    estruturaSemComplicacao: {
      color: "#859EF6",
      shape: "Blocos arredondados (sensação de organização)",
    },
    acompanhamentoHumano: {
      color: "#C0F685",
      shape: "Círculos e conexões (sensação de acolhimento)",
    },
  },

  visualReferences: ["www.linkcommerce.app/leticia-vaz"],
  communicationReferences: [
    "https://www.instagram.com/movimentos_/",     // estética e linguagem acessível
    "https://www.instagram.com/portfelconsultoria/", // temas
  ],
};

// ----------------------------------------------------------------------------
// 2. COMPANY — Dados institucionais
// ----------------------------------------------------------------------------
export const COMPANY = {
  city: "Rio de Janeiro",
  coverage: "Todo o Brasil",
  yearsInMarket: 2,
  teamSize: "Sócios + 4 a 10 colaboradores",
  officeModel: "100% online (sem escritório físico)",
  businessHours: "10:00 às 19:00",

  contact: {
    whatsapp: "+55 21 99707-9059",
    email: "contato.visaobr@gmail.com",
    instagram: "@visao_oficial",
    youtube: "https://www.youtube.com/@Visãooficial",
  },

  founders: [
    {
      name: "Felipe Guimarães",
      role: "Sócio fundador — Economista",
      bio: "Felipe Guimarães é economista formado pela UFSJ, com passagem de 1 ano e meio pelo mestrado em Economia Aplicada pela UFJF e mais de 6 anos de experiência na área. Fundador da Visão, desenvolveu uma metodologia que integra economia comportamental à prática financeira, ajudando clientes em todo o Brasil a organizarem suas finanças de forma estratégica, acessível e adaptada à vida real.",
    },
    {
      name: "Sabrina Azevedo",
      role: "Sócia fundadora — Produtora e empresária",
      bio: "Sabrina Azevedo é produtora, artista e empresária, atuando no cenário cultural e na produção de eventos e projetos desde 2017. É fundadora da Visão, criando-a com o propósito de transformar a vida das pessoas por meio de soluções estratégicas e impacto real. Atualmente, na Visão, atua como produtora da Artista agenciada pela empresa e na área de relacionamento com clientes e parceiros.",
    },
  ],

  proprietaryApp: {
    exists: true,
    status: "Em desenvolvimento",
  },
};

// ----------------------------------------------------------------------------
// 3. AUDIENCE — Público-alvo
// ----------------------------------------------------------------------------
export const AUDIENCE = {
  // Recorte principal escolhido para a LP
  primaryFocus:
    "Microempreendedores e autônomos em geral (artistas como uma das verticais, mas não exclusiva)",

  segments: [
    "Profissionais autônomos sem CNPJ",
    "MEI (Microempreendedores Individuais)",
    "Artistas e profissionais da economia criativa",
    "Pessoas físicas com foco em organização financeira pessoal",
  ],

  ageRange: "25 a 35 anos",
  socioeconomicClass: ["Classe C", "Classe B"],

  topPains: [
    "Dificuldade em guardar dinheiro",
    "Problemas com dívidas",
    "Desorganização financeira agravada por renda variável",
  ],

  topDesires: [
    "Se organizar financeiramente",
    "Aumentar patrimônio",
    "Realizar sonhos",
  ],
};

// ----------------------------------------------------------------------------
// 4. SERVICES — Catálogo de serviços
// ----------------------------------------------------------------------------
export const SERVICES = {
  catalog: [
    { id: "consultoria_basica",   name: "Consultoria Financeira Básica",     priceBRL: 265.0, billing: ["mensal"] },
    { id: "mentoria_avancada",    name: "Mentoria Financeira Avançada",      priceBRL: 415.0, billing: ["mensal"] },
    { id: "contabilidade",        name: "Contabilidade (MEI, ME, regularização)", priceBRL: 350.0, billing: ["mensal"] },
    { id: "irpf",                 name: "Declaração de IRPF",                priceBRL: null,  billing: ["pontual"] },
    { id: "nf_suporte_fiscal",    name: "Emissão de NF e suporte fiscal",    priceBRL: null,  billing: ["mensal"] },
    { id: "agenciamento_artistico", name: "Agenciamento Artístico",          priceBRL: null,  billing: ["contrato"] },
    { id: "masterclass_presencial", name: "Aulas e masterclasses para instituições", priceBRL: null, billing: ["pontual"] },
  ],

  // Prioridades de captação via LP
  captureFocus: [
    "Consultoria financeira pessoal",
    "Abertura de empresa e acompanhamento contábil",
  ],

  primaryOffer: "Consultoria financeira pessoal",

  billingModels: ["Mensalidade", "Plano semestral"],

  paymentMethods: {
    pix: true,
    creditCardSinglePayment: true,
    creditCardInstallments: { enabled: true, maxInstallments: 6, restriction: "Apenas para o plano semestral" },
    invoiceContract: false, // não trabalham com contrato formal
  },

  freeFirstMeeting: true,
  averageTimeToClose: "30 minutos a 1 hora após a primeira reunião",
};

// ----------------------------------------------------------------------------
// 5. DIFFERENTIALS — Diferenciais competitivos
// ----------------------------------------------------------------------------
export const DIFFERENTIALS = {
  list: [
    "Atendimento humanizado e personalizado",
    "Ecossistema integrado (finanças + contabilidade)",
    "Multidisciplinaridade dos sócios (formações complementares)",
    "Foco em economia comportamental e escuta ativa",
    "Programa de cashback por indicação",
    "Autoridade dos sócios em palestras e eventos",
    "Atendimento sem uso de robôs ou IA",
  ],

  headlineDifferential:
    "A Visão transforma organização financeira em clareza acessível, humana e possível para a vida real.",

  impactPhrases: [
    "A Visão não fala só de dinheiro. A Visão fala da vida real que acontece em volta dele.",
    "A Visão existe pra transformar confusão financeira em clareza pra vida real. Menos confusão. Mais Visão.",
    "Você não precisa virar outra pessoa pra organizar sua vida financeira.",
    "Sem julgamento. Sem pressão. Sem linguagem complicada.",
  ],

  vsCompetitors: {
    showComparison: true,
    mode: "Tabela comparativa sem citar nomes de concorrentes",
    summary:
      "A maioria das consultorias financeiras fala sobre dinheiro. A Visão fala sobre comportamento, rotina e realidade humana — transformando organização financeira em uma experiência acessível, acolhedora e culturalmente próxima do cliente.",
    keywords: [
      "Identificação",
      "Linguagem popular",
      "Potencial cultural e social",
      "Serviços integrados",
    ],
  },
};

// ----------------------------------------------------------------------------
// 6. SECTIONS — Estrutura da Landing Page (10 seções aprovadas)
// ----------------------------------------------------------------------------
export const SECTIONS = [
  {
    id: 1,
    name: "Hero",
    headline:
      "Pega a Visão. Organize sua vida financeira e o seu CNPJ com quem fala a sua língua.",
    primaryCTA: {
      label: "Pega a visão com o nosso diagnóstico gratuito!",
      action: "scrollTo:quiz",
    },
    visualElements: [
      "Foto profissional dos dois sócios juntos",
      "Elementos gráficos da identidade visual",
    ],
  },

  {
    id: 2,
    name: "Identificação do problema (dor)",
    painPhrases: [
      "Eu ganho dinheiro, mas no fim do mês ele simplesmente some.",
      "Meu dinheiro pessoal e o da empresa viraram uma coisa só.",
      "Eu deixo o Imposto de Renda pra última hora porque tenho medo de fazer errado.",
      "Sou MEI, acumulei boleto do DAS e tô com uma dívida enorme (e do nada).",
      "Quero começar a investir, mas parece que todo mundo entende disso menos eu.",
      "Tenho vontade de investir, mas morro de medo de perder dinheiro.",
      "Eu sei que precisava me organizar… mas nunca consigo.",
      "Toda vez que me organizo, um gasto não previsto bagunça tudo de novo.",
      "Tento me organizar, mas nunca sei por onde começar.",
    ],
  },

  {
    id: 3,
    name: "A Visão (apresentação da solução)",
    intro:
      "A ideia é criar uma marca emocionalmente segura. Não vendemos serviços — vendemos ALÍVIO MENTAL. Uma comunidade que se fortalece pela transformação e apoio que oferecemos.",
    pillars: [
      {
        id: "clareza_financeira",
        title: "Clareza Financeira",
        subtitle: "Organização, planejamento e decisões conscientes.",
        topics: ["organização", "comportamento", "investimentos", "metas", "planejamento"],
        color: "#8350F2",
        shape: "Curvas orbitais",
      },
      {
        id: "estrutura_sem_complicacao",
        title: "Estrutura Sem Complicação",
        subtitle: "Desburocratização e segurança, resolvendo o que parece complicado de forma simples.",
        topics: ["MEI", "ME", "IRPF", "nota fiscal", "regularização", "contabilidade"],
        color: "#859EF6",
        shape: "Blocos arredondados",
      },
      {
        id: "acompanhamento_humano",
        title: "Acompanhamento Humano",
        subtitle: "Presença, proximidade e suporte real. Você não precisa enfrentar tudo sozinho.",
        topics: ["atendimento próximo", "consultor real", "acompanhamento", "suporte contínuo"],
        color: "#C0F685",
        shape: "Círculos e conexões",
        method: "Baseado em Psicologia da Economia",
      },
    ],
  },

  {
    id: 4,
    name: "Quem está por trás (sócios)",
    highlightMultidisciplinary: "Sim, com moderação",
    // Bios completas em COMPANY.founders
  },

  {
    id: 5,
    name: "Quiz de diagnóstico",
    teaserText:
      "Antes de qualquer estratégia, a gente precisa entender sua realidade.",
    cta:
      "Descubra qual é seu perfil financeiro hoje — e entenda qual próximo passo faz mais sentido pra sua realidade.",
    buttonLabel: "Pegue sua Visão Financeira em 5 perguntas",
    // Detalhamento completo em QUIZ
  },

  {
    id: 6,
    name: "Prova social",
    status: "Depoimentos a coletar (vídeo, texto e prints disponíveis)",
    totalClientsServed: 70,
    highlightArtisticCase: "Sim, mas equilibrado com outros perfis (não criativos)",
    googleReviews: "Ainda não temos",
    cases: [
      {
        id: 1,
        summary:
          "Cliente começou com dívidas e sem emprego, precisou de empréstimo de R$6.000 para se organizar. Após meses, nunca mais precisou de empréstimo, atingiu patrimônio aplicado equivalente a 7x os gastos mensais e elevou o padrão de vida.",
      },
      {
        id: 2,
        summary:
          "Cliente começou com dívidas e desorganizada. Em poucos meses, saiu das dívidas, recuperou crédito com o banco, mudou de estado e saiu de R$0 para R$5.000 de patrimônio aplicado.",
      },
      {
        id: 3,
        summary:
          "Cliente ficou meses sem receber salário, contraiu vários empréstimos. Com a consultoria, reorganizou-se, quitou todas as dívidas e hoje está livre de dívidas.",
      },
      {
        id: 4,
        summary:
          "Cliente PJ pagava todo o salário no cartão de crédito. Com a consultoria avançada e acompanhamento mensal, em um ano passou a pagar as contas com sobra, adquiriu bens de alto custo e acumulou cerca de R$20.000 investidos.",
      },
    ],
    permissions: "Ainda não temos autorização formal — pendência para uso de nome/imagem",
  },

  {
    id: 7,
    name: "Diferenciais (por que a Visão e não outro?)",
    // Conteúdo em DIFFERENTIALS
  },

  {
    id: 8,
    name: "Programa de indicação com cashback",
    decision: "Pendente — definir se entra com seção dedicada, menção menor ou fica fora do MVP",
    // Regras completas em REFERRAL
  },

  {
    id: 9,
    name: "FAQ",
    status: "Conteúdo pendente — coletar 8 perguntas mais frequentes com respostas padrão",
    questions: [], // a preencher
  },

  {
    id: 10,
    name: "CTA final + Rodapé",
    closingPhrase:
      "Pronto pra pegar a visão? Comece pelo diagnóstico — leva 2 minutos.",
    footerLinks: {
      instagram: true,
      linkedin: false,
      youtube: false,
      privacyPolicy: true,
      termsOfUse: false,
      cnpj: true,
    },
  },
];

// ----------------------------------------------------------------------------
// 7. QUIZ — Fluxo de qualificação e perfis
// ----------------------------------------------------------------------------
export const QUIZ = {
  totalQuestions: 5,
  estimatedTimeMinutes: 3,

  // Tela de captura de dados — APÓS o quiz, antes do diagnóstico
  leadCaptureScreen: {
    position: "última tela (antes da entrega do diagnóstico)",
    fields: ["nome", "telefone", "email", "idade", "gênero", "cidade"],
    consent: {
      lgpd: true,
      copy: "Aceito a Política de Privacidade e o uso dos meus dados para receber o diagnóstico.",
    },
  },

  questions: [
    {
      id: 1,
      text: "Hoje, qual é sua maior dificuldade financeira?",
      type: "single",
      options: [
        { id: "1a", label: "Organizar meu dinheiro" },
        { id: "1b", label: "Entender minhas contas" },
        { id: "1c", label: "Separar pessoal e empresa" },
        { id: "1d", label: "Imposto de renda / MEI" },
        { id: "1e", label: "Começar a investir" },
        { id: "1f", label: "Outro", allowFreeText: true },
      ],
    },
    {
      id: 2,
      text: "Como você se sente em relação à sua vida financeira hoje?",
      type: "single",
      options: [
        { id: "2a", label: "Confuso(a)" },
        { id: "2b", label: "Ansioso(a)" },
        { id: "2c", label: "Sobrecarregado(a)" },
        { id: "2d", label: "Travado(a)" },
        { id: "2e", label: "Organizado(a), mas quero melhorar" },
      ],
    },
    {
      id: 3,
      text: "Você já tentou se organizar antes?",
      type: "single",
      options: [
        { id: "3a", label: "Sim, sozinho(a)" },
        { id: "3b", label: "Sim, com planilhas/apps" },
        { id: "3c", label: "Sim, com ajuda profissional" },
        { id: "3d", label: "Ainda não" },
      ],
    },
    {
      id: 4,
      text: "Qual seu objetivo hoje?",
      type: "single",
      options: [
        { id: "4a", label: "Sair da desorganização" },
        { id: "4b", label: "Ter mais controle" },
        { id: "4c", label: "Regularizar minha situação" },
        { id: "4d", label: "Investir melhor" },
        { id: "4e", label: "Crescer financeiramente" },
      ],
    },
    {
      id: 5,
      text: "Você gostaria de receber uma análise inicial gratuita da sua situação?",
      type: "leadCapture",
      // Renderiza o formulário de captura definido em leadCaptureScreen
    },
  ],

  // Os 4 perfis classificáveis (validados pela cliente, substituem os 3 originais)
  profiles: [
    {
      id: "consumidor_calorico",
      name: "Consumidor Calórico",
      represents: [
        "Desorganização leve/moderada",
        "Vida corrida",
        "Falta de método",
        "Consumo emocional moderno",
      ],
      recommendedService: "Consultoria Básica",
      fallbackService:
        "Planilha Financeira Autônoma (sugerida APENAS após contato com o consultor, para clientes que não conseguem pagar a mensalidade)",
      profileSummary:
        "O dinheiro vai embora nos pequenos excessos do cotidiano.",
      diagnosisText:
        "Sua rotina e os pequenos gastos do dia a dia podem estar consumindo seu dinheiro sem que você perceba. Mais do que falta de controle, esse perfil mostra falta de visão sobre hábitos financeiros e prioridades.",
    },
    {
      id: "equilibrista_da_rotina",
      name: "Equilibrista da Rotina",
      represents: [
        "Renda melhor",
        "Vida mais complexa",
        "Necessidade de planejamento",
        "Acompanhamento contínuo",
      ],
      recommendedService: "Mentoria Financeira (Consultoria Avançada)",
      profileSummary:
        "Tenta equilibrar trabalho, vida pessoal e dinheiro, mas sente que está sempre apagando incêndios.",
      diagnosisText:
        "Você tenta equilibrar trabalho, vida pessoal e estabilidade financeira ao mesmo tempo. Esse perfil normalmente aparece quando existe excesso de responsabilidades e pouca estrutura para sustentar tudo sozinho(a).",
    },
    {
      id: "empreendedor_modo_aviao",
      name: "Empreendedor no Modo Avião",
      represents: ["MEI", "Informalidade", "Improviso operacional", "Medo burocrático"],
      recommendedService: "Serviços Contábeis",
      profileSummary:
        "Foca tanto em fazer o negócio funcionar que a parte burocrática entra no 'modo avião'.",
      diagnosisText:
        "Você provavelmente dedica toda sua energia ao negócio e acaba deixando organização financeira e burocracias para depois. Esse perfil é comum em rotinas multitarefa e empreendimentos em crescimento.",
    },
    {
      id: "investidor_de_reels",
      name: "Investidor de Reels",
      represents: [
        "Interesse em crescimento",
        "Desejo de investir",
        "Confusão financeira moderna",
        "Necessidade de orientação",
      ],
      recommendedService: "Mentoria Financeira (Consultoria Avançada)",
      profileSummary:
        "Consome conteúdo financeiro o tempo todo, mas ainda não conseguiu transformar informação em estratégia.",
      diagnosisText:
        "Você já busca aprender sobre dinheiro e investimentos, mas ainda sente dificuldade em transformar informação em direção prática. Esse perfil costuma surgir no excesso de conteúdo e comparação digital.",
    },
  ],

  // Lógica de roteamento (heurística inicial — refinar com a Visão durante o build)
  routingRules: {
    description:
      "Cada combinação de respostas pontua os 4 perfis. O perfil com maior pontuação é o resultado. Empate é resolvido pela ordem: empreendedor_modo_aviao > equilibrista_da_rotina > investidor_de_reels > consumidor_calorico.",
    // Implementação de scoring fica em src/quiz/scoring.js (a criar)
  },
};

// ----------------------------------------------------------------------------
// 8. PDF_DIAGNOSIS — Geração do PDF personalizado
// ----------------------------------------------------------------------------
export const PDF_DIAGNOSIS = {
  generator: "Automação (gerado dinamicamente por perfil)",
  designer: "Designer interno da Visão",
  pageCount: "Curto (2-4 páginas)",
  includeAppMockup: "Não definido — avaliar quando o app estiver pronto",

  // Estrutura sugerida por página
  template: [
    { page: 1, content: "Capa personalizada com nome do lead e nome do perfil" },
    { page: 2, content: "Descrição do perfil + diagnosis text + 3 sinais que confirmam o perfil" },
    { page: 3, content: "Próximos passos recomendados + serviço indicado" },
    { page: 4, content: "Convite para reunião gratuita + link Google Calendar + WhatsApp" },
  ],

  deliveryEmail: {
    referenceDoc:
      "https://docs.google.com/document/d/1PMEHLUKq9LP9SrV4oRryegpnj5AUzQrE1CbnZUJen-Y/edit?usp=sharing",
    note: "Cada perfil recebe um e-mail próprio. Conteúdo base no doc acima.",
  },

  thankYouScreen: {
    headline: "Pega a Visão!",
    body:
      "Obrigado por preencher. Seu diagnóstico personalizado foi enviado para o seu e-mail. Já pensamos num planejamento ideal pra te ajudar — bora agendar nossa primeira conversa?",
    primaryCTA: { label: "Agendar reunião gratuita", action: "openGoogleCalendar" },
  },
};

// ----------------------------------------------------------------------------
// 9. FUNNEL — Fluxos por origem de tráfego
// ----------------------------------------------------------------------------
export const FUNNEL = {
  model:
    "LP NÃO direciona o lead diretamente para o WhatsApp. Quiz de qualificação (5 perguntas) → diagnóstico PDF + link Google Calendar para reunião gratuita inicial.",

  responsibleForLeads: "Felipe Guimarães",
  responseSLAHours: 24,

  flowsByOrigin: [
    {
      origin: "Meta Ads (Instagram + Facebook)",
      destination: "Landing Page completa",
      mechanic: "LP completa → quiz → PDF + agendamento",
    },
    {
      origin: "Google Ads (Pesquisa)",
      destination: "Landing Page completa",
      mechanic: "LP completa → quiz → PDF + agendamento",
    },
    {
      origin: "Instagram orgânico (link na bio)",
      destination: "Landing Page simplificada (mobile-first)",
      mechanic: "LP simplificada → quiz → PDF + agendamento",
    },
    {
      origin: "Indicação direta (cashback)",
      destination: "Atendimento humano direto",
      mechanic: "WhatsApp Business → consultor humano (sem quiz)",
    },
  ],
};

// ----------------------------------------------------------------------------
// 10. INTEGRATIONS — Integrações técnicas
// ----------------------------------------------------------------------------
export const INTEGRATIONS = {
  googleCalendar: {
    purpose: "Agendamento da reunião gratuita",
    embed: "Botão que abre o link de agendamento do consultor responsável",
  },
  whatsappBusiness: {
    number: "+55 21 99707-9059",
    purpose: "CTA para indicações diretas e canal de retorno do lead",
  },
  crm: {
    type: "Planilha (CRM inicial automatizado)",
    flow: "Quiz → planilha de leads (com perfil, respostas, dados de contato) → equipe comercial",
  },
  transactionalEmail: {
    provider: "A definir (sugestões: Resend, SendGrid, Brevo)",
    triggers: ["Entrega do PDF", "Lembrete pós-agendamento", "Follow-up 24h se não agendou"],
  },
  analytics: {
    metaPixel: true,
    googleTag: true,
    events: [
      "lp_view",
      "quiz_start",
      "quiz_question_answered",
      "lead_captured",
      "diagnosis_delivered",
      "calendar_opened",
      "meeting_scheduled",
    ],
  },
  legal: {
    lgpdConsent: "Obrigatório no formulário de captura",
    privacyPolicyPage: "Pendente — criar antes do go-live",
  },
};

// ----------------------------------------------------------------------------
// 11. REFERRAL — Programa de cashback por indicação
// ----------------------------------------------------------------------------
export const REFERRAL = {
  active: true,

  monthlyPlan: {
    referrerBasicClient: "Ganha 1 mês de consultoria grátis por cliente indicado",
    referrerAdvancedClient:
      "Recebe R$265,00 de desconto na própria mensalidade (limite de 6 meses grátis acumulados)",
    cap: "Após 6 meses acumulados, ciclo se reinicia",
  },

  semestralPlan: {
    cashback: "R$265,00 por indicação fechada",
    cap: "Até 6 indicações por ciclo (até R$1.590,00 no mês seguinte)",
    payoutWindow: "Computado do 1º ao último dia do mês",
    payoutDate: "Pago no dia 20 do mês seguinte",
    method: "Pix",
  },
};

// ----------------------------------------------------------------------------
// 12. GOALS — Metas comerciais
// ----------------------------------------------------------------------------
export const GOALS = {
  leadsPerMonth: { min: 70, max: 100 },
  newPayingClientsPerMonth: 20,
  averageMonthlyTicket: 265.0,
  semestralPlanFocus: true,

  marketingObjectives: {
    1: "Captura de mailing automatizada",
    2: "Reconhecimento de marca / posicionamento institucional",
    3: "Captura de leads via formulário/quiz",
    4: "Agendamento direto de reuniões",
    5: "Vendas diretas de produtos digitais",
  },
};

// ----------------------------------------------------------------------------
// 13. CHECKLIST — Estado de produção
// ----------------------------------------------------------------------------
export const CHECKLIST = {
  strategicApproval: {
    headlinesHero: { status: "approved", note: "Versão C escolhida" },
    quizProfileNames: { status: "approved", note: "4 perfis ajustados pela Visão" },
    pdfBaseText: { status: "approved", note: "Textos por perfil entregues" },
    cashbackRegulation: { status: "approved", note: "Regras descritas em REFERRAL" },
    privacyPolicyLGPD: { status: "pending", note: "Obrigatória antes do go-live" },
  },

  contentProduction: {
    foundersPhotoshoot: { status: "pending", note: "Sessão fotográfica nova necessária" },
    testimonialsCollection: { status: "pending", note: "3 a 6 depoimentos (vídeo/texto)" },
    miniCases: { status: "pending", note: "Estruturar 2-3 mini-cases mensuráveis" },
    proprietaryAppMockup: { status: "blocked", note: "App em desenvolvimento" },
  },

  technicalProduction: {
    landingPageDesktopMobile: { status: "todo" },
    quizWithProfileRouting: { status: "todo" },
    dynamicPdfGeneration: { status: "todo" },
    googleCalendarIntegration: { status: "todo" },
    transactionalEmailSetup: { status: "todo" },
    metaPixelAndGoogleTag: { status: "todo" },
    crmIntegration: { status: "todo" },
    endToEndTests: { status: "todo" },
  },
};

// ----------------------------------------------------------------------------
// EXPORT DEFAULT — Snapshot agregado
// ----------------------------------------------------------------------------
export default {
  BRAND,
  COMPANY,
  AUDIENCE,
  SERVICES,
  DIFFERENTIALS,
  SECTIONS,
  QUIZ,
  PDF_DIAGNOSIS,
  FUNNEL,
  INTEGRATIONS,
  REFERRAL,
  GOALS,
  CHECKLIST,
};
