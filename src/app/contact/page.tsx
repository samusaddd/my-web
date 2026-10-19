import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "../interior.module.css";

const canonicalUrl = absoluteUrl("/contact");
const description = "Get in touch with Samir Seddiqi about writing, book requests, thoughtful collaborations, and projects.";
const image = { url: absoluteUrl(siteConfig.socialImagePath), width: 1200, height: 630, alt: "Contact Samir Seddiqi" };
export const metadata: Metadata = {
  title: "Contact", description, alternates: { canonical: canonicalUrl },
  openGraph: { title: `Contact | ${siteConfig.name}`, description, type: "website", url: canonicalUrl, images: [image] },
  twitter: { card: "summary_large_image", title: `Contact | ${siteConfig.name}`, description, images: [image] },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={`${styles.hero} ${styles.contactHero}`}>
        <div className={`${styles.wrap} ${styles.splitHero}`}>
          <div><p className={styles.eyebrow}>Contact / A conversation</p><h1 className={styles.pageTitle}>Let’s<br /><em>begin.</em></h1></div>
          <p className={styles.lede}>A response to something I wrote. A book you would like to read. An idea worth exploring together. You are welcome to write.</p>
        </div>
      </header>
      <section className={`${styles.section} ${styles.rule}`}>
        <div className={`${styles.wrap} ${styles.contactGrid}`}>
          <div className={styles.contactDetails}>
            <p className={styles.eyebrow}>Direct, and personal</p>
            <a className={styles.email} href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <p className={styles.text}>The simplest way to reach me. Write in your own words, with a little context about what brought you here.</p>
            <div className={styles.actions}><a className={styles.link} href={siteConfig.linkedin} rel="noopener noreferrer" target="_blank">Connect on LinkedIn <span aria-hidden="true">↗</span></a></div>
            <div className={styles.contactTopics}>
              <div className={styles.contactTopic}><span className={styles.index}>01</span><div><h3>Writing & ideas</h3><p>Essays, editorial conversations, and the questions that stay with you after reading.</p></div></div>
              <div className={styles.contactTopic}><span className={styles.index}>02</span><div><h3>Books & readers</h3><p>For a copy of either book, you can <Link className="underline underline-offset-4" href="/book">choose a title on the books page</Link> and open a book-specific email request.</p></div></div>
              <div className={styles.contactTopic}><span className={styles.index}>03</span><div><h3>Work & collaboration</h3><p>Projects, professional opportunities, and thoughtful conversations about something we could build together.</p></div></div>
            </div>
          </div>
          <div>
            <h2 className={styles.formHeading}>A note from you.</h2>
            <p className={styles.formIntro}>Use this space to prepare your message. It opens a draft in your email app, where you can review and send it.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
