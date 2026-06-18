import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$6, S as SiteShell, f as formatDate, d as fetchArticles } from "./router-wC0kUIzv.mjs";
import { C as CategoryFilter, P as PaginatedArticles } from "./paginated-articles-Cxmde243.mjs";
import "../_libs/sonner.mjs";
import { S as Sparkles, i as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./button-DIjToSax.mjs";
function HomePage() {
  const {
    articlesData: initial,
    categories
  } = Route$6.useLoaderData();
  const [page, setPage] = reactExports.useState(0);
  const [pageData, setPageData] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    setPageData(initial);
    setPage(0);
  }, [initial]);
  const featured = pageData.articles[0];
  const rest = pageData.articles.slice(1);
  const handlePageChange = async (newPage) => {
    const data = await fetchArticles({
      page: newPage,
      size: 7
    });
    setPageData(data);
    setPage(newPage);
  };
  if (!featured) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Chưa có bài viết nào." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-12 animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-3xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl", children: "Kiến thức da liễu dựa trên bằng chứng." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Chăm sóc da, bệnh lý, điều trị và hoạt chất — biên soạn bởi chuyên gia, trình bày rõ ràng và dễ hiểu." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tim-kiem", className: "mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground ring-1 ring-black/5 transition-colors hover:bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-accent" }),
        "Tìm kiếm thông minh theo ngữ nghĩa",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bai-viet/$slug", params: {
      slug: featured.slug
    }, className: "group mb-16 grid animate-fade-up gap-8 lg:grid-cols-2 lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden rounded-2xl bg-muted outline outline-1 -outline-offset-1 outline-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: featured.thumbnail, alt: featured.title, width: 1200, height: 750, className: "size-full object-cover transition-transform duration-500 group-hover:scale-105" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-accent" }),
          "Bài viết nổi bật"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-balance font-display text-3xl font-semibold leading-tight tracking-tight group-hover:text-primary md:text-4xl", children: featured.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-relaxed text-muted-foreground", children: featured.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: featured.categoryName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-30", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(featured.publishedAt) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex items-end justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Bài viết mới nhất" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryFilter, { categories }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginatedArticles, { articles: rest, resetKey: "all", totalPages: pageData.totalPages, currentPage: page, onPageChange: handlePageChange })
  ] }) });
}
export {
  HomePage as component
};
