/**
 * Conteúdo aprovado pela Visão.
 *
 * Cada bloco é tipado e usado pelas seções da landing page. Para alterações
 * editoriais (textos, frases, perguntas), edite só este arquivo.
 *
 * A versão "máster" em JS é o FEATURES.js (raiz do repositório) — este TS
 * espelha o que o frontend consome.
 */

export const CONTACT = {
  whatsappNumber: "5521997079059",
  whatsappLink: "https://wa.me/5521997079059",
  email: "contato.visaobr@gmail.com",
  instagram: "https://instagram.com/visao_oficial",
  youtube: "https://www.youtube.com/@Visãooficial",
  cnpj: "54.589.204/0001-39",
  legalName: "Azevedo Guimarães Produções LTDA",
  businessHours: "10h às 19h",
};

export const HERO = {
  eyebrow: "Consultoria Financeira & Contábil Humanizada",
  headline: "Pega a Visão.",
  subheadline:
    "Organize sua vida financeira e o seu CNPJ com quem fala a sua língua. Sem economês, sem robô, sem julgamento.",
  cta: "Pega a visão com o nosso diagnóstico gratuito!",
};

export const PAINS = [
  "Eu ganho dinheiro, mas no fim do mês ele simplesmente some.",
  "Meu dinheiro pessoal e o da empresa viraram uma coisa só.",
  "Eu deixo o Imposto de Renda pra última hora porque tenho medo de fazer errado.",
  "Sou MEI, acumulei boleto do DAS e tô com uma dívida enorme (e do nada).",
  "Quero começar a investir, mas parece que todo mundo entende disso menos eu.",
  "Tenho vontade de investir, mas morro de medo de perder dinheiro.",
  "Eu sei que precisava me organizar… mas nunca consigo.",
  "Toda vez que me organizo, um gasto não previsto bagunça tudo de novo.",
  "Tento me organizar, mas nunca sei por onde começar.",
];

export const PILLARS = [
  {
    id: "clareza",
    title: "Clareza Financeira",
    subtitle: "Organização, planejamento e decisões conscientes.",
    topics: ["Organização", "Comportamento", "Investimentos", "Metas"],
    color: "purple" as const,
    shape: "curves" as const,
  },
  {
    id: "estrutura",
    title: "Estrutura Sem Complicação",
    subtitle:
      "Desburocratização e segurança no que parece complicado — de forma simples.",
    topics: ["MEI / ME", "IRPF", "Nota fiscal", "Regularização"],
    color: "sky" as const,
    shape: "blocks" as const,
  },
  {
    id: "acompanhamento",
    title: "Acompanhamento Humano",
    subtitle:
      "Presença, proximidade e suporte real. Você não enfrenta sozinho.",
    topics: ["Consultor real", "Suporte contínuo", "Sem robô", "Sem IA"],
    color: "lime" as const,
    shape: "circles" as const,
  },
];

export const FOUNDERS = [
  {
    name: "Felipe Guimarães",
    role: "Sócio fundador · Economista",
    bio: "Economista formado pela UFSJ, com passagem pelo mestrado em Economia Aplicada na UFJF e mais de 6 anos de experiência. Desenvolveu uma metodologia que integra economia comportamental à prática financeira.",
    initials: "FG",
    accent: "purple" as const,
    photo: "/felipe.jpeg",
  },
  {
    name: "Sabrina Azevedo",
    role: "Sócia fundadora · Produtora cultural e empresária",
    bio: "Produtora cultural e empresária, atuando na construção de conexões estratégicas entre marcas, clientes e parceiros. Na Visão, desenvolve o relacionamento institucional e fortalece a comunicação da empresa com o público, unindo criatividade, articulação e sensibilidade.",
    initials: "SA",
    accent: "sky" as const,
    photo: "/sabrina.jpeg",
  },
];

export const QUIZ_TEASER = {
  eyebrow: "Diagnóstico gratuito",
  headline: "Antes de qualquer estratégia, a gente precisa entender sua realidade.",
  body: "Descubra qual é seu perfil financeiro hoje — e entenda qual próximo passo faz mais sentido pra sua realidade. 5 perguntas, 3 minutos.",
  cta: "Pegue sua Visão em 5 perguntas",
};

