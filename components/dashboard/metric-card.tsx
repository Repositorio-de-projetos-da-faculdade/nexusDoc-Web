"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
    >
      <Card
        className={cn(
          "overflow-hidden relative transition-all duration-200 border",
          accent
            ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
            : "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]/40 shadow-sm"
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider mb-1.5",
                  accent
                    ? "text-[var(--primary-foreground)]/80"
                    : "text-[var(--muted-foreground)]"
                )}
              >
                {label}
              </p>
              <p
                className={cn(
                  "text-3xl font-bold tracking-tight mb-2",
                  accent ? "text-[var(--primary-foreground)]" : "text-[var(--foreground)]"
                )}
              >
                {value}
              </p>
              {delta && (
                <div
                  className={cn(
                    "inline-flex items-center text-xs font-semibold mt-1",
                    accent
                      ? "text-[var(--primary-foreground)]/90"
                      : deltaType === "positive"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : deltaType === "negative"
                      ? "text-red-600 dark:text-red-400"
                      : "text-[var(--muted-foreground)]"
                  )}
                >
                  {delta}
                </div>
              )}
            </div>
            <div
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                accent
                  ? "bg-[var(--primary-foreground)]/10 text-[var(--primary-foreground)]"
                  : "bg-[var(--accent)] text-[var(--primary)]"
              )}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
