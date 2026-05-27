# Crisp keyboard shortcuts + hint overlay

Add global keyboard shortcuts to navigate the site, plus a tiny, monospace shortcut-hint chip whose position depends on where the user is.

## Shortcuts (global)

- `1` → open STORY
- `2` → open THOUGHTS
- `3` → open CONTACT
- `H` → return to homepage (close panel)
- `Esc` → close panel / close mobile menu (already wired)

Rules:
- Ignored while typing in inputs/textareas/contentEditable
- Ignored when `⌘`/`Ctrl`/`Alt` are held (so browser shortcuts still work)
- Implemented in the existing global `keydown` effect in `src/routes/index.tsx`

## Hint overlay (desktop only)

A small, crisp monospace card listing the shortcuts. Very low-key — hairline border, semi-transparent black, ~11px uppercase mono, tight spacing. Each row: a boxed key glyph + label.

Contents:
- `1  STORY`
- `2  THOUGHTS`
- `3  CONTACT`
- `H  HOME` (only shown when a panel is open)
- `ESC  CLOSE` (only shown when a panel is open)

Positioning:
- Homepage (`tab === null`): **bottom-right**, fixed, ~24px inset
- Any other page (`tab !== null`): **bottom-left**, fixed, ~24px inset, sits above panel content (z above the overlay)

Hidden on mobile (`md:` only). No animation needed beyond a 150ms fade when the panel opens/closes and the chip swaps sides.

## Out of scope

- No new routes, no data changes
- No command palette / ⌘K (can be a follow-up)
- No changes to mobile layout

## Files

- `src/routes/index.tsx` — extend the keydown effect, add a `<ShortcutHints />` block rendered once at the root of the desktop layout, switching position based on `tab`
