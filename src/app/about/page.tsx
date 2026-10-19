import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "../interior.module.css";

const canonicalUrl = absoluteUrl("/about");
const description = "Samir Seddiqi is an Afghan writer, founder of VitaAvanza, and Economics and Management student in Trento, Italy.";
const image = { url: absoluteUrl(siteConfig.socialImagePath), width: 1200, height: 630, alt: "Samir Seddiqi" };
export const metadata: Metadata = {
  title: "About Samir Seddiqi", description, alternates: { canonical: canonicalUrl },
  openGraph: { title: `About | ${siteConfig.name}`, description, type: "website", url: canonicalUrl, images: [image] },
  twitter: { card: "summary_large_image", title: `About | ${siteConfig.name}`, description, images: [image] },
};
const chapters = [
  { year: "Writing", title: "Two books. An ongoing conversation.", description: "Can You Hear Me? and We Were Never Here explore silence, identity, meaning, and the need to be understood." },
  { year: "2023—", title: "Economics and Management", description: "Studying at the University of Trento, thinking about the structures, choices, and incentives that shape people's lives." },
  { year: "2025—", title: "Building VitaAvanza", description: "Founder of VitaAvanza, bringing an interest in human experience into the practical work of building systems for progress." },
] as const;

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, url: canonicalUrl,
    sameAs: [siteConfig.linkedin], jobTitle: "Writer and founder of VitaAvanza", description,
    worksFor: { "@type": "Organization", name: siteConfig.company.name, url: siteConfig.company.url },
    affiliation: { "@type": "CollegeOrUniversity", name: "University of Trento" },
  };
  return (
    <div className={styles.page}>
      <JsonLd data={personJsonLd} id="person-jsonld-about" />
      <header className={styles.hero}>
        <div className={`${styles.wrap} ${styles.aboutHero}`}>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>About Samir Seddiqi</p>
            <h1 className={styles.pageTitle}>A life.<br /><em>A point of view.</em></h1>
            <p className={styles.lede}>I was born in Afghanistan. Today, I write, study, and build in Trento, Italy.</p>
            <p className={`${styles.text} mt-5`}>Different places, different responsibilities. The questions I carry with me keep finding their way into the work.</p>
            <div className={styles.actions}>
              <Link className={styles.link} href="/blog">Read my writing <span aria-hidden="true">↗</span></Link>
              <Link className={styles.link} href="/resume">View my background <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <figure className={styles.portrait}>
            <div className={styles.portraitFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Portrait of Samir Seddiqi in front of historic architecture" decoding="async" fetchPriority="high" height="941" src="/samir-hero-editorial.jpg" width="1672" />
            </div>
            <figcaption className={styles.caption}><span>Samir Seddiqi</span><span>Writer · Founder · Student</span></figcaption>
          </figure>
        </div>
      </header>
      <section className={`${styles.section} ${styles.rule}`}>
        <div className={`${styles.wrap} ${styles.sectionGrid}`}>
          <p className={styles.sectionLabel}>01 / The perspective</p>
          <div>
            <div className={styles.narrative}>
              <h2 className={styles.sectionTitle}>What shaped me <em>stays in the work.</em></h2>
              <div className={styles.text}>
                <p>My perspective was not built in comfort. Responsibility, hardship, and the need to keep moving forward have shaped the way I think, write, and build.</p>
                <p>Writing gives me a place to confront memory, truth, and identity. Economics asks me to look at the structures behind opportunity. Building asks what I am prepared to do with that understanding.</p>
                <p>I keep returning to the same concern: how a person's reality can become clearer, or more difficult, because of the systems around them.</p>
              </div>
            </div>
            <div className={styles.chronology}>
              {chapters.map(chapter => (
                <div className={styles.chronologyItem} key={chapter.title}>
                  <span className={styles.index}>{chapter.year}</span>
                  <div><h3>{chapter.title}</h3><p>{chapter.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.darkBand}`}>
        <div className={`${styles.wrap} ${styles.sectionGrid}`}>
          <p className={styles.sectionLabel}>02 / A conviction</p>
          <div>
            <blockquote className={styles.quote}>“And because freedom, if it means anything at all, must belong to everyone.”</blockquote>
            <p className={styles.quoteSource}>From <Link href="/blog/to-the-girl-who-was-told-to-stop-dreaming">To the Girl Who Was Told to Stop Dreaming</Link>, an open letter to the women and girls of Afghanistan.</p>
            <div className={styles.actions}><Link className={styles.link} href="/book">Explore the books <span aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </section>
    </div>
  );
}
