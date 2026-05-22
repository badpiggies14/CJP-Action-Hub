import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PosterCardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "section";
} & HTMLAttributes<HTMLElement>;

export default function PosterCard({ children, className, as = "article", ...props }: PosterCardProps) {
  const Component = as;

  return (
    <Component className={cn("poster-card paper-edge relative overflow-hidden p-4 sm:p-5", className)} {...props}>
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
