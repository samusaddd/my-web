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
      <Section className="pt-16 sm:pt-24">
        <FadeIn className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <Badge variant="accent" className="mx-auto">
            Contact
          </Badge>
          <h1>Direct, calm, and email-first</h1>
          <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
            The preferred channel is email. A short note on context and intent makes it easier to
            respond with clarity and momentum.
          </p>
        </FadeIn>
      </Section>

      <Section className="pt-0" containerClassName="max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <FadeIn className="h-full">
            <Card className="flex h-full flex-col">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">Direct contact</CardTitle>
                <CardDescription className="text-white/75">
                  For collaboration, institutional work, and thoughtful introductions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-white/80">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">Email</p>
                  <a
                    className="text-base font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:text-sky-100 hover:decoration-sky-200/60"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <Divider />

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">LinkedIn</p>
                  <a
                    className="text-base font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:text-sky-100 hover:decoration-sky-200/60"
                    href={siteConfig.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn className="h-full" delay={0.05}>
            <Card className="flex h-full flex-col">
              <CardHeader className="space-y-3">
                <Badge>Book requests</Badge>
                <CardTitle className="text-2xl">{siteConfig.book.title}</CardTitle>
                <CardDescription className="text-white/75">
                  {siteConfig.book.award}. {siteConfig.book.distribution}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/75">
                <p>
                  If you are requesting a copy for a reading group, institution, or press context,
                  email is the best channel.
                </p>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">Request via</p>
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
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
