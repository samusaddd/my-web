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
const originalBookRequestHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  `Request for ${siteConfig.book.title}`,
)}`;
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

const books = [
  {
    title: siteConfig.newBook.title,
    label: "New book",
    status: siteConfig.newBook.distribution,
    eyebrow: "Identity / Meaning / Existence",
    lead: "This is not a book written to provide answers.",
    description:
      "It is a structured confrontation with the absence of them. A study of identity, meaning, and the quiet continuation of existence when certainty dissolves.",
    detail:
      "A quiet work about what remains when certainty dissolves and the self can no longer be treated as something fixed.",
    href: newBookRequestHref,
    action: "Request Access",
    coverClassName:
      "border-lavender/20 bg-[linear-gradient(150deg,rgba(63,29,72,0.98),rgba(28,24,32,0.98)_52%,rgba(82,37,95,0.9))] shadow-[0_34px_90px_-48px_rgba(82,37,95,0.56)]",
    spineClassName: "bg-lavender/20",
    markerClassName: "border-lavender/25 bg-lavender/10 text-white",
  },
  {
    title: siteConfig.book.title,
    label: "Original book",
    status: siteConfig.book.award,
    eyebrow: "Silence / Pain / Reflection",
    lead: "A personal work shaped by silence, pain, reflection, and the need to be heard.",
    description:
      "It comes from lived experience and reaches toward the larger human need to be understood without having to perform strength all the time.",
    detail:
      "The recognition matters, but quietly. What matters more is that the writing stays honest, intimate, and true to where it came from.",
    href: originalBookRequestHref,
    action: "Request a copy",
    coverClassName:
      "border-coral/20 bg-[linear-gradient(150deg,rgba(76,45,36,0.94),rgba(28,24,32,0.98)_52%,rgba(73,61,67,0.9))] shadow-[0_30px_86px_-50px_rgba(99,66,54,0.42)]",
    spineClassName: "bg-coral/20",
    markerClassName: "border-coral/25 bg-coral/10 text-white",
  },
] as const;

const writingThreads = [
  {
    title: "The new work",
    description:
      "We Were Never Here moves into identity, meaning, and what remains when certainty dissolves.",
  },
  {
    title: "The original work",
    description:
      "Can You Hear Me? stays close to silence, pain, reflection, and the need to be heard.",
  },
  {
    title: "The thread between them",
    description:
      "Both books treat writing as confrontation, not decoration: a way to stay honest with what is difficult.",
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
        as="header"
        className="overflow-hidden border-b border-ink/[0.07] pt-14 sm:pt-20"
        containerClassName="max-w-7xl"
        motionClassName="relative"
      >
        <div className="relative overflow-hidden rounded-editorial border border-ink/10 bg-ivory/72 p-6 shadow-lift sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-accent/[0.025]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/10"
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="accent">Writing</Badge>
                <Badge>{siteConfig.newBook.distribution}</Badge>
              </div>

              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent/70">
                  Two books by {siteConfig.name}
                </p>
                <h1 className="max-w-4xl">
                  The new work has arrived. The first one still carries its weight.
                </h1>
                <p className="max-w-2xl text-base text-white/75 sm:text-lg">
                  {siteConfig.newBook.title} now stands beside {siteConfig.book.title}: one work
                  turns toward identity and existence, the other toward silence and the human need
                  to be heard.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href={newBookRequestHref} size="lg">
                  Request the new book
                </ButtonLink>
                <ButtonLink href="#books" size="lg" variant="outline">
                  View both books
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <div
                className={`${books[1].coverClassName} editorial-dark relative min-h-[340px] overflow-hidden rounded-editorial border p-6`}
              >
                <div className={`absolute inset-y-0 left-0 w-3 ${books[1].spineClassName}`} />
                <div className="relative flex h-full min-h-[292px] flex-col justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`${books[1].markerClassName} rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]`}
                    >
                      Original
                    </span>
                    <span className="text-xs text-white/45">2024</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/40">Samir Seddiqi</p>
                    <h2 className="max-w-[12rem] text-4xl font-semibold leading-none text-white sm:text-5xl">
                      {siteConfig.book.title}
                    </h2>
                  </div>
                  <p className="max-w-[14rem] text-xs uppercase tracking-[0.18em] text-white/45">
                    Silence, pain, reflection
                  </p>
                </div>
              </div>

              <div
                className={`${books[0].coverClassName} editorial-dark relative min-h-[390px] overflow-hidden rounded-editorial border p-6 lg:-mt-8`}
              >
                <div className={`absolute inset-y-0 left-0 w-3 ${books[0].spineClassName}`} />
                <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  New
                </div>
                <div className="relative flex h-full min-h-[342px] flex-col justify-between">
                  <div>
                    <span
                      className={`${books[0].markerClassName} rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]`}
                    >
                      Featured
                    </span>
                  </div>
                  <div className="space-y-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-lavender/60">
                      Samir Seddiqi
                    </p>
                    <h2 className="max-w-[15rem] text-5xl font-semibold leading-none text-white sm:text-6xl">
                      {siteConfig.newBook.title}
                    </h2>
                  </div>
                  <p className="max-w-[15rem] text-xs uppercase tracking-[0.18em] text-lavender/60">
                    Identity, meaning, existence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-7xl"
        motionClassName="space-y-8"
        id="books"
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            The books
          </p>
          <h2 className="max-w-3xl">The new book leads, the original remains part of the story</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 lg:grid-cols-2"
          staggerChildren={0.08}
        >
          {books.map((book) => (
            <MotionCard
              className={`relative h-full overflow-hidden ${
                book.title === siteConfig.newBook.title
                  ? "border-accent/18 bg-accent/[0.035]"
                  : "border-coral/15"
              }`}
              key={book.title}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.36),transparent)]"
              />
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={book.title === siteConfig.newBook.title ? "accent" : "neutral"}>
                    {book.label}
                  </Badge>
                  <Badge>{book.status}</Badge>
                </div>
                <div className="space-y-3">
                  <CardDescription className="text-xs uppercase tracking-[0.18em] text-white/48">
                    {book.eyebrow}
                  </CardDescription>
                  <CardTitle className="text-4xl sm:text-5xl">{book.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-white/75">
                <p className="text-base text-white/80">{book.lead}</p>
                <p>{book.description}</p>
                <Divider />
                <p>{book.detail}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ButtonLink href={book.href} variant="secondary">
                    {book.action}
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="ghost">
                    Contact
                  </ButtonLink>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            What they hold
          </p>
          <h2 className="max-w-3xl">Two works, one line of confrontation</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {writingThreads.map((item) => (
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
        motionClassName="surface grid gap-8 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-10"
      >
        <div className="space-y-4">
          <Badge>Requests</Badge>
          <h2 className="max-w-3xl">Request either book with a short note</h2>
          <p className="text-base text-white/75">
            Both books are available by request. Choose the work you want to read, or send a short
            message if you want to share context first.
          </p>
          <p className="text-sm text-white/70">
            Primary channel:{" "}
            <MotionLink className="text-ink hover:text-accent" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </MotionLink>
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={newBookRequestHref} variant="secondary">
              Request We Were Never Here
            </ButtonLink>
            <ButtonLink href={originalBookRequestHref} variant="outline">
              Request Can You Hear Me?
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/75">
          <p className="font-semibold text-white">What to include</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your name</li>
            <li>Which book you are requesting</li>
            <li>Any note you want to share with it</li>
          </ul>
          <Divider />
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Also available</p>
          <p>
            <MotionLink className="text-ink hover:text-accent" href={siteConfig.linkedin}>
              LinkedIn
            </MotionLink>
          </p>
        </div>
      </MotionSection>
    </>
  );
}
