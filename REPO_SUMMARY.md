# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-06T10:08:51.578Z.

## Overview

INTELLIGENCE by Position2 — a premium AI platform for keyword research, content research and article recommendations with background agent jobs, notifications and execution history.

**Repository:** `arenaintelligence`  
**File count:** 64

## Features

- Three specialized AI agents (keyword research, content research, article recommendation)
- Background job execution with progress, retry, cancel and recovery
- Encrypted OpenAI API key storage (AES-256-GCM)
- JWT httpOnly cookie authentication
- Execution history with structured report viewer and CSV/Markdown/JSON exports
- Notification center with polling and toasts

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

- `AppSetting`
- `User`
- `Setting`
- `Execution`
- `Notification`
- `AgentJob`

## File Inventory

### App pages

- `app/agents/article-recommendation/page.tsx`
- `app/agents/content-research/page.tsx`
- `app/agents/keyword-research/page.tsx`
- `app/dashboard/page.tsx`
- `app/error.tsx`
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
- `components/JobsIndicator.tsx`
- `components/JobsKeepAlive.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/LogoMark.tsx`
- `components/MetricCard.tsx`
- `components/NotificationCenter.tsx`
- `components/ParticleCanvas.tsx`
- `components/PremiumInput.tsx`
- `components/RecommendationCard.tsx`
- `components/ReportView.tsx`
- `components/RunningJobsPanel.tsx`
- `components/SectionContainer.tsx`
- `components/SettingsClient.tsx`
- `components/TimelineComponent.tsx`

### Libraries

- `lib/actions.ts`
- `lib/agents.ts`
- `lib/auth.ts`
- `lib/jobs.ts`
- `lib/prisma.ts`
- `lib/theme.ts`
- `lib/types.ts`
- `prisma/schema.prisma`

### Config

- `.env.example`
- `middleware.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`

### Other

- `DISCREPANCY_REPORT.md`
- `README.md`
- `REPO_SUMMARY.md`

## Complete File Index

- `.env.example`
- `DISCREPANCY_REPORT.md`
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
- `app/error.tsx`
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
- `components/JobsIndicator.tsx`
- `components/JobsKeepAlive.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/LogoMark.tsx`
- `components/MetricCard.tsx`
- `components/NotificationCenter.tsx`
- `components/ParticleCanvas.tsx`
- `components/PremiumInput.tsx`
- `components/RecommendationCard.tsx`
- `components/ReportView.tsx`
- `components/RunningJobsPanel.tsx`
- `components/SectionContainer.tsx`
- `components/SettingsClient.tsx`
- `components/TimelineComponent.tsx`
- `lib/actions.ts`
- `lib/agents.ts`
- `lib/auth.ts`
- `lib/jobs.ts`
- `lib/prisma.ts`
- `lib/theme.ts`
- `lib/types.ts`
- `middleware.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-07-06T10:08:51.578Z
- **Request:** I need you to rebuild my existing website (https://arenaintelligence.vercel.app/) to be an exact, pixel-perfect copy of a reference site: https://intelligence.position2.com/

This is a rebrand/migration — I own both properties — so replicate the reference site's design, layout, and content precisely, matching the current codebase's framework/stack.

Do the following:

1. **Audit the reference site first**
   - Crawl/inspect every page and route on https://intelligence.position2.com/ (not just the homepage — check nav links, footer links, and any subpages).
   - For each page, extract: exact copy/text (headings, body copy, CTAs, microcopy, alt text), section order, layout structure, and content hierarchy.
   - Note fonts (family, weights, sizes), color palette (hex values from computed styles), spacing/padding/margins, border-radius, shadows, and breakpoints for responsive behavior.
   - Extract all images, icons, logos, and illustrations (or note their dimensions/placement if they can't be downloaded directly), and identify any animations or transitions (scroll effects, hover states, entrance animations).
   - Capture the exact header/nav structure, footer structure, and any sticky/fixed elements.

2. **Compare against my current site**
   - Review the existing codebase at arenaintelligence.vercel.app to understand current stack (framework, styling approach, component structure, routing).
   - Map out a diff: what exists vs. what needs to be added/changed/removed to match the reference.

3. **Rebuild inch-by-inch**
   - Recreate every page/section in the same order with the same structure.
   - Match typography exactly (font family — use the same web font or closest licensed equivalent, sizes, weights, line-heights).
   - Match the color system exactly (create it as CSS variables/design tokens for maintainability).
   - Match spacing, grid/container widths, and responsive breakpoints (mobile, tablet, desktop) exactly.
   - Recreate all interactive elements: nav behavior (including mobile menu), buttons, hover/focus states, forms, modals, carousels, accordions, etc.
   - Recreate animations and transitions as closely as possible.
   - Replace all text content with the exact copy from the reference site.
   - Rebuild the footer, header/nav, and any repeated components as reusable components.

4. **Assets**
   - Use my own hosted versions of images/logos (don't hotlink to the reference site) — flag any assets you can't access so I can supply them.
   - Optimize images (proper formats, lazy loading) without changing how they appear.

5. **QA pass**
   - After building, do a side-by-side comparison (viewport-by-viewport) between the reference site and the new build, and list any remaining discrepancies in layout, spacing, copy, or behavior.
   - Test responsiveness across mobile, tablet, and desktop.
   - Check for broken links, missing alt text, and accessibility basics (contrast, semantic HTML).

6. **Deliverables**
   - Updated codebase reflecting the full match.
   - A short discrepancy report of anything you couldn't replicate exactly and why (e.g., proprietary fonts, inaccessible assets, JS behavior you approximated).
