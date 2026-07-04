# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-04T07:31:44.566Z.

## Overview

AI intelligence platform with background agent job execution — agents now run server-side as persistent jobs that survive page navigation, refreshes, and tab closes, with progress tracking, retry, cancellation, and completion notifications.

**Repository:** `arenaintelligence`  
**File count:** 67

## Features

- Background job system for AI agent executions (queued/running/completed/failed/cancelled)
- Jobs persist in the database and run decoupled from the page lifecycle via server-side processing
- Automatic retry logic with attempt tracking and error capture
- Job cancellation and one-click retry for failed jobs
- Running Jobs panel on the dashboard with live progress bars
- Header indicator showing count of active background jobs
- Completion/failure notifications with click-through to reports
- Agent pages resume live progress display after navigation or refresh

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
- `app/api/jobs/retry/route.ts`
- `app/api/jobs/route.ts`
- `app/api/notifications/mark-read/route.ts`
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
- `app/api/jobs/cancel/route.ts`
- `app/api/jobs/retry/route.ts`
- `app/api/jobs/route.ts`
- `app/api/notifications/mark-read/route.ts`
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
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-07-04T07:31:44.566Z
- **Request:** Fix the AI agent execution lifecycle so that agents continue running in the background even if the user navigates to another page.

Current Behavior:
- User starts an agent.
- User navigates to another page (for example, Home).
- The agent execution stops or gets cancelled.

Expected Behavior:
- Agent execution must continue in the background regardless of page navigation.
- The user should be able to leave the page, browse other sections of the application, and return later.
- Once the agent completes, the user should receive a notification.

==================================================
BACKGROUND EXECUTION REQUIREMENTS
==================================================

Implement a proper asynchronous job system.

When an agent starts:

1. Create a Job ID.
2. Persist the job in the database.
3. Mark status as:
   - Queued
   - Running
   - Completed
   - Failed
4. Execute the agent independently from the current page lifecycle.

The execution should not depend on:
- Component state
- Browser tab state
- Current route
- React component mounting/unmounting

==================================================
JOB MANAGEMENT
==================================================

Create a background job manager that supports:

- Queueing
- Retry logic
- Progress updates
- Cancellation
- Error handling
- Execution history

==================================================
REAL-TIME STATUS UPDATES
==================================================

Users should be able to see:

- Running agents
- Completed agents
- Failed agents
- Estimated progress

Add a "Running Jobs" section in the application where users can monitor all active agent executions.

==================================================
NOTIFICATIONS
==================================================

When a background job finishes:

- Show a notification.
- Increase notification badge count.
- Store the notification.
- Allow the user to click the notification and open the generated report.

Example notifications:

"Keyword Research Agent completed successfully."

"Content Research Agent report is ready."

"Article Recommendation Agent failed. Click to retry."

==================================================
PAGE NAVIGATION BEHAVIOR
==================================================

Scenario:

1. User starts Keyword Research Agent.
2. User navigates to Home.
3. User opens Settings.
4. User refreshes the page.
5. User comes back after several minutes.

Expected:
- The agent should still be running or already completed.
- The generated report should still be available.
- Notifications should still be present.

==================================================
PERSISTENCE
==================================================

Persist:

- Job ID
- Agent ID
- User ID
- Input parameters
- Execution status
- Progress
- Start time
- Completion time
- Output location
- Error details

==================================================
ARCHITECTURE
==================================================

Implement a production-grade background processing architecture similar to:

- ChatGPT Tasks
- Notion AI
- GitHub Actions
- Long-running report generation systems

The UI should never block or cancel agent execution simply because the user navigates to another page.

Agent execution must be completely decoupled from the page lifecycle and continue running until completion or failure.
