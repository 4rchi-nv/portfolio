"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { usePortfolioMode } from "@/components/portfolio-mode-provider";
import { personName } from "@/data/portfolio-meta";
import { COMMAND_PALETTE_EVENT } from "@/lib/events";
import type { PortfolioMode } from "@/lib/portfolio-mode";

export type NavItem = {
  label: string;
  shortLabel: string;
  href: string;
  modes?: PortfolioMode[];
};

type SiteHeaderProps = {
  navItems: NavItem[];
  ctaLabel: string;
};

function sectionIdFromHref(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

function CommandPaletteTrigger() {
  const t = useTranslations("CommandPalette");
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  return (
    <button
      type="button"
      className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] px-2.5 py-1.5 text-xs text-[var(--muted-strong)] shadow-[var(--glass-inset)] transition-colors hover:border-[var(--glass-border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]"
      aria-label={t("open")}
      onClick={() => {
        window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
      }}
    >
      <span className="font-mono text-[var(--accent)]">&gt;_</span>
      <kbd className="rounded border border-[var(--glass-border)] bg-[rgba(0,0,0,0.25)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}

export function SiteHeader({ navItems, ctaLabel }: SiteHeaderProps) {
  const { mode } = usePortfolioMode();
  const [activeHref, setActiveHref] = useState<string>("");

  const visibleNav = useMemo(
    () =>
      navItems.filter(
        (item) => !item.modes || item.modes.includes(mode),
      ),
    [navItems, mode],
  );

  const sectionIds = useMemo(
    () => visibleNav.map((item) => sectionIdFromHref(item.href)).join("|"),
    [visibleNav],
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

  const bottomCols =
    visibleNav.length <= 4
      ? "grid-cols-4"
      : visibleNav.length === 5
        ? "grid-cols-5"
        : "grid-cols-3 sm:grid-cols-6";

  return (
    <>
      <header className="sticky top-0 z-[100] px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="glass-nav mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] items-center gap-x-3 rounded-[var(--radius-xl)] px-3 py-2 sm:px-4 xl:rounded-[var(--radius-pill)]">
          <a
            href="#top"
            className="inline-flex min-h-10 min-w-0 max-w-[11rem] items-center gap-2 rounded-full px-1 text-sm font-semibold tracking-wide text-[var(--foreground)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)] sm:max-w-[14rem]"
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

          <nav
            aria-label="Section navigation"
            className="hidden min-w-0 justify-center xl:flex"
          >
            <ul className="flex max-w-full flex-wrap items-center justify-center gap-0.5">
              {visibleNav.map((item) => {
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

          <div className="col-start-3 flex shrink-0 items-center justify-end gap-2.5 sm:gap-3">
            <CommandPaletteTrigger />
            <ModeToggle />
            <LanguageSwitcher />
            <a
              className="btn-secondary hidden !min-h-9 !px-3.5 !py-1.5 text-xs sm:inline-flex"
              href="#contact"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </header>

      <nav
        aria-label="Section navigation"
        className="bottom-dock xl:hidden"
      >
        <ul className={`mx-auto grid w-full max-w-lg gap-1 ${bottomCols}`}>
          {visibleNav.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href} className="min-w-0">
                <a
                  className={`bottom-dock__link ${isActive ? "bottom-dock__link--active" : ""}`}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  title={item.label}
                >
                  <span className="bottom-dock__dot" aria-hidden />
                  <span className="truncate">{item.shortLabel}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
