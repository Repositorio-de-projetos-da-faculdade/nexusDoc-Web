import { fetchApi } from '../api-client';
import {
  TemplateListResponse,
  TemplateDetailResponse,
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from '../../types/api';

export const templatesService = {
  /**
   * Lista os modelos de contrato do workspace.
   */
  async listTemplates(page: number = 1, limit: number = 50): Promise<TemplateListResponse> {
    const searchParams = new URLSearchParams({ page: String(page), limit: String(limit) });
    return fetchApi<TemplateListResponse>(`/templates?${searchParams.toString()}`, {
      method: 'GET',
    });
  },

  /**
   * Busca um modelo específico pelo ID.
   */
  async getTemplate(id: string): Promise<TemplateDetailResponse> {
    return fetchApi<TemplateDetailResponse>(`/templates/${id}`, { method: 'GET' });
  },

  /**
   * Cria um novo modelo (requer papel ADMIN ou LEGAL).
   */
  async createTemplate(input: CreateTemplateRequest): Promise<TemplateDetailResponse> {
    return fetchApi<TemplateDetailResponse>('/templates', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  /**
   * Atualiza um modelo existente (requer papel ADMIN ou LEGAL).
   */
  async updateTemplate(id: string, input: UpdateTemplateRequest): Promise<TemplateDetailResponse> {
    return fetchApi<TemplateDetailResponse>(`/templates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  },

  /**
   * Remove um modelo (requer papel ADMIN ou LEGAL).
   */
  async deleteTemplate(id: string): Promise<void> {
    await fetchApi<void>(`/templates/${id}`, { method: 'DELETE' });
  },
};
