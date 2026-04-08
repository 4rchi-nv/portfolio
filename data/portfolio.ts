export type ProjectTag =
  | "Telegram"
  | "Web3"
  | "Fintech"
  | "Web App"
  | "Landing"
  | "Bot";

export interface Project {
  name: string;
  description: string;
  contribution: string;
  stack: string[];
  whyItMatters: string;
  href?: string;
  tag: ProjectTag;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const portfolioData = {
  person: {
    name: "Arslan Agajanov",
    role: "Frontend Developer (React / TypeScript) - Web, Telegram WebApp, Fintech / Web3 Integrations",
    location: "Ashgabat, Turkmenistan - Remote",
    summary:
      "Frontend developer with 5+ years of experience building user-facing web products with React, TypeScript, and Next.js. Works on Telegram WebApps, REST integrations, and Web3 product flows including wallet connections, balances, transactions, and token approve scenarios.",
  },
  contacts: {
    email: "agajanov0arslan@gmail.com",
    phone: "+99363337949",
    telegram: "https://t.me/darc_nv",
    telegramHandle: "@darc_nv",
    github: "https://github.com/4rch-nv",
    linkedin: "https://www.linkedin.com/in/arslan-agajanov",
  },
  hero: {
    title: "Frontend Engineer for Product Teams",
    subtitle:
      "I build production web interfaces with React and TypeScript, with hands-on delivery in Telegram Mini Apps, REST integrations, and Web3 transaction-facing flows.",
  },
  expertise: [
    {
      title: "React / TypeScript Product Development",
      text: "Build and maintain real user-facing interfaces for product teams, from UI architecture to integration-ready screens.",
    },
    {
      title: "Telegram WebApps & Bot Flows",
      text: "Contribute to Telegram WebApp products and Bot API-facing flows where frontend behavior is tied to chat-based user journeys.",
    },
    {
      title: "REST API Integrations",
      text: "Connect frontend applications to backend services with validation, data processing, and reliable request handling.",
    },
    {
      title: "Web3 Frontend Flows",
      text: "Implement wallet connection scenarios, balances, transactions, and approve flows for Tron and Ethereum product use cases.",
    },
    {
      title: "Legacy Refactoring",
      text: "Improve older codebases by restructuring modules, reducing complexity, and increasing maintainability.",
    },
    {
      title: "Mentoring & Communication",
      text: "Teaching experience helps with clear technical communication, onboarding, and cross-team collaboration.",
    },
  ],
  projects: [
    {
      name: "T-Whale",
      description:
        "Telegram WebApp game with progression mechanics similar to tap-to-progress products.",
      contribution:
        "Worked on frontend functionality, user flow behavior, and integration-facing parts of the Telegram product experience.",
      stack: ["React", "TypeScript", "Telegram Web Apps", "Telegram Bot API"],
      whyItMatters:
        "Demonstrates practical delivery in Telegram ecosystem products with real user interaction loops.",
      tag: "Telegram",
    },
    {
      name: "Web3 / Fintech / AML Flows",
      description:
        "Frontend-facing integration scenarios covering wallet connectivity and transaction-oriented checks.",
      contribution:
        "Implemented and supported wallet connections, balances, transaction flows, and token approve interactions for Tron and Ethereum contexts.",
      stack: ["React", "TypeScript", "WalletConnect", "TronLink", "REST API"],
      whyItMatters:
        "Shows applied experience with finance-sensitive and blockchain-integrated user journeys.",
      tag: "Web3",
    },
    {
      name: "DeepWaters",
      description: "Financial accounting system interface and product functionality.",
      contribution:
        "Worked on frontend functionality and integration-related parts of the product.",
      stack: ["React", "TypeScript", "REST API"],
      whyItMatters:
        "Represents work on structured, business-focused interfaces beyond marketing pages.",
      tag: "Fintech",
    },
    {
      name: "itdealgroup.com",
      description: "Company website and case presentation pages.",
      contribution:
        "Improved the design and frontend structure of the cases page and related UI composition.",
      stack: ["Next.js", "React", "TypeScript"],
      whyItMatters:
        "Highlights practical improvements to production-facing company web presence.",
      href: "https://itdealgroup.com",
      tag: "Web App",
    },
    {
      name: "trustpay.now",
      description: "Public-facing web product reference.",
      contribution:
        "Contributed to frontend and user-facing experience with available public context.",
      stack: ["Frontend", "Web Integration"],
      whyItMatters:
        "Included as a portfolio reference for product-oriented interface work.",
      href: "https://trustpay.now/",
      tag: "Fintech",
    },
    {
      name: "dezv3-dev.web.app",
      description: "Live web project reference.",
      contribution:
        "Contributed to frontend implementation and UI behavior in a deployed environment.",
      stack: ["Frontend", "Web App"],
      whyItMatters:
        "Shows practical participation in shipped web interfaces.",
      href: "https://dezv3-dev.web.app",
      tag: "Web App",
    },
    {
      name: "mosca-itdeal.web.app",
      description: "Live web project reference.",
      contribution:
        "Worked on frontend tasks and support for user-facing interface parts.",
      stack: ["Frontend", "Web App"],
      whyItMatters:
        "Adds additional proof of deployment-oriented frontend work.",
      href: "https://mosca-itdeal.web.app/",
      tag: "Web App",
    },
    {
      name: "avia-landing.vercel.app",
      description: "Public landing-style frontend project.",
      contribution:
        "Built and improved frontend structure and visual composition for a deployed page.",
      stack: ["HTML", "CSS", "JavaScript"],
      whyItMatters:
        "Complements product work with polished responsive frontend execution.",
      href: "https://avia-landing.vercel.app",
      tag: "Landing",
    },
    {
      name: "Telegram Bot References",
      description: "Supporting bot-side references connected to Telegram workflows.",
      contribution:
        "Built and maintained bot-related functionality for project use and testing scenarios.",
      stack: ["Telegram Bot API", "Python"],
      whyItMatters:
        "Demonstrates practical understanding of Telegram product ecosystem beyond UI-only scope.",
      href: "https://t.me/t_projects_bot",
      tag: "Bot",
    },
  ] satisfies Project[],
  experience: [
    {
      company: "Itdeal",
      role: "Frontend Developer (Middle)",
      period: "Jul 2024 - Present",
      location: "Chisinau, Moldova / Remote / Distributed team",
      points: [
        "Build and maintain client-side applications with React and TypeScript, integrated with REST APIs.",
        "Contribute to Telegram WebApps and Bot API-connected product flows.",
        "Implement Web3 functionality including wallet connection, balances, transaction behavior, and approve flows.",
        "Support frontend integration for blockchain/AML-facing workflows.",
        "Refactor legacy modules to improve maintainability and delivery speed.",
      ],
    },
    {
      company: "KIBERone",
      role: "Program Manager / Mentor (Programming)",
      period: "Apr 2022 - Feb 2024",
      location: "Ashgabat, Turkmenistan",
      points: [
        "Taught 100+ students in programming and web development tracks.",
        "Supported 40+ students in entering IT-focused universities.",
        "Covered HTML, CSS, JavaScript, backend basics, algorithms, and beginner game creation.",
        "Organized project-based learning through contests, practice, and technical activities.",
      ],
    },
    {
      company: "Turkmen Forum",
      role: "Frontend Developer (Middle)",
      period: "Dec 2021 - Jan 2023",
      location: "Ashgabat, Turkmenistan",
      points: [
        "Built frontend layouts, UI elements, and parts of internal admin interfaces.",
        "Worked on frontend for ogt-turkmenistan.com and ittc.com.tm.",
        "Used HTML, CSS, Vanilla JavaScript, and jQuery for production tasks.",
        "Supported event-related IT operations and delegate coordination.",
      ],
    },
    {
      company: "Milli San",
      role: "Junior Frontend Developer / React Developer",
      period: "May 2020 - Dec 2021",
      location: "Ashgabat, Turkmenistan",
      points: [
        "Fixed and built web pages with responsive UI adaptations.",
        "Worked with React and participated in migration from class components to functional patterns.",
        "Contributed to integrations involving Hasura, Docker, basic TypeScript, and GraphQL.",
      ],
    },
  ] satisfies ExperienceItem[],
  skills: [
    {
      title: "Frontend",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Redux",
        "Next.js",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "Integrations",
      items: ["REST API", "Telegram Web Apps", "Telegram Bot API"],
    },
    {
      title: "Web3",
      items: [
        "WalletConnect",
        "TronLink",
        "Tron / Ethereum",
        "Balances & Transactions",
        "Token Approve Flows",
      ],
    },
    {
      title: "Tools",
      items: ["Git", "Responsive Layout", "GraphQL", "Hasura", "Docker"],
    },
    {
      title: "Other Experience",
      items: ["jQuery", "SQL", "Python", "Django", "Databases", "English"],
    },
  ] satisfies SkillGroup[],
} as const;
