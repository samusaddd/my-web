const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const fallbackUrl =
  process.env.NODE_ENV === "production" ? "https://samirseddiqi.it" : "http://localhost:3000";
const normalizedUrl = envUrl ? envUrl.replace(/\/+$/, "") : fallbackUrl;

export const siteConfig = {
  name: "Samir Seddiqi",
  description:
    "Personal site of Samir Seddiqi in Trento. Founder of VitaAvanza, writer of Can You Hear Me?, and builder of calm systems for people and institutions.",
  url: normalizedUrl,
  email: "ceo@vitaavanza.it",
  linkedin: "https://www.linkedin.com/in/samirseddiqico",
  creator: "Samir Seddiqi",
  location: "Trento, Italy",
  tagline: "I build calm systems from lived pressure.",
  keywords: [
    "Samir Seddiqi",
    "VitaAvanza",
    "VitaAvanza S.r.l.",
    "Founder of VitaAvanza",
    "Infrastructure for life navigation",
    "Life navigation systems",
    "Mitra AI",
    "DVI",
    "University of Trento",
    "Trento Italy",
    "Product strategy",
    "Institutional coordination",
    "Can You Hear Me?",
  ],
  company: {
    name: "VitaAvanza S.r.l.",
    shortName: "VitaAvanza",
    descriptor: "Infrastructure for life navigation",
    url: "https://vitaavanza.com",
    linkedin: "https://www.linkedin.com/company/vitaavanza/",
    email: "hello@vitaavanza.com",
    location: "Trento, Italy",
    ecosystem: "University of Trento ecosystem",
  },
  discovery: {
    total: 50,
    immigrants: 30,
    students: 20,
    pilot: 100,
  },
  book: {
    title: "Can You Hear Me?",
    award: "Writer of the Year Award (2022)",
    distribution: "Free by request",
  },
} as const;

export function absoluteUrl(pathname = "/") {
  if (pathname === "/") return siteConfig.url;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${path}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
