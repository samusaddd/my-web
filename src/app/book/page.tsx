import type { Metadata } from "next";

import Book from "@/components/Book";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/book");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: siteConfig.book.title,
  description:
    "We Were Never Here is a work by Samir Seddiqi on identity, meaning, and the quiet continuation of existence when certainty dissolves.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `${siteConfig.book.title} - ${siteConfig.name}`,
    description:
      "A structured confrontation with the absence of answers, and a study of identity, meaning, and existence.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.book.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.book.title} - ${siteConfig.name}`,
    description:
      "A structured confrontation with the absence of answers, and a study of identity, meaning, and existence.",
    images: [ogImage],
  },
};

export default function BookPage() {
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: siteConfig.book.title,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    inLanguage: "en",
    url: canonicalUrl,
    isAccessibleForFree: true,
    description:
      "A work on identity, meaning, and the quiet continuation of existence when certainty dissolves.",
  } as const;

  return (
    <>
      <JsonLd data={bookJsonLd} id="book-jsonld" />
      <Book requestEmail={siteConfig.email} />
    </>
  );
}
