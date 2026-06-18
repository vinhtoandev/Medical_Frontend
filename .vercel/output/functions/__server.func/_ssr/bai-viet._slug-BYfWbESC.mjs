import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as Route$3, S as SiteShell, f as formatDate } from "./router-wC0kUIzv.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft, n as CalendarDays, o as Clock, p as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function ArticlePage() {
  const {
    article,
    related
  } = Route$3.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-3xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
      "Tất cả bài viết"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-wrap items-center gap-3", children: [
        article.categorySlug && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/danh-muc/$slug", params: {
          slug: article.categorySlug
        }, className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/15", children: article.categoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
          formatDate(article.publishedAt)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-balance font-display text-4xl font-semibold leading-tight tracking-tight", children: article.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: article.author }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
          article.readingMinutes,
          " phút đọc"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5" }),
          "Đã kiểm duyệt y khoa"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-muted outline outline-1 -outline-offset-1 outline-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.thumbnail, alt: article.title, width: 1200, height: 675, className: "size-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article-prose", dangerouslySetInnerHTML: {
      __html: article.content
    } }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-20 border-t border-border pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-8 font-display text-2xl font-semibold", children: "Bài viết liên quan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 lg:grid-cols-4", children: related.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bai-viet/$slug", params: {
        slug: r.slug
      }, className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted outline outline-1 -outline-offset-1 outline-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.thumbnail, alt: r.title, loading: "lazy", className: "size-full object-cover transition-transform duration-500 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary", children: r.categoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium leading-snug decoration-border underline-offset-4 group-hover:underline", children: r.title })
      ] }, r.id)) })
    ] })
  ] }) });
}
export {
  ArticlePage as component
};
