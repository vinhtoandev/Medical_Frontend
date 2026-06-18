import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Cd-Y-4Nh.mjs";
import { e as fetchCategories, k as createCategoryApi, u as updateCategoryApi, l as deleteCategoryApi } from "./router-wC0kUIzv.mjs";
import { R as RefreshCw, L as LoaderCircle, P as Plus, q as Check, X, k as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
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
import "./button-DIjToSax.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tailwind-merge.mjs";
function AdminCategories() {
  const [categories, setCategories] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [editId, setEditId] = reactExports.useState(null);
  const [editName, setEditName] = reactExports.useState("");
  const [toDelete, setToDelete] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(false);
  const loadCategories = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch {
      toast.error("Không thể tải danh mục.");
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      await createCategoryApi({
        name: newName.trim()
      });
      setNewName("");
      toast.success("Đã thêm danh mục");
      loadCategories();
    } catch {
      toast.error("Thêm danh mục thất bại.");
    } finally {
      setSaving(false);
    }
  };
  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      await updateCategoryApi(Number(id), {
        name: editName.trim()
      });
      setEditId(null);
      toast.success("Đã cập nhật danh mục");
      loadCategories();
    } catch {
      toast.error("Cập nhật thất bại.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteCategoryApi(toDelete.id);
      toast.success(`Đã xóa danh mục "${toDelete.name}"`);
      setToDelete(null);
      loadCategories();
    } catch {
      toast.error("Xóa danh mục thất bại.");
    } finally {
      setDeleting(false);
    }
  };
  const inputCls = "rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-4 focus:ring-primary/10";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Danh mục" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Thêm, sửa, xóa danh mục bài viết." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: loadCategories, disabled: loading, className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }),
        "Làm mới"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdd, className: "mb-6 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newName, onChange: (e) => setNewName(e.target.value), placeholder: "Tên danh mục mới", className: inputCls + " flex-1", disabled: saving }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: saving || !newName.trim(), className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
        "Thêm"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Đang tải..." })
    ] }) : categories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "Chưa có danh mục nào." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: categories.map((c) => {
      const editing = editId === String(c.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-3 px-4 py-3", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editName, onChange: (e) => setEditName(e.target.value), autoFocus: true, disabled: saving, className: inputCls + " flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleUpdate(String(c.id)), disabled: saving, className: "grid size-9 place-items-center rounded-md text-primary transition-colors hover:bg-primary/10 disabled:opacity-50", title: "Lưu", children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditId(null), disabled: saving, className: "grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted", title: "Hủy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
            "/",
            c.slug
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setEditId(String(c.id));
          setEditName(c.name);
        }, className: "grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", title: "Sửa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setToDelete({
          id: Number(c.id),
          name: c.name
        }), className: "grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive", title: "Xóa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
      ] }) }, c.id);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!toDelete, onOpenChange: (o) => !o && setToDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Xóa danh mục?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'Danh mục "',
          toDelete?.name,
          '" sẽ bị xóa. Các bài viết thuộc danh mục này sẽ không còn được gắn danh mục.'
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
  AdminCategories as component
};
