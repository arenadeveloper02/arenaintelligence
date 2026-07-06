# INTELLIGENCE by Position2 (arena-planner-ai)

A premium AI research workspace with three agents (Keyword Research, Content Research, Article Recommendation) that run as persistent background jobs — execution continues even if you navigate away, refresh, or close the tab.

## Features

- Persistent background job system (queued → running → completed/failed/cancelled) stored in Postgres
- Server-side agent execution fully decoupled from the page lifecycle via Next.js `after()`
- Self-healing recovery: stale/interrupted jobs are automatically re-dispatched on the next poll
- Running Jobs panel with live progress, cancel and retry
- Notification center with unread badge, toasts and click-through to reports
- Execution history with downloadable CSV / Markdown / JSON reports
- Encrypted OpenAI API key storage (AES-256-GCM) and httpOnly cookie sessions

## Tech Stack

- Next.js ^15.3.3 (App Router) + React ^19
- TypeScript, Tailwind CSS v3, framer-motion, lucide-react
- Prisma + PostgreSQL (Neon on Vercel)

## Local Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `DATABASE_URL`
3. `npx prisma generate && npx prisma db push`
4. `npm run dev`

## Deploy

On Vercel with Neon connected, `DATABASE_URL` is injected automatically. The build script runs `prisma generate && prisma db push && next build`.
