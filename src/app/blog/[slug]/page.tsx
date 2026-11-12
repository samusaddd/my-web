import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleReader } from "@/components/article-reader";
import { ArticleShare } from "@/components/article-share";
import { ArticleComments } from "@/components/article-comments";
import { countWords } from "@/lib/editorial";
import { Section } from "@/components/ui";
import {
  getAllPostsWithContent,
  getPostBySlug,
  getPostSlugs,
  getScheduledPostSlugs,
  getScheduledRelease,
} from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

import styles from "./post.module.css";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

type BlogPostPageProps = {
  params: { slug: string };
};

type HeadingNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HeadingNode[];
};

export function generateStaticParams() {
  return [...getPostSlugs(), ...getScheduledPostSlugs()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post && getScheduledRelease(params.slug)) {
    return {
      title: { absolute: "New writing is on its way | Samir Seddiqi" },
      description:
        "A new essay will be published here soon. Explore Samir Seddiqi's published writing in the meantime.",
      alternates: { canonical: absoluteUrl(`/blog/${params.slug}`) },
      robots: { index: false, follow: true },
    };
  }
  if (!post) return { title: "Post not found", description: siteConfig.description };

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
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  const release = post ? null : getScheduledRelease(params.slug);
  if (release) {
    const when = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: "Europe/Berlin",
    }).format(new Date(release));
    return (
      <Section className={styles.postSection} containerClassName={styles.container}>
        <div className={styles.scheduled}>
          <p className={styles.category}>From the notebook</p>
          <h1>A new essay is on its way.</h1>
          <p>
            Available <time dateTime={release}>{when}</time> (Berlin time).
          </p>
          <Link href="/blog">
            Explore the published essays <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </Section>
    );
  }
  if (!post) notFound();

  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const publishedTime = new Date(post.date).toISOString();
  const description = post.description || post.summary || siteConfig.description;
  const wordCount = countWords(post.content);
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 220));
  const coverSizes =
    "(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1535px) calc(100vw - 112px), 1392px";
  const coverSrcSet =
    post.coverImage && (post.coverImageSmall || post.coverImageMedium)
      ? [
          post.coverImageSmall ? `${post.coverImageSmall} 800w` : null,
          post.coverImageMedium ? `${post.coverImageMedium} 1600w` : null,
          `${post.coverImage} ${post.coverWidth || 2400}w`,
        ]
          .filter(Boolean)
          .join(", ")
      : undefined;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: publishedTime,
    dateModified: post.lastModified,
    author: { "@type": "Person", name: siteConfig.name, url: absoluteUrl("/about") },
    publisher: { "@type": "Person", name: siteConfig.name },
    description,
    keywords: post.tags,
    wordCount,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.language ? { inLanguage: post.language } : {}),
    ...(post.coverImage
      ? {
          image: {
            "@type": "ImageObject",
            url: absoluteUrl(post.coverImage),
            width: post.coverWidth,
            height: post.coverHeight,
            ...(post.coverCredit ? { creditText: post.coverCredit } : {}),
            ...(post.coverCaption ? { caption: post.coverCaption } : {}),
          },
        }
      : {}),
  } as const;

  const headings: { id: string; title: string }[] = [];
  const hasSecondLevelHeadings = /^##\s/m.test(post.content);
  function collectHeadings() {
    return (tree: unknown) => {
      const textOf = (node: HeadingNode): string =>
        node.value || (node.children || []).map(textOf).join("");
      function walk(node: HeadingNode) {
        if (
          (node.tagName === "h1" ||
            node.tagName === "h2" ||
            (!hasSecondLevelHeadings && node.tagName === "h3")) &&
          typeof node.properties?.id === "string"
        ) {
          headings.push({ id: node.properties.id, title: textOf(node) });
        }
        node.children?.forEach(walk);
      }
      walk(tree as HeadingNode);
    };
  }

  const { content } = await compileMDX({
    source: post.content,
    components: {
      EssaySoundtrack: () =>
        post.soundtrack ? (
          <aside
            className={styles.soundtrack}
            aria-label={post.soundtrack.label || "A soundtrack for this essay"}
          >
            <div className={styles.soundtrackLabel}>
              {post.soundtrack.label || "A soundtrack for this essay"}
            </div>
            <iframe
              title={`${post.soundtrack.title} by ${post.soundtrack.artist} — Spotify player`}
              src={`https://open.spotify.com/embed/track/${post.soundtrack.spotifyId}?theme=0`}
              width="100%"
              height="152"
              loading="lazy"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <div className={styles.soundtrackAttribution}>
              <span>
                {post.soundtrack.title} — {post.soundtrack.artist}
              </span>
              <a
                href={`https://open.spotify.com/track/${post.soundtrack.spotifyId}`}
                target="_blank"
                rel="noreferrer"
              >
                Listen on Spotify <span aria-hidden="true">↗</span>
              </a>
            </div>
            {post.soundtrack.note ? (
              <details className={styles.soundtrackNote}>
                <summary>
                  Listening note <span aria-hidden="true">+</span>
                </summary>
                <p>{post.soundtrack.note}</p>
              </details>
            ) : null}
          </aside>
        ) : null,
      h1: (props) => <h2 {...props} className={styles.finalHeading} />,
      h2: (props) => (
        <h2
          {...props}
          className={
            props.id === "historical-and-philosophical-references" ||
            props.id === "research-note" ||
            props.id === "references"
              ? styles.referencesTitle
              : undefined
          }
        />
      ),
      h3: (props) => (hasSecondLevelHeadings ? <h3 {...props} /> : <h2 {...props} />),
      h4: (props) => <h4 {...props} />,
      a: ({ href, ...props }) => <a href={href ?? "#"} {...props} />,
      Resonance: ({ children, closing }: { children: React.ReactNode; closing?: boolean }) => (
        <div className={`${styles.resonance}${closing ? ` ${styles.resonanceClosing}` : ""}`}>
          {children}
        </div>
      ),
      Signature: ({ children }: { children: React.ReactNode }) => (
        <div className={styles.signature}>{children}</div>
      ),
      ResearchNote: ({
        children,
        label = "Research note",
      }: {
        children: React.ReactNode;
        label?: string;
      }) => (
        <aside className={styles.researchNote} aria-label={label}>
          {children}
        </aside>
      ),
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          collectHeadings,
          [
            rehypeAutolinkHeadings,
            { properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" } },
          ],
        ],
      },
    },
  });

  const allPosts = getAllPostsWithContent();
  const currentIndex = allPosts.findIndex((entry) => entry.slug === post.slug);
  const related = [...allPosts.slice(currentIndex + 1), ...allPosts.slice(0, currentIndex)].slice(
    0,
    2,
  );
  const contents = (
    <ol>
      {headings.map((heading, index) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`} data-essay-section={heading.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );

  const cover = post.coverImage ? (
    <figure
      className={`${styles.coverFigure}${post.coverFirst ? ` ${styles.openingArtwork}` : ""}`}
    >
      <img
        alt={post.coverAlt || post.title}
        className={styles.coverImage}
        decoding="async"
        fetchPriority="high"
        height={post.coverHeight || 1350}
        loading="eager"
        sizes={coverSrcSet ? coverSizes : undefined}
        src={post.coverImage}
        srcSet={coverSrcSet}
        width={post.coverWidth || 2400}
      />
      {post.coverCaption || post.coverCredit ? (
        <figcaption>
          {post.coverCaption ? <span>{post.coverCaption}</span> : null}
          {post.coverCredit ? (
            <span>
              Photograph:{" "}
              {post.coverSourceUrl ? (
                <a href={post.coverSourceUrl} rel="noreferrer" target="_blank">
                  {post.coverCredit} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                post.coverCredit
              )}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  ) : null;

  return (
    <>
      <Section
        className={`${styles.postSection}${post.tone === "oxblood" ? ` ${styles.toneOxblood}` : post.tone === "charcoal" ? ` ${styles.toneCharcoal}` : ""}`}
        containerClassName={styles.container}
      >
        <JsonLd data={blogPostingJsonLd} id={`blogposting-jsonld-${post.slug}`} />
        {post.coverImage ? (
          <link
            as="image"
            href={coverSrcSet ? undefined : post.coverImage}
            imageSizes={coverSrcSet ? coverSizes : undefined}
            imageSrcSet={coverSrcSet}
            rel="preload"
          />
        ) : null}
        <div className={styles.topline}>
          <nav aria-label="Breadcrumb">
            <Link href="/blog">Writing</Link>
            <span aria-hidden="true">/</span>
            <span>Essay No. {String(allPosts.length - currentIndex).padStart(2, "0")}</span>
          </nav>
          <a href="#essay-content">
            Begin reading <span aria-hidden="true">↘</span>
          </a>
        </div>

        <article lang={post.language || "en"}>
          {post.coverFirst ? cover : null}
          <header className={styles.postHeader}>
            <div
              className={`${styles.titleBlock}${post.slug === "why-not" ? ` ${styles.manifestoTitle}` : ""}`}
            >
              <p className={styles.category}>{post.category || post.tags[0] || "An essay"}</p>
              <h1>{post.title}</h1>
              {post.summary ? (
                <p className={styles.standfirst}>
                  <em>{post.summary}</em>
                </p>
              ) : null}
            </div>
            <div className={styles.headerMeta}>
              <div>
                <span>Words by</span>
                <Link href="/about">{siteConfig.name}</Link>
              </div>
              <div>
                <span>Published</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div>
                <span>Reading time</span>
                <p>
                  {readingMinutes} {readingMinutes === 1 ? "minute" : "minutes"}
                </p>
              </div>
              <ArticleReader
                url={canonicalUrl}
                hasContents={headings.length > 1}
                sample={post.content
                  .trim()
                  .split(/\n\s*\n/)[0]
                  .replace(/[*_]/g, "")}
              />
              <div className={styles.communityLinks}>
                <span>Join in</span>
                <a href="#share-essay">
                  Share this essay <span aria-hidden="true">↗</span>
                </a>
                <a href="#comments">
                  Leave a comment <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </header>

          {!post.coverFirst ? cover : null}

          <div
            className={`${styles.readingGrid}${post.coverImage ? "" : ` ${styles.withoutCover}`}`}
          >
            <aside className={styles.contentsRail}>
              {headings.length > 1 ? (
                <nav aria-label="Essay sections" className={styles.desktopContents}>
                  <p>In this essay</p>
                  {contents}
                </nav>
              ) : null}
            </aside>
            <div className={styles.readingColumn}>
              {headings.length > 1 ? (
                <details className={styles.mobileContents} data-reader-contents>
                  <summary>
                    In this essay <span aria-hidden="true">+</span>
                  </summary>
                  <nav aria-label="Essay sections">{contents}</nav>
                </details>
              ) : null}
              <div className={`prose-institution ${styles.prose}`} id="essay-content">
                {content}
              </div>
              <div className={styles.authorSignature}>
                <img
                  src="/images/samir-seddiqi-signature.webp"
                  alt="Samir Seddiqi’s signature"
                  width="1086"
                  height="362"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.endline}>
                <span aria-hidden="true" className={styles.endMark} />
                <Link href="/blog">
                  Back to all writing <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <ArticleShare title={post.title} url={`${canonicalUrl}/`} />
              <ArticleComments slug={post.slug} />
            </div>
          </div>
        </article>
      </Section>

      {related.length ? (
        <Section className={styles.relatedSection} containerClassName={styles.container}>
          <div className={styles.relatedHeading}>
            <div>
              <p className={styles.category}>More from the notebook</p>
              <h2>Keep reading.</h2>
            </div>
            <Link href="/blog">
              All writing <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((entry) => (
              <article key={entry.slug}>
                {entry.coverImage ? (
                  <img
                    className={styles.relatedPhoto}
                    alt=""
                    src={entry.coverImageSmall || entry.coverImage}
                    width={entry.coverWidth || 2400}
                    height={entry.coverHeight || 1350}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <div className={styles.relatedMeta}>
                  <span>{entry.category || entry.tags[0] || "Essay"}</span>
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                </div>
                <h3>
                  <Link href={`/blog/${entry.slug}`}>{entry.title}</Link>
                </h3>
                {entry.summary ? <p>{entry.summary}</p> : null}
                <Link
                  aria-label={`Read ${entry.title}`}
                  className={styles.relatedLink}
                  href={`/blog/${entry.slug}`}
                >
                  Read essay <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
