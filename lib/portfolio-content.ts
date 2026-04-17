import { getTranslations } from "next-intl/server";
import {
  contacts,
  personName,
  projectOrder,
  skillGroupOrder,
  skillItems,
  type ProjectTag,
} from "@/data/portfolio-meta";

export type ResolvedProject = {
  name: string;
  whatItIs: string;
  description: string;
  contribution: string;
  whyItMatters: string;
  stack: string[];
  href?: string;
  tag: ProjectTag;
  tagLabel: string;
  featured?: boolean;
};

export type ResolvedExperience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export async function getResolvedProjects(): Promise<ResolvedProject[]> {
  const t = await getTranslations("Portfolio.projects");
  const tTags = await getTranslations("Projects.tags");
  return projectOrder.map((meta) => ({
    name: t(`${meta.key}.name`),
    whatItIs: t(`${meta.key}.whatItIs`),
    description: t(`${meta.key}.description`),
    contribution: t(`${meta.key}.contribution`),
    whyItMatters: t(`${meta.key}.whyItMatters`),
    stack: meta.stack,
    href: meta.href,
    tag: meta.tag,
    tagLabel: tTags(meta.tag),
    featured: meta.featured,
  }));
}

export async function getResolvedExperience(): Promise<ResolvedExperience[]> {
  const t = await getTranslations("Portfolio");
  const raw = t.raw("experience") as ResolvedExperience[];
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
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
    },
    helpWith: t.raw("helpWith") as string[],
    recruiterFacts: t.raw("recruiterFacts") as string[],
    expertise: t.raw("expertise") as { title: string; text: string }[],
    skills: Object.fromEntries(
      skillGroupOrder.map((key) => [key, t(`skills.${key}`)]),
    ) as Record<(typeof skillGroupOrder)[number], string>,
    skillItems,
    contacts,
  };
}
