"use client";

import { useTranslations } from "next-intl";
import { resumeHref } from "@/data/portfolio-meta";

export function CurrentStatus() {
  const t = useTranslations("CurrentStatus");

  return (
    <div className="glass-interactive rounded-[var(--radius-xl)] p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="status-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(94,234,212,0.28)] bg-[rgba(94,234,212,0.08)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b6f5e8]">
          <span aria-hidden className="status-pulse__dot" />
          {t("badge")}
        </span>
        <span className="text-xs text-[var(--muted)]">{t("focusLabel")}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">
        {t("title")}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-strong)]">
        {t("description")}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {(t.raw("chips") as string[]).map((chip) => (
          <li key={chip} className="tech-chip">
            {chip}
          </li>
        ))}
      </ul>
      {resumeHref ? (
        <div className="mt-5">
          <a
            className="btn-primary !min-h-10 !px-4 !py-2 !text-sm"
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            download="Arslan_Agajanov_Resume_EN.pdf"
          >
            {t("downloadCv")}
          </a>
        </div>
      ) : null}
    </div>
  );
}
