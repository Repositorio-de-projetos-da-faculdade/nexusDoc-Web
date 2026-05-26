import { fetchApi } from '../api-client';
import { InviteMemberRequest, InviteMemberResponse, UpdateMemberRoleRequest } from '../../types/api';

export const workspacesService = {
  /**
   * Aceita um convite pendente. Requer que o usuário já esteja logado.
   */
  async acceptInvite(token: string): Promise<{ message: string }> {
    return fetchApi<{ message: string }>(`/workspaces/invites/${token}/accept`, {
      method: 'POST',
      // The API doesn't require workspaceId for this route, but requires Auth
      requireWorkspace: false,
    });
  },

  /**
   * Gera um convite para o workspace. (Requer ADMIN)
   */
  async inviteMember(data: InviteMemberRequest): Promise<InviteMemberResponse> {
    return fetchApi<InviteMemberResponse>('/workspaces/invites', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Atualiza o papel de um membro existente no workspace. (Requer ADMIN)
   */
  async updateMemberRole(userId: string, data: UpdateMemberRoleRequest): Promise<void> {
    return fetchApi<void>(`/workspaces/members/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Remove o membro do workspace atual. (Requer ADMIN)
   */
  async removeMember(userId: string): Promise<void> {
    return fetchApi<void>(`/workspaces/members/${userId}`, {
      method: 'DELETE',
    });
  },
};
