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
  title: "Resume and VitaAvanza",
  description:
    "Resume of Samir Seddiqi, founder of VitaAvanza, across academic study, writing, project building, and early professional experience.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Resume | ${siteConfig.name}`,
    description:
      "Resume of Samir Seddiqi, founder of VitaAvanza, across academic study, writing, project building, and early professional experience.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Samir Seddiqi Resume" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume | ${siteConfig.name}`,
    description:
      "Resume of Samir Seddiqi, founder of VitaAvanza, across academic study, writing, project building, and early professional experience.",
    images: [ogImage],
  },
};

const competencies = [
  {
    title: "Writing and communication",
    description:
      "Able to turn complex ideas and lived experience into language that is clear, serious, and intentional.",
  },
  {
    title: "Strategic thinking",
    description:
      "Comfortable thinking in terms of systems, trade-offs, long-term direction, and the discipline required to follow through.",
  },
  {
    title: "Project building",
    description:
      "Drawn to ideas that can move beyond theory and become something structured, workable, and real.",
  },
  {
    title: "Research and discovery",
    description:
      "Attentive to human reality and able to translate observation, listening, and lived context into direction.",
  },
  {
    title: "Adaptability under pressure",
    description:
      "Used to building and operating without ideal conditions while staying reliable, focused, and composed.",
  },
  {
    title: "Institutional awareness",
    description:
      "I think carefully about credibility, accountability, and how work lands inside serious environments.",
  },
] as const;

const experience = [
  {
    title: "Founder & CEO",
    institution: "VitaAvanza S.r.l.",
    timeframe: "2025-present",
    detail:
      "Leading the early direction of VitaAvanza and shaping the project across concept development, structure, communication, and long-term positioning.",
  },
  {
    title: "Educational talks in schools",
    institution: "Selected speaking",
    timeframe: "Ongoing",
    detail:
      "Speaking with students about resilience, integration, education, and the realities of building a future under pressure.",
  },
  {
    title: "Volunteer work",
    institution: "Centro Astalli",
    timeframe: "Community",
    detail:
      "Supporting people in vulnerable situations and staying close to the human realities that often sit behind systems, bureaucracy, and transition.",
  },
] as const;

const education = [
  {
    title: "BSc in Economics and Management",
    institution: "University of Trento",
    timeframe: "2023-2027",
    detail:
      "Academic work centered on economics, management, and the way structure, incentives, and decisions shape long-term outcomes.",
  },
  {
    title: "Student review and feedback group",
    institution: "University of Trento",
    timeframe: "Academic involvement",
    detail:
      "Contributing student perspective and feedback to improve clarity, communication, and the quality of the academic environment.",
  },
] as const;

const languages = ["Persian (native)", "Italian (fluent)", "English (fluent)"] as const;

export default function ResumePage() {
  return (
    <>
      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto flex max-w-4xl flex-col gap-6 text-center"
      >
        <Badge variant="accent" className="mx-auto">
          Resume
        </Badge>
        <h1>Resume</h1>
        <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
          My background combines academic study, writing, project-building, and hands-on work
          across different environments.
        </p>
        <p className="mx-auto max-w-3xl text-base text-white/70">
          This page reflects the way I have been learning, working, writing, and building so far,
          with the same seriousness I try to bring to everything I do.
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
          <h2 className="max-w-3xl">Capabilities I try to carry across different environments</h2>
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
            <MotionCard className="h-full" key={item.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{item.description}</CardContent>
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
              Experience
            </p>
            <CardTitle className="text-2xl">Professional and project work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-white/75">
            {experience.map((item, index) => (
              <div className="space-y-2" key={item.title}>
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="text-sm text-white/70">
                  {item.institution} | {item.timeframe}
                </p>
                <p>{item.detail}</p>
                {index < experience.length - 1 ? <Divider /> : null}
              </div>
            ))}
          </CardContent>
        </MotionCard>

        <MotionCard className="h-full">
          <CardHeader className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Education and involvement
            </p>
            <CardTitle className="text-2xl">Study, contribution, and languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-white/75">
            {education.map((item) => (
              <div className="space-y-2" key={item.title}>
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="text-sm text-white/70">
                  {item.institution} | {item.timeframe}
                </p>
                <p>{item.detail}</p>
                <Divider />
              </div>
            ))}
            <div className="space-y-2">
              <p className="text-base font-semibold text-white">Languages</p>
              <p>{languages.join(", ")}</p>
            </div>
          </CardContent>
        </MotionCard>
      </MotionSection>
    </>
  );
}
