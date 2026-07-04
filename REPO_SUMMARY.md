# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-04T06:41:35.481Z.

## Overview

INTELLIGENCE by Position2 — a premium enterprise AI platform with multi-agent keyword research, content research and article recommendation agents that produce structured, consultant-grade reports with dashboards, charts, action plans and downloadable deliverables.

**Repository:** `arenaintelligence`  
**File count:** 57

## Features

- Multi-agent AI pipeline with execution timeline
- Keyword Research agent with opportunity matrix and intent distribution
- Content Research agent with insights, gaps and action plans
- Article Recommendation agent with scored article cards
- Structured consultant-grade report rendering (metrics, insights, recommendations, citations)
- CSV / Markdown / JSON report exports
- Encrypted OpenAI API key storage (AES-256-GCM)
- JWT session auth with httpOnly cookies
- Execution history with search and re-open
- Dark glassmorphism enterprise UI with animated particles

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
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-07-04T06:41:35.481Z
- **Request:** # ROLE

You are a Senior Staff Engineer, AI Product Architect, UX Designer, and Enterprise SaaS Expert.

Your task is to transform the existing Arena Intelligence application into a production-grade AI platform.

Current Application:
https://arenaintelligence.vercel.app/

The application currently has three agents:

1. Keyword Research Agent
2. Content Research Agent
3. Article Recommendation Agent

The agents currently return plain text outputs. The goal is to make the entire platform feel like a premium enterprise AI product similar to:

- ChatGPT Enterprise
- Perplexity
- Semrush
- Ahrefs
- Notion AI
- HubSpot AI

The application should feel like an AI Operating System rather than a chatbot.

==================================================
PRIMARY OBJECTIVES
==================================================

Convert:

Input → Plain Text Output

Into:

Input
↓
AI Workflow
↓
Structured Data
↓
Beautiful Dashboard
↓
Actionable Recommendations
↓
Downloadable Reports

Every output should feel like a consultant's report.

==================================================
MULTI-AGENT ARCHITECTURE
==================================================

Every agent should internally use:

1. Planner Agent
   - Understand the request
   - Break down the tasks
   - Define execution steps

2. Research Agent
   - Collect information
   - Gather context
   - Search relevant sources

3. Reasoning Agent
   - Analyze findings
   - Create insights
   - Identify opportunities

4. Generator Agent
   - Generate deliverables
   - Produce recommendations

5. Validator Agent
   - Check quality
   - Verify completeness
   - Prevent hallucinations

6. Formatter Agent
   - Convert output into rich UI sections

7. Export Agent
   - Generate PDF
   - Generate Excel
   - Generate PPT
   - Generate Word reports

==================================================
GLOBAL UI REDESIGN
==================================================

The application should feel like a premium AI operating system.

Design Requirements:

