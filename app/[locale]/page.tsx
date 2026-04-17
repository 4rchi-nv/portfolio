import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ContactCards } from "@/components/contact-cards";
import { ExpertiseCards } from "@/components/expertise-cards";
import { ExperienceList } from "@/components/experience-list";
import { FadeBlock } from "@/components/fade-block";
import { HelpCards } from "@/components/help-cards";
import { HeroBlock } from "@/components/hero-block";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PaperSection } from "@/components/paper-section";
import { ProjectsSection } from "@/components/projects-section";
import { SectionTitle } from "@/components/section-title";
import { SkillsGrid } from "@/components/skills-grid";
import { personName } from "@/data/portfolio-meta";
import {
  getPortfolioStrings,
  getResolvedExperience,
  getResolvedProjects,
} from "@/lib/portfolio-content";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("Nav");
  const tHero = await getTranslations("Hero");
  const tAside = await getTranslations("Aside");
  const tSections = await getTranslations("Sections");
  const tContact = await getTranslations("Contact");

  const portfolio = await getPortfolioStrings();
  const projects = await getResolvedProjects();
  const experience = await getResolvedExperience();

  const navItems = [
    { label: tNav("projects"), href: "#projects" },
    { label: tNav("experience"), href: "#experience" },
    { label: tNav("skills"), href: "#skills" },
    { label: tNav("contact"), href: "#contact" },
  ];

  return (
    <div className="min-h-dvh w-full min-w-0 overflow-x-clip bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
      <header className="sticky top-0 z-[100] border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/75">
        <nav className="relative z-[100] mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 md:flex-nowrap md:px-6">
          <a
            href="#top"
            className="inline-flex min-w-0 max-w-[min(100%,18rem)] items-center gap-2.5 text-sm font-semibold tracking-wide text-zinc-200"
          >
            <Image
              src="/brand-logo-light.png"
              alt=""
              width={26}
              height={26}
              className="h-[26px] w-[26px] shrink-0 rounded-sm object-cover"
            />
            <span className="truncate">{personName}</span>
          </a>
          <ul className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-2 md:flex md:justify-center lg:gap-x-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="whitespace-nowrap text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <LanguageSwitcher />
            <a
              className="hidden text-sm text-zinc-300 transition-colors hover:text-zinc-100 sm:inline"
              href="#contact"
            >
              {tNav("cta")}
            </a>
          </div>
        </nav>
      </header>

      <main
        id="top"
        className="mx-auto w-full min-w-0 max-w-6xl overflow-x-clip px-4 pb-16 pt-0 sm:px-5 md:px-6 md:pb-20"
      >
        <PaperSection className="section-wrap section-divider grid items-center gap-8 pt-10 max-md:min-h-0 md:min-h-[min(76vh,920px)] md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pt-16">
          <HeroBlock
            location={portfolio.person.location}
            title={portfolio.hero.title}
            role={portfolio.person.role}
            subtitle={portfolio.hero.subtitle}
            viewProjects={tHero("viewProjects")}
            contactMe={tHero("contactMe")}
            githubLabel={tHero("github")}
            linkedinLabel={tHero("linkedin")}
            githubUrl={portfolio.contacts.github}
            linkedinUrl={portfolio.contacts.linkedin}
            recruiterFacts={portfolio.recruiterFacts}
            asidePositioning={tAside("positioning")}
            asideBullets={tAside.raw("bullets") as string[]}
          />
        </PaperSection>

        <PaperSection className="section-wrap section-divider" id="about">
          <FadeBlock>
            <SectionTitle
              eyebrow={tSections("aboutEyebrow")}
              title={tSections("aboutTitle")}
              description={portfolio.person.summary}
            />
          </FadeBlock>
        </PaperSection>

        <PaperSection className="section-wrap section-divider" id="help">
          <FadeBlock>
            <SectionTitle
              eyebrow={tSections("helpEyebrow")}
              title={tSections("helpTitle")}
            />
          </FadeBlock>
          <HelpCards items={portfolio.helpWith} />
        </PaperSection>

        <PaperSection className="section-wrap section-divider" id="expertise">
          <FadeBlock>
            <SectionTitle
              eyebrow={tSections("expertiseEyebrow")}
              title={tSections("expertiseTitle")}
            />
          </FadeBlock>
          <ExpertiseCards items={portfolio.expertise} />
        </PaperSection>

        <PaperSection
          className="section-wrap section-wrap-dense section-divider"
          id="projects"
        >
          <ProjectsSection projects={projects} />
        </PaperSection>

        <PaperSection
          className="section-wrap section-wrap-dense section-divider"
          id="experience"
        >
          <FadeBlock>
            <SectionTitle
              eyebrow={tSections("experienceEyebrow")}
              title={tSections("experienceTitle")}
              description={tSections("experienceDescription")}
            />
          </FadeBlock>
          <ExperienceList items={experience} />
        </PaperSection>

        <PaperSection className="section-wrap section-divider" id="skills">
          <FadeBlock>
            <SectionTitle
              eyebrow={tSections("skillsEyebrow")}
              title={tSections("skillsTitle")}
            />
          </FadeBlock>
          <SkillsGrid titles={portfolio.skills} />
        </PaperSection>

        <PaperSection className="section-wrap" id="contact">
          <FadeBlock>
            <SectionTitle
              eyebrow={tSections("contactEyebrow")}
              title={tSections("contactTitle")}
              description={tSections("contactDescription", {
                phone: portfolio.contacts.phone,
              })}
            />
          </FadeBlock>
          <ContactCards
            items={[
              {
                label: tContact("email"),
                value: portfolio.contacts.email,
                href: `mailto:${portfolio.contacts.email}`,
              },
              {
                label: tContact("telegram"),
                value: portfolio.contacts.telegramHandle,
                href: portfolio.contacts.telegram,
                external: true,
              },
              {
                label: tContact("github"),
                value: tContact("githubValue"),
                href: portfolio.contacts.github,
                external: true,
              },
              {
                label: tContact("linkedin"),
                value: tContact("linkedinValue"),
                href: portfolio.contacts.linkedin,
                external: true,
              },
            ]}
          />
        </PaperSection>
      </main>
    </div>
  );
}
