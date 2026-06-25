/** Technical / structural data; user-facing copy lives in messages/{locale}.json */
export const siteUrl = "https://portfolio-arslan.vercel.app";

export type ProjectTag =
  | "Interactive Apps"
  | "Telegram"
  | "Web3"
  | "Fintech"
  | "Web App"
  | "Landing"
  | "Bot";

export type ProjectLinkStatus = "live" | "nda" | "demoUnavailable";

export interface ProjectMeta {
  key: string;
  tag: ProjectTag;
  featured?: boolean;
  href?: string;
  githubUrl?: string;
  image?: string;
  linkStatus?: ProjectLinkStatus;
  stack: string[];
}

/** Set when `public/resume.pdf` (or custom name) is added. */
export const resumeHref: string | undefined = undefined;

export const projectOrder: ProjectMeta[] = [
  {
    key: "spy",
    tag: "Interactive Apps",
    featured: true,
    linkStatus: "live",
    href: "https://spy-game-next.vercel.app",
    githubUrl: "https://github.com/4rchi-nv/spy-game-next",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "localStorage",
      "PWA",
      "Vercel",
    ],
  },
  {
    key: "bunker",
    tag: "Interactive Apps",
    featured: true,
    linkStatus: "live",
    href: "https://bunker-glhf.vercel.app",
    githubUrl: "https://github.com/4rchi-nv/bunker-game",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Firestore",
      "Firebase Auth",
      "Game FSM",
      "Vercel",
    ],
  },
  {
    key: "tWhale",
    tag: "Telegram",
    linkStatus: "nda",
    stack: ["React", "TypeScript", "Telegram Web Apps", "Telegram Bot API"],
  },
  {
    key: "web3Fintech",
    tag: "Web3",
    featured: true,
    linkStatus: "nda",
    stack: ["React", "TypeScript", "WalletConnect", "TronLink", "REST API"],
  },
  {
    key: "deepWaters",
    tag: "Fintech",
    linkStatus: "nda",
    stack: ["React", "TypeScript", "REST API"],
  },
  {
    key: "itdealgroup",
    tag: "Web App",
    linkStatus: "live",
    href: "https://itdealgroup.com",
    stack: ["Next.js", "React", "TypeScript"],
  },
  {
    key: "trustpay",
    tag: "Fintech",
    linkStatus: "demoUnavailable",
    stack: ["React", "TypeScript", "REST API", "Web Integration"],
  },
  {
    key: "dezv3",
    tag: "Web App",
    linkStatus: "live",
    href: "https://dezv3-dev.web.app",
    stack: ["React", "TypeScript", "Firebase", "Web App"],
  },
  {
    key: "mosca",
    tag: "Web App",
    linkStatus: "live",
    href: "https://mosca-itdeal.web.app/",
    stack: ["React", "TypeScript", "Web App", "Vercel"],
  },
  {
    key: "aviaLanding",
    tag: "Landing",
    linkStatus: "demoUnavailable",
    stack: ["HTML", "CSS", "JavaScript", "Responsive UI"],
  },
  {
    key: "telegramBots",
    tag: "Bot",
    linkStatus: "live",
    href: "https://t.me/t_projects_bot",
    stack: ["Telegram Bot API", "Python"],
  },
];

export const skillGroupOrder = [
  "frontend",
  "integrations",
  "web3",
  "tools",
  "other",
] as const;

export type SkillGroupKey = (typeof skillGroupOrder)[number];

export const skillItems: Record<SkillGroupKey, string[]> = {
  frontend: [
    "React",
    "Next.js App Router",
    "TypeScript",
    "Tailwind CSS",
    "State Management",
    "PWA",
  ],
  integrations: [
    "REST API",
    "Firebase",
    "Firestore",
    "Realtime Apps",
    "API Integration",
    "Telegram Web Apps",
  ],
  web3: [
    "WalletConnect",
    "TronLink",
    "Tron / Ethereum",
    "Balances & Transactions",
    "Token Approve Flows",
  ],
  tools: ["Git", "Vercel", "Responsive Layout", "GraphQL", "Docker"],
  other: [
    "Game Logic / FSM",
    "Parser / Data Normalization",
    "Python",
    "English",
  ],
};

export const contacts = {
  email: "agajanov0arslan@gmail.com",
  phone: "+99363337949",
  telegram: "https://t.me/darc_nv",
  telegramHandle: "@darc_nv",
  github: "https://github.com/4rchi-nv",
  linkedin: "https://www.linkedin.com/in/arslan-agajanov",
} as const;

export const personName = "Arslan Agajanov";

/** Temporary OG fallback until `public/og-image.png` (1200×630) is added. */
export const ogImagePath = "/arslan-profile.png";
