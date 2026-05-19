# Visão — Frontend (Next.js)

Landing page do funil. Sprint 0 entrega a fundação técnica: design tokens da
marca, fontes Google carregadas, integração com a API FastAPI e uma hero
provisória para validar o ambiente.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS com tokens da marca (cores e tipografia)
- Google Fonts: Poppins (títulos), Inter (corpo), Nunito (destaques humanos)

> **Nota:** A fonte **Brittany** (slogan "Pega a Visão!") é paga e será
> adicionada manualmente em `public/fonts/` no Sprint 1.

## Como rodar

```bash
cd frontend

# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env.local

# 3. Subir o dev server
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | Dev server com hot reload |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build em produção |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit` |

## Estrutura

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Fonts + metadata
│   │   ├── page.tsx           # Hero provisória + Pilares
│   │   └── globals.css        # Tailwind + tokens CSS
│   ├── components/
│   │   └── HealthBadge.tsx    # Indicador de conexão com a API
│   └── lib/
│       └── api.ts             # Cliente HTTP (health, createLead)
├── tailwind.config.ts         # Paleta + fontes da marca
├── tsconfig.json
└── next.config.mjs
```

## Paleta da marca

| Token Tailwind | Hex | Uso |
| --- | --- | --- |
| `purple` | `#8350F2` | Primária / Pilar Clareza Financeira |
| `ink` | `#322B41` | Texto principal |
| `sky` | `#859EF6` | Pilar Estrutura Sem Complicação |
| `lime` | `#C0F685` | Pilar Acompanhamento Humano |
| `cream` | `#F9FAF9` | Fundo |
| `gold` | `#F2E850` | CTAs |
