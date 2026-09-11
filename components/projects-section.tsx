"use client";

import { useTranslations } from "next-intl";
import type { ResolvedCaseStudy, ResolvedProject } from "@/lib/portfolio-content";
import { EngineeringCase } from "@/components/engineering-case";
import { FadeBlock } from "@/components/fade-block";
import { ModeVisible } from "@/components/mode-visible";
import { ProjectRegistry } from "@/components/project-registry";
import { SectionTitle } from "@/components/section-title";

interface ProjectsSectionProps {
  cases: ResolvedCaseStudy[];
  registry: ResolvedProject[];
}

export function ProjectsSection({ cases, registry }: ProjectsSectionProps) {
  const t = useTranslations("Projects");

  return (
    <div className="min-w-0">
      <FadeBlock>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </FadeBlock>

      <div className="mt-2 space-y-5 md:space-y-6">
        {cases.map((project) => (
          <EngineeringCase key={project.key} project={project} />
        ))}
      </div>

      <ModeVisible modes={["engineer"]}>
        <div className="mt-10 md:mt-12">
          <ProjectRegistry projects={registry} />
        </div>
      </ModeVisible>
    </div>
  );
}
