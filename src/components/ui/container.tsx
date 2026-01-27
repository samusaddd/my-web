import * as React from "react";

import { cn } from "@/lib/cn";

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
};

export function Container({ as, className, children, ...props }: ContainerProps) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
