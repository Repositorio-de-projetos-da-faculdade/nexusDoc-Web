"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { STATUS_CONFIG } from "@/lib/mock-data";
import { useData } from "@/contexts/data-context";
import type { ContractStatus } from "@/types";

export function StatusChart() {
  const { contracts } = useData();
  const total = contracts.length;
  
  const counts = contracts.reduce<Record<string, number>>((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  const statuses: ContractStatus[] = ["active", "pending", "draft", "expired"];

  const BAR_COLORS: Record<ContractStatus, string> = {
    active: "bg-emerald-500",
    pending: "bg-amber-400",
    draft: "bg-gray-300 dark:bg-gray-600",
    expired: "bg-red-400",
    cancelled: "bg-gray-200",
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Distribuição por Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {statuses.map((status) => {
          const count = counts[status] || 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const config = STATUS_CONFIG[status];

          return (
            <div key={status}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium ${config.color}`}>
                  {config.label}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {count} ({pct}%)
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${BAR_COLORS[status]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}

        <div className="pt-2 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--muted-foreground)]">
            Total:{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {total} contratos
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
