# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-04T06:56:46.682Z.

## Overview

INTELLIGENCE by Position2 — a premium AI platform for keyword research, content research, and article recommendations with Position2 Intelligence branding.

**Repository:** `arenaintelligence`  
**File count:** 59

## Features

- Position2 Intelligence branding with local /public/logo-mark.svg
- Email/password authentication with httpOnly cookie sessions
- Encrypted OpenAI API key storage (AES-256-GCM)
- Three AI agents: keyword research, content research, article recommendation
- Execution history with structured report views and exports

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
- `components/AnimatedBackground.tsx`
- `components/AppShell.tsx`
- `components/CitationCard.tsx`
- `components/DashboardClient.tsx`
- `components/ExecutionTimeline.tsx`
- `components/ExportCard.tsx`
- `components/FloatingPanel.tsx`
- `components/GlassCard.tsx`
- `components/GradientButton.tsx`
- `components/HistoryClient.tsx`
- `components/InsightCard.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/LogoMark.tsx`
- `components/MetricCard.tsx`
- `components/ParticleCanvas.tsx`
- `components/PremiumInput.tsx`
- `components/RecommendationCard.tsx`
- `components/ReportView.tsx`
- `components/SectionContainer.tsx`
- `components/SettingsClient.tsx`
- `components/TimelineComponent.tsx`

### Libraries

- `lib/actions.ts`
- `lib/agents.ts`
- `lib/auth.ts`
- `lib/prisma.ts`
- `lib/theme.ts`
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
- `public/logo-mark.svg`

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
- `components/AnimatedBackground.tsx`
- `components/AppShell.tsx`
- `components/CitationCard.tsx`
- `components/DashboardClient.tsx`
- `components/ExecutionTimeline.tsx`
- `components/ExportCard.tsx`
- `components/FloatingPanel.tsx`
- `components/GlassCard.tsx`
- `components/GradientButton.tsx`
- `components/HistoryClient.tsx`
- `components/InsightCard.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/LogoMark.tsx`
- `components/MetricCard.tsx`
- `components/ParticleCanvas.tsx`
- `components/PremiumInput.tsx`
- `components/RecommendationCard.tsx`
- `components/ReportView.tsx`
- `components/SectionContainer.tsx`
- `components/SettingsClient.tsx`
- `components/TimelineComponent.tsx`
- `lib/actions.ts`
- `lib/agents.ts`
- `lib/auth.ts`
- `lib/prisma.ts`
- `lib/theme.ts`
- `lib/types.ts`
- `middleware.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `public/logo-mark.svg`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-07-04T06:56:46.682Z
- **Request:** Update the application branding by replacing the current logo with the Position2 Intelligence logo.

Logo URL:
https://intelligence.position2.com/static/logo-mark.svg?v=3

Requirements:
1. Replace the existing logo everywhere in the application:
   - Login page
   - Sidebar
   - Header/Navbar
   - Favicon (if applicable)
   - Loading screens
   - Empty states
   - Any marketing or landing pages

2. Download the SVG and store it locally in:
   /public/logo-mark.svg

3. Do not hotlink the image directly from the external URL in production.

4. Ensure the logo:
   - Maintains its original aspect ratio.
   - Looks crisp on retina displays.
   - Supports both light and dark themes.
   - Is responsive on mobile, tablet, and desktop.

5. Update metadata:
   - Open Graph image (if appropriate)
   - App icons
   - Manifest icons (if applicable)

6. Replace any references to the old logo or old branding assets.

7. Verify that the logo renders correctly:
   - Desktop
   - Mobile
   - Sidebar collapsed state
   - High-DPI screens

Do not change any other UI, colors, layout, or functionality. Only update the branding assets and logo references throughout the application.
