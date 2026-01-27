"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/lib/site";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-[1.5px] w-6 -translate-y-2.5 bg-white transition-transform duration-200",
          open && "translate-y-0 rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-[1.5px] w-6 -translate-y-1/2 bg-white/80 transition-opacity duration-200",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-[1.5px] w-6 translate-y-2.5 bg-white transition-transform duration-200",
          open && "translate-y-0 -rotate-45",
        )}
      />
    </span>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname.startsWith("/blog/")) return "/blog";
    return pathname;
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white shadow-[0_15px_40px_-25px_rgba(15,23,42,0.8)] transition hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <MenuIcon open={open} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1 }}
            aria-hidden={!open}
            className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              animate={{ opacity: 1, y: 0 }}
              aria-label="Mobile"
              className="mx-4 mt-20 rounded-3xl border border-white/10 bg-zinc-950/95 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)]"
              exit={{ opacity: 0, y: -12 }}
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = link.href === activeHref;
                  return (
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                        isActive
                          ? "bg-white/[0.09] text-white"
                          : "text-white/80 hover:bg-white/[0.06] hover:text-white",
                      )}
                      href={link.href}
                      key={link.href}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/75">
                <p className="font-medium text-white">Direct contact</p>
                <p className="mt-1">
                  <a className="text-white/90 underline decoration-white/30 underline-offset-4" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </p>
                <p className="mt-1">
                  <a className="text-white/90 underline decoration-white/30 underline-offset-4" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                    LinkedIn
                  </a>
                </p>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
