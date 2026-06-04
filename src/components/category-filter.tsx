import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * Single-select category filter chips.
 * `activeSlug` undefined => "Tất cả" selected.
 */
export function CategoryFilter({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      <Link
        to="/"
        className={cn(
          "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
          !activeSlug
            ? "bg-primary text-primary-foreground ring-primary/20"
            : "bg-card text-muted-foreground ring-black/5 hover:bg-secondary",
        )}
      >
        Tất cả
      </Link>

      {categories.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <Link
            key={c.id}
            to="/danh-muc/$slug"
            params={{ slug: c.slug }}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
              active
                ? "bg-primary text-primary-foreground ring-primary/20"
                : "bg-card text-muted-foreground ring-black/5 hover:bg-secondary",
            )}
          >
            {c.name}
          </Link>
        );
      })}

      {activeSlug && (
        <Link
          to="/"
          className="ml-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <X className="size-3.5" />
          Xóa bộ lọc
        </Link>
      )}
    </div>
  );
}
