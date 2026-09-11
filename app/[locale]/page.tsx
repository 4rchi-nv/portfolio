import { setRequestLocale } from "next-intl/server";
import { CertificationsList } from "@/components/certifications-list";
import { CommandPalette } from "@/components/command-palette";
import { ContactCards } from "@/components/contact-cards";
import { CurrentStatus } from "@/components/current-status";
import { CustomCursor } from "@/components/custom-cursor";
import { EngineeringMap } from "@/components/engineering-map";
import { ExpertiseCards } from "@/components/expertise-cards";
import { ExperienceList } from "@/components/experience-list";
import { FadeBlock } from "@/components/fade-block";
import { HelpCards } from "@/components/help-cards";
import { HeroBlock } from "@/components/hero-block";
import { ImpactMetrics } from "@/components/impact-metrics";
import { ModeVisible } from "@/components/mode-visible";
import { PaperSection } from "@/components/paper-section";
import { PortfolioModeProvider } from "@/components/portfolio-mode-provider";
import { ProjectsSection } from "@/components/projects-section";
import { SectionTitle } from "@/components/section-title";
import { SiteAtmosphere } from "@/components/site-atmosphere";
import { SiteHeader } from "@/components/site-header";
import { SkillsGrid } from "@/components/skills-grid";
import { resumeHref } from "@/data/portfolio-meta";
import {
  getPortfolioStrings,
  getResolvedCaseStudies,
  getResolvedCertifications,
  getResolvedExperience,
  getResolvedRegistryProjects,
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
  const caseStudies = await getResolvedCaseStudies();
  const registryProjects = await getResolvedRegistryProjects();
  const experience = await getResolvedExperience();
  const certifications = await getResolvedCertifications();

  const navItems = [
    {
      label: tNav("impact"),
      shortLabel: tNav("impactShort"),
      href: "#impact",
    },
    {
      label: tNav("map"),
      shortLabel: tNav("mapShort"),
      href: "#map",
      modes: ["engineer" as const],
    },
    {
      label: tNav("projects"),
      shortLabel: tNav("projectsShort"),
      href: "#projects",
    },
    {
      label: tNav("experience"),
      shortLabel: tNav("experienceShort"),
      href: "#experience",
    },
    {
      label: tNav("skills"),
      shortLabel: tNav("skillsShort"),
      href: "#skills",
    },
    {
      label: tNav("contact"),
      shortLabel: tNav("contactShort"),
      href: "#contact",
    },
  ];

  return (
    <PortfolioModeProvider>
      <div className="relative min-h-dvh w-full min-w-0 overflow-x-clip text-[var(--foreground)] selection:bg-[rgba(126,184,232,0.35)] selection:text-slate-50">
        <CustomCursor />
        <SiteAtmosphere />

        <div className="relative z-10">
          <SiteHeader navItems={navItems} ctaLabel={tNav("cta")} />
          <CommandPalette />

          <main
            id="top"
            className="mx-auto w-full min-w-0 max-w-6xl overflow-x-clip px-4 pb-36 pt-2 sm:px-5 md:px-6 md:pb-36 xl:pb-20"
          >
            <PaperSection className="section-wrap section-divider grid items-center gap-8 pt-8 max-md:min-h-0 md:min-h-[min(76vh,920px)] md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pt-14">
              <HeroBlock
                eyebrow={portfolio.hero.eyebrow}
                location={portfolio.person.location}
                title={portfolio.hero.title}
                stack={portfolio.hero.stack}
                subtitle={portfolio.hero.subtitle}
                statusBadge={portfolio.hero.statusBadge}
                viewProjects={tHero("viewProjects")}
                contactMe={tHero("contactMe")}
                githubLabel={tHero("github")}
                linkedinLabel={tHero("linkedin")}
                githubUrl={portfolio.contacts.github}
                linkedinUrl={portfolio.contacts.linkedin}
                recruiterFacts={portfolio.recruiterFacts}
                asidePositioning={tAside("positioning")}
                asideBullets={tAside.raw("bullets") as string[]}
                profilePhotoAlt={tHero("profilePhotoAlt")}
                resumeHref={resumeHref}
                downloadCvLabel={resumeHref ? tHero("downloadCv") : undefined}
              />
            </PaperSection>

            <ModeVisible modes={["recruiter"]}>
              <PaperSection className="section-wrap section-divider" id="about">
                <FadeBlock>
                  <SectionTitle
                    eyebrow={tSections("aboutEyebrow")}
                    title={tSections("aboutTitle")}
                  />
                  <div className="max-w-2xl space-y-3">
                    {portfolio.aboutParagraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed break-words text-[var(--muted-strong)] hyphens-auto md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </FadeBlock>
              </PaperSection>
            </ModeVisible>

            <PaperSection className="section-wrap section-divider" id="impact">
              <FadeBlock>
                <SectionTitle
                  eyebrow={tSections("impactEyebrow")}
                  title={tSections("impactTitle")}
                  description={tSections("impactDescription")}
                />
              </FadeBlock>
              <ImpactMetrics items={portfolio.impact} />
            </PaperSection>

            <ModeVisible modes={["engineer"]}>
              <PaperSection className="section-wrap section-divider" id="map">
                <EngineeringMap />
              </PaperSection>
            </ModeVisible>

            <ModeVisible modes={["engineer"]}>
              <PaperSection className="section-wrap section-divider" id="help">
                <FadeBlock>
                  <SectionTitle
                    eyebrow={tSections("helpEyebrow")}
                    title={tSections("helpTitle")}
                  />
                </FadeBlock>
                <HelpCards items={portfolio.helpWith} />
              </PaperSection>
            </ModeVisible>

            <ModeVisible modes={["engineer"]}>
              <PaperSection className="section-wrap section-divider" id="expertise">
                <FadeBlock>
                  <SectionTitle
                    eyebrow={tSections("expertiseEyebrow")}
                    title={tSections("expertiseTitle")}
                  />
                </FadeBlock>
                <ExpertiseCards items={portfolio.expertise} />
              </PaperSection>
            </ModeVisible>

            <PaperSection
              className="section-wrap section-wrap-dense section-divider"
              id="projects"
            >
              <ProjectsSection cases={caseStudies} registry={registryProjects} />
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

            <ModeVisible modes={["recruiter"]}>
              <PaperSection
                className="section-wrap section-wrap-dense section-divider"
                id="certifications"
              >
                <FadeBlock>
                  <SectionTitle
                    eyebrow={tSections("certificationsEyebrow")}
                    title={tSections("certificationsTitle")}
                  />
                </FadeBlock>
                <CertificationsList items={certifications} />
              </PaperSection>
            </ModeVisible>

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
                  description={tSections("contactDescription")}
                />
              </FadeBlock>
              <div className="mb-5">
                <CurrentStatus />
              </div>
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
                    label: tContact("phone"),
                    value: portfolio.contacts.phone,
                    href: `tel:${portfolio.contacts.phone.replace(/\s/g, "")}`,
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
                  ...(resumeHref
                    ? [
                        {
                          label: tContact("resume"),
                          value: tContact("resumeValue"),
                          href: resumeHref,
                          external: true,
                          download: "Arslan_Agajanov_Resume_EN.pdf",
                        },
                      ]
                    : []),
                ]}
              />
            </PaperSection>
          </main>
        </div>
      </div>
    </PortfolioModeProvider>
  );
}
