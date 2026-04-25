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
          ? "border-white/10 bg-zinc-950/88 shadow-[0_22px_70px_-44px_rgba(15,23,42,0.88)] backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/78"
          : "border-white/5 bg-zinc-950/58 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/48",
      )}
      initial="hidden"
      transition={createTransition(0.5, reducedMotion)}
      variants={headerVariants}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          aria-label={`${siteConfig.name} home`}
          className="group inline-flex flex-col rounded-2xl px-2 py-1 leading-tight transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:bg-white/[0.035]"
          href="/"
        >
          <span className="text-base font-semibold text-white">
            {siteConfig.name}
          </span>
          <span className="text-xs text-white/60 transition group-hover:text-white/80">
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
                    "relative inline-flex h-11 items-center rounded-full px-4 text-sm font-medium transition-[color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                    isActive
                      ? "bg-white/[0.075] text-white shadow-[0_14px_36px_-28px_rgba(125,211,252,0.68)]"
                      : "text-white/76 hover:-translate-y-[1px] hover:bg-white/[0.055] hover:text-white",
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
                        className="pointer-events-none absolute inset-x-3 -bottom-1.5 h-px origin-left bg-gradient-to-r from-transparent via-white/88 to-transparent"
                        layoutId="nav-underline"
                        transition={createTransition(0.52, reducedMotion)}
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
