import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HeroBackground } from "@/components/hero-background";
import { HomeIntro } from "@/components/home-intro";
import { MotionSection } from "@/components/motion/motion-section";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

import styles from "./home.module.css";

const canonicalUrl = absoluteUrl("/");
const ogImage = absoluteUrl(siteConfig.socialImagePath);

export const metadata: Metadata = {
  title: "Founder of VitaAvanza",
  description:
    "I'm Samir Seddiqi, founder of VitaAvanza, writer, and Economics & Management student in Trento. This is my personal space, where writing, ambition, lived experience, and the work behind VitaAvanza come together.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    title: `${siteConfig.name} | Founder of VitaAvanza`,
    description:
      "I'm Samir Seddiqi, founder of VitaAvanza, writer, and Economics & Management student in Trento. This is my personal space, where writing, ambition, lived experience, and the work behind VitaAvanza come together.",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Founder of VitaAvanza`,
    description:
      "I'm Samir Seddiqi, founder of VitaAvanza, writer, and Economics & Management student in Trento. This is my personal space, where writing, ambition, lived experience, and the work behind VitaAvanza come together.",
    images: [ogImage],
  },
};

const currentFocus = [
  {
    title: "Building VitaAvanza",
    description:
      "Developing an AI infrastructure for institutions supporting people through complex journeys.",
  },
  {
    title: "Studying in Trento",
    description: "Pursuing Economics and Management at the University of Trento.",
  },
  {
    title: "Writing",
    description: "Sharing thoughts on technology, society, and a more human future.",
  },
  {
    title: "Exploring what’s next",
    description: "Working on new ideas at the intersection of people, technology, and impact.",
  },
] as const;

const timeline = [
  { place: "Kabul", note: "The beginning." },
  { place: "Italy", note: "A new chapter." },
  { place: "University of Trento", note: "Economics and Management." },
  { place: "VitaAvanza", note: "Founder and company builder." },
] as const;

const articleImages = [
  "/home/writing-path.jpg",
  "/home/writing-threshold.jpg",
  "/home/writing-desk.jpg",
] as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    sameAs: [siteConfig.linkedin],
    jobTitle: "Founder of VitaAvanza, Writer, and Economics & Management Student",
    description: siteConfig.description,
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Trento" },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
    knowsAbout: [
      "Writing",
      "Entrepreneurship",
      "Systems thinking",
      "Economics and Management",
      "Strategy",
    ],
  } as const;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.name,
    alternateName: siteConfig.company.shortName,
    url: siteConfig.company.url,
    sameAs: [siteConfig.company.linkedin],
    founder: { "@type": "Person", name: siteConfig.name, url: canonicalUrl },
    description:
      "VitaAvanza is a project and company founded by Samir Seddiqi, built around progress, direction, support, and real-life stability.",
  } as const;

  return (
    <>
      <HomeIntro />
      <JsonLd data={personJsonLd} id="person-jsonld-home" />
      <JsonLd data={organizationJsonLd} id="organization-jsonld-home" />

      <MotionSection
        as="header"
        className={styles.hero}
        containerClassName={styles.heroContainer}
        motionClassName={styles.heroGrid}
      >
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> People, systems, a more human tomorrow
          </p>
          <h1 className={styles.heroTitle}>
            <span>Samir</span>
            <span>Seddiqi</span>
          </h1>
          <p className={styles.heroRole}>Founder, builder, writer.</p>
          <p className={styles.heroDescription}>
            Building VitaAvanza in Trento, shaping systems that help people navigate complex lives.
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/contact" size="lg">Get in touch</ButtonLink>
            <ButtonLink href="#selected-work" size="lg" variant="ghost">Explore work</ButtonLink>
          </div>
        </div>
        <HeroBackground className={styles.heroPortrait} />
        <p className={styles.heroIndex} aria-hidden="true">SS / 01</p>
      </MotionSection>

      <MotionSection
        className={styles.nowSection}
        containerClassName={styles.sectionContainer}
        motionClassName={styles.nowGrid}
      >
        <div className={styles.sectionLead}>
          <p className={styles.sectionLabel}>Now <span aria-hidden="true" /></p>
          <h2>Currently building, learning, and writing.</h2>
        </div>
        <ol className={styles.focusList}>
          {currentFocus.map((item, index) => (
            <li key={item.title}>
              <span className={styles.itemNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </MotionSection>

      <MotionSection
        className={styles.workSection}
        containerClassName={styles.sectionContainer}
        id="selected-work"
        motionClassName={styles.sectionFlow}
      >
        <div className={styles.sectionHeadingRow}>
          <div>
            <p className={styles.sectionLabel}>Selected work <span aria-hidden="true" /></p>
            <h2>Selected work.</h2>
          </div>
          <Link className={styles.editorialLink} href="/projects">
            View all work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.workGrid}>
          <article className={styles.flagship}>
            <div className={styles.flagshipImage}>
              <Image alt="A warm editorial view of Trento and the Dolomites" fill sizes="(max-width: 767px) 100vw, 66vw" src="/home/vitaavanza-trento.jpg" unoptimized />
            </div>
            <div className={styles.flagshipCopy}>
              <p className={styles.projectMeta}><span>01</span> Flagship project</p>
              <h3>VitaAvanza</h3>
              <p>An AI infrastructure for institutions supporting people through complex journeys.</p>
              <a className={styles.editorialLink} href={siteConfig.company.url} rel="noreferrer" target="_blank">
                Explore VitaAvanza <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <div className={styles.secondaryWork}>
            <article>
              <p className={styles.projectMeta}><span>02</span> Words & ideas</p>
              <h3>Writing</h3>
              <p>Essays, reflections, and notes on technology, society, and building a more human future.</p>
              <Link className={styles.editorialLink} href="/blog">Read my writing <span aria-hidden="true">→</span></Link>
            </article>
            <article>
              <p className={styles.projectMeta}><span>03</span> Experiments</p>
              <h3>Projects</h3>
              <p>A collection of ideas, experiments, and early-stage explorations across different domains.</p>
              <Link className={styles.editorialLink} href="/projects">Explore projects <span aria-hidden="true">→</span></Link>
            </article>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className={styles.writingSection}
        containerClassName={styles.sectionContainer}
        motionClassName={styles.sectionFlow}
      >
        <div className={styles.sectionHeadingRow}>
          <div>
            <p className={styles.sectionLabel}>Writing <span aria-hidden="true" /></p>
            <h2>Writing.</h2>
          </div>
          <Link className={styles.editorialLink} href="/blog">View all articles <span aria-hidden="true">→</span></Link>
        </div>

        <div className={styles.articleGrid}>
          {posts.map((post, index) => (
            <article className={index === 0 ? styles.leadArticle : styles.article} key={post.slug}>
              <Link className={styles.articleImage} href={`/blog/${post.slug}`} tabIndex={-1}>
                <Image alt="" fill sizes={index === 0 ? "(max-width: 767px) 100vw, 54vw" : "(max-width: 767px) 100vw, 30vw"} src={articleImages[index]} unoptimized />
              </Link>
              <div className={styles.articleCopy}>
                <p className={styles.articleMeta}>{formatDate(post.date)} <span aria-hidden="true">•</span> {post.tags[0]}</p>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.summary}</p>
                <Link className={styles.articleReadLink} href={`/blog/${post.slug}`}>Read essay <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection
        className={styles.timelineSection}
        containerClassName={styles.sectionContainer}
        motionClassName={styles.sectionFlow}
      >
        <div className={styles.timelineHeading}>
          <div>
            <p className={styles.sectionLabel}>A short timeline <span aria-hidden="true" /></p>
            <h2>A short timeline.</h2>
          </div>
          <p>Different places. A clearer purpose.</p>
        </div>
        <ol className={styles.timeline}>
          {timeline.map((item, index) => (
            <li key={item.place}>
              <span className={styles.timelineMarker} aria-hidden="true" />
              <p className={styles.timelineNumber}>Chapter {String(index + 1).padStart(2, "0")}</p>
              <h3>{item.place}</h3>
              <p>{item.note}</p>
            </li>
          ))}
        </ol>
      </MotionSection>

    </>
  );
}
