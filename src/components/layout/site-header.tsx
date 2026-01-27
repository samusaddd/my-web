"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/lib/site";

import { Container } from "../ui/container";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const activePath = pathname?.startsWith("/blog/") ? "/blog" : pathname ?? "/";

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/55"
      initial={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
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

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = link.href === activePath;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                  isActive
                    ? "bg-white/[0.08] text-white shadow-[0_10px_30px_-18px_rgba(255,255,255,0.45)]"
                    : "hover:bg-white/[0.06]",
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <MobileNav />
      </Container>
    </motion.header>
  );
}
