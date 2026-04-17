"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExperienceCard } from "@/components/experience-card";
import type { ResolvedExperience } from "@/lib/portfolio-content";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function ExperienceList({ items }: { items: ResolvedExperience[] }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="grid min-w-0 gap-3 md:gap-4">
      {items.map((item, i) => (
        <motion.div key={item.company} {...staggerItemProps(i, isMobile, reduced)}>
          <ExperienceCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}
