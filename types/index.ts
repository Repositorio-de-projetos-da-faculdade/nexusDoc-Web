export type ContractStatus =
  | "active"
  | "pending"
  | "expired"
  | "draft"
  | "cancelled";

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
