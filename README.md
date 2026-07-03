# Arena Planner AI

A premium, dark-theme multi-agent SaaS platform for SEO and content research. Bring your own OpenAI API key and run three specialized AI agents — Keyword Research, Content Research, and Article Recommendation — with full execution history.

## Features

- Futuristic landing page with animated particle canvas, floating gradient orbs and glassmorphism cards
- Email/password auth with bcrypt hashing and httpOnly JWT cookie sessions
- Middleware-protected dashboard, settings, history and agent routes
- OpenAI API key management: verified against the OpenAI API, encrypted with AES-256-GCM at rest, masked in the UI
- Agent gating — agents are disabled until a valid key is configured
- Three agent workflows with animated loading, progress indicator, markdown output and CSV/report export
- Execution history with search, expandable results and per-report download
- All OpenAI requests proxied through backend API routes — keys never reach the browser

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v3
- Prisma + Neon Postgres
- jsonwebtoken + bcryptjs for auth, Node crypto (AES-256-GCM) for key encryption
- lucide-react icons

## Local Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to a Postgres connection string
3. `npx prisma db push`
4. `npm run dev` and open http://localhost:3000

## Deploy

On Vercel with a connected Neon database, `DATABASE_URL` is injected automatically. The build script runs `prisma generate && prisma db push && next build`. Optionally set `AUTH_SECRET` and `ENCRYPTION_SECRET` env vars for production-grade session signing and key encryption.
