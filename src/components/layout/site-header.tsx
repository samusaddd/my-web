"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { createTransition, fadeDown } from "@/lib/motion";
import { navLinks, normalizePathname, siteConfig } from "@/lib/site";

import { Container } from "../ui/container";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const activePath = pathname?.startsWith("/blog/")
    ? "/blog"
    : normalizePathname(pathname ?? "/");
  const reducedMotion = useReducedMotion() ?? false;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerVariants = fadeDown(10, reducedMotion);

  return (
    <motion.header
      animate="visible"
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-ink/10 bg-paper/[0.92] shadow-[0_18px_50px_-40px_rgba(42,31,43,0.34)] backdrop-blur-xl supports-[backdrop-filter]:bg-paper/[0.82]"
          : "border-ink/[0.07] bg-paper/[0.86] backdrop-blur-md supports-[backdrop-filter]:bg-paper/[0.72]",
      )}
      initial="hidden"
      transition={createTransition(0.5, reducedMotion)}
      variants={headerVariants}
    >
      <Container className="flex h-[4.75rem] items-center justify-between gap-4">
        <Link
          aria-label={`${siteConfig.name} home`}
          className="group inline-flex flex-col leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px]"
          href="/"
        >
          <span className="font-serif text-[1.08rem] font-semibold tracking-[-0.02em] text-ink">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.13em] text-ink/48 transition group-hover:text-accent/75">
            {siteConfig.identityLine}
          </span>
        </Link>

        <LayoutGroup id="primary-nav">
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = normalizePathname(link.href) === activePath;
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-10 items-center px-3.5 text-[13px] font-semibold tracking-[-0.01em] transition-[color,transform] duration-500 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                    isActive
                      ? "text-accent"
                      : "text-ink/62 hover:-translate-y-px hover:text-ink",
                  )}
                  href={link.href}
                  key={link.href}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive ? (
                    reducedMotion ? (
                      <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-accent/80" />
                    ) : (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent/80"
                        layoutId="nav-underline"
                        transition={createTransition(0.52, reducedMotion)}
                      />
                    )
                  ) : (
                    <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>
        </LayoutGroup>

        <MobileNav />
      </Container>
    </motion.header>
  );
}
