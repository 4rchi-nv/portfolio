"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ResolvedCertification } from "@/lib/portfolio-content";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function CertificationsList({ items }: { items: ResolvedCertification[] }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="grid min-w-0 gap-3 md:gap-4">
      {items.map((item, i) => (
        <motion.div key={`${item.title}-${item.year}`} {...staggerItemProps(i, isMobile, reduced)}>
          <article className="glass-interactive min-w-0 overflow-hidden rounded-[var(--radius-xl)] px-5 py-4 md:px-6 md:py-5">
            <h3 className="text-sm font-medium leading-relaxed break-words text-[var(--foreground)] md:text-base">
              {item.title}
            </h3>
            <p className="mt-2 text-xs uppercase tracking-wide break-words text-[var(--muted)]">
              {item.provider} · {item.year}
            </p>
          </article>
        </motion.div>
      ))}
    </div>
  );
}
