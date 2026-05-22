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

  useEffect(() => {
    if (tab !== "contact") setContactSent(false);
  }, [tab]);


  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setTab(null); setMenuOpen(false); }

    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems: { id: Tab; label: string }[] = [
    { id: "life", label: "BIO" },
    { id: "thinking", label: "FEED" },
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
      <div className="relative z-10 md:hidden flex flex-col min-h-svh">
        {/* Mobile header */}
        <header className="flex items-center justify-between px-5 pt-5 pb-3">
          <a href="/" className="font-sans text-[0.95rem] font-semibold tracking-[0.18em] uppercase text-white">
            Ilya<span className="opacity-60">_</span>Paveliev
          </a>
          <span className="font-sans text-[0.6rem] font-medium tracking-[0.32em] uppercase text-white/55">
            Co-founder · Investor
          </span>
        </header>

        {/* Big stacked section nav — fills mid screen */}
        <nav aria-label="Sections" className="flex flex-1 flex-col justify-center border-y border-white/10 divide-y divide-white/10">
          {navItems.map((n, i) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className="group relative flex items-baseline justify-between gap-4 px-5 py-[clamp(1.25rem,3.2vh,2.25rem)] text-left transition-colors active:bg-white active:text-black"
            >
              <span className="font-sans text-[0.6rem] tracking-[0.32em] uppercase text-white/40 group-active:text-black/60">
                0{i + 1}
              </span>
              <span className="flex-1 font-sans text-[clamp(2.6rem,13vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] uppercase text-white group-active:text-black">
                {n.label}
              </span>
              <span aria-hidden="true" className="font-sans text-[1.5rem] leading-none text-white/40 group-active:text-black/70">↗</span>
            </button>
          ))}
        </nav>

        {/* Headline */}
        <div className="px-5 pt-[clamp(1.25rem,3vh,2rem)]">
          <h1 className="font-sans text-[clamp(2.4rem,10.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.035em] uppercase text-white">
            <span itemProp="name" className="sr-only">Ilya Paveliev — </span>
            Building the future of sovereign AI.
            <span className="sr-only"> Co-founder & Investor in Deep Tech and AI.</span>
          </h1>
        </div>

        {/* Social row */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 px-5 py-4 font-sans text-[0.65rem] font-medium tracking-[0.32em] uppercase text-white/60">
          <a href="https://www.linkedin.com/in/trinityinvestor/" target="_blank" rel="me noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <span aria-hidden="true" className="text-white/25">/</span>
          <a href="https://x.com/TrinityInvestor" target="_blank" rel="me noopener noreferrer" className="hover:text-white transition-colors">X · Twitter</a>
        </div>
      </div>

      {/* =================== DESKTOP LAYOUT =================== */}
      {/* Top nav */}
      <header className="hidden md:flex absolute inset-x-0 top-0 z-20 items-center justify-between px-[clamp(1.25rem,3vw,3rem)] py-[clamp(1rem,2vh,1.75rem)]">
        <a href="/" className="font-sans text-[clamp(1.35rem,1.9vw,2rem)] font-semibold tracking-[0.18em] uppercase text-white">
          Ilya<span className="opacity-60">_</span>Paveliev
        </a>
        <nav aria-label="Sections" className="flex items-center gap-[clamp(2.5rem,4.5vw,5rem)]">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              aria-current={tab === n.id ? "page" : undefined}
              className="group relative font-sans text-[clamp(1.35rem,1.9vw,2rem)] font-semibold tracking-[0.2em] uppercase text-white/90 hover:text-white transition-colors"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
      </header>

      {/* Bottom-left headline */}
      <div className="hidden md:block absolute bottom-0 left-0 z-10 max-w-[min(94vw,72rem)] px-[clamp(1.25rem,3vw,3rem)] pb-[clamp(2rem,5.5vh,3.5rem)]">
        <h1 className="font-sans text-[clamp(3.2rem,11vw,9rem)] font-semibold leading-[0.92] tracking-[-0.035em] uppercase text-white">
          BUILDING THE
          <br />
          FUTURE OF
          <br />
          SOVEREIGN AI.
        </h1>
      </div>

      {/* Bottom-right meta (desktop) */}
      <div className="absolute bottom-0 right-0 z-10 hidden md:flex flex-col items-end gap-3 px-[clamp(1.25rem,3vw,3rem)] pb-[clamp(2rem,5.5vh,3.5rem)] font-sans text-[clamp(1.35rem,1.9vw,2rem)] font-semibold tracking-[0.2em] uppercase text-white/70">
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/trinityinvestor/" target="_blank" rel="me noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://x.com/TrinityInvestor" target="_blank" rel="me noopener noreferrer" className="hover:text-white transition-colors">X</a>
        </div>
      </div>




      {/* Overlay panel — opens for Experience / Feed / Bio */}
      {tab && (
        <div
          className="absolute inset-0 z-30 flex bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={tab}
          onClick={(e) => { if (e.target === e.currentTarget) setTab(null); }}
        >
          <section className="relative m-auto flex h-[min(94vh,56rem)] w-[min(96vw,90rem)] flex-col border border-white/10 bg-[#0a0a0a]/95 shadow-2xl">
            {/* Panel header */}
            <header className="flex items-center justify-between border-b border-white/10 px-[clamp(1.5rem,2.6vw,3rem)] py-[clamp(1rem,1.8vh,1.6rem)]">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[0.7rem] tracking-[0.32em] uppercase text-white/50">
                  {tab === "life" && "01 / Bio"}
                  {tab === "thinking" && "02 / Feed"}
                  {tab === "contact" && "03 / Contact"}
                </span>
                <h2 className="font-sans text-[clamp(1.1rem,1.4vw,1.6rem)] font-medium tracking-[-0.01em] uppercase text-white">
                  {tab === "life" && "MY STORY"}
                  {tab === "thinking" && "Writing & talks"}
                  {tab === "contact" && "Get in touch"}
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
            <div className="flex-1 min-h-0 overflow-y-auto px-[clamp(1.5rem,2.6vw,3rem)] py-[clamp(1.25rem,2.4vh,2rem)]">
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
                      <p className="mt-[clamp(1.5rem,3vh,2.5rem)] max-w-[36ch] font-sans text-[clamp(1rem,1.15vw,1.25rem)] leading-relaxed text-white/70">
                        If anything here resonates, I'd love to connect.
                      </p>
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

                    <fieldset className="border-0 p-0 m-0">
                      <legend className="sr-only">Topic</legend>
                      <div className="flex flex-wrap gap-3">
                        {["Press inquiry", "Speaking engagement", "Investment opportunity", "Partnership", "Other"].map((t, i) => (
                          <label key={t} className="cursor-pointer">
                            <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="peer sr-only" />
                            <span className="inline-block rounded-full border border-white/25 px-5 py-2.5 font-sans text-[0.8rem] font-medium tracking-[0.18em] uppercase text-white/70 transition-colors hover:border-white/60 hover:text-white peer-checked:border-white peer-checked:bg-white peer-checked:text-black">
                              {t}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

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

              {tab === "thinking" && (() => {
                const [featured, ...rest] = thinking;
                const FeedCard = ({ p, large }: { p: typeof thinking[number]; large?: boolean }) => (
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
                return (
                  <ul className="grid h-full grid-cols-1 lg:grid-cols-2 gap-[clamp(0.75rem,1.2vw,1.25rem)] list-none p-0 m-0">
                    <FeedCard p={featured} large />
                    <li className="contents">
                      <ul className="grid h-full grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-[clamp(0.75rem,1.2vw,1.25rem)] list-none p-0 m-0">
                        {rest.map((p) => <FeedCard key={p.title} p={p} />)}
                      </ul>
                    </li>
                  </ul>
                );
              })()}

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
