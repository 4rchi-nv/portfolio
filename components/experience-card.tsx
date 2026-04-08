import type { ExperienceItem } from "@/data/portfolio";

interface ExperienceCardProps {
  item: ExperienceItem;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-zinc-100">{item.company}</h3>
        <p className="mt-1 text-sm font-medium text-zinc-300">{item.role}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
          {item.period} - {item.location}
        </p>
      </div>

      <ul className="space-y-2">
        {item.points.map((point) => (
          <li key={`${item.company}-${point}`} className="text-sm text-zinc-300">
            - {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
