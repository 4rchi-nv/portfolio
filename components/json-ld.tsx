import { contacts, personName, siteUrl } from "@/data/portfolio-meta";

interface JsonLdProps {
  locale: string;
  description: string;
  jobTitle: string;
}

export function JsonLd({ locale, description, jobTitle }: JsonLdProps) {
  const pageUrl = `${siteUrl}/${locale}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    url: pageUrl,
    description,
    jobTitle,
    email: contacts.email,
    sameAs: [contacts.github, contacts.linkedin, contacts.telegram],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personName} — Portfolio`,
    url: siteUrl,
    inLanguage: locale === "ru" ? "ru-RU" : "en-US",
    author: {
      "@type": "Person",
      name: personName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
