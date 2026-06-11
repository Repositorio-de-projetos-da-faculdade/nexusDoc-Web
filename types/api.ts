export interface Workspace {
  id: string;
  name: string;
  role: 'ADMIN' | 'LEGAL' | 'FINANCE' | 'VIEWER' | string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  workspaces: Workspace[];
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
  workspace_name: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
  workspaceId: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface InviteMemberRequest {
  email: string;
  role: 'ADMIN' | 'LEGAL' | 'FINANCE' | 'VIEWER';
}

export interface ContractApproveRequest {
  user_id: string;
  decision: 'APPROVED' | 'REJECTED';
  comment?: string;
}

export interface ContractApproveResponse {
  ok: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
}

export interface ContractSearchResult {
  contract_id: string;
  title: string;
  status: string;
  similarity: number;
  snippet: string;
}

export interface ContractSearchResponse {
  ok: boolean;
  query: string;
  total: number;
  results: ContractSearchResult[];
}

export interface ContractListResult {
  contract_id: string;
  title: string;
  /** Enum bruto do backend (Prisma `ContractStatus`, ex: `ACTIVE`). */
  status: string;
  /** Versão snake_case lowercase pronta para `getStatusVisual`. */
  status_display?: string;
  file_url: string;
  /** Valor extraído pela IA (ExtractedData.value). Null se não extraído. */
  value?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  /** Nome da parte contratada (ou primeira party do contrato). */
  counterparty?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContractListResponse {
  ok: boolean;
  total: number;
  page: number;
  limit: number;
  results: ContractListResult[];
}


export interface ContractVersion {
  id: string;
  contract_id: string;
  file_url: string;
  version_num: number;
  created_at: string;
}

export interface ContractVersionsResponse {
  ok: boolean;
  data: ContractVersion[];
}

export interface ContractUploadResponse {
  ok: boolean;
  data: {
    contract: Record<string, unknown>;
    extraction: Record<string, unknown>;
  };
}

export interface InviteMemberResponse {
  message: string;
  token: string;
}

export interface UpdateMemberRoleRequest {
  role: 'ADMIN' | 'LEGAL' | 'FINANCE' | 'VIEWER';
}

export interface ContractDetailData {
  id: string;
  title: string;
  /** Enum bruto do backend (Prisma `ContractStatus`, ex: `ACTIVE`). */
  status: string;
  /** Versão snake_case lowercase pronta para `getStatusVisual`. */
  status_display?: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

import type { GeminiExtraction } from './gemini';

export interface ContractExtraction {
  parties: {
    id: string;
    contract_id: string;
    name: string;
    type: 'CONTRACTOR' | 'HIRED' | string;
    /** Versão lowercase do `type`, populada pelo backend (`mapPartyTypeToUi`). */
    type_display?: 'contractor' | 'hired' | string;
  }[];
  clauses: {
    id: string;
    contract_id: string;
    type: 'OBLIGATION' | 'PENALTY' | 'TERMINATION' | 'GENERAL' | string;
    content: string;
  }[];
  risks: {
    type: string;
    date: string;
    description: string;
  }[];
  dates: {
    start_date: string | null;
    end_date: string | null;
  };
  /**
   * Resposta do Gemini validada pelo backend (`GeminiExtractionSchema`).
   * Pode ser `null` se a extração falhou ou se o documento não era
   * contrato. Pode ser parcial se o backend logou warnings (drift de
   * schema) — sempre defenda contra campos faltantes na UI.
   */
  summary: GeminiExtraction | null;
}

export interface ContractDetail {
  contract: ContractDetailData;
  extraction: ContractExtraction;
}

export interface ContractDetailResponse {
  ok: boolean;
  data: ContractDetail;
}

// ===== Categories =====

export interface CategoryResponse {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  contracts_count: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryListResponse {
  ok: boolean;
  total: number;
  results: CategoryResponse[];
}

export interface CategoryMutationResponse {
  ok: boolean;
  data: CategoryResponse;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
}

export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;

// ===== Templates =====

export interface TemplateResponse {
  id: string;
  workspace_id?: string;
  name: string;
  description: string | null;
  body?: string;
  variables: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateListResponse {
  ok: boolean;
  total: number;
  page: number;
  limit: number;
  results: TemplateResponse[];
}

export interface TemplateDetailResponse {
  ok: boolean;
  data: TemplateResponse;
}

export interface CreateTemplateRequest {
  name: string;
  description?: string | null;
  body: string;
  variables?: string[];
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string | null;
  body?: string;
  variables?: string[];
}

// ==========================================
// PARTIES (workspace-level)
// ==========================================

export type PartyKind = 'CLIENT' | 'SUPPLIER' | 'PARTNER' | 'INTERNAL';
export type PartyStatusBackend = 'ACTIVE' | 'INACTIVE';

export interface PartyResponse {
  id: string;
  workspace_id: string;
  name: string;
  cnpj: string | null;
  email: string | null;
  contact: string | null;
  kind: PartyKind;
  status: PartyStatusBackend;
  created_at: string;
  updated_at: string;
}

export interface PartyListResponse {
  ok: boolean;
  total: number;
  page: number;
  limit: number;
  results: PartyResponse[];
}

export interface PartyDetailResponse {
  ok: boolean;
  data: PartyResponse;
}

export interface CreatePartyRequest {
  name: string;
  kind: PartyKind;
  cnpj?: string | null;
  email?: string | null;
  contact?: string | null;
  status?: PartyStatusBackend;
}

export type UpdatePartyRequest = Partial<CreatePartyRequest>;

export const PARTY_KIND_LABEL: Record<PartyKind, 'Cliente' | 'Fornecedor' | 'Parceiro' | 'Interno'> = {
  CLIENT: 'Cliente',
  SUPPLIER: 'Fornecedor',
  PARTNER: 'Parceiro',
  INTERNAL: 'Interno',
};

export const PARTY_LABEL_TO_KIND: Record<'Cliente' | 'Fornecedor' | 'Parceiro' | 'Interno', PartyKind> = {
  Cliente: 'CLIENT',
  Fornecedor: 'SUPPLIER',
  Parceiro: 'PARTNER',
  Interno: 'INTERNAL',
};

export const PARTY_STATUS_LABEL: Record<PartyStatusBackend, 'Ativo' | 'Inativo'> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
};

// ===== Documents (anexos por contrato) =====

export interface DocumentUploader {
  id: string;
  name: string;
  email: string;
}

export interface DocumentItem {
  id: string;
  contract_id: string;
  workspace_id: string;
  name: string;
  mime_type: string;
  size_bytes: number;
  uploaded_by: DocumentUploader;
  created_at: string;
}

export interface WorkspaceDocumentItem extends DocumentItem {
  contract_title: string;
}

export interface DocumentListResponse {
  ok: boolean;
  total: number;
  results: DocumentItem[];
}

export interface WorkspaceDocumentListResponse {
  ok: boolean;
  total: number;
  results: WorkspaceDocumentItem[];
}

export interface DocumentUploadResponse {
  ok: boolean;
  data: DocumentItem;
}
