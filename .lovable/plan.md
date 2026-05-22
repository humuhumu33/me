## What changes

Flip the homepage hero from dark to a **stark white canvas with massive black typography** — directly inspired by the Power vs. Force cover. Keep BIO / FEED / CONTACT overlay panels dark, so every interaction is a hard black/white snap.

No scrolling. Still single-screen. The whole site becomes a contrast machine: white hero → click → dark panel → close → white hero.

## Hero redesign (the home screen)

- **Background**: pure white (`#fff`), edge to edge.
- **Headline**: `BUILDING THE / FUTURE OF / SOVEREIGN AI.` — same three rows, same scale, rendered in **bold black** on white. Tighter tracking, heavier weight than the current dark version. Composition pinned bottom-left like the book cover's "FORCE".
- **Top-left wordmark**: `ILYA_PAVELIEV` in black.
- **Top-right nav**: `BIO  FEED  CONTACT` in black; current item gets a thin black hairline box (book-cover label treatment).
- **Bottom-right meta**: email + LinkedIn + X in black, smaller caps, same position.
- **Subtle texture**: faint warm paper grain over the white (very low opacity) so it reads like print, not like a default page — same restraint the book cover uses.
- **No accent color.** Pure black on white only.

## Overlay panels (BIO / FEED / CONTACT)

- Stay on **black** as they are today.
- Bump the close button + panel header to a thin **white hairline box** so the visual language matches the hero's nav treatment.
- No layout changes to panel internals — recent BIO and FEED redesigns stay.

## Mobile menu

- Inverts: fullscreen **white** sheet with **black** giant nav items, matching the hero.

## Why this works

- Direct quote of the book cover: stark white field, massive black sans-serif, headline pinned to a corner.
- Every panel open is a full inversion — the strongest possible black/white moment, repeated on every interaction.
- Zero scrolling, single screen preserved.
- Pure black/white only — no accent dilution.

## Technical notes

- Edit only `src/routes/index.tsx`. No new routes, no new dependencies.
- Swap the hero's root background from `bg-black text-white` to `bg-white text-black`; invert nav, headline, and meta colors.
- Add a faint paper-grain layer (SVG noise or CSS `background-image` data URI) at ~3% opacity.
- Overlay panel chrome (`bg-black/85 backdrop-blur-md` + dark section) is unchanged — only swap the header border to white hairline.
- Mobile menu sheet flips to `bg-white text-black`.
- Tailwind tokens only; no edits to `src/styles.css` needed for this change.

## Out of scope

- No new scrolling sections (rejected option).
- No accent color (rejected option).
- No changes to BIO / FEED / CONTACT internal layouts.
- No changes to data, routes, or SEO metadata.

## After this plan

Once approved, the build step will generate 3 rendered hero directions (all locked to: white background, black bold sans, three-row headline bottom-left, no accent) so you can pick the exact composition before I touch the code.
