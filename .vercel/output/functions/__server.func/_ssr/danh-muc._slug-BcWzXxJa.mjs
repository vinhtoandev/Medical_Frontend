import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { i as Route$4, S as SiteShell, d as fetchArticles } from "./router-wC0kUIzv.mjs";
import { C as CategoryFilter, P as PaginatedArticles } from "./paginated-articles-Cxmde243.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
function CategoryPage() {
  const {
    category,
    allCategories,
    articlesData: initial
  } = Route$4.useLoaderData();
  const [page, setPage] = reactExports.useState(0);
  const [pageData, setPageData] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    setPageData(initial);
    setPage(0);
  }, [category.id]);
  const handlePageChange = async (newPage) => {
    const data = await fetchArticles({
      page: newPage,
      size: 6,
      categoryId: category.id
    });
    setPageData(data);
    setPage(newPage);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
      "Tất cả bài viết"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 font-display text-3xl font-semibold tracking-tight md:text-4xl", children: category.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-8 text-muted-foreground", children: [
      pageData.totalElements,
      " bài viết trong danh mục này."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryFilter, { activeSlug: category.slug, categories: allCategories }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginatedArticles, { articles: pageData.articles, resetKey: category.slug, totalPages: pageData.totalPages, currentPage: page, onPageChange: handlePageChange })
  ] }) });
}
export {
  CategoryPage as component
};
