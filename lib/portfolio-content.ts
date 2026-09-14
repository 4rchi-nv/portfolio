import { getTranslations } from "next-intl/server";
import {
  contacts,
  personName,
  projectOrder,
  skillGroupOrder,
  skillItems,
  type ArchitectureMeta,
  type ProjectTag,
  type ProjectLinkStatus,
} from "@/data/portfolio-meta";

export type ResolvedProject = {
  key: string;
  name: string;
  whatItIs: string;
  description: string;
  contribution: string;
  whyItMatters: string;
  role: string;
  stack: string[];
  href?: string;
  githubUrl?: string;
  image?: string;
  linkStatus: ProjectLinkStatus;
  tag: ProjectTag;
  tagLabel: string;
  featured?: boolean;
  caseStudy?: boolean;
};

export type CaseDecision = {
  title: string;
  body: string;
};

export type CaseImpact = {
  label: string;
  value: string;
};

export type ResolvedCaseStudy = ResolvedProject & {
  caseStudy: true;
  index: number;
  language?: string;
  status: string;
  domains: string[];
  problem: string;
  owned: string[];
  decisions: CaseDecision[];
  impactStats: CaseImpact[];
  standing: string;
  architecture: ArchitectureMeta;
  dataLayerLabel: string;
};

export type ResolvedExperience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  url?: string;
  domain?: string;
  technologies?: string[];
  scope?: string;
};

export type ImpactMetric = {
  value: string;
  label: string;
  context: string;
};

export type ResolvedCertification = {
  title: string;
  provider: string;
  year: string;
  /** Optional note distinguishing training from commercial experience */
  detail?: string;
};

function resolveBaseProject(
  meta: (typeof projectOrder)[number],
  t: Awaited<ReturnType<typeof getTranslations>>,
  tTags: Awaited<ReturnType<typeof getTranslations>>,
): ResolvedProject {
  return {
    key: meta.key,
    name: t(`${meta.key}.name`),
    whatItIs: t(`${meta.key}.whatItIs`),
    description: t(`${meta.key}.description`),
    contribution: t(`${meta.key}.contribution`),
    whyItMatters: t(`${meta.key}.whyItMatters`),
    role: t(`${meta.key}.role`),
    stack: meta.stack,
    href: meta.linkStatus === "live" ? meta.href : undefined,
    githubUrl: meta.githubUrl,
    image: meta.image,
    linkStatus: meta.linkStatus ?? (meta.href ? "live" : "nda"),
    tag: meta.tag,
    tagLabel: tTags(meta.tag),
    featured: meta.featured,
    caseStudy: meta.caseStudy,
  };
}

export async function getResolvedProjects(): Promise<ResolvedProject[]> {
  const t = await getTranslations("Portfolio.projects");
  const tTags = await getTranslations("Projects.tags");
  return projectOrder.map((meta) => resolveBaseProject(meta, t, tTags));
}

export async function getResolvedCaseStudies(): Promise<ResolvedCaseStudy[]> {
  const t = await getTranslations("Portfolio.projects");
  const tTags = await getTranslations("Projects.tags");
  const preferredOrder = ["enterpriseErp", "web3Fintech", "bunker"] as const;
  const caseMetas = preferredOrder
    .map((key) => projectOrder.find((meta) => meta.key === key))
    .filter(
      (meta): meta is (typeof projectOrder)[number] =>
        Boolean(meta?.caseStudy && meta.architecture),
    );

  return caseMetas.map((meta, index) => {
    const base = resolveBaseProject(meta, t, tTags);
    const raw = t.raw(meta.key) as {
      status?: string;
      domains?: string[];
      problem?: string;
      owned?: string[];
      decisions?: CaseDecision[];
      impactStats?: CaseImpact[];
      standing?: string;
      dataLayerLabel?: string;
    };

    return {
      ...base,
      caseStudy: true as const,
      index: index + 1,
      language: meta.language,
      status: raw.status ?? "",
      domains: raw.domains ?? [],
      problem: raw.problem ?? "",
      owned: raw.owned ?? [],
      decisions: raw.decisions ?? [],
      impactStats: raw.impactStats ?? [],
      standing: raw.standing ?? "",
      architecture: meta.architecture!,
      dataLayerLabel: raw.dataLayerLabel ?? "Data layer",
    };
  });
}

export async function getResolvedRegistryProjects(): Promise<ResolvedProject[]> {
  const projects = await getResolvedProjects();
  return projects.filter((project) => !project.caseStudy);
}

export async function getResolvedExperience(): Promise<ResolvedExperience[]> {
  const t = await getTranslations("Portfolio");
  const raw = t.raw("experience") as ResolvedExperience[];
  return raw;
}

export async function getResolvedCertifications(): Promise<ResolvedCertification[]> {
  const t = await getTranslations("Portfolio");
  const raw = t.raw("certifications") as ResolvedCertification[];
  return raw;
}

export async function getPortfolioStrings() {
  const t = await getTranslations("Portfolio");
  return {
    personName,
    person: {
      role: t("person.role"),
      location: t("person.location"),
      summary: t("person.summary"),
    },
    hero: {
      eyebrow: t("hero.eyebrow"),
      title: t("hero.title"),
      stack: t("hero.stack"),
      subtitle: t("hero.subtitle"),
      statusBadge: t("hero.statusBadge"),
    },
    aboutParagraphs: t.raw("aboutParagraphs") as string[],
    helpWith: t.raw("helpWith") as string[],
    recruiterFacts: t.raw("recruiterFacts") as string[],
    impact: t.raw("impact") as ImpactMetric[],
    expertise: t.raw("expertise") as { title: string; text: string }[],
    skills: Object.fromEntries(
      skillGroupOrder.map((key) => [key, t(`skills.${key}`)]),
    ) as Record<(typeof skillGroupOrder)[number], string>,
    skillItems,
    contacts,
  };
}
