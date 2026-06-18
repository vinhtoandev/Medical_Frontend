// ─── API Types matching backend DTOs ───────────────────────────────────────
// Backend: com.example.demo.dto

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-indexed)
  size: number;
  first: boolean;
  last: boolean;
}

export interface CategoryApi {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface ArticleApi {
  id: number;
  categoryId: number;
  category?: CategoryApi;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnailUrl?: string;
  status: "PUBLISHED" | "DRAFT";
  viewCount: number;
  publishedAt: string; // ISO datetime
  createdAt: string;
  updatedAt: string;
  relevanceScore?: number;
}

// ─── Normalised shape used in UI components ─────────────────────────────────
// Keeps components working without changing JSX

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  categorySlug: string;
  categoryName?: string;
  publishedAt: string;
  author: string;
  readingMinutes: number;
  viewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// ─── Adapters ────────────────────────────────────────────────────────────────

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80";

function estimateReadingMinutes(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function adaptArticle(dto: ArticleApi): Article {
  return {
    id: String(dto.id),
    title: dto.title,
    slug: dto.slug,
    excerpt: dto.summary,
    content: dto.content,
    thumbnail: dto.thumbnailUrl || FALLBACK_THUMBNAIL,
    categorySlug: dto.category?.slug ?? "",
    categoryName: dto.category?.name,
    publishedAt: dto.publishedAt,
    author: "Chuyên gia da liễu",
    readingMinutes: estimateReadingMinutes(dto.content ?? ""),
    viewCount: dto.viewCount,
  };
}

export function adaptCategory(dto: CategoryApi): Category {
  return {
    id: String(dto.id),
    name: dto.name,
    slug: dto.slug,
    description: dto.description,
  };
}
