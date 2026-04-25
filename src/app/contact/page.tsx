import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { MotionCard } from "@/components/motion/motion-card";
import { MotionLink } from "@/components/motion/motion-link";
import { MotionSection } from "@/components/motion/motion-section";
import {
  Badge,
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
  title: "Contact Samir Seddiqi",
  description:
    "Contact Samir Seddiqi, founder of VitaAvanza, for projects, collaboration, writing, and professional opportunities.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Contact Samir Seddiqi, founder of VitaAvanza, for projects, collaboration, writing, and professional opportunities.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Contact Samir Seddiqi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description:
      "Contact Samir Seddiqi, founder of VitaAvanza, for projects, collaboration, writing, and professional opportunities.",
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
        <h1>Contact</h1>
        <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
          Whether it is about a project, a collaboration, writing, or a professional opportunity,
          feel free to reach out.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/70">
          I am always open to meaningful conversations and serious opportunities.
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
              If the message is thoughtful and the opportunity is real, I am happy to hear from
              you.
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
                <li>Projects and collaborations</li>
                <li>Writing and professional opportunities</li>
                <li>Serious conversations with clear intent</li>
              </ul>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard className="flex h-full flex-col">
          <CardHeader className="space-y-3">
            <Badge>Message</Badge>
            <CardTitle className="text-2xl">Send a message</CardTitle>
            <CardDescription className="text-white/75">
              This prepares an email in your default mail app with your message already filled in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/75">
            <ContactForm />
          </CardContent>
        </MotionCard>
      </MotionSection>
    </>
  );
}
