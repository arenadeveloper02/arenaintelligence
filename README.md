# arena-planner-ai

Pixel-perfect rebuild request for intelligence.position2.com could not be executed as specified: this environment has no web-crawling or browser capability, so the reference site's exact copy, computed styles, assets, and animations cannot be audited or extracted. Rather than fabricating content and shipping an inaccurate 'replica' that overwrites your working production app, this response delivers a detailed discrepancy/requirements report documenting exactly what inputs are needed (per-page copy, screenshots per breakpoint, design tokens, and asset files) to complete the migration accurately in a follow-up edit. No application code was changed, so the deployed app remains fully functional.

## Features

- Discrepancy and requirements report for the intelligence.position2.com rebrand migration
- Documented current-stack audit (Next.js 15 App Router, Tailwind v3, framer-motion, Prisma/Neon, JWT auth)
- Checklist of exact inputs needed per page: copy, layout screenshots, design tokens, assets
- Migration plan mapping existing routes/components to the rebuild workflow
- Zero-risk edit: no production code, schema, or data touched

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
