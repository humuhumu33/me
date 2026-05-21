import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import banner from "@/assets/banner.jpeg";
import portrait from "@/assets/portrait.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ilya Paveliev — Deep Tech Founder & Investor" },
      {
        name: "description",
        content:
          "Ilya Paveliev — Co-founder of Hologram Technologies, Founding Partner of Arete Capital. Deep tech, AI and venture investing.",
      },
      { property: "og:title", content: "Ilya Paveliev — Deep Tech Founder & Investor" },
      {
        property: "og:description",
        content: "Co-founder, Hologram Technologies. Founding Partner, Arete Capital.",
      },
      { property: "og:url", content: "https://harmony-scroll-free.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://harmony-scroll-free.lovable.app/" },
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
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ilya Paveliev",
          jobTitle: "Deep Tech Founder & Investor",
          url: "https://harmony-scroll-free.lovable.app/",
          worksFor: [
            { "@type": "Organization", name: "Hologram Technologies" },
            { "@type": "Organization", name: "Arete Capital" },
          ],
          alumniOf: { "@type": "CollegeOrUniversity", name: "Trinity College Dublin" },
        }),
      },
    ],
  }),
  component: Index,
});

type Tab = "experience" | "thinking" | "life";

const experience = [
  { role: "Co-founder", org: "Hologram Technologies", note: "Software-defined compute for local AI inference.", years: "2025 —" },
  { role: "Founding Member", org: "UOR Foundation", note: "Content-addressed open data standard. 150+ contributors.", years: "2025 —" },
  { role: "General Partner", org: "Arete Capital", note: "$20m hybrid venture fund. Backed by a16z principals.", years: "2023 — 25" },
  { role: "Director", org: "Haruko", note: "Institutional risk & portfolio management. Series A.", years: "2022 — 24" },
  { role: "Lead Portfolio Manager", org: "OX1", note: "$30m market-neutral digital asset fund.", years: "2022" },
  { role: "Portfolio Manager", org: "Adrian Lee & Partners", note: "$20bn active currency overlay for US pensions.", years: "2013 — 21" },
  { role: "Analyst", org: "Perella Weinberg Partners", note: "M&A, energy sector. London founding team.", years: "2010 — 13" },
];

const thinking = [
  {
    title: "Hologram: From Indexing Content to Indexing Meaning",
    venue: "SingularityNet",
    date: "May 2026",
    kind: "Talk",
    url: "https://singularitynet.io/",
    gradient: "linear-gradient(135deg, oklch(0.42 0.09 65), oklch(0.78 0.10 75))",
  },
  {
    title: "The Next Revolution is Geometric Computation",
    venue: "Quantum",
    date: "Jan 2026",
    kind: "Essay",
    url: "https://quantum-journal.org/",
    gradient: "linear-gradient(135deg, oklch(0.30 0.04 240), oklch(0.62 0.08 220))",
  },
  {
    title: "Insights on Web3, AI, and Crypto Trends",
    venue: "AltFunds",
    date: "Jun 2025",
    kind: "Interview",
    url: "https://altfundsglobal.com/",
    gradient: "linear-gradient(135deg, oklch(0.36 0.05 30), oklch(0.74 0.09 55))",
  },
  {
    title: "The Real-World Asset Thesis",
    venue: "Arete Capital",
    date: "Jan 2024",
    kind: "Memo",
    url: "https://arete.capital/",
    gradient: "linear-gradient(135deg, oklch(0.32 0.02 80), oklch(0.70 0.07 80))",
  },
  {
    title: "Liquidity Drought Ahead",
    venue: "OX1",
    date: "Oct 2023",
    kind: "Note",
    url: "#",
    gradient: "linear-gradient(135deg, oklch(0.26 0.02 60), oklch(0.55 0.04 60))",
  },
];


const life = [
  "Scholarship in economics, Trinity College Dublin — graduated with gold medal.",
  "Sailed 10,000+ offshore miles across Ireland, the Caribbean, the US and Dubai.",
  "Builds drones, helicopters, robots, computers, software and wearables.",
  "Father to two wonderful daughters.",
];

