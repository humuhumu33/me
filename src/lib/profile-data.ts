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
    years: "2025 -",

    startYear: "2025",
    endYear: null,
    current: true,
  },
  {
    role: "Founding Member",
    org: "UOR Foundation",
    orgUrl: "https://www.uor.foundation/",
    note: "Content-addressed open data standard. 150+ contributors.",
    years: "2025 -",
    startYear: "2025",
    endYear: null,
    current: true,
  },
  {
    role: "General Partner",
    org: "Arete Capital",
    orgUrl: "https://www.aretecapital.xyz/",
    note: "$20m hybrid venture fund. Backed by a16z principals.",
    years: "2023 - 25",
    startYear: "2023",
    endYear: "2025",
    current: false,
  },
  {
    role: "Director",
    org: "Haruko",
    orgUrl: "https://haruko.io",
    note: "Institutional risk & portfolio management. Series A.",
    years: "2022 - 24",
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
    years: "2013 - 21",
    startYear: "2013",
    endYear: "2021",
    current: false,
  },
  {
    role: "Analyst",
    org: "Perella Weinberg Partners",
    orgUrl: "https://www.pwpartners.com/",
    note: "M&A, energy sector. London founding team.",
    years: "2010 - 13",
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
  "Scholarship in economics, Trinity College Dublin. Graduated with gold medal.",
  "Sailed 10,000+ offshore miles across Ireland, the Caribbean, the US and Dubai.",
  "Builds drones, helicopters, robots, computers, software and wearables.",
  "Father to two wonderful daughters.",
];

import storyImg01 from "@/assets/story/01-vladivostok.jpg";
import storyImgTrinity from "@/assets/story/02-trinity.jpg";
import storyImg02 from "@/assets/story/02-perella.jpg";
import storyImg03 from "@/assets/story/03-adrian-lee.jpg";
import storyImg04 from "@/assets/story/04-ox1.jpg";
import storyImg05 from "@/assets/story/05-arete.jpg";
import storyImg06 from "@/assets/story/06-uor.jpg";
import storyImg07 from "@/assets/story/07-hologram.jpg";

export interface StoryChapter {
  years: string;
  org: string;
  subtitle: string;
  body: string;
  image: string;
  href?: string;
}

export const storyStats: { value: string; label: string }[] = [
  { value: "7", label: "Companies and protocols" },
  { value: "$20bn+", label: "Capital managed" },
  { value: "10k+", label: "Miles sailed" },
];

export const storyChapters: StoryChapter[] = [
  {
    years: "Beginnings",
    org: "Vladivostok",
    subtitle: "Russia",
    body: "I was born in Vladivostok during Perestroika. My mother is a lawyer, my father an engineer. I grew up taking things apart: radios, computers, eventually drones and wearables, and learning how they worked by rebuilding them. I have since sailed more than ten thousand offshore miles across Ireland, the Caribbean, the US and the Gulf.",
    image: storyImg01,
  },
  {
    years: "2006 - 2010",
    org: "Trinity College Dublin",
    subtitle: "Economics",
    body: "I left Russia for Ireland to read economics at Trinity College Dublin. I held a Foundation Scholarship and graduated with a gold medal. Alongside my degree, I founded the Trinity Investors Society and the Trinity Fund, an education fund for disadvantaged kids.",
    image: storyImgTrinity,
    href: "https://www.tcd.ie/",
  },
  {
    years: "2010 - 2013",
    org: "Perella Weinberg Partners",
    subtitle: "Mergers & Acquisitions",
    body: "I joined the founding London team as an analyst, covering energy sector transactions. Three years inside how large companies are bought, sold and financed.",
    image: storyImg02,
    href: "https://www.pwpartners.com/",
  },
  {
    years: "2013 - 2021",
    org: "Adrian Lee & Partners",
    subtitle: "Active Asset Management",
    body: "I spent eight years managing active currency overlay programs for US pension funds and endowments, with mandates totalling around $20 billion. The work was systematic, long-horizon, and taught me how institutional capital actually moves.",
    image: storyImg03,
  },
  {
    years: "2022",
    org: "OX1",
    subtitle: "Digital Asset Fund",
    body: "I launched and ran a $30 million market-neutral crypto fund. We traded through the collapse of FTX and returned all LP capital. The year reframed what I thought I understood about counterparty risk.",
    image: storyImg04,
  },
  {
    years: "2023 - 2025",
    org: "Arete Capital",
    subtitle: "Venture Capital",
    body: "I raised a $20 million hybrid venture fund and invested across deep tech, AI and real-world assets. The thesis was simple: the next cycle of value would come from physical infrastructure and the software that runs on top of it.",
    image: storyImg05,
    href: "https://www.aretecapital.xyz/posts/realworld-asset-thesis-tradmarkets",
  },
  {
    years: "2025 - Present",
    org: "UOR Foundation",
    subtitle: "Open Protocol",
    body: "I am a founding member of the UOR Foundation, which stewards an open standard for content-addressed storage, compute and networking. The work is done in public with a growing group of contributors.",
    image: storyImg06,
    href: "https://uor.foundation/",
  },
  {
    years: "2025 - Present",
    org: "Hologram Technologies",
    subtitle: "Local AI Compute",
    body: "I co-founded Hologram to build software-defined high-performance compute for local AI inference. Edge-first, offline-capable, running on hardware people already own. I have two daughters. I am building the compute environment I want them to inherit.",
    image: storyImg07,
    href: "https://gethologram.ai/",
  },
];

export const SITE_URL = "https://ilyapaveliev.com";
export const PORTRAIT_PATH = "/og-portrait.jpg";
export const PORTRAIT_ALT =
  "Portrait of Ilya Paveliev, co-founder of Hologram Technologies and general partner at Arete Capital.";

/** Last meaningful content update. Bump when experience/thinking changes. */
export const CONTENT_UPDATED_AT = "2026-05-21";
