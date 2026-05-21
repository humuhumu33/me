import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import atmosphere from "@/assets/lattice.jpg";
import portrait from "@/assets/ilya-portrait.png";

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
    <main className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col">
      {/* FULL-WIDTH BANNER — golden ratio height 23.6vh */}
      <div className="relative w-full shrink-0 overflow-hidden" style={{ height: "23.6vh" }}>
        <img
          src={atmosphere}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/80" />
        <div className="absolute inset-0 flex items-start justify-between px-[3.82vw] pt-[2.36vh]">
          <div className="flex items-center gap-3 text-[0.62rem] tracking-aman uppercase text-white/95 mix-blend-difference">
            <span className="inline-block h-px w-8 bg-white/80" />
            Ilya Paveliev · MMXXVI
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className="text-[0.62rem] tracking-aman uppercase text-white/95 hover:text-white mix-blend-difference"
            aria-label="Toggle theme"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* CONTENT — fills remaining 76.4vh */}
      <div
        className="grid flex-1 min-h-0 w-full"
        style={{ gridTemplateColumns: "38.2fr 61.8fr" }}
      >
        {/* LEFT — identity, portrait overlaps banner */}
        <section className="relative flex h-full min-h-0 flex-col border-r border-border px-[3.82vw] pb-[3.2vh]">
          <div className="relative flex">
            <img
              src={portrait}
              alt="Portrait of Ilya Paveliev"
              width={400}
              height={400}
              className="-mt-[7vh] h-[14vh] w-[14vh] min-h-[88px] min-w-[88px] max-h-[150px] max-w-[150px] object-cover object-top rounded-full border-4 border-background shadow-[0_12px_44px_-24px_rgba(0,0,0,0.55)]"
            />
          </div>

          <div className="mt-[2.4vh]">
            <p className="text-[0.6rem] tracking-aman uppercase text-muted-foreground mb-3">
              Co-founder · Investor
            </p>
            <h1 className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[0.98] tracking-tight">
              <span aria-hidden="true">
                Ilya <span className="italic text-accent">Paveliev</span>
              </span>
              <span className="sr-only">Ilya Paveliev — Deep Tech Founder & Investor</span>
            </h1>
            <div className="mt-4 h-px w-[38.2%] bg-border" />
            <p className="mt-4 max-w-[34ch] text-[0.82rem] leading-relaxed text-muted-foreground">
              Building software-defined compute for local AI. Investing across
              deep tech, AI and real-world assets.
            </p>
          </div>

          <footer className="mt-auto flex flex-col gap-2 text-[0.6rem] tracking-aman uppercase text-muted-foreground">
            <a href="mailto:ilya@uor.foundation" className="hover:text-foreground transition-colors">
              ilya@uor.foundation
            </a>
            <div className="flex items-center gap-[1.46vw]">
              <a
                href="https://www.linkedin.com/in/trinityinvestor/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/TrinityInvestor"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                X
              </a>
              <span className="text-muted-foreground/70">+44 746 388 1239</span>
            </div>
          </footer>
        </section>

        {/* RIGHT — content */}
        <section className="relative flex h-full min-h-0 flex-col bg-surface">
          <header className="flex items-center justify-between border-b border-border px-[2.36vw]" style={{ height: "6.2vh" }}>
            <nav className="flex items-center gap-[2.36vw] text-[0.62rem] tracking-aman uppercase">
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
                    <span className="absolute -bottom-px left-0 h-px w-full bg-accent" />
                  )}
                </button>
              ))}
            </nav>
            <span className="text-[0.58rem] tracking-aman uppercase text-muted-foreground">
              {tab === "experience" && `${experience.length} roles`}
              {tab === "thinking" && `${thinking.length} pieces`}
              {tab === "life" && "Notes"}
            </span>
          </header>

          <div className="flex flex-1 min-h-0 flex-col px-[3.2vw] py-[2.8vh]">
            <h2 className="font-display italic text-[clamp(1.2rem,1.8vw,1.7rem)] text-foreground/90 mb-[1.8vh]">
              {tab === "experience" && "Selected experience"}
              {tab === "thinking" && "Writing & talks"}
              {tab === "life" && "Beyond the desk"}
            </h2>

            <div className="flex-1 min-h-0 overflow-hidden">
              {tab === "experience" && (
                <ul className="divide-y divide-border">
                  {experience.map((e) => (
                    <li key={e.org} className="grid grid-cols-[1fr_auto] gap-6 py-[1.1vh]">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-[1.05rem] leading-tight text-foreground">
                            {e.org}
                          </span>
                          <span className="text-[0.58rem] tracking-aman uppercase text-accent">
                            {e.role}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[0.78rem] text-muted-foreground truncate">{e.note}</p>
                      </div>
                      <span className="self-center font-display text-[0.82rem] text-muted-foreground tabular-nums">
                        {e.years}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "thinking" && (
                <ul className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.1vw] auto-rows-fr">
                  {thinking.map((p) => (
                    <li key={p.title} className="min-h-0">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex h-full flex-col overflow-hidden border border-border bg-background/40 transition-all hover:border-accent/60 hover:-translate-y-0.5"
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{ aspectRatio: "1.618 / 1", background: p.gradient }}
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                          <div className="absolute inset-0 flex items-end justify-between p-2.5">
                            <span className="text-[0.55rem] tracking-aman uppercase text-white/85">
                              {p.kind}
                            </span>
                            <span className="font-display italic text-white/90 text-xs">
                              {p.venue}
                            </span>
                          </div>
                          <span className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/85 text-foreground text-[0.7rem] transition-transform group-hover:rotate-[-12deg]">
                            ↗
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-[0.9vw]">
                          <p className="font-display text-[0.95rem] leading-snug text-foreground line-clamp-2">
                            {p.title}
                          </p>
                          <div className="mt-1.5 text-[0.55rem] tracking-aman uppercase text-muted-foreground">
                            {p.date}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "life" && (
                <ul className="space-y-[1.8vh]">
                  {life.map((l, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-display italic text-accent text-base leading-none pt-1 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-[1.05rem] leading-snug text-foreground/90 max-w-[58ch]">
                        {l}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-auto pt-[1.4vh] flex items-center justify-between text-[0.58rem] tracking-aman uppercase text-muted-foreground/80">
              <span>φ · golden ratio</span>
              <span className="font-display italic normal-case tracking-normal">MMXXVI</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
