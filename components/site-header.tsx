"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { personName } from "@/data/portfolio-meta";

type NavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navItems: NavItem[];
  ctaLabel: string;
};

function sectionIdFromHref(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

export function SiteHeader({ navItems, ctaLabel }: SiteHeaderProps) {
  const [activeHref, setActiveHref] = useState<string>("");
  const sectionIds = useMemo(
    () => navItems.map((item) => sectionIdFromHref(item.href)).join("|"),
    [navItems],
  );

  useEffect(() => {
    const ids = sectionIds.split("|").filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const syncActive = () => {
      if (window.scrollY < 80) {
        setActiveHref("");
        return;
      }

      const probe = 130;
      let current = "";

      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        if (top <= probe) {
          current = `#${el.id}`;
        }
      }

      setActiveHref(current);
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [sectionIds]);

  return (
    <header className="sticky top-0 z-[100] px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="glass-nav mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-[var(--radius-xl)] px-3 py-2.5 sm:px-4 md:flex-nowrap md:rounded-[var(--radius-pill)] md:py-2">
        <a
          href="#top"
          className="inline-flex min-h-11 min-w-0 max-w-[min(100%,16rem)] items-center gap-2.5 rounded-full px-1.5 text-sm font-semibold tracking-wide text-[var(--foreground)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]"
        >
          <Image
            src="/brand-logo-light.png"
            alt={`${personName} logo`}
            width={26}
            height={26}
            className="h-[26px] w-[26px] shrink-0 rounded-md object-cover ring-1 ring-white/15"
          />
          <span className="truncate">{personName}</span>
        </a>

        <nav aria-label="Section navigation" className="hidden min-w-0 flex-1 md:block">
          <ul className="flex items-center justify-center gap-0.5 lg:gap-1">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                <a
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          </ul>
        </nav>

        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            className="btn-secondary hidden !min-h-9 !px-4 !py-1.5 text-xs sm:inline-flex"
            href="#contact"
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      <nav
        aria-label="Section navigation"
        className="mx-auto mt-2 max-w-6xl md:hidden"
      >
        <ul className="glass-nav flex gap-1 overflow-x-auto rounded-[var(--radius-pill)] px-2 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <a
                  className={`nav-link min-h-11 px-3.5 text-xs font-medium ${isActive ? "nav-link-active" : ""}`}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
