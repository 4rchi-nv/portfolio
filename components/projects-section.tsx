"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectTag } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";

interface ProjectsSectionProps {
  projects: Project[];
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

  return (
    <section className="section-wrap section-divider" id="projects">
      <SectionTitle
        eyebrow="Selected Projects"
        title="Frontend work across Telegram, integration-heavy web apps, and Web3-facing flows"
        description="Cards prioritize context and honest contribution wording. Filter by product type for faster review."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {filterOrder.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                  : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
              }`}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-400">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}
