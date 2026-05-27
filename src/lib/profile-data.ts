// Single source of truth for profile content.
// Consumed by the UI (src/routes/index.tsx), the JSON profile endpoint
// (src/routes/api/profile.ts), and the JSON Feed (src/routes/feed[.]json.ts).

export interface ExperienceEntry {
  role: string;
  org: string;
  orgUrl?: string;
  note: string;
  years: string;
  /** ISO year, parsed from `years` for <time> tags and JSON-LD. */
  startYear: string;
  /** ISO year or null for current roles. */
  endYear: string | null;
  current: boolean;
}

export interface ThinkingEntry {
  title: string;
  venue: string;
  date: string;
  /** ISO yyyy-mm for <time dateTime=...> and JSON Feed. */
  dateISO: string;
  kind: "Talk" | "Interview" | "Memo" | "Essay";
  url: string;
  gradient: string;
}

export const person = {
  name: "Ilya Paveliev",
  givenName: "Ilya",
  familyName: "Paveliev",
  jobTitle: "Deep Tech Founder & Investor",
  description:
    "Co-founder of Hologram Technologies and founding partner of Arete Capital. Building software-defined compute for local AI and investing across deep tech, AI and real-world assets.",
  twitterHandle: "TrinityInvestor",
  sameAs: [
    "https://www.linkedin.com/in/trinityinvestor/",
    "https://x.com/TrinityInvestor",
    "https://trinityinvestor.substack.com/",
    "https://www.uor.foundation/",
  ],
  knowsAbout: [
    "Deep Tech",
    "AI Infrastructure",
    "Local AI Inference",
    "Software-Defined Compute",
    "Real-World Assets",
    "Venture Investing",
    "Portfolio Management",
    "Content-Addressed Data",
    "Geometric Computation",
  ],
  alumniOf: {
    name: "Trinity College Dublin",
    url: "https://www.tcd.ie/",
  },
} as const;

export const experience: ExperienceEntry[] = [
  {
    role: "Co-founder",
    org: "Hologram Technologies",
    orgUrl: "https://hologram.xyz",
    note: "Software-defined compute for local AI inference.",
    years: "2025 —",
    startYear: "2025",
    endYear: null,
    current: true,
  },
  {
    role: "Founding Member",
    org: "UOR Foundation",
    orgUrl: "https://www.uor.foundation/",
    note: "Content-addressed open data standard. 150+ contributors.",
    years: "2025 —",
    startYear: "2025",
    endYear: null,
    current: true,
  },
  {
    role: "General Partner",
    org: "Arete Capital",
    orgUrl: "https://www.aretecapital.xyz/",
    note: "$20m hybrid venture fund. Backed by a16z principals.",
    years: "2023 — 25",
    startYear: "2023",
    endYear: "2025",
    current: false,
  },
  {
    role: "Director",
    org: "Haruko",
    orgUrl: "https://haruko.io",
    note: "Institutional risk & portfolio management. Series A.",
    years: "2022 — 24",
    startYear: "2022",
    endYear: "2024",
    current: false,
  },
  {
    role: "Lead Portfolio Manager",
    org: "OX1",
    note: "$30m market-neutral digital asset fund.",
    years: "2022",
    startYear: "2022",
    endYear: "2022",
    current: false,
  },
  {
    role: "Portfolio Manager",
    org: "Adrian Lee & Partners",
    note: "$20bn active currency overlay for US pensions.",
    years: "2013 — 21",
    startYear: "2013",
    endYear: "2021",
    current: false,
  },
  {
    role: "Analyst",
    org: "Perella Weinberg Partners",
    orgUrl: "https://www.pwpartners.com/",
    note: "M&A, energy sector. London founding team.",
    years: "2010 — 13",
    startYear: "2010",
    endYear: "2013",
    current: false,
  },
];

