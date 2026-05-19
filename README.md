# Visão — Landing Page + Funil de Qualificação

> **Consultoria Financeira & Contábil Humanizada**
> *Pega a Visão!*

Landing page com quiz de diagnóstico em 5 perguntas que classifica o lead em 1 de 4 perfis financeiros, gera um PDF personalizado, captura os dados em CRM e direciona para agendamento de uma reunião gratuita via Google Calendar.

---

## Sumário

- [Visão geral](#visão-geral)
- [Stack técnica](#stack-técnica)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar localmente](#como-rodar-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Sprints](#sprints)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Identidade visual](#identidade-visual)
- [Metas](#metas)
- [Convenções de código](#convenções-de-código)
- [Referências](#referências)

---

## Visão geral

A Visão é uma consultoria financeira e contábil humanizada com **2 anos de mercado**, **70 clientes atendidos** e atuação **100% online em todo o Brasil**. O público principal são **microempreendedores e autônomos** (25-35 anos, classes B e C), incluindo artistas e profissionais da economia criativa.

O projeto entrega:

1. **Landing page institucional** com 10 seções (hero, dores, pilares da metodologia, sócios, quiz, prova social, diferenciais, cashback, FAQ, CTA final).
2. **Quiz de qualificação** com 5 perguntas + captura de dados ao final.
3. **Diagnóstico personalizado em PDF** (4 perfis: Consumidor Calórico, Equilibrista da Rotina, Empreendedor no Modo Avião, Investidor de Reels).
4. **Funil automatizado**: LP → Quiz → PDF + e-mail → Agendamento Google Calendar → CRM.
5. **Diferenciação por origem de tráfego** (Meta Ads, Google Ads, Instagram orgânico, indicação direta).

> A especificação completa está em [FEATURES.js](FEATURES.js).

---

## Stack técnica

Monorepo simples com dois pacotes independentes — **frontend** (Next.js) e **backend** (FastAPI) — comunicando-se via HTTP/JSON.

### Backend ([backend/](backend/))

| Camada | Tecnologia | Motivo |
| --- | --- | --- |
| Framework | **FastAPI** 0.115 + **Uvicorn** | Async nativo, OpenAPI automático, ótimo DX |
| ORM | **SQLAlchemy 2.0** (async) | Mesma codebase roda em SQLite e Postgres |
| Driver DB local | **aiosqlite** | Zero setup para dev |
| Driver DB prod | **asyncpg** | Conexão nativa com Postgres do Supabase |
| Validação | **Pydantic v2** | Tipagem dos payloads do quiz |
| Linguagem | **Python 3.11+** | |

### Frontend ([frontend/](frontend/))

| Camada | Tecnologia | Motivo |
| --- | --- | --- |
| Framework | **Next.js 14** (App Router) + **TypeScript** | SSR, deploy 1-clique na Vercel |
| Estilização | **Tailwind CSS** + design tokens | Paleta da marca como classes utilitárias |
| Fontes | Poppins + Inter + Nunito (Google Fonts) | Brittany (paga) entra em Sprint 1 |
| Componentes | **shadcn/ui** (Sprint 1) | Radix headless + código no projeto |
| Animação | **Framer Motion** (Sprint 1) | Micro-interações |
| Formulários | **React Hook Form** + **Zod** (Sprint 3) | Validação tipada |
| Geração de PDF | **@react-pdf/renderer** (Sprint 4) | Server-side |

### Infra & serviços externos

| Serviço | Quando entra |
| --- | --- |
| **SQLite** | Sprint 0 (local) |
| **Supabase** (Postgres + Storage) | Sprint 3+ (produção) |
| **Resend** (e-mail transacional) | Sprint 4 |
| **Google Calendar** (agendamento) | Sprint 5 |
| **Meta Pixel** + **GTM** | Sprint 5 |
| **Vercel** (frontend) + **Railway/Fly.io** (backend) | Sprint 8 |

---

## Estrutura do projeto

```
ProjetoVisao/
├── FEATURES.js                    # Especificação técnica (fonte da verdade do conteúdo)
├── README.md                      # Este arquivo
│
├── backend/                       # FastAPI
│   ├── app/
│   │   ├── main.py                # FastAPI app + CORS + lifespan
│   │   ├── config.py              # Settings (env vars)
│   │   ├── database.py            # Engine async + get_db
│   │   ├── models/
│   │   │   └── lead.py            # SQLAlchemy
│   │   ├── schemas/
│   │   │   └── lead.py            # Pydantic
│   │   └── routers/
│   │       ├── health.py          # GET /api/health
│   │       └── leads.py           # POST/GET /api/leads
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
└── frontend/                      # Next.js
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx         # Fonts + metadata
    │   │   ├── page.tsx           # Landing page (Sprint 0: hero + pilares)
    │   │   └── globals.css        # Tailwind + tokens
    │   ├── components/
    │   │   └── HealthBadge.tsx    # Conexão com a API
    │   └── lib/
    │       └── api.ts             # Cliente HTTP
    ├── tailwind.config.ts         # Paleta da marca
    ├── package.json
    ├── .env.example
    └── README.md
```

---

## Como rodar localmente

Você precisa de **dois terminais** — um para o backend e outro para o frontend.

### Pré-requisitos

- Python **3.11+**
- Node.js **20+**
- npm 10+

### 1. Backend (FastAPI + SQLite)

```bash
cd backend

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
uvicorn app.main:app --reload
```

API disponível em [http://localhost:8000](http://localhost:8000) e docs em [http://localhost:8000/docs](http://localhost:8000/docs).

### 2. Frontend (Next.js)

```bash
cd frontend

npm install
cp .env.example .env.local

npm run dev
```

Frontend disponível em [http://localhost:3000](http://localhost:3000). A hero mostra um *badge* indicando o status da API.

### Quando migrar para Supabase

Basta editar `backend/.env`:

```env
# Comente o SQLite e descomente o Postgres
DATABASE_URL=postgresql+asyncpg://postgres.[ref]:[senha]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

Nenhuma mudança no código — o SQLAlchemy abstrai os dois drivers.

---

## Variáveis de ambiente

### Backend ([backend/.env](backend/.env.example))

```env
APP_NAME=Visão API
ENVIRONMENT=development
DATABASE_URL=sqlite+aiosqlite:///./visao.db
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend ([frontend/.env.local](frontend/.env.example))

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Em sprints futuras serão adicionadas: `RESEND_API_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_CALENDAR_BOOKING_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`.

---

## Sprints

O projeto está organizado em **8 sprints** com entregáveis claros. Estimativa total: **9 a 13 semanas**.

### Sprint 0 — Fundação técnica · *3-5 dias* ✅

**Objetivo:** ambiente pronto para começar a construir.

- [x] Backend FastAPI com SQLAlchemy async (SQLite local / Postgres-Supabase prod)
- [x] Modelo `Lead` + schema Pydantic + rotas `GET /api/health` e `POST/GET /api/leads`
- [x] Frontend Next.js 14 (App Router) + TypeScript
- [x] Tailwind + tokens de marca (cores e fontes Poppins/Inter/Nunito)
- [x] Hero provisória + badge de status da API
- [x] CORS configurado para permitir o frontend chamar a API
- [ ] Setup do repositório no GitHub + CI básica *(pendente, depende do usuário)*
- [ ] Provisionar projeto Supabase real *(pendente)*

**Entregáveis:** `uvicorn app.main:app --reload` + `npm run dev` rodando localmente com hero exibindo o status da API.

---

### Sprint 1 — Design system & componentes base · *1 semana*

**Objetivo:** biblioteca de UI pronta para montar as seções.

- [ ] Tokens (`src/styles/tokens.css`): cores, raios, sombras, espaçamentos
- [ ] Tipografia: `Heading`, `Text`, `Slogan` (Brittany apenas para "Pega a Visão!")
- [ ] Componentes: `Button`, `Card`, `Pill`, `Input`, `Select`, `RadioGroup`, `ProgressBar`, `Section`
- [ ] Layout: `Header` (logo + CTA), `Footer` (Instagram, política, CNPJ)
- [ ] Storybook ou Ladle para validar isoladamente (opcional)
- [ ] Setup do Framer Motion + presets de animação reutilizáveis

**Entregáveis:** página `/playground` com todos os componentes navegáveis.

---

### Sprint 2 — Landing page (estrutural) · *2 semanas*

**Objetivo:** todas as seções estáticas no ar.

- [ ] **Seção 1** — Hero (headline versão C, CTA "Pega a visão com o nosso diagnóstico gratuito!")
- [ ] **Seção 2** — Identificação do problema (9 frases de dor)
- [ ] **Seção 3** — Os 3 pilares (Clareza Financeira, Estrutura Sem Complicação, Acompanhamento Humano) — cada um com cor + forma própria
- [ ] **Seção 4** — Quem está por trás (Felipe + Sabrina, bios curtas)
- [ ] **Seção 7** — Diferenciais (tabela comparativa sem citar concorrentes + 4 frases de impacto)
- [ ] **Seção 9** — FAQ (placeholder até receber as 8 perguntas)
- [ ] **Seção 10** — CTA final + Rodapé
- [ ] Responsividade mobile-first
- [ ] Animações de scroll (reveal)

**Entregáveis:** LP navegável (sem o quiz funcional ainda) em ambiente de preview.

---

### Sprint 3 — Quiz de qualificação · *2 semanas*

**Objetivo:** quiz funcional com classificação de perfil.

- [ ] **Seção 5** — bloco de chamada do quiz na LP
- [ ] Componente `QuizFlow` com estado (5 perguntas + tela de captura)
- [ ] Validação com Zod das respostas
- [ ] Captura de dados: nome, telefone, e-mail, idade, gênero, cidade + consent LGPD
- [ ] Algoritmo de scoring → classifica em 1 dos 4 perfis (Consumidor Calórico, Equilibrista da Rotina, Empreendedor no Modo Avião, Investidor de Reels)
- [ ] Persistência no Supabase (`leads` + `quiz_responses`)
- [ ] Tela de obrigado com mensagem por perfil
- [ ] Testes unitários do scoring (cobertura 100% dos perfis)

**Entregáveis:** quiz end-to-end gravando no banco + perfil classificado corretamente.

---

### Sprint 4 — Diagnóstico em PDF + e-mail · *1-2 semanas*

**Objetivo:** lead recebe o diagnóstico no e-mail logo após o quiz.

- [ ] Template base do PDF em `@react-pdf/renderer` (capa, diagnóstico, próximos passos, CTA Calendar)
- [ ] 4 variações do PDF (uma por perfil) com cores e ilustrações alinhadas
- [ ] Endpoint `/api/pdf/[profile]` que gera o PDF dinamicamente com os dados do lead
- [ ] Upload do PDF no Supabase Storage
- [ ] Template de e-mail em React Email (uma versão por perfil — textos no [doc da Visão](https://docs.google.com/document/d/1PMEHLUKq9LP9SrV4oRryegpnj5AUzQrE1CbnZUJen-Y/edit))
- [ ] Envio via Resend com PDF anexado + link Calendar no corpo
- [ ] Retry e fallback se o envio falhar

**Entregáveis:** lead completa o quiz → recebe e-mail com PDF em até 1 minuto.

---

### Sprint 5 — Integrações (Calendar, CRM, Pixels) · *1-2 semanas*

**Objetivo:** funil completo plugado nas ferramentas comerciais.

- [ ] Botão de agendamento Google Calendar (Felipe) na tela de obrigado e no e-mail
- [ ] Webhook do Calendar → atualiza status do lead no Supabase (`agendou: true`)
- [ ] CTA WhatsApp para o fluxo de **indicação direta** (sem quiz)
- [ ] Meta Pixel: eventos `lp_view`, `quiz_start`, `quiz_complete`, `lead_captured`, `meeting_scheduled`
- [ ] Google Tag Manager equivalente
- [ ] (Opcional) Export automático do CRM Supabase → planilha Google para a equipe comercial via Apps Script

**Entregáveis:** mensuração ponta-a-ponta funcionando + lead chega no Felipe em até 24h.

---

### Sprint 6 — Conteúdo dinâmico & prova social · *1 semana*

**Objetivo:** seções pendentes de conteúdo da Visão entram no ar.

- [ ] **Seção 6** — Prova social (3 a 6 depoimentos coletados na fase de produção)
- [ ] **Seção 8** — Programa de cashback (decidir entre seção dedicada ou menção menor — pendência da Visão)
- [ ] **Seção 9** — FAQ com as 8 perguntas reais e respostas padrão
- [ ] Estruturar 2-3 mini-cases mensuráveis com base nos 4 cases do briefing
- [ ] Substituir placeholders de fotos pelos arquivos da sessão fotográfica

**Entregáveis:** LP 100% com conteúdo final.

---

### Sprint 7 — LGPD + Política de Privacidade · *3-5 dias*

**Objetivo:** projeto em conformidade antes do go-live.

- [ ] Página `/politica-privacidade` com texto revisado
- [ ] Banner de cookies com consent management (analytics opt-in)
- [ ] Checkbox de consent no formulário de captura do quiz (obrigatório)
- [ ] Log de consents na tabela `consents` do Supabase
- [ ] Endpoint `/api/lead/me/delete` para direito ao esquecimento
- [ ] Revisão jurídica (responsabilidade da Visão)

**Entregáveis:** captura de dados em conformidade com a LGPD.

---

### Sprint 8 — QA, performance & go-live · *1 semana*

**Objetivo:** lançar com confiança.

- [ ] Testes end-to-end com Playwright (LP → Quiz → PDF → E-mail → Calendar)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Testes em dispositivos reais (iOS Safari, Android Chrome)
- [ ] Otimização de imagens (next/image, AVIF/WebP)
- [ ] Setup de monitoramento (Vercel Analytics + Sentry para erros)
- [ ] Domínio próprio configurado (DNS + SSL automático)
- [ ] Smoke test com 5 leads reais (equipe da Visão)
- [ ] Documentação de operação para a equipe comercial (como receber o lead, status no CRM, etc.)

**Entregáveis:** produto em produção, mensuração ativa, equipe treinada.

---

### Cronograma consolidado

| Sprint | Duração | Acumulado |
| --- | --- | --- |
| 0 — Fundação | 3-5 dias | Semana 1 |
| 1 — Design system | 1 semana | Semana 2 |
| 2 — LP estrutural | 2 semanas | Semanas 3-4 |
| 3 — Quiz | 2 semanas | Semanas 5-6 |
| 4 — PDF + e-mail | 1-2 semanas | Semanas 7-8 |
| 5 — Integrações | 1-2 semanas | Semanas 9-10 |
| 6 — Conteúdo dinâmico | 1 semana | Semana 11 |
| 7 — LGPD | 3-5 dias | Semana 12 |
| 8 — QA + go-live | 1 semana | Semana 13 |

> **Caminho crítico:** Sprints 0 → 1 → 2 → 3 → 4 são sequenciais. As Sprints 5 e 6 podem rodar em paralelo se houver dois desenvolvedores.

---

## Decisões de arquitetura

- **FEATURES.js como fonte da verdade:** todo conteúdo aprovado pela Visão vive em [FEATURES.js](FEATURES.js). Componentes importam dele, evitando texto duplicado e facilitando ajustes editoriais.
- **Server-side rendering por padrão:** páginas de conteúdo são SSR para SEO. Apenas o quiz é client-component (precisa de estado interativo).
- **Geração de PDF server-side:** previne o cliente de ter que carregar `react-pdf` (250kb+) e garante consistência visual.
- **Supabase RLS desde o dia 1:** ninguém deve conseguir ler dados de leads pela API pública. Service role apenas em rotas de API.
- **Sem CMS no MVP:** o volume de mudanças no conteúdo é baixo. Editar em `FEATURES.js` + redeploy é mais barato do que manter Sanity/Strapi. Reavaliar pós-launch se a Visão pedir autonomia editorial.

---

## Identidade visual

**Cores:**

| Token | Hex | Uso |
| --- | --- | --- |
| `--color-purple` | `#8350F2` | Primária — pilar Clareza Financeira |
| `--color-black` | `#322B41` | Texto principal |
| `--color-blue` | `#859EF6` | Secundária — pilar Estrutura Sem Complicação |
| `--color-green` | `#C0F685` | Secundária — pilar Acompanhamento Humano |
| `--color-off-white` | `#F9FAF9` | Fundo |
| `--color-yellow` | `#F2E850` | CTA / destaque |

**Tipografia:**

- **Títulos:** Poppins
- **Corpo:** Inter
- **Destaques humanos:** Nunito
- **Slogan "Pega a Visão!":** Brittany (uso exclusivo)

**Tom de voz:** conversacional, próximo, sem "economês". Promessa de **ALÍVIO MENTAL**, não venda de serviço.

---

## Metas

- **70 a 100 leads/mês** vindos da LP
- **20 clientes pagantes novos/mês**
- **Ticket médio mensal:** R$ 265,00 (Consultoria Básica) + foco em conversão para plano semestral
- **Resposta ao lead:** em até **24 horas** após o agendamento

---

## Convenções de código

- Componentes: PascalCase (`PillarsSection.tsx`)
- Hooks: camelCase iniciando com `use` (`useQuizScoring.ts`)
- Rotas de API: kebab-case
- Imports absolutos via `@/` apontando para `src/`
- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.)

---

## Referências

- **Briefing original:** `Briefing Landing Page Agência BrandCast x Visão - Google Docs.pdf`
- **Especificação técnica:** [FEATURES.js](FEATURES.js)
- **E-mails por perfil:** [Google Doc da Visão](https://docs.google.com/document/d/1PMEHLUKq9LP9SrV4oRryegpnj5AUzQrE1CbnZUJen-Y/edit)
- **Instagram da Visão:** [@visao_oficial](https://instagram.com/visao_oficial)
- **YouTube da Visão:** [Visão Oficial](https://www.youtube.com/@Visãooficial)
- **WhatsApp comercial:** [+55 21 99707-9059](https://wa.me/5521997079059)
- **Inspiração visual:** [linkcommerce.app/leticia-vaz](https://www.linkcommerce.app/leticia-vaz)

---

**© Azevedo Guimarães Produções LTDA — CNPJ 54.589.204/0001-39**
*Desenvolvido pela Agência BrandCast.*
