"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useData } from "@/contexts/data-context";
import Link from "next/link";

export function RecentContracts() {
  const { contracts, categories } = useData();
  const recent = contracts.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Contratos Recentes</CardTitle>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Últimas atualizações
            </p>
          </div>
          <Link href="/contratos">
            <Button variant="ghost" size="sm">
              Ver todos →
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {recent.map((contract) => {
            const catName = categories.find((c) => c.id === contract.categoryId)?.name || "—";
            return (
              <div
                key={contract.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--muted)] transition-colors duration-150 cursor-pointer group"
              >
                {/* Category icon */}
                <div className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[var(--primary)]">
                    {catName.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">
                    {contract.title}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">
                    {contract.counterparty}
                  </p>
                </div>

                {/* Status */}
                <StatusBadge status={contract.status} className="shrink-0 hidden sm:inline-flex" />

                {/* Value */}
                <p className="text-sm font-semibold text-[var(--foreground)] shrink-0 hidden md:block">
                  {formatCurrency(contract.value)}
                </p>

                {/* Date */}
                <p className="text-xs text-[var(--muted-foreground)] shrink-0 hidden lg:block">
                  {formatDate(contract.endDate)}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
