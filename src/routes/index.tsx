import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import atmosphere from "@/assets/atmosphere.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ilya Paveliev — Deep Tech Founder & Investor" },
      {
        name: "description",
        content:
          "Ilya Paveliev — Co-founder of Hologram Technologies, Founding Partner of Arete Capital. Deep tech, AI and venture investing.",
      },
      { property: "og:title", content: "Ilya Paveliev" },
      {
        property: "og:description",
        content: "Co-founder, Hologram Technologies. Founding Partner, Arete Capital.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap",
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
      <div className="grid h-full w-full" style={{ gridTemplateColumns: "38.2fr 61.8fr" }}>
        {/* LEFT — image + name */}
        <section className="relative h-full overflow-hidden">
          <img
            src={atmosphere}
            alt=""
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-90 dark:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/0 to-background/80 dark:from-background/30 dark:to-background/90" />
          <div className="relative flex h-full flex-col justify-between p-[3.82vw]">
            <div className="flex items-center gap-3 text-[0.7rem] tracking-aman uppercase text-foreground/80">
              <span className="inline-block h-px w-8 bg-accent" />
              IP · MMXXVI
            </div>

            <div>
              <p className="text-[0.7rem] tracking-aman uppercase text-foreground/70 mb-4">
                Co-founder · Investor
              </p>
              <h1 className="font-display text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.95] tracking-tight">
                Ilya
                <br />
                <span className="italic text-accent">Paveliev</span>
              </h1>
              <div className="mt-6 h-px w-[38.2%] bg-foreground/30" />
              <p className="mt-6 max-w-[28ch] text-sm leading-relaxed text-foreground/80">
                Building software-defined compute for local AI. Investing across
                deep tech, AI and real-world assets.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT — content */}
        <section className="relative flex h-full flex-col bg-surface">
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
                    <span className="absolute -bottom-px left-0 h-px w-full bg-accent" />
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
              <h2 className="font-display italic text-[clamp(1.5rem,2.2vw,2.1rem)] text-foreground/90">
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
                          <span className="text-[0.68rem] tracking-aman uppercase text-accent">
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
                <ul className="divide-y divide-border">
                  {thinking.map((p) => (
                    <li key={p.title} className="grid grid-cols-[1fr_auto] gap-6 py-[2vh]">
                      <div>
                        <p className="font-display text-[1.25rem] leading-snug text-foreground">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[0.7rem] tracking-aman uppercase text-muted-foreground">
                          {p.venue}
                        </p>
                      </div>
                      <span className="self-center font-display text-sm text-muted-foreground">
                        {p.date}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "life" && (
                <ul className="space-y-[2.4vh]">
                  {life.map((l, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-display italic text-accent text-lg leading-none pt-1">
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

            {/* Footer / contact */}
            <footer className="mt-auto pt-[2.36vh] border-t border-border flex items-center justify-between text-[0.68rem] tracking-aman uppercase text-muted-foreground">
              <div className="flex items-center gap-[2.36vw]">
                <a href="mailto:ilya@uor.foundation" className="hover:text-foreground transition-colors">
                  ilya@uor.foundation
                </a>
                <a
                  href="https://linkedin.com/in/trinityinvestor"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <span className="hidden sm:inline">+44 746 388 1239</span>
              </div>
              <span className="font-display italic normal-case tracking-normal text-muted-foreground/80">
                φ
              </span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
