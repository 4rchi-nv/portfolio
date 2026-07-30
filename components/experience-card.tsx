"use client";

import { useTranslations } from "next-intl";
import type { ResolvedExperience } from "@/lib/portfolio-content";

interface ExperienceCardProps {
  item: ResolvedExperience;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  const t = useTranslations("Experience");

  const content = (
    <>
      <div className="mb-4 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 break-words text-lg font-semibold text-[var(--foreground)]">
            {item.company}
          </h3>
          {item.url ? (
            <span
              aria-hidden
              className="mt-0.5 shrink-0 text-sm text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
            >
              ↗
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm font-medium break-words text-[var(--muted-strong)]">
          {item.role}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide break-words text-[var(--muted)]">
          {item.period} - {item.location}
        </p>
      </div>

      <ul className="space-y-2">
        {item.points.map((point) => (
          <li
            key={`${item.company}-${point}`}
            className="text-sm break-words text-[var(--muted-strong)] hyphens-auto"
          >
            - {point}
          </li>
        ))}
      </ul>
    </>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.company} — ${t("visit")}`}
        className="glass-interactive group relative block min-w-0 overflow-hidden rounded-[var(--radius-xl)] p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)] md:p-6"
      >
        {content}
      </a>
    );
  }

  return (
    <article className="glass relative min-w-0 overflow-hidden rounded-[var(--radius-xl)] p-5 md:p-6">
      {content}
    </article>
  );
}
