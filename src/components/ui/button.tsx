import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_12px_40px_-16px_rgba(255,255,255,0.65)]",
  secondary:
    "border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]",
  outline: "border border-white/15 text-white hover:bg-white/[0.06]",
  ghost: "text-white/80 hover:text-white hover:bg-white/[0.06]",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm sm:text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-60";

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
