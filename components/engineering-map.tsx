"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeBlock } from "@/components/fade-block";
import { SectionTitle } from "@/components/section-title";
import { useIsMobile } from "@/hooks/use-is-mobile";

type MapNode = {
  id: string;
  title: string;
  blurb: string;
  href?: string;
  tags: string[];
};

type MapBranch = {
  id: string;
  label: string;
  nodes: MapNode[];
};

export function EngineeringMap() {
  const t = useTranslations("EngineeringMap");
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const branches = useMemo((): MapBranch[] => {
    const raw = t.raw("branches") as Record<
      string,
      { label: string; nodes: MapNode[] }
    >;
    const order = ["enterprise", "web3", "product", "telegram", "systems"];
    const result: MapBranch[] = [];
    for (const id of order) {
      const branch = raw[id];
      if (!branch) continue;
      result.push({ id, label: branch.label, nodes: branch.nodes });
    }
    return result;
  }, [t]);

  const flatNodes = useMemo(
    () => branches.flatMap((branch) => branch.nodes.map((node) => ({ ...node, branchId: branch.id }))),
    [branches],
  );

  const activeNode = flatNodes.find((node) => node.id === activeId) ?? null;

  return (
    <div className="min-w-0">
      <FadeBlock>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </FadeBlock>

      <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="glass-interactive relative min-w-0 overflow-hidden rounded-[var(--radius-xl)] p-4 md:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 45%, rgba(126,184,232,0.16), transparent 42%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "auto, 28px 28px, 28px 28px",
            }}
          />

          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              className="map-hub relative z-10 flex size-24 items-center justify-center rounded-full border border-[rgba(126,184,232,0.35)] bg-[rgba(126,184,232,0.12)] text-center shadow-[0_0_40px_rgba(126,184,232,0.18)] md:size-28"
              initial={reduced ? false : { scale: 0.92, opacity: 1 }}
              whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.2, 0.85, 0.2, 1] }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {t("hubEyebrow")}
                </p>
                <p className="mt-1 font-mono text-sm font-semibold tracking-wide text-[var(--foreground)] md:text-base">
                  {t("center")}
                </p>
              </div>
            </motion.div>

            <div
              className={`relative z-10 grid w-full gap-3 ${
                isMobile ? "grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {branches.map((branch, branchIndex) => (
                <motion.div
                  key={branch.id}
                  className="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[rgba(8,10,16,0.55)] p-3"
                  initial={reduced ? false : { y: 12, opacity: 1 }}
                  whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : Math.min(branchIndex * 0.06, 0.3),
                    ease: [0.2, 0.85, 0.2, 1],
                  }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {branch.label}
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {branch.nodes.map((node) => {
                      const isActive = activeId === node.id;
                      const className = `map-node block w-full rounded-[var(--radius-md)] border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)] ${
                        isActive
                          ? "border-[rgba(126,184,232,0.45)] bg-[rgba(126,184,232,0.12)]"
                          : "border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--glass-border-strong)] hover:bg-[rgba(255,255,255,0.06)]"
                      }`;
                      const body = (
                        <>
                          <span className="block text-sm font-medium text-[var(--foreground)]">
                            {node.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-[var(--muted)]">
                            {node.tags.slice(0, 3).join(" · ")}
                          </span>
                        </>
                      );

                      return (
                        <li key={node.id}>
                          {node.href ? (
                            <a
                              href={node.href}
                              className={className}
                              onMouseEnter={() => setActiveId(node.id)}
                              onFocus={() => setActiveId(node.id)}
                            >
                              {body}
                            </a>
                          ) : (
                            <button
                              type="button"
                              className={className}
                              onMouseEnter={() => setActiveId(node.id)}
                              onFocus={() => setActiveId(node.id)}
                              onClick={() => setActiveId(node.id)}
                            >
                              {body}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <aside className="glass-interactive min-h-[12rem] rounded-[var(--radius-xl)] p-5 md:p-6">
          {activeNode ? (
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {t("preview")}
              </p>
              <h3 className="mt-2 text-lg font-semibold break-words text-[var(--foreground)]">
                {activeNode.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed break-words text-[var(--muted-strong)]">
                {activeNode.blurb}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {activeNode.tags.map((tag) => (
                  <li key={`${activeNode.id}-${tag}`} className="tech-chip">
                    {tag}
                  </li>
                ))}
              </ul>
              {activeNode.href ? (
                <a
                  className="btn-primary mt-5 inline-flex !min-h-10 !px-4 !py-2 !text-sm"
                  href={activeNode.href}
                >
                  {t("viewCase")}
                </a>
              ) : (
                <p className="mt-5 text-xs text-[var(--muted)]">{t("noCase")}</p>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[10rem] items-center">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {t("idleHint")}
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
