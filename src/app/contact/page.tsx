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
  title: "Contact",
  description: "Direct, email-first contact for collaboration, institutional work, and book requests.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description: "Direct, email-first contact for collaboration, institutional work, and book requests.",
    url: `${siteConfig.url}/contact`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contact Samir Seddiqi" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto flex max-w-3xl flex-col gap-6 text-center"
      >
        <Badge variant="accent" className="mx-auto">
          Contact
        </Badge>
        <h1>Direct, calm, and email-first</h1>
        <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
          The preferred channel is email. A short note on context and intent makes it easier to
          respond with clarity and momentum.
        </p>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        delayChildren={0.02}
        motionClassName="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
        staggerChildren={0.08}
      >
        <MotionCard className="flex h-full flex-col">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl">Direct contact</CardTitle>
            <CardDescription className="text-white/75">
              For collaboration, institutional work, and thoughtful introductions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-sm text-white/80">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Email</p>
              <MotionLink
                className="text-base font-semibold text-white hover:text-sky-100"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </MotionLink>
            </div>

            <Divider />

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">LinkedIn</p>
              <MotionLink
                className="text-base font-semibold text-white hover:text-sky-100"
                href={siteConfig.linkedin}
              >
                Connect on LinkedIn
              </MotionLink>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard className="flex h-full flex-col">
          <CardHeader className="space-y-3">
            <Badge>Book requests</Badge>
            <CardTitle className="text-2xl">{siteConfig.book.title}</CardTitle>
            <CardDescription className="text-white/75">
              {siteConfig.book.distribution}. {siteConfig.book.award}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/75">
            <p>
              A short reflective literary work on inner dialogue, silence, vulnerability, and the
              need to be seen and heard.
            </p>
            <p>
              The book is available free by request. The act of asking is intentional and mirrors the
              theme of being heard.
            </p>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Request via email</p>
              <p className="mt-2 text-base font-semibold text-white">{siteConfig.email}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
                Request a copy
              </ButtonLink>
              <ButtonLink href="/book" variant="outline">
                Book page
              </ButtonLink>
            </div>
          </CardContent>
        </MotionCard>
      </MotionSection>
    </>
  );
}
