export const siteConfig = {
  name: "Samir Seddiqi",
  description:
    "Founder & CEO of VitaAvanza. Work across economics, product strategy, writing, and institutional collaboration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "ceo@vitaavanza.it",
  linkedin: "https://www.linkedin.com/in/samirseddiqico",
  book: {
    title: "Can You Hear Me?",
    award: "Writer of the Year Award (2022)",
    distribution: "Free by request",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
