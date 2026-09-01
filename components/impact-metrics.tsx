"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImpactMetric } from "@/lib/portfolio-content";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function ImpactMetrics({ items }: { items: ImpactMetric[] }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => (
        <motion.article
          key={item.label}
          className="glass-interactive rounded-[var(--radius-xl)] p-5"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          <p className="font-mono text-3xl font-semibold tracking-tight text-[var(--accent)] md:text-4xl">
            {item.value}
          </p>
          <h3 className="mt-3 text-sm font-semibold leading-snug text-[var(--foreground)] md:text-base">
            {item.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)] hyphens-auto">
            {item.context}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
