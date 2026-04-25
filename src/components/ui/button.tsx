import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-white/90 bg-white text-zinc-950 shadow-[0_16px_46px_-22px_rgba(255,255,255,0.72)] hover:bg-zinc-100 hover:shadow-[0_26px_70px_-34px_rgba(255,255,255,0.75)]",
  secondary:
    "border border-white/15 bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/25 hover:bg-white/[0.12] hover:shadow-[0_24px_70px_-44px_rgba(125,211,252,0.52)]",
  outline:
    "border border-white/20 text-white hover:border-white/30 hover:bg-white/[0.075] hover:shadow-[0_22px_60px_-42px_rgba(245,158,11,0.26)]",
  ghost:
    "text-white/78 hover:text-white hover:bg-white/[0.06] hover:shadow-[0_18px_50px_-40px_rgba(125,211,252,0.4)]",
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
