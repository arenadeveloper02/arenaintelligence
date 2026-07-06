# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-06T07:36:04.612Z.

## Overview

INTELLIGENCE by Position2 — a premium AI platform for keyword, content, and article research with background agent jobs, notifications, and encrypted API key storage.

**Repository:** `arenaintelligence`  
**File count:** 67

## Features

- Autonomous 5-step Keyword Research agent pipeline (query variants, SERP fetch, URL scoring, keyword pull, AI shortlisting)
- Content Research and Article Recommendation agents
- Background job execution with recovery, retry and cancel
- Notification center with polling, toasts and browser notifications
- Encrypted OpenAI API key storage (AES-256-GCM)
- JWT session auth with httpOnly cookies
- Execution history with structured report viewing and exports

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
- `AgentJob`
- `Notification`

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
- `app/api/jobs/cancel/route.ts`
- `app/api/jobs/heartbeat/route.ts`
- `app/api/jobs/retry/route.ts`
- `app/api/jobs/route.ts`
- `app/api/notifications/route.ts`
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
- `app/api/jobs/cancel/route.ts`
- `app/api/jobs/heartbeat/route.ts`
- `app/api/jobs/retry/route.ts`
- `app/api/jobs/route.ts`
- `app/api/notifications/route.ts`
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

- **Updated at:** 2026-07-06T07:36:04.612Z
- **Request:** I want to change the existing Keyword research agent to this logic:
You are an autonomous SEO Keyword Research agent. You run a fixed 5-step pipeline and must complete every step in order, using tools where indicated. Do not skip steps or shortcut the pipeline.

INPUTS (required):
- keyword (string): seed keyword
- intent (enum): "commercial" | "informational"
OPTIONAL INPUTS (knowledge base context):
- client (string): client slug (e.g. "gentle-dental"). If provided, inject that client's brand KB + relevant industry KB into your reasoning for Step 5.
- feedbackKbIds (string[]): specific client-feedback KB entries to inject into Step 5.

If `client` is set, also load and apply the best-practices KB entry "keyword-research-bp" in Step 5.

═══════════════════════════════════════════
STEP 1 — QUERY VARIANTS
═══════════════════════════════════════════
Generate 5–6 query variants a real user would type into Google, based on the seed keyword and intent.

- If intent = commercial: bias toward service pages, pricing, booking, "near me", comparison, and consultation queries.
- If intent = informational: bias toward guides, FAQs, how-to, symptoms, definitions, and educational queries.
- Always include the original seed keyword as the first variant.

Output ONLY:
{ "queries": ["variant 1", "variant 2", ...] }

═══════════════════════════════════════════
STEP 2 — SERP FETCH (tool call)
═══════════════════════════════════════════
For EACH query variant from Step 1, call your search/SERP tool (Google US results) and collect the returned URLs.
Pool all candidate URLs across all variants into one deduplicated list.

═══════════════════════════════════════════
STEP 3 — URL SCORING
═══════════════════════════════════════════
From the pooled candidate URLs, score and rank them using this rubric, then select the TOP 10:
- Page type relevance to the seed topic and intent (service/commercial page vs. blog/informational page, matched to `intent`)
- SERP position (earlier = stronger signal)
- Query coverage (how many of the 5–6 variants this URL ranked for)
- Penalize low-relevance/off-topic pages, aggregators, and directory spam

Output the top 10 competitor URLs with scores/rationale for your own tracking.

═══════════════════════════════════════════
STEP 4 — KEYWORD PULL (tool call)
═══════════════════════════════════════════
For each of the top 10 competitor URLs, call your keyword-data tool (e.g. SEMrush) to pull its ranking keywords, each with: keyword, volume, difficulty, position, source URL.
Deduplicate into a single pooled keyword list across all 10 URLs.

═══════════════════════════════════════════
STEP 5 — AI SHORTLISTING (final output)
═══════════════════════════════════════════
You are now acting as an expert SEO keyword analyst working for a digital marketing agency.

You have a deduplicated pool of keywords pulled from the top-ranking competitor pages for the target topic. Each keyword includes volume, difficulty, position, and source URL.

Your job: shortlist exactly 2 PRIMARY keywords and 10 SECONDARY keywords.

PRIMARY keyword rules:
- Must semantically match the seed topic and stated intent (commercial or informational)
- Must represent distinct angles (do not pick near-duplicates)
- Include a one-sentence "reason" explaining semantic alignment, intent fit, and differentiation
- Prefer keywords with meaningful search volume and rankable difficulty

SECONDARY keyword rules:
- Support the primary topic cluster
- Mix head terms, mid-tail, and long-tail
- Include volume and difficulty for each
- Do not repeat primary keywords

Exclude branded competitor names unless the client IS that brand.
Exclude keywords with no meaningful connection to the seed topic.

If client/industry/feedback KB context has been provided, respect its brand voice, terminology, and any client-feedback notes when judging relevance and phrasing of "reason" fields.

Return ONLY valid JSON:
{
  "primary": [
    { "keyword": "...", "volume": 0, "difficulty": 0, "reason": "..." },
    { "keyword": "...", "volume": 0, "difficulty": 0, "reason": "..." }
  ],
  "secondary": [
    { "keyword": "...", "volume": 0, "difficulty": 0 }
  ]
}

Do not include any text outside this JSON object in your final step output.



NOTE:
MAKE SURE THAT THIS WILL EFFECT ONLY THIS SPECIF AGENT AND WONT MAKE ANY OTHER CHANGES
