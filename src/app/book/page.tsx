import type { Metadata } from "next";

import { MotionCard } from "@/components/motion/motion-card";
import { MotionLink } from "@/components/motion/motion-link";
import { MotionSection } from "@/components/motion/motion-section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Badge,
  ButtonLink,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
} from "@/components/ui";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/book");
const ogImage = absoluteUrl(siteConfig.socialImagePath);
const newBookRequestHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  `Request for ${siteConfig.newBook.title}`,
)}`;

export const metadata: Metadata = {
  title: "Books",
  description:
    "Books and writing by Samir Seddiqi, including Can You Hear Me? and We Were Never Here.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Books - ${siteConfig.name}`,
    description:
      "Books and writing by Samir Seddiqi, including Can You Hear Me? and We Were Never Here.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${siteConfig.name} books` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Books - ${siteConfig.name}`,
    description:
      "Books and writing by Samir Seddiqi, including Can You Hear Me? and We Were Never Here.",
    images: [ogImage],
  },
};

const whyItMatters = [
  {
    title: "Lived experience",
    description:
      "The book is rooted in emotion, silence, pain, and reflection rather than distance or abstraction.",
  },
  {
    title: "Need to be heard",
    description:
      "It speaks to the human desire to be understood without having to perform strength all the time.",
  },
  {
    title: "Unfiltered truth",
    description:
      "The writing stays close to what is difficult, quiet, and real, without trying to decorate it.",
  },
] as const;

export default function BookPage() {
  const booksJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        name: siteConfig.book.title,
        author: {
          "@type": "Person",
          name: siteConfig.name,
        },
        datePublished: "2024",
        inLanguage: "en",
        url: canonicalUrl,
        award: siteConfig.book.award,
        isAccessibleForFree: true,
        description:
          "A deeply personal literary work by Samir Seddiqi, founder of VitaAvanza, shaped by emotion, silence, pain, and reflection.",
      },
      {
        "@type": "Book",
        name: siteConfig.newBook.title,
        author: {
          "@type": "Person",
          name: siteConfig.name,
        },
        inLanguage: "en",
        url: canonicalUrl,
        isAccessibleForFree: true,
        description:
          "A work on identity, meaning, and the quiet continuation of existence when certainty dissolves.",
      },
    ],
  } as const;

  return (
    <>
      <JsonLd data={booksJsonLd} id="books-jsonld" />

      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">Book</Badge>
            <Badge>{siteConfig.book.award}</Badge>
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl">{siteConfig.book.title}</h1>
            <p className="max-w-2xl text-base text-white/75 sm:text-lg">
              A personal work shaped by silence, pain, reflection, and the need to be heard.
            </p>
            <p className="max-w-2xl text-base text-white/75">
              Writing, for me, is one of the few places where truth can remain unfiltered.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${siteConfig.email}`} size="lg">
              Request a copy
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </div>

        <MotionCard className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_28rem_at_120%_-20%,rgba(125,211,252,0.25),transparent_68%)]"
          />
          <CardHeader className="space-y-3">
            <CardDescription className="text-xs uppercase tracking-[0.14em] text-white/50">
              Book
            </CardDescription>
            <CardTitle className="text-2xl">A personal work carried by silence and reflection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/80">
            <p>
              This book comes from lived experience and from the kind of silence that stays with a
              person long after difficult moments have passed.
            </p>
            <p>
              It is personal, but it is not closed in on itself. It reaches toward the larger human
              need to be heard, understood, and remembered.
            </p>
            <p>
              The recognition matters, but quietly. What matters more is that the writing stays
              honest, intimate, and true to where it came from.
            </p>
            <Divider />
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">Recognition</p>
            <p className="text-sm text-white/80">{siteConfig.book.award}</p>
          </CardContent>
        </MotionCard>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Why it matters
          </p>
          <h2 className="max-w-3xl">A quiet work about being heard</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {whyItMatters.map((item) => (
            <MotionCard className="h-full" key={item.title}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/75">{item.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        motionClassName="surface grid gap-8 p-8 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:p-10"
      >
        <div className="space-y-5">
          <Badge variant="accent">New book</Badge>
          <h2 className="max-w-3xl">{siteConfig.newBook.title}</h2>
          <p className="text-base text-white/75">
            This is not a book written to provide answers.
          </p>
          <p className="text-sm text-white/70">
            It is a structured confrontation with the absence of them. A study of identity,
            meaning, and the quiet continuation of existence when certainty dissolves.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={newBookRequestHref} variant="secondary">
              Request Access
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/75">
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Writing</p>
          <p className="text-xl font-semibold text-white">Identity, meaning, and uncertainty</p>
          <p>
            A quiet work about what remains when certainty dissolves and the self can no longer be
            treated as something fixed.
          </p>
          <Divider />
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Availability</p>
          <p className="text-sm text-white/85">{siteConfig.newBook.distribution}</p>
        </div>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        motionClassName="surface grid gap-8 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-10"
      >
        <div className="space-y-4">
          <Badge>Requests</Badge>
          <h2 className="max-w-3xl">If you would like a copy, send a short note</h2>
          <p className="text-base text-white/75">
            The book is available free by request. A simple message is enough, and I will reply
            personally.
          </p>
          <p className="text-sm text-white/70">
            Primary channel:{" "}
            <MotionLink className="text-white hover:text-sky-100" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </MotionLink>
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/75">
          <p className="font-semibold text-white">What to include</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your name</li>
            <li>The context of your request</li>
            <li>Any note you want to share with it</li>
          </ul>
          <Divider />
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Also available</p>
          <p>
            <MotionLink className="text-white hover:text-sky-100" href={siteConfig.linkedin}>
              LinkedIn
            </MotionLink>
          </p>
        </div>
      </MotionSection>
    </>
  );
}
