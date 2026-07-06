# INTELLIGENCE by Position2 (arena-planner-ai)

A premium AI intelligence platform embedding the SEO Studio agent suite: Keyword Research, Content Research and Article Recommendation agents, executed as resilient background jobs with structured, downloadable reports.

## Features

- **Keyword Research agent** — autonomous 5-step pipeline (query variants → SERP fetch → URL scoring → keyword pull → AI shortlisting) delivering 2 primary + 10 secondary keywords
- **Content Research agent** — SERP analysis brief with H2/H3 patterns, word-count benchmarks, semantic keywords and content gaps
- **Article Recommendation agent** — full ready-to-write article brief with H1, outline, per-section instructions, FAQs and word-count target
- **Background jobs** — server-side execution with heartbeat recovery, cancel and retry; jobs survive navigation and refresh
- **Notification center** — grouped notifications, toasts, chime and optional browser notifications
- **Execution history** — searchable, expandable structured reports with CSV / Markdown / JSON export
- **Security** — bcrypt password hashing, JWT httpOnly cookie sessions, AES-256-GCM encrypted OpenAI API keys

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS 3, framer-motion, lucide-react
- Prisma + Neon Postgres
- OpenAI Chat Completions (user-provided API key)

## Local setup

```bash
npm install
cp .env.example .env   # set DATABASE_URL (Postgres)
npm run dev
```

The build script runs `prisma generate && prisma db push && next build`, so the schema is pushed automatically on deploy.

## Environment

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (injected by Vercel + Neon) |
| `AUTH_SECRET` | Optional JWT signing secret (defaults to a dev secret) |
| `ENCRYPTION_SECRET` | Optional AES key material for API key encryption |

## Deploy

Deploy to Vercel with a connected Neon Postgres database. `DATABASE_URL` is injected automatically when the database is connected to the project.
