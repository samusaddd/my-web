"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks, siteConfig } from "@/lib/site";

import { Container } from "../ui/container";
import { Divider } from "../ui/divider";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <footer className="border-t border-ivory/10 bg-ink py-16 text-ivory sm:py-20 lg:py-24">
        <Container className="space-y-14">
          <div className="grid gap-12 border-b border-ivory/10 pb-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-lavender/60">
                Personal website
              </p>
              <p className="mt-5 font-serif text-4xl tracking-[-0.045em] text-ivory sm:text-5xl">
                Samir Seddiqi
              </p>
            </div>
            <div>
              <p className="max-w-4xl font-serif text-[clamp(3.1rem,6.5vw,7.2rem)] leading-[0.88] tracking-[-0.06em] text-ivory">
                Founder. Builder. Writer.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-ivory/68">
                <a className="underline decoration-lavender/20 underline-offset-8 transition-colors duration-300 hover:text-lavender" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <a className="transition-colors duration-300 hover:text-lavender" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                  LinkedIn ↗
                </a>
                <Link className="transition-colors duration-300 hover:text-lavender" href="/contact">
                  Let’s talk →
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-ivory/35 sm:flex-row">
            <p className="text-ivory/35">© {siteConfig.name}. All rights reserved.</p>
            <p className="text-ivory/35">{siteConfig.location}</p>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="relative mt-24 border-t border-ink/10 bg-ivory/45 py-14 sm:py-16">
      <Container className="space-y-12">
        <Divider />

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_1fr]">
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/75">
              Personal Website
            </p>
            <p className="max-w-md text-sm leading-relaxed text-ink/65">
              A personal space for my work, writing, ideas, and the direction I am building toward.
            </p>
            <p className="text-xs text-ink/42">
              © {siteConfig.name}. All rights reserved.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/48">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-ink/66">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors duration-300 hover:text-accent" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/48">Direct contact</p>
            <p className="text-sm text-ink/72">
              <a className="underline decoration-accent/25 underline-offset-4 transition-colors hover:text-accent" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p className="text-sm text-ink/72">
              <a
                className="underline decoration-accent/25 underline-offset-4 transition-colors hover:text-accent"
                href={siteConfig.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-xs text-ink/46">{siteConfig.footerLine}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
