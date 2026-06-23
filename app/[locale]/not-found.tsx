import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-zinc-950 px-4 py-20 text-center text-zinc-200">
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">404</p>
      <h1 className="text-balance text-2xl font-semibold text-zinc-100">{t("title")}</h1>
      <p className="max-w-md text-sm text-zinc-400">{t("description")}</p>
      <Link
        className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        href="/"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
