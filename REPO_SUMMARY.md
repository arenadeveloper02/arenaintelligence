# Repository Summary: Arena Planner AI

> Auto-maintained by Sim Development. Last updated: 2026-07-03T10:59:04.891Z.

## Overview

Premium dark-theme multi-agent SaaS platform for SEO and content research. Users bring their own OpenAI API key (encrypted at rest) and run three AI agents — Keyword Research, Content Research, and Article Recommendation — with execution history, glassmorphism UI, animated particles, and secure cookie-based auth.

**Repository:** `arenaintelligence`  
**File count:** 42

## Features

- Landing page with animated particle canvas, floating gradient orbs, features, how-it-works, pricing and footer
- Email/password authentication with bcrypt hashing, JWT httpOnly cookie sessions and middleware-protected routes
- Dashboard with welcome card, usage stats, three agent cards with last-execution time and recent activity widget
- Settings page with tabs (General, API Keys, Account) — OpenAI key verification against the OpenAI API, AES-256-GCM encryption at rest, masked display, save/update/remove
- Agent gating: run buttons and agent pages disabled until an OpenAI API key is configured
- Three agent pages (keyword-research, content-research, article-recommendation) with animated loading, progress bar, markdown output, CSV/report export
- Execution history page with search, expandable results and per-report download
- All OpenAI requests proxied through backend API routes — keys never exposed to the frontend

## Tech Stack

- Next.js ^15.3.3 (App Router)
- React ^19.0.0
- Tailwind CSS v3
- TypeScript
- Prisma + PostgreSQL (Neon on Vercel)

## Infrastructure

- **Neon project ID:** `soft-bar-84524988` — managed by Sim Development; do not delete or replace
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
- `.gitignore`
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
- `.gitignore`
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
- `package.json`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-07-03T10:59:04.891Z
- **Request:** # Build "Arena Planner AI" – MVP Multi-Agent Platform

Create a modern SaaS web application called **Arena Planner AI** that follows the design language of the provided Intelligence Platform.

The application should have a premium, futuristic, dark-theme UI with subtle 3D effects, glowing gradients, animated particles, glassmorphism cards, and smooth interactions.



# Design Requirements

The entire application should feel like a premium AI operating system.

Visual style:

* Dark background (#050816)
* Indigo, Cyan, Purple gradients
* Glassmorphism cards
* Soft glowing borders
* Floating orbs in the background
* Animated particle canvas
* Hover elevation
* Smooth page transitions
* Rounded corners (16-20px)
* Subtle 3D depth
* Custom cursor glow

The UI should resemble:

* Intelligence Platform
* Linear
* Vercel
* Raycast
* Perplexity
* OpenAI Dashboard

---

# Public Pages

## Landing Page (/)

Sections:

### Hero Section

Headline:
"Your AI Research Team for SEO & Content"

Subheadline:
"Keyword research, content research, and article recommendations powered entirely by your OpenAI API key."

Buttons:

* Get Started
* Login

Background:

* Animated particles
* Floating gradient spheres
* Subtle grid pattern

---

### Features Section

Three cards:

1. Keyword Research Agent
2. Content Research Agent
3. Article Recommendation Agent

Each card should have:

* Icon
* Description
* Gradient accent
* Hover animation

---

### How It Works

Step 1:
Connect your OpenAI API key.

Step 2:
Choose an AI agent.

Step 3:
Receive insights instantly.

---

### Pricing Section

Single plan:

Arena Planner AI
Bring Your Own OpenAI Key

Features:

* Unlimited agent usage
* Secure API key storage
* No additional platform charges

---

### Footer

Links:

* Login
* Privacy
* Terms
* Documentation

---

# Authentication Pages

## Login Page (/login)

Create a centered authentication card.

Fields:

* Email
* Password

Buttons:

* Login
* Create Account

Include:

* Forgot Password link
* Remember Me checkbox

After login:
Redirect to Dashboard.

---

## Logout

Logout button in header.

On logout:

* Destroy session
* Redirect to Landing Page.

---

# Protected Dashboard

## Dashboard (/dashboard)

Layout:

Sidebar:

* Dashboard
* Agents
* Settings
* Logout

Top Bar:

* User avatar
* User email
* Notification placeholder

Main Area:
Welcome card:
"Welcome back to Arena Planner AI"

Three large agent cards:

1. Keyword Research Agent
2. Content Research Agent
3. Article Recommendation Agent

Each card contains:

* Icon
* Description
* Run Agent button
* Last execution time

---

# Settings Page

## Settings (/settings)

Create a beautiful settings page with tabs.

Tabs:

1. General
2. API Keys
3. Account

---

## API Keys Tab

This is the most important page.

Fields:

OpenAI API Key

Input:
Password field.

Placeholder:
sk-...

Buttons:

* Save
* Update
* Remove

Validation:

* Verify key using OpenAI API.
* Display success or error state.

Status card:

Connected
or

No API Key Configured

Security notice:
"Your API key is encrypted and stored securely."

---

# Agent Availability Rules

The three agents MUST NOT work unless the user has configured an OpenAI API key.

If no API key exists:

Display:

"Connect your OpenAI API key to start using AI agents."

Disable:

* Run buttons
* Agent execution pages

Show:
Go to Settings button.

---

# Agent Pages

---

# 1. Keyword Research Agent

Route:
/agents/keyword-research

Inputs:

* Seed keyword
* Target country
* Target language
* Industry

Actions:

* Generate keyword clusters
* Search intent classification
* Long-tail keywords
* Content opportunities

Output:

* Keyword table
* Search intent
* Opportunity score
* Export to CSV

---

# 2. Content Research Agent

Route:
/agents/content-research

Inputs:

* Topic
* Industry
* Competitor URLs

Actions:

* Topic research
* Content gaps
* Questions users ask
* Content clusters
* Recommended headings

Output:

* Research report
* Content outline
* FAQ recommendations

---

# 3. Article Recommendation Agent

Route:
/agents/article-recommendation

Inputs:

* Topic
* Keywords
* Industry

Actions:

* Recommend article ideas
* Suggest trending topics
* Generate content calendar
* Recommend related resources

Output:

* Article ideas
* Content score
* Suggested titles
* Publishing recommendations

---

# Agent Execution UX

When an agent runs:

Show:

* Animated loading state
* Streaming responses
* Progress indicator

Store:

* Prompt
* Response
* Timestamp

Create:
Execution history page.

---

# Database Schema

Users

* id
* email
* password
* created_at

Settings

* id
* user_id
* openai_api_key
* updated_at

Executions

* id
* user_id
* agent_name
* input
* output
* created_at

---

# Security

* Encrypt API keys before storage.
* Never expose keys to the frontend.
* All OpenAI requests must go through backend APIs.
* Middleware should protect all dashboard routes.

---

# Nice-to-Have Enhancements

* Command palette (⌘K)
* Dark mode animations
* Keyboard shortcuts
* Toast notifications
* Skeleton loaders
* Search across agent history
* Download reports
* Recent activity widget
* Usage statistics dashboard

---

# Final Requirement

Build this application from scratch with production-quality code, reusable components, responsive layouts, and a premium 3D SaaS experience that closely matches the visual style of the Intelligence Platform while keeping the scope limited to:

1. Keyword Research Agent
2. Content Research Agent
3. Article Recommendation Agent

The entire platform should depend solely on the user's own OpenAI API key.
