export const API_BASE_URL = "https://api.ixe-agent.io.vn/api/v1";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestOptions = {
  path: string;
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
};

function buildQueryString(query?: ApiRequestOptions["query"]) {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.append(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function apiRequest<T = unknown>(options: ApiRequestOptions): Promise<T> {
  const { path, method = "GET", query, body, headers, token } = options;
  const url = `${API_BASE_URL}${path}${buildQueryString(query)}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const errorData = await response.json();
      message = errorData?.message || message;
    } catch {}
    throw new Error(message);
  }

  try {
    return (await response.json()) as T;
  } catch {
    // no content
    return undefined as unknown as T;
  }
}

// High-level API helpers (adjust paths to match actual API docs if different)
export const Api = {
  // Public content
  getArticles: (params?: { page?: number; limit?: number; categoryId?: string }) =>
    apiRequest<any>({ path: "/articles", query: params }),
  getCategories: () => apiRequest<any>({ path: "/categories" }),
  getArticleById: (id: string) => apiRequest<any>({ path: `/articles/${id}` }),
  getArticleComments: (id: string) => apiRequest<any>({ path: `/articles/${id}/comments` }),

  // Auth-required (token to be supplied by caller)
  getSavedArticles: (token: string, userId: string) =>
    apiRequest<any>({ path: `/users/${userId}/saved-articles`, token }),
  unsaveArticle: (token: string, userId: string, articleId: string) =>
    apiRequest<void>({ path: `/users/${userId}/saved-articles/${articleId}`, method: "DELETE", token }),

  getMyArticles: (token: string, userId: string) =>
    apiRequest<any>({ path: `/users/${userId}/articles`, token }),
  createArticle: (token: string, body: any) =>
    apiRequest<any>({ path: "/articles", method: "POST", body, token }),
  updateArticle: (token: string, id: string, body: any) =>
    apiRequest<any>({ path: `/articles/${id}`, method: "PUT", body, token }),
  deleteArticle: (token: string, id: string) =>
    apiRequest<void>({ path: `/articles/${id}`, method: "DELETE", token }),
};