- Dark futuristic theme (#050816)
- Glassmorphism
- 3D cards
- Gradient glow effects
- Animated particles
- Smooth page transitions
- Floating cards
- Premium typography
- Micro-interactions
- Skeleton loaders
- Shimmer effects
- Animated progress indicators
- Responsive design
- Enterprise SaaS look and feel

Use:

- Tailwind CSS
- Framer Motion
- Shadcn UI
- Radix UI

==================================================
AGENT EXECUTION EXPERIENCE
==================================================

Instead of:

Generating...

Create an execution timeline:

✓ Understanding Request
✓ Building Research Plan
✓ Gathering Data
✓ Analyzing Information
✓ Generating Insights
✓ Creating Recommendations
✓ Building Report
✓ Finalizing Deliverables

Display progress in real time.

==================================================
STREAMING EXPERIENCE
==================================================

Implement:

- Streaming responses
- Progressive rendering
- Typewriter effect
- Section-by-section generation
- Partial loading states
- Optimistic UI updates

==================================================
NEVER SHOW PLAIN TEXT OUTPUT
==================================================

Every response must render using beautiful components.

==================================================
OUTPUT COMPONENTS
==================================================

1. Executive Summary Card
2. Metrics Dashboard
3. Insight Cards
4. Recommendation Cards
5. Charts
6. Tables
7. Timeline Components
8. Citation Components
9. Download Components
10. Expandable Sections

==================================================
REUSABLE COMPONENT LIBRARY
==================================================

Create:

InsightCard
- Title
- Description
- Impact Score
- Confidence Score

MetricCard
- Metric Name
- Value
- Trend
- Comparison

RecommendationCard
- Recommendation
- Priority
- Business Impact
- Difficulty
- CTA

TimelineComponent
- Immediate Actions
- 30 Day Plan
- 60 Day Plan
- 90 Day Plan

CitationCard
- Source
- URL
- Publish Date

ExportCard
- PDF
- CSV
- PPT
- DOCX

==================================================
KEYWORD RESEARCH AGENT
==================================================

Replace plain keyword lists with:

Dashboard:

- Search Volume
- Keyword Difficulty
- CPC
- Search Intent
- Opportunity Score
- Competition
- Trend

Visualizations:

- Search Volume Graph
- Intent Distribution Chart
- Opportunity Heatmap
- Keyword Cluster Visualization
- Ranking Potential Matrix

Recommendations:

- Quick Wins
- Low Competition Keywords
- Commercial Opportunities
- Content Gap Suggestions

Downloads:

- CSV
- Excel
- PDF Report

==================================================
CONTENT RESEARCH AGENT
==================================================

Generate:

1. Executive Summary
2. Industry Trends
3. Competitor Analysis
4. Audience Questions
5. Topic Clusters
6. Content Gaps
7. Content Opportunities
8. Recommended Content Calendar
9. SEO Recommendations
10. Action Plan

Visualizations:

- Trend Charts
- Topic Clusters
- Competitive Matrix
- Priority Score Dashboard

==================================================
ARTICLE RECOMMENDATION AGENT
==================================================

Display article cards:

- Title
- Summary
- Relevance Score
- Estimated Traffic
- Search Intent
- Publish Date
- Source
- Tags

Additional Sections:

- Why this article matters
- Missing opportunities
- Suggested content ideas
- Recommended next steps

==================================================
SOURCE CITATIONS
==================================================

Every response should include:

- Sources
- References
- Confidence Scores
- Citation Links

Similar to Perplexity.

==================================================
WORKSPACES
==================================================

Implement:

- Projects
- Saved Reports
- Collections
- Folders
- Search History
- Recent Reports
- Favorites

==================================================
AI MEMORY
==================================================

Remember:

- User preferences
- Saved searches
- Recent projects
- Favorite keywords
- Previous reports

==================================================
REPORT GENERATION
==================================================

Automatically create:

1. Executive Summary
2. Findings
3. Visualizations
4. Recommendations
5. Action Plan
6. Appendices

==================================================
EXPORT SYSTEM
==================================================

Generate:

- PDF
- PowerPoint
- Excel
- Word Documents

==================================================
AI QUALITY PIPELINE
==================================================

Before displaying output run:

- Hallucination Check
- Citation Validation
- Completeness Validation
- Formatting Validation
- Confidence Scoring

==================================================
PERFORMANCE OPTIMIZATION
==================================================

Implement:

- Server Actions
- Streaming
- Suspense
- Lazy Loading
- Caching
- Background Jobs
- Error Boundaries
- Retry Logic
- Rate Limiting
- Optimistic Updates

==================================================
ENTERPRISE FEATURES
==================================================

Add:

- Team Workspaces
- Usage Analytics
- Credit System
- API Key Management
- Audit Logs
- Shareable Reports
- Public Links
- Scheduled Reports
- Notifications

==================================================
TECH STACK
==================================================

Frontend:
- Next.js 15
- React Server Components
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn UI

Backend:
- PostgreSQL
- Prisma
- Redis

AI:
- OpenAI SDK
- Structured Outputs
- JSON Schema
- Streaming
- Multi-Agent Orchestration

==================================================
FINAL EXPERIENCE
==================================================

The final product should feel like:

Semrush + Perplexity + Notion AI + ChatGPT Enterprise.

Every output should feel like:

"A consulting report generated by an elite AI team."

Never show plain markdown or plain text.

Always generate:

✓ Dashboards
✓ Visualizations
✓ Cards
✓ Charts
✓ Tables
✓ Citations
✓ Reports
✓ Recommendations
✓ Executive Summaries
✓ Action Plans
✓ Downloadable Deliverables

The user should feel they are using a premium enterprise AI platform that is worth paying for.
