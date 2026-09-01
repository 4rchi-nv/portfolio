"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ProjectTag } from "@/data/portfolio-meta";
import type { ResolvedProject } from "@/lib/portfolio-content";
import { ProjectCard } from "@/components/project-card";
import { FadeBlock } from "@/components/fade-block";
import { SectionTitle } from "@/components/section-title";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface ProjectsSectionProps {
  projects: ResolvedProject[];
}

const filterOrder: Array<"All" | ProjectTag> = [
  "All",
  "Enterprise",
  "Fintech",
  "Interactive Apps",
  "Telegram",
  "Web3",
  "Web App",
  "Landing",
  "Bot",
];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("Projects");
  const tTags = useTranslations("Projects.tags");
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<(typeof filterOrder)[number]>("All");

  const filteredProjects = useMemo(() => {
    const sorted = [...projects].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
    );
    if (activeFilter === "All") {
      return sorted;
    }
    return sorted.filter((project) => project.tag === activeFilter);
  }, [activeFilter, projects]);

  const labelFor = (filter: (typeof filterOrder)[number]) =>
    filter === "All" ? t("filterAll") : tTags(filter);

  return (
    <div className="min-w-0">
      <FadeBlock>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </FadeBlock>

      {/*
        Cards use motion translateY; while animating they move upward and can paint over this row
        (later siblings stack on top). Keep filters above the grid hit-test layer on mobile.
      */}
      <div className="relative z-20 mb-6 flex flex-wrap gap-2 [touch-action:manipulation]">
        {filterOrder.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              aria-pressed={isActive}
              className={`filter-chip ${isActive ? "filter-chip-active" : "filter-chip-idle"}`}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {labelFor(filter)}
            </button>
          );
        })}
      </div>

      {activeFilter === "Interactive Apps" ? (
        <p className="glass relative z-20 mb-5 rounded-[var(--radius-lg)] p-4 text-sm leading-relaxed break-words text-[var(--muted-strong)]">
          {t("gamesIntro")}
        </p>
      ) : null}

      {filteredProjects.length > 0 ? (
        <div className="relative z-0 grid min-w-0 gap-3 md:grid-cols-2 md:gap-4">
          {filteredProjects.map((project, index) => {
            const itemKey = `${activeFilter}:${project.name}`;
            if (isMobile) {
              return (
                <div key={itemKey} className="min-w-0">
                  <ProjectCard project={project} />
                </div>
              );
            }
            return (
              <motion.div key={itemKey} {...staggerItemProps(index, false, reduced)}>
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="glass rounded-[var(--radius-lg)] p-4 text-sm break-words text-[var(--muted)]">
          {t("empty")}
        </p>
      )}
    </div>
  );
}
