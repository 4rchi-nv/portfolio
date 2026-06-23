import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ogImagePath, siteUrl } from "@/data/portfolio-meta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  const title = t("title");
  const description = t("description");
  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");
  const twitterDescription = t("twitterDescription");
  const keywords = t("keywords").split(",").map((k) => k.trim());

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: siteUrl,
      siteName: "Arslan Agajanov Portfolio",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: twitterDescription,
      images: [ogImagePath],
    },
    keywords,
    icons: {
      icon: "/brand-logo-light.png",
      apple: "/brand-logo-light.png",
      shortcut: "/brand-logo-light.png",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ru: "/ru",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh min-w-0 flex-col overflow-x-clip">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
