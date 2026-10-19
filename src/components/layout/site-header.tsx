"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, normalizePathname, siteConfig } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const current = pathname?.startsWith("/blog/") ? "/blog" : normalizePathname(pathname);
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link aria-label={siteConfig.name + " home"} className="site-brand" href="/">
          <span>Samir Seddiqi<span className="brand-period">.</span></span>
          <span className="site-brand-caption">Writer &amp; founder · Trento, Italy</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navLinks.map((link, index) => (
            <Link aria-current={current === link.href ? "page" : undefined} href={link.href} key={link.href}>
              <span className="nav-number" aria-hidden="true">0{index + 1}</span>{link.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}