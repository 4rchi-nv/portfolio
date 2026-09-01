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
    key: "enterpriseErp",
    tag: "Enterprise",
    featured: true,
    linkStatus: "nda",
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
  "frontend",
  "uiForms",
  "architecture",
  "state",
  "backend",
  "infrastructure",
  "platforms",
] as const;

export type SkillGroupKey = (typeof skillGroupOrder)[number];

export const skillItems: Record<SkillGroupKey, string[]> = {
  frontend: [
    "React",
    "Next.js",
    "Next.js App Router",
    "TypeScript",
    "JavaScript",
    "TanStack Query",
    "TanStack Table",
  ],
  uiForms: [
    "Tailwind CSS",
    "Tailwind CSS v4",
    "shadcn/ui",
    "React Hook Form",
    "Zod",
    "Framer Motion",
  ],
  architecture: [
    "REST APIs",
    "HTTP API contracts",
    "Authentication",
    "Sessions",
    "RBAC",
    "SSR",
    "ISR",
  ],
  state: ["Zustand", "Redux", "TanStack Query"],
  backend: ["NestJS", "Prisma", "PostgreSQL"],
  infrastructure: ["Docker", "Linux", "Nginx", "Git", "Vercel"],
  platforms: [
    "Web3 integrations",
    "Fintech integrations",
    "Telegram Web Apps",
    "Firebase",
    "GraphQL",
    "PWA",
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
