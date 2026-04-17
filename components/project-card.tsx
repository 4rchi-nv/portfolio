"use client";

import { useTranslations } from "next-intl";
import type { ResolvedProject } from "@/lib/portfolio-content";

interface ProjectCardProps {
  project: ResolvedProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("ProjectCard");

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70 md:p-6">
      <div className="mb-4 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
        <h3 className="min-w-0 text-lg font-semibold break-words text-zinc-100">
          {project.name}
          {project.featured ? (
            <span className="ml-2 inline-block rounded-full border border-zinc-600 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
              {t("featured")}
            </span>
          ) : null}
        </h3>
        <span className="w-fit shrink-0 rounded-full border border-zinc-700 px-2.5 py-1 text-[11px] font-medium tracking-wide break-words text-zinc-300">
          {project.tagLabel}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{t("whatItIs")}</p>
        <p className="text-sm leading-relaxed break-words text-zinc-200">{project.whatItIs}</p>
      </div>

      <p className="mt-3 text-sm leading-relaxed break-words text-zinc-300 hyphens-auto">
        {project.description}
      </p>

      <div className="mt-4 space-y-2">
        <p className="text-sm break-words text-zinc-200">
          <span className="font-medium text-zinc-100">{t("contribution")}</span>{" "}
          {project.contribution}
        </p>
        <p className="text-sm break-words text-zinc-200">
          <span className="font-medium text-zinc-100">{t("whyItMatters")}</span>{" "}
          {project.whyItMatters}
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={`${project.name}-${item}`}
            className="max-w-full break-all rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200"
          >
            {item}
          </li>
        ))}
      </ul>

      {project.href ? (
        <a
          className="mt-5 inline-flex max-w-full items-center break-words text-sm font-medium text-zinc-100 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400"
          href={project.href}
          target="_blank"
          rel="noreferrer"
        >
          {t("viewReference")}
        </a>
      ) : (
        <p className="mt-5 text-xs break-words text-zinc-500">{t("noPublicLink")}</p>
      )}
    </article>
  );
}
