"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function HelpCards({ items }: { items: string[] }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item, i) => (
        <motion.article
          key={item}
          className="glass-interactive rounded-[var(--radius-lg)] p-4 text-sm leading-relaxed break-words text-[var(--muted-strong)] hyphens-auto"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          {item}
        </motion.article>
      ))}
    </div>
  );
}
