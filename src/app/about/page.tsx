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
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "About Samir Seddiqi",
  description:
    "About Samir Seddiqi, founder of VitaAvanza, author, and Economics & Management student at the University of Trento.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "Founder of VitaAvanza, author, and Economics & Management student at the University of Trento.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "About Samir Seddiqi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteConfig.name}`,
    description:
      "Founder of VitaAvanza, author, and Economics & Management student at the University of Trento.",
    images: [ogImage],
  },
};

const values = [
  {
    title: "Discipline",
    description:
      "I believe ambition matters, but only when it is backed by discipline, consistency, and the willingness to keep going.",
  },
  {
    title: "Responsibility",
    description:
      "Hardship changes the way you think about work. It teaches you to take reality seriously and not build carelessly.",
  },
  {
    title: "Clarity",
    description:
      "I am drawn to ideas that become clearer with thought, pressure, and honest execution rather than noise.",
  },
] as const;

const focusAreas = [
  {
    title: "Writing",
    description:
      "Writing helps me confront meaning, memory, truth, and identity with more honesty than most spaces allow.",
  },
  {
    title: "Business and economics",
    description:
      "I care about the structures that shape opportunity, value, responsibility, and long-term direction.",
  },
  {
    title: "Building",
    description:
      "I am interested in turning serious ideas into something real, useful, and able to hold its ground in the world.",
  },
] as const;

const timeline = [
  {
    label: "2022",
    detail: siteConfig.book.award,
    note: `${siteConfig.book.title} received early recognition, quietly affirming the importance of honest and personal writing.`,
  },
  {
    label: "2023-present",
    detail: "Economics and Management | University of Trento",
    note: "Academic work that continues to shape how I think about systems, decisions, and long-term value.",
  },
  {
    label: "2025-present",
    detail: "Founder of VitaAvanza",
    note: "Building a project that brings together writing, structure, responsibility, and a serious interest in real-life progress.",
  },
] as const;

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    sameAs: [siteConfig.linkedin],
    jobTitle: "Founder of VitaAvanza, Author, and Economics & Management Student",
    description:
      "Samir Seddiqi is the founder of VitaAvanza, an author, and an Economics & Management student at the University of Trento.",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company.shortName,
      url: siteConfig.company.url,
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
            <h1 className="max-w-4xl">About</h1>
            <p className="max-w-2xl text-base text-white/75 sm:text-lg">
              I am Samir Seddiqi, an author, founder, and student of Economics and Management at
              the University of Trento.
            </p>
            <p className="max-w-2xl text-base text-white/75">
              My perspective was not built in comfort. It was shaped by responsibility, hardship,
              discipline, and the need to keep moving forward even when life becomes heavy. That
              reality has influenced the way I think, write, and build.
            </p>
            <p className="max-w-2xl text-base text-white/75">
              I am drawn to business, economics, innovation, and the deeper structures that shape
              people&apos;s opportunities. I believe ambition matters, but only when it is backed by
              discipline. I believe vision matters, but only when it is followed by execution.
            </p>
            <p className="max-w-2xl text-base text-white/75">
              This website is where I bring together my work, my thinking, and the direction I am
              building toward, in a way that feels personal rather than polished for its own sake.
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
              Perspective
            </CardDescription>
            <CardTitle className="text-2xl">What shaped me stays in the work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/80">
            <p>
              I care about the point where lived experience meets structure, where a person&apos;s
              reality either becomes clearer or more difficult because of the systems around them.
            </p>
            <p>
              That is why my work tends to move in the same direction: make complexity more
              readable, keep the human reality visible, and build with enough seriousness that the
              result can hold up in real life.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs uppercase tracking-[0.14em] text-white/55">
              What shapes a person eventually shapes the work.
            </div>
          </CardContent>
        </MotionCard>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Values</p>
          <h2 className="max-w-3xl">Principles that shape the way I move through work</h2>
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
          <h2 className="max-w-3xl">Where my attention goes most naturally</h2>
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
          <h2 className="max-w-3xl">A short timeline of writing, study, and direction</h2>
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
