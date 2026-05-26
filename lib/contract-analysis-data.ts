// ============================================================
// Contract AI Analysis — Tipos do payload retornado pelo backend
// (Gemini extraction + métricas calculadas).
// O const MOCK_CONTRACT_ANALYSES foi removido — dados reais vêm
// de `GET /contracts/:id` (ver `ContractDetailResponse`).
// ============================================================

export interface SuspiciousClause {
  id: string;
  clause: string;
  excerpt: string;
  severity: "alta" | "média" | "baixa";
  recommendation: string;
}

export interface BillingEntry {
  month: string;
  faturado: number;
  previsto: number;
}

export interface ExpenseCategory {
  category: string;
  valor: number;
}

export interface ClauseType {
  type: string;
  count: number;
  color: string;
}

export interface ContractAnalysis {
  contractId: string;
  riskScore: number;
  validityStatus: "vigente" | "próximo_vencimento" | "expirado" | "pendente";
  daysRemaining: number;
  totalDays: number;
  percentElapsed: number;
  aiSummary: string;
  suspiciousClauses: SuspiciousClause[];
  billingHistory: BillingEntry[];
  expenseBreakdown: ExpenseCategory[];
  clauseBreakdown: ClauseType[];
  recommendations: string[];
  keyMetrics: {
    totalPaid: number;
    totalRemaining: number;
    avgMonthly: number;
    renewalProbability: number;
  };
}
