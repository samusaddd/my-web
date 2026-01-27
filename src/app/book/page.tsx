import type { Metadata } from "next";

import { MotionCard } from "@/components/motion/motion-card";
import { MotionLink } from "@/components/motion/motion-link";
import { MotionSection } from "@/components/motion/motion-section";
import {
  Badge,
  ButtonLink,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
} from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Can You Hear Me? — Writer of the Year Award (2022). Free by request via ceo@vitaavanza.it.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: `${siteConfig.book.title} — ${siteConfig.name}`,
    description: "Writer of the Year Award (2022). Free by request.",
    url: `${siteConfig.url}/book`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.book.title }],
  },
};

const whyItMatters = [
  {
    title: "Voice and dignity",
    description:
      "The book explores what it means to be heard when systems are busy, fast, and not built for nuance.",
  },
  {
    title: "Listening as design",
    description:
      "It connects personal experience to institutional responsibility, asking how systems can listen better.",
  },
  {
    title: "A practical lens",
    description:
      "Beyond reflection, it encourages action: clearer language, better defaults, and more responsible interfaces.",
  },
] as const;

export default function BookPage() {
  return (
    <>
      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{siteConfig.book.award}</Badge>
            <Badge>{siteConfig.book.distribution}</Badge>
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl">{siteConfig.book.title}</h1>
            <p className="max-w-2xl text-base text-white/75 sm:text-lg">
              A book about being heard, and about the responsibility systems carry when people are
              trying to make sense of their lives in moments of change.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${siteConfig.email}`} size="lg">
              Request a copy
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </div>

        <MotionCard className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_28rem_at_120%_-20%,rgba(125,211,252,0.25),transparent_68%)]"
          />
          <CardHeader className="space-y-3">
            <CardDescription className="text-xs uppercase tracking-[0.14em] text-white/50">
              Synopsis
            </CardDescription>
            <CardTitle className="text-2xl">When systems move faster than people</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/80">
            <p>
              {siteConfig.book.title} reflects on the space between personal reality and public
              structure. It asks what happens when the need to be heard meets systems optimized for
              speed.
            </p>
            <p>
              The throughline is empathy with structure: how we can design, speak, and decide in ways
              that remain human without losing institutional clarity.
            </p>
            <Divider />
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">Distribution</p>
            <p className="text-sm text-white/80">
              {siteConfig.book.distribution}. Requests are handled directly via email.
            </p>
          </CardContent>
        </MotionCard>
      </MotionSection>

      <MotionSection className="pt-0" motionClassName="space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Why it matters
          </p>
          <h2 className="max-w-3xl">A book designed to travel across contexts</h2>
        </div>

        <MotionSection
          as="div"
          contained={false}
          className="py-0"
          delayChildren={0.02}
          motionClassName="grid gap-6 md:grid-cols-3"
          staggerChildren={0.08}
        >
          {whyItMatters.map((item) => (
            <MotionCard className="h-full" key={item.title}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/75">{item.description}</CardContent>
            </MotionCard>
          ))}
        </MotionSection>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        motionClassName="surface grid gap-8 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-10"
      >
        <div className="space-y-4">
          <Badge>Press and requests</Badge>
          <h2 className="max-w-3xl">Book requests are handled personally</h2>
          <p className="text-base text-white/75">
            If you are requesting a copy for reading groups, institutional use, or press
            consideration, reach out directly. A short note on context is always appreciated.
          </p>
          <p className="text-sm text-white/70">
            Primary channel:{" "}
            <MotionLink className="text-white hover:text-sky-100" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </MotionLink>
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/75">
          <p className="font-semibold text-white">Request checklist</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Who the request is for</li>
            <li>Why the book is relevant in that context</li>
            <li>Any timeline considerations</li>
          </ul>
          <Divider />
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Also available</p>
          <p>
            <MotionLink className="text-white hover:text-sky-100" href={siteConfig.linkedin}>
              LinkedIn
            </MotionLink>
          </p>
        </div>
      </MotionSection>
    </>
  );
}
