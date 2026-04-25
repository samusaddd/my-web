import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/site";

import { Container } from "../ui/container";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-white/5 py-12">
      <Container className="space-y-10">
        <div className="hairline" />

        <div className="surface-elevated grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr_1fr] md:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase text-white/50">
              Personal Website
            </p>
            <p className="max-w-md text-sm text-white/75">
              A personal space for my work, writing, ideas, and the direction I am building toward.
            </p>
            <p className="text-xs text-white/50">
              Copyright {siteConfig.name}. All rights reserved.
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
              <a
                className="underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white/70"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="text-sm text-white/80">
              <a
                className="underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white/70"
                href={siteConfig.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-xs text-white/55">{siteConfig.footerLine}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
