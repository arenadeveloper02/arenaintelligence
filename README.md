# INTELLIGENCE by Position2 (arena-planner-ai)

A premium AI agent platform for keyword research, content research and article recommendations — with a production-grade background job system so agent executions keep running even when the user navigates away, refreshes, or closes the tab.

## Features

- **Background job system** — every agent run is persisted as an `AgentJob` row (queued → running → completed / failed / cancelled) and executed server-side via `after()`, fully decoupled from the page lifecycle
- **Self-healing job recovery** — stale queued/running jobs are detected via heartbeats and re-dispatched automatically from any authenticated route
- **Running Jobs panel** — live progress, step labels, cancel and retry controls on the dashboard
- **Notifications** — badge counts, toasts, browser notifications and click-through to generated reports
- **Three AI agents** — Keyword Research, Content Research, Article Recommendation (OpenAI-powered)
- **Secure by default** — AES-256-GCM encrypted API keys, bcrypt passwords, httpOnly JWT session cookies

## Tech stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS 3 · framer-motion · lucide-react
- Prisma + Neon Postgres

## Local setup

```bash
npm install
cp .env.example .env   # set DATABASE_URL
npm run dev
```

The build script runs `prisma generate && prisma db push && next build`, so the schema is pushed automatically on deploy.

## Deploy

Deploy to Vercel with a Neon Postgres database connected — `DATABASE_URL` is injected automatically. Optionally set `AUTH_SECRET` and `ENCRYPTION_SECRET` in production.
