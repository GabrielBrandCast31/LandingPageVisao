/**
 * Heurística de classificação do quiz nos 4 perfis (client-side).
 *
 * Porte direto de `backend/app/services/scoring.py`. Mesma matriz, mesmo
 * algoritmo de desempate.
 */

import type { ProfileId } from "./profiles";

type ProfileScores = Record<ProfileId, number>;

const SCORING_MATRIX: Record<string, Record<string, Partial<ProfileScores>>> = {
  "1": {
    "1a": { consumidor_calorico: 2, equilibrista_da_rotina: 1 },
    "1b": { consumidor_calorico: 2 },
    "1c": { empreendedor_modo_aviao: 3 },
    "1d": { empreendedor_modo_aviao: 3 },
    "1e": { investidor_de_reels: 3 },
    "1f": {
      consumidor_calorico: 1,
      equilibrista_da_rotina: 1,
      empreendedor_modo_aviao: 1,
      investidor_de_reels: 1,
    },
  },
  "2": {
    "2a": { consumidor_calorico: 2, investidor_de_reels: 1 },
    "2b": { equilibrista_da_rotina: 2 },
    "2c": { equilibrista_da_rotina: 3, empreendedor_modo_aviao: 1 },
    "2d": { investidor_de_reels: 2, consumidor_calorico: 1 },
    "2e": { investidor_de_reels: 2 },
  },
  "3": {
    "3a": { consumidor_calorico: 1, empreendedor_modo_aviao: 1 },
    "3b": { equilibrista_da_rotina: 2 },
    "3c": { investidor_de_reels: 1, equilibrista_da_rotina: 1 },
    "3d": { consumidor_calorico: 2 },
  },
  "4": {
    "4a": { consumidor_calorico: 3 },
    "4b": { equilibrista_da_rotina: 2, consumidor_calorico: 1 },
    "4c": { empreendedor_modo_aviao: 3 },
    "4d": { investidor_de_reels: 3 },
    "4e": { investidor_de_reels: 2, equilibrista_da_rotina: 1 },
  },
};

const TIEBREAKER: ProfileId[] = [
  "empreendedor_modo_aviao",
  "equilibrista_da_rotina",
  "investidor_de_reels",
  "consumidor_calorico",
];

export function classify(answers: Record<string, string>): ProfileId {
  const scores: ProfileScores = {
    consumidor_calorico: 0,
    equilibrista_da_rotina: 0,
    empreendedor_modo_aviao: 0,
    investidor_de_reels: 0,
  };

  for (const [questionId, answerId] of Object.entries(answers)) {
    const rule = SCORING_MATRIX[questionId]?.[answerId];
    if (!rule) continue;
    for (const [profileId, points] of Object.entries(rule)) {
      scores[profileId as ProfileId] += points ?? 0;
    }
  }

  const max = Math.max(...Object.values(scores));
  if (max === 0) return "consumidor_calorico";

  const leaders = (Object.entries(scores) as [ProfileId, number][])
    .filter(([, s]) => s === max)
    .map(([id]) => id);

  if (leaders.length === 1) return leaders[0];

  for (const candidate of TIEBREAKER) {
    if (leaders.includes(candidate)) return candidate;
  }
  return leaders[0];
}
