"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const STEPS = ["scan", "filter", "sort", "drawer"] as const;
type Step = (typeof STEPS)[number];

const rows = [
  { id: "INV-1042", party: "Nordic Logistics", amount: "€12,480", status: "Paid" },
  { id: "INV-1043", party: "Atlas Warehousing", amount: "€4,210", status: "Open" },
  { id: "INV-1044", party: "Helix Retail", amount: "€19,050", status: "Review" },
  { id: "INV-1045", party: "Orbit HR Ops", amount: "€2,860", status: "Open" },
];

export function ProductPreview() {
  const t = useTranslations("ProductPreview");
  const reduced = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const step: Step = STEPS[stepIndex];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduced]);

  const filteredRows =
    step === "filter" || step === "drawer"
      ? rows.filter((row) => row.status === "Open")
      : step === "sort"
        ? [...rows].sort((a, b) => b.amount.localeCompare(a.amount))
        : rows;

  return (
    <div className="product-preview min-w-0">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="case-section-label">{t("label")}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">{t("caption")}</p>
        </div>
        <p className="rounded-full border border-[var(--glass-border)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--muted-strong)]">
          {t(`steps.${step}`)}
        </p>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[rgba(8,10,16,0.88)] shadow-[var(--shadow-md)]">
        <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate rounded-md border border-[var(--glass-border)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]">
            erp.internal / finance / invoices
          </span>
        </div>

        <div className="relative min-h-[220px] overflow-hidden p-3 md:min-h-[240px] md:p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div
              className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
                step === "filter" || step === "drawer"
                  ? "border-[rgba(126,184,232,0.45)] bg-[rgba(126,184,232,0.12)] text-[var(--foreground)]"
                  : "border-[var(--glass-border)] text-[var(--muted)]"
              }`}
            >
              {t("filterChip")}
            </div>
            <div className="rounded-md border border-[var(--glass-border)] px-2.5 py-1.5 text-xs text-[var(--muted)]">
              {t("columnsChip")}
            </div>
            <div className="ml-auto rounded-md bg-[rgba(255,255,255,0.9)] px-2.5 py-1.5 text-xs font-semibold text-[#0a0c12]">
              {t("newButton")}
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-[var(--glass-border)]">
            <div className="grid grid-cols-[1.1fr_1.4fr_0.9fr_0.8fr] gap-2 border-b border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] px-2.5 py-2 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
              <span>{t("colId")}</span>
              <span>{t("colParty")}</span>
              <span className={step === "sort" ? "text-[var(--accent)]" : undefined}>
                {t("colAmount")}
                {step === "sort" ? " ↓" : ""}
              </span>
              <span>{t("colStatus")}</span>
            </div>
            <ul>
              <AnimatePresence initial={false} mode="popLayout">
                {filteredRows.map((row, index) => (
                  <motion.li
                    key={row.id}
                    layout={!reduced}
                    initial={reduced ? false : { opacity: 0.6, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className={`grid grid-cols-[1.1fr_1.4fr_0.9fr_0.8fr] gap-2 border-b border-[rgba(255,255,255,0.04)] px-2.5 py-2 text-xs last:border-b-0 ${
                      step === "drawer" && index === 0
                        ? "bg-[rgba(126,184,232,0.1)]"
                        : ""
                    }`}
                  >
                    <span className="truncate font-mono text-[var(--muted-strong)]">
                      {row.id}
                    </span>
                    <span className="truncate text-[var(--foreground)]">
                      {row.party}
                    </span>
                    <span className="truncate text-[var(--muted-strong)]">
                      {row.amount}
                    </span>
                    <span className="truncate text-[var(--muted)]">{row.status}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          <AnimatePresence>
            {step === "drawer" ? (
              <motion.aside
                initial={reduced ? false : { x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={reduced ? undefined : { x: 24, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.2, 0.85, 0.2, 1] }}
                className="absolute inset-y-3 right-3 w-[min(48%,13rem)] rounded-[var(--radius-md)] border border-[var(--glass-border-strong)] bg-[rgba(12,14,20,0.96)] p-3 shadow-[var(--shadow-lg)] backdrop-blur-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  {t("drawerTitle")}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                  INV-1043
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Atlas Warehousing
                </p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded bg-[rgba(255,255,255,0.08)]" />
                  <div className="h-2 w-4/5 rounded bg-[rgba(255,255,255,0.06)]" />
                  <div className="h-2 w-3/5 rounded bg-[rgba(255,255,255,0.05)]" />
                </div>
                <div className="mt-4 rounded-md bg-[rgba(126,184,232,0.16)] px-2.5 py-1.5 text-center text-[11px] font-semibold text-[var(--accent)]">
                  {t("drawerAction")}
                </div>
              </motion.aside>
            ) : null}
          </AnimatePresence>

          {!reduced ? (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute z-10 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(126,184,232,0.35)] bg-[rgba(126,184,232,0.08)]"
                animate={
                  step === "scan"
                    ? { top: "62%", left: "44%" }
                    : step === "filter"
                      ? { top: "24%", left: "20%" }
                      : step === "sort"
                        ? { top: "40%", left: "70%" }
                        : { top: "50%", left: "80%" }
                }
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                aria-hidden
                className="preview-cursor pointer-events-none absolute z-20"
                animate={
                  step === "scan"
                    ? { top: "58%", left: "42%" }
                    : step === "filter"
                      ? { top: "22%", left: "18%" }
                      : step === "sort"
                        ? { top: "38%", left: "68%" }
                        : { top: "48%", left: "78%" }
                }
                transition={{ duration: 0.55, ease: [0.2, 0.85, 0.2, 1] }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                >
                  <path
                    d="M5.5 3.8 18.2 12.1l-6.1 1.3-2.7 6.4L5.5 3.8Z"
                    fill="white"
                    stroke="rgba(12,14,20,0.85)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="preview-cursor__pulse" />
              </motion.div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
