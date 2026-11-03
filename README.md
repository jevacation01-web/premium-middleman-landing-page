# Vouch — Good faith, fully guaranteed.

A premium, conversion-focused landing page for **Vouch**, a modern escrow-backed middleman service that makes peer-to-peer deals scam-free. Buyers pay into protected escrow, both parties are identity-verified, and funds release only when the deal is delivered.

## Stack

- **React 19** + **TypeScript**
- **Vite 7** (single-file production build)
- **Tailwind CSS 4** with a custom design-token theme
- Zero UI libraries — all components, icons and animations are hand-built

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Page structure

| Section | Component | Notes |
| --- | --- | --- |
| Sticky navbar | `src/components/Navbar.tsx` | Scroll progress, active-section tracking, mobile sheet |
| Hero | `src/components/Hero.tsx` | Interactive deal room with escrow-release demo |
| Social proof | `src/components/Sections.tsx` | Brand marquee + animated trust stats |
| How it works | `src/components/Sections.tsx` | Three-step explainer |
| Protection | `src/components/Sections.tsx` | Feature bento grid |
| Product showcase | `src/components/Showcase.tsx` | Tabbed app preview: deal room, verification, payouts |
| Benefits | `src/components/Sections.tsx` | Editorial split with generated photography |
| Testimonials | `src/components/Testimonials.tsx` | Featured quote + supporting stories |
| Pricing | `src/components/Pricing.tsx` | Billing toggle + live fee calculator |
| FAQ | `src/components/FAQ.tsx` | Accessible accordion |
| Final CTA | `src/components/Closing.tsx` | Validated email capture |
| Footer + mobile CTA | `src/components/Closing.tsx` | Legal disclosure, socials, sticky bar |

Shared primitives (scroll reveals, counters, icons, buttons, logo) live in `src/components/primitives.tsx`.
Design tokens, motion keyframes and utilities live in `src/index.css`.

## Craft & accessibility

- Scroll reveals via a shared `IntersectionObserver`, with in-viewport safety and `prefers-reduced-motion` fallbacks
- Pointer-tracked spotlight hover, ambient float/drift gradients, marquee, animated counters
- Semantic landmarks, skip link, focus-visible rings, ARIA states, live regions, labelled inputs
- Keyboard-operable tabs (arrow/Home/End) and accordion; focus-safe mobile navigation
- Mobile-first, verified at 390 / 820 / 1440 px

## Deploy

`npm run build` outputs a single self-contained `dist/index.html`, so it can be hosted on any static host — GitHub Pages, Netlify, Vercel or Cloudflare Pages.

> Vouch is a fictional brand created for this landing page. Figures, reviews and deal previews are illustrative.
