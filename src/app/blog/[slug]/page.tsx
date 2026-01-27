import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { MotionLink } from "@/components/motion/motion-link";
import { MotionH2, MotionH3, MotionH4 } from "@/components/motion/motion-prose";
import { MotionSection } from "@/components/motion/motion-section";
import { Badge, ButtonLink, Divider } from "@/components/ui";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post not found",
      description: siteConfig.description,
    };
  }

  const title = `${post.title} — Blog`;
  const description = post.summary || siteConfig.description;
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: {
      a: ({ href, ...props }) => <MotionLink href={href ?? "#"} {...props} />,
      h2: (props) => <MotionH2 {...props} />,
      h3: (props) => <MotionH3 {...props} />,
      h4: (props) => <MotionH4 {...props} />,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { properties: { className: ["heading-anchor"] } }],
        ],
      },
    },
  });

  return (
    <MotionSection className="pt-16 sm:pt-24" containerClassName="max-w-3xl">
      <article className="space-y-10">
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/65">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true" className="text-white/30">
              •
            </span>
            <span>Samir Seddiqi</span>
          </div>

          <div className="space-y-4">
            <h1>{post.title}</h1>
            {post.summary ? (
              <p className="max-w-2xl text-base text-white/75">{post.summary}</p>
            ) : null}
          </div>

          {post.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </header>

        <Divider />

        <div className="prose-institution">{content}</div>

        <Divider />

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.045] p-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Continue the conversation</p>
            <p className="text-sm text-white/70">
              For writing, strategy, and institutional work.
            </p>
          </div>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </article>
    </MotionSection>
  );
}
