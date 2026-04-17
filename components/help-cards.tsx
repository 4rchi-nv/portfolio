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
          className="rounded-xl border border-zinc-800 bg-zinc-900/35 p-4 text-sm leading-relaxed break-words text-zinc-300 hyphens-auto"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          {item}
        </motion.article>
      ))}
    </div>
  );
}
