import { cn } from "@/lib/utils";
import type { ContractStatus } from "@/types";
import { getStatusVisual } from "@/lib/status-mapper";

interface BadgeProps {
  status: ContractStatus | string;
  className?: string;
}

export function StatusBadge({ status, className }: BadgeProps) {
  const config = getStatusVisual(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.bg,
        config.color,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}


interface GenericBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: GenericBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "default" &&
          "bg-[var(--accent)] text-[var(--accent-foreground)]",
        variant === "outline" &&
          "border border-[var(--border)] text-[var(--muted-foreground)]",
        variant === "secondary" &&
          "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
        className
      )}
    >
      {children}
    </span>
  );
}
