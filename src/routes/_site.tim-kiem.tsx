import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, ArrowLeft } from "lucide-react";
import { articles, categoryBySlug, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/_site/tim-kiem")({
  head: () => ({
    meta: [
      { title: "Tìm kiếm bài viết — DermaXin" },
      {
        name: "description",
        content:
          "Tìm kiếm bài viết da liễu theo ngữ nghĩa: nhập triệu chứng, hoạt chất hoặc câu hỏi.",
      },
    ],
  }),
  component: SearchPage,
});

// Lightweight keyword scoring to mimic semantic ranking in the UI.
function scoreArticle(query: string, text: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);
  const hay = text.toLowerCase();
  let hits = 0;
  for (const t of tokens) if (hay.includes(t)) hits += 1;
  if (hits === 0) return 0;
  return Math.min(0.99, 0.55 + (hits / Math.max(tokens.length, 1)) * 0.44);
}

const suggestions = [
  "vitamin C cho da nhạy cảm",
  "trị mụn nội tiết",
  "chàm sữa ở trẻ sơ sinh",
  "chống nắng SPF 50",
];

function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return articles
      .map((a) => ({
        article: a,
        score: scoreArticle(query, `${a.title} ${a.excerpt}`),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Về trang chủ
      </Link>

      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        <Sparkles className="size-3.5" />
        Tìm kiếm theo ngữ nghĩa
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Bạn đang tìm điều gì?
      </h1>
      <p className="mt-2 text-muted-foreground">
        Nhập triệu chứng, hoạt chất hoặc câu hỏi — hệ thống sẽ gợi ý bài viết phù
        hợp nhất theo nội dung.
      </p>

      <div className="relative mt-6">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ví dụ: làm dịu da kích ứng sau khi dùng retinoid..."
          className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-base shadow-sm outline-none transition-all focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
        />
      </div>

      {!query.trim() && (
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="py-1.5 text-sm text-muted-foreground">Gợi ý:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="rounded-full bg-secondary px-3.5 py-1.5 text-sm text-foreground ring-1 ring-black/5 transition-colors hover:bg-muted"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {query.trim() && (
        <div className="mt-10">
          <p className="mb-5 text-sm text-muted-foreground">
            {results.length > 0
              ? `${results.length} kết quả phù hợp nhất`
              : "Không tìm thấy kết quả phù hợp. Thử từ khóa khác."}
          </p>

          <div className="flex flex-col gap-3">
            {results.map(({ article, score }) => {
              const cat = categoryBySlug(article.categorySlug);
              return (
                <Link
                  key={article.id}
                  to="/bai-viet/$slug"
                  params={{ slug: article.slug }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary/30 hover:bg-secondary/40"
                >
                  <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {cat?.name}
                      <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                        {Math.round(score * 100)}% phù hợp
                      </span>
                    </div>
                    <h3 className="truncate font-semibold text-foreground group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                    {formatDate(article.publishedAt)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
