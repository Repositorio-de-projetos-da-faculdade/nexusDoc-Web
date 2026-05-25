import { fetchApi } from '../api-client';
import type {
  DocumentListResponse,
  WorkspaceDocumentListResponse,
  DocumentUploadResponse,
} from '../../types/api';

export const documentsService = {
  /**
   * Lista todos os documentos vinculados a um contrato.
   */
  async listDocuments(contractId: string): Promise<DocumentListResponse> {
    return fetchApi<DocumentListResponse>(`/contracts/${contractId}/documents`, {
      method: 'GET',
    });
  },

  /**
   * Lista todos os documentos do workspace (agregação de todos os contratos).
   */
  async listAllDocuments(): Promise<WorkspaceDocumentListResponse> {
    return fetchApi<WorkspaceDocumentListResponse>(`/documents`, {
      method: 'GET',
    });
  },

  /**
   * Faz o upload de um anexo (PDF/imagem/docx) vinculado a um contrato.
   */
  async uploadDocument(contractId: string, file: File): Promise<DocumentUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return fetchApi<DocumentUploadResponse>(`/contracts/${contractId}/documents`, {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Faz o download de um documento — dispara o download no navegador.
   */
  async downloadDocument(id: string, suggestedName?: string): Promise<void> {
    const blob = await fetchApi<Blob>(`/documents/${id}/download`, {
      method: 'GET',
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', suggestedName || `documento-${id}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  /**
   * Remove um documento.
   */
  async deleteDocument(id: string): Promise<void> {
    await fetchApi<void>(`/documents/${id}`, {
      method: 'DELETE',
    });
  },
};
