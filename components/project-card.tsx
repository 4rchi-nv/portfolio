"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ResolvedProject } from "@/lib/portfolio-content";

interface ProjectCardProps {
  project: ResolvedProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("ProjectCard");

  const showNda = project.linkStatus === "nda";
  const showDemoUnavailable = project.linkStatus === "demoUnavailable";

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70 md:p-6">
      {project.image ? (
        <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800">
          <Image
            src={project.image}
            alt=""
            width={640}
            height={360}
            className="h-auto w-full object-cover object-top"
          />
        </div>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
        <h3 className="min-w-0 text-lg font-semibold break-words text-zinc-100">
          {project.name}
          {project.featured ? (
            <span className="ml-2 inline-block rounded-full border border-zinc-600 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
              {t("featured")}
            </span>
          ) : null}
          {showNda ? (
            <span className="ml-2 inline-block rounded-full border border-amber-700/60 bg-amber-950/40 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-widest text-amber-200/90">
              {t("ndaBadge")}
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
      </div>

      {project.featured && project.whyItMatters ? (
        <p className="mt-3 text-sm break-words text-zinc-300">
          <span className="font-medium text-zinc-100">{t("whyItMatters")}</span>{" "}
          {project.whyItMatters}
        </p>
      ) : null}

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

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.href ? (
          <a
            className="inline-flex max-w-full items-center justify-center break-words rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewReference")}
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            className="inline-flex max-w-full items-center break-words text-sm font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-100 hover:decoration-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-sm"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewGitHub")}
          </a>
        ) : null}
      </div>

      {!project.href && !project.githubUrl ? (
        <p className="mt-5 text-xs leading-relaxed break-words text-zinc-500">
          {showNda
            ? t("ndaNote")
            : showDemoUnavailable
              ? t("demoUnavailable")
              : t("noPublicLink")}
        </p>
      ) : null}
    </article>
  );
}
