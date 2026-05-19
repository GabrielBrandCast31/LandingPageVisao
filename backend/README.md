# Visão — Backend (FastAPI)

API do funil de qualificação. Roda local com **SQLite** e está pronta para
apontar para **Supabase (PostgreSQL)** apenas trocando a `DATABASE_URL`.

## Stack

- FastAPI 0.115 + Uvicorn
- SQLAlchemy 2.0 (async) + aiosqlite (local) / asyncpg (Supabase)
- Pydantic v2 + Pydantic Settings
- Python 3.11+

## Como rodar

```bash
cd backend

# 1. Criar virtualenv
python3 -m venv venv
source venv/bin/activate

# 2. Instalar dependências
pip install -r requirements.txt

# 3. Copiar variáveis de ambiente
cp .env.example .env

# 4. Subir a API (porta 8000, reload automático)
uvicorn app.main:app --reload
```

Acesse:

- **Docs interativos:** http://localhost:8000/docs
- **Health-check:** http://localhost:8000/api/health
- **OpenAPI JSON:** http://localhost:8000/openapi.json

## Trocar para Supabase

1. Em `Project Settings → Database → Connection string` (Supabase), copie a connection string.
2. No `.env`, troque a `DATABASE_URL` por:

```env
DATABASE_URL=postgresql+asyncpg://postgres.[ref]:[password]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

> Importante: o driver `asyncpg` exige o prefixo `postgresql+asyncpg://` (não use `postgresql://` puro).

3. Reinicie o servidor. As tabelas serão criadas via Alembic em sprint futura — para o Sprint 0, basta executar `init_db()` manualmente apontando para Postgres ou rodar uma migração inicial.

## Endpoints (Sprint 0)

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Status da API + tipo de banco em uso |
| `POST` | `/api/leads` | Cria um lead (payload do quiz) |
| `GET` | `/api/leads` | Lista leads (limite 50 por default) |
| `GET` | `/api/leads/{id}` | Detalhe de um lead |

### Exemplo: criar um lead

```bash
curl -X POST http://localhost:8000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Teste",
    "email": "maria@example.com",
    "phone": "21999999999",
    "age": 29,
    "gender": "feminino",
    "city": "Rio de Janeiro",
    "profile": "equilibrista_da_rotina",
    "source": "meta_ads",
    "lgpd_consent": true,
    "quiz_answers": {"1": "1a", "2": "2b", "3": "3a", "4": "4b"}
  }'
```

## Estrutura

```
backend/
├── app/
│   ├── main.py              # FastAPI app + lifespan
│   ├── config.py            # Settings (env vars)
│   ├── database.py          # Engine async + get_db
│   ├── models/
│   │   └── lead.py          # Lead (SQLAlchemy)
│   ├── schemas/
│   │   └── lead.py          # LeadCreate / LeadOut (Pydantic)
│   └── routers/
│       ├── health.py
│       └── leads.py
├── requirements.txt
├── .env.example
└── visao.db                 # SQLite (gerado em runtime, ignorado pelo git)
```
