"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { createTransition, fadeDown } from "@/lib/motion";
import { navLinks, siteConfig } from "@/lib/site";

import { Container } from "../ui/container";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const activePath = pathname?.startsWith("/blog/") ? "/blog" : pathname ?? "/";
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
          ? "border-white/10 bg-zinc-950/85 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/75"
          : "border-white/5 bg-zinc-950/65 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/55",
      )}
      initial="hidden"
      transition={createTransition(0.5, reducedMotion)}
      variants={headerVariants}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          aria-label={`${siteConfig.name} home`}
          className="group inline-flex flex-col leading-tight"
          href="/"
        >
          <span className="text-base font-semibold tracking-tight text-white">
            {siteConfig.name}
          </span>
          <span className="text-xs text-white/60 transition group-hover:text-white/80">
            VitaAvanza
          </span>
        </Link>

        <LayoutGroup id="primary-nav">
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = link.href === activePath;
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                    isActive
                      ? "bg-white/[0.045] text-white"
                      : "text-white/80 hover:bg-white/[0.06] hover:text-white",
                  )}
                  href={link.href}
                  key={link.href}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive ? (
                    reducedMotion ? (
                      <span className="pointer-events-none absolute inset-x-3 -bottom-1.5 h-px bg-white/80" />
                    ) : (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-3 -bottom-1.5 h-px origin-left bg-gradient-to-r from-sky-200/90 via-white/85 to-sky-200/90"
                        layoutId="nav-underline"
                        transition={createTransition(0.45, reducedMotion)}
                      />
                    )
                  ) : (
                    <span className="pointer-events-none absolute inset-x-3 -bottom-1.5 h-px bg-white/0" />
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
