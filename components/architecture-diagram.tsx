"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ArchitectureMeta } from "@/data/portfolio-meta";
import { useIsMobile } from "@/hooks/use-is-mobile";

type ArchitectureDiagramProps = {
  architecture: ArchitectureMeta;
  dataLayerLabel: string;
};

export function ArchitectureDiagram({
  architecture,
  dataLayerLabel,
}: ArchitectureDiagramProps) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const nodes = architecture.flow;

  return (
    <div className="architecture-diagram min-w-0 overflow-x-auto">
      <div
        className={`flex min-w-0 ${isMobile ? "flex-col gap-3" : "items-stretch gap-2"}`}
      >
        {nodes.map((node, index) => (
          <div
            key={node.id}
            className={`flex min-w-0 ${isMobile ? "flex-col" : "flex-1 items-center"}`}
          >
            <motion.div
              className="architecture-node glass-interactive w-full min-w-0 rounded-[var(--radius-lg)] px-3.5 py-3"
              initial={reduced ? false : { opacity: 1, y: 10 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.4,
                ease: [0.2, 0.85, 0.2, 1],
                delay: reduced ? 0 : Math.min(index * 0.08, 0.4),
              }}
            >
              <p className="text-sm font-semibold break-words text-[var(--foreground)]">
                {node.label}
              </p>
              {node.subtitle ? (
                <p className="mt-1 text-xs leading-snug break-words text-[var(--muted)]">
                  {node.subtitle}
                </p>
              ) : null}
            </motion.div>

            {index < nodes.length - 1 ? (
              <div
                aria-hidden
                className={`architecture-connector shrink-0 ${
                  isMobile
                    ? "mx-auto h-5 w-px"
                    : "mx-1 flex h-px w-4 items-center md:w-5"
                }`}
              >
                <motion.span
                  className={`block bg-[var(--accent)] ${
                    isMobile ? "h-full w-px origin-top" : "h-px w-full origin-left"
                  }`}
                  initial={reduced ? false : { scaleX: isMobile ? 1 : 0, scaleY: isMobile ? 0 : 1 }}
                  whileInView={
                    reduced
                      ? undefined
                      : { scaleX: 1, scaleY: 1 }
                  }
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.2, 0.85, 0.2, 1],
                    delay: reduced ? 0 : 0.12 + Math.min(index * 0.08, 0.35),
                  }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {architecture.dataLayer?.length ? (
        <motion.div
          className="mt-4 flex min-w-0 flex-wrap items-center gap-2"
          initial={reduced ? false : { opacity: 1, y: 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: [0.2, 0.85, 0.2, 1], delay: 0.2 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {dataLayerLabel}
          </span>
          {architecture.dataLayer.map((item) => (
            <span key={item} className="tech-chip">
              {item}
            </span>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
}
