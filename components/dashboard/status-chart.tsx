"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getStatusVisual, normalizeStatus } from "@/lib/status-mapper";
import { useContracts } from "@/hooks/use-contracts";
import type { ContractStatus } from "@/types";

export function StatusChart() {
  const { contracts } = useContracts();
  const total = contracts.length;

  const counts = contracts.reduce<Record<string, number>>((acc, c) => {
    const key = normalizeStatus(c.status);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const statuses: ContractStatus[] = ["active", "pending", "draft", "expired"];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Distribuição por Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {statuses.map((status) => {
          const key = normalizeStatus(status);
          const count = counts[key] || 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const config = getStatusVisual(status);

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
                  className={`h-full rounded-full transition-all duration-500 ${config.bar}`}
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
