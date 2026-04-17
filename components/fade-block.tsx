"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function FadeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <motion.div className={className} {...fadeInProps(isMobile, reduced)}>
      {children}
    </motion.div>
  );
}
