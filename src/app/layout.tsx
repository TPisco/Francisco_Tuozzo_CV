import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "@/lib/fontawesome";
import "./globals.css";
import { LanguageProvider } from "@/i18n/provider";
import { profile } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const siteUrl = "https://franciscotuozzo.dev";
const description =
  "Francisco Tuozzo — a bilingual computer science student and software developer in Quebec. I build offline-first desktop tools, ASP.NET Core MVC web apps, Angular front-ends, and games in Godot.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Software developer`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "student developer portfolio",
    "junior software developer",
    "full-stack developer",
    "C# developer",
    "Angular developer",
    "Quebec software student",
    "Francisco Tuozzo",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    title: `${profile.name} — Software developer`,
    description,
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software developer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6f0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
