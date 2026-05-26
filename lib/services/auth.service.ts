import { fetchApi } from '../api-client';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../../types/api';

export const authService = {
  /**
   * Registra um novo usuário e já cria um workspace associado a ele.
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return fetchApi<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: false,
      requireWorkspace: false,
    });
  },

  /**
   * Autentica o usuário na plataforma e retorna o JWT e os dados do usuário.
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    return fetchApi<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: false,
      requireWorkspace: false,
    });
  },
};
