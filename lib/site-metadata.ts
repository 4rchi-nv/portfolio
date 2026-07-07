import type { Metadata } from "next";
import { personName, siteUrl } from "@/data/portfolio-meta";

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${personName} — React / Next.js Engineer`,
  type: "image/png",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${personName} — React / Next.js Engineer`,
  description:
    "React / Next.js engineer with full-stack product ownership: interactive web apps, client-side and realtime logic, API integrations and deployment.",
  applicationName: `${personName} Portfolio`,
  openGraph: {
    title: `${personName} — React / Next.js Engineer`,
    description:
      "React / Next.js engineer building interactive web applications: client-side and realtime logic, PWA, Telegram WebApps and Web3 integrations.",
    url: siteUrl,
    siteName: `${personName} Portfolio`,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personName} — React / Next.js Engineer`,
    description:
      "React / Next.js engineer: interactive web apps, realtime UI, API integrations, product engineering.",
    images: [ogImage.url],
  },
  icons: {
    icon: "/brand-logo-light.png",
    apple: "/brand-logo-light.png",
    shortcut: "/brand-logo-light.png",
  },
};

export { ogImage };
