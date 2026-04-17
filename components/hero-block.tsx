"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

type HeroBlockProps = {
  location: string;
  title: string;
  role: string;
  subtitle: string;
  viewProjects: string;
  contactMe: string;
  githubLabel: string;
  linkedinLabel: string;
  githubUrl: string;
  linkedinUrl: string;
  recruiterFacts: string[];
  asidePositioning: string;
  asideBullets: string[];
};

export function HeroBlock({
  location,
  title,
  role,
  subtitle,
  viewProjects,
  contactMe,
  githubLabel,
  linkedinLabel,
  githubUrl,
  linkedinUrl,
  recruiterFacts,
  asidePositioning,
  asideBullets,
}: HeroBlockProps) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const p = (i: number) => staggerItemProps(i, isMobile, reduced);

  return (
    <>
      <div className="min-w-0">
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400"
          {...p(0)}
        >
          {location}
        </motion.p>
        <motion.h1
          className="max-w-3xl text-balance break-words text-3xl font-semibold tracking-tight text-zinc-100 md:text-5xl md:leading-[1.05]"
          {...p(1)}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg"
          {...p(2)}
        >
          {role}
        </motion.p>
        <motion.p
          className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base"
          {...p(3)}
        >
          {subtitle}
        </motion.p>

        <motion.div className="mt-8 flex flex-wrap gap-3" {...p(4)}>
          <a className="btn-primary" href="#projects">
            {viewProjects}
          </a>
          <a className="btn-secondary" href="#contact">
            {contactMe}
          </a>
          <a className="btn-secondary" href={githubUrl} target="_blank" rel="noreferrer">
            {githubLabel}
          </a>
          <a className="btn-secondary" href={linkedinUrl} target="_blank" rel="noreferrer">
            {linkedinLabel}
          </a>
        </motion.div>

        <ul className="mt-7 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {recruiterFacts.map((fact, i) => (
            <motion.li
              key={fact}
              className="rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-3 py-2 break-words hyphens-auto"
              {...p(5 + i)}
            >
              {fact}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.aside
        className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-7"
        {...staggerItemProps(5 + recruiterFacts.length, isMobile, reduced)}
      >
        <div className="mb-5 overflow-hidden rounded-xl border border-zinc-800">
          <Image
            src="/arslan-profile.png"
            alt=""
            width={640}
            height={640}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {asidePositioning}
        </p>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          {asideBullets.map((line) => (
            <li key={line} className="break-words hyphens-auto">
              - {line}
            </li>
          ))}
        </ul>
      </motion.aside>
    </>
  );
}
