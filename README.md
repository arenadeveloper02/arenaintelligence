# INTELLIGENCE by Position2 (arena-planner-ai)

A premium AI research workspace with three specialized agents (Keyword Research, Content Research, Article Recommendation) that run as durable background jobs — executions survive page navigation, refreshes and closed tabs, and notify you when reports are ready.

## Features

- Database-backed background job system: queued → running → completed / failed / cancelled
- Jobs execute server-side, fully decoupled from the page lifecycle (Next.js `after()` + persisted job rows)
- Automatic stale-job recovery re-dispatches interrupted executions on the next poll
- Progress tracking, cancellation and retry for every job
- Notification center with unread badges, toasts and click-through to reports
- Execution history with searchable, downloadable structured reports (CSV / Markdown / JSON)
- Encrypted (AES-256-GCM) per-user OpenAI API key storage
- Auth with httpOnly cookie sessions (JWT + bcrypt)

## Tech Stack

- Next.js ^15.3.3 (App Router), React ^19
- Tailwind CSS v3, framer-motion, lucide-react
- Prisma + PostgreSQL (Neon on Vercel)

## Local Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to a Postgres connection string
3. `npm run dev` (the build script runs `prisma generate && prisma db push` automatically on deploy)

## Deploy Notes

- On Vercel, connect a Neon database — `DATABASE_URL` is injected automatically
- Background jobs run inside API route invocations via `after()`; `maxDuration = 60` keeps executions alive after the response is sent
