# arena-planner-ai

Edited arenaintelligence — the Keyword Research agent now runs a fixed 5-step autonomous pipeline (query variants → SERP fetch → URL scoring → keyword pull → AI shortlisting) with commercial/informational intent, optional client knowledge-base context, and a primary/secondary keyword shortlist output. All other agents and app behavior are unchanged.

## Features

- Autonomous 5-step Keyword Research pipeline with query variants, SERP simulation, competitor URL scoring, keyword pooling and AI shortlisting
- Keyword Research inputs: seed keyword, intent (commercial | informational), optional client KB slug and feedback KB ids
- Shortlist output of exactly 2 primary keywords (with reasons) and 10 secondary keywords, rendered in the existing report UI
- Content Research and Article Recommendation agents unchanged
- Background job execution, notifications, history and exports continue to work for all agents

## Tech Stack

- Next.js ^15.3.3 (App Router)
- React ^19.0.0
- Tailwind CSS v3
- TypeScript
- Prisma + PostgreSQL (Neon on Vercel)

## Routes

- `/`
- `/agents/article-recommendation`
- `/agents/content-research`
- `/agents/keyword-research`
- `/dashboard`
- `/history`
- `/login`
- `/settings`

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

1. Copy `.env.example` to `.env` for local development
2. Set `DATABASE_URL` to your Postgres connection string
3. Run `npx prisma db push` before `npm run dev` if tables are missing

On Vercel, `DATABASE_URL` is injected when Neon is connected to the project.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build (runs Prisma generate/push when configured)
- `npm run start` — run the production server locally

## Deploy

This project is intended for deployment on [Vercel](https://vercel.com). Connect the GitHub repository and deploy the `main` branch.
