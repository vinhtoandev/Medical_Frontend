import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/api-types";

const PER_PAGE = 6;

/**
 * Client-side paginated article grid.
 * Can operate in two modes:
 *   1. Local array pagination (pass `articles`, uses internal state)
 *   2. Server pagination (pass `totalPages` + `onPageChange` callback)
 */
export function PaginatedArticles({
  articles,
  resetKey,
  totalPages: externalTotalPages,
  currentPage: externalPage,
  onPageChange,
}: {
  articles: Article[];
  resetKey?: string;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}) {
  const [localPage, setLocalPage] = useState(1);

  // Reset to first page when the underlying list changes (category switch)
  useEffect(() => {
    setLocalPage(1);
  }, [resetKey]);

  const isServerPaginated =
    externalTotalPages !== undefined && onPageChange !== undefined;

  const totalPages = isServerPaginated
    ? externalTotalPages
    : Math.max(1, Math.ceil(articles.length / PER_PAGE));

  const current = isServerPaginated
    ? (externalPage ?? 0) + 1 // server pages are 0-indexed → convert to 1-indexed
    : Math.min(localPage, totalPages);

  const visible = isServerPaginated
    ? articles // server already returns the right slice
    : articles.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const handlePageClick = (p: number) => {
    if (isServerPaginated) {
      onPageChange(p - 1); // convert back to 0-indexed for server
    } else {
      setLocalPage(p);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                  if (current > 1) handlePageClick(current - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              // Show first, last, current ±1 and ellipsis for large page counts
              const show =
                totalPages <= 7 ||
                p === 1 ||
                p === totalPages ||
                Math.abs(p - current) <= 1;
              if (!show) {
                if (p === 2 || p === totalPages - 1) {
                  return (
                    <PaginationItem key={`ellipsis-${p}`}>
                      <span className="px-2 text-muted-foreground">…</span>
                    </PaginationItem>
                  );
                }
                return null;
              }
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === current}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(p);
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
                  if (current < totalPages) handlePageClick(current + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