export const CASES = [
  {
    headline: "De endividada → 7x os gastos mensais aplicados",
    body: "Começou com dívidas e sem emprego, precisou de empréstimo de R$6.000 para se organizar. Depois dos primeiros meses, nunca mais precisou de empréstimo e o padrão de vida subiu.",
  },
  {
    headline: "Do R$0 → R$5.000 aplicados em poucos meses",
    body: "Saiu das dívidas, recuperou crédito com o banco, mudou de estado e construiu o primeiro patrimônio financeiro.",
  },
  {
    headline: "Quitou todos os empréstimos",
    body: "Cliente ficou meses sem receber e contraiu vários empréstimos. Reorganizou-se na consultoria e hoje está livre de dívidas.",
  },
  {
    headline: "Saiu do looping do cartão → quase R$20k investidos",
    body: "Cliente PJ pagava todo o salário no cartão. Com a consultoria avançada, em um ano passou a pagar tudo com sobra e adquiriu bens de alto custo.",
  },
];

export const DIFFERENTIALS = {
  comparison: [
    {
      label: "Você é tratado como pessoa, não como número",
      visao: true,
      others: false,
    },
    {
      label: "Linguagem do dia a dia, sem economês",
      visao: true,
      others: false,
    },
    { label: "Consultor humano em todas as interações", visao: true, others: false },
    {
      label: "Finanças pessoais + contabilidade integradas",
      visao: true,
      others: false,
    },
    { label: "Atendimento 100% online em todo o Brasil", visao: true, others: true },
    { label: "Aplicativos genéricos e dashboards prontos", visao: false, others: true },
  ],
  impact: [
    "A Visão não fala só de dinheiro. A gente fala da vida real que acontece em volta dele.",
    "Aqui você transforma confusão em clareza. Menos confusão. Mais Visão.",
    "Você não precisa virar outra pessoa pra organizar sua vida financeira.",
    "Sem julgamento. Sem pressão. Sem linguagem complicada.",
  ],
};

export const CASHBACK = {
  monthly: {
    title: "Plano mensal",
    text: "Cada cliente vindo por sua indicação te dá 1 mês de consultoria grátis (ou R$ 265 de desconto se você for da Mentoria Avançada).",
    cap: "Até 6 meses acumulados — depois o ciclo reinicia.",
  },
  semestral: {
    title: "Plano semestral",
    text: "Cashback de R$ 265 por indicação fechada, pago via Pix no dia 20 do mês seguinte.",
    cap: "Até 6 indicações por ciclo — até R$ 1.590 no mês.",
  },
};

export const FAQ = [
  {
    q: "Quanto custa uma consultoria?",
    a: "Consultoria Básica: R$ 265/mês. Mentoria Avançada: R$ 415/mês. Contabilidade: a partir de R$ 350/mês. A primeira reunião é sempre gratuita.",
  },
  {
    q: "É 100% online? Atendem em todo o Brasil?",
    a: "Sim — atendemos todo o Brasil via Google Meet e WhatsApp, no horário comercial (10h às 19h).",
  },
  {
    q: "Vocês usam robô ou IA pra atender?",
    a: "Não. Toda interação é com um consultor humano. Esse é um dos nossos princípios.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Pode. Não trabalhamos com multa ou fidelidade no plano mensal. O semestral tem condição especial em troca do compromisso de 6 meses.",
  },
  {
    q: "Como funciona o cashback por indicação?",
    a: "No plano mensal você ganha 1 mês grátis por indicação (até 6). No semestral o cashback é em Pix de R$ 265 por indicação (até 6 por ciclo).",
  },
  {
    q: "Vocês fazem a Declaração de IRPF?",
    a: "Sim — tanto avulsa quanto integrada à consultoria.",
  },
  {
    q: "Sou MEI e estou irregular. Vocês resolvem?",
    a: "Resolvemos. Regularizamos a situação, organizamos o DAS atrasado e te ajudamos a não cair nessa armadilha de novo.",
  },
  {
    q: "Em quanto tempo eu vejo resultado?",
    a: "A maioria dos nossos clientes sente diferença real nos primeiros 3 meses. Mas o resultado depende de você manter o método com a gente.",
  },
];

export const FINAL_CTA = {
  headline: "Pronto pra pegar a visão?",
  subheadline: "Comece pelo diagnóstico — leva 3 minutos.",
  cta: "Quero meu diagnóstico gratuito",
};
