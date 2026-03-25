import type { Metadata } from "next";

import { HeroBackground } from "@/components/hero-background";
import { MotionCard } from "@/components/motion/motion-card";
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

const canonicalUrl = absoluteUrl("/");
const ogImage = absoluteUrl("/opengraph-image");

export const metadata: Metadata = {
  title: "Home",
  description:
    "Samir Seddiqi builds calm, institution-ready infrastructure across product, writing, and civic collaboration.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — VitaAvanza`,
    description:
      "Calm, institution-ready infrastructure across product, writing, and civic collaboration.",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — VitaAvanza`,
    description:
      "Calm, institution-ready infrastructure across product, writing, and civic collaboration.",
    images: [ogImage],
  },
};

const credibilityItems = [
  {
    title: "Founder & CEO",
    detail: "VitaAvanza",
    description:
      "An early-stage life-navigation platform focused on students, young workers, and people in transition.",
  },
  {
    title: "Economics & Management",
    detail: "University of Trento",
    description:
      "A grounding in systems thinking, resource allocation, and institutional realities.",
  },
  {
    title: siteConfig.book.title,
    detail: siteConfig.book.award,
    description:
      "A reflective literary work on inner dialogue, vulnerability, loneliness, and the need to be heard.",
  },
] as const;

const highlights = [
  {
    title: "Institution-ready interfaces",
    description:
      "Designing experiences that remain calm and useful under scrutiny, not just in ideal conditions.",
  },
  {
    title: "Product direction with governance",
    description:
      "Turning complexity into a coherent roadmap that institutions, partners, and teams can trust.",
  },
  {
    title: "Writing as infrastructure",
    description:
      "Using structured writing to make decisions auditable, durable, and aligned across stakeholders.",
  },
] as const;

const heroMeta = [
  "Based in Trento, Italy",
  "Product, writing, and systems",
  "Building VitaAvanza",
] as const;

const heroThreads = [
  {
    title: "Product direction",
    description: "Turning messy constraints into calm decisions, structures, and next steps.",
  },
  {
    title: "Institutional fit",
    description: "Keeping academic, civic, and operational realities visible from the start.",
  },
  {
    title: "Language",
    description: "Using writing to make serious work feel precise, readable, and trustworthy.",
  },
] as const;

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    sameAs: [siteConfig.linkedin],
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      name: "VitaAvanza",
    },
  } as const;

  return (
    <>
      <JsonLd data={personJsonLd} id="person-jsonld-home" />

      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto max-w-6xl"
      >
        <div className="hero-stage surface relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[38rem] lg:px-12 lg:py-12">
          <HeroBackground />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-end">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="accent">Institutional Infrastructure</Badge>
                <Badge>VitaAvanza</Badge>
              </div>

              <div className="space-y-6">
                <h1 className="max-w-4xl">Calm systems for people and institutions in transition</h1>
                <p className="max-w-2xl text-base text-white/75 sm:text-lg">
                  I work across product, writing, and institutional collaboration. The aim is to
                  make serious work feel dependable, legible, and ready for the complexity of real
                  life.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects" size="lg">
                  View Projects
                </ButtonLink>
                <ButtonLink href="/book" size="lg" variant="secondary">
                  The Book
                </ButtonLink>
                <ButtonLink href="/resume" size="lg" variant="outline">
                  Resume
                </ButtonLink>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/52">
                {heroMeta.map((item) => (
                  <span className="tracking-[0.01em]" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 border-t border-white/10 pt-6 lg:max-w-md lg:justify-self-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Current direction
                </p>
                <h2 className="max-w-sm text-2xl sm:text-[2.15rem]">
                  Shaping VitaAvanza with calm, institutional logic
                </h2>
                <p className="max-w-sm text-sm text-white/70 sm:text-[0.98rem]">
                  The work sits between product direction, writing, and systems design so it can
                  stay useful to people in transition and credible to serious collaborators.
                </p>
              </div>

              <div className="space-y-4">
                {heroThreads.map((thread) => (
                  <div className="hero-detail-item" key={thread.title}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                      {thread.title}
                    </p>
                    <p className="mt-2 text-sm text-white/72">{thread.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Credibility
          </p>
          <h2 className="max-w-3xl">Built for collaboration with institutions, not just audiences</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.03}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {credibilityItems.map((item) => (
            <MotionCard className="h-full" key={item.title}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-white/75">{item.detail}</CardDescription>
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
        <div className="space-y-5">
          <Badge variant="accent">{siteConfig.book.distribution}</Badge>
          <h2 className="max-w-xl">{siteConfig.book.title}</h2>
          <p className="text-base text-white/75">
            A short reflective literary work centered on inner dialogue, emotional isolation, and the
            human need to be seen and heard.
          </p>
          <p className="text-sm text-white/65">{siteConfig.book.award}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
              Request a copy
            </ButtonLink>
            <ButtonLink href="/book" variant="outline">
              Book details
            </ButtonLink>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-sm font-semibold text-white">Distribution</p>
          <p className="text-sm text-white/75">
            {siteConfig.book.distribution}. Requesting is intentional and reinforces the theme of
            being heard.
          </p>
          <Divider />
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Contact</p>
          <p className="text-sm text-white/85">{siteConfig.email}</p>
        </div>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Featured Highlights
          </p>
          <h2 className="max-w-3xl">Work that stays calm as complexity increases</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {highlights.map((item) => (
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
        motionClassName="surface space-y-5 p-8 md:p-10"
        staggerChildren={0.04}
      >
        <Badge>Institution-ready note</Badge>
        <h2 className="max-w-3xl">This site is designed like infrastructure</h2>
        <p className="max-w-3xl text-base text-white/75">
          The intention is not to impress quickly. It is to communicate stability, make decisions
          legible, and create a reliable next step for serious collaborators.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
          <ButtonLink href="/blog" variant="ghost">
            Read the blog
          </ButtonLink>
        </div>
      </MotionSection>
    </>
  );
}
