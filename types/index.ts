/**
 * Estados de contrato vindos do backend (Prisma enum `ContractStatus`),
 * em snake_case lowercase. Veja `src/types/status.ts` no backend.
 */
export type BackendContractStatus =
  | "processing"
  | "pending_legal"
  | "pending_finance"
  | "active"
  | "expiring"
  | "expired"
  | "in_review";

/**
 * Estados legados ainda usados por mocks/UI. Mantidos por compatibilidade
 * durante a migração — sempre prefira `BackendContractStatus` em código novo.
 */
export type LegacyContractStatus =
  | "active"
  | "pending"
  | "expired"
  | "draft"
  | "cancelled";

export type ContractStatus = BackendContractStatus | LegacyContractStatus;

export interface Contract {
  id: string;
  title: string;
  counterparty: string;
  status: ContractStatus;
  value: number;
  startDate: string;
  endDate: string;
  categoryId: string;
  owner: string;
  tags: string[];
  lastUpdated: string;
  templateId?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface MetricCard {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  contractId?: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
}

export interface Party {
  id: string;
  name: string;
  type: "Cliente" | "Fornecedor" | "Parceiro" | "Interno";
  contact: string;
  email: string;
  status: "Ativo" | "Inativo";
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: "warning" | "info" | "critical";
}

export interface Report {
  id: string;
  title: string;
  date: string;
  generatedBy: string;
  status: "Pronto" | "Gerando" | "Erro";
}
