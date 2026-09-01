"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { staggerItemProps } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

type HeroBlockProps = {
  location: string;
  title: string;
  stack: string;
  subtitle: string;
  viewProjects: string;
  contactMe: string;
  githubLabel: string;
  linkedinLabel: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeHref?: string;
  downloadCvLabel?: string;
  recruiterFacts: string[];
  asidePositioning: string;
  asideBullets: string[];
  profilePhotoAlt: string;
};

export function HeroBlock({
  location,
  title,
  stack,
  subtitle,
  viewProjects,
  contactMe,
  githubLabel,
  linkedinLabel,
  githubUrl,
  linkedinUrl,
  resumeHref,
  downloadCvLabel,
  recruiterFacts,
  asidePositioning,
  asideBullets,
  profilePhotoAlt,
}: HeroBlockProps) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const p = (i: number) => staggerItemProps(i, isMobile, reduced);

  return (
    <>
      <div className="min-w-0">
        <motion.h1
          className="max-w-3xl text-balance break-words text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl md:leading-[1.05]"
          {...p(0)}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-[var(--muted-strong)] md:text-lg"
          {...p(1)}
        >
          {stack}
        </motion.p>
        <motion.p
          className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base"
          {...p(2)}
        >
          {subtitle}
        </motion.p>
        <motion.p
          className="mt-3 text-xs text-[var(--muted)]"
          {...p(3)}
        >
          {location}
        </motion.p>

        <motion.div className="mt-8 flex flex-wrap gap-3" {...p(4)}>
          <a className="btn-primary" href="#projects">
            {viewProjects}
          </a>
          <a className="btn-secondary" href="#contact">
            {contactMe}
          </a>
          <a
            className="btn-secondary"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {githubLabel}
          </a>
          <a
            className="btn-secondary"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkedinLabel}
          </a>
          {resumeHref && downloadCvLabel ? (
            <a
              className="btn-secondary"
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {downloadCvLabel}
            </a>
          ) : null}
        </motion.div>

        <ul className="mt-7 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
          {recruiterFacts.map((fact, i) => (
            <motion.li
              key={fact}
              className="glass-chip rounded-[var(--radius-md)] px-3.5 py-2.5 break-words hyphens-auto text-[var(--muted-strong)]"
              {...p(5 + i)}
            >
              {fact}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.aside
        className="glass-dense min-w-0 rounded-[var(--radius-xl)] p-5 md:p-7"
        {...staggerItemProps(5 + recruiterFacts.length, isMobile, reduced)}
      >
        <div className="mb-5 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--glass-border)] shadow-[var(--shadow-md)]">
          <Image
            src="/arslan-profile.png"
            alt={profilePhotoAlt}
            width={640}
            height={640}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {asidePositioning}
        </p>
        <ul className="mt-4 space-y-3 text-sm text-[var(--muted-strong)]">
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
