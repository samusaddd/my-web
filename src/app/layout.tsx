import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionLayout } from "@/components/motion/motion-layout";
import { PersonalCursor } from "@/components/personal-cursor";
import { cn } from "@/lib/cn";
import { absoluteUrl, siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const metadataBase = new URL(siteConfig.url);
const defaultTitle = `${siteConfig.name} — VitaAvanza`;
const defaultOgImage = absoluteUrl("/opengraph-image");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.creator,
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Author • Founder & CEO`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full" lang="en">
      <head>
        <link href={siteConfig.linkedin} rel="me" />
        <link
          href={absoluteUrl("/rss.xml")}
          rel="alternate"
          title={`${siteConfig.name} RSS`}
          type="application/rss+xml"
        />
      </head>
      <body className={cn(inter.variable, serif.variable, "min-h-screen bg-zinc-950 text-white")}>
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-950"
          href="#main-content"
        >
          Skip to content
        </a>

        <PersonalCursor />

        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1" id="main-content">
            <MotionLayout>{children}</MotionLayout>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
