import { cn } from "@/lib/cn";

type StampBadgeProps = {
  children: React.ReactNode;
  tone?: "red" | "ink" | "ochre";
  className?: string;
};

export default function StampBadge({ children, tone = "red", className }: StampBadgeProps) {
  const toneClass =
    tone === "red" ? "border-stamp text-stamp" : tone === "ochre" ? "border-ochre text-ochre" : "border-ink text-ink";

  return (
    <span
      className={cn(
        "inline-flex rotate-[-2deg] items-center border-2 px-3 py-1 font-display text-xl font-black uppercase leading-none",
        toneClass,
        className
      )}
    >
      {children}
    </span>
  );
}
