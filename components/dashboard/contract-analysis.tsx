"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { SuspiciousClause, ContractAnalysis } from "@/lib/contract-analysis-data";
import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  DollarSign,
  RefreshCw,
  Lightbulb,
  Sparkles,
} from "lucide-react";

// =====================================================
// Risk Score Gauge
// =====================================================

export function RiskGauge({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s <= 30) return { color: "#10b981", label: "Baixo", bg: "bg-emerald-500/10" };
    if (s <= 60) return { color: "#f59e0b", label: "Moderado", bg: "bg-amber-500/10" };
    return { color: "#ef4444", label: "Alto", bg: "bg-red-500/10" };
  };

  const { color, label, bg } = getColor(score);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
            opacity={0.3}
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">
            de 100
          </span>
        </div>
      </div>
      <div
        className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
          bg
        )}
        style={{ color }}
      >
        {score <= 30 ? (
          <ShieldCheck size={14} />
        ) : score <= 60 ? (
          <ShieldQuestion size={14} />
        ) : (
          <ShieldAlert size={14} />
        )}
        Risco {label}
      </div>
    </div>
  );
}

// =====================================================
// Validity Progress Bar
// =====================================================

export function ValidityProgress({
  percentElapsed,
  daysRemaining,
  startDate,
  endDate,
  status,
}: {
  percentElapsed: number;
  daysRemaining: number;
  startDate: string;
  endDate: string;
  status: string;
}) {
  const getBarColor = () => {
    if (status === "expirado" || daysRemaining === 0) return "bg-red-500";
    if (percentElapsed > 80) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const formatDisplayDate = (d: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(d));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[var(--muted-foreground)]">{formatDisplayDate(startDate)}</span>
        <span className="text-[var(--muted-foreground)]">{formatDisplayDate(endDate)}</span>
      </div>
      <div className="relative h-3 bg-[var(--muted)] rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            getBarColor()
          )}
          style={{ width: `${Math.min(percentElapsed, 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--muted-foreground)]">
          {percentElapsed}% decorrido
        </span>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-[var(--muted-foreground)]" />
          <span
            className={cn(
              "text-xs font-semibold",
              daysRemaining === 0
                ? "text-red-500"
                : daysRemaining < 60
                  ? "text-amber-500"
                  : "text-emerald-500"
            )}
          >
            {daysRemaining > 0 ? `${daysRemaining} dias restantes` : "Expirado"}
          </span>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// Suspicious Clause Card
// =====================================================

export function SuspiciousClauseCard({ clause }: { clause: SuspiciousClause }) {
  const severityConfig = {
    alta: {
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      icon: <AlertTriangle size={14} />,
      label: "Alta",
    },
    média: {
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      icon: <ShieldQuestion size={14} />,
      label: "Média",
    },
    baixa: {
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: <ShieldCheck size={14} />,
      label: "Baixa",
    },
  };

  const config = severityConfig[clause.severity];

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
        config.border,
        config.bg
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5 shrink-0", config.color)}>{config.icon}</div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-[var(--foreground)]">
              {clause.clause}
            </h4>
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                config.color,
                config.bg
              )}
            >
              {config.label}
            </span>
          </div>
          <p className="text-xs text-[var(--muted-foreground)] italic leading-relaxed border-l-2 border-[var(--border)] pl-3">
            &ldquo;{clause.excerpt}&rdquo;
          </p>
          <div className="flex items-start gap-2 mt-2 p-2.5 rounded-md bg-[var(--card)] border border-[var(--border)]">
            <Lightbulb
              size={14}
              className="shrink-0 mt-0.5 text-[var(--primary)]"
            />
            <p className="text-xs text-[var(--foreground)] leading-relaxed">
              {clause.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// Key Metric Card
// =====================================================

export function AnalysisMetricCard({
  label,
  value,
  icon,
  color,
  subtitle,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
            {label}
          </p>
          <p className="text-lg font-bold text-[var(--foreground)] truncate">
            {value}
          </p>
          {subtitle && (
            <p className="text-[10px] text-[var(--muted-foreground)]">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// AI Summary Card
// =====================================================

export function AISummaryCard({
  summary,
  recommendations,
}: {
  summary: string;
  recommendations: string[];
}) {
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Análise da IA
            </h3>
            <p className="text-[10px] text-[var(--muted-foreground)]">
              Gerada automaticamente por NexusDoc AI
            </p>
          </div>
        </div>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Recommendations */}
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[var(--primary)]" />
          Recomendações
        </h3>
        <ul className="space-y-2">
          {recommendations.map((rec, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm text-[var(--foreground)]"
            >
              <span className="h-5 w-5 rounded-full bg-[var(--accent)] text-[var(--primary)] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// =====================================================
// Contract Info Grid
// =====================================================

export function ContractInfoGrid({
  contract,
  categoryName,
}: {
  contract: {
    owner: string;
    counterparty: string;
    tags: string[];
    startDate: string;
    endDate: string;
    lastUpdated: string;
  };
  categoryName: string;
}) {
  const items = [
    { label: "Responsável", value: contract.owner },
    { label: "Contraparte", value: contract.counterparty },
    { label: "Categoria", value: categoryName },
    {
      label: "Última Atualização",
      value: new Intl.DateTimeFormat("pt-BR").format(
        new Date(contract.lastUpdated)
      ),
    },
  ];

  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <h3 className="text-sm font-bold text-[var(--foreground)] mb-4">
        Detalhes Gerais
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
              {item.label}
            </p>
            <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      {contract.tags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold mb-2">
            Tags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {contract.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
