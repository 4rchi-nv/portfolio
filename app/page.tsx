import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { portfolioData } from "@/data/portfolio";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const { person, contacts, hero, expertise, projects, experience, skills } =
    portfolioData;

  return (
    <div className="bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#top" className="text-sm font-semibold tracking-wide text-zinc-200">
            {person.name}
          </a>
          <ul className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6">
        <section className="grid min-h-[78vh] items-center gap-10 border-b border-zinc-900 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {person.location}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-100 md:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {person.role}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-primary" href="#projects">
                View Projects
              </a>
              <a className="btn-secondary" href="#contact">
                Contact Me
              </a>
              <a className="btn-secondary" href={contacts.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn-secondary" href={contacts.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              At a glance
            </p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li>- 5+ years in frontend development</li>
              <li>- React / TypeScript as main delivery stack</li>
              <li>- Telegram WebApp and Bot-oriented product flows</li>
              <li>- REST API and integration-heavy UI delivery</li>
              <li>- Web3 wallet, balance, and transaction UX flows</li>
              <li>- Legacy frontend refactoring and maintainability work</li>
            </ul>
          </aside>
        </section>

        <section className="border-b border-zinc-900 py-14 md:py-18" id="about">
          <SectionTitle
            eyebrow="About"
            title="Frontend developer focused on product delivery, integrations, and maintainable interfaces."
            description={person.summary}
          />
        </section>

        <section className="border-b border-zinc-900 py-14 md:py-18" id="expertise">
          <SectionTitle
            eyebrow="Core Expertise"
            title="What I bring to frontend product teams"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {expertise.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
              >
                <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-zinc-900 py-14 md:py-18" id="projects">
          <SectionTitle
            eyebrow="Selected Projects"
            title="Work spanning Telegram products, integrations, and frontend delivery"
            description="Project descriptions use conservative wording where details are limited to keep claims accurate."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        <section className="border-b border-zinc-900 py-14 md:py-18" id="experience">
          <SectionTitle
            eyebrow="Experience"
            title="Professional background"
            description="Product work in distributed teams, mentoring experience, and practical frontend ownership across different project types."
          />
          <div className="grid gap-4">
            {experience.map((item) => (
              <ExperienceCard key={item.company} item={item} />
            ))}
          </div>
        </section>

        <section className="border-b border-zinc-900 py-14 md:py-18" id="skills">
          <SectionTitle eyebrow="Skills & Toolbox" title="Technology stack and practical tools" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
              >
                <h3 className="text-base font-semibold text-zinc-100">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={`${group.title}-${skill}`}
                      className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 md:py-18" id="contact">
          <SectionTitle
            eyebrow="Contact"
            title="Open to remote frontend opportunities and product collaborations"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <a className="contact-card" href={`mailto:${contacts.email}`}>
              <span>Email</span>
              <strong>{contacts.email}</strong>
            </a>
            <a className="contact-card" href={contacts.telegram} target="_blank" rel="noreferrer">
              <span>Telegram</span>
              <strong>{contacts.telegramHandle}</strong>
            </a>
            <a className="contact-card" href={contacts.github} target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>github.com/4rch-nv</strong>
            </a>
            <a className="contact-card" href={contacts.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>linkedin.com/in/arslan-agajanov</strong>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
