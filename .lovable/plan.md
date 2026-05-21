## Mobile redesign — Aman-style

The current page is a fixed `h-screen` two-column desktop layout with `overflow: hidden` on `body`. On a phone it collapses awkwardly. We'll add a dedicated mobile rendering below the `md` breakpoint (≥768px stays exactly as today) that follows aman.com's tone: full-bleed imagery, generous whitespace, large serif headlines, micro uppercase eyebrows, vertical scroll with calm rhythm.

### Layout (top to bottom, single column)

```text
┌─────────────────────────────┐
│  IP · MMXXVI         [Dark] │  ← thin top bar, transparent over hero
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │     BANNER          │   │  ← full-bleed, ~70vh, mask fades to bg at bottom
│   │     (object-cover)  │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
│        ●  portrait          │  ← circular portrait, ~36vw, overlaps hero -50%
│                             │
│    CO-FOUNDER · INVESTOR    │  ← tracked eyebrow
│                             │
│         Ilya                │  ← display serif, ~clamp(3rem, 13vw, 4.5rem)
│       Paveliev (italic)     │
│                             │
│    ─────────                │
│                             │
│   Short bio paragraph,      │  ← 1rem (16px), leading-relaxed
│   2-3 lines, max 32ch.      │
│                             │
├─────────────────────────────┤
│  EXPERIENCE  THINKING  LIFE │  ← sticky tab bar, hairline borders,
└─────────────────────────────┘     translucent backdrop-blur

  (then the selected tab's content stacked vertically — see below)

  ─────────────────────────────
  CONTACT
  email
  LinkedIn
  X
  ─────────────────────────────
```

### Per-tab mobile content

- **Experience** — vertical list, each item: org (display serif ~1.5rem) / role eyebrow / one-line note / years right-aligned. Hairline dividers, generous py (~28px).
- **Thinking** — single-column cards (was 1/2/3 cols). Banner stays fixed-height (`h-32`), title in serif ~1.375rem, date/kind eyebrow row beneath.
- **Life** — numbered notes, each ~1.25rem serif, comfortable spacing.

### Design system additions

- Allow page scroll on mobile only (`body { overflow: hidden }` becomes `md:overflow-hidden`; mobile `main` switches from `h-screen` to `min-h-screen`).
- Min body type 16px (never below). Eyebrows stay 11-12px with `tracking-aman`.
- Horizontal padding: 24px (`px-6`); section rhythm: 56-72px gaps.
- Hero portrait shifts to centered + larger (36vw) on mobile, left-aligned on desktop.
- Sticky tab nav with `backdrop-blur` and subtle hairline so the tab switcher stays one-tap reachable while scrolling.

### Touch & polish

- Tap targets ≥44px (tabs become full-width pill buttons with `py-3`).
- Soft fade-in on tab change (existing tab switch is instant; add a subtle `transition-opacity` so content cross-fades).
- Lazy-fade hero image with a gradient mask so the portrait sits cleanly over the seam.

### Technical notes

- Single file change: `src/routes/index.tsx`. Keep the existing desktop JSX wrapped in `<div className="hidden md:grid ...">` and add a parallel `<div className="md:hidden ...">` for the mobile composition. No new dependencies, no routing changes, no breaking of the SSR head config.
- Re-use the existing data arrays (`experience`, `thinking`, `life`) and tab state — both layouts read the same source of truth.
- `vh`-based sizing replaced with fixed/`rem` units on mobile to dodge iOS Safari URL-bar resize jank.
- Test viewports: 375×812 (iPhone SE/13 mini), 390×844 (iPhone 14), 414×896 (Plus).

### Out of scope (call out before approving)

- No content changes — copy, photos, links all stay identical.
- No new pages, no animations beyond the gentle tab cross-fade.
- Desktop layout above `md` is untouched.
