import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { CategoryFilter } from "@/components/category-filter";
import { PaginatedArticles } from "@/components/paginated-articles";
import { articles, categoryBySlug } from "@/lib/mock-data";

export const Route = createFileRoute("/danh-muc/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name} — DermaXin` },
      {
        name: "description",
        content: `Các bài viết da liễu thuộc danh mục ${loaderData?.category.name}.`,
      },
      { property: "og:title", content: `${loaderData?.category.name} — DermaXin` },
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
  const { category } = Route.useLoaderData();
  const list = articles.filter((a) => a.categorySlug === category.slug);

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
          {list.length} bài viết trong danh mục này.
        </p>

        <div className="mb-10">
          <CategoryFilter activeSlug={category.slug} />
        </div>

        <PaginatedArticles articles={list} resetKey={category.slug} />
      </div>
    </SiteShell>
  );
}
