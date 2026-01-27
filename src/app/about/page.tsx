import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import {
  Badge,
  ButtonLink,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Section,
} from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Samir Seddiqi: founder of VitaAvanza, working across economics, product strategy, and institutional collaboration.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description:
      "Founder of VitaAvanza, working across economics, product strategy, and institutional collaboration.",
    url: `${siteConfig.url}/about`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "About Samir Seddiqi" }],
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
    title: "Civic alignment",
    description:
      "Product choices should remain compatible with institutions, public expectations, and long-term accountability.",
  },
] as const;

const focusAreas = [
  {
    title: "Product direction",
    description:
      "Turning early-stage complexity into a coherent operating model that teams and partners can align behind.",
  },
  {
    title: "Institutional collaboration",
    description:
      "Designing work that holds up in formal environments, where scrutiny, policy, and trust matter.",
  },
  {
    title: "Writing and strategy",
    description:
      "Using structured writing to make decisions auditable, durable, and easier to revisit as conditions change.",
  },
] as const;

const timeline = [
  {
    label: "Foundation",
    detail: "Economics & Management — University of Trento",
    note: "A systems-based approach to decisions, trade-offs, and institutional realities.",
  },
  {
    label: "2022",
    detail: siteConfig.book.award,
    note: `Recognized for ${siteConfig.book.title}, reinforcing a commitment to careful, responsible writing.`,
  },
  {
    label: "Now",
    detail: "Founder & CEO — VitaAvanza",
    note: "Building transition infrastructure for people, with the operational depth institutions expect.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <FadeIn className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-7">
            <Badge variant="accent">About</Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl">Strategy that respects both people and institutions</h1>
              <p className="max-w-2xl text-base text-white/75 sm:text-lg">
                I am the Founder and CEO of VitaAvanza, an early-stage life-navigation platform
                focused on students, young workers, and people in transition. My work sits at the
                intersection of economics, product strategy, and institutional collaboration.
              </p>
              <p className="max-w-2xl text-base text-white/75">
                The throughline is consistent: create calm systems that reduce ambiguity, help people
                move forward, and remain credible when the stakes are high.
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

          <Card className="h-full">
            <CardHeader className="space-y-3">
              <CardDescription className="text-xs uppercase tracking-[0.14em] text-white/50">
                Operating posture
              </CardDescription>
              <CardTitle className="text-2xl">Institution-ready, human-centered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-white/80">
              <p>
                I design for the reality that systems are often used under pressure, by people who did
                not choose the system and may not trust it yet.
              </p>
              <p>
                This changes the bar. The work must be calm, precise, and capable of supporting formal
                collaboration without losing human clarity.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs uppercase tracking-[0.14em] text-white/55">
                Calm is not aesthetic. Calm is responsible.
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </Section>

      <Section className="pt-0">
        <FadeIn className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Values
            </p>
            <h2 className="max-w-3xl">Principles that survive complexity</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card className="h-full" key={value.title}>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/75">{value.description}</CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-0">
        <FadeIn className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Focus Areas
            </p>
            <h2 className="max-w-3xl">Where I spend most of my attention</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {focusAreas.map((area) => (
              <Card className="h-full" key={area.title}>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/75">{area.description}</CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-0" containerClassName="max-w-4xl">
        <FadeIn className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Timeline
            </p>
            <h2 className="max-w-3xl">A short timeline of intent and direction</h2>
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
        </FadeIn>
      </Section>
    </>
  );
}
