import type { Metadata } from "next";

import { MotionCard } from "@/components/motion/motion-card";
import { MotionLink } from "@/components/motion/motion-link";
import { MotionSection } from "@/components/motion/motion-section";
import { Badge, CardContent, CardDescription, CardHeader, CardTitle, Section } from "@/components/ui";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

const canonicalUrl = absoluteUrl("/blog");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "Blog",
  description: "Essays on writing, product clarity, and institutional infrastructure.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: "Essays on writing, product clarity, and institutional infrastructure.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Samir Seddiqi Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — ${siteConfig.name}`,
    description: "Essays on writing, product clarity, and institutional infrastructure.",
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
      <MotionSection
        className="pt-16 sm:pt-24"
        motionClassName="mx-auto flex max-w-3xl flex-col gap-6 text-center"
      >
        <Badge className="mx-auto" variant="accent">
          Writing
        </Badge>
        <h1>Clarity that holds up under scrutiny</h1>
        <p className="mx-auto max-w-2xl text-base text-white/75">
          Notes on product thinking, civic alignment, and the kind of writing that makes decisions
          legible over time.
        </p>
      </MotionSection>

      <MotionSection
        className="pt-0"
        containerClassName="max-w-5xl"
        delayChildren={0.04}
        motionClassName="grid gap-6 md:grid-cols-2"
        staggerChildren={0.08}
      >
        {posts.map((post) => (
          <MotionCard className="flex h-full flex-col justify-between" key={post.slug}>
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-white/45">
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
