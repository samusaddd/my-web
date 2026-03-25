import type { Metadata } from "next";

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
} from "@/components/ui";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/about");
const ogImage = absoluteUrl("/opengraph-image");

export const metadata: Metadata = {
  title: "About",
  description:
    "About Samir Seddiqi: founder, writer, and builder in Trento working across product, systems, and institution-ready thinking.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "Founder, writer, and builder in Trento working across product, systems, and institution-ready thinking.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "About Samir Seddiqi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteConfig.name}`,
    description:
      "Founder, writer, and builder in Trento working across product, systems, and institution-ready thinking.",
    images: [ogImage],
  },
};

const values = [
  {
    title: "Clarity before scale",
    description:
      "Systems should become more legible as they grow. Clarity is a prerequisite, not a byproduct.",
  },
  {
    title: "Responsibility in design",
    description:
      "If people rely on the outcome, the interface must reduce ambiguity and create a trustworthy next step.",
  },
  {
    title: "Human depth",
    description:
      "Strategy matters, but so do emotion, dignity, and the realities people carry beneath the surface.",
  },
] as const;

const focusAreas = [
  {
    title: "Product direction",
    description:
      "Turning early-stage complexity into a coherent structure that teams, partners, and users can understand.",
  },
  {
    title: "Writing and meaning",
    description:
      "Using language to make ideas clearer, decisions more durable, and personal experience easier to translate into work.",
  },
  {
    title: "Institutional thinking",
    description:
      "Designing work that can hold up in formal environments where trust, scrutiny, and long-term accountability matter.",
  },
] as const;

const timeline = [
  {
    label: "Foundation",
    detail: "Economics & Management | University of Trento",
    note: "A systems-based approach to decisions, trade-offs, and institutional realities.",
  },
  {
    label: "2022",
    detail: siteConfig.book.award,
    note: `Recognition for ${siteConfig.book.title}, a reflective literary work on silence, vulnerability, and the need to be heard.`,
  },
  {
    label: "Now",
    detail: "Founder, writer, and builder",
    note: "Building VitaAvanza while continuing to shape work through product thinking, writing, and lived experience.",
  },
] as const;

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    sameAs: [siteConfig.linkedin],
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company.shortName,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Trento",
    },
  } as const;

  return (
    <>
      <JsonLd data={personJsonLd} id="person-jsonld-about" />

      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <div className="space-y-7">
          <Badge variant="accent">About</Badge>
          <div className="space-y-5">
            <h1 className="max-w-4xl">A personal site about the thinking behind the work</h1>
            <p className="max-w-2xl text-base text-white/75 sm:text-lg">
              I am Samir Seddiqi, based in Trento. My work sits between product direction, writing,
              and systems thinking, with a focus on making serious work clearer and more human.
            </p>
            <p className="max-w-2xl text-base text-white/75">
              VitaAvanza is part of that story, but not the whole of it. This site is where the
              broader personal thread lives: how I think, what I care about, and the way lived
              experience shapes the things I build.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects" variant="secondary">
              Projects
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </div>

        <MotionCard className="h-full">
          <CardHeader className="space-y-3">
            <CardDescription className="text-xs uppercase tracking-[0.14em] text-white/50">
              Orientation
            </CardDescription>
            <CardTitle className="text-2xl">Calm, serious, and human-centered</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/80">
            <p>
              I tend to care about the point where personal experience meets structure: where
              systems either help people move forward or make life harder than it needs to be.
            </p>
            <p>
              That is why the work usually takes the same shape. Make complexity more readable, keep
              the human reality visible, and build with enough rigor that the result can hold up in
              the real world.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs uppercase tracking-[0.14em] text-white/55">
              Calm is not aesthetic. Calm is responsible.
            </div>
          </CardContent>
        </MotionCard>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Values</p>
          <h2 className="max-w-3xl">Principles that stay with me across different kinds of work</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {values.map((value) => (
            <MotionCard className="h-full" key={value.title}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/75">{value.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Focus Areas
          </p>
          <h2 className="max-w-3xl">Where most of my attention goes</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {focusAreas.map((area) => (
            <MotionCard className="h-full" key={area.title}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/75">{area.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection className="pt-0" containerClassName="max-w-4xl" motionClassName="space-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Timeline
          </p>
          <h2 className="max-w-3xl">A short timeline of education, writing, and direction</h2>
        </div>

        <div className="relative space-y-8 border-l border-white/10 pl-8">
          {timeline.map((item) => (
            <div className="relative" key={item.label}>
              <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border border-white/15 bg-zinc-950" />
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-white">{item.detail}</p>
              <p className="mt-2 text-sm text-white/75">{item.note}</p>
            </div>
          ))}
        </div>
      </MotionSection>
    </>
  );
}