function Index() {
  const [tab, setTab] = useState<Tab>("experience");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefers);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Golden ratio split: 38.2% / 61.8% */}
      <div className="grid h-full w-full" style={{ gridTemplateColumns: "38.2fr 61.8fr", gridTemplateRows: "100%" }}>
        {/* LEFT — enclosed panel: banner image + circular portrait + name */}
        <section className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-panel text-panel-foreground">
          {/* Banner (top ~38.2%) */}
          <div className="relative h-[38.2%] w-full shrink-0 overflow-hidden">
            <img
              src={banner}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-panel" />
            <div className="absolute top-[3.82vh] left-[3.82vw] flex items-center gap-3 text-[0.65rem] tracking-aman uppercase text-white/85">
              <span className="inline-block h-px w-8 bg-accent" />
              IP · MMXXVI
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex min-h-0 flex-1 flex-col overflow-visible">
            {/* Circular portrait — diameter = 38.2% of left column (14.6vw), overlaps banner by half */}
            <div className="relative flex shrink-0 justify-start px-[3.82vw]">
              <div className="relative -mt-[7.3vw] h-[14.6vw] w-[14.6vw] rounded-full overflow-hidden ring-1 ring-accent/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
                <img
                  src={portrait}
                  alt="Ilya Paveliev"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute left-[calc(3.82vw+14.6vw-0.5rem)] bottom-[-0.25rem] h-2 w-2 rounded-full bg-accent" />
            </div>

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
                <span className="sr-only">Ilya Paveliev — Deep Tech Founder & Investor</span>
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
                <a href="mailto:ilya@uor.foundation" className="hover:text-panel-foreground transition-colors">
                  ilya@uor.foundation
                </a>
                <a
                  href="https://www.linkedin.com/in/trinityinvestor/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-panel-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/TrinityInvestor"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-panel-foreground transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* RIGHT — content */}
        <section className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-surface">
          {/* Top bar — golden ratio height ≈ 9.7vh */}
          <header
            className="flex items-center justify-between border-b border-border px-[2.36vw]"
            style={{ height: "9.7vh" }}
          >
            <nav className="flex items-center gap-[2.36vw] text-[0.68rem] tracking-aman uppercase">
              {(["experience", "thinking", "life"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
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
              className="text-[0.68rem] tracking-aman uppercase text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </header>

          {/* Body — fills remaining 90.3vh */}
          <div className="flex flex-1 min-h-0 flex-col px-[3.82vw] py-[3.82vh]">
            <div className="flex items-baseline justify-between mb-[2.36vh]">
              <h2 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] tracking-[0.02em] text-foreground/90 font-light">
                {tab === "experience" && "Selected experience"}
                {tab === "thinking" && "Writing & talks"}
                {tab === "life" && "Beyond the desk"}
              </h2>

              <span className="text-[0.65rem] tracking-aman uppercase text-muted-foreground">
                {tab === "experience" && `${experience.length} roles`}
                {tab === "thinking" && `${thinking.length} pieces`}
                {tab === "life" && "Notes"}
              </span>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              {tab === "experience" && (
                <ul className="divide-y divide-border">
                  {experience.map((e) => (
                    <li key={e.org} className="grid grid-cols-[1fr_auto] gap-6 py-[1.46vh]">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-[1.25rem] leading-tight text-foreground">
                            {e.org}
                          </span>
                          <span className="text-[0.62rem] tracking-aman uppercase text-muted-foreground">
                            {e.role}
                          </span>

                        </div>
                        <p className="mt-1 text-sm text-muted-foreground truncate">{e.note}</p>
                      </div>
                      <span className="self-center font-display text-sm text-muted-foreground tabular-nums">
                        {e.years}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "thinking" && (
                <ul className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.46vw] auto-rows-fr">
                  {thinking.map((p) => (
                    <li key={p.title} className="min-h-0">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex h-full flex-col overflow-hidden border border-border bg-background/40 transition-all hover:border-accent/60 hover:-translate-y-0.5"
                      >
                        {/* Preview thumbnail — golden ratio aspect (1 : 0.618) */}
                        <div
                          className="relative w-full overflow-hidden"
                          style={{ aspectRatio: "1.618 / 1", background: p.gradient }}
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                          <div className="absolute inset-0 flex items-end justify-between p-3">
                            <span className="text-[0.6rem] tracking-aman uppercase text-white/85">
                              {p.kind}
                            </span>
                            <span className="font-display text-white/90 text-sm tracking-[0.02em]">
                              {p.venue}
                            </span>

                          </div>
                          <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/85 text-foreground text-xs transition-transform group-hover:rotate-[-12deg]">
                            ↗
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-[1.1vw]">
                          <p className="font-display text-[1.05rem] leading-snug text-foreground line-clamp-2">
                            {p.title}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[0.62rem] tracking-aman uppercase text-muted-foreground">
                            <span>{p.date}</span>
                            <span className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
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
                <ul className="space-y-[2.4vh]">
                  {life.map((l, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-sans text-[0.62rem] tracking-aman uppercase text-muted-foreground pt-2 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <p className="font-display text-[1.25rem] leading-snug text-foreground/90 max-w-[58ch]">
                        {l}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
