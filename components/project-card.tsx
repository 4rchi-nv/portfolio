import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-100">{project.name}</h3>
        <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-300">
          {project.tag}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-zinc-300">{project.description}</p>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-zinc-200">
          <span className="font-medium text-zinc-100">Contribution:</span>{" "}
          {project.contribution}
        </p>
        <p className="text-sm text-zinc-200">
          <span className="font-medium text-zinc-100">Why it matters:</span>{" "}
          {project.whyItMatters}
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={`${project.name}-${item}`}
            className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200"
          >
            {item}
          </li>
        ))}
      </ul>

      {project.href ? (
        <a
          className="mt-5 inline-flex items-center text-sm font-medium text-zinc-100 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400"
          href={project.href}
          target="_blank"
          rel="noreferrer"
        >
          View reference
        </a>
      ) : (
        <p className="mt-5 text-xs text-zinc-500">
          Public link is not available for this project.
        </p>
      )}
    </article>
  );
}
