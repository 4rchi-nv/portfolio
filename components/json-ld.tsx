import {
  contacts,
  jobTitle,
  knowsAbout,
  personName,
  siteUrl,
} from "@/data/portfolio-meta";

interface JsonLdProps {
  locale: string;
  description: string;
}

export function JsonLd({ locale, description }: JsonLdProps) {
  const pageUrl = `${siteUrl}/${locale}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    url: siteUrl,
    image: `${siteUrl}/arslan-profile.png`,
    description,
    jobTitle,
    email: contacts.email,
    sameAs: [contacts.github, contacts.linkedin, contacts.telegram],
    knowsAbout: [...knowsAbout],
    knowsLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
    ],
    homeLocation: {
      "@type": "Place",
      name: "Kayseri, Türkiye",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kayseri",
      addressCountry: "TM",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personName} — ${jobTitle}`,
    url: siteUrl,
    inLanguage: locale === "ru" ? "ru-RU" : "en-US",
    author: {
      "@type": "Person",
      name: personName,
      url: siteUrl,
    },
  };

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: pageUrl,
    name: `${personName} — ${jobTitle}`,
    description,
    inLanguage: locale === "ru" ? "ru-RU" : "en-US",
    mainEntity: {
      "@type": "Person",
      name: personName,
      jobTitle,
      url: siteUrl,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
    </>
  );
}
