import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { R as Root, b as Trigger, P as Portal, C as Content, a as Close, O as Overlay, T as Title, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Sparkles, U as Upload, L as LoaderCircle, C as CircleAlert, B as Bot, a as User, b as Send, c as Stethoscope, d as Search, M as Menu, X } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
const appCss = "/assets/styles-l9lyJQHc.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DermaXin — Kiến thức da liễu dựa trên bằng chứng" },
      { name: "description", content: "Bài viết về da liễu, chăm sóc da, bệnh lý da, điều trị và kiến thức y khoa, biên soạn chuyên nghiệp." },
      { name: "author", content: "DermaXin" },
      { property: "og:title", content: "DermaXin — Kiến thức da liễu" },
      { property: "og:description", content: "Kiến thức da liễu dựa trên bằng chứng cho cộng đồng." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,400..600;1,14..32,400..600&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "vi", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" })
  ] });
}
const $$splitComponentImporter$8 = () => import("./tim-kiem-BBJHRP5i.mjs");
const Route$9 = createFileRoute("/tim-kiem")({
  head: () => ({
    meta: [{
      title: "Tìm kiếm bài viết — DermaXin"
    }, {
      name: "description",
      content: "Tìm kiếm bài viết da liễu theo ngữ nghĩa: nhập triệu chứng, hoạt chất hoặc câu hỏi."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const navItems = (onClick) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/",
      onClick,
      activeOptions: { exact: true },
      className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0",
      children: "Bài viết"
    }
  ),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/kiem-tra",
      onClick,
      className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0",
      children: "Nhận diện"
    }
  ),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/danh-muc/$slug",
      params: { slug: "benh-da-lieu" },
      onClick,
      className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0",
      children: "Bệnh da liễu"
    }
  ),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/danh-muc/$slug",
      params: { slug: "cham-soc-da" },
      onClick,
      className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0",
      children: "Chăm sóc da"
    }
  ),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/danh-muc/$slug",
      params: { slug: "my-pham-hoat-chat" },
      onClick,
      className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0",
      children: "Hoạt chất"
    }
  )
] });
function SiteHeader() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-semibold tracking-tight text-primary", children: "DermaXin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-6 md:flex", children: navItems() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/tim-kiem",
          className: "flex items-center gap-2 rounded-full bg-muted px-3.5 py-2 text-sm text-muted-foreground ring-1 ring-black/5 transition-colors hover:bg-secondary md:w-60 md:justify-start",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline", children: "Tìm kiếm bài viết..." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { className: "md:hidden", "aria-label": "Mở menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "right", className: "w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-1", children: [
          navItems(() => setOpen(false)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin",
              onClick: () => setOpen(false),
              className: "mt-2 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground",
              children: "Quản trị"
            }
          )
        ] }) })
      ] })
    ] })
  ] }) });
}
const FALLBACK_THUMBNAIL = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80";
function estimateReadingMinutes(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
function adaptArticle(dto) {
  return {
    id: String(dto.id),
    title: dto.title,
    slug: dto.slug,
    excerpt: dto.summary,
    content: dto.content,
    thumbnail: dto.thumbnailUrl || FALLBACK_THUMBNAIL,
    categorySlug: dto.category?.slug ?? "",
    categoryName: dto.category?.name,
    publishedAt: dto.publishedAt,
    author: "Chuyên gia da liễu",
    readingMinutes: estimateReadingMinutes(dto.content ?? ""),
    viewCount: dto.viewCount
  };
}
function adaptCategory(dto) {
  return {
    id: String(dto.id),
    name: dto.name,
    slug: dto.slug,
    description: dto.description
  };
}
const BASE_URL = "http://13.213.84.135:8081";
async function apiFetch(path, init) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  const json = await res.json();
  return json.data;
}
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
async function fetchCategories() {
  const data = await apiFetch("/api/categories");
  return data.map(adaptCategory);
}
async function fetchCategoryBySlug(slug) {
  const data = await apiFetch(`/api/categories/slug/${slug}`);
  return adaptCategory(data);
}
async function fetchArticles(opts) {
  const params = new URLSearchParams();
  params.set("page", String(opts.page ?? 0));
  params.set("size", String(opts.size ?? 10));
  if (opts.categoryId) params.set("categoryId", String(opts.categoryId));
  if (opts.sortBy) params.set("sortBy", opts.sortBy);
  const data = await apiFetch(
    `/api/articles?${params}`
  );
  return {
    articles: data.content.map(adaptArticle),
    totalPages: data.totalPages,
    totalElements: data.totalElements,
    currentPage: data.number
  };
}
async function fetchArticleBySlug(slug) {
  const data = await apiFetch(`/api/articles/slug/${slug}`);
  return adaptArticle(data);
}
async function fetchRelatedArticles(id, limit = 4) {
  const data = await apiFetch(
    `/api/articles/${id}/related?limit=${limit}`
  );
  return data.map(adaptArticle);
}
async function searchArticlesSemantic(query, limit = 10) {
  const params = new URLSearchParams({ query, limit: String(limit) });
  const data = await apiFetch(`/api/search/semantic?${params}`);
  return data.map((dto) => ({
    article: adaptArticle(dto),
    score: dto.relevanceScore ?? 0.9
  }));
}
const TOKEN_KEY = "derma_admin_token";
function getAdminToken() {
  return typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null;
}
function setAdminToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}
function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}
async function adminFetch(path, init) {
  const token = getAdminToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...token ? { Authorization: `Bearer ${token}` } : {},
      ...init?.headers
    },
    ...init
  });
  if (res.status === 401) {
    clearAdminToken();
    throw new Error("UNAUTHORIZED");
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || path}`);
  }
  const json = await res.json();
  return json.data;
}
async function adminLogin(username, password) {
  const result = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
  setAdminToken(result.accessToken);
  return result;
}
function adminLogout() {
  clearAdminToken();
}
async function createArticleApi(payload) {
  return adminFetch("/api/articles", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
async function updateArticleApi(id, payload) {
  return adminFetch(`/api/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
