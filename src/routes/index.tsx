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
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/` },
  image: `${SITE_URL}${PORTRAIT_PATH}`,
  email: `mailto:${person.email}`,
  contactPoint: {
    "@type": "ContactPoint",
    email: person.email,
    contactType: "Professional Inquiries",
    availableLanguage: ["English"],
  },
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
      { type: "application/ld+json", children: JSON.stringify(personSchema) },
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
      { type: "application/ld+json", children: JSON.stringify(profilePageSchema) },
      { type: "application/ld+json", children: JSON.stringify(publicationsSchema) },
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
  const [tab, setTab] = useState<Tab | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);


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
    { id: "experience", label: "Experience" },
    { id: "thinking", label: "Feed" },
    { id: "life", label: "Bio" },
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
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
        <a itemProp="email" rel="me" href={`mailto:${person.email}`}>{person.email}</a>
        <a itemProp="sameAs" rel="me" href="https://www.linkedin.com/in/trinityinvestor/">LinkedIn</a>
        <a itemProp="sameAs" rel="me" href="https://x.com/TrinityInvestor">X</a>
      </div>

      {/* Pure dark background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,255,255,0.04),transparent_55%)]" />
      </div>


      {/* Top nav */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[clamp(1.25rem,3vw,3rem)] py-[clamp(1rem,2vh,1.75rem)]">
        <a href="/" className="font-sans text-[clamp(0.78rem,0.92vw,0.98rem)] font-medium tracking-[0.24em] uppercase text-white">
          Ilya<span className="opacity-60">_</span>Paveliev
        </a>
        {/* Desktop nav */}
        <nav aria-label="Sections" className="hidden md:flex items-center gap-[clamp(2rem,3.6vw,4rem)]">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              aria-current={tab === n.id ? "page" : undefined}
              className="group relative font-sans text-[clamp(0.72rem,0.82vw,0.86rem)] font-medium tracking-[0.24em] uppercase text-white/85 hover:text-white transition-colors"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="md:hidden flex items-center gap-2.5 font-sans text-[0.7rem] font-medium tracking-[0.28em] uppercase text-white"
        >
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className="block h-px w-5 bg-white" />
            <span className="block h-px w-5 bg-white" />
          </span>
          Menu
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col bg-black animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between px-6 py-[1.25rem]">
            <span className="font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase text-white">
              Ilya<span className="opacity-50">_</span>Paveliev
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex items-center gap-2.5 font-sans text-[0.72rem] font-medium tracking-[0.28em] uppercase text-white"
            >
              Close
              <span aria-hidden="true" className="text-lg leading-none">×</span>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Sections">
            {navItems.map((n, i) => (
              <button
                key={n.id}
                onClick={() => { setMenuOpen(false); setTab(n.id); }}
                className="group flex items-baseline gap-4 py-3 text-left"
              >
                <span className="font-sans text-[0.65rem] tracking-[0.32em] uppercase text-white/40 w-8">
                  0{i + 1}
                </span>
                <span className="font-sans text-[14vw] font-semibold leading-[0.95] tracking-tight uppercase text-white">
                  {n.label}
                </span>
              </button>
            ))}
          </nav>
          <div className="border-t border-white/10 px-6 py-5 flex items-center justify-between text-[0.65rem] tracking-[0.28em] uppercase text-white/55">
            <a href={`mailto:${person.email}`} className="hover:text-white transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/trinityinvestor/" target="_blank" rel="me noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/TrinityInvestor" target="_blank" rel="me noopener noreferrer" className="hover:text-white transition-colors">X</a>
          </div>
        </div>
      )}


      {/* Bottom-left headline */}
      <div className="absolute bottom-0 left-0 z-10 max-w-[min(94vw,72rem)] px-[clamp(1.25rem,3vw,3rem)] pb-[clamp(2rem,5.5vh,3.5rem)]">
        <h1 className="font-sans text-[clamp(2.6rem,8.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.025em] uppercase text-white">
          <span itemProp="name" className="sr-only">Ilya Paveliev — </span>
          Building the future
          <br />
          of local AI.
          <span className="sr-only"> Co-founder & Investor in Deep Tech and AI.</span>
        </h1>
      </div>

      {/* Bottom-right meta */}
      <div className="absolute bottom-0 right-0 z-10 hidden md:flex flex-col items-end gap-2 px-[clamp(1.5rem,3.82vw,4rem)] pb-[clamp(2rem,6vh,4.5rem)] text-[0.7rem] tracking-[0.28em] uppercase text-white/55">
        <a href={`mailto:${person.email}`} className="hover:text-white transition-colors">{person.email}</a>
        <div className="flex gap-5">
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
          <section className="relative m-auto flex h-[min(92vh,56rem)] w-[min(94vw,90rem)] flex-col border border-white/10 bg-[#0a0a0a]/95 shadow-2xl">
            {/* Panel header */}
            <header className="flex items-center justify-between border-b border-white/10 px-[clamp(1.5rem,2.6vw,3rem)] py-[clamp(1rem,1.8vh,1.6rem)]">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[0.7rem] tracking-[0.32em] uppercase text-white/50">
                  {tab === "experience" && "01 / Experience"}
                  {tab === "thinking" && "02 / Feed"}
                  {tab === "life" && "03 / Bio"}
                </span>
                <h2 className="font-sans text-[clamp(1.1rem,1.4vw,1.6rem)] font-medium tracking-[-0.01em] uppercase text-white">
                  {tab === "experience" && "Selected work"}
                  {tab === "thinking" && "Writing & talks"}
                  {tab === "life" && "Beyond the desk"}
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
              {tab === "experience" && (
                <ol className="divide-y divide-white/10 list-none p-0 m-0">
                  {experience.map((e) => (
                    <li
                      key={e.org}
                      className="grid grid-cols-[1fr_auto] gap-6 py-4"
                      itemScope
                      itemType="https://schema.org/OrganizationRole"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3
                            className="font-sans text-[clamp(1rem,1.15vw,1.25rem)] font-medium tracking-tight text-white m-0"
                            itemScope
                            itemType="https://schema.org/Organization"
                            itemProp="worksFor"
                          >
                            {e.orgUrl ? (
                              <a href={e.orgUrl} target="_blank" rel="noopener noreferrer" itemProp="url" className="hover:text-white/70 transition-colors">
                                <span itemProp="name">{e.org}</span>
                              </a>
                            ) : (
                              <span itemProp="name">{e.org}</span>
                            )}
                          </h3>
                          <span className="text-[0.65rem] tracking-[0.28em] uppercase text-white/50" itemProp="roleName">
                            {e.role}
                          </span>
                        </div>
                        <p className="mt-1 text-[0.88rem] leading-snug text-white/60 truncate">{e.note}</p>
                      </div>
                      <span className="self-center font-sans text-[0.78rem] text-white/55 tabular-nums">
                        <YearsTime entry={e} />
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              {tab === "thinking" && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
                  {thinking.map((p) => (
                    <li key={p.title} itemScope itemType="https://schema.org/CreativeWork">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        itemProp="url"
                        className="group relative flex flex-col overflow-hidden border border-white/10 bg-white/[0.02] transition-all hover:border-white/40 hover:-translate-y-0.5"
                      >
                        <div className="relative h-28 w-full overflow-hidden" style={{ background: p.gradient }}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                          <div className="absolute inset-0 flex items-end justify-between gap-3 p-3 pr-12">
                            <span className="text-[0.6rem] tracking-[0.28em] uppercase text-white/85" itemProp="genre">{p.kind}</span>
                            <span className="font-sans text-white/90 text-sm tracking-tight truncate" itemProp="publisher">{p.venue}</span>
                          </div>
                          <span aria-hidden="true" className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white text-xs transition-transform group-hover:rotate-[-12deg]">↗</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <h3 className="font-sans text-[0.98rem] font-medium leading-snug text-white line-clamp-2 m-0" itemProp="name">{p.title}</h3>
                          <p className="mt-2 text-[0.62rem] tracking-[0.28em] uppercase text-white/45">
                            <time dateTime={p.dateISO} itemProp="datePublished">{p.date}</time>
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "life" && (
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
                  <div className="relative h-40 w-40 lg:h-56 lg:w-56 shrink-0 overflow-hidden rounded-full border border-white/15">
                    <img src={portrait} alt={PORTRAIT_ALT} className="h-full w-full object-cover" />
                  </div>
                  <ol className="space-y-4 list-none p-0 m-0">
                    {life.map((l, i) => (
                      <li key={i} className="flex gap-5">
                        <span aria-hidden="true" className="font-sans text-[0.62rem] tracking-[0.28em] uppercase text-white/40 pt-2 w-8 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="font-sans text-[clamp(1rem,1.15vw,1.2rem)] leading-snug text-white/85 max-w-[62ch] m-0">
                          {l}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
