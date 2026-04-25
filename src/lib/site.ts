const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const fallbackUrl =
  process.env.NODE_ENV === "production" ? "https://samirseddiqi.it" : "http://localhost:3000";
const normalizedUrl = envUrl ? envUrl.replace(/\/+$/, "") : fallbackUrl;

export const siteConfig = {
  name: "Samir Seddiqi",
  description:
    "Personal website of Samir Seddiqi, founder of VitaAvanza, writer, and Economics & Management student in Trento, Italy.",
  url: normalizedUrl,
  email: "ceo@vitaavanza.it",
  linkedin: "https://www.linkedin.com/in/samirseddiqico",
  creator: "Samir Seddiqi",
  location: "Trento, Italy",
  identityLine: "Founder | Writer | Builder",
  tagline: "Founder, writer, and Economics & Management student in Trento.",
  footerLine: "Built with intention.",
  iconPath: "/icon.svg",
  socialImagePath: "/opengraph-card.png",
  keywords: [
    "Samir Seddiqi",
    "Samir Seddiqi VitaAvanza",
    "personal website",
    "author",
    "founder",
    "founder of VitaAvanza",
    "VitaAvanza founder",
    "Economics and Management",
    "University of Trento",
    "VitaAvanza",
    "VitaAvanza S.r.l.",
    "VitaAvanza founder Samir Seddiqi",
    "We Were Never Here",
    "writing",
    "entrepreneurship",
    "strategy",
    "systems thinking",
    "personal story",
    "Trento Italy",
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
    title: "We Were Never Here",
    award: "Available by request",
    distribution: "Free by request",
  },
} as const;

export function absoluteUrl(pathname = "/") {
  if (pathname === "/") return siteConfig.url;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${path}`;
}

export function normalizePathname(pathname?: string | null) {
  if (!pathname || pathname === "/") return "/";
  const normalized = pathname.replace(/\/+$/, "");
  return normalized.length > 0 ? normalized : "/";
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/book", label: "Book" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;
