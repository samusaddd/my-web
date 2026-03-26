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
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/contact");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "Contact",
  description:
    "For VitaAvanza demos, partnerships, institutional conversations, founder contact, and book requests.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "For VitaAvanza demos, partnerships, institutional conversations, founder contact, and book requests.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Contact Samir Seddiqi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description:
      "For VitaAvanza demos, partnerships, institutional conversations, founder contact, and book requests.",
    images: [ogImage],
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
        <h1>For demos, partnerships, and serious conversations</h1>
        <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
          Email is still the best channel. A short note about whether the context is VitaAvanza,
          partnership, discovery, or the book helps keep the reply precise.
        </p>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        delayChildren={0.02}
        motionClassName="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        staggerChildren={0.08}
      >
        <MotionCard className="flex h-full flex-col">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl">Direct contact</CardTitle>
            <CardDescription className="text-white/75">
              Founder contact for VitaAvanza, institutional conversations, and thoughtful
              introductions.
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

            <Divider />

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Good fit</p>
              <ul className="list-disc space-y-2 pl-5 text-white/75">
                <li>VitaAvanza demos and product conversations</li>
                <li>University, public-body, or employer partnerships</li>
                <li>Discovery, pilot, and institution-ready collaboration</li>
              </ul>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard className="flex h-full flex-col">
          <CardHeader className="space-y-3">
            <Badge>{siteConfig.book.distribution}</Badge>
            <CardTitle className="text-2xl">{siteConfig.book.title}</CardTitle>
            <CardDescription className="text-white/75">
              {siteConfig.book.award}. Available by request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/75">
            <p>
              The book is the quieter side of the same work: vulnerability, being heard, and the
              emotional layer that often sits underneath institutional pressure.
            </p>
            <p>
              If you are requesting a copy, include the context and why it resonates. That makes the
              exchange more human and intentional.
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
