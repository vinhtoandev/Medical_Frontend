import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Search, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { searchArticlesSemantic, formatDate } from "@/lib/api-client";
import type { SearchResult } from "@/lib/api-client";

export const Route = createFileRoute("/tim-kiem")({
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

const suggestions = [
  "vitamin C cho da nhạy cảm",
  "trị mụn nội tiết",
  "chàm sữa ở trẻ sơ sinh",
  "chống nắng SPF 50",
  "niacinamide retinol",
  "rụng tóc androgen",
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchArticlesSemantic(q.trim(), 10);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const t = setTimeout(() => runSearch(value), 450);
    setDebounceTimer(t);
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Về trang chủ
        </Link>


        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Bạn đang tìm điều gì?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Nhập triệu chứng, hoạt chất hoặc câu hỏi — hệ thống sẽ gợi ý bài viết
          phù hợp nhất theo nội dung.
        </p>

        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Ví dụ: làm dịu da kích ứng sau khi dùng retinoid..."
            className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-base shadow-sm outline-none transition-all focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
          />
          {loading && (
            <Loader2 className="absolute right-4 top-1/2 size-5 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>

        {/* Suggestions */}
        {!query.trim() && (
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="py-1.5 text-sm text-muted-foreground">Gợi ý:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleChange(s)}
                className="rounded-full bg-secondary px-3.5 py-1.5 text-sm text-foreground ring-1 ring-black/5 transition-colors hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {searched && !loading && (
          <div className="mt-10">
            <p className="mb-5 text-sm text-muted-foreground">
              {results.length > 0 ? (
                <>
                  <span className="font-medium text-foreground">{results.length}</span> kết quả
                </>
              ) : (
                "Không tìm thấy kết quả phù hợp. Thử từ khóa khác."
              )}
            </p>

            <div className="flex flex-col gap-3">
              {results.map(({ article, score }) => (
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
                      {article.categoryName}

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
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
