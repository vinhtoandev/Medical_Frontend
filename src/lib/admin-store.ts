import { useEffect, useState } from "react";
import {
  articles as seedArticles,
  categories as seedCategories,
  type Article,
  type Category,
} from "@/lib/mock-data";

/**
 * Frontend-only persistence layer (localStorage) so the admin CRUD is fully
 * functional in the UI prototype. Swap these functions for server calls when
 * the backend is wired up.
 */

const A_KEY = "dermaxin.articles.v1";
const C_KEY = "dermaxin.categories.v1";

type Listener = () => void;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

function read<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as T[];
  } catch {
    return seed;
  }
}

function write<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  emit();
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const uid = () => Math.random().toString(36).slice(2, 10);

/* ---------------- Articles ---------------- */

export function getArticles(): Article[] {
  return read<Article>(A_KEY, seedArticles).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getArticle(id: string): Article | undefined {
  return read<Article>(A_KEY, seedArticles).find((a) => a.id === id);
}

export type ArticleInput = Omit<Article, "id">;

export function createArticle(input: ArticleInput): Article {
  const all = read<Article>(A_KEY, seedArticles);
  const article: Article = { ...input, id: uid() };
  write(A_KEY, [article, ...all]);
  return article;
}

export function updateArticle(id: string, input: ArticleInput) {
  const all = read<Article>(A_KEY, seedArticles);
  write(
    A_KEY,
    all.map((a) => (a.id === id ? { ...input, id } : a)),
  );
}

export function deleteArticle(id: string) {
  const all = read<Article>(A_KEY, seedArticles);
  write(
    A_KEY,
    all.filter((a) => a.id !== id),
  );
}

/* ---------------- Categories ---------------- */

export function getCategories(): Category[] {
  return read<Category>(C_KEY, seedCategories);
}

export function createCategory(name: string): Category {
  const all = read<Category>(C_KEY, seedCategories);
  const category: Category = { id: uid(), name, slug: slugify(name) };
  write(C_KEY, [...all, category]);
  return category;
}

export function updateCategory(id: string, name: string) {
  const all = read<Category>(C_KEY, seedCategories);
  write(
    C_KEY,
    all.map((c) => (c.id === id ? { ...c, name, slug: slugify(name) } : c)),
  );
}

export function deleteCategory(id: string) {
  const all = read<Category>(C_KEY, seedCategories);
  write(
    C_KEY,
    all.filter((c) => c.id !== id),
  );
}

/* ---------------- Reactive hooks ---------------- */

function useStore<T>(getter: () => T): T {
  const [value, setValue] = useState<T>(getter);
  useEffect(() => {
    const update = () => setValue(getter());
    update();
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export const useArticles = () => useStore(getArticles);
export const useCategories = () => useStore(getCategories);
