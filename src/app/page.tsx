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
    "Founder of VitaAvanza in Trento, building infrastructure for life navigation across Mitra, DVI, and institution-ready coordination.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    title: `${siteConfig.name} | VitaAvanza and Life Navigation`,
    description:
      "Founder of VitaAvanza in Trento, building infrastructure for life navigation across Mitra, DVI, and institution-ready coordination.",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | VitaAvanza and Life Navigation`,
    description:
      "Founder of VitaAvanza in Trento, building infrastructure for life navigation across Mitra, DVI, and institution-ready coordination.",
    images: [ogImage],
  },
};

const heroCards = [
  {
    label: "Built in Trento",
    description: "Founder-led from lived migration, student, and work-system friction.",
  },
  {
    label: siteConfig.company.ecosystem,
    description: "Developed close to the University of Trento innovation environment.",
  },
  {
    label: "Discovery in motion",
    description: `${siteConfig.discovery.total} interviews completed and a ${siteConfig.discovery.pilot}-person pilot direction underway.`,
  },
] as const;

const discoveryCards = [
  {
    label: "Direct interviews",
    value: `${siteConfig.discovery.total}`,
    description: "Structured discovery conversations completed before pilot launch work.",
  },
  {
    label: "Immigrant cohort",
    value: `${siteConfig.discovery.immigrants}`,
    description: "Interviews on documents, housing, work, and settlement pressure.",
  },
  {
    label: "International students",
    value: `${siteConfig.discovery.students}`,
    description: "Interviews on bureaucracy, academic timing, and life-load friction.",
  },
  {
    label: "Pilot focus",
    value: `${siteConfig.discovery.pilot}`,
    description: "Initial immigrant cohort being prepared for the next operational step.",
  },
] as const;

const platformModules = [
  {
    title: "Mitra",
    description:
      "A guidance layer that turns onboarding data, DVI posture, and institutional constraints into the next practical move.",
  },
  {
    title: "DVI",
    description:
      "An explainable posture view across stability, load, growth, and support, designed for readability rather than black-box scoring.",
  },
  {
    title: "Institutional coordination",
    description:
      "An operating layer that helps universities, public bodies, and employers act before pressure becomes crisis.",
  },
] as const;

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    sameAs: [siteConfig.linkedin],
    jobTitle: "Founder of VitaAvanza",
    description: siteConfig.description,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Trento",
    },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
    knowsAbout: [
      "Life navigation infrastructure",
      "Product strategy",
      "Institutional coordination",
      "Mitra AI",
      "DVI",
    ],
  } as const;

  return (
    <>
      <JsonLd data={personJsonLd} id="person-jsonld-home" />

      <MotionSection
        as="header"
        contained={false}
        className="relative overflow-hidden border-b border-white/5 py-0"
        motionClassName="relative"
      >
        <div className="hero-stage relative isolate min-h-[88vh] overflow-hidden">
          <HeroBackground />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.12),rgba(5,7,13,0.7)_72%,rgba(5,7,13,0.96))]" />

          <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-36 text-center lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.95)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-100/80">
                Founder of VitaAvanza
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl">
              Infrastructure for{" "}
              <span className="bg-[linear-gradient(100deg,rgba(196,181,253,1),rgba(103,232,249,0.94))] bg-clip-text text-transparent">
                life navigation
              </span>
              , built from real pressure.
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-white/68 sm:text-xl">
              From {siteConfig.location} and the {siteConfig.company.ecosystem}, I am building
              VitaAvanza as the operating layer between people in transition and the institutions
              meant to support them.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/projects" size="lg">
                View Projects
              </ButtonLink>
              <ButtonLink href="/about" size="lg" variant="secondary">
                Read the Trento Story
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outline">
                Contact
              </ButtonLink>
            </div>

            <p className="mt-5 text-sm font-medium text-white/46">{siteConfig.tagline}</p>

            <div className="mt-14 grid w-full max-w-5xl gap-4 sm:grid-cols-3">
              {heroCards.map((card) => (
                <div
                  className="rounded-3xl border border-white/8 bg-white/[0.04] px-5 py-4 text-left backdrop-blur"
                  key={card.label}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/72">
                    {card.label}
                  </p>
                  <p className="mt-2 text-sm text-white/62">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-7xl"
        motionClassName="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      >
        <div className="space-y-5">
          <Badge variant="accent">Field Discovery</Badge>
          <h2 className="max-w-3xl">Built from direct signal, not detached theory</h2>
          <p className="max-w-2xl text-base text-white/72 sm:text-lg">
            VitaAvanza is being shaped through structured discovery with the people living this
            pressure directly. The product thesis is grounded in real immigrant and
            international-student journeys, not only in institutional abstraction.
          </p>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.03}
          motionClassName="grid gap-4 sm:grid-cols-2"
          staggerChildren={0.08}
        >
          {discoveryCards.map((card) => (
            <MotionCard className="h-full" key={card.label}>
              <CardHeader className="space-y-3">
                <CardDescription className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/72">
                  {card.label}
                </CardDescription>
                <CardTitle className="text-4xl">{card.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/72">{card.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection className="pt-0" containerClassName="max-w-7xl" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Intelligence Layer
          </p>
          <h2 className="max-w-3xl">Mitra, DVI, and institution-ready coordination</h2>
          <p className="max-w-3xl text-base text-white/72 sm:text-lg">
            This is not general-purpose AI or a black-box score. The work is to build calm,
            explainable infrastructure that can support people under pressure while still holding up
            in serious environments.
          </p>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {platformModules.map((module) => (
            <MotionCard className="h-full" key={module.title}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/75">{module.description}</CardContent>
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
          <Badge variant="accent">{siteConfig.book.distribution}</Badge>
          <h2 className="max-w-xl">{siteConfig.book.title}</h2>
          <p className="text-base text-white/75">
            Writing still matters to the way I build. The book sits beside VitaAvanza as the more
            intimate part of the same work: language, vulnerability, and the need to be heard.
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
          <p className="text-sm font-semibold text-white">Why it stays on this site</p>
          <p className="text-sm text-white/75">
            VitaAvanza is about infrastructure, continuity, and decision systems. The book is where
            that same orientation becomes human, reflective, and personal.
          </p>
          <Divider />
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Primary channel</p>
          <p className="text-sm text-white/85">{siteConfig.email}</p>
        </div>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        motionClassName="surface space-y-5 p-8 md:p-10"
        staggerChildren={0.04}
      >
        <Badge>Personal site note</Badge>
        <h2 className="max-w-3xl">This site explains the founder point of view behind VitaAvanza</h2>
        <p className="max-w-3xl text-base text-white/75">
          The product site explains the platform. This one explains the person building it: the
          Trento context, the lived origin, the systems thinking, and the writing that shapes the
          work.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/about" variant="secondary">
            About
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact
          </ButtonLink>
        </div>
      </MotionSection>
    </>
  );
}
