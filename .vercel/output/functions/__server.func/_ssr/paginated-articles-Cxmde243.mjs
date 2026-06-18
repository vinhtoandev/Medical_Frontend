import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cn, f as formatDate } from "./router-wC0kUIzv.mjs";
import { b as buttonVariants } from "./button-DIjToSax.mjs";
import { X, l as ChevronLeft, m as ChevronRight } from "../_libs/lucide-react.mjs";
function CategoryFilter({
  activeSlug,
  categories
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: cn(
          "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
          !activeSlug ? "bg-primary text-primary-foreground ring-primary/20" : "bg-card text-muted-foreground ring-black/5 hover:bg-secondary"
        ),
        children: "Tất cả"
      }
    ),
    categories.map((c) => {
      const active = c.slug === activeSlug;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/danh-muc/$slug",
          params: { slug: c.slug },
          className: cn(
            "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
            active ? "bg-primary text-primary-foreground ring-primary/20" : "bg-card text-muted-foreground ring-black/5 hover:bg-secondary"
          ),
          children: c.name
        },
        c.id
      );
    }),
    activeSlug && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "ml-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" }),
          "Xóa bộ lọc"
        ]
      }
    )
  ] });
}
const Pagination = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
const PaginationContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { ref, className: cn("flex flex-row items-center gap-1", className), ...props })
);
PaginationContent.displayName = "PaginationContent";
const PaginationItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ref, className: cn("", className), ...props })
);
PaginationItem.displayName = "PaginationItem";
const PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "a",
  {
    "aria-current": isActive ? "page" : void 0,
    className: cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size
      }),
      className
    ),
    ...props
  }
);
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  PaginationLink,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 pl-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Previous" })
    ]
  }
);
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  PaginationLink,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 pr-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Next" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
    ]
  }
);
PaginationNext.displayName = "PaginationNext";
function ArticleCard({
  article,
  index = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/bai-viet/$slug",
      params: { slug: article.slug },
      className: "group block animate-fade-up",
      style: { animationDelay: `${Math.min(index, 8) * 60}ms` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted outline outline-1 -outline-offset-1 outline-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: article.thumbnail,
            alt: article.title,
            loading: "lazy",
            width: 800,
            height: 600,
            className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-primary", children: article.categoryName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: formatDate(article.publishedAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-balance text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary", children: article.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm leading-relaxed text-muted-foreground", children: article.excerpt })
      ]
    }
  );
}
const PER_PAGE = 6;
function PaginatedArticles({
  articles,
  resetKey,
  totalPages: externalTotalPages,
  currentPage: externalPage,
  onPageChange
}) {
  const [localPage, setLocalPage] = reactExports.useState(1);
  reactExports.useEffect(() => {
    setLocalPage(1);
  }, [resetKey]);
  const isServerPaginated = externalTotalPages !== void 0 && onPageChange !== void 0;
  const totalPages = isServerPaginated ? externalTotalPages : Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const current = isServerPaginated ? (externalPage ?? 0) + 1 : Math.min(localPage, totalPages);
  const visible = isServerPaginated ? articles : articles.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const handlePageClick = (p) => {
    if (isServerPaginated) {
      onPageChange(p - 1);
    } else {
      setLocalPage(p);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (articles.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Không tìm thấy bài viết nào phù hợp." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", children: visible.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article: a, index: i }, a.id)) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { className: "mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaginationPrevious,
        {
          href: "#",
          "aria-disabled": current === 1,
          className: current === 1 ? "pointer-events-none opacity-40" : "",
          onClick: (e) => {
            e.preventDefault();
            if (current > 1) handlePageClick(current - 1);
          }
        }
      ) }),
      Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        const show = totalPages <= 7 || p === 1 || p === totalPages || Math.abs(p - current) <= 1;
        if (!show) {
          if (p === 2 || p === totalPages - 1) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 text-muted-foreground", children: "…" }) }, `ellipsis-${p}`);
          }
          return null;
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaginationLink,
          {
            href: "#",
            isActive: p === current,
            onClick: (e) => {
              e.preventDefault();
              handlePageClick(p);
            },
            children: p
          }
        ) }, p);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaginationNext,
        {
          href: "#",
          "aria-disabled": current === totalPages,
          className: current === totalPages ? "pointer-events-none opacity-40" : "",
          onClick: (e) => {
            e.preventDefault();
            if (current < totalPages) handlePageClick(current + 1);
          }
        }
      ) })
    ] }) })
  ] });
}
export {
  CategoryFilter as C,
  PaginatedArticles as P
};
