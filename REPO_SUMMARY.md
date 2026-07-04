# Repository Summary: arena-planner-ai

> Auto-maintained by Sim Development. Last updated: 2026-07-04T05:52:53.482Z.

## Overview

Premium AI intelligence platform with keyword research, content research, and article recommendation agents, redesigned with a Position2-style glassmorphism dark UI.

**Repository:** `arenaintelligence`  
**File count:** 48

## Features

- Email/password authentication with httpOnly JWT sessions
- Encrypted OpenAI API key storage per user
- Keyword Research, Content Research, and Article Recommendation AI agents
- Execution history with search and downloadable reports
- Premium dark glassmorphism UI with animated particles and gradients

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

- **Updated at:** 2026-07-04T05:52:53.482Z
- **Request:** # UI Redesign Task: Make Arena Intelligence Match Position2 Intelligence Platform

## Objective

Redesign the entire Arena Intelligence application (`https://arenaintelligence.vercel.app/`) so that it visually and experientially matches the design language of `https://intelligence.position2.com/`.

This is a **UI/UX transformation only**. Do not modify any existing business logic, APIs, authentication flows, database models, or agent functionality.

---

# Design Goal

The application should feel like a premium AI operating system with:

* Futuristic dark theme
* Glassmorphism cards
* Soft glowing gradients
* Modern typography
* Animated particles and subtle motion
* Floating UI elements
* Premium SaaS dashboard aesthetics
* Enterprise-grade polish

The final result should be nearly identical to the Position2 Intelligence Platform in terms of:

* Color palette
* Layout spacing
* Navigation structure
* Shadows and glow effects
* Card styling
* Button styling
* Animations
* Typography hierarchy
* Overall visual experience

---

# Global Theme

## Background

Primary background:

```css
#050816
```

Secondary surfaces:

```css
#0B1120
#111827
#151A2D
```

Card background:

```css
rgba(15,23,42,0.65)
```

Borders:

```css
rgba(255,255,255,0.08)
```

---

# Accent Colors

Primary:

```css
#6366F1
```

Secondary:

```css
#8B5CF6
```

Glow:

```css
#4F46E5
```

Success:

```css
#10B981
```

Danger:

```css
#EF4444
```

Warning:

```css
#F59E0B
```

---

# Background Effects

Implement:

### Animated Gradient Background

* Deep indigo radial gradients
* Subtle moving light blobs
* Slow animated mesh gradient

### Floating Particles

* Small glowing particles
* Low opacity
* Parallax movement
* Interactive on mouse movement

### Glass Overlay

* Soft blurred layer
* Frosted glass effect

---

# Typography

Font:

```css
Inter
```

or

```css
Plus Jakarta Sans
```

Hierarchy:

* Page Title: 32px / SemiBold
* Section Title: 24px / SemiBold
* Card Title: 18px / Medium
* Body: 14px
* Labels: 12px

Text colors:

```css
#FFFFFF
#CBD5E1
#94A3B8
```

---

# Navigation

## Sidebar

Redesign sidebar to match Position2 Intelligence.

Features:

* Glassmorphism panel
* Rounded corners
* Active menu glow
* Icon + label layout
* Smooth hover animation
* Collapse animation
* Floating appearance

Width:

```css
280px
```

---

## Top Header

Implement:

* Sticky header
* Frosted glass background
* User avatar
* Search bar
* Notification icon
* Settings icon

Height:

```css
72px
```

---

# Cards

All cards should have:

```css
backdrop-filter: blur(20px);
border-radius: 24px;
border: 1px solid rgba(255,255,255,0.08);
box-shadow:
0 0 30px rgba(99,102,241,0.12);
```

Hover:

```css
transform: translateY(-4px);
box-shadow:
0 15px 40px rgba(99,102,241,0.20);
```

---

# Buttons

Primary Button:

* Gradient background
* Glow effect
* Rounded pill shape
* Smooth transitions

```css
background:
linear-gradient(
135deg,
#6366F1,
#8B5CF6
);
```

Hover:

```css
transform: translateY(-2px);
box-shadow:
0 0 25px rgba(99,102,241,0.5);
```

---

# Inputs

Create premium inputs:

* Dark glass background
* Inner shadows
* Soft border glow on focus
* Rounded corners

Focus:

```css
border-color: #6366F1;
box-shadow:
0 0 0 3px rgba(99,102,241,0.2);
```

---

# Dashboard Layout

Use:

* 24px spacing
* Large rounded containers
* Floating cards
* Maximum content width
* Responsive grid

---

# Animations

Use Framer Motion.

Implement:

### Page Entrance

* Fade in
* Slide up
* Stagger animations

### Card Animation

* Hover lift
* Glow expansion

### Sidebar

* Smooth expand/collapse

### Loading

* Skeleton shimmer
* Animated gradients

---

# Agent Cards

Redesign all AI agent cards to match Position2 Intelligence.

Each card should contain:

* Gradient icon
* Agent name
* Description
* Status indicator
* Hover glow
* Premium shadows

---

# Tables

Implement:

* Glass table containers
* Sticky headers
* Hover row highlights
* Rounded corners
* Soft dividers

---

# Login Page

Completely redesign login page.

Features:

* Fullscreen animated background
* Floating particles
* Glass login card
* Gradient heading
* Smooth input animations
* Premium CTA button

Card width:

```css
480px
```

---

# Responsive Design

Support:

* Desktop
* Laptop
* Tablet
* Mobile

Sidebar should become:

* Drawer on mobile
* Overlay menu

---

# Technical Requirements

* Preserve all existing functionality.
* Do not change APIs.
* Do not change routes.
* Do not change authentication.
* Do not remove existing components.
* Refactor only the UI layer and styling.
* Create reusable design tokens and theme configuration.
* Build reusable components:

  * GlassCard
  * GradientButton
  * FloatingPanel
  * AnimatedBackground
  * PremiumInput
  * SectionContainer

---

# Final Goal

After implementation, `https://arenaintelligence.vercel.app/` should feel visually indistinguishable from `https://intelligence.position2.com/`, with the same premium dark AI-platform experience, animations, spacing, and design language while preserving all existing application functionality.
