import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-ink bg-ink text-ivory shadow-[0_16px_34px_-24px_rgba(28,24,32,0.72)] hover:border-accent hover:bg-accent hover:shadow-[0_20px_44px_-28px_rgba(82,37,95,0.5)]",
  secondary:
    "border border-ink/15 bg-ivory/65 text-ink hover:border-accent/35 hover:bg-white hover:text-accent",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-accent/45 hover:bg-accent/[0.045] hover:text-accent",
  ghost:
    "border border-transparent text-ink/72 hover:border-accent/10 hover:bg-accent/[0.04] hover:text-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm sm:text-base",
};

const baseClasses =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-500 ease-editorial after:content-['→'] after:transition-transform after:duration-500 after:ease-editorial hover:-translate-y-px hover:after:translate-x-1 active:translate-y-0 motion-reduce:transition-none motion-reduce:after:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-60";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      href={href}
      {...props}
    />
  );
}
