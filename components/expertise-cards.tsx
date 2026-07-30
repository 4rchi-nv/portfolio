"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function ExpertiseCards({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          className="glass-interactive rounded-[var(--radius-xl)] p-5"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          <h3 className="text-base font-semibold break-words text-[var(--foreground)]">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed break-words text-[var(--muted-strong)] hyphens-auto">
            {item.text}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
