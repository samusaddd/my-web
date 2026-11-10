import type { Metadata } from "next";
import Link from "next/link";
import { WritingIndex } from "@/components/writing-index";
import { getAllPostsWithContent } from "@/lib/posts";
import { coverSources, formatDate, readingMinutes, writingEntry } from "@/lib/editorial";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "./blog.module.css";
const canonicalUrl = absoluteUrl("/blog");
const description =
  "Essays and letters by Samir Seddiqi on freedom, belonging, responsibility, and the lives we are trying to build.";
const ogImage = absoluteUrl(siteConfig.socialImagePath);
export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Writing | " + siteConfig.name,
    description,
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Writing by Samir Seddiqi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | " + siteConfig.name,
    description,
    images: [ogImage],
  },
};
export default function BlogPage() {
  const posts = getAllPostsWithContent();
  const latest = posts[0];
  return (
    <div className={styles.page}>
      <header className={styles.mastheadSection}>
        <div className={styles.topline}>
          <p>Essays, letters & things that stay with me</p>
          <a href="/rss.xml">
            Follow via RSS <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.masthead}>
          <h1>
            Writing<span>.</span>
          </h1>
          <div className={styles.mastheadNote}>
            <p>
              Some questions follow us long after the conversation ends. This is where I try to stay
              with them.
            </p>
            <span>
              {String(posts.length).padStart(2, "0")} published pieces / A continuing conversation
            </span>
          </div>
        </div>
      </header>
      {latest ? (
        <section className={styles.featureSection} aria-labelledby="latest-writing-title">
          <div className={styles.sectionRule}>
            <p>
              <span aria-hidden="true" /> The latest essay
            </p>
            <span>01</span>
          </div>
          <article className={styles.feature}>
            {latest.coverImage ? (
              <figure className={styles.featureFigure}>
                <Link
                  href={"/blog/" + latest.slug}
                  tabIndex={-1}
                  aria-label={"Read " + latest.title}
                  className={styles.featureImageLink}
                >
                  <img
                    alt={latest.coverAlt || latest.title}
                    src={latest.coverImage}
                    srcSet={coverSources(latest)}
                    sizes="(max-width: 899px) calc(100vw - 40px), 62vw"
                    width={latest.coverWidth || 2400}
                    height={latest.coverHeight || 1350}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </Link>
                {latest.coverCaption || latest.coverCredit ? (
                  <figcaption>
                    {latest.coverCaption}
                    {latest.coverCredit ? (
                      <span>
                        {" "}
                        Photograph:{" "}
                        {latest.coverSourceUrl ? (
                          <a href={latest.coverSourceUrl} target="_blank" rel="noreferrer">
                            {latest.coverCredit} ↗
                          </a>
                        ) : (
                          latest.coverCredit
                        )}
                      </span>
                    ) : null}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            <div className={styles.featureCopy}>
              <p className={styles.category}>{latest.category || "Essay"}</p>
              <h2 id="latest-writing-title">
                <Link href={"/blog/" + latest.slug}>{latest.title}</Link>
              </h2>
              <p className={styles.featureSummary}>{latest.summary}</p>
              <p className={styles.postMeta}>
                <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                <span>{readingMinutes(latest.content)} min read</span>
              </p>
              <Link className={styles.readLink} href={"/blog/" + latest.slug}>
                Read the essay <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </section>
      ) : null}
      <WritingIndex entries={posts.map(writingEntry)} />
    </div>
  );
}
