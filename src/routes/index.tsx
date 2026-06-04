import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { CategoryFilter } from "@/components/category-filter";
import { PaginatedArticles } from "@/components/paginated-articles";
import { articles, categoryBySlug, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DermaXin — Kiến thức da liễu dựa trên bằng chứng" },
      {
        name: "description",
        content:
          "Bài viết về da liễu, chăm sóc da, bệnh lý da, điều trị và kiến thức y khoa được biên soạn chuyên nghiệp, dễ hiểu.",
      },
      { property: "og:title", content: "DermaXin — Kiến thức da liễu" },
      {
        property: "og:description",
        content: "Kiến thức da liễu dựa trên bằng chứng cho cộng đồng.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = articles[0];
  const featuredCat = categoryBySlug(featured.categorySlug);
  const rest = articles.slice(1);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header className="mb-12 animate-fade-up">
          <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Kiến thức da liễu dựa trên bằng chứng.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Chăm sóc da, bệnh lý, điều trị và hoạt chất — biên soạn bởi chuyên
            gia, trình bày rõ ràng và dễ hiểu.
          </p>
          <Link
            to="/tim-kiem"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground ring-1 ring-black/5 transition-colors hover:bg-muted"
          >
            <Sparkles className="size-4 text-accent" />
            Tìm kiếm thông minh theo ngữ nghĩa
            <ArrowRight className="size-4" />
          </Link>
        </header>

        {/* Featured article */}
        <Link
          to="/bai-viet/$slug"
          params={{ slug: featured.slug }}
          className="group mb-16 grid animate-fade-up gap-8 lg:grid-cols-2 lg:items-center"
        >
          <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted outline outline-1 -outline-offset-1 outline-black/5">
            <img
              src={featured.thumbnail}
              alt={featured.title}
              width={1200}
              height={750}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="size-2 rounded-full bg-accent" />
              Bài viết nổi bật
            </div>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight group-hover:text-primary md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {featuredCat?.name}
              </span>
              <span className="opacity-30">•</span>
              <span>{formatDate(featured.publishedAt)}</span>
            </div>
          </div>
        </Link>

        {/* Filter + grid */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">
            Bài viết mới nhất
          </h2>
        </div>

        <div className="mb-10">
          <CategoryFilter />
        </div>

        <PaginatedArticles articles={rest} resetKey="all" />
      </div>
    </SiteShell>
  );
}
