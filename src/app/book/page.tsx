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

export const metadata: Metadata = {
  title: "Book",
  description:
    "Can You Hear Me? is a short reflective literary work on inner dialogue, vulnerability, loneliness, and the need to be seen and heard. Writer of the Year Award (2022). Free by request.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `${siteConfig.book.title} — ${siteConfig.name}`,
    description:
      "A short reflective literary work on silence, vulnerability, and the need to be seen and heard. Free by request.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.book.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.book.title} — ${siteConfig.name}`,
    description:
      "A short reflective literary work on silence, vulnerability, and the need to be seen and heard. Free by request.",
    images: [ogImage],
  },
};

const whyItMatters = [
  {
    title: "A mirror, not a guide",
    description:
      "The book does not advise, explain, or fix. It offers recognition for readers who reflect deeply and quietly.",
  },
  {
    title: "Inner dialogue as structure",
    description:
      "It is written as a sequence of reflections rather than a plot-driven story, blurring inner monologue with philosophical questioning.",
  },
  {
    title: "Integrity without self-sufficiency",
    description:
      "The central idea is simple: everyone hides something because it is impossible to carry everything alone. Vulnerability is not weakness; it is human.",
  },
] as const;

export default function BookPage() {
  const bookJsonLd = {
    "@context": "https://schema.org",
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
      "A short reflective literary work written as a sequence of reflections on inner dialogue, vulnerability, loneliness, and the human need to be seen and heard.",
  } as const;

  return (
    <>
      <JsonLd data={bookJsonLd} id="book-jsonld" />

      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{siteConfig.book.distribution}</Badge>
            <Badge>{siteConfig.book.award}</Badge>
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl">{siteConfig.book.title}</h1>
            <p className="max-w-2xl text-base text-white/75 sm:text-lg">
              A short literary work centered on inner dialogue, vulnerability, loneliness, and the
              human need to be seen and heard.
            </p>
            <p className="max-w-2xl text-base text-white/75">
              It is written for people who appear functional and composed on the outside while
              carrying quiet fears of being misunderstood, judged, unseen, or emotionally isolated.
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
              Synopsis
            </CardDescription>
            <CardTitle className="text-2xl">Reflections written in the language of silence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/80">
            <p>
              {siteConfig.book.title} is not a plot-driven story. It is a sequence of reflections
              that moves between inner monologue and philosophical questioning.
            </p>
            <p>
              Much of the text lives in late-night thoughts: the silence after responsibility, the
              fear of revealing what is authentic, and the loneliness that can coexist with values
              and conviction.
            </p>
            <p>
              It argues that every person hides something — not out of dishonesty, but because it is
              impossible to carry everything alone. Integrity and strength are not self-sufficiency,
              and vulnerability is not weakness. It is part of being human.
            </p>
            <Divider />
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">Distribution</p>
            <p className="text-sm text-white/80">
              {siteConfig.book.distribution}. The act of requesting is intentional and reinforces the
              theme of being heard.
            </p>
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
        motionClassName="surface grid gap-8 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-10"
      >
        <div className="space-y-4">
          <Badge>Requests</Badge>
          <h2 className="max-w-3xl">Requesting is part of the meaning</h2>
          <p className="text-base text-white/75">
            The book is available free by request. The act of asking is not transactional; it mirrors
            the theme of being heard and seen.
          </p>
          <p className="text-sm text-white/70">
            Primary channel:{" "}
            <MotionLink className="text-white hover:text-sky-100" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </MotionLink>
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/75">
          <p className="font-semibold text-white">If you are requesting a copy</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Who the book is for</li>
            <li>Why it resonates in that context</li>
            <li>Any detail you want included with the request</li>
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
