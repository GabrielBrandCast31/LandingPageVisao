"""Heurística de classificação do quiz nos 4 perfis.

Cada resposta soma pontos para 1+ perfis. Vence o maior total. Empates são
resolvidos pela ordem definida em TIEBREAKER (vertical mais cara / mais
demandante primeiro).
"""

from .profiles import PROFILES

# Pontuação: question_id -> answer_id -> {profile_id: pontos}
SCORING_MATRIX: dict[str, dict[str, dict[str, int]]] = {
    "1": {
        "1a": {"consumidor_calorico": 2, "equilibrista_da_rotina": 1},
        "1b": {"consumidor_calorico": 2},
        "1c": {"empreendedor_modo_aviao": 3},
        "1d": {"empreendedor_modo_aviao": 3},
        "1e": {"investidor_de_reels": 3},
        "1f": {  # "Outro" — distribui 1pt entre todos
            "consumidor_calorico": 1,
            "equilibrista_da_rotina": 1,
            "empreendedor_modo_aviao": 1,
            "investidor_de_reels": 1,
        },
    },
    "2": {
        "2a": {"consumidor_calorico": 2, "investidor_de_reels": 1},
        "2b": {"equilibrista_da_rotina": 2},
        "2c": {"equilibrista_da_rotina": 3, "empreendedor_modo_aviao": 1},
        "2d": {"investidor_de_reels": 2, "consumidor_calorico": 1},
        "2e": {"investidor_de_reels": 2},
    },
    "3": {
        "3a": {"consumidor_calorico": 1, "empreendedor_modo_aviao": 1},
        "3b": {"equilibrista_da_rotina": 2},
        "3c": {"investidor_de_reels": 1, "equilibrista_da_rotina": 1},
        "3d": {"consumidor_calorico": 2},
    },
    "4": {
        "4a": {"consumidor_calorico": 3},
        "4b": {"equilibrista_da_rotina": 2, "consumidor_calorico": 1},
        "4c": {"empreendedor_modo_aviao": 3},
        "4d": {"investidor_de_reels": 3},
        "4e": {"investidor_de_reels": 2, "equilibrista_da_rotina": 1},
    },
}

# Ordem de desempate
TIEBREAKER = [
    "empreendedor_modo_aviao",
    "equilibrista_da_rotina",
    "investidor_de_reels",
    "consumidor_calorico",
]


def classify(answers: dict[str, str]) -> str:
    """Retorna o profile_id vencedor para o dicionário de respostas."""
    scores = {pid: 0 for pid in PROFILES}

    for question_id, answer_id in answers.items():
        if question_id not in SCORING_MATRIX:
            continue
        for profile_id, points in SCORING_MATRIX[question_id].get(answer_id, {}).items():
            scores[profile_id] += points

    max_score = max(scores.values()) if scores else 0
    if max_score == 0:
        # Sem dados úteis — caímos no perfil mais comum
        return "consumidor_calorico"

    leaders = [pid for pid, s in scores.items() if s == max_score]
    if len(leaders) == 1:
        return leaders[0]

    for pid in TIEBREAKER:
        if pid in leaders:
            return pid
    return leaders[0]
