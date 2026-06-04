import { useMemo, useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/mock-data";

const PER_PAGE = 6;

export function PaginatedArticles({
  articles,
  resetKey,
}: {
  articles: Article[];
  resetKey?: string;
}) {
  const [page, setPage] = useState(1);

  // Reset to first page when the underlying list changes (e.g. category switch)
  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const current = Math.min(page, totalPages);

  const visible = useMemo(
    () => articles.slice((current - 1) * PER_PAGE, current * PER_PAGE),
    [articles, current],
  );

  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
        <p className="text-sm text-muted-foreground">
          Không tìm thấy bài viết nào phù hợp.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((a, i) => (
          <ArticleCard key={a.id} article={a} index={i} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-16">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={current === 1}
                className={current === 1 ? "pointer-events-none opacity-40" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === current}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={current === totalPages}
                className={
                  current === totalPages ? "pointer-events-none opacity-40" : ""
                }
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
