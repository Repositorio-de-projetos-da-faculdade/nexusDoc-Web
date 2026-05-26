import { fetchApi } from '../api-client';
import type {
  CreatePartyRequest,
  PartyDetailResponse,
  PartyListResponse,
  PartyResponse,
  UpdatePartyRequest,
} from '../../types/api';

export interface ListPartiesParams {
  page?: number;
  limit?: number;
  kind?: 'CLIENT' | 'SUPPLIER' | 'PARTNER' | 'INTERNAL';
  status?: 'ACTIVE' | 'INACTIVE';
  q?: string;
}

export const partiesService = {
  /**
   * Lista as partes (clientes, fornecedores, parceiros, internos) do workspace ativo.
   */
  async listParties(params: ListPartiesParams = {}): Promise<PartyListResponse> {
    const search = new URLSearchParams();
    if (params.page) search.set('page', String(params.page));
    if (params.limit) search.set('limit', String(params.limit));
    if (params.kind) search.set('kind', params.kind);
    if (params.status) search.set('status', params.status);
    if (params.q) search.set('q', params.q);
    const qs = search.toString();
    return fetchApi<PartyListResponse>(`/parties${qs ? `?${qs}` : ''}`, { method: 'GET' });
  },

  /**
   * Detalhe de uma parte pelo id.
   */
  async getParty(id: string): Promise<PartyDetailResponse> {
    return fetchApi<PartyDetailResponse>(`/parties/${id}`, { method: 'GET' });
  },

  /**
   * Cria uma nova parte no workspace. Requer ADMIN ou LEGAL.
   */
  async createParty(input: CreatePartyRequest): Promise<PartyDetailResponse> {
    return fetchApi<PartyDetailResponse>(`/parties`, {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  /**
   * Atualiza uma parte existente. Requer ADMIN ou LEGAL.
   */
  async updateParty(id: string, input: UpdatePartyRequest): Promise<PartyDetailResponse> {
    return fetchApi<PartyDetailResponse>(`/parties/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  },

  /**
   * Exclui uma parte. Requer ADMIN ou LEGAL.
   */
  async deleteParty(id: string): Promise<void> {
    await fetchApi<void>(`/parties/${id}`, { method: 'DELETE' });
  },
};

export type { PartyResponse };
