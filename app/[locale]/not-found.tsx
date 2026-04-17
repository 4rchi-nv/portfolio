import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-zinc-950 px-4 py-20 text-center text-zinc-200">
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">404</p>
      <h1 className="text-balance text-2xl font-semibold text-zinc-100">Page not found</h1>
      <p className="max-w-md text-sm text-zinc-400">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500"
        href="/"
      >
        Back home
      </Link>
    </div>
  );
}
