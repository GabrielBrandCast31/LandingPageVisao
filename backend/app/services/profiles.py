"""Catálogo dos 4 perfis de diagnóstico da Visão.

Espelha o que está documentado em FEATURES.js → QUIZ.profiles, com a
estrutura de cores para alimentar o PDF.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class Profile:
    id: str
    name: str
    summary: str
    diagnosis: str
    recommended_service: str
    signals: list[str]
    accent_color: str  # hex


PROFILES: dict[str, Profile] = {
    "consumidor_calorico": Profile(
        id="consumidor_calorico",
        name="Consumidor Calórico",
        summary="O dinheiro vai embora nos pequenos excessos do cotidiano.",
        diagnosis=(
            "Sua rotina e os pequenos gastos do dia a dia podem estar consumindo "
            "seu dinheiro sem que você perceba. Mais do que falta de controle, esse "
            "perfil mostra falta de visão sobre hábitos financeiros e prioridades."
        ),
        recommended_service="Consultoria Básica",
        signals=[
            "Vida corrida e renda variável dificultam manter um método.",
            "Os 'pequenos gastos' do dia a dia somam mais do que parecem.",
            "Você sente que sabe o que faz, mas não enxerga o conjunto.",
        ],
        accent_color="#8350F2",
    ),
    "equilibrista_da_rotina": Profile(
        id="equilibrista_da_rotina",
        name="Equilibrista da Rotina",
        summary=(
            "Tenta equilibrar trabalho, vida pessoal e dinheiro, mas sente que "
            "está sempre apagando incêndios."
        ),
        diagnosis=(
            "Você tenta equilibrar trabalho, vida pessoal e estabilidade financeira "
            "ao mesmo tempo. Esse perfil normalmente aparece quando existe excesso "
            "de responsabilidades e pouca estrutura para sustentar tudo sozinho(a)."
        ),
        recommended_service="Mentoria Financeira (Consultoria Avançada)",
        signals=[
            "Você toma boas decisões pontuais, mas falta planejamento.",
            "Um imprevisto pequeno ainda bagunça o mês inteiro.",
            "Existe espaço pra evoluir — só falta método e acompanhamento.",
        ],
        accent_color="#859EF6",
    ),
    "empreendedor_modo_aviao": Profile(
        id="empreendedor_modo_aviao",
        name="Empreendedor no Modo Avião",
        summary=(
            "Foca tanto em fazer o negócio funcionar que a parte burocrática "
            "entra no 'modo avião'."
        ),
        diagnosis=(
            "Você provavelmente dedica toda sua energia ao negócio e acaba "
            "deixando organização financeira e burocracias para depois. Esse perfil "
            "é comum em rotinas multitarefa e empreendimentos em crescimento."
        ),
        recommended_service="Serviços Contábeis + Consultoria",
        signals=[
            "MEI, NF e DAS viraram dor de cabeça recorrente.",
            "Você mistura conta pessoal e da empresa sem perceber.",
            "Quer profissionalizar, mas não sabe por onde começar.",
        ],
        accent_color="#C0F685",
    ),
    "investidor_de_reels": Profile(
        id="investidor_de_reels",
        name="Investidor de Reels",
        summary=(
            "Consome conteúdo financeiro o tempo todo, mas ainda não conseguiu "
            "transformar informação em estratégia."
        ),
        diagnosis=(
            "Você já busca aprender sobre dinheiro e investimentos, mas ainda "
            "sente dificuldade em transformar informação em direção prática. Esse "
            "perfil costuma surgir no excesso de conteúdo e comparação digital."
        ),
        recommended_service="Mentoria Financeira (Consultoria Avançada)",
        signals=[
            "Você já tem base, mas falta um plano consistente.",
            "Há mais opções de investimento abertas no celular do que decisões.",
            "Comparação digital atrapalha mais do que ajuda.",
        ],
        accent_color="#F2E850",
    ),
}


def get_profile(profile_id: str) -> Profile:
    return PROFILES[profile_id]
