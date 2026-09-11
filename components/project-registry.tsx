"use client";

import { useTranslations } from "next-intl";
import type { ResolvedProject } from "@/lib/portfolio-content";
import { FadeBlock } from "@/components/fade-block";

type ProjectRegistryProps = {
  projects: ResolvedProject[];
};

function statusLabel(
  project: ResolvedProject,
  labels: { live: string; unavailable: string; nda: string },
) {
  if (project.linkStatus === "nda") return labels.nda;
  if (project.linkStatus === "demoUnavailable") return labels.unavailable;
  return labels.live;
}

export function ProjectRegistry({ projects }: ProjectRegistryProps) {
  const t = useTranslations("ProjectRegistry");
  const tCard = useTranslations("ProjectCard");
  const labels = {
    live: t("statusLive"),
    unavailable: t("statusUnavailable"),
    nda: tCard("ndaBadge"),
  };

  if (projects.length === 0) return null;

  return (
    <div className="min-w-0">
      <FadeBlock>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {t("eyebrow")}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] md:text-2xl">
          {t("title")}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-strong)]">
          {t("description")}
        </p>
      </FadeBlock>

      {/* Desktop table */}
      <div className="mt-5 hidden min-w-0 overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--glass-border)] md:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
              <th className="px-4 py-3 font-semibold">{t("colProject")}</th>
              <th className="px-4 py-3 font-semibold">{t("colType")}</th>
              <th className="px-4 py-3 font-semibold">{t("colRole")}</th>
              <th className="px-4 py-3 font-semibold">{t("colStack")}</th>
              <th className="px-4 py-3 font-semibold">{t("colStatus")}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.key}
                className="border-b border-[rgba(255,255,255,0.05)] last:border-b-0 hover:bg-[rgba(255,255,255,0.03)]"
              >
                <td className="max-w-[220px] px-4 py-3.5 align-top">
                  <div className="font-medium break-words text-[var(--foreground)]">
                    {project.name}
                  </div>
                  {project.href ? (
                    <a
                      className="mt-1 inline-block text-xs text-[var(--accent)] underline-offset-2 hover:underline"
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("open")}
                    </a>
                  ) : project.githubUrl ? (
                    <a
                      className="mt-1 inline-block text-xs text-[var(--accent)] underline-offset-2 hover:underline"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tCard("viewGitHub")}
                    </a>
                  ) : null}
                </td>
                <td className="px-4 py-3.5 align-top text-[var(--muted-strong)]">
                  {project.tagLabel}
                </td>
                <td className="max-w-[200px] px-4 py-3.5 align-top break-words text-[var(--muted-strong)]">
                  {project.role}
                </td>
                <td className="max-w-[240px] px-4 py-3.5 align-top">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((item) => (
                      <span key={`${project.key}-${item}`} className="tech-chip">
                        {item}
                      </span>
                    ))}
                    {project.stack.length > 4 ? (
                      <span className="tech-chip">+{project.stack.length - 4}</span>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3.5 align-top whitespace-nowrap text-[var(--muted)]">
                  {statusLabel(project, labels)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="mt-4 grid gap-3 md:hidden">
        {projects.map((project) => (
          <li
            key={project.key}
            className="glass-interactive min-w-0 rounded-[var(--radius-lg)] p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h4 className="text-base font-semibold break-words text-[var(--foreground)]">
                {project.name}
              </h4>
              <span className="badge-soft !normal-case !tracking-wide">
                {project.tagLabel}
              </span>
            </div>
            <p className="mt-2 text-sm break-words text-[var(--muted-strong)]">
              {project.role}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((item) => (
                <span key={`${project.key}-m-${item}`} className="tech-chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
              <span>{statusLabel(project, labels)}</span>
              {project.href ? (
                <a
                  className="text-[var(--accent)] underline-offset-2 hover:underline"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("open")}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
