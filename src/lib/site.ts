const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const fallbackUrl =
  process.env.NODE_ENV === "production" ? "https://example.com" : "http://localhost:3000";
const normalizedUrl = envUrl ? envUrl.replace(/\/+$/, "") : fallbackUrl;

export const siteConfig = {
  name: "Samir Seddiqi",
  description:
    "Founder & CEO of VitaAvanza. Author of 'Can You Hear Me?' (Writer of the Year Award 2022). Economics & Management at the University of Trento.",
  url: normalizedUrl,
  email: "ceo@vitaavanza.it",
  linkedin: "https://www.linkedin.com/in/samirseddiqico",
  creator: "Samir Seddiqi",
  keywords: [
    "Samir Seddiqi",
    "VitaAvanza",
    "Founder and CEO",
    "Institutional infrastructure",
    "Product strategy",
    "Economics and management",
    "Civic collaboration",
    "Can You Hear Me?",
  ],
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
