## Goal

Replace the current Story panel (portrait + stats grid + one-line timeline + "beyond" list) with a long-form, scrollable narrative bio in the spirit of brettadcock.com/bio — a story you read top-to-bottom, anchored to the headline **"Building the future of sovereign AI."** and answering **"Why me."**

Scope: Story tab only. No changes to Thoughts, Contact, navigation, light-mode swipe, or any other route. Desktop and mobile.

## Structure (top → bottom, single scroll)

1. **Opening / thesis** — large display headline:
   *"Building the future of sovereign AI."*
   One-line kicker underneath: *"Why me."* — then a short 2–3 sentence prose lede that frames the journey (Vladivostok → markets → capital → compute) as one continuous thread aimed at sovereign AI.

2. **By the numbers** — 4-stat strip, refreshed to match the uploaded copy exactly:
   - `4` — Companies & protocols
   - `$20bn+` — Assets & flows managed
   - `$20m` — Raised
   - `10,000+` — Offshore miles sailed

3. **The backstory** — chronological chapters, each rendered as a story block (not a one-liner row). One chapter per entry from the uploaded `story.md`:
   - Beginnings — Vladivostok, Russia
   - 2010–2013 — Perella Weinberg Partners
   - 2013–2021 — Adrian Lee & Partners
   - 2022 — OX1
   - 2023–2025 — Arete Capital
   - 2025–Present — UOR Foundation
   - 2025–Present — Hologram Technologies

   Each chapter:
   - Left rail: years (mono, uppercase, tracked) + chapter number (`01` … `07`)
   - Right column: org / place name (display weight), short subtitle (e.g. "Investment Banking — M&A"), then the full prose paragraph from the uploaded copy, verbatim.
   - Hairline divider between chapters.

4. **Closing** — small sign-off tying back to the thesis: a single line under the last chapter (Hologram), e.g. *"This is why I'm building the future of sovereign AI."* — same display treatment as the opening so the page bookends cleanly.

## Layout & feel

- Single scrolling column on mobile; on desktop a 2-column reading layout (narrow left rail for year/number, wide right column for prose) — narrow max-width (~`min(72ch, 60rem)`) so it reads like an essay, not a dashboard.
- Portrait moves into the opening section as a tall image beside the lede on desktop, stacked above the lede on mobile (no longer a separate sidebar).
- Drop the existing "Beyond" 3-up grid — its content is folded into the "Beginnings" paragraph already.
- Keep the existing panel chrome (header "01 / Story", close button) and the mobile swipe-to-light-mode behaviour. All text uses the existing `lightMode` conditional classes so light mode stays consistent.
- Panel body becomes vertically scrollable (`overflow-y-auto`) instead of the current fixed-height grid.

## Data

Add the story copy to `src/lib/profile-data.ts` as a new `storyChapters` array (year label, org, subtitle, body). Source `experience` stays untouched (other consumers use it). The Story panel reads from `storyChapters`; `experience` is no longer used inside the Story tab.

## Files

- `src/routes/index.tsx` — replace the `tab === "life"` block (lines ~598–686) with the new narrative layout; keep everything else as-is.
- `src/lib/profile-data.ts` — add `storyChapters` export with the 7 chapters from `story.md`.

## Out of scope

- No changes to JSON profile endpoint, feed, sitemap, or SEO metadata.
- No changes to Thoughts, Contact, header, headline, shortcuts, or animation system.
- No new dependencies.
