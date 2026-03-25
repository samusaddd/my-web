import type { Metadata } from "next";

import { Engine } from "@/components/engine";
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

const heroSignals = [
  {
    label: "Base",
    value: "Trento, Italy",
    description: "Working from an academic and civic context rather than a hype cycle.",
  },
  {
    label: "Focus",
    value: "Transition systems",
    description: "Building calm products that stay legible for both people and institutions.",
  },
  {
    label: "Method",
    value: "Writing + product",
    description: "Using structured language to make decisions clearer, calmer, and more durable.",
  },
] as const;

const engineFacts = [
  { label: "Primary domain", value: "Institutional clarity" },
  { label: "Operating style", value: "Quiet but rigorous" },
  { label: "Outputs", value: "Readable, stable, durable" },
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
        motionClassName="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)]"
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">Institutional Infrastructure</Badge>
            <Badge>VitaAvanza</Badge>
          </div>

          <div className="space-y-6">
            <h1 className="max-w-4xl">Calm systems for people and institutions in transition</h1>
            <p className="max-w-2xl text-base text-white/75 sm:text-lg">
              I work at the intersection of economics, product strategy, writing, and institutional
              collaboration. The goal is simple: make serious work feel dependable, legible, and
              ready for real-world complexity.
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

          <div className="grid gap-3 sm:grid-cols-3">
            {heroSignals.map((signal) => (
              <div className="signal-chip" key={signal.label}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {signal.label}
                </p>
                <p className="mt-2 text-base font-medium text-white">{signal.value}</p>
                <p className="mt-2 text-sm text-white/62">{signal.description}</p>
              </div>
            ))}
          </div>
        </div>

        <MotionCard className="relative overflow-hidden p-0">
          <div className="relative p-6 pb-5 sm:p-8 sm:pb-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_28rem_at_108%_-8%,rgba(125,211,252,0.24),transparent_68%)]"
            />
            <CardHeader className="relative space-y-3">
              <CardDescription className="text-xs uppercase tracking-[0.16em] text-white/50">
                Current focus
              </CardDescription>
              <CardTitle className="max-w-lg text-2xl sm:text-3xl">
                Life navigation with institutional depth
              </CardTitle>
              <CardDescription className="max-w-lg text-sm text-white/75">
                VitaAvanza is being shaped to support people through transitions while staying
                credible for serious partners, academic environments, and public-facing systems.
              </CardDescription>
            </CardHeader>
          </div>

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <Engine />
          </div>

          <div className="grid gap-px border-t border-white/10 bg-white/[0.05] sm:grid-cols-3">
            {engineFacts.map((fact) => (
              <div className="bg-black/20 px-5 py-4" key={fact.label}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                  {fact.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </MotionCard>
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
