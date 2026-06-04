import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, CalendarDays, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import {
  articleBySlug,
  categoryBySlug,
  formatDate,
  relatedArticles,
} from "@/lib/mock-data";

export const Route = createFileRoute("/bai-viet/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    return {
      meta: [
        { title: a ? `${a.title} — DermaXin` : "Bài viết — DermaXin" },
        { name: "description", content: a?.excerpt ?? "" },
        { property: "og:title", content: a?.title ?? "" },
        { property: "og:description", content: a?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        ...(a?.thumbnail ? [{ property: "og:image", content: a.thumbnail }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Không tìm thấy bài viết
        </h1>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          ← Về trang chủ
        </Link>
      </div>
    </SiteShell>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const category = categoryBySlug(article.categorySlug);
  const related = relatedArticles(article, 4);

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Tất cả bài viết
        </Link>

        <header className="mb-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {category && (
              <Link
                to="/danh-muc/$slug"
                params={{ slug: category.slug }}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/15"
              >
                {category.name}
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{article.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {article.readingMinutes} phút đọc
            </span>
            <span className="inline-flex items-center gap-1.5 text-primary">
              <ShieldCheck className="size-3.5" />
              Đã kiểm duyệt y khoa
            </span>
          </div>
        </header>

        <div className="mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-muted outline outline-1 -outline-offset-1 outline-black/5">
          <img
            src={article.thumbnail}
            alt={article.title}
            width={1200}
            height={675}
            className="size-full object-cover"
          />
        </div>

        {/* Rich text content with inline images */}
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="mb-8 font-display text-2xl font-semibold">
            Bài viết liên quan
          </h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {related.map((r) => {
              const cat = categoryBySlug(r.categorySlug);
              return (
                <Link
                  key={r.id}
                  to="/bai-viet/$slug"
                  params={{ slug: r.slug }}
                  className="group"
                >
                  <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted outline outline-1 -outline-offset-1 outline-black/5">
                    <img
                      src={r.thumbnail}
                      alt={r.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {cat?.name}
                  </p>
                  <h3 className="text-sm font-medium leading-snug decoration-border underline-offset-4 group-hover:underline">
                    {r.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
