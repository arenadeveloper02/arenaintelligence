# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-04T07:17:04.372Z.

## Overview

INTELLIGENCE by Position2 — premium AI research platform with keyword, content and article agents, now with a full production-grade notification system (notification center, badge counts, toasts, browser notifications and persistent agent execution alerts).

**Repository:** `arenaintelligence`  
**File count:** 61

## Features

- Responsive UI with Tailwind CSS
- Next.js App Router pages and components
- AI agent execution with OpenAI
- Persistent notification center with unread badge, Today/Yesterday/Earlier grouping, mark-as-read and clear-all
- Real-time toasts, browser notifications, optional sound and auto-refreshing notification count
- Agent lifecycle notifications: started, completed, failed, report generated and export completed

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
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/LogoMark.tsx`
- `components/MetricCard.tsx`
- `components/NotificationCenter.tsx`
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
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/LogoMark.tsx`
- `components/MetricCard.tsx`
- `components/NotificationCenter.tsx`
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

- **Updated at:** 2026-07-04T07:17:04.372Z
- **Request:** Implement a fully functional notification system for Arena Intelligence.

Current issue:
The notification icon is present but does not work.

Requirements:

1. Make the notification icon clickable and functional.
2. Clicking the notification icon should open a notification panel/dropdown.
3. The panel should display:
   - Unread notifications
   - Read notifications
   - Notification timestamp
   - Notification category
   - Mark as read option
   - Clear all option

==================================================
AGENT EXECUTION NOTIFICATIONS
==================================================

Whenever a user runs an AI agent, create real-time notifications for the following events:

- Agent execution started
- Agent is processing
- Agent completed successfully
- Agent failed
- Export completed
- Report generated

Examples:

"Keyword Research Agent has started processing."

"Content Research Agent completed successfully."

"Your report is ready to download."

==================================================
REAL-TIME EXPERIENCE
==================================================

Implement:

- Real-time notifications
- Notification badge count
- Toast notifications
- Browser notifications (with permission)
- Sound notification (optional)
- Auto-refresh notification count

==================================================
NOTIFICATION TYPES
==================================================

1. Success
2. Info
3. Warning
4. Error

Each type should have its own icon and styling.

==================================================
NOTIFICATION CENTER
==================================================

The notification dropdown should support:

- Today
- Yesterday
- Earlier

Each notification should contain:

- Icon
- Title
- Description
- Time
- Action button (if applicable)

==================================================
AGENT COMPLETION ALERTS
==================================================

When an agent completes:

1. Show a toast notification.
2. Increment the notification badge.
3. Add an item to the notification center.
4. Allow users to click the notification and navigate directly to the generated report/output.
5. If the user is on another page, still show the notification.

==================================================
PERSISTENCE
==================================================

Notifications should persist across page refreshes and sessions.

Store:

- Notification ID
- Type
- Title
- Message
- Status (read/unread)
- Timestamp
- Related report ID
- Related agent ID

==================================================
USER EXPERIENCE
==================================================

The notification experience should feel similar to:

- Slack
- Notion
- GitHub
- ChatGPT Team

The notification center should look premium, modern, and fully integrated with the AI platform.

Do not change any existing functionality except implementing a complete production-grade notification system.
