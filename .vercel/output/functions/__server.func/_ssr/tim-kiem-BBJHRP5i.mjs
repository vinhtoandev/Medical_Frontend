import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as searchArticlesSemantic, S as SiteShell, f as formatDate } from "./router-wC0kUIzv.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft, d as Search, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
const suggestions = ["vitamin C cho da nhạy cảm", "trị mụn nội tiết", "chàm sữa ở trẻ sơ sinh", "chống nắng SPF 50", "niacinamide retinol", "rụng tóc androgen"];
function SearchPage() {
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [searched, setSearched] = reactExports.useState(false);
  const [debounceTimer, setDebounceTimer] = reactExports.useState(null);
  const runSearch = reactExports.useCallback(async (q) => {
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
  const handleChange = (value) => {
    setQuery(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const t = setTimeout(() => runSearch(value), 450);
    setDebounceTimer(t);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
      "Về trang chủ"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight md:text-4xl", children: "Bạn đang tìm điều gì?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Nhập triệu chứng, hoạt chất hoặc câu hỏi — hệ thống sẽ gợi ý bài viết phù hợp nhất theo nội dung." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: query, onChange: (e) => handleChange(e.target.value), placeholder: "Ví dụ: làm dịu da kích ứng sau khi dùng retinoid...", className: "w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-base shadow-sm outline-none transition-all focus:border-primary/40 focus:ring-4 focus:ring-primary/10" }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-4 top-1/2 size-5 -translate-y-1/2 animate-spin text-muted-foreground" })
    ] }),
    !query.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "py-1.5 text-sm text-muted-foreground", children: "Gợi ý:" }),
      suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleChange(s), className: "rounded-full bg-secondary px-3.5 py-1.5 text-sm text-foreground ring-1 ring-black/5 transition-colors hover:bg-muted", children: s }, s))
    ] }),
    searched && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-5 text-sm text-muted-foreground", children: results.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: results.length }),
        " kết quả"
      ] }) : "Không tìm thấy kết quả phù hợp. Thử từ khóa khác." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: results.map(({
        article,
        score
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bai-viet/$slug", params: {
        slug: article.slug
      }, className: "group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary/30 hover:bg-secondary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 shrink-0 overflow-hidden rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.thumbnail, alt: article.title, loading: "lazy", className: "size-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary", children: article.categoryName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-semibold text-foreground group-hover:text-primary", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-1 text-sm text-muted-foreground", children: article.excerpt })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden shrink-0 text-xs text-muted-foreground sm:block", children: formatDate(article.publishedAt) })
      ] }, article.id)) })
    ] })
  ] }) });
}
export {
  SearchPage as component
};
