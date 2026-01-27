import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-zinc-950 shadow-[0_12px_40px_-16px_rgba(255,255,255,0.65)] hover:bg-zinc-100 hover:shadow-[0_22px_60px_-28px_rgba(255,255,255,0.7)]",
  secondary:
    "border border-white/10 bg-white/[0.06] text-white hover:border-white/20 hover:bg-white/[0.11] hover:shadow-[0_22px_60px_-40px_rgba(125,211,252,0.45)]",
  outline:
    "border border-white/15 text-white hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_22px_60px_-42px_rgba(125,211,252,0.38)]",
  ghost:
    "text-white/80 hover:text-white hover:bg-white/[0.06] hover:shadow-[0_18px_50px_-40px_rgba(125,211,252,0.4)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm sm:text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] active:translate-y-0 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-60";

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
