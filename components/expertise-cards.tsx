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
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          <h3 className="text-base font-semibold break-words text-zinc-100">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed break-words text-zinc-300 hyphens-auto">
            {item.text}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
