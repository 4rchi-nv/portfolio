import type { Metadata } from "next";
import { jobTitle, personName, siteUrl } from "@/data/portfolio-meta";

const title = `${personName} — ${jobTitle} | React, Next.js, TypeScript`;
const description =
  "Frontend / Software Engineer with 6+ years building production React, Next.js and TypeScript applications across enterprise ERP, fintech, and API-driven systems.";

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${personName} — ${jobTitle}`,
  type: "image/png",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: `${personName} Portfolio`,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: `${personName} Portfolio`,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
  icons: {
    icon: "/brand-logo-light.png",
    apple: "/brand-logo-light.png",
    shortcut: "/brand-logo-light.png",
  },
};

export { ogImage };
