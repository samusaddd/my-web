"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navLinks, normalizePathname, siteConfig } from "@/lib/site";

export function MobileNav() {
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);
  const current = pathname?.startsWith("/blog/") ? "/blog" : normalizePathname(pathname);
  useEffect(() => { if (details.current) details.current.open = false; }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.current?.open) {
        details.current.open = false;
        details.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (details.current?.open && !details.current.contains(event.target as Node)) details.current.open = false;
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, []);
  return (
    <details className="mobile-navigation" ref={details}>
      <summary>Menu <span className="menu-mark" aria-hidden="true" /></summary>
      <nav aria-label="Mobile navigation" className="mobile-navigation-panel">
        <p className="mobile-nav-label">The pages</p>
        <Link aria-current={current === "/" ? "page" : undefined} href="/" onClick={() => { if (details.current) details.current.open = false; }}><span aria-hidden="true">00</span>Home<span aria-hidden="true">↗</span></Link>
        {navLinks.map((link, index) => (
          <Link aria-current={current === link.href ? "page" : undefined} href={link.href} key={link.href} onClick={() => { if (details.current) details.current.open = false; }}>
            <span aria-hidden="true">0{index + 1}</span>{link.label}<span aria-hidden="true">↗</span>
          </Link>
        ))}
        <a className="mobile-email" href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
      </nav>
    </details>
  );
}
