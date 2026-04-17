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
  "Telegram",
  "Web3",
  "Fintech",
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
              className={`relative z-10 max-w-full break-words rounded-full border px-3 py-2 text-left text-xs font-medium transition-colors ${
                isActive
                  ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                  : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
              }`}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {labelFor(filter)}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="relative z-0 grid min-w-0 gap-3 md:grid-cols-2 md:gap-4">
          {filteredProjects.map((project, index) => {
            // Include activeFilter in key so list identity updates when filtering (FM + reuse could show stale cards on mobile).
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
        <p className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm break-words text-zinc-400">
          {t("empty")}
        </p>
      )}
    </div>
  );
}
