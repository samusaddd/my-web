import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPostsWithContent } from "@/lib/posts";
import { coverSources, formatDate, readingMinutes } from "@/lib/editorial";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "./home.module.css";
export const metadata: Metadata = {
  title: { absolute: "Samir Seddiqi | Writer & Founder" },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Samir Seddiqi | Writer & Founder",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.socialImagePath),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Seddiqi | Writer & Founder",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.socialImagePath)],
  },
};
export default function HomePage() {
  const posts = getAllPostsWithContent();
  const [latest, ...archive] = posts;
  return (
    <>
      <JsonLd
        id="person-jsonld-home"
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: absoluteUrl("/"),
          sameAs: [siteConfig.linkedin],
          jobTitle: "Writer and Founder",
          description: siteConfig.description,
          worksFor: {
            "@type": "Organization",
            name: siteConfig.company.name,
            url: siteConfig.company.url,
          },
        }}
      />
      <section className={styles.hero}>
        <div className={styles.folioBar}>
          <span>The personal pages</span>
          <span>Writing · Books · Selected work</span>
          <span>Trento, Italy</span>
        </div>
        <h1 className={styles.name}>
          Samir Seddiqi<span>.</span>
        </h1>
        <div className={styles.heroGrid}>
          <p className={styles.identity}>
            Afghan-born.
            <br />
            Based in Trento.
            <br />
            <span>Still asking questions.</span>
          </p>
          <h2>
            A life in words.
            <br />
            <em>A world in question.</em>
          </h2>
          <div className={styles.heroNote}>
            <p>
              I write about freedom, belonging, and what it means to build a life that feels your
              own.
            </p>
            <Link className={styles.textLink} href="/blog">
              Enter the notebook <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      {latest ? (
        <section className={styles.writingSection} aria-labelledby="writing-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>01 / The latest essay</p>
            <span className={styles.count}>
              {String(posts.length).padStart(2, "0")} published pieces
            </span>
          </div>
          <article className={styles.featuredEssay}>
            {latest.coverImage ? (
              <figure className={styles.essayFigure}>
                <Link
                  className={styles.essayImage}
                  href={"/blog/" + latest.slug}
                  aria-label={"Read " + latest.title}
                  tabIndex={-1}
                >
                  <img
                    alt={latest.coverAlt || ""}
                    width={latest.coverWidth || 2400}
                    height={latest.coverHeight || 1350}
                    src={latest.coverImage}
                    srcSet={coverSources(latest)}
                    sizes="(max-width: 899px) calc(100vw - 40px), 64vw"
                    loading="eager"
                    fetchPriority="high"
                  />
                </Link>
                {latest.coverCredit ? (
                  <figcaption>
                    Photograph:{" "}
                    {latest.coverSourceUrl ? (
                      <a href={latest.coverSourceUrl} target="_blank" rel="noreferrer">
                        {latest.coverCredit} ↗
                      </a>
                    ) : (
                      latest.coverCredit
                    )}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            <div className={styles.essayCopy}>
              <p className={styles.eyebrow}>{latest.category || "An essay"}</p>
              <h2 id="writing-title">
                <Link href={"/blog/" + latest.slug}>{latest.title}</Link>
              </h2>
              <p className={styles.summary}>{latest.summary}</p>
              <p className={styles.postMeta}>
                <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                <span>{readingMinutes(latest.content)} min read</span>
              </p>
              <Link className={styles.roundLink} href={"/blog/" + latest.slug}>
                <span>Read the essay</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          <div className={styles.archiveHeading}>
            <h3>
              Pages worth
              <br />
              <em>staying with.</em>
            </h3>
            <Link className={styles.textLink} href="/blog">
              The complete archive <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.archive}>
            {archive.slice(0, 4).map((post, index) => (
              <Link className={styles.archiveRow} href={"/blog/" + post.slug} key={post.slug}>
                <span className={styles.archiveNumber}>0{index + 2}</span>
                <div>
                  <p className={styles.eyebrow}>{post.category || "Essay"}</p>
                  <h3>{post.title}</h3>
                  <p className={styles.archiveDate}>
                    {formatDate(post.date)} · {readingMinutes(post.content)} min read
                  </p>
                </div>
                <span className={styles.archiveArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <section className={styles.booksSection} aria-labelledby="books-title">
        <div className={styles.booksInner}>
          <div className={styles.booksIntro}>
            <p className={styles.eyebrow}>02 / The longer works</p>
            <h2 id="books-title">
              Some stories
              <br />
              need <em>more room.</em>
            </h2>
            <p>
              Memory, silence, and the difficult business of being human. Two books, written in the
              hope that something on the page might reach someone on the other side.
            </p>
            <Link className={styles.lightLink} href="/book">
              Explore the books <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.bookPair}>
            <Link href="/book#can-you-hear-me" className={styles.bookTile}>
              <div className={styles.bookMat}>
                <img
                  alt=""
                  className={styles.bookCoverImage}
                  decoding="async"
                  height={2250}
                  loading="lazy"
                  src="/images/books/can-you-hear-me.jpg"
                  width={1410}
                />
              </div>
              <p className={styles.bookIndex}>I / Silence, pain, reflection</p>
              <h3>Can You Hear Me?</h3>
              <p>{siteConfig.book.distribution} ↗</p>
            </Link>
            <Link href="/book#we-were-never-here" className={styles.bookTile}>
              <div className={styles.bookMat}>
                <img
                  alt=""
                  className={styles.bookCoverImage}
                  decoding="async"
                  height={1536}
                  loading="lazy"
                  src="/images/books/we-were-never-here.jpg"
                  width={1024}
                />
              </div>
              <p className={styles.bookIndex}>II / Identity, meaning, existence</p>
              <h3>We Were Never Here</h3>
              <p>{siteConfig.newBook.distribution} ↗</p>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.personalSection}>
        <div>
          <p className={styles.eyebrow}>03 / The person behind the pages</p>
          <p className={styles.marginNote}>
            Writer.
            <br />
            Founder.
            <br />A life in progress.
          </p>
        </div>
        <div>
          <h2>
            Afghanistan is where
            <br />
            my story starts.
            <br />
            <em>The rest is still being written.</em>
          </h2>
          <div className={styles.personalBody}>
            <p>
              I’m Samir, a writer and founder living in Trento, Italy. My work moves between
              writing, economics, and building VitaAvanza.
            </p>
            <p>
              The questions tend to travel with me: who gets to belong, where opportunity begins,
              and what we owe each other. This is where I try to give those questions some room.
            </p>
          </div>
          <div className={styles.personalLinks}>
            <Link className={styles.textLink} href="/about">
              Read my story <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.textLink} href="/projects">
              Explore VitaAvanza <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
