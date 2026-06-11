"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { useAuth } from "@/contexts/auth-context";
import { contractsService } from "@/lib/services/contracts.service";
import { ContractDetail } from "@/types/api";
import { toast } from "sonner";
import { Topbar } from "@/components/layout/topbar";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  RiskGauge,
  ValidityProgress,
  SuspiciousClauseCard,
  AnalysisMetricCard,
  AISummaryCard,
  ContractInfoGrid,
} from "@/components/dashboard/contract-analysis";
import {
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
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

export default function ContratoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { categories } = useCategories();
  const { user } = useAuth();
  
  const [contractDetail, setContractDetail] = useState<ContractDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    async function loadContract() {
      try {
        setIsLoading(true);
        const res = await contractsService.getContractById(id);
        if (res.ok) {
          setContractDetail(res.data);
        }
      } catch (err) {
        console.error("Erro ao buscar contrato:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadContract();
  }, [id]);

  const contract = useMemo(() => {
    if (!contractDetail) return null;
    
    const counterpartyObj = contractDetail.extraction.parties?.find(p => p.type === 'CONTRACTOR' || p.type === 'HIRED');
    const counterparty = counterpartyObj ? counterpartyObj.name : "Não identificada";

    return {
      id: contractDetail.contract.id,
      categoryId: "1", // Mapear adequadamente se vier do backend
      title: contractDetail.contract.title,
      status: contractDetail.contract.status as any,
      counterparty,
      value: contractDetail.extraction.summary?.valor?.total ? parseFloat(contractDetail.extraction.summary.valor.total) : 0,
      startDate: contractDetail.extraction.dates?.start_date ? new Date(contractDetail.extraction.dates.start_date).toISOString() : new Date().toISOString(),
      endDate: contractDetail.extraction.dates?.end_date ? new Date(contractDetail.extraction.dates.end_date).toISOString() : new Date(Date.now() + 31536000000).toISOString(),
      fileUrl: contractDetail.contract.file_url,
      owner: "Gestão de Contratos",
      tags: ["Importante", "Análise Realizada"],
      lastUpdated: new Date(contractDetail.contract.updated_at || contractDetail.contract.created_at || Date.now()).toISOString(),
    };
  }, [contractDetail]);

  const analysis = useMemo(() => {
    if (!contractDetail) return null;
    
    // O backend valida `summary` contra `GeminiExtractionSchema`. Pode vir null
    // ou parcial — defendemos contra qualquer campo faltante na UI.
    const json = (contractDetail.extraction.summary ?? {}) as Record<string, any>;
    
    // Calcula vigência básica
    const start = contractDetail.extraction.dates?.start_date ? new Date(contractDetail.extraction.dates.start_date).getTime() : Date.now();
    const end = contractDetail.extraction.dates?.end_date ? new Date(contractDetail.extraction.dates.end_date).getTime() : Date.now() + 31536000000;
    const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const elapsedDays = Math.max(0, Math.ceil((Date.now() - start) / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.max(0, totalDays - elapsedDays);
    const percentElapsed = Math.min(100, Math.round((elapsedDays / totalDays) * 100));
    
    const validityStatus = percentElapsed >= 100 ? "expirado" : (daysRemaining < 30 ? "próximo_vencimento" : "vigente");

    // Formata cláusulas suspensas a partir dos alertas JSON
    const suspClauses: any[] = [];
    if (json.alertas && Array.isArray(json.alertas)) {
      json.alertas.forEach((alerta: string, idx: number) => {
        suspClauses.push({
          id: `alerta-${idx}`,
          clause: "Ponto de Atenção",
          excerpt: alerta,
          severity: "alta",
          recommendation: "Revisão sugerida com base na extração",
        });
      });
    }

    // Risco: base 15, +8 por alerta (saturando em +50), +10 por tipo de multa.
    // Escala propositalmente côncava — 100% só em casos extremos, não no contrato típico.
    const alertCount = Array.isArray(json.alertas) ? json.alertas.length : 0;
    const penaltyCount =
      (json.penalidades?.multaRescisao ? 1 : 0) + (json.penalidades?.multaInadimplemento ? 1 : 0);
    const riskScore = Math.min(95, 15 + Math.min(50, alertCount * 8) + penaltyCount * 10);

    // Clause Breakdown for Pie Chart
    const breakdownMap: Record<string, number> = {};
    contractDetail.extraction.clauses?.forEach(c => {
      const t = c.type === 'PENALTY' ? 'Penalidades' : c.type === 'OBLIGATION' ? 'Obrigações' : c.type === 'TERMINATION' ? 'Rescisão' : 'Gerais';
      breakdownMap[t] = (breakdownMap[t] || 0) + 1;
    });
    const clauseBreakdown = Object.entries(breakdownMap).map(([type, count]) => ({
      type, count, color: type === 'Penalidades' ? '#f59e0b' : type === 'Rescisão' ? '#ef4444' : '#3b82f6'
    }));

    return {
      contractId: contractDetail.contract.id,
      riskScore,
      validityStatus,
      daysRemaining,
      totalDays,
      percentElapsed,
      aiSummary: json.objeto || json.titulo || "O contrato foi processado e as informações básicas foram extraídas.",
      suspiciousClauses: suspClauses,
      clauseBreakdown,
      recommendations: json.clausulasRelevantes || [],
      keyMetrics: {
        totalValue: json.valor?.total ? parseFloat(json.valor.total) : 0,
        currency: json.valor?.moeda || "BRL",
        paymentMethod: json.valor?.formaPagamento || "Não especificado",
        readjustment: json.valor?.reajuste || "Não definido",
        penalties: json.penalidades?.multaInadimplemento || json.penalidades?.multaRescisao || "Nenhuma especificada",
      },
    };
  }, [contractDetail, id]);

  const handleDecision = async (decision: 'APPROVED' | 'REJECTED') => {
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }
    
    if (decision === 'APPROVED') setIsApproving(true);
    else setIsRejecting(true);

    try {
      await contractsService.approveContract(id, {
        user_id: (user as any).id || user.email, 
        decision,
      });
      toast.success(decision === 'APPROVED' ? "Contrato aprovado com sucesso!" : "Contrato rejeitado!");
    } catch (err: any) {
      toast.error("Falha ao registrar decisão", { description: err.message });
    } finally {
      setIsApproving(false);
      setIsRejecting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <Topbar title="Carregando..." />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-[var(--muted-foreground)]" size={32} />
        </div>
      </div>
    );
  }

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
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/50"
              disabled={isApproving || isRejecting}
              onClick={() => handleDecision('REJECTED')}
            >
              {isRejecting ? <Loader2 size={14} className="mr-2 animate-spin"/> : <XCircle size={14} className="mr-2" />}
              Rejeitar
            </Button>
            <Button 
              size="sm" 
              className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              disabled={isApproving || isRejecting}
              onClick={() => handleDecision('APPROVED')}
            >
              {isApproving ? <Loader2 size={14} className="mr-2 animate-spin"/> : <CheckCircle2 size={14} className="mr-2" />}
              Aprovar
            </Button>
            <div className="w-px h-6 bg-[var(--border)] mx-1"></div>
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
                    value={analysis.keyMetrics.totalValue ? formatCurrency(analysis.keyMetrics.totalValue) : "Não especificado"}
                    icon={<DollarSign size={18} />}
                    color="#34d5ba"
                  />
                  <AnalysisMetricCard
                    label="Forma Pagto"
                    value={analysis.keyMetrics.paymentMethod}
                    icon={<TrendingUp size={18} />}
                    color="#8b5cf6"
                    subtitle={`Moeda: ${analysis.keyMetrics.currency}`}
                  />
                  <AnalysisMetricCard
                    label="Reajuste"
                    value={analysis.keyMetrics.readjustment}
                    icon={<RefreshCw size={18} />}
                    color="#3b82f6"
                  />
                  <AnalysisMetricCard
                    label="Multa"
                    value={analysis.keyMetrics.penalties}
                    icon={<AlertTriangle size={18} />}
                    color="#ef4444"
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
