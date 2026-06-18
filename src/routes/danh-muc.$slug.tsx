import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { CategoryFilter } from "@/components/category-filter";
import { PaginatedArticles } from "@/components/paginated-articles";
import {
  fetchCategoryBySlug,
  fetchArticles,
  fetchCategories,
} from "@/lib/api-client";
import type { Category } from "@/lib/api-types";
import type { ArticlesPage } from "@/lib/api-client";

export const Route = createFileRoute("/danh-muc/$slug")({
  loader: async ({ params }) => {
    try {
      const [category, allCategories, articlesData] = await Promise.all([
        fetchCategoryBySlug(params.slug),
        fetchCategories(),
        // We'll fetch articles by categoryId after getting category
        fetchCategoryBySlug(params.slug).then((cat) =>
          fetchArticles({ page: 0, size: 6, categoryId: cat.id }),
        ),
      ]);
      return { category, allCategories, articlesData };
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category?.name ?? "Danh mục"} — DermaXin` },
      {
        name: "description",
        content: `Các bài viết da liễu thuộc danh mục ${loaderData?.category?.name ?? ""}.`,
      },
      {
        property: "og:title",
        content: `${loaderData?.category?.name ?? ""} — DermaXin`,
      },
    ],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Không tìm thấy danh mục
        </h1>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          ← Về trang chủ
        </Link>
      </div>
    </SiteShell>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, allCategories, articlesData: initial } =
    Route.useLoaderData() as {
      category: Category;
      allCategories: Category[];
      articlesData: ArticlesPage;
    };

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState(initial);

  // Khi navigate sang category khác (cùng route pattern), component không remount.
  // Cần đồng bộ lại state từ loader data mới khi category.id thay đổi.
  useEffect(() => {
    setPageData(initial);
    setPage(0);
  }, [category.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = async (newPage: number) => {
    const data = await fetchArticles({
      page: newPage,
      size: 6,
      categoryId: category.id,
    });
    setPageData(data);
    setPage(newPage);
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Tất cả bài viết
        </Link>

        <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {category.name}
        </h1>
        <p className="mb-8 text-muted-foreground">
          {pageData.totalElements} bài viết trong danh mục này.
        </p>

        <div className="mb-10">
          <CategoryFilter
            activeSlug={category.slug}
            categories={allCategories}
          />
        </div>

        <PaginatedArticles
          articles={pageData.articles}
          resetKey={category.slug}
          totalPages={pageData.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </SiteShell>
  );
}
