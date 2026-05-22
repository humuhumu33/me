## Goal
Make the BIO overlay panel feel sharper and more confident — less density, no tiny labels, smaller portrait so type can breathe.

## Changes in `src/routes/index.tsx` (life tab only)

### 1. Portrait — reduce footprint
- Change grid columns from `0.85fr_1.15fr` → `0.55fr_1.45fr` (portrait column ~38% of panel instead of ~42%, then shrunk further inside).
- Cap portrait width: wrap image in container `max-w-[18rem]` and `aspect-[4/5]` instead of `grow min-h-0` filling the column.
- Keep portrait left-aligned at top; intro paragraph sits directly under it (no `justify-between` stretch).

### 2. Typography — kill small fonts, raise hierarchy
- Eyebrow labels ("By the numbers", "The backstory", "Beyond", job title above name): bump from `0.62rem` → `0.78rem`, tracking `0.28em`.
- Stat labels: `0.56rem` → `0.72rem`.
- Stat values: keep ~`clamp(1.8rem, 2.6vw, 2.8rem)` — already strong.
- Timeline date: `0.62rem` → `0.78rem`.
- Timeline org name: `clamp(1.05rem, 1.2vw, 1.3rem)`, weight 500.
- Intro paragraph: bump to `clamp(1.05rem, 1.15vw, 1.25rem)`.
- "Beyond" items: bump to `clamp(0.92rem, 1vw, 1.1rem)`; numeric markers to `0.72rem`.
- Name overlay on portrait: keep size, ensure single line.

### 3. Reduce text density
- **Backstory**: drop the trailing `· {note}` (descriptions like "Software-defined compute for local AI inference."). Show only `{org}` + light `{role}`. Keeps timeline scannable.
- **Beyond**: trim from 4 items → 3 (drop one redundant entry, e.g. keep Trinity gold medal, offshore sailing, daughters; drop "builds drones/robots/wearables" which overlaps with the Hologram line).
- **Intro paragraph**: shorten to one sharp sentence — "Building sovereign AI infrastructure. Investing in deep tech and real-world assets." (replace current two-sentence version locally; do not mutate `person.description` used elsewhere).
- **By the numbers**: keep 4 stats (already tight).

### 4. Spacing
- Increase vertical gaps between the three right-column sections to `clamp(1.75rem, 3vh, 2.75rem)` so sections breathe instead of stacking densely.

## Out of scope
No changes to FEED, CONTACT, header, mobile view, or shared data in `profile-data.ts`.
