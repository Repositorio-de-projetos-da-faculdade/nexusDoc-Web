import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  accent?: boolean;
}

export function MetricCard({
  label,
  value,
  delta,
  deltaType = "neutral",
  icon,
  accent,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        accent &&
          "border-[var(--primary)] bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] text-white"
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p
              className={cn(
                "text-xs font-medium mb-1",
                accent
                  ? "text-white/70"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              {label}
            </p>
            <p
              className={cn(
                "text-2xl font-bold tracking-tight",
                accent ? "text-white" : "text-[var(--foreground)]"
              )}
            >
              {value}
            </p>
            {delta && (
              <p
                className={cn(
                  "text-xs mt-1 font-medium",
                  accent
                    ? "text-white/80"
                    : deltaType === "positive"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : deltaType === "negative"
                    ? "text-red-500"
                    : "text-[var(--muted-foreground)]"
                )}
              >
                {delta}
              </p>
            )}
          </div>
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center text-lg shrink-0",
              accent
                ? "bg-white/20"
                : "bg-[var(--accent)]"
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
