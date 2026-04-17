"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale();
  const pathname = usePathname() || "/";

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="relative z-[60] isolate inline-flex min-h-11 shrink-0 select-none items-center rounded-full border border-zinc-800/90 bg-zinc-900/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md [touch-action:manipulation]"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        const label = loc === "en" ? t("en") : t("ru");

        if (active) {
          return (
            <span
              key={loc}
              aria-current="true"
              title={label}
              className="flex min-h-9 min-w-[3rem] cursor-default items-center justify-center rounded-full bg-zinc-100 px-3 py-2 text-xs font-semibold tracking-wide text-zinc-950 shadow-sm"
            >
              <span className="sr-only">{label}</span>
              <span aria-hidden>{loc.toUpperCase()}</span>
            </span>
          );
        }

        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            scroll={false}
            title={label}
            className="flex min-h-9 min-w-[3rem] items-center justify-center rounded-full px-3 py-2 text-xs font-semibold tracking-wide text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100 active:bg-zinc-800"
          >
            <span className="sr-only">{label}</span>
            <span aria-hidden>{loc.toUpperCase()}</span>
          </Link>
        );
      })}
    </div>
  );
}
