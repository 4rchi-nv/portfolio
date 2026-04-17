/** Technical / structural data; user-facing copy lives in messages/{locale}.json */
export type ProjectTag =
  | "Telegram"
  | "Web3"
  | "Fintech"
  | "Web App"
  | "Landing"
  | "Bot";

export interface ProjectMeta {
  key: string;
  tag: ProjectTag;
  featured?: boolean;
  href?: string;
  stack: string[];
}

export const projectOrder: ProjectMeta[] = [
  {
    key: "tWhale",
    tag: "Telegram",
    featured: true,
    stack: ["React", "TypeScript", "Telegram Web Apps", "Telegram Bot API"],
  },
  {
    key: "web3Fintech",
    tag: "Web3",
    featured: true,
    stack: ["React", "TypeScript", "WalletConnect", "TronLink", "REST API"],
  },
  {
    key: "deepWaters",
    tag: "Fintech",
    featured: true,
    stack: ["React", "TypeScript", "REST API"],
  },
  {
    key: "itdealgroup",
    tag: "Web App",
    featured: true,
    href: "https://itdealgroup.com",
    stack: ["Next.js", "React", "TypeScript"],
  },
  {
    key: "trustpay",
    tag: "Fintech",
    href: "https://trustpay.now/",
    stack: ["Frontend", "Web Integration"],
  },
  {
    key: "dezv3",
    tag: "Web App",
    href: "https://dezv3-dev.web.app",
    stack: ["Frontend", "Web App"],
  },
  {
    key: "mosca",
    tag: "Web App",
    href: "https://mosca-itdeal.web.app/",
    stack: ["Frontend", "Web App"],
  },
  {
    key: "aviaLanding",
    tag: "Landing",
    href: "https://avia-landing.vercel.app",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "telegramBots",
    tag: "Bot",
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
    "JavaScript",
    "TypeScript",
    "React",
    "Redux",
    "Next.js",
    "HTML",
    "CSS",
  ],
  integrations: ["REST API", "Telegram Web Apps", "Telegram Bot API"],
  web3: [
    "WalletConnect",
    "TronLink",
    "Tron / Ethereum",
    "Balances & Transactions",
    "Token Approve Flows",
  ],
  tools: ["Git", "Responsive Layout", "GraphQL", "Hasura", "Docker"],
  other: ["jQuery", "SQL", "Python", "Django", "Databases", "English"],
};

export const expertiseIndices = [0, 1, 2, 3, 4, 5] as const;

export const contacts = {
  email: "agajanov0arslan@gmail.com",
  phone: "+99363337949",
  telegram: "https://t.me/darc_nv",
  telegramHandle: "@darc_nv",
  github: "https://github.com/4rch-nv",
  linkedin: "https://www.linkedin.com/in/arslan-agajanov",
} as const;

export const personName = "Arslan Agajanov";
