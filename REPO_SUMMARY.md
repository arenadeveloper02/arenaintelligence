# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-06T08:57:40.731Z.

## Overview

INTELLIGENCE by Position2 — a premium AI platform embedding the SEO Studio agent suite for keyword research, content research and article recommendations, with background job execution, notifications and encrypted API key storage.

**Repository:** `arenaintelligence`  
**File count:** 63

## Features

- Keyword Research agent with 5-step shortlisting pipeline
- Content Research agent producing writer-ready SERP briefs
- Article Recommendation agent generating full article briefs
- Background job execution with recovery, cancel and retry
- In-app notification center with toasts
- Encrypted OpenAI API key storage (AES-256-GCM)
- Execution history with CSV/Markdown/JSON exports
- JWT session auth with httpOnly cookies

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
- `Notification`
- `AgentJob`
- `AppSetting`

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
- `public/logo-mark.svg`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-07-06T08:57:40.731Z
- **Request:** # P2 SEO Agents — System Prompts, Inputs & Logic

> **Source:** `/p2/seo` in `intelligence-platform` embeds tools from **SEO Studio**
> **Backend:** `https://seo-apps-production-37a6.up.railway.app` (private repo: `github.com/ai-positon2/seo-apps`)
> **Generated:** 2026-07-06

---

## Architecture

```
User (Position2 staff)
    │
    ▼
/p2/seo                    ← intelligence-platform (Flask)
    │
    ▼
/p2/seo/<tool_slug>        ← embed.html iframe
    │
    ▼
https://seo-apps-production-37a6.up.railway.app/<path>?pt=<SERP_PLATFORM_TOKEN>
    │
    ▼
Express API + React frontend (seo-apps)
    ├── SERP / scrape / SEMrush / DataForSEO / PageSpeed APIs
    ├── OpenAI (gpt-4o, gpt-4o-mini, gpt-4.1-mini, gpt-5.4-mini, gpt-4o-mini-search-preview)
    └── Knowledge Base markdown files (injected into AI context)
```

### Platform wiring (`app.py`)

| Item | Value |
|------|-------|
| Route list | `GET /p2/seo` → tool grid; `GET /p2/seo/<tool_slug>` → iframe embed |
| Tool manifest | Fetched from `{SERP_BASE}/tools.json` (5 min cache); falls back to `_SEO_TOOLS_FALLBACK` |
| Auth passthrough | `?pt=<SERP_PLATFORM_TOKEN>` appended to embed URL |
| SERP base URL | `https://seo-apps-production-37a6.up.railway.app` |

### Public `/app` aliases (same backend tools, different marketing names)

| Public slug | SEO Studio slug |
|-------------|-----------------|
| `keyword-compass` | `keyword-research` |
| `brief-architect` | `article-recommendation` |
| `content-alchemist` | `article-enhancement` |

---

## Shared concepts

### Knowledge Base (KB) injection

Three research tools expose a **client selector** that auto-injects KB context into AI calls:

- `keyword-research`
- `content-research`
- `article-recommendation`

**API fields (when client selected):**

```json
{
  "client": "gentle-dental",
  "feedbackKbIds": ["gentle-dental-feedback-2026-q2"]
}
```

**Available clients:** `global`, `gentle-dental`, `great-lakes`, `riccobene`, `clear-behavioral-health`, `neuro-wellness-spa`, `new-life-house`

**KB categories:** `industry`, `brand`, `client-feedback`, `best-practices`

**KB API:** `GET /api/kb`, `GET /api/kb/<id>` — returns `meta` + `body` (markdown)

**Linked modules example:** `dental-service-organizations` KB links to `content-research`, `keyword-research`

### Models referenced in SEO Studio

| Model | Used for |
|-------|----------|
| `gpt-4o` | Agent Readiness CMO brief, Image Alt vision (hero banners) |
| `gpt-4o-mini` | Article Enhancement fanout |
| `gpt-4.1-mini` | Article Enhancement fanout |
| `gpt-5.4-mini` | Article Enhancement fanout |
| `gpt-4o-mini-search-preview` | Article Enhancement fanout |

### How system prompts are assembled

