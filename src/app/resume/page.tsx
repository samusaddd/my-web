import type { Metadata } from "next";

import { MotionCard } from "@/components/motion/motion-card";
import { MotionSection } from "@/components/motion/motion-section";
import {
  Badge,
  ButtonLink,
  CardContent,
  CardHeader,
  CardTitle,
  Divider,
} from "@/components/ui";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/resume");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Founder profile for Samir Seddiqi across VitaAvanza, product strategy, discovery research, and institution-ready systems.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Resume | ${siteConfig.name}`,
    description:
      "Founder profile across VitaAvanza, product strategy, discovery research, and institution-ready systems.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Samir Seddiqi Resume" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume | ${siteConfig.name}`,
    description:
      "Founder profile across VitaAvanza, product strategy, discovery research, and institution-ready systems.",
    images: [ogImage],
  },
};

const competencies = [
  "Founder leadership",
  "Life-navigation product strategy",
  "Discovery research",
  "Institutional collaboration",
  "Governance-aware design",
  "Writing and communication",
] as const;

const education = [
  {
    title: "Economics and Management",
    institution: "University of Trento",
    detail: "Foundation in systems thinking, economic decision-making, and structured analysis.",
  },
] as const;

const operatingSignals = [
  {
    title: "Company direction",
    detail:
      "Founder of VitaAvanza, building the operating layer around Mitra, DVI, and institution-ready coordination.",
  },
  {
    title: "Field discovery",
    detail: `${siteConfig.discovery.total} interviews completed across immigrant and international-student populations before pilot rollout work.`,
  },
] as const;

export default function ResumePage() {
  return (
    <>
      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto flex max-w-4xl flex-col gap-6 text-center"
      >
        <Badge variant="accent" className="mx-auto">
          Resume Overview
        </Badge>
        <h1>Founder profile with product depth and institutional orientation</h1>
        <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
          The work connects strategy, discovery, product logic, and institution-ready execution. It
          is designed for real systems, not idealized launch conditions.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/Samir-Seddiqi-CV.pdf" size="lg" download>
            Download CV
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outline">
            Contact
          </ButtonLink>
        </div>
      </MotionSection>

      <MotionSection className="pt-0" containerClassName="max-w-6xl" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Key competencies
          </p>
          <h2 className="max-w-3xl">Capabilities that travel across product and institutional work</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerChildren={0.08}
        >
          {competencies.map((item) => (
            <MotionCard className="h-full" key={item}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Built to support clarity, accountability, and forward motion under real constraints.
              </CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        delayChildren={0.02}
        motionClassName="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        staggerChildren={0.08}
      >
        <MotionCard className="h-full">
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
        </MotionCard>

        <MotionCard className="h-full">
          <CardHeader className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Operating signals
            </p>
            <CardTitle className="text-2xl">Current direction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-white/75">
            {operatingSignals.map((item, index) => (
              <div className="space-y-2" key={item.title}>
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p>{item.detail}</p>
                {index === 0 ? <Divider /> : null}
              </div>
            ))}
          </CardContent>
        </MotionCard>
      </MotionSection>
    </>
  );
}
