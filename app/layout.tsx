import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-arslan.vercel.app"),
  title: "Arslan Agajanov - Frontend Developer (React / TypeScript)",
  description:
    "Frontend Developer with 5+ years of experience in React/TypeScript, Telegram WebApps, REST integrations, and Web3 frontend flows.",
  openGraph: {
    title: "Arslan Agajanov - Frontend Developer",
    description:
      "React / TypeScript engineer focused on web apps, Telegram Mini Apps, fintech-style integrations, and Web3 user flows.",
    url: "https://portfolio-arslan.vercel.app",
    siteName: "Arslan Agajanov Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arslan Agajanov - Frontend Developer",
    description:
      "React/TypeScript frontend engineer with Telegram WebApp and Web3 integration experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
