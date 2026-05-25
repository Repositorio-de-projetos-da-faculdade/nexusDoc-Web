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
  status: string;
  file_url: string;
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
  status: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

export interface ContractExtraction {
  parties: {
    id: string;
    contract_id: string;
    name: string;
    type: 'CONTRACTOR' | 'HIRED' | string;
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
  summary: any;
}

export interface ContractDetail {
  contract: ContractDetailData;
  extraction: ContractExtraction;
}

export interface ContractDetailResponse {
  ok: boolean;
  data: ContractDetail;
}

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
