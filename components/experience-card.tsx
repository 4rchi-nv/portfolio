import type { ResolvedExperience } from "@/lib/portfolio-content";

interface ExperienceCardProps {
  item: ResolvedExperience;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className="relative min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-6">
      <div className="mb-4 min-w-0">
        <h3 className="text-lg font-semibold break-words text-zinc-100">{item.company}</h3>
        <p className="mt-1 text-sm font-medium break-words text-zinc-300">{item.role}</p>
        <p className="mt-1 text-xs uppercase tracking-wide break-words text-zinc-500">
          {item.period} - {item.location}
        </p>
      </div>

      <ul className="space-y-2">
        {item.points.map((point) => (
          <li
            key={`${item.company}-${point}`}
            className="text-sm break-words text-zinc-300 hyphens-auto"
          >
            - {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
