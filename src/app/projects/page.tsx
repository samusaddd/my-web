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
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across VitaAvanza, institutional collaboration, and writing as infrastructure.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${siteConfig.name}`,
    description:
      "Selected work across VitaAvanza, institutional collaboration, and writing as infrastructure.",
    url: `${siteConfig.url}/projects`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Samir Seddiqi Projects" }],
  },
};

const projects = [
  {
    title: "VitaAvanza",
    role: "Founder & CEO",
    focus: "Life navigation for transitions",
    description:
      "An early-stage platform focused on students, young workers, and people navigating change. The work emphasizes calm guidance, credible structure, and institutional readiness.",
    status: "Active",
  },
  {
    title: "Civic and institutional collaboration",
    role: "Strategy and product alignment",
    focus: "Systems that must work under scrutiny",
    description:
      "Ongoing involvement in civic and institutional contexts where clarity, governance, and public trust are part of the product brief. The goal is to make decisions legible and outcomes dependable.",
    status: "Ongoing",
  },
  {
    title: siteConfig.book.title,
    role: "Author",
    focus: "Writing as infrastructure",
    description:
      "A writing project recognized with the Writer of the Year Award (2022). It reinforces the practice of turning complex realities into language that can travel across audiences and institutions.",
    status: siteConfig.book.distribution,
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
        <h1>Work designed to be credible in serious rooms</h1>
        <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
          These projects are organized around a single standard: they should remain clear,
          trustworthy, and useful as complexity increases and stakeholders multiply.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/resume" variant="secondary">
            Resume
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
        motionClassName="grid gap-6 lg:grid-cols-3"
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
          <Badge>Institution-ready note</Badge>
          <h2 className="text-3xl">Project briefs include governance by default</h2>
          <p className="max-w-2xl text-sm text-white/75">
            The intention is to make collaboration easier for partners, teams, and institutions by
            making decisions explicit, traceable, and calm to review.
          </p>
        </div>
        <ButtonLink href="/blog" variant="ghost">
          Read the writing
        </ButtonLink>
      </MotionSection>
    </>
  );
}