export const thinking: ThinkingEntry[] = [
  {
    title: "Hologram: From Indexing Content to Indexing Meaning",
    venue: "SingularityNet",
    date: "May 2026",
    dateISO: "2026-05-01",
    kind: "Talk",
    url: "https://www.linkedin.com/posts/mihaelaulieru_hologram-from-indexing-content-to-indexing-activity-7461255099261300736-LaH6",
    gradient: "linear-gradient(135deg, oklch(0.42 0.09 65), oklch(0.78 0.10 75))",
  },
  {
    title: "The Next Revolution is Geometric Computation",
    venue: "Quantum",
    date: "Jan 2026",
    dateISO: "2026-01-01",
    kind: "Talk",
    url: "https://www.youtube.com/watch?v=0wRCzByWidM",
    gradient: "linear-gradient(135deg, oklch(0.30 0.04 240), oklch(0.62 0.08 220))",
  },
  {
    title: "Insights on Web3, AI, and Crypto Trends",
    venue: "AltFunds",
    date: "Jun 2025",
    dateISO: "2025-06-01",
    kind: "Interview",
    url: "https://www.linkedin.com/posts/kiran-kaur-raina-b2922622a_my-latest-conversation-with-ilya-paveliev-share-7425166836108967936-4g62",
    gradient: "linear-gradient(135deg, oklch(0.36 0.05 30), oklch(0.74 0.09 55))",
  },
  {
    title: "The Real-World Asset Thesis",
    venue: "Arete Capital",
    date: "Jan 2024",
    dateISO: "2024-01-01",
    kind: "Memo",
    url: "https://www.aretecapital.xyz/posts/realworld-asset-thesis-tradmarkets",
    gradient: "linear-gradient(135deg, oklch(0.32 0.02 80), oklch(0.70 0.07 80))",
  },
  {
    title: "Liquidity Drought Ahead",
    venue: "Substack",
    date: "Oct 2023",
    dateISO: "2023-10-01",
    kind: "Essay",
    url: "https://trinityinvestor.substack.com/p/liquidity-drought-ahead",
    gradient: "linear-gradient(135deg, oklch(0.26 0.02 60), oklch(0.55 0.04 60))",
  },
];

export const life: readonly string[] = [
  "Scholarship in economics, Trinity College Dublin — graduated with gold medal.",
  "Sailed 10,000+ offshore miles across Ireland, the Caribbean, the US and Dubai.",
  "Builds drones, helicopters, robots, computers, software and wearables.",
  "Father to two wonderful daughters.",
];

export interface StoryChapter {
  years: string;
  org: string;
  subtitle: string;
  body: string;
}

export const storyStats: { value: string; label: string }[] = [
  { value: "4", label: "Companies & protocols" },
  { value: "$20bn+", label: "Assets & flows managed" },
  { value: "$20m", label: "Raised" },
  { value: "10,000+", label: "Offshore miles sailed" },
];

export const storyChapters: StoryChapter[] = [
  {
    years: "Beginnings",
    org: "Vladivostok, Russia",
    subtitle: "Origins",
    body: "I was born in Vladivostok during Perestroika. My mother was a lawyer and my father was an engineer. I taught myself to build drones, computers, and wearable devices, studied economics at Trinity College Dublin, graduated with a gold medal, and later sailed over 10,000 offshore miles.",
  },
  {
    years: "2010 — 2013",
    org: "Perella Weinberg Partners",
    subtitle: "Investment Banking — M&A",
    body: "I joined the London team early, focusing on energy sector transactions. Learned institutional discipline and how capital moves at scale.",
  },
  {
    years: "2013 — 2021",
    org: "Adrian Lee & Partners",
    subtitle: "Active Asset Management",
    body: "I managed a $20 billion active currency overlay for US pension funds and endowments. Eight years inside the orchestration layer of global institutional capital.",
  },
  {
    years: "2022",
    org: "OX1",
    subtitle: "Market-Neutral Digital Assets",
    body: "I launched and managed a $30 million market-neutral crypto fund through the FTX crisis, returning all LP capital. Counterparty risk is sovereignty risk.",
  },
  {
    years: "2023 — 2025",
    org: "Arete Capital",
    subtitle: "Venture Capital",
    body: "I raised a $20 million hybrid venture fund, oversubscribed and backed by Marc Andreessen and Chris Dixon at a16z. Invested across deep tech, AI, and real-world assets, backing founders building physical infrastructure.",
  },
  {
    years: "2025 — Present",
    org: "UOR Foundation",
    subtitle: "Open Protocol Foundation",
    body: "I am a Founding Member of the UOR Foundation, stewarding an open standard for content-addressed storage, compute, and networking. 150+ contributors building the substrate for verified, self-owned systems.",
  },
  {
    years: "2025 — Present",
    org: "Hologram Technologies",
    subtitle: "Deep Tech — Local AI Compute",
    body: "I co-founded Hologram to build software-defined high-performance compute for local AI inference. Edge-first, offline-capable, and private — running on the hardware people already own. I have two daughters, and I am building the compute environment I want them to inherit.",
  },
];

export const SITE_URL = "https://ilyapaveliev.com";
export const PORTRAIT_PATH = "/og-portrait.jpg";
export const PORTRAIT_ALT =
  "Portrait of Ilya Paveliev, co-founder of Hologram Technologies and general partner at Arete Capital.";

/** Last meaningful content update — bump when experience/thinking changes. */
export const CONTENT_UPDATED_AT = "2026-05-21";
