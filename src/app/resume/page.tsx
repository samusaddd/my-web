import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import {
  Badge,
  ButtonLink,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Divider,
  Section,
} from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume overview for Samir Seddiqi, including competencies, education, and civic engagement. CV available for download.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `Resume — ${siteConfig.name}`,
    description:
      "Competencies, education, and civic engagement. CV available for download.",
    url: `${siteConfig.url}/resume`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Samir Seddiqi Resume" }],
  },
};

const competencies = [
  "Strategy and operations",
  "Product direction",
  "Institutional collaboration",
  "Governance-aware design",
  "Writing and communication",
  "Transition systems thinking",
] as const;

const education = [
  {
    title: "Economics & Management",
    institution: "University of Trento",
    detail: "A foundation in systems thinking, economic decision-making, and structured analysis.",
  },
] as const;

const civicEngagement = [
  {
    title: "Civic and institutional involvement",
    detail:
      "Participation in initiatives and conversations focused on youth transitions, public outcomes, and responsible system design.",
  },
  {
    title: "Writing in public",
    detail:
      "Using essays and structured notes to make decisions and trade-offs legible to broader audiences and partners.",
  },
] as const;

export default function ResumePage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <FadeIn className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <Badge variant="accent" className="mx-auto">
            Resume Overview
          </Badge>
          <h1>Institution-ready leadership with product depth</h1>
          <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
            I build systems that remain calm, credible, and useful as complexity increases. The work
            connects strategy, product clarity, and institutional alignment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/Samir-Seddiqi-CV.pdf" size="lg" download>
              Download CV
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-0" containerClassName="max-w-6xl">
        <FadeIn className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Key competencies
            </p>
            <h2 className="max-w-3xl">Capabilities that travel across contexts</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((item) => (
              <Card className="h-full" key={item}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/70">
                  Built to support clarity, accountability, and collaboration under real constraints.
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-0" containerClassName="max-w-5xl">
        <FadeIn className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Card className="h-full">
            <CardHeader className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
                Education
              </p>
              <CardTitle className="text-2xl">Academic foundation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-white/75">
              {education.map((item) => (
                <div className="space-y-2" key={item.title}>
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-white/70">{item.institution}</p>
                  <p>{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
                Civic engagement
              </p>
              <CardTitle className="text-2xl">Public-facing orientation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-white/75">
              {civicEngagement.map((item, index) => (
                <div className="space-y-2" key={item.title}>
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p>{item.detail}</p>
                  {index === 0 ? <Divider /> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </Section>
    </>
  );
}
