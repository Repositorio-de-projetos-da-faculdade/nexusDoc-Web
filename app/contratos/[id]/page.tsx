"use client";

import { use } from "react";
import Link from "next/link";
import { useData } from "@/contexts/data-context";
import { Topbar } from "@/components/layout/topbar";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { MOCK_CONTRACT_ANALYSES } from "@/lib/contract-analysis-data";
import {
  RiskGauge,
  ValidityProgress,
  SuspiciousClauseCard,
  AnalysisMetricCard,
  AISummaryCard,
  ContractInfoGrid,
} from "@/components/dashboard/contract-analysis";
import {
  BillingChart,
  ExpenseBarChart,
  ClausePieChart,
} from "@/components/dashboard/contract-charts";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react";

export default function ContratoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { contracts, categories } = useData();

  const contract = contracts.find((c) => c.id === id);
  const analysis = MOCK_CONTRACT_ANALYSES[id];

  if (!contract) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <Topbar title="Contrato não encontrado" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-[var(--muted)] flex items-center justify-center mx-auto">
              <FileText size={24} className="text-[var(--muted-foreground)]" />
            </div>
            <p className="text-[var(--muted-foreground)]">
              Contrato #{id} não foi encontrado.
            </p>
            <Link href="/contratos">
              <Button variant="outline" size="sm">
                <ArrowLeft size={14} className="mr-2" />
                Voltar para contratos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryName =
    categories.find((c) => c.id === contract.categoryId)?.name || "—";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title={contract.title}
        subtitle={`Relatório de análise do contrato #${contract.id}`}
        action={
          <div className="flex items-center gap-2">
            <Link href="/contratos">
              <Button variant="outline" size="sm">
                <ArrowLeft size={14} className="mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
          {/* Header: Contract Identity + Risk Score */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6">
            {/* Left: Key Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <StatusBadge status={contract.status} />
                <span className="text-sm text-[var(--muted-foreground)]">
                  {contract.counterparty}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] font-medium">
                  {categoryName}
                </span>
              </div>

              {analysis && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <AnalysisMetricCard
                    label="Valor Total"
                    value={formatCurrency(contract.value)}
                    icon={<DollarSign size={18} />}
                    color="#34d5ba"
                  />
                  <AnalysisMetricCard
                    label="Pago até hoje"
                    value={formatCurrency(analysis.keyMetrics.totalPaid)}
                    icon={<TrendingUp size={18} />}
                    color="#8b5cf6"
                    subtitle={`Média: ${formatCurrency(analysis.keyMetrics.avgMonthly)}/mês`}
                  />
                  <AnalysisMetricCard
                    label="Saldo Restante"
                    value={formatCurrency(analysis.keyMetrics.totalRemaining)}
                    icon={<Clock size={18} />}
                    color="#3b82f6"
                  />
                  <AnalysisMetricCard
                    label="Prob. Renovação"
                    value={`${analysis.keyMetrics.renewalProbability}%`}
                    icon={<RefreshCw size={18} />}
                    color={
                      analysis.keyMetrics.renewalProbability >= 70
                        ? "#10b981"
                        : analysis.keyMetrics.renewalProbability >= 40
                          ? "#f59e0b"
                          : "#ef4444"
                    }
                  />
                </div>
              )}
            </div>

            {/* Right: Risk Gauge */}
            {analysis && (
              <div className="flex items-center justify-center p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <RiskGauge score={analysis.riskScore} />
              </div>
            )}
          </div>

          {analysis ? (
            <>
              {/* Validity Progress */}
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <h3 className="text-sm font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-[var(--primary)]" />
                  Vigência Contratual
                </h3>
                <ValidityProgress
                  percentElapsed={analysis.percentElapsed}
                  daysRemaining={analysis.daysRemaining}
                  startDate={contract.startDate}
                  endDate={contract.endDate}
                  status={analysis.validityStatus}
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BillingChart data={analysis.billingHistory} />
                <ExpenseBarChart data={analysis.expenseBreakdown} />
              </div>

              {/* Suspicious Clauses + Pie Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                {/* Clauses */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-500" />
                    Cláusulas Suspeitas
                    {analysis.suspiciousClauses.length > 0 && (
                      <span className="text-[10px] bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">
                        {analysis.suspiciousClauses.length}
                      </span>
                    )}
                  </h3>
                  {analysis.suspiciousClauses.length === 0 ? (
                    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Nenhuma cláusula suspeita identificada. ✅
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {analysis.suspiciousClauses.map((clause) => (
                        <SuspiciousClauseCard key={clause.id} clause={clause} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Pie Chart */}
                <ClausePieChart data={analysis.clauseBreakdown} />
              </div>

              {/* AI Summary + Recommendations */}
              <AISummaryCard
                summary={analysis.aiSummary}
                recommendations={analysis.recommendations}
              />

              {/* Contract Details Grid */}
              <ContractInfoGrid
                contract={contract}
                categoryName={categoryName}
              />
            </>
          ) : (
            <div className="p-12 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
              <div className="h-16 w-16 rounded-full bg-[var(--muted)] flex items-center justify-center mx-auto mb-4">
                <FileText
                  size={24}
                  className="text-[var(--muted-foreground)]"
                />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
                Análise não disponível
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                A análise de IA para este contrato ainda não foi gerada.
                Solicite uma análise para visualizar os dados completos.
              </p>
              <Button size="sm" className="mt-4">
                Solicitar Análise
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
