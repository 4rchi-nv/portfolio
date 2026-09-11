/** Technical / structural data; user-facing copy lives in messages/{locale}.json */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return `https://${productionHost}`;

  const deploymentHost = process.env.VERCEL_URL;
  if (deploymentHost) return `https://${deploymentHost}`;

  return "https://arslan-agajanov.vercel.app";
}

export const siteUrl = resolveSiteUrl();

export type ProjectTag =
  | "Enterprise"
  | "Interactive Apps"
  | "Telegram"
  | "Web3"
  | "Fintech"
  | "Web App"
  | "Landing"
  | "Bot";

export type ProjectLinkStatus = "live" | "nda" | "demoUnavailable";

export type ArchitectureFlowNode = {
  id: string;
  label: string;
  subtitle?: string;
};

export type ArchitectureMeta = {
  flow: ArchitectureFlowNode[];
  dataLayer?: string[];
};

export interface ProjectMeta {
  key: string;
  tag: ProjectTag;
  featured?: boolean;
  /** Deep engineering case study (P0 selected work). */
  caseStudy?: boolean;
  href?: string;
  githubUrl?: string;
  image?: string;
  linkStatus?: ProjectLinkStatus;
  stack: string[];
  architecture?: ArchitectureMeta;
  /** Primary language/runtime badge on the case header. */
  language?: string;
}

/** Public CV under `public/cv/`. */
export const resumeHref = "/cv/Arslan_Agajanov_Resume_EN.pdf";

export const projectOrder: ProjectMeta[] = [
  {
    key: "enterpriseErp",
    tag: "Enterprise",
    featured: true,
    caseStudy: true,
    linkStatus: "nda",
    language: "TypeScript",
    stack: [
      "Next.js",
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "TanStack Query",
      "TanStack Table",
      "React Hook Form",
      "Zod",
      "REST API",
    ],
    architecture: {
      flow: [
        { id: "browser", label: "Browser", subtitle: "Operators · RBAC UI" },
        { id: "next", label: "Next.js", subtitle: "App Router · forms · grids" },
        {
          id: "query",
          label: "TanStack Query",
          subtitle: "Server state · cache",
        },
        { id: "api", label: "ERP API", subtitle: "Auth · RBAC · domains" },
      ],
      dataLayer: ["Finance", "Warehouse", "HR", "Projects", "Office"],
    },
  },
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
    caseStudy: true,
    linkStatus: "live",
    language: "TypeScript",
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
    architecture: {
      flow: [
        { id: "host", label: "Host UI", subtitle: "Scenario · rounds" },
        { id: "player", label: "Player UI", subtitle: "Private cards" },
        {
          id: "fsm",
          label: "Game FSM",
          subtitle: "Rounds · votes · reveal",
        },
        {
          id: "firestore",
          label: "Firestore",
          subtitle: "Realtime room state",
        },
      ],
      dataLayer: ["Public state", "Private fields", "AI scenario import"],
    },
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
    caseStudy: true,
    linkStatus: "nda",
    language: "TypeScript",
    stack: ["React", "TypeScript", "WalletConnect", "TronLink", "REST API"],
    architecture: {
      flow: [
        { id: "user", label: "User", subtitle: "Wallet intent" },
        {
          id: "app",
          label: "Next.js / React",
          subtitle: "Transaction UX",
        },
        {
          id: "wallets",
          label: "Wallets",
          subtitle: "WalletConnect · TronLink",
        },
        { id: "chain", label: "RPC / Chain", subtitle: "ETH · Tron · BSC" },
      ],
      dataLayer: ["Balances", "Approve", "AML checks", "Backend"],
    },
  },
  {
    key: "nova",
    tag: "Enterprise",
    featured: true,
    linkStatus: "live",
    href: "https://novva-erp.vercel.app/",
    stack: [
      "Next.js 16",
      "React",
      "TypeScript",
      "MUI X DataGrid",
      "TanStack Query",
      "Effector",
      "Zod",
      "FSD",
      "Biome",
    ],
  },
  {
    key: "itdealgroup",
    tag: "Landing",
    linkStatus: "live",
    href: "https://itdealgroup.com",
    stack: ["React", "TypeScript", "Vite", "i18n"],
  },
  {
    key: "trustpay",
    tag: "Fintech",
    linkStatus: "demoUnavailable",
    stack: ["React", "TypeScript", "REST API", "Vercel"],
  },
  {
    key: "dezv3",
    tag: "Web App",
    linkStatus: "live",
    href: "https://dezv3-dev.web.app",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "Telegram Web Apps",
      "Firebase Hosting",
    ],
  },
  {
    key: "mosca",
    tag: "Fintech",
    linkStatus: "live",
    href: "https://mosca-itdeal.web.app/",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "MUI",
      "Telegram Web Apps",
      "Firebase Hosting",
    ],
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
  "architecture",
  "dataState",
  "ui",
  "forms",
  "integrations",
  "engineering",
] as const;

export type SkillGroupKey = (typeof skillGroupOrder)[number];

export const skillItems: Record<SkillGroupKey, string[]> = {
  architecture: [
    "React 19",
    "Next.js",
    "App Router",
    "RSC",
    "SSR / ISR",
    "TypeScript",
  ],
  dataState: [
    "TanStack Query",
    "TanStack Table",
    "Zustand",
    "Redux",
    "URL state",
  ],
  ui: [
    "Tailwind CSS",
    "shadcn/ui",
    "Radix / Base UI",
    "Framer Motion",
    "Responsive UI",
  ],
  forms: ["React Hook Form", "Zod", "Complex CRUD forms"],
  integrations: [
    "REST",
    "GraphQL",
    "WebSocket",
    "WalletConnect",
    "TronLink",
    "Telegram Web Apps",
  ],
  engineering: [
    "Vitest",
    "Cypress",
    "Docker",
    "Linux",
    "Nginx",
    "Git",
    "Vercel",
  ],
};

/** Optional health label shown on capability cards */
export const skillGroupStatus: Record<SkillGroupKey, "proven" | "active"> = {
  architecture: "proven",
  dataState: "proven",
  ui: "active",
  forms: "proven",
  integrations: "proven",
  engineering: "active",
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

export const jobTitle = "Frontend / Software Engineer";

export const knowsAbout = [
  "React",
  "Next.js",
  "TypeScript",
  "Frontend Development",
  "Software Engineering",
  "Enterprise Software",
  "ERP",
  "Fintech",
  "REST APIs",
  "NestJS",
  "PostgreSQL",
] as const;
