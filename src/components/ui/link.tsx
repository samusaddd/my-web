import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

const baseClasses =
  "text-white/80 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function TextLink({ href, className, children, ...props }: TextLinkProps) {
  const isHttp = href.startsWith("http");
  const isMailto = href.startsWith("mailto:");
  const isTel = href.startsWith("tel:");

  if (isHttp || isMailto || isTel) {
    const target = isHttp ? props.target ?? "_blank" : props.target;
    const rel = isHttp ? props.rel ?? "noreferrer" : props.rel;
    return (
      <a
        className={cn(baseClasses, className)}
        href={href}
        rel={rel}
        target={target}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={cn(baseClasses, className)} href={href} {...props}>
      {children}
    </Link>
  );
}
