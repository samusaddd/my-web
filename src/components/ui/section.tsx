import * as React from "react";

import { cn } from "@/lib/cn";

import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  contained?: boolean;
  containerClassName?: string;
};

export function Section({
  as,
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn("relative py-[clamp(5rem,8vw,7rem)]", className)}
      {...props}
    >
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </Component>
  );
}
