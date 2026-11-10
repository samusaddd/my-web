import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible,
  Bodoni_Moda,
  Cormorant_Garamond,
  Fraunces,
  Inter,
  Instrument_Serif,
  Literata,
  Space_Mono,
  UnifrakturMaguntia,
} from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionLayout } from "@/components/motion/motion-layout";
import { cn } from "@/lib/cn";
import { absoluteUrl, siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-literata",
  preload: false,
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
  preload: false,
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-bodoni",
  preload: false,
  adjustFontFallback: false,
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
  preload: false,
});
const gothic = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-gothic",
  preload: false,
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-mono",
  preload: false,
});
const clear = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-clear",
  preload: false,
});

const metadataBase = new URL(siteConfig.url);
const defaultTitle = `${siteConfig.name} | Writer & Founder`;
const defaultOgImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
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
        alt: `${siteConfig.name} personal website`,
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
    icon: [{ url: siteConfig.iconPath, type: "image/svg+xml" }],
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
      <body
        className={cn(
          inter.variable,
          serif.variable,
          literata.variable,
          cormorant.variable,
          bodoni.variable,
          fraunces.variable,
          gothic.variable,
          mono.variable,
          clear.variable,
          "min-h-screen bg-paper text-ink",
        )}
        id="top"
      >
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-950"
          href="#main-content"
        >
          Skip to content
        </a>

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
