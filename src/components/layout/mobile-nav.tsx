"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { navLinks, normalizePathname, siteConfig } from "@/lib/site";

export function MobileNav() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const [isOpen, setIsOpen] = useState(false);
  const current = pathname?.startsWith("/blog/") ? "/blog" : normalizePathname(pathname);
  function close() {
    dialog.current?.close();
  }
  function restore() {
    document.body.style.overflow = previousOverflow.current;
    setIsOpen(false);
    trigger.current?.focus();
  }
  function open() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    closer.current?.focus();
  }
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab" || event.ctrlKey || event.altKey || event.metaKey) return;
    const controls = dialog.current?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
    );
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  useEffect(() => {
    if (dialog.current?.open) close();
  }, [pathname]);
  useEffect(
    () => () => {
      document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  useEffect(() => {
    const desktop = matchMedia("(min-width: 900px)");
    const changed = () => {
      if (desktop.matches && dialog.current?.open) close();
    };
    desktop.addEventListener("change", changed);
    return () => desktop.removeEventListener("change", changed);
  }, []);
  const links = [{ href: "/", label: "Home" }, ...navLinks];
  return (
    <div className="mobile-navigation">
      <button
        className="mobile-trigger"
        ref={trigger}
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="site-menu"
      >
        Menu <span className="menu-mark" aria-hidden="true" />
      </button>
      <dialog
        id="site-menu"
        className="mobile-dialog"
        ref={dialog}
        aria-label="Site navigation"
        onClose={restore}
        onKeyDown={containFocus}
      >
        <div className="mobile-dialog-inner">
          <div className="mobile-dialog-top">
            <span>Samir Seddiqi.</span>
            <button className="mobile-close" ref={closer} onClick={close}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <p className="mobile-nav-label">The pages / A life in progress</p>
          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <Link
                aria-current={current === link.href ? "page" : undefined}
                href={link.href}
                key={link.href}
                onClick={close}
              >
                <span aria-hidden="true">{String(index).padStart(2, "0")}</span>
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <a className="mobile-email" href={"mailto:" + siteConfig.email}>
            {siteConfig.email} ↗
          </a>
        </div>
      </dialog>
      <noscript>
        <details className="mobile-fallback">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </noscript>
    </div>
  );
}
