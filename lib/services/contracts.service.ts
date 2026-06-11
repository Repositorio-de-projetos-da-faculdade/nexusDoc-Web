import { fetchApi } from '../api-client';
import {
  ContractUploadResponse,
  ContractSearchResponse,
  ContractListResponse,
  ContractApproveRequest,
  ContractApproveResponse,
  ContractVersionsResponse,
  ContractDetailResponse,
} from '../../types/api';

export const contractsService = {
  /**
   * Faz o upload de um contrato PDF e retorna os dados extraídos pela IA.
   */
  async uploadContract(file: File): Promise<ContractUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return fetchApi<ContractUploadResponse>('/contracts/upload', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Lista todos os contratos do workspace com paginação.
   */
  async listContracts(page: number = 1, limit: number = 50): Promise<ContractListResponse> {
    const searchParams = new URLSearchParams({ page: String(page), limit: String(limit) });
    return fetchApi<ContractListResponse>(`/contracts?${searchParams.toString()}`, {
      method: 'GET',
    });
  },

  /**
   * Busca semântica no conteúdo dos contratos enviados no workspace.
   */
  async searchContracts(query: string, limit: number = 10): Promise<ContractSearchResponse> {
    const searchParams = new URLSearchParams({ q: query, limit: String(limit) });
    return fetchApi<ContractSearchResponse>(`/contracts/search?${searchParams.toString()}`, {
      method: 'GET',
    });
  },

  /**
   * Registra decisão Jurídica ou Financeira sobre o contrato.
   */
  async approveContract(id: string, data: ContractApproveRequest): Promise<ContractApproveResponse> {
    return fetchApi<ContractApproveResponse>(`/contracts/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Faz o upload de uma nova versão do contrato.
   */
  async uploadVersion(id: string, file: File): Promise<ContractUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return fetchApi<ContractUploadResponse>(`/contracts/${id}/versions`, {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Lista todas as versões históricas de um contrato.
   */
  async getVersions(id: string): Promise<ContractVersionsResponse> {
    return fetchApi<ContractVersionsResponse>(`/contracts/${id}/versions`, {
      method: 'GET',
    });
  },

  /**
   * Exporta um relatório de todos os contratos do workspace.
   * Faz o download automático no navegador.
   */
  async downloadReport(): Promise<void> {
    const blob = await fetchApi<Blob>('/contracts/report', {
      method: 'GET',
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'gracon_report.pdf'); // Ou planilha, dependendo do backend
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  /**
   * Busca os detalhes de um contrato específico.
   */
  async getContractById(id: string): Promise<ContractDetailResponse> {
    return fetchApi<ContractDetailResponse>(`/contracts/${id}`, {
      method: 'GET',
    });
  },
};
