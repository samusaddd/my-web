import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { MotionLink } from "@/components/motion/motion-link";
import { MotionH2, MotionH3, MotionH4 } from "@/components/motion/motion-prose";
import { MotionSection } from "@/components/motion/motion-section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge, ButtonLink, Divider, Section } from "@/components/ui";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

import styles from "./post.module.css";

function formatDate(date: string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
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

  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const ogImage = {
    url: absoluteUrl(post.socialImage || post.coverImage || siteConfig.socialImagePath),
    width: post.socialImage ? post.socialImageWidth : post.coverImage ? post.coverWidth : 1200,
    height: post.socialImage ? post.socialImageHeight : post.coverImage ? post.coverHeight : 630,
    alt: post.socialImage || post.coverImage ? post.coverAlt || post.title : post.title,
  };
  const publishedTime = new Date(post.date).toISOString();
  const title = post.seoTitle || post.title;
  const description = post.description || post.summary || siteConfig.description;

  return {
    title: post.seoTitle ? { absolute: post.seoTitle } : title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime,
      authors: [siteConfig.name],
      tags: post.tags.length ? post.tags : undefined,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const isManifesto = post.slug === "why-not";
  const ArticleSection = isManifesto ? Section : MotionSection;
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const publishedTime = new Date(post.date).toISOString();
  const description = post.description || post.summary || siteConfig.description;
  const coverSizes = "(max-width: 767px) calc(100vw - 40px), (max-width: 1152px) calc(100vw - 96px), 1024px";
  const coverSrcSet = post.coverImage && (post.coverImageSmall || post.coverImageMedium)
    ? [
      post.coverImageSmall ? `${post.coverImageSmall} 800w` : null,
      post.coverImageMedium ? `${post.coverImageMedium} 1600w` : null,
      `${post.coverImage} ${post.coverWidth || 2400}w`,
    ].filter(Boolean).join(", ")
    : undefined;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: publishedTime,
    dateModified: post.lastModified,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    description,
    keywords: post.tags,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.language ? { inLanguage: post.language } : {}),
    ...(post.coverImage ? {
      image: {
        "@type": "ImageObject",
        url: absoluteUrl(post.coverImage),
        width: post.coverWidth,
        height: post.coverHeight,
      },
    } : {}),
  } as const;

  const { content } = await compileMDX({
    source: post.content,
    components: isManifesto ? {
      h1: (props) => <h2 {...props} className={styles.manifestoFinale} />,
      h2: (props) => <h2 {...props} />,
      h3: (props) => <h3 {...props} />,
      h4: (props) => <h4 {...props} />,
      a: ({ href, ...props }) => <a href={href ?? "#"} {...props} />,
    } : {
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
    <ArticleSection
      className="pt-16 sm:pt-24"
      containerClassName={post.coverImage ? styles.coverContainer : "max-w-3xl"}
    >
      <JsonLd data={blogPostingJsonLd} id={`blogposting-jsonld-${post.slug}`} />
      <article
        className={`space-y-10${post.coverImage ? ` ${styles.coverArticle}` : ""}${isManifesto ? ` ${styles.manifestoArticle}` : ""}`}
        lang={post.language}
      >
        <header className="space-y-6">
          {post.category ? <p className={styles.category}>{post.category}</p> : null}
          {isManifesto ? (
            <p className="text-sm text-white/65">
              <strong>By {siteConfig.name} | <time dateTime={post.date}>{formatDate(post.date, "en-GB")}</time></strong>
            </p>
          ) : (
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/65">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true" className="text-white/30">
              •
            </span>
            <span>Samir Seddiqi</span>
          </div>
          )}

          <div className="space-y-4">
            <h1>{post.title}</h1>
            {post.summary ? (
              <p className="max-w-2xl text-base text-white/75">
                {isManifesto ? <em>{post.summary}</em> : post.summary}
              </p>
            ) : null}
          </div>

          {!isManifesto && post.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </header>

        {post.coverImage ? (
          <figure className={styles.coverFigure}>
            {coverSrcSet ? (
              <>
                <link
                  as="image"
                  imageSizes={coverSizes}
                  imageSrcSet={coverSrcSet}
                  rel="preload"
                />
                <img
                  alt={post.coverAlt || post.title}
                  className={styles.coverImage}
                  decoding="async"
                  fetchPriority="high"
                  height={post.coverHeight || 1350}
                  loading="eager"
                  sizes={coverSizes}
                  src={post.coverImage}
                  srcSet={coverSrcSet}
                  width={post.coverWidth || 2400}
                />
              </>
            ) : (
              <Image
                alt={post.coverAlt || post.title}
                className={styles.coverImage}
                height={post.coverHeight || 1350}
                priority
                sizes="(max-width: 767px) 100vw, 1024px"
                src={post.coverImage}
                unoptimized
                width={post.coverWidth || 2400}
              />
            )}
          </figure>
        ) : null}

        <Divider />

        <div className={isManifesto ? `prose-institution ${styles.manifestoProse}` : "prose-institution"}>{content}</div>

        <Divider />

        {isManifesto ? (
          <nav aria-label="More writing">
            <Link className={styles.allWriting} href="/blog">All writing <span aria-hidden="true">→</span></Link>
          </nav>
        ) : (
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
        )}
      </article>
    </ArticleSection>
  );
}
