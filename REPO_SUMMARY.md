# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-03T11:57:11.609Z.

## Overview

INTELLIGENCE by Position2 — a premium 3D AI platform for keyword, content, and article research.

**Repository:** `arenaintelligence`  
**File count:** 42

## Features

- Keyword research agent
- Content research agent
- Article recommendation agent
- Execution history
- Secure OpenAI API key storage

## Tech Stack

- Next.js ^15.3.3 (App Router)
- React ^19.0.0
- Tailwind CSS v3
- TypeScript
- Prisma + PostgreSQL (Neon on Vercel)

## Infrastructure

- **DATABASE_URL:** set on Vercel when Neon is connected — do not commit real credentials

## Routes & Pages

- `/` — `app/page.tsx`
- `/agents/article-recommendation` — `app/agents/article-recommendation/page.tsx`
- `/agents/content-research` — `app/agents/content-research/page.tsx`
- `/agents/keyword-research` — `app/agents/keyword-research/page.tsx`
- `/dashboard` — `app/dashboard/page.tsx`
- `/history` — `app/history/page.tsx`
- `/login` — `app/login/page.tsx`
- `/settings` — `app/settings/page.tsx`

## Database Models

- `User`
- `Setting`
- `Execution`

## File Inventory

### App pages

- `app/agents/article-recommendation/page.tsx`
- `app/agents/content-research/page.tsx`
- `app/agents/keyword-research/page.tsx`
- `app/dashboard/page.tsx`
- `app/globals.css`
- `app/history/page.tsx`
- `app/layout.tsx`
- `app/login/page.tsx`
- `app/not-found.tsx`
- `app/page.tsx`
- `app/settings/page.tsx`

### API routes

- `app/api/agents/run/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/settings/api-key/route.ts`

### Components

- `components/AgentRunnerClient.tsx`
- `components/AppShell.tsx`
- `components/DashboardClient.tsx`
- `components/HistoryClient.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/ParticleCanvas.tsx`
- `components/SettingsClient.tsx`

### Libraries

- `lib/actions.ts`
- `lib/agents.ts`
- `lib/auth.ts`
- `lib/prisma.ts`
- `lib/types.ts`
- `prisma/schema.prisma`

### Config

- `.env.example`
- `middleware.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`

### Other

- `README.md`
- `REPO_SUMMARY.md`

## Complete File Index

- `.env.example`
- `README.md`
- `REPO_SUMMARY.md`
- `app/agents/article-recommendation/page.tsx`
- `app/agents/content-research/page.tsx`
- `app/agents/keyword-research/page.tsx`
- `app/api/agents/run/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/settings/api-key/route.ts`
- `app/dashboard/page.tsx`
- `app/globals.css`
- `app/history/page.tsx`
- `app/layout.tsx`
- `app/login/page.tsx`
- `app/not-found.tsx`
- `app/page.tsx`
- `app/settings/page.tsx`
- `components/AgentRunnerClient.tsx`
- `components/AppShell.tsx`
- `components/DashboardClient.tsx`
- `components/HistoryClient.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/ParticleCanvas.tsx`
- `components/SettingsClient.tsx`
- `lib/actions.ts`
- `lib/agents.ts`
- `lib/auth.ts`
- `lib/prisma.ts`
- `lib/types.ts`
- `middleware.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-07-03T11:57:11.609Z
- **Request:** Update the existing application branding only.

### Required Change

Replace every occurrence of:

* **Arena Planner AI**

with:

* **INTELLIGENCE by Position2**

### Scope of Changes

Update the new brand name everywhere it appears, including but not limited to:

* Landing page hero section
* Navbar and header
* Dashboard welcome message
* Sidebar branding/logo text
* Authentication pages
* Browser title (`<title>`)
* Metadata and SEO tags
* Footer
* Settings pages
* Empty states
* Notifications and toast messages
* Loading screens
* Emails and system messages
* Documentation references
* Any hardcoded text, constants, or configuration values

### Important Constraints

* Do **not** change any functionality, routes, APIs, database schema, styling, layouts, animations, colors, components, or business logic.
* Do **not** rename variables, file names, database tables, environment variables, or internal identifiers unless they are user-facing text.
* Keep the existing premium 3D Intelligence Platform design exactly as it is.
* Preserve all existing features and behavior.

This is a **branding update only**. The only visible change should be replacing the product name **"Arena Planner AI"** with **"INTELLIGENCE by Position2"** throughout the application.
