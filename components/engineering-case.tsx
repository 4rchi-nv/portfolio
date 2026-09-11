"use client";

import { useTranslations } from "next-intl";
import type { ResolvedCaseStudy } from "@/lib/portfolio-content";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { FadeBlock } from "@/components/fade-block";
import { ProductPreview } from "@/components/product-preview";

type EngineeringCaseProps = {
  project: ResolvedCaseStudy;
};

export function EngineeringCase({ project }: EngineeringCaseProps) {
  const t = useTranslations("EngineeringCase");
  const tCard = useTranslations("ProjectCard");
  const indexLabel = String(project.index).padStart(2, "0");
  const showNda = project.linkStatus === "nda";

  return (
    <article
      id={`case-${project.key}`}
      className="glass-interactive min-w-0 scroll-mt-28 overflow-hidden rounded-[var(--radius-xl)] p-5 md:p-7"
    >
      <FadeBlock>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="font-mono text-sm text-[var(--muted)]">{indexLabel}</span>
          {project.language ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-strong)]">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[var(--accent)]"
              />
              {project.language}
            </span>
          ) : null}
          <span className="badge-soft !normal-case !tracking-wide">
            {project.tagLabel}
          </span>
          {showNda ? (
            <span className="badge-nda">{tCard("ndaBadge")}</span>
          ) : null}
        </div>

        <h3 className="mt-3 max-w-3xl text-balance break-words text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed break-words text-[var(--muted-strong)] md:text-base">
          {project.whatItIs}
        </p>

        {project.status ? (
          <p className="status-pulse mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[rgba(94,234,212,0.28)] bg-[rgba(94,234,212,0.08)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b6f5e8]">
            <span aria-hidden className="status-pulse__dot" />
            <span className="break-words">{project.status}</span>
          </p>
        ) : null}

        {project.domains.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.domains.map((domain) => (
              <li key={domain} className="tech-chip">
                {domain}
              </li>
            ))}
          </ul>
        ) : null}
      </FadeBlock>

      {project.key === "enterpriseErp" ? (
        <section className="mt-8 min-w-0">
          <ProductPreview />
        </section>
      ) : null}

      <section className="mt-8 min-w-0">
        <h4 className="case-section-label">{t("problem")}</h4>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed break-words text-[var(--muted-strong)] md:text-base">
          {project.problem}
        </p>
      </section>

      {project.owned.length > 0 ? (
        <section className="mt-7 min-w-0">
          <h4 className="case-section-label">{t("owned")}</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.owned.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-xs text-[var(--muted-strong)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-7 min-w-0">
        <h4 className="case-section-label">{t("architecture")}</h4>
        <div className="mt-3">
          <ArchitectureDiagram
            architecture={project.architecture}
            dataLayerLabel={project.dataLayerLabel}
          />
        </div>
      </section>

      {project.decisions.length > 0 ? (
        <section className="mt-8 min-w-0">
          <h4 className="case-section-label">{t("decisions")}</h4>
          <ol className="mt-4 space-y-5">
            {project.decisions.map((decision, index) => (
              <li key={decision.title} className="case-decision min-w-0">
                <p className="text-sm font-semibold break-words text-[var(--foreground)] md:text-base">
                  <span className="mr-2 font-mono text-xs text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {decision.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed break-words text-[var(--muted-strong)]">
                  {decision.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.impactStats.length > 0 ? (
        <section className="mt-8 min-w-0">
          <h4 className="case-section-label">{t("impact")}</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.impactStats.map((stat) => (
              <div
                key={`${stat.label}-${stat.value}`}
                className="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] px-3.5 py-3"
              >
                <p className="font-mono text-lg font-semibold tracking-tight text-[var(--accent)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug break-words text-[var(--muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 min-w-0">
        <h4 className="case-section-label">{t("stack")}</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={`${project.key}-${item}`} className="tech-chip">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {project.standing ? (
        <section className="mt-8 min-w-0">
          <h4 className="case-section-label">{t("standing")}</h4>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed break-words text-[var(--muted-strong)]">
            {project.standing}
          </p>
        </section>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.href ? (
          <a
            className="btn-primary !min-h-10 !px-4 !py-2 !text-sm"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tCard("viewReference")}
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            className="inline-flex max-w-full min-h-11 items-center break-words rounded-sm text-sm font-medium text-[var(--muted-strong)] underline decoration-[var(--glass-border-strong)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:decoration-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tCard("viewGitHub")}
          </a>
        ) : null}
        {!project.href && !project.githubUrl && showNda ? (
          <p className="text-xs leading-relaxed break-words text-[var(--muted)]">
            {tCard("ndaNote")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
