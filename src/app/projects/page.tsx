import type { Metadata } from "next";

import { MotionCard } from "@/components/motion/motion-card";
import { MotionSection } from "@/components/motion/motion-section";
import {
  Badge,
  ButtonLink,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/projects");
const ogImage = absoluteUrl("/opengraph-image");

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across VitaAvanza, Mitra, DVI, field discovery, and institution-ready system design.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "Selected work across VitaAvanza, Mitra, DVI, field discovery, and institution-ready system design.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Samir Seddiqi Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description:
      "Selected work across VitaAvanza, Mitra, DVI, field discovery, and institution-ready system design.",
    images: [ogImage],
  },
};

const projects = [
  {
    title: siteConfig.company.name,
    role: "Founder",
    focus: "Infrastructure for life navigation",
    description:
      "The company-level operating layer being built in Trento to connect people in transition with institutions that need earlier, clearer visibility.",
    status: "Active",
  },
  {
    title: "Mitra",
    role: "Guidance layer",
    focus: "Specialized intelligence",
    description:
      "Turns onboarding data, DVI posture, and institutional constraints into the next practical move rather than generic advice.",
    status: "In build",
  },
  {
    title: "DVI",
    role: "Explainable posture model",
    focus: "Stability, load, growth, support",
    description:
      "An explainable posture view designed to show reality clearly and early, without collapsing people into a black-box score.",
    status: "In build",
  },
  {
    title: "Field discovery and pilot design",
    role: "Research and operating model",
    focus: `${siteConfig.discovery.total} interviews and ${siteConfig.discovery.pilot}-person pilot direction`,
    description:
      "Structured discovery across immigrant and international-student populations used to shape product decisions and pilot logic.",
    status: "Ongoing",
  },
] as const;

export default function ProjectsPage() {
  return (
    <>
      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto flex max-w-4xl flex-col gap-6 text-center"
      >
        <Badge variant="accent" className="mx-auto">
          Selected Projects
        </Badge>
        <h1>Work that turns life-navigation theory into operating systems</h1>
        <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
          The projects here sit around one core effort: make VitaAvanza credible for real pressure,
          real people, and serious institutional use.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/about" variant="secondary">
            About
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact
          </ButtonLink>
        </div>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-6xl"
        delayChildren={0.03}
        motionClassName="grid gap-6 lg:grid-cols-2"
        staggerChildren={0.08}
      >
        {projects.map((project) => (
          <MotionCard className="flex h-full flex-col" key={project.title}>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/45">
                <span>{project.role}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70">
                  {project.status}
                </span>
              </div>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription className="text-white/75">{project.focus}</CardDescription>
            </CardHeader>
            <CardContent className="mt-4 flex-1 text-sm text-white/75">
              {project.description}
            </CardContent>
          </MotionCard>
        ))}
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        motionClassName="surface flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between md:p-10"
      >
        <div className="space-y-2">
          <Badge>Operating note</Badge>
          <h2 className="text-3xl">The project standard is institutional credibility</h2>
          <p className="max-w-2xl text-sm text-white/75">
            The work is judged by whether it stays legible under scrutiny, not whether it looks
            impressive in a demo.
          </p>
        </div>
        <ButtonLink href="/resume" variant="ghost">
          Resume overview
        </ButtonLink>
      </MotionSection>
    </>
  );
}
