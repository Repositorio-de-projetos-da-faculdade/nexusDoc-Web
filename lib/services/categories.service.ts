import { fetchApi } from '../api-client';
import {
  CategoryListResponse,
  CategoryMutationResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../../types/api';

export const categoriesService = {
  /**
   * Lista todas as categorias do workspace.
   */
  async listCategories(): Promise<CategoryListResponse> {
    return fetchApi<CategoryListResponse>('/categories', {
      method: 'GET',
    });
  },

  /**
   * Cria uma nova categoria (requer papel ADMIN ou LEGAL).
   */
  async createCategory(input: CreateCategoryRequest): Promise<CategoryMutationResponse> {
    return fetchApi<CategoryMutationResponse>('/categories', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  /**
   * Atualiza uma categoria existente (requer papel ADMIN ou LEGAL).
   */
  async updateCategory(
    id: string,
    input: UpdateCategoryRequest
  ): Promise<CategoryMutationResponse> {
    return fetchApi<CategoryMutationResponse>(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  },

  /**
   * Remove uma categoria (requer papel ADMIN ou LEGAL).
   */
  async deleteCategory(id: string): Promise<void> {
    await fetchApi<unknown>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};
