import type { Metadata } from "next";

import { HeroBackground } from "@/components/hero-background";
import { HomeIntro } from "@/components/home-intro";
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
  Divider,
} from "@/components/ui";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "Founder of VitaAvanza",
  description:
    "I'm Samir Seddiqi, founder of VitaAvanza, writer, and Economics & Management student in Trento. This is my personal space, where writing, ambition, lived experience, and the work behind VitaAvanza come together.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    title: `${siteConfig.name} | Founder of VitaAvanza`,
    description:
      "I'm Samir Seddiqi, founder of VitaAvanza, writer, and Economics & Management student in Trento. This is my personal space, where writing, ambition, lived experience, and the work behind VitaAvanza come together.",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Founder of VitaAvanza`,
    description:
      "I'm Samir Seddiqi, founder of VitaAvanza, writer, and Economics & Management student in Trento. This is my personal space, where writing, ambition, lived experience, and the work behind VitaAvanza come together.",
    images: [ogImage],
  },
};

const heroCards = [
  {
    label: "University of Trento",
    description:
      "Studying Economics and Management with a long-term interest in structure, decisions, and real-world complexity.",
  },
  {
    label: "VitaAvanza",
    description:
      "Building a project shaped by lived experience and a belief that progress deserves more clarity, depth, and direction.",
  },
  {
    label: "Writing",
    description:
      "Two books now sit inside the work: one about being heard, one about identity and certainty dissolving.",
  },
] as const;

const aboutHighlights = [
  {
    label: "Student",
    value: "Economics and Management",
    description: "Learning to think with discipline, structure, and a serious respect for trade-offs.",
  },
  {
    label: "Author",
    value: "Two books",
    description: "Writing from lived experience, reflection, identity, and the need to stay honest on the page.",
  },
  {
    label: "Founder",
    value: siteConfig.company.shortName,
    description: "Turning pressure, ambition, and responsibility into something real, useful, and lasting.",
  },
  {
    label: "Approach",
    value: "Direction over noise",
    description: "Trying to turn hard experience into clarity, structure, and forward movement.",
  },
] as const;

const whatIDoCards = [
  {
    title: "Writing",
    description:
      "I write from experience, reflection, and conviction. For me, writing is not just expression, it is a way of confronting meaning, truth, and identity.",
  },
  {
    title: "Building",
    description:
      "I build projects with direction. I am interested in ideas that can move beyond theory and become something real, useful, and lasting.",
  },
  {
    title: "Strategy",
    description:
      "My background in Economics and Management shapes how I think about systems, decisions, and long-term value. I care about substance, execution, and clarity.",
  },
] as const;

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    sameAs: [siteConfig.linkedin],
    jobTitle: "Founder of VitaAvanza, Writer, and Economics & Management Student",
    description: siteConfig.description,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Trento",
    },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
    knowsAbout: [
      "Writing",
      "Entrepreneurship",
      "Systems thinking",
      "Economics and Management",
      "Strategy",
    ],
  } as const;

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
      url: canonicalUrl,
    },
    description:
      "VitaAvanza is a project and company founded by Samir Seddiqi, built around progress, direction, support, and real-life stability.",
  } as const;

  return (
    <>
      <HomeIntro />
      <JsonLd data={personJsonLd} id="person-jsonld-home" />
      <JsonLd data={organizationJsonLd} id="organization-jsonld-home" />

      <MotionSection
        as="header"
        contained={false}
        className="relative overflow-hidden border-b border-white/5 py-0"
        motionClassName="relative"
      >
        <div className="hero-stage relative isolate min-h-[calc(100vh-5rem)] overflow-hidden">
          <HeroBackground />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.96),rgba(5,7,13,0.74)_46%,rgba(5,7,13,0.18)_100%),linear-gradient(180deg,rgba(5,7,13,0.1),rgba(5,7,13,0.88)_86%,rgba(5,7,13,0.98))]" />
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-10 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.42),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-20 right-[-9rem] hidden h-[34rem] w-[34rem] rounded-full border border-cyan-200/12 bg-cyan-300/[0.035] shadow-[0_0_120px_-30px_rgba(34,211,238,0.46)] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-40 right-16 hidden h-40 w-40 rounded-full border border-amber-200/15 bg-amber-200/[0.035] lg:block"
          />

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-between px-6 pb-10 pt-10 sm:pt-14 lg:px-8 lg:pt-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-start">
              <div className="max-w-5xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.95)]" />
                  <span className="text-[11px] font-semibold uppercase text-cyan-100/80">
                    Trento, Italy
                  </span>
                </div>

                <h1 className="mt-8 max-w-5xl text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
                  <span className="block">Samir Seddiqi</span>
                  <span className="mt-5 block max-w-4xl bg-[linear-gradient(100deg,rgba(255,255,255,0.98),rgba(125,211,252,0.95),rgba(251,191,36,0.92))] bg-clip-text text-4xl leading-tight text-transparent sm:text-5xl lg:text-6xl">
                    founder, writer, builder.
                  </span>
                </h1>

                <p className="mt-7 max-w-3xl text-lg text-white/76 sm:text-xl">
                  A personal website for the work behind VitaAvanza, two books, and the thinking
                  that turns pressure into direction.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <ButtonLink href="/projects" size="lg">
                    Enter the work
                  </ButtonLink>
                  <ButtonLink href="/book" size="lg" variant="secondary">
                    Read the books
                  </ButtonLink>
                  <ButtonLink href="/contact" size="lg" variant="outline">
                    Contact
                  </ButtonLink>
                </div>
              </div>

              <div className="surface-elevated hidden p-6 lg:block">
                <p className="text-xs uppercase text-white/45">Current signal</p>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-3xl font-semibold text-white">{siteConfig.company.shortName}</p>
                    <p className="mt-2 text-sm text-white/65">Founder and company builder</p>
                  </div>
                  <Divider />
                  <div>
                    <p className="text-3xl font-semibold text-white">Two books</p>
                    <p className="mt-2 text-sm text-white/65">
                      {siteConfig.book.title} and {siteConfig.newBook.title}
                    </p>
                  </div>
                  <Divider />
                  <div>
                    <p className="text-3xl font-semibold text-white">Economics</p>
                    <p className="mt-2 text-sm text-white/65">University of Trento</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {heroCards.map((card) => (
                <div
                  className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.065] p-5 text-left shadow-[0_24px_80px_-50px_rgba(15,23,42,0.82)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.095]"
                  key={card.label}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),transparent)]"
                  />
                  <p className="text-xs font-semibold uppercase text-cyan-100/72">{card.label}</p>
                  <p className="mt-3 text-sm text-white/68">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-7xl"
        motionClassName="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      >
        <div className="space-y-5">
          <Badge variant="accent">About</Badge>
          <h2 className="max-w-3xl">A personal foundation behind the work</h2>
          <p className="max-w-2xl text-base text-white/72 sm:text-lg">
            I am a student at the University of Trento, an author, and the founder of VitaAvanza.
            My path has been shaped by resilience, responsibility, and a constant drive to turn
            hard experience into clarity, structure, and forward movement.
          </p>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.03}
          motionClassName="grid gap-4 sm:grid-cols-2"
          staggerChildren={0.08}
        >
          {aboutHighlights.map((card) => (
            <MotionCard className="h-full" key={card.label}>
              <CardHeader className="space-y-3">
                <CardDescription className="text-[10px] uppercase text-cyan-100/72">
                  {card.label}
                </CardDescription>
                <CardTitle className="text-4xl">{card.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/72">{card.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection className="pt-0" containerClassName="max-w-7xl" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase text-white/45">
            What I Do
          </p>
          <h2 className="max-w-3xl">Three parts of how I work</h2>
          <p className="max-w-3xl text-base text-white/72 sm:text-lg">
            I care about substance, direction, and building with enough honesty that the work can
            actually mean something.
          </p>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {whatIDoCards.map((item) => (
            <MotionCard className="h-full" key={item.title}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/75">{item.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        motionClassName="surface grid gap-8 p-8 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:p-10"
      >
        <div className="space-y-5">
          <Badge variant="accent">Books</Badge>
          <h2 className="max-w-xl">{siteConfig.newBook.title}</h2>
          <p className="text-base text-white/75">
            {siteConfig.newBook.title} is the new work: a structured confrontation with the absence
            of answers, identity, meaning, and the quiet continuation of existence.
          </p>
          <p className="text-sm text-white/65">
            It now stands beside {siteConfig.book.title}, the earlier personal work shaped by
            silence, pain, reflection, and the need to be heard.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
              Request the new book
            </ButtonLink>
            <ButtonLink href="/book" variant="outline">
              View both books
            </ButtonLink>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-sm font-semibold text-white">Writing shelf</p>
          <p className="text-sm text-white/85">{siteConfig.book.title}</p>
          <p className="text-sm text-white/85">{siteConfig.newBook.title}</p>
          <p className="text-sm text-white/75">
            The first book carries lived experience. The new one moves toward identity, meaning,
            and what remains when certainty dissolves.
          </p>
          <Divider />
          <p className="text-xs uppercase text-white/45">Primary channel</p>
          <p className="text-sm text-white/85">{siteConfig.email}</p>
        </div>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        motionClassName="surface space-y-5 p-8 md:p-10"
        staggerChildren={0.04}
      >
        <Badge>Personal note</Badge>
        <h2 className="max-w-3xl">This site holds the personal side of the work</h2>
        <p className="max-w-3xl text-base text-white/75">
          It brings together the projects, the writing, and the ideas that are shaping the
          direction I am building toward.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/about" variant="secondary">
            About
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Get in touch
          </ButtonLink>
        </div>
      </MotionSection>
    </>
  );
}
