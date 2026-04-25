import type { Metadata } from "next";

import { MotionCard } from "@/components/motion/motion-card";
import { MotionSection } from "@/components/motion/motion-section";
import { PageHero } from "@/components/page-hero";
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

const canonicalUrl = absoluteUrl("/projects");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "Projects and VitaAvanza",
  description:
    "Projects by Samir Seddiqi, including VitaAvanza, the main project he founded and continues to build.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "Projects by Samir Seddiqi, including VitaAvanza, the main project he founded and continues to build.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Samir Seddiqi Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description:
      "Projects by Samir Seddiqi, including VitaAvanza, the main project he founded and continues to build.",
    images: [ogImage],
  },
};

const projects = [
  {
    title: "VitaAvanza",
    role: "Founder",
    focus: "Building systems for direction, development, and real-life progress.",
    description:
      "VitaAvanza is a platform built around a simple belief: progress should be understood more deeply than money alone. The project explores how people and institutions can navigate stability, growth, support, and opportunity in a more structured, human, and forward-looking way.",
    status: "Active",
  },
  {
    title: siteConfig.newBook.title,
    role: "Author",
    focus: "A new literary work",
    description:
      "A work on identity, meaning, and the quiet continuation of existence when certainty dissolves. It expands the writing side of my work into a sharper and more existential direction.",
    status: "New",
  },
  {
    title: siteConfig.book.title,
    role: "Author",
    focus: "A personal literary work",
    description:
      "A deeply personal work shaped by emotion, silence, pain, and reflection. It is part of the same broader direction, using writing to stay close to truth and human depth.",
    status: "Published",
  },
  {
    title: "Writing and notes",
    role: "Ongoing",
    focus: "Essays, reflections, and direction",
    description:
      "An ongoing body of work shaped by experience, reflection, ambition, and the ideas that continue to influence how I think and build.",
    status: "Ongoing",
  },
] as const;

export default function ProjectsPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.name,
    alternateName: siteConfig.company.shortName,
    url: siteConfig.company.url,
    sameAs: [siteConfig.company.linkedin],
    founder: {
      "@type": "Person",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    description:
      "VitaAvanza is the main project founded by Samir Seddiqi, focused on progress, support, stability, and direction.",
  } as const;

  return (
    <>
      <JsonLd data={organizationJsonLd} id="organization-jsonld-projects" />

      <PageHero
        actions={[
          { href: "/about", label: "About", variant: "secondary" },
          { href: "/contact", label: "Contact", variant: "outline" },
        ]}
        aside={
          <MotionCard className="h-full border-cyan-200/18 bg-cyan-300/[0.04]">
            <CardHeader className="space-y-3">
              <CardDescription className="text-xs uppercase text-cyan-100/58">
                Main build
              </CardDescription>
              <CardTitle className="text-3xl">{siteConfig.company.shortName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-white/78">
              <p>
                A company and platform shaped by progress, support, stability, and direction.
              </p>
              <p>
                The goal is to build with enough structure that a serious idea can become useful in
                real life.
              </p>
            </CardContent>
          </MotionCard>
        }
        badge="Projects"
        description="These are the projects and ideas I have been building, each shaped by a real direction, not just an abstract concept."
        eyebrow="Company, books, writing"
        metrics={[
          { label: "Company", value: "Active" },
          { label: "Books", value: "2" },
        ]}
        title="Work that has to become real"
      />

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
              <div className="flex items-center justify-between text-xs uppercase text-white/45">
                <span>{project.role}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70">
                  {project.status}
                </span>
              </div>
              <CardTitle className="text-3xl">{project.title}</CardTitle>
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
          <Badge>Working standard</Badge>
          <h2 className="text-3xl">The work has to stay grounded in reality</h2>
          <p className="max-w-2xl text-sm text-white/75">
            I care more about substance, clarity, and follow-through than presentation without depth.
          </p>
        </div>
        <ButtonLink href="/resume" variant="ghost">
          Resume
        </ButtonLink>
      </MotionSection>
    </>
  );
}
