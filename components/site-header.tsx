"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { NavTabIcon } from "@/components/nav-tab-icon";
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

function CommandPaletteTrigger({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("CommandPalette");
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    const mac = /Mac|iPhone|iPad/.test(navigator.platform);
    setShortcut(mac ? "⌘K" : "Ctrl K");
  }, []);

  return (
    <button
      type="button"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] text-xs text-[var(--muted-strong)] shadow-[var(--glass-inset)] transition-colors hover:border-[var(--glass-border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)] ${
        compact
          ? "h-9 w-9"
          : "min-h-9 gap-1.5 px-2.5 py-1.5"
      }`}
      aria-label={t("open")}
      onClick={() => {
        window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
      }}
    >
      <span className="font-mono text-[var(--accent)]">&gt;_</span>
      {!compact ? (
        <kbd
          className="rounded border border-[var(--glass-border)] bg-[rgba(0,0,0,0.25)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)]"
          suppressHydrationWarning
        >
          {shortcut}
        </kbd>
      ) : null}
    </button>
  );
}

function HeaderMoreMenu({ ctaLabel }: { ctaLabel: string }) {
  const t = useTranslations("Mode");
  const tLang = useTranslations("Language");
  const tHeader = useTranslations("Header");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0 lg:hidden">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] text-[var(--muted-strong)] shadow-[var(--glass-inset)] transition-colors hover:border-[var(--glass-border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]"
        aria-label={tHeader("more")}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <circle cx="6" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="18" cy="12" r="1.6" />
        </svg>
      </button>

      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-label={tHeader("controls")}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[120] w-[min(18rem,calc(100vw-1.5rem))] rounded-[1.15rem] border border-[var(--glass-border)] bg-[rgba(12,14,22,0.96)] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {t("label")}
              </p>
              <ModeToggle />
            </div>
            <div>
              <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {tLang("label")}
              </p>
              <LanguageSwitcher />
            </div>
            <a
              className="btn-primary !min-h-10 !w-full !text-sm"
              href="#contact"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      ) : null}
    </div>
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

  return (
    <>
      <header className="sticky top-0 z-[100] px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="glass-nav mx-auto flex w-full max-w-6xl items-center gap-2 rounded-[1.25rem] px-2.5 py-2 sm:gap-3 sm:px-4 lg:rounded-[var(--radius-pill)]">
          <a
            href="#top"
            className="inline-flex min-h-10 min-w-0 shrink items-center gap-2 rounded-full px-1 text-sm font-semibold tracking-wide text-[var(--foreground)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]"
          >
            <Image
              src="/brand-logo-light.png"
              alt={`${personName} logo`}
              width={26}
              height={26}
              className="h-[26px] w-[26px] shrink-0 rounded-md object-cover ring-1 ring-white/15"
            />
            <span className="hidden truncate sm:inline md:max-w-[9rem] lg:max-w-[12rem] xl:max-w-none">
              {personName}
            </span>
          </a>

          <nav
            aria-label="Section navigation"
            className="mx-auto hidden min-w-0 flex-1 justify-center lg:flex"
          >
            <ul className="flex max-w-full flex-nowrap items-center justify-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visibleNav.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={item.href} className="shrink-0">
                    <a
                      className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="2xl:hidden">{item.shortLabel}</span>
                      <span className="hidden 2xl:inline">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
            <span className="lg:hidden">
              <CommandPaletteTrigger compact />
            </span>
            <span className="hidden lg:inline-flex">
              <CommandPaletteTrigger />
            </span>

            <div className="hidden items-center gap-2 lg:flex">
              <ModeToggle />
              <LanguageSwitcher />
              <a
                className="btn-secondary !min-h-9 !px-3.5 !py-1.5 text-xs"
                href="#contact"
              >
                {ctaLabel}
              </a>
            </div>

            <HeaderMoreMenu ctaLabel={ctaLabel} />
          </div>
        </div>
      </header>

      <nav
        aria-label="Section navigation"
        className="tab-bar fixed bottom-[max(0.7rem,env(safe-area-inset-bottom))] left-1/2 z-[100] w-[min(34rem,calc(100%-1.25rem))] -translate-x-1/2 rounded-[1.45rem] border border-white/12 p-[0.35rem] lg:hidden"
      >
        <ul className="tab-bar__list flex items-stretch justify-between gap-0.5">
          {visibleNav.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href} className="tab-bar__item min-w-0 flex-1">
                <a
                  className={`tab-bar__link flex w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-[1.1rem] px-0.5 py-1.5 text-[var(--muted)] no-underline [-webkit-tap-highlight-color:transparent] ${isActive ? "tab-bar__link--active text-[var(--foreground)]" : ""}`}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  title={item.label}
                >
                  <span className="tab-bar__icon-wrap inline-flex h-7 w-7 items-center justify-center rounded-[0.7rem]" aria-hidden>
                    <NavTabIcon href={item.href} className="tab-bar__icon h-[1.15rem] w-[1.15rem]" />
                  </span>
                  <span className="tab-bar__label max-w-full truncate text-[0.62rem] font-semibold leading-none tracking-tight">
                    {item.shortLabel}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
