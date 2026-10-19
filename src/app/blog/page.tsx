import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/ui";
import { getAllPostsWithContent, type Post } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

import styles from "./blog.module.css";

const canonicalUrl = absoluteUrl("/blog");
const ogImage = absoluteUrl(siteConfig.socialImagePath);
const description = "Essays and letters by Samir Seddiqi on freedom, belonging, responsibility, and the lives we are trying to build.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: `Writing | ${siteConfig.name}`,
    description,
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Writing by Samir Seddiqi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing | ${siteConfig.name}`,
    description,
    images: [ogImage],
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function readingMinutes(content: string) {
  const words = content.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length || 0;
  return Math.max(1, Math.ceil(words / 220));
}

function coverSrcSet(post: Post) {
  if (!post.coverImage || (!post.coverImageSmall && !post.coverImageMedium)) return undefined;
  return [
    post.coverImageSmall ? `${post.coverImageSmall} 800w` : null,
    post.coverImageMedium ? `${post.coverImageMedium} 1600w` : null,
    `${post.coverImage} ${post.coverWidth || 2400}w`,
  ].filter(Boolean).join(", ");
}

export default function BlogPage() {
  const [latest, ...archive] = getAllPostsWithContent();
  const count = archive.length + (latest ? 1 : 0);

  return (
    <>
      <Section as="header" className={styles.mastheadSection} containerClassName={styles.container}>
        <div className={styles.topline}>
          <p>Essays, letters & things that stay with me</p>
          <a href="/rss.xml">Follow via RSS <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.masthead}>
          <h1>Writing<span>.</span></h1>
          <div className={styles.mastheadNote}>
            <p>Some questions follow us long after the conversation ends. This is where I try to stay with them.</p>
            <span>{String(count).padStart(2, "0")} published pieces</span>
          </div>
        </div>
      </Section>

      {latest ? (
        <Section className={styles.featureSection} containerClassName={styles.container}>
          <div className={styles.sectionRule}>
            <p><span aria-hidden="true" /> The latest essay</p>
            <span>01</span>
          </div>
          <article className={`${styles.feature}${latest.coverImage ? "" : ` ${styles.featureWithoutImage}`}`}>
            {latest.coverImage ? (
              <figure className={styles.featureFigure}>
                <Link aria-label={`Read ${latest.title}`} className={styles.featureImageLink} href={`/blog/${latest.slug}`} tabIndex={-1}>
                  <img
                    alt={latest.coverAlt || latest.title}
                    decoding="async"
                    fetchPriority="high"
                    height={latest.coverHeight || 1350}
                    loading="eager"
                    sizes="(max-width: 959px) calc(100vw - 40px), (max-width: 1439px) 58vw, 760px"
                    src={latest.coverImage}
                    srcSet={coverSrcSet(latest)}
                    width={latest.coverWidth || 2400}
                  />
                </Link>
                {latest.coverCaption || latest.coverCredit ? (
                  <figcaption>
                    {latest.coverCaption ? <span>{latest.coverCaption} </span> : null}
                    {latest.coverSourceUrl ? <a href={latest.coverSourceUrl} rel="noreferrer" target="_blank">{latest.coverCredit} <span aria-hidden="true">↗</span></a> : latest.coverCredit}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            <div className={styles.featureCopy}>
              <p className={styles.category}>{latest.category || latest.tags[0] || "Essay"}</p>
              <h2><Link href={`/blog/${latest.slug}`}>{latest.title}</Link></h2>
              {latest.summary ? <p className={styles.featureSummary}>{latest.summary}</p> : null}
              <p className={styles.postMeta}>
                <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                <span aria-hidden="true">/</span>
                <span>{readingMinutes(latest.content)} min read</span>
              </p>
              <Link className={styles.readLink} href={`/blog/${latest.slug}`}>Read the essay <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        </Section>
      ) : null}

      <Section className={styles.archiveSection} containerClassName={styles.container}>
        <div className={styles.archiveHeading}>
          <div>
            <p className={styles.eyebrow}>A continuing conversation</p>
            <h2>The archive.</h2>
          </div>
          <p>Reflections on the world we inherit,<br />and the one we choose to make.</p>
        </div>
        {archive.length ? (
          <ol className={styles.archiveList}>
            {archive.map((post, index) => (
              <li key={post.slug}>
                <article className={styles.archiveItem}>
                  <span aria-hidden="true" className={styles.archiveNumber}>{String(index + 2).padStart(2, "0")}</span>
                  <div className={styles.archiveCopy}>
                    <p className={styles.category}>{post.category || post.tags[0] || "Essay"}</p>
                    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                    {post.summary ? <p className={styles.archiveSummary}>{post.summary}</p> : null}
                  </div>
                  <div className={styles.archiveDetails}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{readingMinutes(post.content)} min read</span>
                    <Link aria-label={`Read ${post.title}`} href={`/blog/${post.slug}`}>Read essay <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.emptyArchive}>{latest ? "More words will find their way here." : "The first page is still to come."}</p>
        )}
      </Section>
    </>
  );
}
