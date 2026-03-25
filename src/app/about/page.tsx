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
    "From Trento and the University of Trento ecosystem, Samir Seddiqi is building VitaAvanza from lived migration, student, and bureaucratic friction.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "From Trento and the University of Trento ecosystem, Samir Seddiqi is building VitaAvanza from lived migration, student, and bureaucratic friction.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "About Samir Seddiqi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteConfig.name}`,
    description:
      "From Trento and the University of Trento ecosystem, Samir Seddiqi is building VitaAvanza from lived migration, student, and bureaucratic friction.",
    images: [ogImage],
  },
};

const values = [
  {
    title: "Human first",
    description:
      "Data matters, but the human behind it matters more. Systems should reduce pressure, not make people feel observed or punished.",
  },
  {
    title: "Radical honesty",
    description:
      "The goal is not to promise magic. It is to make the next grounded step visible when life becomes heavy or confusing.",
  },
  {
    title: "Lived experience",
    description:
      "This work comes from real migration, study, and work-system friction rather than detached product speculation.",
  },
  {
    title: "Privacy and dignity",
    description:
      "The system has to stay consent-led, explainable, and compatible with the dignity of the people inside it.",
  },
] as const;

const timeline = [
  {
    label: "2023-2024",
    detail: "The pressure becomes a product question",
    note: "Migration, bureaucracy, academic load, and life instability in Trento became the reason to build infrastructure instead of another disconnected tool.",
  },
  {
    label: "2025",
    detail: "Concept becomes architecture",
    note: "Mitra, DVI, and the first coherent operating model moved from notes into structured product design.",
  },
  {
    label: "2026+",
    detail: "Pilot and institutional direction",
    note: `${siteConfig.discovery.total} interviews completed, ${siteConfig.discovery.pilot}-person pilot planning underway, and active positioning for institution-ready collaboration.`,
  },
] as const;

const discoveryCards = [
  {
    label: "Discovery total",
    value: `${siteConfig.discovery.total}`,
    description: "Direct interviews completed before pilot launch work.",
  },
  {
    label: "Immigrants",
    value: `${siteConfig.discovery.immigrants}`,
    description: "Conversations focused on settlement, documents, housing, and work friction.",
  },
  {
    label: "International students",
    value: `${siteConfig.discovery.students}`,
    description: "Interviews on timing, study pressure, and bureaucracy.",
  },
  {
    label: "Next step",
    value: `${siteConfig.discovery.pilot}`,
    description: "Initial immigrant pilot direction currently being prepared.",
  },
] as const;

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    sameAs: [siteConfig.linkedin],
    jobTitle: "Founder of VitaAvanza",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Trento",
    },
    description: siteConfig.description,
  } as const;

  return (
    <>
      <JsonLd data={personJsonLd} id="person-jsonld-about" />

      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
      >
        <div className="space-y-7">
          <Badge variant="accent">About</Badge>
          <div className="space-y-5">
            <h1 className="max-w-4xl">From fragmentation in Trento to life-navigation infrastructure</h1>
            <p className="max-w-2xl text-base text-white/75 sm:text-lg">
              VitaAvanza started from lived pressure inside Trento: migration bureaucracy, academic
              stress, timing loss, and the feeling of being left alone with complex systems.
            </p>
            <p className="max-w-2xl text-base text-white/75">
              I am building the company from that point of origin, with the University of Trento
              ecosystem, field discovery, and institution-ready product logic shaping the work.
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
              Founder point of view
            </CardDescription>
            <CardTitle className="text-2xl">Built from lived pressure, not a detached brief</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/80">
            <p>
              The question behind VitaAvanza is simple: how many young people lose momentum not from
              a lack of ability, but because the system is too fragmented, heavy, or confusing?
            </p>
            <p>
              That is why the work is not only about software. It is about continuity, dignity, and
              making the next step legible before pressure becomes crisis.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/75">
              Built in {siteConfig.location} within the {siteConfig.company.ecosystem}.
            </div>
          </CardContent>
        </MotionCard>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-7xl"
        motionClassName="grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]"
      >
        <div className="space-y-5">
          <Badge>Origin</Badge>
          <h2 className="max-w-3xl">The company was born from a real experience</h2>
          <div className="max-w-2xl space-y-4 text-base text-white/75">
            <p>
              VitaAvanza was born in the corridors of the University of Trento, between waiting
              rooms, deadlines, late nights studying, and the police immigration office. This is not
              a theoretical story. It is lived.
            </p>
            <p>
              The pattern was always the same: burnout, confusion, and the feeling of being left
              alone with adult life without a single operating map. That pressure became the reason
              to build infrastructure instead of another disconnected tool.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
            Guiding question
          </p>
          <p className="mt-5 text-xl leading-relaxed text-white/90">
            How many young people are giving up on their future just because the system is too
            confusing, too heavy, or too loud for their mind and heart?
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/45">
            Samir Seddiqi | Founder of VitaAvanza
          </p>
        </div>
      </MotionSection>

      <MotionSection className="pt-0" containerClassName="max-w-7xl" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Grounded discovery
          </p>
          <h2 className="max-w-3xl">The story became a system only after the field confirmed it</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.03}
          motionClassName="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
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
              <CardContent className="text-sm text-white/75">{card.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Values</p>
          <h2 className="max-w-3xl">What guides the work</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
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

      <MotionSection className="pt-0" containerClassName="max-w-4xl" motionClassName="space-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Timeline
          </p>
          <h2 className="max-w-3xl">How the direction took shape</h2>
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
