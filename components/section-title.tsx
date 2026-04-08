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
    <header className="mb-8 md:mb-10" id={id}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
