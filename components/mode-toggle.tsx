"use client";

import { useTranslations } from "next-intl";
import { usePortfolioMode } from "@/components/portfolio-mode-provider";
import type { PortfolioMode } from "@/lib/portfolio-mode";

export function ModeToggle() {
  const t = useTranslations("Mode");
  const { mode, setMode } = usePortfolioMode();

  const options: PortfolioMode[] = ["recruiter", "engineer"];

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="relative isolate inline-flex h-9 shrink-0 select-none items-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] p-0.5 shadow-[var(--glass-inset)] backdrop-blur-[var(--blur-sm)] [touch-action:manipulation]"
    >
      {options.map((option) => {
        const active = mode === option;
        const label = t(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            title={label}
            className={`flex h-8 min-w-0 items-center justify-center rounded-full px-2.5 text-[11px] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)] xl:min-w-[4.5rem] xl:px-3 xl:text-xs ${
              active
                ? "bg-[rgba(255,255,255,0.92)] text-[#0a0c12] shadow-sm"
                : "text-[var(--muted-strong)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setMode(option)}
          >
            <span className="xl:hidden">{t(`${option}Short`)}</span>
            <span className="hidden xl:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
