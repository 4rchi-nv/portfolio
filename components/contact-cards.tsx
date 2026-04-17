"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export type ContactCardItem = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export function ContactCards({ items }: { items: ContactCardItem[] }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      {items.map((item, i) => (
        <motion.div
          key={item.href}
          className="min-h-0 w-full min-w-0"
          {...staggerItemProps(i, isMobile, reduced)}
        >
          <a
            className="contact-card flex h-full min-h-[3.5rem] w-full flex-col justify-between gap-3 py-4"
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <span className="shrink-0">{item.label}</span>
            <strong className="mt-0 flex-1 text-pretty break-words text-base font-medium leading-snug text-zinc-100">
              {item.value}
            </strong>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
