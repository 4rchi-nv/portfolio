"use client";

type MobileNavItem = {
  label: string;
  href: string;
};

export function MobileNav({ items }: { items: MobileNavItem[] }) {
  return (
    <nav
      aria-label="Section navigation"
      className="border-b border-zinc-900/80 bg-zinc-950/90 md:hidden"
    >
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              className="inline-flex whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
