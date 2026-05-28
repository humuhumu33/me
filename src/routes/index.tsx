import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import banner from "@/assets/banner.jpeg";
import portrait from "@/assets/portrait.png";


import {
  person,
  experience,
  thinking,
  life,
  storyChapters,
  storyStats,
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

export function Index() {
  const [tab, setTab] = useState<Tab | null>(null);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [contactSent, setContactSent] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) setLightMode(true);
      else setLightMode(false);
    }
  };

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
      <div
        className={`relative z-10 md:hidden flex flex-col h-svh overflow-hidden transition-colors duration-300 ${lightMode ? "bg-white text-black" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Mobile header — logo + "+" menu */}
        <header className="flex items-center justify-between px-5 pt-[3.82vh] shrink-0">
          <a href="/" className={`font-sans text-[1.55rem] font-semibold tracking-[0.16em] uppercase leading-none flex items-center antialiased ${lightMode ? "text-black" : "text-white"}`}>
            ILYA<span className="opacity-60">_</span>PAVELIEV
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className={`flex items-center justify-center text-[2rem] leading-none h-[1.55rem] w-11 -mr-2 active:opacity-60 transition-opacity ${lightMode ? "text-black" : "text-white"}`}
          >
            +
          </button>
        </header>

        {/* Headline — fills remaining screen, 3 rows, golden-ratio rhythm */}
        <div className="flex flex-1 items-end px-5 pb-[6.18vh] min-h-0">
          <h1 className={`font-sans w-full font-semibold leading-[0.9] tracking-[-0.06em] uppercase text-[13.4vw] antialiased ${lightMode ? "text-black" : "text-white"}`}>
            <span itemProp="name" className="sr-only">Ilya Paveliev — </span>
            <span className="block whitespace-nowrap">BUILDING THE</span>
            <span className="block whitespace-nowrap">FUTURE OF</span>
            <span className="block whitespace-nowrap">SOVEREIGN AI</span>
            <span className="sr-only"> Co-founder & Investor in Deep Tech and AI.</span>
          </h1>
        </div>

        {/* Swipe hint */}
        <div className={`absolute bottom-[1.25rem] left-0 right-0 flex justify-center pointer-events-none font-mono text-[0.62rem] tracking-[0.28em] uppercase antialiased ${lightMode ? "text-black/45" : "text-white/35"}`}>
          {lightMode ? "swipe right →  dark" : "← swipe left   light"}
        </div>
      </div>


      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className={`md:hidden fixed inset-0 z-40 flex flex-col animate-in fade-in duration-200 ${lightMode ? "bg-white text-black" : "bg-black text-white"}`}>
          <header className="flex items-center justify-between px-5 pt-5">
            <span className={`font-sans text-[1.05rem] font-semibold tracking-[0.18em] uppercase antialiased ${lightMode ? "text-black" : "text-white"}`}>
              ILYA<span className="opacity-60">_</span>PAVELIEV
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className={`flex h-11 w-11 items-center justify-center text-[2rem] leading-none -mr-2 rotate-45 active:opacity-60 transition-opacity ${lightMode ? "text-black" : "text-white"}`}
            >
              +
            </button>
          </header>

          <nav aria-label="Sections" className={`flex flex-1 flex-col justify-center divide-y border-y ${lightMode ? "divide-black/10 border-black/10" : "divide-white/10 border-white/10"}`}>
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
                className={`group relative flex items-baseline justify-between gap-4 px-5 py-[clamp(1.25rem,3.6vh,2.5rem)] text-left transition-colors focus:outline-none ${lightMode ? "active:bg-black active:text-white focus-visible:bg-black focus-visible:text-white" : "active:bg-white active:text-black focus-visible:bg-white focus-visible:text-black"}`}
              >
                <span className={`font-sans text-[0.6rem] tracking-[0.32em] uppercase antialiased ${lightMode ? "text-black/40 group-active:text-white/60 group-focus-visible:text-white/60" : "text-white/40 group-active:text-black/60 group-focus-visible:text-black/60"}`}>
                  0{i + 1}
                </span>
                <span className={`flex-1 font-sans text-[clamp(1.82rem,9.1vw,3.15rem)] font-semibold leading-[0.95] tracking-[-0.02em] uppercase antialiased ${lightMode ? "text-black group-active:text-white group-focus-visible:text-white" : "text-white group-active:text-black group-focus-visible:text-black"}`}>
                  {n.label}
                </span>
                <span aria-hidden="true" className={`font-sans text-[1.5rem] leading-none ${lightMode ? "text-black/40 group-active:text-white/70 group-focus-visible:text-white/70" : "text-white/40 group-active:text-black/70 group-focus-visible:text-black/70"}`}>↗</span>
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
                className={`inline-flex h-[1.35rem] w-[1.35rem] items-center justify-center border font-mono text-[0.72rem] font-medium leading-none tracking-normal antialiased transition-colors ${
                  tab === n.id
                    ? "border-white bg-white text-black"
                    : "border-white/30 text-white/60 group-hover:border-white/70 group-hover:text-white group-focus-visible:border-white/70 group-focus-visible:text-white"
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
          className={`fixed inset-0 z-30 flex animate-in fade-in duration-200 transition-colors ${lightMode ? "bg-white" : "bg-black"}`}
          role="dialog"
          aria-modal="true"
          aria-label={tab}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <section className={`relative flex h-screen w-screen flex-col pt-[clamp(3.5rem,7vh,5.25rem)] transition-colors ${lightMode ? "bg-white" : "bg-[#0a0a0a]"}`}>
            {/* Panel header */}
            <header className={`flex items-center justify-between border-b px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.75rem,1.5vh,1.25rem)] shrink-0 ${lightMode ? "border-black/10" : "border-white/10"}`}>
              <div className="flex items-baseline gap-4">
                <span className={`font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] tracking-[0.32em] uppercase ${lightMode ? "text-black/50" : "text-white/50"}`}>
                  {tab === "life" && "01 / Story"}
                  {tab === "thinking" && "02 / Thoughts"}
                  {tab === "contact" && "03 / Contact"}
                </span>
              </div>
              <button
                onClick={() => setTab(null)}
                aria-label="Close"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${lightMode ? "border-black/20 text-black/70 hover:text-black hover:border-black" : "border-white/20 text-white/70 hover:text-white hover:border-white"}`}
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
                      <h3 className={`font-sans font-medium uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(3rem,6vw,6.5rem)] m-0 ${lightMode ? "text-black" : "text-white"}`}>
                        Get in<br />touch
                      </h3>
                      <div className="flex items-center gap-3 mt-[clamp(1.5rem,3vh,2.5rem)]">
                        <a href="https://www.linkedin.com/in/trinityinvestor/" target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn" className={`inline-flex items-center justify-center w-7 h-7 transition-colors ${lightMode ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white"}`}>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 block">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a href="https://x.com/TrinityInvestor" target="_blank" rel="me noopener noreferrer" aria-label="X" className={`inline-flex items-center justify-center w-7 h-7 transition-colors ${lightMode ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white"}`}>
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
                        className={`w-full bg-transparent border-0 border-b pb-3 font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] tracking-[0.02em] placeholder:uppercase focus:outline-none transition-colors ${lightMode ? "border-black/25 text-black placeholder:text-black/55 focus:border-black" : "border-white/25 text-white placeholder:text-white/55 focus:border-white"}`}
                      />
                    </label>

                    <label className="block">
                      <span className="sr-only">Email</span>
                      <input
                        name="email"
                        type="email"
                        required
                        maxLength={255}
                        autoComplete="email"
                        placeholder="EMAIL"
                        className={`w-full bg-transparent border-0 border-b pb-3 font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] tracking-[0.02em] placeholder:uppercase focus:outline-none transition-colors ${lightMode ? "border-black/25 text-black placeholder:text-black/55 focus:border-black" : "border-white/25 text-white placeholder:text-white/55 focus:border-white"}`}
                      />
                    </label>

                    <label className="flex flex-1 min-h-0 flex-col">
                      <span className="sr-only">Message</span>
                      <textarea
                        name="message"
                        required
                        placeholder="MESSAGE"
                        className={`w-full flex-1 min-h-[10rem] resize-none border p-5 font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] tracking-[0.02em] placeholder:uppercase focus:outline-none transition-colors ${lightMode ? "border-black/20 bg-black/[0.02] text-black placeholder:text-black/55 focus:border-black" : "border-white/20 bg-white/[0.02] text-white placeholder:text-white/55 focus:border-white"}`}
                      />
                    </label>

                    <div className="flex items-center justify-end">
                      {contactSent ? (
                        <span className={`font-sans text-[0.85rem] font-semibold tracking-[0.22em] uppercase ${lightMode ? "text-black/70" : "text-white/70"}`}>Thank you — connect on LinkedIn or X</span>
                      ) : (
                        <button
                          type="submit"
                          className={`rounded-full border px-10 py-3.5 font-sans text-[clamp(1.25rem,1.6vw,1.75rem)] tracking-[0.02em] uppercase transition-colors ${lightMode ? "border-black text-black hover:bg-black hover:text-white" : "border-white text-white hover:bg-white hover:text-black"}`}
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
                <div className="h-full overflow-y-auto -mx-[clamp(1.5rem,3vw,3.5rem)] -my-[clamp(1.25rem,2.4vh,2.25rem)] bg-white text-black">
                  <article className="w-full pb-[clamp(4rem,10vh,8rem)]">
                    {/* Hero — black band, portrait beside a short lede */}
                    <section className="bg-black text-white px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(2.5rem,6vh,5rem)] pb-[clamp(3rem,7vh,6rem)]">
                      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[clamp(1.5rem,3vw,3rem)] items-end">
                        <div className="group relative w-[clamp(9rem,18vw,16rem)] h-[clamp(11rem,22vw,20rem)] overflow-hidden bg-black">
                          <style>{`
                            @keyframes netRotate {
                              0% { transform: rotate(0deg); }
                              100% { transform: rotate(360deg); }
                            }
                            @keyframes netPulse {
                              0%, 100% { opacity: 0.35; }
                              50% { opacity: 1; }
                            }
                            @keyframes nodePulse {
                              0%, 100% { r: 2; opacity: 0.7; }
                              50% { r: 3.4; opacity: 1; }
                            }
                            @keyframes edgeDraw {
                              0% { stroke-dashoffset: 120; opacity: 0.15; }
                              50% { opacity: 0.95; }
                              100% { stroke-dashoffset: 0; opacity: 0.15; }
                            }
                            @keyframes shapeFade {
                              0%, 100% { opacity: 0; }
                              50% { opacity: 0.18; }
                            }
                          `}</style>
                          <img
                            src={portrait}
                            alt={PORTRAIT_ALT}
                            className="block w-full h-full object-cover grayscale transition-opacity duration-500 group-hover:opacity-0"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          >
                            <svg
                              viewBox="0 0 200 200"
                              preserveAspectRatio="xMidYMid slice"
                              className="absolute inset-0 w-full h-full"
                            >
                              {/* Rotating geometric scaffolding */}
                              <g
                                style={{
                                  transformOrigin: "100px 100px",
                                  animation: "netRotate 28s linear infinite",
                                }}
                              >
                                {/* Hexagon */}
                                <polygon
                                  points="100,30 161,65 161,135 100,170 39,135 39,65"
                                  fill="none"
                                  stroke="rgb(180,200,255)"
                                  strokeWidth="0.5"
                                  style={{ animation: "shapeFade 6s ease-in-out infinite" }}
                                />
                                {/* Inner triangle */}
                                <polygon
                                  points="100,55 140,125 60,125"
                                  fill="none"
                                  stroke="rgb(140,220,200)"
                                  strokeWidth="0.5"
                                  style={{ animation: "shapeFade 5s ease-in-out infinite", animationDelay: "1.2s" }}
                                />
                                {/* Inverted triangle */}
                                <polygon
                                  points="100,145 60,75 140,75"
                                  fill="none"
                                  stroke="rgb(220,180,140)"
                                  strokeWidth="0.5"
                                  style={{ animation: "shapeFade 5s ease-in-out infinite", animationDelay: "2.5s" }}
                                />
                                {/* Outer circle */}
                                <circle
                                  cx="100"
                                  cy="100"
                                  r="78"
                                  fill="none"
                                  stroke="rgb(200,200,220)"
                                  strokeWidth="0.3"
                                  strokeDasharray="2 4"
                                />
                              </g>

                              {/* Edges — connecting nodes into shapes */}
                              <g stroke="rgb(170,210,255)" strokeWidth="0.6" fill="none">
                                {[
                                  // Hexagon outer
                                  "M100,30 L161,65", "M161,65 L161,135", "M161,135 L100,170",
                                  "M100,170 L39,135", "M39,135 L39,65", "M39,65 L100,30",
                                  // Spokes to center
                                  "M100,30 L100,100", "M161,65 L100,100", "M161,135 L100,100",
                                  "M100,170 L100,100", "M39,135 L100,100", "M39,65 L100,100",
                                  // Inner cross-links
                                  "M70,80 L130,80", "M70,120 L130,120", "M70,80 L130,120", "M130,80 L70,120",
                                ].map((d, i) => (
                                  <path
                                    key={i}
                                    d={d}
                                    strokeDasharray="120"
                                    style={{
                                      animation: `edgeDraw ${3 + (i % 4) * 0.6}s ease-in-out infinite`,
                                      animationDelay: `${(i * 0.18) % 2.5}s`,
                                    }}
                                  />
                                ))}
                              </g>

                              {/* Nodes */}
                              <g fill="rgb(220,240,255)">
                                {[
                                  [100, 30], [161, 65], [161, 135], [100, 170], [39, 135], [39, 65],
                                  [100, 100], [70, 80], [130, 80], [70, 120], [130, 120],
                                  [100, 55], [100, 145], [60, 100], [140, 100],
                                ].map(([cx, cy], i) => (
                                  <circle
                                    key={i}
                                    cx={cx}
                                    cy={cy}
                                    r="2.4"
                                    style={{
                                      animation: `nodePulse ${2 + (i % 5) * 0.35}s ease-in-out infinite`,
                                      animationDelay: `${(i * 0.17) % 2}s`,
                                    }}
                                  />
                                ))}
                              </g>

                              {/* Center accent */}
                              <circle
                                cx="100"
                                cy="100"
                                r="4"
                                fill="rgb(140,220,200)"
                                style={{ animation: "netPulse 2.4s ease-in-out infinite" }}
                              />
                            </svg>
                          </div>
                        </div>


                        <div className="flex flex-col gap-[clamp(1.25rem,2.4vh,2rem)]">
                          <p className="font-mono text-[clamp(0.7rem,0.8vw,0.85rem)] tracking-[0.28em] uppercase m-0 text-white/55">
                            Bio
                          </p>
                          <h2 className="font-sans font-bold uppercase leading-[0.9] tracking-[-0.04em] m-0 text-white text-[clamp(1.75rem,3.6vw,3.5rem)] max-w-[36rem]">
                            Ilya Paveliev.
                          </h2>
                          <p className="font-sans m-0 max-w-[44rem] text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.65] text-white/80">
                            I have spent fifteen years at the intersection of institutional capital and frontier technology, building and backing the infrastructure that moves both. Today I co-found Hologram Technologies and serve as a founding member of the UOR Foundation.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* By the numbers */}
                    <section className="px-[clamp(1.5rem,5vw,6rem)] mt-[clamp(4rem,8vh,7rem)]">
                      <p className="font-mono text-[clamp(0.7rem,0.8vw,0.85rem)] tracking-[0.28em] uppercase m-0 mb-[clamp(1.5rem,3vh,2.25rem)] text-black/55">
                        By the numbers
                      </p>
                      <dl className="grid grid-cols-2 md:grid-cols-3 gap-y-[clamp(2rem,4vh,3rem)] gap-x-[clamp(1.5rem,3vw,3rem)] m-0 border-t-2 border-black pt-[clamp(2rem,4vh,3rem)]">
                        {storyStats.map((s) => (
                          <div key={s.label}>
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="font-sans text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.04em] m-0 leading-none text-black">
                              {s.value}
                            </dd>
                            <p className="text-[clamp(0.7rem,0.8vw,0.85rem)] tracking-[0.28em] uppercase m-0 mt-[clamp(0.75rem,1.2vh,1rem)] text-black/60">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </dl>
                    </section>

                    {/* Chapters */}
                    <section className="px-[clamp(1.5rem,5vw,6rem)] mt-[clamp(4rem,8vh,7rem)]">
                      <p className="font-mono text-[clamp(0.7rem,0.8vw,0.85rem)] tracking-[0.28em] uppercase m-0 mb-[clamp(1.5rem,3vh,2.25rem)] text-black/55">
                        The backstory
                      </p>
                      <ol className="list-none p-0 m-0">
                        {storyChapters.map((c, i) => (
                          <li
                            key={c.org}
                            className={`border-t border-black/20 py-[clamp(2rem,4vh,3.5rem)] grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-[clamp(1rem,2vw,2.5rem)] ${i === storyChapters.length - 1 ? "border-b border-black/20" : ""}`}
                          >
                            <p className="font-mono text-[clamp(0.75rem,0.85vw,0.9rem)] tracking-[0.18em] uppercase m-0 text-black/50 pt-[clamp(0.2rem,0.5vh,0.4rem)]">
                              {c.years}
                            </p>
                            <div className="flex flex-col gap-[clamp(1rem,1.8vh,1.5rem)]">
                              <div className="flex flex-col md:flex-row gap-[clamp(1.25rem,2.4vh,2rem)]">
                                <div className="shrink-0">
                                  <div className="group relative overflow-hidden rounded-[2px] bg-muted w-[clamp(14rem,20vw,22rem)] ring-1 ring-foreground/10 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_18px_40px_-12px_rgba(0,0,0,0.6)] dark:ring-foreground/15">
                                    <img
                                      src={c.image}
                                      alt={`${c.org} — ${c.subtitle}`}
                                      loading="lazy"
                                      width={500}
                                      height={309}
                                      className="block w-full h-auto aspect-[1.618/1] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:brightness-[0.92] dark:contrast-[1.02]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5 mix-blend-overlay" />
                                  </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className="font-sans font-bold uppercase leading-[0.95] tracking-[-0.03em] m-0 text-black text-[clamp(1.4rem,2.6vw,2.4rem)]">
                                    {c.org}
                                  </h4>
                                  <p className="font-sans text-[clamp(0.72rem,0.82vw,0.88rem)] tracking-[0.22em] uppercase m-0 mt-[clamp(0.5rem,0.8vh,0.7rem)] text-black/55">
                                    {c.subtitle}
                                  </p>
                                  <p className="font-sans m-0 mt-[clamp(0.75rem,1.4vh,1.1rem)] max-w-[48rem] text-[clamp(0.95rem,1.05vw,1.15rem)] leading-[1.7] text-black/85">
                                    {c.body}
                                  </p>
                                  {c.href && (
                                    <a
                                      href={c.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-[0.5em] mt-[clamp(0.75rem,1.4vh,1.1rem)] font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] tracking-[0.22em] uppercase text-black border-b border-black/30 hover:border-black pb-[0.2em] transition-colors no-underline"
                                    >
                                      Visit
                                      <span aria-hidden>↗</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </article>
                </div>
              )}

            </div>
          </section>
        </div>
      )}
    </main>
  );
}
