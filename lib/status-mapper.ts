import type { ContractStatus } from "@/types";

/**
 * Mapeamento de status (backend + legado) para label/cores PT-BR usados
 * pela UI. Centraliza o que antes vivia espalhado em `STATUS_CONFIG` e em
 * cores hardcoded de componentes (badge, gráficos).
 */

export interface StatusVisual {
  label: string;
  /** Classe Tailwind para texto */
  color: string;
  /** Classe Tailwind para background */
  bg: string;
  /** Classe Tailwind para o dot indicador */
  dot: string;
  /** Classe Tailwind sólida para barras de gráfico */
  bar: string;
}

const STATUS_VISUAL: Record<string, StatusVisual> = {
  // Estados do backend (snake_case)
  processing: {
    label: "Em processamento",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
  },
  pending_legal: {
    label: "Aguardando jurídico",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  pending_finance: {
    label: "Aguardando financeiro",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
  },
  active: {
    label: "Ativo",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  expiring: {
    label: "Próximo do vencimento",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    dot: "bg-orange-500",
    bar: "bg-orange-500",
  },
  expired: {
    label: "Expirado",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    dot: "bg-red-500",
    bar: "bg-red-400",
  },
  in_review: {
    label: "Em revisão",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    dot: "bg-purple-500",
    bar: "bg-purple-500",
  },
  // Estados legados (mocks)
  pending: {
    label: "Pendente",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    dot: "bg-amber-500",
    bar: "bg-amber-400",
  },
  draft: {
    label: "Rascunho",
    color: "text-gray-500 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
    dot: "bg-gray-400",
    bar: "bg-gray-300 dark:bg-gray-600",
  },
  cancelled: {
    label: "Cancelado",
    color: "text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
    dot: "bg-gray-300",
    bar: "bg-gray-200",
  },
};

const FALLBACK: StatusVisual = {
  label: "Desconhecido",
  color: "text-gray-500 dark:text-gray-400",
  bg: "bg-gray-100 dark:bg-gray-800",
  dot: "bg-gray-400",
  bar: "bg-gray-300",
};

/** Normaliza um status arbitrário (UPPER/lower/snake) para a chave canônica. */
export function normalizeStatus(status: ContractStatus | string | null | undefined): string {
  if (!status) return "draft";
  return String(status).toLowerCase();
}

export function getStatusVisual(status: ContractStatus | string | null | undefined): StatusVisual {
  const key = normalizeStatus(status);
  return STATUS_VISUAL[key] ?? FALLBACK;
}

export function getStatusLabel(status: ContractStatus | string | null | undefined): string {
  return getStatusVisual(status).label;
}

export function getStatusColor(status: ContractStatus | string | null | undefined): string {
  return getStatusVisual(status).color;
}
