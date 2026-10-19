import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "../interior.module.css";

const canonicalUrl = absoluteUrl("/projects");
const description = "Selected work by Samir Seddiqi: building VitaAvanza, writing books, and publishing essays on society and human experience.";
const image = { url: absoluteUrl(siteConfig.socialImagePath), width: 1200, height: 630, alt: "Selected work by Samir Seddiqi" };
export const metadata: Metadata = {
  title: "Selected Work", description, alternates: { canonical: canonicalUrl },
  openGraph: { title: `Selected Work | ${siteConfig.name}`, description, type: "website", url: canonicalUrl, images: [image] },
  twitter: { card: "summary_large_image", title: `Selected Work | ${siteConfig.name}`, description, images: [image] },
};
export default function ProjectsPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org", "@type": "Organization", name: siteConfig.company.name,
    alternateName: siteConfig.company.shortName, url: siteConfig.company.url, sameAs: [siteConfig.company.linkedin],
    founder: { "@type": "Person", name: siteConfig.name, url: absoluteUrl("/") },
    description: "VitaAvanza is the main project founded by Samir Seddiqi, focused on progress, support, stability, and direction.",
  };
  return (
    <div className={styles.page}>
      <JsonLd data={organizationJsonLd} id="organization-jsonld-projects" />
      <header className={styles.hero}>
        <div className={`${styles.wrap} ${styles.splitHero}`}>
          <div><p className={styles.eyebrow}>Projects / Selected work</p><h1 className={styles.pageTitle}>Thought<br /><em>into action.</em></h1></div>
          <p className={styles.lede}>A company, two books, an ongoing body of writing. Different forms of the same impulse: to understand more, and make something of it.</p>
        </div>
      </header>
      <section className={`${styles.section} ${styles.rule}`}>
        <div className={styles.wrap}>
          <div className={styles.projectLead}>
            <div><p className={styles.index}>01 / Building</p><h2 className={styles.projectTitle}>VitaAvanza</h2><p className={styles.meta}>Founder · Active</p></div>
            <div className={`${styles.text} ${styles.projectText}`}>
              <p className={styles.lede}>Progress should be understood more deeply than money alone.</p>
              <p>VitaAvanza explores how people and institutions can navigate stability, growth, support, and opportunity in a more structured, human way.</p>
              <p>It brings the questions I care about into practical work: how we find direction, how support is organized, and how systems can stay close to the people using them.</p>
              <div className={styles.actions}><a className={styles.link} href={siteConfig.company.url} rel="noopener noreferrer" target="_blank">Visit VitaAvanza <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
          <figure className={styles.projectImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Trento and the surrounding mountains in warm evening light" decoding="async" height="1024" loading="lazy" src="/home/vitaavanza-trento.jpg" width="1536" />
            <figcaption className={styles.caption}><span>VitaAvanza / Trento, Italy</span><span>Building with a human perspective</span></figcaption>
          </figure>
        </div>
      </section>
      <section className={`${styles.section} ${styles.rule}`}>
        <div className={styles.wrap}>
          <div className={styles.projectRow}>
            <span className={styles.index}>02</span>
            <div><p className={styles.meta}>Books / Author</p><h2>Writing the<br /><em>interior life.</em></h2></div>
            <div className={styles.text}>
              <p><em>Can You Hear Me?</em> stays close to silence, pain, and the need to be understood. <em>We Were Never Here</em> turns toward identity, meaning, and what remains when certainty dissolves.</p>
              <p>Two works that approach difficult questions through a personal voice.</p>
              <div className={styles.actions}><Link className={styles.link} href="/book">Discover both books <span aria-hidden="true">→</span></Link></div>
            </div>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.index}>03</span>
            <div><p className={styles.meta}>Essays / Ongoing</p><h2>An open<br /><em>conversation.</em></h2></div>
            <div className={styles.text}>
              <p>Essays, letters, and reflections on freedom, society, responsibility, and the realities that shape a human life.</p>
              <p>A space to examine what we accept, what we question, and what we owe to one another.</p>
              <div className={styles.actions}><Link className={styles.link} href="/blog">Read the essays <span aria-hidden="true">→</span></Link></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
