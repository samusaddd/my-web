import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPostsWithContent } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: "Samir Seddiqi | Writer & Founder" },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: "Samir Seddiqi | Writer & Founder", description: siteConfig.description, url: absoluteUrl("/"), type: "website", images: [{ url: absoluteUrl(siteConfig.socialImagePath), width: 1200, height: 630, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", title: "Samir Seddiqi | Writer & Founder", description: siteConfig.description, images: [absoluteUrl(siteConfig.socialImagePath)] },
};
function date(value: string) { return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)); }
function minutes(content: string) { return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220)); }

export default function HomePage() {
  const posts = getAllPostsWithContent();
  const latest = posts[0];
  const archive = posts.slice(1, 4);
  const srcSet = latest?.coverImage && (latest.coverImageSmall || latest.coverImageMedium)
    ? [
      latest.coverImageSmall ? latest.coverImageSmall + " 800w" : null,
      latest.coverImageMedium ? latest.coverImageMedium + " 1600w" : null,
      latest.coverImage + " " + (latest.coverWidth || 2400) + "w",
    ].filter(Boolean).join(", ")
    : undefined;
  return (
    <>
      <JsonLd id="person-jsonld-home" data={{ "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, url: absoluteUrl("/"), sameAs: [siteConfig.linkedin], jobTitle: "Writer and Founder", description: siteConfig.description, worksFor: { "@type": "Organization", name: siteConfig.company.name, url: siteConfig.company.url } }} />
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The personal pages of Samir Seddiqi</p>
          <h1>A life in words.<br /><em>A world in question.</em></h1>
          <p className={styles.heroLead}>I write about freedom, belonging, and what it means to build a life that feels your own.</p>
          <div className={styles.heroActions}>
            <Link className={styles.solidLink} href="/projects">Explore VitaAvanza <span aria-hidden="true">↗</span></Link>
            <Link className={styles.textLink} href="/blog">Read the essays <span aria-hidden="true">→</span></Link>
          </div>
          <p className={styles.heroFootnote}>Afghan-born. Based in Trento.<br />Still asking questions.</p>
        </div>
      </section>

      {latest ? (
        <section className={styles.writingSection} aria-labelledby="writing-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / The latest essay</p><Link className={styles.textLink} href="/blog">The writing archive ↗</Link></div>
          <div className={styles.featuredEssay}>
            {latest.coverImage ? <Link className={styles.essayImage} href={"/blog/" + latest.slug} tabIndex={-1} aria-hidden="true"><img alt="" width={latest.coverWidth || 2400} height={latest.coverHeight || 1350} src={latest.coverImage} srcSet={srcSet} sizes="(max-width: 767px) calc(100vw - 40px), 60vw" loading="lazy" /></Link> : null}
            <div className={styles.essayCopy}>
              <p className={styles.eyebrow}>{latest.category || "An essay"}<br /><time dateTime={latest.date}>{date(latest.date)}</time> · {minutes(latest.content)} min read</p>
              <h2 id="writing-title"><Link href={"/blog/" + latest.slug}>{latest.title}</Link></h2>
              <p>{latest.summary}</p>
              <Link className={styles.textLink} href={"/blog/" + latest.slug}>Read the essay <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className={styles.archive}>
            {archive.map((post, index) => <Link className={styles.archiveRow} href={"/blog/" + post.slug} key={post.slug}>
              <span className={styles.archiveNumber}>0{index + 2}</span>
              <h3>{post.title}</h3><span className={styles.archiveDate}>{date(post.date)}</span><span className={styles.archiveArrow} aria-hidden="true">↗</span>
            </Link>)}
          </div>
        </section>
      ) : null}

      <section className={styles.booksSection} aria-labelledby="books-title">
        <div className={styles.booksInner}>
          <div className={styles.booksIntro}><p className={styles.eyebrow}>02 / Books &amp; longer work</p><h2 id="books-title">Some stories<br />need <em>more room.</em></h2><p>Memory, silence, and the difficult business of being human. Two books, written in the hope that something on the page might reach someone on the other side.</p><Link className={styles.lightLink} href="/book">Explore the books →</Link></div>
          <div className={styles.bookPair}>
            <Link href="/book#can-you-hear-me" className={styles.bookTile}><div className={styles.bookCover}><span>SAMIR SEDDIQI</span><strong>Can You<br />Hear Me<span className={styles.questionMark}>?</span></strong><span>A PERSONAL LITERARY WORK</span></div><h3>Can You Hear Me?</h3><p>{siteConfig.book.distribution} ↗</p></Link>
            <Link href="/book#we-were-never-here" className={styles.bookTile}><div className={styles.bookCoverSecond}><span>SAMIR SEDDIQI</span><strong>We Were<br /><em>Never</em><br />Here</strong><span>A WORK BY SAMIR SEDDIQI</span></div><h3>We Were Never Here</h3><p>{siteConfig.newBook.distribution} ↗</p></Link>
          </div>
        </div>
      </section>

      <section className={styles.personalSection}>
        <p className={styles.eyebrow}>03 / A short introduction</p>
        <div><h2>Afghanistan is where<br />my story starts.<br /><em>The rest is still being written.</em></h2><div className={styles.personalBody}><p>I’m Samir, a writer and founder living in Trento, Italy. My work moves between writing, economics, and building VitaAvanza.</p><p>The questions tend to travel with me: who gets to belong, where opportunity begins, and what we owe each other. This is where I try to give those questions some room.</p><Link className={styles.textLink} href="/about">Read my story →</Link></div></div>
      </section>

    </>
  );
}
