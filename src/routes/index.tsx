import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import banner from "@/assets/banner.jpeg";
import portrait from "@/assets/portrait.png";
import {
  person,
  experience,
  thinking,
  life,
  SITE_URL,
  PORTRAIT_PATH,
  PORTRAIT_ALT,
  CONTENT_UPDATED_AT,
} from "@/lib/profile-data";

const currentRoles = experience.filter((e) => e.current);
const nowStatement =
  "Currently building Hologram Technologies (software-defined compute for local AI) and contributing to UOR Foundation (content-addressed open data). Investing thesis: deep tech, AI infrastructure, and real-world assets.";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: person.name,
  givenName: person.givenName,
  familyName: person.familyName,
  jobTitle: person.jobTitle,
  description: person.description,
  disambiguatingDescription: nowStatement,
  url: `${SITE_URL}/`,
  mainEntityOfPage: `${SITE_URL}/`,
  image: `${SITE_URL}${PORTRAIT_PATH}`,
  email: `mailto:${person.email}`,
  knowsAbout: person.knowsAbout,
  sameAs: person.sameAs,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: person.alumniOf.name,
    url: person.alumniOf.url,
  },
  worksFor: currentRoles.map((e) => ({
    "@type": "Organization",
    name: e.org,
    ...(e.orgUrl ? { url: e.orgUrl } : {}),
  })),
  hasOccupation: experience.map((e) => ({
    "@type": "Role",
    roleName: e.role,
    startDate: e.startYear,
    ...(e.endYear ? { endDate: e.endYear } : {}),
    "@reverse": {
      employee: {
        "@type": "Organization",
        name: e.org,
        ...(e.orgUrl ? { url: e.orgUrl } : {}),
      },
    },
  })),
  dateModified: CONTENT_UPDATED_AT,
};

const publicationsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Writing & talks by Ilya Paveliev",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: thinking.length,
  itemListElement: thinking.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: t.title,
      url: t.url,
      datePublished: t.dateISO,
      genre: t.kind,
      author: { "@type": "Person", name: person.name, "@id": `${SITE_URL}/#person` },
      publisher: { "@type": "Organization", name: t.venue },
    },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ilya Paveliev — Co-founder & Investor in Deep Tech and AI" },
      { name: "description", content: person.description },
      { name: "author", content: person.name },
      {
        name: "keywords",
        content:
          "Ilya Paveliev, Hologram Technologies, Arete Capital, UOR Foundation, deep tech, AI infrastructure, local AI, real-world assets, venture capital",
      },
      // Open Graph
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: person.name },
      { property: "og:title", content: "Ilya Paveliev — Co-founder & Investor" },
      { property: "og:description", content: person.description },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-card.jpg` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-card.jpg` },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${person.name} — ${person.jobTitle}. ${PORTRAIT_ALT}` },
      { property: "og:locale", content: "en_US" },
      { property: "profile:first_name", content: person.givenName },
      { property: "profile:last_name", content: person.familyName },
      { property: "profile:username", content: person.twitterHandle },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: `@${person.twitterHandle}` },
      { name: "twitter:creator", content: `@${person.twitterHandle}` },
      { name: "twitter:title", content: "Ilya Paveliev — Co-founder & Investor" },
      { name: "twitter:description", content: person.description },
      { name: "twitter:image", content: `${SITE_URL}/og-card.jpg` },
      { name: "twitter:image:alt", content: `${person.name} — ${person.jobTitle}` },

    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "me", href: "https://www.linkedin.com/in/trinityinvestor/" },
      { rel: "me", href: "https://x.com/TrinityInvestor" },
      { rel: "me", href: `mailto:${person.email}` },
      { rel: "alternate", type: "application/feed+json", href: "/feed.json", title: "Writing & talks" },
      { rel: "alternate", type: "application/json", href: "/api/profile.json", title: "Profile data" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(publicationsSchema),
      },
    ],
  }),
  component: Index,
});

type Tab = "experience" | "thinking" | "life";

function YearsTime({ entry }: { entry: (typeof experience)[number] }) {
  // Leading separator so DOM textContent reads "Hologram Technologies / 2025 —"
  // rather than "Hologram Technologies2025 —" when org and date are flex siblings.
  const sep = <span className="sr-only"> / </span>;
  if (entry.endYear && entry.endYear !== entry.startYear) {
    return (
      <>
        {sep}
        <time dateTime={entry.startYear}>{entry.startYear}</time>
        <span aria-hidden="true"> — </span>
        <time dateTime={entry.endYear}>{entry.endYear.slice(2)}</time>
      </>
    );
  }
  if (entry.current) {
    return (
      <>
        {sep}
        <time dateTime={entry.startYear}>{entry.startYear}</time>
        <span aria-hidden="true"> —</span>
        <span className="sr-only"> present</span>
      </>
    );
  }
  return (
    <>
      {sep}
      <time dateTime={entry.startYear}>{entry.startYear}</time>
    </>
  );
}

export function Index() {
  const [tab, setTab] = useState<Tab>("experience");
  const [dark, setDark] = useState(false);
  const pagerRef = useRef<HTMLDivElement | null>(null);
  const tabs: Tab[] = ["experience", "thinking", "life"];

  useEffect(() => {
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefers);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollToTab = (t: Tab) => {
    setTab(t);
    const el = pagerRef.current;
    if (!el) return;
    const idx = tabs.indexOf(t);
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  const onPagerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    const next = tabs[idx];
    if (next && next !== tab) setTab(next);
  };


  return (
    <main className="min-h-screen w-screen bg-background text-foreground md:h-screen md:overflow-hidden">
      <p className="sr-only">
        Updated <time dateTime={CONTENT_UPDATED_AT}>{CONTENT_UPDATED_AT}</time>. Structured data is
        available at <a href="/api/profile.json">/api/profile.json</a> and{" "}
        <a href="/feed.json">/feed.json</a>.
      </p>

      {/* ============ MOBILE LAYOUT ( < md ) — dark only ============ */}
      {/* data-nosnippet: visual duplicate of the desktop layout; canonical structured data lives above. */}
      <div className="md:hidden dark flex flex-col bg-background text-foreground" data-nosnippet aria-hidden={false}>
        {/* Hero — full-bleed banner (no top text) */}
        <section
          className="relative"
          itemScope
          itemType="https://schema.org/Person"
        >
          <link itemProp="url" href={`${SITE_URL}/`} />
          <meta itemProp="jobTitle" content={person.jobTitle} />
          <meta itemProp="description" content={person.description} />

          <div className="relative h-[31vh] w-full overflow-hidden bg-panel">
            <img
              src={banner}
              alt=""
              role="presentation"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "sepia(0.18) saturate(0.7) contrast(0.95) brightness(0.92)" }}
            />
            {/* Warm amber wash — Aman cinematic tone */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,131,86,0.12),transparent_65%)] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,22,16,0.18)_0%,transparent_35%,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </div>

          {/* Portrait overlapping hero seam */}
          <figure className="-mt-[22vw] flex justify-center px-6 m-0">
            <div className="relative h-[43vw] w-[43vw] max-h-52 max-w-52 rounded-full overflow-hidden ring-1 ring-accent/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
              <img
                src={portrait}
                alt={PORTRAIT_ALT}
                itemProp="image"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="sr-only">{PORTRAIT_ALT}</figcaption>
          </figure>

          {/* Name block */}
          <div className="px-6 pt-8 text-center">
            <p className="text-[0.7rem] tracking-aman uppercase text-muted-foreground">
              Co-founder · Investor
            </p>
            <h1 className="mt-5 font-display text-[clamp(3rem,13vw,4.5rem)] leading-[0.95] tracking-tight font-light text-foreground">
              <span itemProp="name">
                Ilya <span className="italic text-accent">Paveliev</span>
              </span>
            </h1>
            <div className="mx-auto mt-7 h-px w-12 bg-border" />
            <p className="mx-auto mt-6 max-w-[32ch] text-[1rem] leading-[1.7] text-muted-foreground">
              Building software-defined compute for local AI. Investing across
              deep tech, AI and real-world assets.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-muted-foreground">
              <a
                href={`mailto:${person.email}`}
                aria-label="Email Ilya Paveliev"
                rel="me"
                itemProp="email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:text-accent hover:border-accent transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/trinityinvestor/"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                itemProp="sameAs"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:text-accent hover:border-accent transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
              </a>
              <a
                href="https://x.com/TrinityInvestor"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="X profile (opens in new tab)"
                itemProp="sameAs"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:text-accent hover:border-accent transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Sticky tab nav */}
        <nav className="sticky top-0 z-20 mt-16 border-y border-border bg-background/85 backdrop-blur-md" aria-label="Sections">
          <div className="grid grid-cols-3">
            {(["experience", "thinking", "life"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => scrollToTab(t)}
                aria-current={tab === t ? "page" : undefined}
                className={`relative py-4 text-[0.7rem] tracking-aman uppercase transition-colors ${
                  tab === t ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {t}
                {tab === t && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-10 bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Swipeable horizontal pager */}
        <div
          ref={pagerRef}
          onScroll={onPagerScroll}
          className="flex w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Swipe between sections"
        >
          {(["experience", "thinking", "life"] as Tab[]).map((paneTab) => (
            <section
              key={paneTab}
              className="snap-start shrink-0 basis-full min-w-full px-6 pt-12 pb-20"
              aria-label={paneTab}
            >
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="font-display text-[1.75rem] leading-tight font-light text-foreground/90">
                  {paneTab === "experience" && "Selected experience"}
                  {paneTab === "thinking" && "Writing & talks"}
                  {paneTab === "life" && "Beyond the desk"}
                </h2>
                <span className="text-[0.65rem] tracking-aman uppercase text-muted-foreground shrink-0 ml-3">
                  {paneTab === "experience" && `${experience.length} roles`}
                  {paneTab === "thinking" && `${thinking.length} pieces`}
                  {paneTab === "life" && "Notes"}
                </span>
              </div>

              {paneTab === "experience" && (
                <ol className="divide-y divide-border list-none p-0">
                  {experience.map((e) => (
                    <li
                      key={e.org}
                      className="py-6"
                      itemScope
                      itemType="https://schema.org/OrganizationRole"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3
                          className="font-display text-[1.5rem] leading-tight text-foreground m-0"
                          itemScope
                          itemType="https://schema.org/Organization"
                          itemProp="worksFor"
                        >
                          {e.orgUrl ? (
                            <a
                              href={e.orgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              itemProp="url"
                              className="hover:text-accent transition-colors"
                            >
                              <span itemProp="name">{e.org}</span>
                            </a>
                          ) : (
                            <span itemProp="name">{e.org}</span>
                          )}
                        </h3>
                        <span className="font-display text-sm text-muted-foreground tabular-nums shrink-0">
                          <YearsTime entry={e} />
                        </span>
                      </div>
                      <p
                        className="mt-2 text-[0.7rem] tracking-aman uppercase text-muted-foreground"
                        itemProp="roleName"
                      >
                        {e.role}
                      </p>
                      <p className="mt-3 text-[1rem] leading-[1.65] text-muted-foreground">
                        {e.note}
                      </p>
                    </li>
                  ))}
                </ol>
              )}

              {paneTab === "thinking" && (
                <ul className="space-y-5 list-none p-0">
                  {thinking.map((p) => (
                    <li
                      key={p.title}
                      itemScope
                      itemType="https://schema.org/CreativeWork"
                    >
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        itemProp="url"
                        className="group relative flex flex-col overflow-hidden border border-border bg-background/40 transition-colors active:border-accent"
                      >
                        <div className="relative h-32 w-full overflow-hidden" style={{ background: p.gradient }}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                          <div className="absolute inset-0 flex items-end justify-between gap-3 p-4 pr-14">
                            <span className="text-[0.65rem] tracking-aman uppercase text-white/90" itemProp="genre">
                              {p.kind}
                            </span>
                            <span className="font-display text-white text-base tracking-[0.02em] truncate" itemProp="publisher">
                              {p.venue}
                            </span>
                          </div>
                          <span aria-hidden="true" className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground text-sm">
                            ↗
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-[1.375rem] leading-snug text-foreground m-0" itemProp="name">
                            {p.title}
                          </h3>
                          <p className="mt-3 text-[0.65rem] tracking-aman uppercase text-muted-foreground">
                            <time dateTime={p.dateISO} itemProp="datePublished">{p.date}</time>
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {paneTab === "life" && (
                <ol className="space-y-8 list-none p-0">
                  {life.map((l, i) => (
                    <li key={i}>
                      <span aria-hidden="true" className="text-[0.65rem] tracking-aman uppercase text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-3 font-display text-[1.375rem] leading-[1.4] text-foreground/90">
                        {l}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      </div>


      {/* ============ DESKTOP LAYOUT ( ≥ md ) ============ */}
      <div className="hidden md:grid h-full w-full" style={{ gridTemplateColumns: "38.2fr 61.8fr", gridTemplateRows: "100%" }}>

        {/* LEFT — enclosed panel: banner image + circular portrait + name */}
        <section
          className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-panel text-panel-foreground"
          itemScope
          itemType="https://schema.org/Person"
          aria-label="Profile"
        >
          <link itemProp="url" href={`${SITE_URL}/`} />
          <meta itemProp="jobTitle" content={person.jobTitle} />
          <meta itemProp="description" content={person.description} />

          {/* Banner (top ~38.2%) */}
          <div className="relative h-[38.2%] w-full shrink-0 overflow-hidden">
            <img
              src={banner}
              alt=""
              role="presentation"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "sepia(0.18) saturate(0.7) contrast(0.95) brightness(0.92)" }}
            />
            {/* Warm amber wash — Aman cinematic tone */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,131,86,0.12),transparent_65%)] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,22,16,0.22)_0%,transparent_40%,transparent_55%,rgba(10,8,6,0.45)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-panel" />
            <div className="absolute top-[3.82vh] left-[3.82vw] flex items-center gap-3 text-[0.65rem] tracking-aman uppercase text-white/85">
              <span className="inline-block h-px w-8 bg-accent" />
              IP · MMXXVI
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex min-h-0 flex-1 flex-col overflow-visible">
            {/* Circular portrait */}
            <figure className="relative flex shrink-0 justify-start px-[3.82vw] m-0">
              <div className="relative -mt-[7.3vw] h-[14.6vw] w-[14.6vw] rounded-full overflow-hidden ring-1 ring-accent/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
                <img
                  src={portrait}
                  alt={PORTRAIT_ALT}
                  itemProp="image"
                  className="h-full w-full object-cover"
                />
              </div>
              <span aria-hidden="true" className="absolute left-[calc(3.82vw+14.6vw-0.5rem)] bottom-[-0.25rem] h-2 w-2 rounded-full bg-accent" />
              <figcaption className="sr-only">{PORTRAIT_ALT}</figcaption>
            </figure>

            {/* Name + bio */}
            <div className="px-[3.82vw] pt-[2.36vh] flex-1 min-h-0 overflow-y-auto">
              <p className="text-[0.618rem] tracking-aman uppercase text-panel-foreground/60 mb-[1.618rem]">
                Co-founder · Investor
              </p>
              <h1 className="font-display text-[clamp(2.618rem,4.85vw,4.236rem)] leading-[1] tracking-tight font-light text-panel-foreground">
                <span aria-hidden="true">
                  Ilya{" "}
                  <span className="italic text-accent">Paveliev</span>
                </span>
                <span className="sr-only" itemProp="name">Ilya Paveliev — Co-founder & Investor in Deep Tech and AI</span>
              </h1>
              <div className="mt-[2.36vh] h-px w-[38.2%] bg-panel-foreground/25" />
              <p className="mt-[1.46vh] max-w-[38ch] text-[0.809rem] leading-[1.618] text-panel-foreground/75">
                Building software-defined compute for local AI. Investing across
                deep tech, AI and real-world assets.
              </p>
            </div>


            {/* Contact details — bottom left */}
            <div className="shrink-0 px-[3.82vw] pb-[3.82vh] pt-[2vh]">
              <div className="flex flex-wrap items-center gap-x-[1.5vw] gap-y-2 text-[0.65rem] tracking-aman uppercase text-panel-foreground/55">
                <a
                  href={`mailto:${person.email}`}
                  rel="me"
                  itemProp="email"
                  className="hover:text-panel-foreground transition-colors"
                >
                  {person.email}
                </a>
                <a
                  href="https://www.linkedin.com/in/trinityinvestor/"
                  target="_blank"
                  rel="me noopener noreferrer"
                  itemProp="sameAs"
                  className="hover:text-panel-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/TrinityInvestor"
                  target="_blank"
                  rel="me noopener noreferrer"
                  itemProp="sameAs"
                  className="hover:text-panel-foreground transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* RIGHT — content */}
        <section className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-surface" aria-labelledby="desktop-section-heading">
          {/* Top bar */}
          <header
            className="flex items-center justify-between border-b border-border px-[2.36vw]"
            style={{ height: "9.02vh" }}
          >
            <nav className="flex items-center gap-[2.36vw] text-[0.618rem] tracking-aman uppercase" aria-label="Sections">
              {(["experience", "thinking", "life"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  aria-current={tab === t ? "page" : undefined}
                  className={`relative pb-1 transition-colors ${
                    tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                  {tab === t && (
                    <span className="absolute -bottom-px left-0 h-px w-full bg-foreground" />
                  )}

                </button>
              ))}
            </nav>
            <button
              onClick={() => setDark((d) => !d)}
              className="text-[0.618rem] tracking-aman uppercase text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </header>

          {/* Body */}
          <div className="flex flex-1 min-h-0 flex-col px-[3.82vw] py-[3.82vh]">
            <div className="flex items-baseline justify-between mb-[2.36vh]">
              <h2 id="desktop-section-heading" className="font-display text-[clamp(1.618rem,2.36vw,2.618rem)] tracking-[0.02em] text-foreground/90 font-light leading-[1.146]">
                {tab === "experience" && "Selected experience"}
                {tab === "thinking" && "Writing & talks"}
                {tab === "life" && "Beyond the desk"}
              </h2>

              <span className="text-[0.618rem] tracking-aman uppercase text-muted-foreground">
                {tab === "experience" && `${experience.length} roles`}
                {tab === "thinking" && `${thinking.length} pieces`}
                {tab === "life" && "Notes"}
              </span>
            </div>


            <div className="flex-1 min-h-0 overflow-hidden">
              {tab === "experience" && (
                <ol className="divide-y divide-border list-none p-0">
                  {experience.map((e) => (
                    <li
                      key={e.org}
                      className="grid grid-cols-[1fr_auto] gap-6 py-[1.46vh]"
                      itemScope
                      itemType="https://schema.org/OrganizationRole"
                    >
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <h3
                            className="font-display text-[1.25rem] leading-tight text-foreground m-0"
                            itemScope
                            itemType="https://schema.org/Organization"
                            itemProp="worksFor"
                          >
                            {e.orgUrl ? (
                              <a
                                href={e.orgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                itemProp="url"
                                className="hover:text-accent transition-colors"
                              >
                                <span itemProp="name">{e.org}</span>
                              </a>
                            ) : (
                              <span itemProp="name">{e.org}</span>
                            )}
                          </h3>
                          <span className="text-[0.62rem] tracking-aman uppercase text-muted-foreground" itemProp="roleName">
                            {e.role}
                          </span>

                        </div>
                        <p className="mt-1 text-sm text-muted-foreground truncate">{e.note}</p>
                      </div>
                      <span className="self-center font-display text-sm text-muted-foreground tabular-nums">
                        <YearsTime entry={e} />
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              {tab === "thinking" && (
                <ul className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.46vw] auto-rows-fr list-none p-0">
                  {thinking.map((p) => (
                    <li
                      key={p.title}
                      className="min-h-0"
                      itemScope
                      itemType="https://schema.org/CreativeWork"
                    >
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        itemProp="url"
                        className="group relative flex h-full flex-col overflow-hidden border border-border bg-background/40 transition-all hover:border-accent/60 hover:-translate-y-0.5"
                      >
                        <div
                          className="relative w-full overflow-hidden h-24 sm:h-28 shrink-0"
                          style={{ background: p.gradient }}
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                          <div className="absolute inset-0 flex items-end justify-between gap-3 p-3 pr-12">
                            <span className="text-[0.6rem] tracking-aman uppercase text-white/85" itemProp="genre">
                              {p.kind}
                            </span>
                            <span className="font-display text-white/90 text-sm tracking-[0.02em] truncate" itemProp="publisher">
                              {p.venue}
                            </span>
                          </div>
                          <span aria-hidden="true" className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/85 text-foreground text-xs transition-transform group-hover:rotate-[-12deg]">
                            ↗
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-[1.1vw]">
                          <h3 className="font-display text-[1.05rem] leading-snug text-foreground line-clamp-2 m-0" itemProp="name">
                            {p.title}
                          </h3>
                          <div className="mt-2 flex items-center justify-between text-[0.62rem] tracking-aman uppercase text-muted-foreground">
                            <time dateTime={p.dateISO} itemProp="datePublished">{p.date}</time>
                            <span aria-hidden="true" className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              Open ·
                            </span>

                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}


              {tab === "life" && (
                <ol className="space-y-[2.4vh] list-none p-0">
                  {life.map((l, i) => (
                    <li key={i} className="flex gap-5">
                      <span aria-hidden="true" className="font-sans text-[0.62rem] tracking-aman uppercase text-muted-foreground pt-2 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <p className="font-display text-[1.25rem] leading-snug text-foreground/90 max-w-[58ch]">
                        {l}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
