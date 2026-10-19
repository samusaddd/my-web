import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "../interior.module.css";

const canonicalUrl = absoluteUrl("/resume");
const description = "Samir Seddiqi's background in writing, Economics and Management, founding VitaAvanza, educational talks, and volunteer work.";
const image = { url: absoluteUrl(siteConfig.socialImagePath), width: 1200, height: 630, alt: "Samir Seddiqi — background and experience" };
export const metadata: Metadata = {
  title: "Resume", description, alternates: { canonical: canonicalUrl },
  openGraph: { title: `Resume | ${siteConfig.name}`, description, type: "website", url: canonicalUrl, images: [image] },
  twitter: { card: "summary_large_image", title: `Resume | ${siteConfig.name}`, description, images: [image] },
};

const competencies = [
  {
    title: "Writing and communication",
    description:
      "Able to turn complex ideas and lived experience into language that is clear, serious, and intentional.",
  },
  {
    title: "Strategic thinking",
    description:
      "Comfortable thinking in terms of systems, trade-offs, long-term direction, and the discipline required to follow through.",
  },
  {
    title: "Project building",
    description:
      "Drawn to ideas that can move beyond theory and become something structured, workable, and real.",
  },
  {
    title: "Research and discovery",
    description:
      "Attentive to human reality and able to translate observation, listening, and lived context into direction.",
  },
  {
    title: "Adaptability under pressure",
    description:
      "Used to building and operating without ideal conditions while staying reliable, focused, and composed.",
  },
  {
    title: "Institutional awareness",
    description:
      "I think carefully about credibility, accountability, and how work lands inside serious environments.",
  },
] as const;

const experience = [
  {
    title: "Founder & CEO",
    institution: "VitaAvanza S.r.l.",
    timeframe: "2025-present",
    detail:
      "Leading the early direction of VitaAvanza and shaping the project across concept development, structure, communication, and long-term positioning.",
  },
  {
    title: "Educational talks in schools",
    institution: "Selected speaking",
    timeframe: "Ongoing",
    detail:
      "Speaking with students about resilience, integration, education, and the realities of building a future under pressure.",
  },
  {
    title: "Volunteer work",
    institution: "Centro Astalli",
    timeframe: "Community",
    detail:
      "Supporting people in vulnerable situations and staying close to the human realities that often sit behind systems, bureaucracy, and transition.",
  },
] as const;

const education = [
  {
    title: "BSc in Economics and Management",
    institution: "University of Trento",
    timeframe: "2023-2027",
    detail:
      "Academic work centered on economics, management, and the way structure, incentives, and decisions shape long-term outcomes.",
  },
  {
    title: "Student review and feedback group",
    institution: "University of Trento",
    timeframe: "Academic involvement",
    detail:
      "Contributing student perspective and feedback to improve clarity, communication, and the quality of the academic environment.",
  },
] as const;

const languages = ["Persian (native)", "Italian (fluent)", "English (fluent)"] as const;



export default function ResumePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={`${styles.wrap} ${styles.resumeHero}`}>
          <div><p className={styles.eyebrow}>Background / Samir Seddiqi</p><h1 className={styles.pageTitle}>Résumé.</h1><p className={styles.lede}>An ongoing record of writing, study, building, and work with people.</p></div>
          <div className={styles.downloadBox}><p>For the full document, download my CV. For a conversation about writing, a project, or an opportunity, get in touch.</p><div className={styles.actions}><a className={styles.button} download="Samir-Seddiqi-CV.pdf" href="/Samir-Seddiqi-CV.pdf">Download CV · PDF <span aria-hidden="true">↓</span></a><Link className={styles.link} href="/contact">Contact <span aria-hidden="true">→</span></Link></div></div>
        </div>
      </header>
      <div className={styles.wrap}>
        <section className={styles.ledger}>
          <div className={styles.ledgerHeading}><span className={styles.index}>01</span><h2>Experience</h2></div>
          <div>{experience.map(item => (<div className={styles.ledgerEntry} key={item.title}><p className={styles.meta}>{item.timeframe}</p><div><h3>{item.title}</h3><p className={styles.ledgerInstitution}>{item.institution}</p><p className={styles.text}>{item.detail}</p></div></div>))}</div>
        </section>
        <section className={styles.ledger}>
          <div className={styles.ledgerHeading}><span className={styles.index}>02</span><h2>Education</h2></div>
          <div>{education.map(item => (<div className={styles.ledgerEntry} key={item.title}><p className={styles.meta}>{item.timeframe}</p><div><h3>{item.title}</h3><p className={styles.ledgerInstitution}>{item.institution}</p><p className={styles.text}>{item.detail}</p></div></div>))}</div>
        </section>
        <section className={styles.ledger}>
          <div className={styles.ledgerHeading}><span className={styles.index}>03</span><h2>Languages</h2></div>
          <dl className={styles.languageList}>{languages.map(language => { const parts = language.match(/^(.+) \((.+)\)$/); return <div key={language}><dt>{parts?.[1] || language}</dt><dd>{parts?.[2]}</dd></div>; })}</dl>
        </section>
      </div>
      <section className={`${styles.section} ${styles.darkBand}`}>
        <div className={`${styles.wrap} ${styles.sectionGrid}`}>
          <div><p className={styles.eyebrow}>04 / Across the work</p><h2 className={styles.sectionTitle}>Ways of<br />working.</h2></div>
          <ul className={styles.skills}>{competencies.map(item => (<li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>))}</ul>
        </div>
      </section>
    </div>
  );
}
