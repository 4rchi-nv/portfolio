"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePortfolioMode } from "@/components/portfolio-mode-provider";
import { contacts, resumeHref } from "@/data/portfolio-meta";
import { COMMAND_PALETTE_EVENT } from "@/lib/events";
import type { PortfolioMode } from "@/lib/portfolio-mode";

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  run: () => void;
};

export function CommandPalette() {
  const t = useTranslations("CommandPalette");
  const { mode, setMode } = usePortfolioMode();
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const commands = useMemo<CommandItem[]>(() => {
    const jump = (hash: string) => {
      setOpen(false);
      setQuery("");
      window.location.hash = hash;
    };

    const switchMode = (next: PortfolioMode) => {
      setMode(next);
      setOpen(false);
      setQuery("");
    };

    const switchLocale = (next: "en" | "ru") => {
      setOpen(false);
      setQuery("");
      router.replace(pathname, { locale: next });
    };

    return [
      {
        id: "impact",
        label: t("commands.impact"),
        hint: "#impact",
        group: t("groups.navigate"),
        run: () => jump("impact"),
      },
      ...(mode === "engineer"
        ? [
            {
              id: "map",
              label: t("commands.map"),
              hint: "#map",
              group: t("groups.navigate"),
              run: () => jump("map"),
            } satisfies CommandItem,
          ]
        : []),
      {
        id: "projects",
        label: t("commands.projects"),
        hint: "#projects",
        group: t("groups.navigate"),
        run: () => jump("projects"),
      },
      {
        id: "experience",
        label: t("commands.experience"),
        hint: "#experience",
        group: t("groups.navigate"),
        run: () => jump("experience"),
      },
      {
        id: "skills",
        label: t("commands.skills"),
        hint: "#skills",
        group: t("groups.navigate"),
        run: () => jump("skills"),
      },
      {
        id: "contact",
        label: t("commands.contact"),
        hint: "#contact",
        group: t("groups.navigate"),
        run: () => jump("contact"),
      },
      {
        id: "case-erp",
        label: t("commands.caseErp"),
        hint: "#case-enterpriseErp",
        group: t("groups.cases"),
        run: () => jump("case-enterpriseErp"),
      },
      {
        id: "case-web3",
        label: t("commands.caseWeb3"),
        hint: "#case-web3Fintech",
        group: t("groups.cases"),
        run: () => jump("case-web3Fintech"),
      },
      {
        id: "case-bunker",
        label: t("commands.caseBunker"),
        hint: "#case-bunker",
        group: t("groups.cases"),
        run: () => jump("case-bunker"),
      },
      {
        id: "mode-engineer",
        label: t("commands.modeEngineer"),
        hint: mode === "engineer" ? t("current") : undefined,
        group: t("groups.mode"),
        run: () => switchMode("engineer"),
      },
      {
        id: "mode-recruiter",
        label: t("commands.modeRecruiter"),
        hint: mode === "recruiter" ? t("current") : undefined,
        group: t("groups.mode"),
        run: () => switchMode("recruiter"),
      },
      {
        id: "locale-en",
        label: t("commands.localeEn"),
        hint: locale === "en" ? t("current") : undefined,
        group: t("groups.locale"),
        run: () => switchLocale("en"),
      },
      {
        id: "locale-ru",
        label: t("commands.localeRu"),
        hint: locale === "ru" ? t("current") : undefined,
        group: t("groups.locale"),
        run: () => switchLocale("ru"),
      },
      {
        id: "email",
        label: t("commands.email"),
        hint: contacts.email,
        group: t("groups.actions"),
        run: () => {
          setOpen(false);
          window.location.href = `mailto:${contacts.email}`;
        },
      },
      {
        id: "github",
        label: t("commands.github"),
        group: t("groups.actions"),
        run: () => {
          setOpen(false);
          window.open(contacts.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        label: t("commands.linkedin"),
        group: t("groups.actions"),
        run: () => {
          setOpen(false);
          window.open(contacts.linkedin, "_blank", "noopener,noreferrer");
        },
      },
      ...(resumeHref
        ? [
            {
              id: "resume",
              label: t("commands.resume"),
              hint: "PDF",
              group: t("groups.actions"),
              run: () => {
                setOpen(false);
                window.open(resumeHref, "_blank", "noopener,noreferrer");
              },
            } satisfies CommandItem,
          ]
        : []),
    ];
  }, [t, mode, setMode, locale, pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint?.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isPalette =
        (event.key === "k" || event.key === "K") &&
        (event.metaKey || event.ctrlKey);
      if (isPalette) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onToggle = () => setOpen((prev) => !prev);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_EVENT, onToggle);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_EVENT, onToggle);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const runActive = () => {
    const item = filtered[activeIndex];
    if (item) item.run();
  };

  let lastGroup = "";

  return (
    <div className="command-palette" role="presentation">
      <button
        type="button"
        aria-label={t("close")}
        className="command-palette__backdrop"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        className="command-palette__panel"
      >
        <div className="border-b border-[var(--glass-border)] px-4 py-3">
          <p className="text-[11px] text-[var(--muted)]">{t("hint")}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-mono text-[var(--accent)]">⌘</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveIndex((index) =>
                    Math.min(index + 1, Math.max(filtered.length - 1, 0)),
                  );
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveIndex((index) => Math.max(index - 1, 0));
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  runActive();
                }
              }}
              placeholder={t("placeholder")}
              className="w-full min-w-0 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
              aria-controls={listId}
              aria-autocomplete="list"
              role="combobox"
              aria-expanded
              aria-activedescendant={
                filtered[activeIndex]
                  ? `${listId}-${filtered[activeIndex].id}`
                  : undefined
              }
            />
          </div>
        </div>

        <ul
          id={listId}
          role="listbox"
          className="max-h-[min(50vh,22rem)] overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-[var(--muted)]">
              {t("empty")}
            </li>
          ) : (
            filtered.map((item, index) => {
              const showGroup = item.group !== lastGroup;
              lastGroup = item.group;
              const active = index === activeIndex;
              return (
                <li key={item.id}>
                  {showGroup ? (
                    <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                      {item.group}
                    </p>
                  ) : null}
                  <button
                    id={`${listId}-${item.id}`}
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-[rgba(126,184,232,0.14)] text-[var(--foreground)]"
                        : "text-[var(--muted-strong)] hover:bg-[rgba(255,255,255,0.05)]"
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => item.run()}
                  >
                    <span className="min-w-0 break-words">{item.label}</span>
                    {item.hint ? (
                      <span className="shrink-0 font-mono text-[11px] text-[var(--muted)]">
                        {item.hint}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
