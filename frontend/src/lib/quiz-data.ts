/**
 * Estrutura do quiz — 4 perguntas de classificação + 1 tela de captura.
 * A pontuação é feita no backend (`backend/app/services/scoring.py`).
 */

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "1",
    prompt: "Hoje, qual é sua maior dificuldade financeira?",
    options: [
      { id: "1a", label: "Organizar meu dinheiro" },
      { id: "1b", label: "Entender minhas contas" },
      { id: "1c", label: "Separar pessoal e empresa" },
      { id: "1d", label: "Imposto de Renda / MEI" },
      { id: "1e", label: "Começar a investir" },
      { id: "1f", label: "Outra coisa" },
    ],
  },
  {
    id: "2",
    prompt: "Como você se sente em relação à sua vida financeira hoje?",
    options: [
      { id: "2a", label: "Confuso(a)" },
      { id: "2b", label: "Ansioso(a)" },
      { id: "2c", label: "Sobrecarregado(a)" },
      { id: "2d", label: "Travado(a)" },
      { id: "2e", label: "Organizado(a), mas quero melhorar" },
    ],
  },
  {
    id: "3",
    prompt: "Você já tentou se organizar antes?",
    options: [
      { id: "3a", label: "Sim, sozinho(a)" },
      { id: "3b", label: "Sim, com planilhas ou apps" },
      { id: "3c", label: "Sim, com ajuda profissional" },
      { id: "3d", label: "Ainda não" },
    ],
  },
  {
    id: "4",
    prompt: "Qual seu objetivo agora?",
    options: [
      { id: "4a", label: "Sair da desorganização" },
      { id: "4b", label: "Ter mais controle" },
      { id: "4c", label: "Regularizar minha situação" },
      { id: "4d", label: "Investir melhor" },
      { id: "4e", label: "Crescer financeiramente" },
    ],
  },
];

export const TOTAL_STEPS = QUIZ_QUESTIONS.length + 1; // +1 = lead capture
