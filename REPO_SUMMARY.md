# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-04T06:19:58.659Z.

## Overview

INTELLIGENCE by Position2 — a premium AI platform for keyword research, content research, and article recommendations with a glassmorphism design system.

**Repository:** `arenaintelligence`  
**File count:** 49

## Features

- Pixel-perfect glassmorphism UI matching the reference design system
- Three AI agents: Keyword Research, Content Research, Article Recommendation
- Secure auth with httpOnly cookie sessions and bcrypt password hashing
- AES-256-GCM encrypted OpenAI API key storage
- Execution history with search, expand, and report downloads
- Animated particle background, gradient orbs, and framer-motion transitions

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
- `components/DashboardClient.tsx`
- `components/FloatingPanel.tsx`
- `components/GlassCard.tsx`
- `components/GradientButton.tsx`
- `components/HistoryClient.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/ParticleCanvas.tsx`
- `components/PremiumInput.tsx`
- `components/SectionContainer.tsx`
- `components/SettingsClient.tsx`

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
- `components/DashboardClient.tsx`
- `components/FloatingPanel.tsx`
- `components/GlassCard.tsx`
- `components/GradientButton.tsx`
- `components/HistoryClient.tsx`
- `components/LandingClient.tsx`
- `components/LoginClient.tsx`
- `components/ParticleCanvas.tsx`
- `components/PremiumInput.tsx`
- `components/SectionContainer.tsx`
- `components/SettingsClient.tsx`
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

- **Updated at:** 2026-07-04T06:19:58.659Z
- **Request:** # Pixel-Perfect Redesign Task

## Objective

Transform `https://arenaintelligence.vercel.app/` so it is visually identical to `https://intelligence.position2.com/`.

This is a complete UI recreation.

## Requirements

### 1. Replicate the Design System

Match the reference website as closely as possible:

* Layout structure
* Navigation positioning
* Sidebar width
* Header height
* Spacing and paddings
* Typography scale
* Color palette
* Gradients
* Border radius
* Shadows
* Glassmorphism
* Hover states
* Animations
* Scroll behavior
* Loading states
* Responsive breakpoints

The application should feel like the same product ecosystem.

---

## 2. Match Every Section Layout

Recreate the landing page structure section-by-section:

* Hero section
* Navigation
* Feature cards
* Statistics blocks
* CTA sections
* Footer
* Background effects
* Floating particles
* Gradient overlays
* Glow effects

Replicate the exact positioning and proportions of every element.

---

## 3. Component-Level Matching

Inspect the reference page and recreate:

* Button styles
* Input fields
* Cards
* Dropdowns
* Tables
* Badges
* Tooltips
* Icons
* Modals
* Search bars

Use the same spacing, shadows, and animations.

---

## 4. Animation Matching

Recreate:

* Fade animations
* Hover interactions
* Card lift effects
* Sidebar transitions
* Page transitions
* Background movement
* Particle animations

Animations should closely resemble the reference site.

---

## 5. Design Tokens

Create a centralized theme:

```ts
colors
spacing
radius
shadows
gradients
animations
typography
```

Use reusable components and design tokens.

---

## 6. Keep Existing Functionality

Do NOT change:

* Authentication
* APIs
* Routes
* Business logic
* Database calls
* Agent workflows

Only redesign the UI.

---

## 7. Implementation Strategy

1. Analyze the DOM structure of the reference website.
2. Extract colors, spacing, and typography.
3. Rebuild the same layout using React components.
4. Make the final UI visually indistinguishable from the reference while preserving Arena Intelligence branding and functionality.

---

## Final Goal

A user opening `https://arenaintelligence.vercel.app/` should feel that it belongs to the same design system and product family as `https://intelligence.position2.com/`, with pixel-level similarity in layout, spacing, and interactions, but using Arena Intelligence's own branding and content.
