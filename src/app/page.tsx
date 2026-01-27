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
  Divider,
  Section,
} from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Samir Seddiqi builds calm, institution-ready infrastructure across product, writing, and civic collaboration.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — VitaAvanza`,
    description:
      "Calm, institution-ready infrastructure across product, writing, and civic collaboration.",
    url: siteConfig.url,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — VitaAvanza`,
    description:
      "Calm, institution-ready infrastructure across product, writing, and civic collaboration.",
    images: ["/opengraph-image"],
  },
};

const credibilityItems = [
  {
    title: "Founder & CEO",
    detail: "VitaAvanza",
    description:
      "An early-stage life-navigation platform focused on students, young workers, and people in transition.",
  },
  {
    title: "Economics & Management",
    detail: "University of Trento",
    description:
      "A grounding in systems thinking, resource allocation, and institutional realities.",
  },
  {
    title: siteConfig.book.title,
    detail: siteConfig.book.award,
    description: "A writing practice that prioritizes clarity, responsibility, and long-term legibility.",
  },
] as const;

const highlights = [
  {
    title: "Institution-ready interfaces",
    description:
      "Designing experiences that remain calm and useful under scrutiny, not just in ideal conditions.",
  },
  {
    title: "Product direction with governance",
    description:
      "Turning complexity into a coherent roadmap that institutions, partners, and teams can trust.",
  },
  {
    title: "Writing as infrastructure",
    description:
      "Using structured writing to make decisions auditable, durable, and aligned across stakeholders.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <FadeIn className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">Institutional Infrastructure</Badge>
              <Badge>VitaAvanza</Badge>
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl">Calm systems for people and institutions in transition</h1>
              <p className="max-w-2xl text-base text-white/75 sm:text-lg">
                I work at the intersection of economics, product strategy, writing, and institutional
                collaboration. The goal is simple: make serious work feel dependable, legible, and
                ready for real-world complexity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects" size="lg">
                View Projects
              </ButtonLink>
              <ButtonLink href="/book" size="lg" variant="secondary">
                The Book
              </ButtonLink>
              <ButtonLink href="/resume" size="lg" variant="outline">
                Resume
              </ButtonLink>
            </div>
          </div>

          <Card className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(45rem_35rem_at_120%_-10%,rgba(125,211,252,0.25),transparent_65%)]"
            />
            <CardHeader className="space-y-3">
              <CardDescription className="text-xs uppercase tracking-[0.14em] text-white/50">
                Current focus
              </CardDescription>
              <CardTitle className="text-2xl">Life navigation with institutional depth</CardTitle>
              <CardDescription className="text-sm text-white/75">
                VitaAvanza is being built to support people through transitions while meeting the
                expectations of serious partners and public-facing systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/80">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span>Primary domain</span>
                <span className="font-medium text-white">Transition systems</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span>Operating lens</span>
                <span className="font-medium text-white">Clarity under constraint</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span>Output style</span>
                <span className="font-medium text-white">Calm, durable, auditable</span>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </Section>

      <Section className="pt-0">
        <FadeIn className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Credibility
            </p>
            <h2 className="max-w-3xl">Built for collaboration with institutions, not just audiences</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {credibilityItems.map((item) => (
              <Card className="h-full" key={item.title}>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-white/75">{item.detail}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-white/75">{item.description}</CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-0" containerClassName="max-w-5xl">
        <FadeIn className="space-y-10">
          <div className="surface grid gap-8 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-10">
            <div className="space-y-5">
              <Badge variant="accent">{siteConfig.book.award}</Badge>
              <h2 className="max-w-xl">{siteConfig.book.title}</h2>
              <p className="text-base text-white/75">
                A book about being heard when systems move faster than people can process. It is
                shared carefully and intentionally.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
                  Request a copy
                </ButtonLink>
                <ButtonLink href="/book" variant="outline">
                  Book details
                </ButtonLink>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm font-semibold text-white">Distribution</p>
              <p className="text-sm text-white/75">
                {siteConfig.book.distribution}. Requests are handled directly via email.
              </p>
              <Divider />
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Contact</p>
              <p className="text-sm text-white/85">{siteConfig.email}</p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-0">
        <FadeIn className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
              Featured Highlights
            </p>
            <h2 className="max-w-3xl">Work that stays calm as complexity increases</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <Card className="h-full" key={item.title}>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/75">{item.description}</CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-0">
        <FadeIn className="surface space-y-5 p-8 md:p-10">
          <Badge>Institution-ready note</Badge>
          <h2 className="max-w-3xl">This site is designed like infrastructure</h2>
          <p className="max-w-3xl text-base text-white/75">
            The intention is not to impress quickly. It is to communicate stability, make decisions
            legible, and create a reliable next step for serious collaborators.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
            <ButtonLink href="/blog" variant="ghost">
              Read the blog
            </ButtonLink>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
