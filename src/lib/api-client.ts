import type {
  ApiResponse,
  PageResponse,
  ArticleApi,
  CategoryApi,
  Article,
  Category,
} from "./api-types";
import { adaptArticle, adaptCategory } from "./api-types";

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8080";

// ─── Generic fetch helper ────────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  const json = (await res.json()) as ApiResponse<T>;
  return json.data;
}

// ─── Date formatting (same as mock-data) ────────────────────────────────────

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function fetchCategories(): Promise<Category[]> {
  const data = await apiFetch<CategoryApi[]>("/api/categories");
  return data.map(adaptCategory);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  const data = await apiFetch<CategoryApi>(`/api/categories/slug/${slug}`);
  return adaptCategory(data);
}

// ─── Articles ────────────────────────────────────────────────────────────────

export interface ArticlesPage {
  articles: Article[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

export async function fetchArticles(opts: {
  page?: number;
  size?: number;
  categoryId?: number | string;
  sortBy?: string;
}): Promise<ArticlesPage> {
  const params = new URLSearchParams();
  params.set("page", String(opts.page ?? 0));
  params.set("size", String(opts.size ?? 10));
  if (opts.categoryId) params.set("categoryId", String(opts.categoryId));
  if (opts.sortBy) params.set("sortBy", opts.sortBy);

  const data = await apiFetch<PageResponse<ArticleApi>>(
    `/api/articles?${params}`,
  );
  return {
    articles: data.content.map(adaptArticle),
    totalPages: data.totalPages,
    totalElements: data.totalElements,
    currentPage: data.number,
  };
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const data = await apiFetch<ArticleApi>(`/api/articles/slug/${slug}`);
  return adaptArticle(data);
}

export async function fetchRelatedArticles(
  id: string,
  limit = 4,
): Promise<Article[]> {
  const data = await apiFetch<ArticleApi[]>(
    `/api/articles/${id}/related?limit=${limit}`,
  );
  return data.map(adaptArticle);
}

// ─── Search ──────────────────────────────────────────────────────────────────

export interface SearchResult {
  article: Article;
  score: number;
}

export async function searchArticles(keyword: string): Promise<SearchResult[]> {
  const params = new URLSearchParams({ keyword });
  const data = await apiFetch<ArticleApi[]>(`/api/search?${params}`);
  return data.map((dto) => ({
    article: adaptArticle(dto),
    score: dto.relevanceScore ?? 0.8,
  }));
}

export async function searchArticlesSemantic(
  query: string,
  limit = 10,
): Promise<SearchResult[]> {
  const params = new URLSearchParams({ query, limit: String(limit) });
  const data = await apiFetch<ArticleApi[]>(`/api/search/semantic?${params}`);
  return data.map((dto) => ({
    article: adaptArticle(dto),
    score: dto.relevanceScore ?? 0.9,
  }));
}

/**
 * Combined search: full-text first, supplement with semantic.
 * Falls back gracefully if semantic is not available (no embeddings).
 */
export async function searchArticlesCombined(
  query: string,
  limit = 10,
): Promise<SearchResult[]> {
  try {
    const params = new URLSearchParams({ query, limit: String(limit) });
    const data = await apiFetch<ArticleApi[]>(`/api/search/combined?${params}`);
    return data.map((dto) => ({
      article: adaptArticle(dto),
      score: dto.relevanceScore ?? 0.85,
    }));
  } catch {
    // Fallback to full-text if combined fails
    return searchArticles(query);
  }
}

// ─── Admin Auth ──────────────────────────────────────────────────────────────

const TOKEN_KEY = "derma_admin_token";

export function getAdminToken(): string | null {
  return typeof window !== "undefined"
    ? sessionStorage.getItem(TOKEN_KEY)
    : null;
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
    ...init,
  });
  if (res.status === 401) {
    clearAdminToken();
    throw new Error("UNAUTHORIZED");
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || path}`);
  }
  const json = (await res.json()) as ApiResponse<T>;
  return json.data;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
}

export async function adminLogin(
  username: string,
  password: string,
): Promise<LoginResult> {
  const result = await apiFetch<LoginResult>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setAdminToken(result.accessToken);
  return result;
}

export function adminLogout(): void {
  clearAdminToken();
}

// ─── Admin Article CRUD ───────────────────────────────────────────────────────

export interface CreateArticlePayload {
  title: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
  categoryId: number;
  status: "PUBLISHED" | "DRAFT";
}

export async function createArticleApi(
  payload: CreateArticlePayload,
): Promise<ArticleApi> {
  return adminFetch<ArticleApi>("/api/articles", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateArticleApi(
  id: number,
  payload: CreateArticlePayload,
): Promise<ArticleApi> {
  return adminFetch<ArticleApi>(`/api/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteArticleApi(id: number): Promise<void> {
  await adminFetch<null>(`/api/articles/${id}`, { method: "DELETE" });
}

/**
 * Upload an image file to S3 via the backend.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImageApi(file: File): Promise<string> {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/uploads/image`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (res.status === 401) {
    clearAdminToken();
    throw new Error("UNAUTHORIZED");
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upload failed ${res.status}: ${text}`);
  }
  const json = await res.json();
  return json.data.url as string;
}


export async function fetchArticleById(id: number): Promise<Article> {
  const data = await apiFetch<ArticleApi>(`/api/articles/${id}`);
  return adaptArticle(data);
}

// ─── Admin Category CRUD ──────────────────────────────────────────────────────

export interface CategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

export async function createCategoryApi(
  payload: CategoryPayload,
): Promise<Category> {
  const data = await adminFetch<CategoryApi>("/api/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return adaptCategory(data);
}

export async function updateCategoryApi(
  id: number,
  payload: CategoryPayload,
): Promise<Category> {
  const data = await adminFetch<CategoryApi>(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return adaptCategory(data);
}

export async function deleteCategoryApi(id: number): Promise<void> {
  await adminFetch<null>(`/api/categories/${id}`, { method: "DELETE" });
}
