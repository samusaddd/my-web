import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/site";

import { Container } from "../ui/container";
import { Divider } from "../ui/divider";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-white/5 py-12">
      <Container className="space-y-10">
        <Divider />

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_1fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
              Institutional Infrastructure
            </p>
            <p className="max-w-md text-sm text-white/75">
              Strategy, product clarity, and civic alignment for people and institutions in
              transition.
            </p>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Navigate</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/75">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Direct contact</p>
            <p className="text-sm text-white/80">
              <a className="underline decoration-white/30 underline-offset-4" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p className="text-sm text-white/80">
              <a className="underline decoration-white/30 underline-offset-4" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            </p>
            <p className="text-xs text-white/55">
              {siteConfig.book.title} — a reflective literary work on silence, vulnerability, and the
              need to be heard. {siteConfig.book.award}. {siteConfig.book.distribution}.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
