import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "../interior.module.css";

const canonicalUrl = absoluteUrl("/book");
const description = "Two books by Samir Seddiqi: We Were Never Here and Can You Hear Me? Writing on identity, meaning, silence, and the need to be understood.";
const image = { url: absoluteUrl(siteConfig.socialImagePath), width: 1200, height: 630, alt: "Books by Samir Seddiqi" };
const requestHref = (title: string) => `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Request for ${title}`)}`;
export const metadata: Metadata = {
  title: "Books", description, alternates: { canonical: canonicalUrl },
  openGraph: { title: `Books | ${siteConfig.name}`, description, type: "website", url: canonicalUrl, images: [image] },
  twitter: { card: "summary_large_image", title: `Books | ${siteConfig.name}`, description, images: [image] },
};

export default function BookPage() {
  const booksJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Book", "@id": `${canonicalUrl}#we-were-never-here`, name: siteConfig.newBook.title, author: { "@type": "Person", name: siteConfig.name }, inLanguage: "en", url: `${canonicalUrl}#we-were-never-here`, description: "A work on identity, meaning, and the quiet continuation of existence when certainty dissolves." },
      { "@type": "Book", "@id": `${canonicalUrl}#can-you-hear-me`, name: siteConfig.book.title, author: { "@type": "Person", name: siteConfig.name }, inLanguage: "en", url: `${canonicalUrl}#can-you-hear-me`, description: "A personal literary work shaped by silence, pain, reflection, and the need to be heard." },
    ],
  };
  return (
    <div className={styles.page}>
      <JsonLd data={booksJsonLd} id="books-jsonld" />
      <header className={styles.hero}>
        <div className={`${styles.wrap} ${styles.splitHero}`}>
          <div><p className={styles.eyebrow}>The books / Samir Seddiqi</p><h1 className={styles.pageTitle}>Books.</h1></div>
          <div><p className={styles.lede}>Silence. Identity. Meaning.<br />The difficult work of being human.</p><div className={styles.actions}><a className={styles.link} href="#we-were-never-here">Begin with the new work <span aria-hidden="true">↓</span></a></div></div>
        </div>
      </header>

      <section className={`${styles.section} ${styles.rule} ${styles.bookSection}`} id="we-were-never-here">
        <div className={`${styles.wrap} ${styles.bookRow}`}>
          <div className={styles.bookArt} aria-hidden="true">
            <div className={`${styles.bookJacket} ${styles.plumJacket}`}>
              <span className={styles.jacketAuthor}>Samir Seddiqi</span>
              <span className={styles.jacketLine} />
              <span className={styles.jacketTitle}>We Were Never Here</span>
              <span className={styles.jacketFoot}><span>Identity / Meaning</span><span>01</span></span>
            </div>
          </div>
          <div className={styles.bookCopy}>
            <p className={styles.index}>01 / The new work</p>
            <h2 className={styles.sectionTitle}>{siteConfig.newBook.title}</h2>
            <p className={styles.meta}>Identity / Meaning / Existence</p>
            <div className={styles.text}>
              <p>This is not a book written to provide answers. It is a structured confrontation with the absence of them.</p>
              <p>A study of identity, meaning, and the quiet continuation of existence when certainty dissolves. A work about what remains when the self can no longer be treated as something fixed.</p>
            </div>
            <div className={styles.actions}><a className={styles.link} href={requestHref(siteConfig.newBook.title)}>Request this book <span aria-hidden="true">↗</span></a></div>
            <p className={styles.bookAvailability}>{siteConfig.newBook.distribution}. Opens an email request.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkBand} ${styles.bookSection}`} id="can-you-hear-me">
        <div className={`${styles.wrap} ${styles.bookRow}`}>
          <div className={styles.bookArt} aria-hidden="true">
            <div className={`${styles.bookJacket} ${styles.ivoryJacket}`}>
              <span className={styles.jacketAuthor}>Samir Seddiqi</span>
              <span className={styles.jacketLine} />
              <span className={styles.jacketTitle}>Can You Hear Me?</span>
              <span className={styles.jacketFoot}><span>Silence / Reflection</span><span>02</span></span>
            </div>
          </div>
          <div className={styles.bookCopy}>
            <p className={styles.eyebrow}>02 / The original work</p>
            <h2 className={styles.sectionTitle}>{siteConfig.book.title}</h2>
            <p className={styles.meta}>Silence / Pain / Reflection</p>
            <div className={styles.text}>
              <p>A personal work shaped by silence, pain, reflection, and the need to be heard.</p>
              <p>It comes from lived experience and reaches toward the larger human need to be understood without having to perform strength all the time.</p>
              <p>The writing stays close to the things that are hardest to say.</p>
            </div>
            <div className={styles.actions}><a className={styles.link} href={requestHref(siteConfig.book.title)}>Request a copy <span aria-hidden="true">↗</span></a></div>
            <p className={styles.bookAvailability}>{siteConfig.book.distribution}. Opens an email request.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.requestNote}`}>
          <div><p className={styles.eyebrow}>A note to readers</p><h2 className={styles.sectionTitle}>A book begins<br /><em>a conversation.</em></h2></div>
          <div className={styles.text}>
            <p>Both books are available by request. Choose a title above and write a short note with your name and which work you would like to read.</p>
            <p>Your request opens in your email app, where you can add your message and send it to <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
            <div className={styles.actions}><Link className={styles.link} href="/blog">Read the essays <span aria-hidden="true">→</span></Link><Link className={styles.link} href="/contact">Get in touch <span aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </section>
    </div>
  );
}
