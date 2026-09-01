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
    <article className="glass-interactive group min-w-0 overflow-hidden rounded-[var(--radius-xl)] p-5 md:p-6">
      {project.image ? (
        <div className="mb-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--glass-border)]">
          <Image
            src={project.image}
            alt={project.name}
            width={640}
            height={360}
            className="h-auto w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
        <h3 className="min-w-0 text-lg font-semibold break-words text-[var(--foreground)]">
          {project.name}
          {project.featured ? (
            <span className="badge-accent ml-2">{t("featured")}</span>
          ) : null}
          {showNda ? (
            <span className="badge-nda ml-2">{t("ndaBadge")}</span>
          ) : null}
        </h3>
        <span className="badge-soft w-fit shrink-0 !px-2.5 !py-1 !text-[11px] !normal-case !tracking-wide">
          {project.tagLabel}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
          {t("whatItIs")}
        </p>
        <p className="text-sm leading-relaxed break-words text-[var(--muted-strong)]">
          {project.whatItIs}
        </p>
      </div>

      <p className="mt-3 text-sm leading-relaxed break-words text-[var(--muted)] hyphens-auto">
        {project.description}
      </p>

      <div className="mt-4 space-y-2">
        <p className="text-sm break-words text-[var(--muted-strong)]">
          <span className="font-medium text-[var(--foreground)]">
            {t("contribution")}
          </span>{" "}
          {project.contribution}
        </p>
      </div>

      {project.whyItMatters ? (
        <p className="mt-3 text-sm break-words text-[var(--muted)]">
          <span className="font-medium text-[var(--foreground)]">
            {t("whyItMatters")}
          </span>{" "}
          {project.whyItMatters}
        </p>
      ) : null}

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li key={`${project.name}-${item}`} className="tech-chip">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.href ? (
          <a
            className="btn-primary !min-h-10 !px-4 !py-2 !text-sm"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewReference")}
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            className="inline-flex max-w-full min-h-11 items-center break-words rounded-sm text-sm font-medium text-[var(--muted-strong)] underline decoration-[var(--glass-border-strong)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:decoration-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewGitHub")}
          </a>
        ) : null}
      </div>

      {!project.href && !project.githubUrl ? (
        <p className="mt-5 text-xs leading-relaxed break-words text-[var(--muted)]">
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
