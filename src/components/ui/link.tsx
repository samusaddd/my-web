import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

const baseClasses =
  "text-ink/72 underline underline-offset-4 decoration-accent/25 transition-colors duration-300 hover:text-accent hover:decoration-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

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
