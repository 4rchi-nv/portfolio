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
          className="glass-interactive rounded-[var(--radius-xl)] p-5"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          <h3 className="text-base font-semibold break-words text-[var(--foreground)]">
            {titles[key]}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {skillItems[key].map((skill) => (
              <li key={`${key}-${skill}`} className="tech-chip">
                {skill}
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