async function deleteArticleApi(id) {
  await adminFetch(`/api/articles/${id}`, { method: "DELETE" });
}
async function uploadImageApi(file) {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/api/uploads/image`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData
  });
  if (res.status === 401) {
    clearAdminToken();
    throw new Error("UNAUTHORIZED");
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upload failed ${res.status}: ${text}`);
  }
  const json = await res.json();
  return json.data.url;
}
async function fetchArticleById(id) {
  const data = await apiFetch(`/api/articles/${id}`);
  return adaptArticle(data);
}
async function createCategoryApi(payload) {
  const data = await adminFetch("/api/categories", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return adaptCategory(data);
}
async function updateCategoryApi(id, payload) {
  const data = await adminFetch(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
  return adaptCategory(data);
}
async function deleteCategoryApi(id) {
  await adminFetch(`/api/categories/${id}`, { method: "DELETE" });
}
function SiteFooter() {
  const [categories, setCategories] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchCategories().then((cats) => setCategories(cats)).catch(() => {
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border bg-secondary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-tight text-primary", children: "DermaXin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Kiến thức da liễu dựa trên bằng chứng — chia sẻ thông tin chăm sóc da, bệnh lý và điều trị một cách chuyên nghiệp, dễ hiểu." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Nội dung chỉ mang tính tham khảo, không thay thế tư vấn y khoa." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4 text-sm font-semibold text-foreground", children: "Danh mục" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: categories.slice(0, 5).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/danh-muc/$slug",
            params: { slug: c.slug },
            className: "text-sm text-muted-foreground transition-colors hover:text-primary",
            children: c.name
          }
        ) }, c.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4 text-sm font-semibold text-foreground", children: "Liên kết" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tim-kiem", className: "text-sm text-muted-foreground transition-colors hover:text-primary", children: "Tìm kiếm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "text-sm text-muted-foreground transition-colors hover:text-primary", children: "Trang quản trị" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " DermaXin. Kiến thức da liễu cho cộng đồng."
    ] }) })
  ] });
}
function SiteShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
const DEFAULT_MESSAGES = [
  {
    id: "welcome",
    role: "bot",
    text: "Chào bạn! Tôi là trợ lý AI. Tôi có thể giúp bạn giải thích các kết quả dự đoán và trả lời các câu hỏi về da liễu."
  }
];
const DEFAULT_API_BASE$1 = "http://54.179.77.51:5000";
function Chatbot({ apiBase = DEFAULT_API_BASE$1 }) {
  const [messages, setMessages] = reactExports.useState(DEFAULT_MESSAGES);
  const [draft, setDraft] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const messagesEndRef = reactExports.useRef(null);
  const chatUrl = reactExports.useMemo(() => `${apiBase}/chat`, [apiBase]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  reactExports.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isLoading) return;
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const userMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      text,
      timestamp: nowIso
    };
    const history = [...messages, userMessage].filter((message) => message.role === "user").map((message) => ({
      role: "user",
      content: message.text,
      timestamp: message.timestamp || nowIso
    }));
    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(chatUrl, {
        method: "POST",
        credentials: "omit",
        // usually omit or include based on CORS setup
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: text, history })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Lỗi khi gọi chatbot");
      }
      const botMessage = {
        id: `${Date.now()}-bot`,
        role: "bot",
        text: payload?.answer || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot-error`,
          role: "bot",
          text: `Lỗi: ${message}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[600px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border bg-secondary/30 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Trợ lý Da liễu AI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Luôn sẵn sàng hỗ trợ" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
      messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex w-full gap-3",
            message.role === "user" ? "flex-row-reverse" : "flex-row"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                ),
                children: message.role === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                  message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : message.id.includes("error") ? "bg-destructive/10 text-destructive rounded-tl-sm border border-destructive/20" : "bg-secondary text-secondary-foreground rounded-tl-sm"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap leading-relaxed", children: message.text })
              }
            )
          ]
        },
        message.id
      )),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex max-w-[80%] items-center rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "flex items-center gap-2 overflow-hidden rounded-full border border-input bg-background pl-4 pr-1 focus-within:ring-1 focus-within:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                className: "flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground",
                placeholder: "Nhập câu hỏi của bạn...",
                value: draft,
                onChange: (e) => setDraft(e.target.value),
                disabled: isLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                disabled: !draft.trim() || isLoading,
                className: "flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Gửi" })
                ]
              }
            )
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex items-center gap-1 px-2 text-xs text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-3" }),
        error
      ] })
    ] })
  ] });
}
const Route$8 = createFileRoute("/kiem-tra")({
  head: () => ({
    meta: [
      { title: "Kiểm tra tổn thương da | DermaXin" },
      {
        name: "description",
        content: "Phân tích ảnh da liễu với AI model."
      }
    ]
  }),
  component: PredictPage
});
const DEFAULT_API_BASE = "http://54.179.77.51:5000";
const SEX_OPTIONS = [
  { value: "female", label: "Nữ" },
  { value: "male", label: "Nam" },
  { value: "unknown", label: "Không rõ" }
];
const LOCALIZATION_OPTIONS = [
  { value: "abdomen", label: "Bụng" },
  { value: "acral", label: "Chi (bàn tay, bàn chân)" },
  { value: "back", label: "Lưng" },
  { value: "chest", label: "Ngực" },
  { value: "ear", label: "Tai" },
  { value: "face", label: "Mặt" },
  { value: "foot", label: "Bàn chân" },
  { value: "genital", label: "Sinh dục" },
  { value: "hand", label: "Bàn tay" },
  { value: "lower extremity", label: "Chi dưới" },
  { value: "neck", label: "Cổ" },
  { value: "scalp", label: "Da đầu" },
  { value: "trunk", label: "Thân mình" },
  { value: "unknown", label: "Không rõ" },
  { value: "upper extremity", label: "Chi trên" }
];
function formatPercent(value) {
  if (typeof value !== "number") return "N/A";
  return `${(value * 100).toFixed(1)}%`;
}
function buildMaskSrc(maskBase64) {
  if (!maskBase64) return null;
  return `data:image/png;base64,${maskBase64}`;
}
function PredictPage() {
  const [file, setFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [sex, setSex] = reactExports.useState("");
  const [localization, setLocalization] = reactExports.useState("");
  const [age, setAge] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const apiBase = DEFAULT_API_BASE;
  const maskSrc = reactExports.useMemo(() => buildMaskSrc(result?.overlay_base64), [result]);
  const handleFileChange = (event) => {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
    setResult(null);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
      return;
    }
    setPreviewUrl("");
  };
  const handleClear = () => {
    setFile(null);
    setPreviewUrl("");
    setResult(null);
    setSex("");
    setLocalization("");
    setAge("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || isLoading) return;
    if (!sex || !localization || !age) {
      toast.error("Vui lòng điền đầy đủ giới tính, vị trí và tuổi.");
      return;
    }
    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 100) {
      toast.error("Tuổi phải là số nguyên từ 1 đến 100.");
      return;
    }
    setIsLoading(true);
    setResult(null);
    const toastId = toast.loading("Đang phân tích ảnh...");
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("sex", sex);
      formData.append("localization", localization);
      formData.append("age", String(parsedAge));
      const response = await fetch(`${apiBase}/predict`, {
        method: "POST",
        body: formData
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Phân tích thất bại");
      }
      setResult(payload);
      toast.success("Phân tích hoàn tất", { id: toastId });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Lỗi không xác định";
      toast.error(msg, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-12 max-w-3xl animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
        "Skin Insight Lab"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-semibold tracking-tight md:text-5xl", children: "Kiểm tra tổn thương da bằng AI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Tải lên ảnh vùng da bị tổn thương rõ nét và chạy mô hình dự đoán nhanh để biết thêm thông tin tham khảo." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-fade-up", style: { animationDelay: "100ms" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Tải ảnh lên" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Giới tính" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: sex,
                    onChange: (e) => setSex(e.target.value),
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Chọn giới tính" }),
                      SEX_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Vị trí" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: localization,
                    onChange: (e) => setLocalization(e.target.value),
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Chọn vị trí" }),
                      LOCALIZATION_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Độ tuổi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 100,
                    value: age,
                    onChange: (e) => setAge(e.target.value),
                    placeholder: "1-100",
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-secondary/30 p-8 transition-colors hover:border-primary/40 hover:bg-secondary/50",
              file ? "border-primary/40 bg-primary/5" : "border-border"
            ), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-8 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: file ? file.name : "Chọn hoặc kéo thả ảnh da" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Định dạng JPG, PNG, WEBP (Tối đa 10MB)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  onChange: handleFileChange,
                  className: "hidden"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Ảnh gốc" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden rounded-xl border border-border bg-muted", children: previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "Preview", className: "size-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-full items-center justify-center text-sm text-muted-foreground", children: "Chưa có ảnh" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Ảnh phân tích (Mask)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden rounded-xl border border-border bg-muted", children: maskSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: maskSrc, alt: "Mask", className: "size-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-full items-center justify-center text-sm text-muted-foreground", children: "Sẽ xuất hiện sau khi phân tích" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "submit",
                  disabled: !file || isLoading,
                  className: "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50",
                  children: [
                    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }),
                    isLoading ? "Đang xử lý..." : "Bắt đầu dự đoán"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClear,
                  disabled: !file && !result,
                  className: "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/80 disabled:pointer-events-none disabled:opacity-50",
                  children: "Xóa làm lại"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-6", children: "Kết quả" }),
          result ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultItem, { label: "Tình trạng", value: result.stage || "Unknown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultItem, { label: "Có tổn thương", value: result.has_lesion ? "Có" : "Không" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultItem, { label: "Nhận dạng da", value: result.is_skin ? "Có" : "Không" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultItem, { label: "Loại bệnh", value: result.lesion_class || "N/A", highlight: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultItem, { label: "Độ tin cậy", value: formatPercent(result.confidence), highlight: true })
            ] }),
            result.message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-accent/10 p-4 text-sm text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-4 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: result.message })
            ] }) }),
            Array.isArray(result.top_predictions) && result.top_predictions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-sm font-medium text-muted-foreground", children: "Top dự đoán:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: result.top_predictions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-secondary/40 p-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.class }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: formatPercent(item.confidence) })
              ] }, item.class)) })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Chạy dự đoán để xem kết quả tại đây." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fade-up", style: { animationDelay: "200ms" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chatbot, { apiBase }) }) })
    ] })
  ] }) });
}
function ResultItem({ label, value, highlight }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
    "flex flex-col gap-1 rounded-xl border p-4",
    highlight ? "border-primary/20 bg-primary/5" : "border-border bg-card"
  ), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: cn(
      "text-lg font-semibold",
      highlight ? "text-primary" : "text-foreground"
    ), children: value })
  ] });
}
const $$splitComponentImporter$7 = () => import("./admin-DZpxag_p.mjs");
const Route$7 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Quản trị — DermaXin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-D8dT3q3t.mjs");
const Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "DermaXin — Kiến thức da liễu dựa trên bằng chứng"
    }, {
      name: "description",
      content: "Bài viết về da liễu, chăm sóc da, bệnh lý da, điều trị và kiến thức y khoa được biên soạn chuyên nghiệp, dễ hiểu."
    }, {
      property: "og:title",
      content: "DermaXin — Kiến thức da liễu"
    }, {
      property: "og:description",
      content: "Kiến thức da liễu dựa trên bằng chứng cho cộng đồng."
    }]
  }),
  loader: async () => {
    const [articlesData, categories] = await Promise.all([fetchArticles({
      page: 0,
      size: 7
    }), fetchCategories()]);
    return {
      articlesData,
      categories
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.index-Bc4Pmo_R.mjs");
const Route$5 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./danh-muc._slug-BcWzXxJa.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./danh-muc._slug-DSxcsVHm.mjs");
const Route$4 = createFileRoute("/danh-muc/$slug")({
  loader: async ({
    params
  }) => {
    try {
      const [category, allCategories, articlesData] = await Promise.all([
        fetchCategoryBySlug(params.slug),
        fetchCategories(),
        // We'll fetch articles by categoryId after getting category
        fetchCategoryBySlug(params.slug).then((cat) => fetchArticles({
          page: 0,
          size: 6,
          categoryId: cat.id
        }))
      ]);
      return {
        category,
        allCategories,
        articlesData
      };
    } catch {
      throw notFound();
    }
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData?.category?.name ?? "Danh mục"} — DermaXin`
    }, {
      name: "description",
      content: `Các bài viết da liễu thuộc danh mục ${loaderData?.category?.name ?? ""}.`
    }, {
      property: "og:title",
      content: `${loaderData?.category?.name ?? ""} — DermaXin`
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./bai-viet._slug-BYfWbESC.mjs");
const $$splitNotFoundComponentImporter = () => import("./bai-viet._slug-BT-oj5fJ.mjs");
const Route$3 = createFileRoute("/bai-viet/$slug")({
  loader: async ({
    params
  }) => {
    try {
      const article = await fetchArticleBySlug(params.slug);
      const related = await fetchRelatedArticles(article.id, 4);
      return {
        article,
        related
      };
    } catch {
      throw notFound();
    }
  },
  head: ({
    loaderData
  }) => {
    const a = loaderData?.article;
    return {
      meta: [{
        title: a ? `${a.title} — DermaXin` : "Bài viết — DermaXin"
      }, {
        name: "description",
        content: a?.excerpt ?? ""
      }, {
        property: "og:title",
        content: a?.title ?? ""
      }, {
        property: "og:description",
        content: a?.excerpt ?? ""
      }, {
        property: "og:type",
        content: "article"
      }, ...a?.thumbnail ? [{
        property: "og:image",
        content: a.thumbnail
      }] : []]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.categories-BtHM68Yr.mjs");
const Route$2 = createFileRoute("/admin/categories")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.articles.new-BSx54Fvy.mjs");
const Route$1 = createFileRoute("/admin/articles/new")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitErrorComponentImporter = () => import("./admin.articles._id-v_bmRffQ.mjs");
const $$splitComponentImporter = () => import("./admin.articles._id-DnAzI4rL.mjs");
const Route = createFileRoute("/admin/articles/$id")({
  loader: async ({
    params
  }) => {
    const article = await fetchArticleById(Number(params.id));
    return {
      article
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const TimKiemRoute = Route$9.update({
  id: "/tim-kiem",
  path: "/tim-kiem",
  getParentRoute: () => Route$a
});
const KiemTraRoute = Route$8.update({
  id: "/kiem-tra",
  path: "/kiem-tra",
  getParentRoute: () => Route$a
});
const AdminRoute = Route$7.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const AdminIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const DanhMucSlugRoute = Route$4.update({
  id: "/danh-muc/$slug",
  path: "/danh-muc/$slug",
  getParentRoute: () => Route$a
});
const BaiVietSlugRoute = Route$3.update({
  id: "/bai-viet/$slug",
  path: "/bai-viet/$slug",
  getParentRoute: () => Route$a
});
const AdminCategoriesRoute = Route$2.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => AdminRoute
});
const AdminArticlesNewRoute = Route$1.update({
  id: "/articles/new",
  path: "/articles/new",
  getParentRoute: () => AdminRoute
});
const AdminArticlesIdRoute = Route.update({
  id: "/articles/$id",
  path: "/articles/$id",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminCategoriesRoute,
  AdminIndexRoute,
  AdminArticlesIdRoute,
  AdminArticlesNewRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  KiemTraRoute,
  TimKiemRoute,
  BaiVietSlugRoute,
  DanhMucSlugRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$6 as R,
  SiteShell as S,
  adminLogout as a,
  adminLogin as b,
  cn as c,
  fetchArticles as d,
  fetchCategories as e,
  formatDate as f,
  getAdminToken as g,
  deleteArticleApi as h,
  Route$4 as i,
  Route$3 as j,
  createCategoryApi as k,
  deleteCategoryApi as l,
  Route as m,
  uploadImageApi as n,
  updateArticleApi as o,
  createArticleApi as p,
  router as r,
  searchArticlesSemantic as s,
  updateCategoryApi as u
};
