"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  skillGroupOrder,
  skillItems,
  type SkillGroupKey,
} from "@/data/portfolio-meta";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

type SkillsGridProps = {
  titles: Record<SkillGroupKey, string>;
};

export function SkillsGrid({ titles }: SkillsGridProps) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {skillGroupOrder.map((key, i) => (
        <motion.article
          key={key}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          <h3 className="text-base font-semibold break-words text-zinc-100">{titles[key]}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {skillItems[key].map((skill) => (
              <li
                key={`${key}-${skill}`}
                className="max-w-full break-all rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
