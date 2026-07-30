interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  id,
}: SectionTitleProps) {
  return (
    <header className="mb-6 min-w-0 md:mb-9" id={id}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance break-words text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed break-words text-[var(--muted-strong)] hyphens-auto md:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
