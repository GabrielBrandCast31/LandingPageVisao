/**
 * Catálogo dos 4 perfis de diagnóstico — fonte única no frontend.
 *
 * Espelha o que estava em `backend/app/services/profiles.py`. Agora é
 * autoral do client, sem dependência do FastAPI.
 */

export type ProfileId =
  | "consumidor_calorico"
  | "equilibrista_da_rotina"
  | "empreendedor_modo_aviao"
  | "investidor_de_reels";

export type Profile = {
  id: ProfileId;
  name: string;
  summary: string;
  diagnosis: string;
  recommended_service: string;
  signals: string[];
  today_signals: string[];
  today_needs: string[];
  recommendation_pitch: string;
  accent_color: string;
};

export const PROFILES: Record<ProfileId, Profile> = {
  consumidor_calorico: {
    id: "consumidor_calorico",
    name: "Consumidor Calórico",
    summary: "O dinheiro vai embora nos pequenos excessos do cotidiano.",
    diagnosis:
      "Sua rotina e os pequenos gastos do dia a dia podem estar consumindo seu dinheiro sem que você perceba.\n\nMais do que falta de controle, esse perfil mostra **falta de visão** sobre hábitos financeiros e prioridades.",
    recommended_service: "Consultoria Básica",
    signals: [
      "Vida corrida e renda variável dificultam manter um método.",
      "Os 'pequenos gastos' do dia a dia somam mais do que parecem.",
      "Você sente que sabe o que faz, mas não enxerga o conjunto.",
    ],
    today_signals: [
      "viva no automático financeiro",
      "tenha pequenos excessos recorrentes",
      "tente se organizar e desista",
      "não visualize os gastos do mês",
    ],
    today_needs: [
      "visualizar melhor seus gastos",
      "criar uma rotina financeira simples",
      "organizar prioridades do mês",
      "ter mais clareza nas decisões",
    ],
    recommendation_pitch:
      "Uma metodologia pensada por nós para ajudar você a **encontrar o seu alívio mental** através de **organização** financeira, de forma **prática** e **humana**.",
    accent_color: "#8350F2",
  },
  equilibrista_da_rotina: {
    id: "equilibrista_da_rotina",
    name: "Equilibrista da Rotina",
    summary:
      "Tenta equilibrar trabalho, vida pessoal e dinheiro, mas sente que está sempre apagando incêndios.",
    diagnosis:
      "Você tenta equilibrar trabalho, vida pessoal e estabilidade financeira ao mesmo tempo.\n\nEsse perfil normalmente aparece quando existe **excesso de responsabilidades** e pouca estrutura para sustentar tudo sozinho(a).",
    recommended_service: "Mentoria Financeira",
    signals: [
      "Você toma boas decisões pontuais, mas falta planejamento.",
      "Um imprevisto pequeno ainda bagunça o mês inteiro.",
      "Existe espaço pra evoluir — só falta método e acompanhamento.",
    ],
    today_signals: [
      "viva apagando incêndios financeiros",
      "tome decisões pontuais sem planejamento",
      "sinta que um imprevisto bagunça tudo",
      "carregue tudo sozinho(a) na rotina",
    ],
    today_needs: [
      "estruturar um método sustentável",
      "ganhar previsibilidade no mês",
      "ter acompanhamento próximo",
      "evoluir com direção clara",
    ],
    recommendation_pitch:
      "Uma mentoria pensada por nós para ajudar você a **encontrar o seu equilíbrio** através de **estrutura** financeira, de forma **estratégica** e **humana**.",
    accent_color: "#859EF6",
  },
  empreendedor_modo_aviao: {
    id: "empreendedor_modo_aviao",
    name: "Empreendedor no Modo Avião",
    summary:
      "Foca tanto em fazer o negócio funcionar que a parte burocrática entra no 'modo avião'.",
    diagnosis:
      "Você provavelmente dedica toda sua energia ao negócio e acaba deixando **organização financeira e burocracias** para depois.\n\nEsse perfil é comum em rotinas multitarefa e empreendimentos em crescimento.",
    recommended_service: "Serviços Contábeis + Consultoria",
    signals: [
      "MEI, NF e DAS viraram dor de cabeça recorrente.",
      "Você mistura conta pessoal e da empresa sem perceber.",
      "Quer profissionalizar, mas não sabe por onde começar.",
    ],
    today_signals: [
      "esteja com MEI, NF ou DAS em atraso",
      "misture conta pessoal e da empresa",
      "deixe a burocracia sempre pra depois",
      "queira profissionalizar e não saiba como",
    ],
    today_needs: [
      "regularizar a parte contábil sem dor",
      "separar o pessoal do empresarial",
      "ter rotina fiscal organizada",
      "profissionalizar o seu CNPJ",
    ],
    recommendation_pitch:
      "Uma combinação pensada por nós para tirar você do **modo avião** através de **estrutura** contábil, de forma **prática** e **humana**.",
    accent_color: "#C0F685",
  },
  investidor_de_reels: {
    id: "investidor_de_reels",
    name: "Investidor de Reels",
    summary:
      "Consome conteúdo financeiro o tempo todo, mas ainda não conseguiu transformar informação em estratégia.",
    diagnosis:
      "Você já busca aprender sobre dinheiro e investimentos, mas ainda sente dificuldade em **transformar informação em direção prática**.\n\nEsse perfil costuma surgir no excesso de conteúdo e comparação digital.",
    recommended_service: "Mentoria Financeira",
    signals: [
      "Você já tem base, mas falta um plano consistente.",
      "Há mais opções de investimento abertas no celular do que decisões.",
      "Comparação digital atrapalha mais do que ajuda.",
    ],
    today_signals: [
      "consuma muito conteúdo financeiro",
      "tenha base, mas falte um plano",
      "se compare digitalmente o tempo todo",
      "não saiba qual o seu próximo passo",
    ],
    today_needs: [
      "transformar informação em direção",
      "ter um plano consistente",
      "filtrar o que faz sentido pra você",
      "evoluir sem comparação",
    ],
    recommendation_pitch:
      "Uma mentoria pensada por nós para transformar informação em **direção prática** através de **estratégia** financeira, de forma **personalizada** e **humana**.",
    accent_color: "#F2E850",
  },
};

export function getProfile(id: ProfileId): Profile {
  return PROFILES[id];
}