Every AI call in SEO Studio follows this pattern:

```
messages = [
  { role: "system", content: <TOOL_SYSTEM_PROMPT> + <INJECTED_KB_MARKDOWN> },
  { role: "user",   content: <STRUCTURED_INPUT_JSON_OR_TEXT> }
]
```

KB injection happens when `client` / `feedbackKbIds` / `kbId` is set — the matching markdown from `/api/kb/<id>` is appended to the system message.

---

## System Prompts Reference

Full system prompts used by each AI-powered agent.

---

### SP-1: Keyword Research — Query Variants

**When:** Step `variants`
**Model:** OpenAI (backend default)

```
You are an expert SEO keyword strategist.

Given a seed keyword and a search intent (commercial or informational), generate 5–6 query variants that real users would type into Google.

If intent is commercial: focus on service pages, pricing, booking, "near me", comparison, and consultation queries.
If intent is informational: focus on guides, FAQs, how-to, symptoms, definitions, and educational queries.

Include the original seed keyword as the first variant.

Return ONLY valid JSON:
{
  "queries": ["variant 1", "variant 2", ...]
}
```

**User message template:**

```json
{
  "keyword": "<seed keyword>",
  "intent": "commercial | informational"
}
```

---

### SP-2: Keyword Research — AI Shortlisting

**When:** Step `analysis`
**Model:** OpenAI (backend default)
**KB injected:** `keyword-research-bp`, industry KB, client brand KB, `feedbackKbIds`

```
You are an expert SEO keyword analyst working for a digital marketing agency.

You will receive a deduplicated pool of keywords pulled from SEMrush for the top-ranking competitor pages of a target topic. Each keyword includes volume, difficulty, position, and source URL.

Your job: shortlist exactly 2 PRIMARY keywords and 10 SECONDARY keywords for a content/SEO campaign.

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

Exclude branded competitor names unless the client is that brand.
Exclude keywords with no meaningful connection to the seed topic.

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
```

**User message template:**

```json
{
  "seedKeyword": "<keyword>",
  "intent": "commercial | informational",
  "allKeywords": [ { "keyword": "...", "volume": 0, "difficulty": 0, "position": 0, "sourceUrl": "..." } ],
  "competitorUrls": [ "..." ]
}
```

---

### SP-3: Content Research — SERP Analysis

**When:** `POST /api/analyze`
**KB injected:** `article-creation`, industry KB, client brand KB, `feedbackKbIds`

```
You are a senior SEO content strategist.

Analyze the provided scraped content from the top-ranking pages for a target keyword. Produce a content research brief a writer can act on immediately.

Focus on:
1. Common H2/H3 patterns across ranking pages
2. Word count benchmarks (min, max, median, recommended target)
3. Semantic keywords and entities the top pages cover
4. Content gaps — topics/questions competitors answer that should be included
5. Recommended article structure (section-by-section)

Respect any client brand voice, compliance rules, and terminology in the KNOWLEDGE BASE section below.

Return ONLY valid JSON:
{
  "sections": [
    {
      "heading": "H2 or H3 text",
      "frequency": "how many top pages use this",
      "notes": "what to cover in this section"
    }
  ],
  "wordCountBenchmark": {
    "min": 0, "max": 0, "median": 0, "recommended": 0
  },
  "semanticKeywords": ["..."],
  "contentGaps": ["gap or question to address"]
}
```

**User message template:**

```json
{
  "keyword": "<target keyword>",
  "scrapedPages": [ { "url": "...", "title": "...", "content": "...", "headings": [] } ]
}
```

---

### SP-4: Article Recommendation — Full Brief

**When:** SSE stream step `result`
**KB injected:** `article-creation`, client/industry KBs

```
You are an expert SEO content brief architect.

Using the scraped top-10 SERP pages for the target keyword, produce a complete, ready-to-write article brief.

Include:
- Recommended H1 (one option, compelling, keyword-natural)
- Full H2/H3 outline mapped to search intent
- Per-section writing instructions (tone, depth, what to include)
- Primary and secondary keywords assigned to each section
- FAQ section: 5–10 questions extracted from PAA/competitor patterns
- Word count target
```
