import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as fetchArticles, e as fetchCategories, f as formatDate, c as cn, h as deleteArticleApi } from "./router-wC0kUIzv.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Cd-Y-4Nh.mjs";
import { R as RefreshCw, P as Plus, F as FileText, f as FolderTree, L as LoaderCircle, j as Eye, k as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "./button-DIjToSax.mjs";
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [toDelete, setToDelete] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(false);
  const loadData = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const [articlesPage, cats] = await Promise.all([fetchArticles({
        page: 0,
        size: 100
      }), fetchCategories()]);
      setArticles(articlesPage.articles);
      setCategories(cats);
    } catch (e) {
      if (e.message === "UNAUTHORIZED") {
        router.navigate({
          to: "/admin"
        });
      } else {
        toast.error("Không thể tải dữ liệu. Kiểm tra kết nối backend.");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);
  reactExports.useEffect(() => {
    loadData();
  }, [loadData]);
  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteArticleApi(toDelete.id);
      toast.success(`Đã xóa "${toDelete.title}"`);
      setToDelete(null);
      loadData();
    } catch {
      toast.error("Xóa thất bại. Vui lòng thử lại.");
    } finally {
      setDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Tổng quan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Quản lý bài viết và danh mục da liễu." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: loadData, disabled: loading, className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }),
          "Làm mới"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/articles/new", className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
          "Viết bài mới"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 grid grid-cols-2 gap-4 sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-semibold", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-8 w-10 animate-pulse rounded bg-muted" }) : articles.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Bài viết" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/categories", className: "rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderTree, { className: "size-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-semibold", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-8 w-10 animate-pulse rounded bg-muted" }) : categories.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Danh mục" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Đang tải bài viết..." })
    ] }) : articles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center text-sm text-muted-foreground", children: [
      "Chưa có bài viết nào.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles/new", className: "text-primary hover:underline", children: "Viết bài đầu tiên" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[45%]", children: "Bài viết" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden sm:table-cell", children: "Danh mục" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Ngày đăng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Thao tác" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: articles.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-11 shrink-0 overflow-hidden rounded-lg bg-muted", children: a.thumbnail && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.thumbnail, alt: "", className: "size-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 font-medium", children: a.title })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground", children: a.categoryName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden text-sm text-muted-foreground md:table-cell", children: formatDate(a.publishedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bai-viet/$slug", params: {
            slug: a.slug
          }, className: "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", title: "Xem", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles/$id", params: {
            id: String(a.id)
          }, className: "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", title: "Sửa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setToDelete({
            id: Number(a.id),
            title: a.title
          }), className: "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive", title: "Xóa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
        ] }) })
      ] }, a.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!toDelete, onOpenChange: (o) => !o && setToDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Xóa bài viết?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'Hành động này không thể hoàn tác. Bài viết "',
          toDelete?.title,
          '" sẽ bị xóa vĩnh viễn.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleting, children: "Hủy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: handleDelete, disabled: deleting, children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 size-3.5 animate-spin" }),
          " Đang xóa..."
        ] }) : "Xóa" })
      ] })
    ] }) })
  ] });
}
export {
  AdminDashboard as component
};
