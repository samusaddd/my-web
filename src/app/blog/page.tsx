import type { Metadata } from "next";

import { MotionCard } from "@/components/motion/motion-card";
import { MotionLink } from "@/components/motion/motion-link";
import { MotionSection } from "@/components/motion/motion-section";
import { PageHero } from "@/components/page-hero";
import { Badge, CardContent, CardDescription, CardHeader, CardTitle, Section } from "@/components/ui";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/blog");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Writing by Samir Seddiqi, founder of VitaAvanza, on work, discipline, direction, and the ideas he keeps returning to.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Writing | ${siteConfig.name}`,
    description:
      "Writing by Samir Seddiqi, founder of VitaAvanza, on work, discipline, direction, and the ideas he keeps returning to.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Samir Seddiqi Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing | ${siteConfig.name}`,
    description:
      "Writing by Samir Seddiqi, founder of VitaAvanza, on work, discipline, direction, and the ideas he keeps returning to.",
    images: [ogImage],
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        aside={
          <MotionCard className="h-full">
            <CardHeader className="space-y-3">
              <CardDescription className="text-xs uppercase text-white/50">
                Archive
              </CardDescription>
              <CardTitle className="text-3xl">{posts.length} published notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/75">
              Writing here stays close to work, discipline, direction, and the ideas I keep
              returning to.
            </CardContent>
          </MotionCard>
        }
        badge="Writing"
        description="Notes on writing, work, discipline, and the ideas I keep returning to."
        eyebrow="Essays and reflections"
        metrics={[
          { label: "Format", value: "MDX" },
          { label: "Focus", value: "Depth" },
        ]}
        title="Writing that keeps the thinking visible"
      />

      <MotionSection
        className="pt-0"
        containerClassName="max-w-6xl"
        delayChildren={0.04}
        motionClassName="grid gap-6 md:grid-cols-2"
        staggerChildren={0.08}
      >
        {posts.map((post) => (
          <MotionCard className="flex h-full flex-col justify-between" key={post.slug}>
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3 text-xs uppercase text-white/45">
                <span>{formatDate(post.date)}</span>
              </div>
              <CardTitle className="text-xl">
                <MotionLink className="text-white hover:text-sky-100" href={`/blog/${post.slug}`}>
                  {post.title}
                </MotionLink>
              </CardTitle>
              {post.summary ? <CardDescription>{post.summary}</CardDescription> : null}
            </CardHeader>
            {post.tags.length ? (
              <CardContent className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </CardContent>
            ) : null}
          </MotionCard>
        ))}
      </MotionSection>

      <Section className="pt-0" containerClassName="max-w-5xl">
        {posts.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center text-white/70">
            No posts yet. Add MDX files in{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5">src/content/posts</code>.
          </div>
        ) : null}
      </Section>
    </>
  );
}
