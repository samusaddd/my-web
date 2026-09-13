"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { createTransition, fadeDown } from "@/lib/motion";
import { navLinks, normalizePathname, siteConfig } from "@/lib/site";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-px w-6 -translate-y-2.5 bg-ink transition-transform duration-300 ease-editorial",
          open && "translate-y-0 rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 bg-ink/70 transition-opacity duration-300",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-px w-6 translate-y-2.5 bg-ink transition-transform duration-300 ease-editorial",
          open && "translate-y-0 -rotate-45",
        )}
      />
    </span>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname.startsWith("/blog/")) return "/blog";
    return normalizePathname(pathname);
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

  const menuVariants = fadeDown(10, reducedMotion);

  return (
    <div className="md:hidden">
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-ivory/70 text-ink shadow-soft transition-all duration-500 ease-editorial hover:-translate-y-px hover:border-accent/25 hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
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
            className="fixed inset-0 z-40 bg-ink/[0.24] backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            transition={createTransition(0.4, reducedMotion)}
          >
            <motion.nav
              animate="visible"
              aria-label="Mobile"
              className="mx-4 mt-20 rounded-editorial border border-ink/10 bg-ivory p-6 shadow-[0_34px_90px_-44px_rgba(42,31,43,0.42)]"
              exit="hidden"
              id="mobile-menu"
              initial="hidden"
              onClick={(event) => event.stopPropagation()}
              transition={createTransition(0.5, reducedMotion)}
              variants={menuVariants}
            >
              <div className="mb-5 border-b border-ink/10 pb-4">
                <p className="font-serif text-lg font-semibold text-ink">{siteConfig.name}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/48">{siteConfig.identityLine}</p>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = normalizePathname(link.href) === activeHref;
                  return (
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-3 text-base font-semibold transition-[background-color,color,transform] duration-500 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
                        isActive
                          ? "bg-accent/[0.07] text-accent"
                          : "text-ink/70 hover:translate-x-0.5 hover:bg-accent/[0.04] hover:text-ink",
                      )}
                      href={link.href}
                      key={link.href}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl border border-ink/10 bg-paper/55 p-4 text-sm text-ink/66">
                <p className="font-semibold text-ink">Direct contact</p>
                <p className="mt-1">
                  <a className="text-ink/80 underline decoration-accent/25 underline-offset-4" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </p>
                <p className="mt-1">
                  <a className="text-ink/80 underline decoration-accent/25 underline-offset-4" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                    LinkedIn
                  </a>
                </p>
                <p className="mt-3 text-xs text-ink/42">{siteConfig.footerLine}</p>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
