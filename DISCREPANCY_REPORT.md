# Rebrand Migration Report — arenaintelligence → intelligence.position2.com replica

## Status: Blocked on required inputs (no code changed in this pass)

You asked for a pixel-perfect rebuild of this app to match https://intelligence.position2.com/. That work requires auditing the live reference site (crawling every route, extracting exact copy, computed CSS values, fonts, assets, and animation behavior). **This build environment has no ability to fetch or crawl external websites**, so none of that source material is available here. Rather than inventing headings, body copy, hex values, spacing, and imagery and presenting them as an "exact copy" — which would silently overwrite your working production app with inaccurate content — this pass makes **zero code changes** and instead documents precisely what is needed to do the migration correctly.

---

## 1. What already exists (current-site audit — completed)

The current codebase was fully reviewed. Stack and structure:

- **Framework:** Next.js ^15.3.3 App Router, React ^19, TypeScript strict
- **Styling:** Tailwind CSS v3 + custom utility classes in `app/globals.css` (glass cards, gradient buttons, mesh/grid backgrounds, orbs); design tokens centralized in `lib/theme.ts`
- **Animation:** framer-motion (entrance/hover animations) + custom canvas particles (`components/ParticleCanvas.tsx`)
- **Fonts:** Inter via `next/font/google` in `app/layout.tsx`
- **Auth:** JWT httpOnly cookie sessions (`lib/auth.ts`, `middleware.ts`)
- **Database:** Prisma + Neon Postgres (live data — additive-only schema policy applies)
- **Routes:** `/` (landing), `/login`, `/dashboard`, `/agents/keyword-research`, `/agents/content-research`, `/agents/article-recommendation`, `/history`, `/settings`
- **Shared chrome:** `components/AppShell.tsx` (sidebar + header), `components/LandingClient.tsx` (marketing page header/hero/sections)

This stack is well-suited to the rebuild: the color system already lives in CSS variables (`:root` in `app/globals.css`) and a typed token object (`lib/theme.ts`), so retheming to the reference palette is a contained change once the real values are known.

## 2. What is blocked and why

| Requested step | Status | Reason |
| --- | --- | --- |
| Crawl every page/route of the reference site | ❌ Not possible | No network/browser access in this environment |
| Extract exact copy (headings, body, CTAs, microcopy, alt text) | ❌ Not possible | Cannot read the reference site; will not fabricate copy and label it "exact" |
| Extract computed styles (hex colors, font sizes/weights, spacing, radii, shadows, breakpoints) | ❌ Not possible | Requires DevTools inspection of the live site |
| Extract/download images, logos, icons, illustrations | ❌ Not possible | Cannot fetch remote assets; hotlinking was correctly ruled out by you |
| Identify animations/transitions (scroll, hover, entrance) | ❌ Not possible | Requires live interaction with the site |
| Side-by-side viewport QA vs. reference | ❌ Not possible | No rendering/screenshot capability against the live reference |

## 3. Exactly what to supply for the follow-up edit

Provide the following and the rebuild can be executed accurately against the existing stack:

### Per page (every route: home, and each nav/footer destination)
1. **Full copy deck** — every heading, paragraph, CTA label, microcopy string, form label/placeholder, and image alt text, in section order.
2. **Screenshots** at three widths — mobile (~375px), tablet (~768px), desktop (~1440px) — full-page captures.
3. **Section inventory** — ordered list of sections with layout notes (e.g., "2-column hero, image right", "3-card grid", "accordion FAQ").

### Global design tokens
4. **Colors** — hex values for background(s), surfaces, primary/secondary/accent, text primary/secondary/muted, borders, success/warning/danger.
5. **Typography** — font family/families (and license/source), weights used, and size/line-height for display, h1–h4, body, small, and label text.
6. **Spacing & layout** — container max-widths, section vertical padding, card padding, grid gaps, and the responsive breakpoints in use.
7. **Surface treatment** — border-radius scale, shadow values, blur/glass effects if any.

### Interaction & motion
8. **Header/nav** — desktop structure, sticky behavior, mobile menu pattern (drawer/overlay), and hover/active states.
9. **Footer** — column structure, link groups, legal row.
10. **Animations** — entrance effects (fade/slide, durations, easing), hover lifts, scroll-triggered behavior, carousels/accordions/modals with their behavior described or screen-recorded.

### Assets
11. **Files** — logos (SVG preferred), photography/illustrations (original resolution), icon set name if a library is used (e.g., Lucide, Heroicons), favicon/OG images. These will be placed under `public/` and served via `next/image` with lazy loading and proper alt text.

## 4. Migration plan (once inputs arrive)

1. **Tokens first:** update `:root` variables in `app/globals.css`, `lib/theme.ts`, and `tailwind.config.ts` to the reference palette/typography/radii/shadows.
2. **Fonts:** swap `next/font/google` family in `app/layout.tsx` (or add a local font under `public/fonts` via `next/font/local` if the reference uses a licensed face — flagged as a potential discrepancy if the exact family is proprietary).
3. **Chrome:** rebuild header/nav and footer as reusable components matching the reference structure, including mobile menu behavior.
4. **Pages:** recreate each route section-by-section in reference order with the supplied copy, using existing patterns (Server pages + Client components) so auth, agents, jobs, and Prisma data flows keep working untouched.
5. **Motion:** implement entrance/hover/scroll effects with framer-motion to match described/recorded behavior.
6. **QA:** responsive check at the three breakpoints against your screenshots; link, alt-text, contrast, and semantic-HTML pass; deliver a final discrepancy list (expected items: proprietary fonts substituted with closest licensed equivalent, any assets not supplied, JS behaviors approximated).

## 5. Guarantees held in this pass

- No changes to `prisma/schema.prisma`, `lib/actions.ts`, `lib/types.ts`, auth, jobs, or any page/component — the deployed app and live Neon data are untouched.
- The build remains green; this file is documentation only.

**Next step:** reply with the copy decks, screenshots, tokens, and assets listed in section 3 (they can be pasted directly into the edit request, page by page), and the rebuild will be implemented against this codebase.
