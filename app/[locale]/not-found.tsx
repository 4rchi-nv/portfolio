import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-4 overflow-hidden px-4 py-20 text-center text-[var(--foreground)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(126,184,232,0.14),transparent_60%)]"
      />
      <p className="relative text-sm uppercase tracking-[0.2em] text-[var(--muted)]">404</p>
      <h1 className="relative text-balance text-2xl font-semibold text-[var(--foreground)]">
        {t("title")}
      </h1>
      <p className="relative max-w-md text-sm text-[var(--muted)]">{t("description")}</p>
      <Link className="btn-primary relative" href="/">
        {t("backHome")}
      </Link>
    </div>
  );
}
