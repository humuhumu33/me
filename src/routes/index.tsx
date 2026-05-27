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
  "Currently building Hologram Technologies (software-defined compute for sovereign AI) and contributing to UOR Foundation (content-addressed open data). Investing thesis: deep tech, AI infrastructure, and real-world assets.";

const ThoughtCard = ({ p, large }: { p: typeof thinking[number]; large?: boolean }) => (
  <li className="contents" itemScope itemType="https://schema.org/CreativeWork">
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      itemProp="url"
      className="group relative flex h-full w-full overflow-hidden border border-white/10 transition-all hover:border-white/40"
      style={{ background: p.gradient }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span
        className={`absolute top-[clamp(1rem,2vh,1.75rem)] left-[clamp(1rem,2vw,1.75rem)] tracking-[0.28em] uppercase text-white/85 ${large ? "text-[0.72rem]" : "text-[0.62rem]"}`}
        itemProp="genre"
      >
        {p.kind}
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-[clamp(0.75rem,1.6vh,1.25rem)] right-[clamp(0.75rem,1.6vw,1.25rem)] flex items-center justify-center rounded-full border border-white/60 text-white transition-transform group-hover:rotate-[-12deg] ${large ? "h-12 w-12 text-lg" : "h-8 w-8 text-xs"}`}
      >
        ↗
      </span>
      <div className={`relative mt-auto flex w-full flex-col gap-2 ${large ? "p-[clamp(1.5rem,2.4vw,2.5rem)]" : "p-[clamp(0.9rem,1.4vw,1.25rem)]"}`}>
        <h3
          className={`font-sans font-medium leading-[1.05] tracking-[-0.01em] text-white m-0 line-clamp-3 ${large ? "text-[clamp(1.6rem,2.6vw,2.6rem)]" : "text-[clamp(0.95rem,1.05vw,1.15rem)]"}`}
          itemProp="name"
        >
          {p.title}
        </h3>
        <p className={`tracking-[0.28em] uppercase text-white/55 m-0 ${large ? "text-[0.68rem]" : "text-[0.56rem]"}`}>
          <span itemProp="publisher">{p.venue}</span>
          <span className="mx-2 opacity-50">·</span>
          <time dateTime={p.dateISO} itemProp="datePublished">{p.date}</time>
        </p>
      </div>
    </a>
  </li>
);

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
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/` },
  image: `${SITE_URL}${PORTRAIT_PATH}`,
  seeks: {
    "@type": "Demand",
    description:
      "Advisory and investment opportunities in deep tech and AI infrastructure",
  },
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: person.name,
  url: `${SITE_URL}/`,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: `${SITE_URL}/`,
  mainEntity: { "@id": `${SITE_URL}/#person` },
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
          "Ilya Paveliev, Hologram Technologies, Arete Capital, UOR Foundation, deep tech, AI infrastructure, sovereign AI, real-world assets, venture capital",
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
      { type: "application/ld+json", children: JSON.stringify(personSchema) },
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
      { type: "application/ld+json", children: JSON.stringify(profilePageSchema) },
      { type: "application/ld+json", children: JSON.stringify(publicationsSchema) },
    ],
  }),
  component: Index,
});

type Tab = "experience" | "thinking" | "life" | "contact";

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

const Hint = ({ k, label, active }: { k: string; label: string; active?: boolean }) => (
  <span className={`flex items-center gap-[0.4rem] ${active ? "text-white" : ""}`}>
    <kbd className={`inline-flex h-[1.05rem] min-w-[1.05rem] items-center justify-center border px-[0.3rem] font-mono text-[0.6rem] leading-none ${active ? "border-white bg-white text-black" : "border-white/25 bg-white/[0.04] text-white/80"}`}>
      {k}
    </kbd>
    <span>{label}</span>
  </span>
);

