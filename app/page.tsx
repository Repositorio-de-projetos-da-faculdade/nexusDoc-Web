"use client";

import { Topbar } from "@/components/layout/topbar";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentContracts } from "@/components/dashboard/recent-contracts";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { StatusChart } from "@/components/dashboard/status-chart";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useData } from "@/contexts/data-context";
import type { Contract } from "@/types";

function getTotalValue(contracts: Contract[]) {
  return contracts.reduce((sum, c) => sum + c.value, 0);
}

export default function DashboardPage() {
  const { contracts } = useData();
  
  const total = contracts.length;
  const active = contracts.filter((c) => c.status === "active").length;
  const pending = contracts.filter((c) => c.status === "pending").length;
  const expiring = contracts.filter((c) => c.status === "expired").length;
  const totalValue = getTotalValue(contracts);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Dashboard"
        subtitle="Visão geral dos contratos ativos"
        action={
          <Button size="sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Contrato
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total de Contratos"
            value={String(total)}
            delta="+2 este mês"
            deltaType="positive"
            icon="📄"
            accent
          />
          <MetricCard
            label="Contratos Ativos"
            value={String(active)}
            delta={`${total > 0 ? Math.round((active / total) * 100) : 0}% do total`}
            deltaType="positive"
            icon="✅"
          />
          <MetricCard
            label="Pendentes"
            value={String(pending)}
            delta="Aguardando ação"
            deltaType="neutral"
            icon="⏳"
          />
          <MetricCard
            label="Valor Total"
            value={formatCurrency(totalValue)}
            delta="+12% vs. trimestre anterior"
            deltaType="positive"
            icon="💰"
          />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RecentContracts />
          </div>
          <div className="space-y-4">
            <AlertsPanel />
            <StatusChart />
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Ações Rápidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Novo Contrato", icon: "📝", desc: "Criar contrato" },
              { label: "Upload Documento", icon: "📤", desc: "Anexar arquivo" },
              { label: "Gerar Relatório", icon: "📊", desc: "Exportar dados" },
              { label: "Configurar Alerta", icon: "🔔", desc: "Vencimentos" },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-start gap-2 p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] hover:bg-[var(--accent)] transition-all duration-200 cursor-pointer text-left group"
              >
                <span className="text-xl">{action.icon}</span>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {action.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
