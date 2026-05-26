const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class ApiError extends Error {
  public status: number;
  public data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  requireWorkspace?: boolean;
  responseType?: 'json' | 'blob';
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = true, requireWorkspace = true, ...customOptions } = options;
  const headers = new Headers(customOptions.headers);

  // Set Content-Type by default to JSON if not provided
  if (!headers.has('Content-Type') && !(customOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Handle Authentication Header
  if (requireAuth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('nexus_token') : null;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Handle Workspace Context Header
  if (requireWorkspace) {
    const workspaceId = typeof window !== 'undefined' ? localStorage.getItem('nexus_workspace_id') : null;
    if (workspaceId) {
      headers.set('x-workspace-id', workspaceId);
    }
  }

  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...customOptions,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    throw new ApiError(response.status, errorData?.message || 'Erro na requisição para a API', errorData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  if (customOptions.responseType === 'blob') {
    return response.blob() as unknown as Promise<T>;
  }

  return response.json() as Promise<T>;
}
