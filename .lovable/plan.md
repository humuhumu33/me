# Make the site AI-agent friendly

Targeted, low-risk pass. No visual changes — only semantics, metadata, and two new machine-readable endpoints. All edits stay in the frontend; no business logic touched.

## 1. Expand JSON-LD Person schema (`src/routes/index.tsx`)

Replace the current minimal Person block in `head().scripts` with a full one derived from existing data:

- `name`, `jobTitle`, `description`, `url`, `image` (absolute portrait URL)
- `worksFor[]` — every current role (Hologram, UOR Foundation, Arete) with `{ "@type": "Organization", name, url }` and a sibling `hasOccupation` for the role title
- `alumniOf` — Trinity College Dublin
- `knowsAbout[]` — deep tech, AI infrastructure, local AI inference, real-world assets, venture investing, portfolio management, formal verification, content-addressed data (derived from existing copy, not invented)
- `sameAs[]` — LinkedIn, X, plus Substack (already linked in Thinking) and UOR Foundation
- `email`: `mailto:ilya@uor.foundation`

Add a second JSON-LD block of type `ItemList` enumerating the 5 Thinking entries (each as a `CreativeWork` with `name`, `url`, `datePublished`, `genre`=kind, `publisher`=venue) so agents can extract publications without parsing the DOM.

## 2. Semantic heading hierarchy (`src/routes/index.tsx`)

Currently the page has one `h1` and an `h2` per tab, with experience rendered as a flat `<ul>`. Change to:

- Keep single `h1` (name)
- `h2` per tab section (already present)
- Per experience row: wrap each `<li>` content so the **org name is an `<h3>`**, the role is a sibling `<p>` with `role="doc-subtitle"`, and years use `<time>` tags (`<time>2025</time>` / `<time>2023</time>–<time>2025</time>`) — parsed from the existing `years` strings
- Per thinking card: title becomes `<h3>`, date wrapped in `<time dateTime="YYYY-MM">`
- Add hidden microdata-style attributes via `itemScope`/`itemType="https://schema.org/Person"` on the hero block, and `itemType="https://schema.org/OrganizationRole"` on each experience `<li>`, mirroring the JSON-LD

No visual change — `<h3>` styled with existing classes.

## 3. Image alt text & captions

- `banner.jpeg`: `alt=""` stays (decorative), but add `role="presentation"`
- `portrait.png`: change `alt="Ilya Paveliev"` → `alt="Portrait of Ilya Paveliev, co-founder of Hologram Technologies and general partner at Arete Capital."` on both mobile and desktop instances
- Wrap portrait in `<figure>` with a visually-hidden `<figcaption>` carrying the same text for screen readers and agents

## 4. Meta + social tags (`src/routes/index.tsx` head())

Add to the existing `meta` array:

- `og:image` + `og:image:alt` + `og:image:width`/`height` — pointing at the portrait (absolute URL)
- `og:type` = `profile`, plus `profile:first_name`, `profile:last_name`, `profile:username`
- `twitter:card` = `summary_large_image`, `twitter:site` = `@TrinityInvestor`, `twitter:creator`, `twitter:title`, `twitter:description`, `twitter:image`
- `author` = "Ilya Paveliev"
- `keywords` (short, honest list from existing copy)

## 5. `rel="me"` on identity links

On both desktop and mobile, every external identity link (LinkedIn, X, email) gets `rel="me noopener"`. Email gets `rel="me"`. Enables Mastodon/BlueSky/IndieAuth verification.

## 6. Machine-readable endpoints

Two new TanStack server routes that reuse the existing `experience` / `thinking` / `life` arrays (extracted into `src/lib/profile-data.ts` so both UI and endpoints share one source of truth):

- `src/routes/api/profile.ts` → `GET /api/profile` returning a stable JSON document: `{ person: {...}, experience: [...], publications: [...], life: [...], updatedAt }` with `Content-Type: application/json` and `Cache-Control: public, max-age=3600`
- `src/routes/feed[.]json.ts` → `GET /feed.json` in JSON Feed v1.1 format, one entry per Thinking item (title, url, date_published, content_text, tags=[kind])

Both link from the head: `<link rel="alternate" type="application/json" href="/feed.json">` and `<link rel="alternate" type="application/json" href="/api/profile">`.

## 7. Sitemap + robots updates

- `src/routes/sitemap[.]xml.ts`: add `/api/profile` and `/feed.json` entries with `lastmod` set to a build-time ISO date, and a `lastmod` on `/`
- `public/robots.txt`: keep as-is (already `Allow: /` + sitemap line); explicitly add `Allow: /api/profile` and `Allow: /feed.json` for clarity, and a `User-agent: GPTBot` / `ClaudeBot` / `PerplexityBot` block also set to `Allow: /` to signal intent

## 8. `llms.txt` refresh (`public/llms.txt`)

Expand with sections matching the JSON profile: current roles, prior roles, publications (titled list with URLs), contact, and links to `/api/profile` + `/feed.json` so LLM crawlers can pivot to structured data.

---

### Files touched

- `src/routes/index.tsx` — head() expansion, semantic HTML, alt text, rel="me"
- `src/lib/profile-data.ts` — NEW; shared data module
- `src/routes/api/profile.ts` — NEW; JSON profile endpoint
- `src/routes/feed[.]json.ts` — NEW; JSON Feed
- `src/routes/sitemap[.]xml.ts` — add new URLs + lastmod
- `public/robots.txt` — explicit allows + named agent blocks
- `public/llms.txt` — fuller content

### Out of scope

- RSS/Atom XML feed (JSON Feed covers the same need and is simpler; ask if you'd prefer XML too)
- Visual/design changes
- Adding a GitHub link (not in current site — confirm the handle before I include it in `sameAs`)
- Splitting into multiple routes (`/about`, `/writing`) — could come later if you want per-section share previews

### One open question

The audit mentions a `github.com/ilyapaveliev` handle that isn't currently linked on the site. **Should I include it in `sameAs` and the contact icons, or leave GitHub off until you confirm the handle?**