export function Index() {
  const [tab, setTab] = useState<Tab | null>(null);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (tab !== "contact") setContactSent(false);
  }, [tab]);


  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (e.key === "Escape") { setTab(null); setMenuOpen(false); return; }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "1") { e.preventDefault(); setTab("life"); }
      else if (e.key === "2") { e.preventDefault(); setTab("thinking"); }
      else if (e.key === "3") { e.preventDefault(); setTab("contact"); }
      else if (e.key === "h" || e.key === "H") { e.preventDefault(); setTab(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems: { id: Tab; label: string }[] = [
    { id: "life", label: "STORY" },
    { id: "thinking", label: "THOUGHTS" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <main className="relative w-screen bg-black text-white min-h-svh md:h-screen md:overflow-hidden">
      <p className="sr-only">
        Updated <time dateTime={CONTENT_UPDATED_AT}>{CONTENT_UPDATED_AT}</time>. Structured data is
        available at <a href="/api/profile.json">/api/profile.json</a> and{" "}
        <a href="/feed.json">/feed.json</a>.
      </p>

      {/* Hidden semantic profile data for crawlers */}
      <div className="sr-only" itemScope itemType="https://schema.org/Person">
        <link itemProp="url" href={`${SITE_URL}/`} />
        <span itemProp="name">{person.name}</span>
        <span itemProp="jobTitle">{person.jobTitle}</span>
        <span itemProp="description">{person.description}</span>
        <a itemProp="image" href={`${SITE_URL}${PORTRAIT_PATH}`}>{PORTRAIT_ALT}</a>

        <a itemProp="sameAs" rel="me" href="https://www.linkedin.com/in/trinityinvestor/">LinkedIn</a>
        <a itemProp="sameAs" rel="me" href="https://x.com/TrinityInvestor">X</a>
      </div>

      {/* Pure dark background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,255,255,0.04),transparent_55%)]" />
      </div>

      {/* =================== MOBILE LAYOUT =================== */}
      <div className="relative z-10 md:hidden flex flex-col h-svh overflow-hidden">
        {/* Mobile header — logo + "+" menu */}
        <header className="flex items-center justify-between px-5 pt-[3.82vh] shrink-0">
          <a href="/" className="font-sans text-[1.55rem] font-semibold tracking-[0.16em] uppercase text-white leading-none flex items-center">
            ILYA<span className="opacity-60">_</span>PAVELIEV
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex items-center justify-center text-white text-[2rem] leading-none h-[1.55rem] w-11 -mr-2 active:opacity-60 transition-opacity"
          >
            +
          </button>
        </header>

        {/* Headline — fills remaining screen, 3 rows, golden-ratio rhythm */}
        <div className="flex flex-1 items-end px-5 pb-[6.18vh] min-h-0">
          <h1 className="font-sans w-full font-semibold leading-[0.9] tracking-[-0.06em] uppercase text-white text-[13.4vw]">
            <span itemProp="name" className="sr-only">Ilya Paveliev — </span>
            <span className="block whitespace-nowrap">BUILDING THE</span>
            <span className="block whitespace-nowrap">FUTURE OF</span>
            <span className="block whitespace-nowrap">SOVEREIGN AI</span>
            <span className="sr-only"> Co-founder & Investor in Deep Tech and AI.</span>
          </h1>
        </div>






      </div>


      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black text-white flex flex-col animate-in fade-in duration-200">
          <header className="flex items-center justify-between px-5 pt-5">
            <span className="font-sans text-[1.05rem] font-semibold tracking-[0.18em] uppercase text-white">
              ILYA<span className="opacity-60">_</span>PAVELIEV
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-white text-[2rem] leading-none -mr-2 rotate-45 active:opacity-60 transition-opacity"
            >
              +
            </button>
          </header>

          <nav aria-label="Sections" className="flex flex-1 flex-col justify-center divide-y divide-white/10 border-y border-white/10">
            {navItems.map((n, i) => (
              <button
                key={n.id}
                onClick={() => { setMenuOpen(false); setTab(n.id); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const dir = e.key === "ArrowDown" ? 1 : -1;
                    const next = (i + dir + navItems.length) % navItems.length;
                    const btns = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button");
                    btns?.[next]?.focus();
                  }
                }}
                className="group relative flex items-baseline justify-between gap-4 px-5 py-[clamp(1.25rem,3.6vh,2.5rem)] text-left transition-colors active:bg-white active:text-black focus:outline-none focus-visible:bg-white focus-visible:text-black"
              >
                <span className="font-sans text-[0.6rem] tracking-[0.32em] uppercase text-white/40 group-active:text-black/60 group-focus-visible:text-black/60">
                  0{i + 1}
                </span>
                <span className="flex-1 font-sans text-[clamp(1.82rem,9.1vw,3.15rem)] font-semibold leading-[0.95] tracking-[-0.02em] uppercase text-white group-active:text-black group-focus-visible:text-black">
                  {n.label}
                </span>
                <span aria-hidden="true" className="font-sans text-[1.5rem] leading-none text-white/40 group-active:text-black/70 group-focus-visible:text-black/70">↗</span>
              </button>
            ))}
          </nav>

        </div>
      )}

      {/* =================== DESKTOP LAYOUT =================== */}
      {/* Top nav */}
      <header className="hidden md:flex fixed inset-x-0 top-0 z-40 items-center justify-between px-[clamp(1.25rem,3vw,3rem)] py-[clamp(1rem,2vh,1.75rem)]">
        <a href="/" className="font-sans text-[clamp(1.35rem,1.9vw,2rem)] font-semibold tracking-[0.18em] uppercase text-white">
          Ilya<span className="opacity-60">_</span>Paveliev
        </a>
        <nav aria-label="Sections" className="flex items-center gap-[clamp(2.5rem,4.5vw,5rem)]">
          {navItems.map((n, i) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setTab(n.id);
                } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const dir = e.key === "ArrowRight" ? 1 : -1;
                  const next = (i + dir + navItems.length) % navItems.length;
                  const btns = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button");
                  btns?.[next]?.focus();
                }
              }}
              aria-current={tab === n.id ? "page" : undefined}
              aria-keyshortcuts={String(i + 1)}
              className="group relative inline-flex items-center gap-[0.5rem] font-sans text-[clamp(1.35rem,1.9vw,2rem)] font-semibold tracking-[0.2em] uppercase text-white/90 hover:text-white transition-colors outline-none focus:outline-none focus-visible:text-white"
            >
              <kbd
                aria-hidden="true"
                className={`inline-flex h-[1.15rem] w-[1.15rem] items-center justify-center border font-mono text-[0.62rem] leading-none tracking-normal transition-colors ${
                  tab === n.id
                    ? "border-white bg-white text-black"
                    : "border-white/25 text-white/55 group-hover:border-white/60 group-hover:text-white group-focus-visible:border-white/60 group-focus-visible:text-white"
                }`}
              >
                {i + 1}
              </kbd>
              {n.label}
              <span className="absolute -bottom-1 left-[1.65rem] h-px w-0 bg-white transition-all duration-300 group-hover:w-[calc(100%-1.65rem)] group-focus-visible:w-[calc(100%-1.65rem)]" />
            </button>
          ))}
        </nav>


      </header>

      {/* Bottom-left headline — 3 rows, scales to fit longest line on any screen */}
      <div className="hidden md:block absolute bottom-[clamp(4.5rem,9vh,6.5rem)] left-0 z-10 px-[clamp(1.236rem,3vw,3rem)] right-[clamp(1.25rem,3vw,3rem)]">
        <h1 className="font-sans font-semibold leading-[0.92] tracking-[-0.035em] uppercase text-white whitespace-nowrap text-[min(8.4vw,calc((100vw-6rem)/10.29))]">
          BUILDING THE
          <br />
          FUTURE OF
          <br />
          SOVEREIGN AI.
        </h1>
      </div>



      {/* Overlay panel — opens for Experience / Thoughts / Bio */}
      {tab && (
        <div
          className="fixed inset-0 z-30 flex bg-black animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={tab}
        >
          <section className="relative flex h-screen w-screen flex-col bg-[#0a0a0a] pt-[clamp(3.5rem,7vh,5.25rem)]">
            {/* Panel header */}
            <header className="flex items-center justify-between border-b border-white/10 px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.75rem,1.5vh,1.25rem)] shrink-0">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] tracking-[0.32em] uppercase text-white/50">
                  {tab === "life" && "01 / Bio"}
                  {tab === "thinking" && "02 / Thoughts"}
                  {tab === "contact" && "03 / Contact"}
                </span>
                <h2 className="font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] font-medium tracking-[0.02em] uppercase text-white">
                  
                  
                  
                </h2>
              </div>
              <button
                onClick={() => setTab(null)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors"
              >
                <span className="text-base" aria-hidden="true">×</span>
              </button>
            </header>

            {/* Panel body */}
            <div className="flex-1 min-h-0 overflow-hidden px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(1.25rem,2.4vh,2.25rem)]">

              {tab === "contact" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSent(true);
                  }}
                  className="grid h-full grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(2rem,4vw,5rem)]"
                >
                  {/* Left: title + intro */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans font-medium uppercase leading-[0.95] tracking-[-0.02em] text-white text-[clamp(3rem,6vw,6.5rem)] m-0">
                        Get in<br />touch
                      </h3>
                      <div className="flex items-center gap-3 mt-[clamp(1.5rem,3vh,2.5rem)]">
                        <a href="https://www.linkedin.com/in/trinityinvestor/" target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center w-7 h-7 text-white/50 hover:text-white transition-colors">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 block">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a href="https://x.com/TrinityInvestor" target="_blank" rel="me noopener noreferrer" aria-label="X" className="inline-flex items-center justify-center w-7 h-7 text-white/50 hover:text-white transition-colors">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-[1.15rem] h-[1.15rem] block">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right: form fields */}
                  <div className="flex flex-col gap-[clamp(1.5rem,3vh,2.5rem)]">
                    <label className="block">
                      <span className="sr-only">Full name</span>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="FULL NAME"
                        className="w-full bg-transparent border-0 border-b border-white/25 pb-3 font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] tracking-[0.02em] uppercase text-white placeholder:text-white/55 focus:border-white focus:outline-none transition-colors"
                      />
                    </label>


                    <label className="flex flex-1 min-h-0 flex-col">
                      <span className="sr-only">Message</span>
                      <textarea
                        name="message"
                        required
                        placeholder="MESSAGE"
                        className="w-full flex-1 min-h-[10rem] resize-none border border-white/20 bg-white/[0.02] p-5 font-sans text-[clamp(0.95rem,1vw,1.05rem)] leading-relaxed text-white placeholder:text-white/45 placeholder:tracking-[0.18em] placeholder:uppercase focus:border-white focus:outline-none transition-colors"
                      />
                    </label>

                    <div className="flex items-center justify-end">
                      {contactSent ? (
                        <span className="font-sans text-[0.85rem] font-semibold tracking-[0.22em] uppercase text-white/70">Thank you — connect on LinkedIn or X</span>
                      ) : (
                        <button
                          type="submit"
                          className="rounded-full border border-white px-10 py-3.5 font-sans text-[0.85rem] font-semibold tracking-[0.22em] uppercase text-white transition-colors hover:bg-white hover:text-black"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}

              {tab === "thinking" && (
                <ul className="grid h-full grid-cols-1 lg:grid-cols-2 gap-[clamp(0.75rem,1.2vw,1.25rem)] list-none p-0 m-0">
                  <ThoughtCard p={thinking[0]} large />
                  <li className="contents">
                    <ul className="grid h-full grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-[clamp(0.75rem,1.2vw,1.25rem)] list-none p-0 m-0">
                      {thinking.slice(1).map((p) => <ThoughtCard key={p.title} p={p} />)}
                    </ul>
                  </li>
                </ul>
              )}

              {tab === "life" && (
                <div className="grid h-full grid-cols-1 lg:grid-cols-[0.55fr_1.45fr] gap-[clamp(1.5rem,2.8vw,3.25rem)]">
                  {/* Left — portrait + intro */}
                  <div className="flex h-full flex-col gap-[clamp(1rem,2vh,1.75rem)]">
                    <div className="relative w-full max-w-[18rem] aspect-[4/5] overflow-hidden border border-white/15">
                      <img src={portrait} alt={PORTRAIT_ALT} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-[clamp(1rem,1.6vw,1.5rem)]">
                        <p className="text-[0.78rem] tracking-[0.28em] uppercase text-white/65 m-0">{person.jobTitle}</p>
                        <h3 className="font-sans text-[clamp(1.5rem,2vw,2.2rem)] font-medium tracking-[-0.01em] text-white m-0 leading-tight whitespace-nowrap">
                          {person.name}
                        </h3>
                      </div>
                    </div>
                    <p className="font-sans text-[clamp(1.05rem,1.15vw,1.25rem)] leading-snug text-white/85 max-w-[22rem] m-0">
                      Building sovereign AI infrastructure. Investing in deep tech and real-world assets.
                    </p>
                  </div>

                  {/* Right — stats / backstory / beyond */}
                  <div className="flex h-full flex-col gap-[clamp(1.75rem,3vh,2.75rem)] min-h-0">
                    {/* By the numbers */}
                    <div>
                      <p className="text-[0.78rem] tracking-[0.28em] uppercase text-white/50 m-0 mb-[clamp(0.6rem,1.2vh,1rem)]">
                        By the numbers
                      </p>
                      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-[clamp(0.5rem,1vw,1rem)] m-0">
                        {[
                          { v: "$20B+", l: "Assets managed" },
                          { v: "15Y", l: "Building & investing" },
                          { v: "7", l: "Companies & funds" },
                          { v: "10K+", l: "Offshore miles" },
                        ].map((s) => (
                          <div key={s.l} className="border-t border-white/15 pt-[clamp(0.5rem,1vh,0.85rem)]">
                            <dt className="sr-only">{s.l}</dt>
                            <dd className="font-sans text-[clamp(1.8rem,2.6vw,2.8rem)] font-medium tracking-[-0.02em] text-white m-0 leading-none">
                              {s.v}
                            </dd>
                            <p className="text-[0.72rem] tracking-[0.24em] uppercase text-white/55 m-0 mt-[clamp(0.4rem,0.8vh,0.6rem)]">
                              {s.l}
                            </p>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {/* Backstory */}
                    <div className="flex-1 min-h-0 flex flex-col">
                      <p className="text-[0.78rem] tracking-[0.28em] uppercase text-white/50 m-0 mb-[clamp(0.6rem,1.2vh,1rem)]">
                        The backstory
                      </p>
                      <ol className="flex-1 min-h-0 list-none p-0 m-0 divide-y divide-white/10">
                        {experience.map((e) => (
                          <li key={e.org} className="flex items-baseline gap-[clamp(0.75rem,1.2vw,1.25rem)] py-[clamp(0.5rem,1vh,0.85rem)]">
                            <time className="font-sans text-[0.78rem] tracking-[0.24em] uppercase text-white/45 w-[6rem] shrink-0">
                              {e.years}
                            </time>
                            <div className="flex-1 min-w-0 flex items-baseline gap-3">
                              <span className="font-sans text-[clamp(1.05rem,1.2vw,1.3rem)] font-medium tracking-[-0.01em] text-white truncate">
                                {e.org}
                              </span>
                              <span className="font-sans text-[clamp(0.92rem,1vw,1.1rem)] text-white/60 truncate hidden md:inline">
                                {e.role}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Beyond */}
                    <div>
                      <p className="text-[0.78rem] tracking-[0.28em] uppercase text-white/50 m-0 mb-[clamp(0.5rem,1vh,0.85rem)]">
                        Beyond
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-[clamp(1rem,1.6vw,1.75rem)] gap-y-[clamp(0.4rem,0.8vh,0.6rem)] list-none p-0 m-0">
                        {life.filter((_, i) => i !== 2).map((l, i) => (
                          <li key={i} className="flex gap-3 font-sans text-[clamp(0.92rem,1vw,1.1rem)] leading-snug text-white/80">
                            <span aria-hidden="true" className="text-[0.72rem] tracking-[0.24em] uppercase text-white/40 pt-[0.3em]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{l}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </section>
        </div>
      )}
    </main>
  );
}
