import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, u as useRouter, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { g as getAdminToken, c as cn, a as adminLogout, b as adminLogin } from "./router-wC0kUIzv.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as Stethoscope, e as LayoutDashboard, F as FileText, f as FolderTree, E as ExternalLink, g as LogOut, h as Lock, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
const navItems = [{
  to: "/admin",
  label: "Tổng quan",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/admin/articles/new",
  label: "Viết bài mới",
  icon: FileText,
  exact: false
}, {
  to: "/admin/categories",
  label: "Danh mục",
  icon: FolderTree,
  exact: false
}];
function LoginGate({
  onSuccess
}) {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(username, password);
      toast.success("Đăng nhập thành công");
      onSuccess();
    } catch {
      setError("Sai tên đăng nhập hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };
  const inputCls = "w-full rounded-lg border border-border bg-secondary px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-4 focus:ring-primary/10";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-secondary/40 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: "Đăng nhập quản trị" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "DermaXin Admin Panel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleLogin, className: "rounded-2xl border border-border bg-card p-6 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Tên đăng nhập" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "admin-username", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "admin", autoFocus: true, autoComplete: "username", className: inputCls })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Mật khẩu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "admin-password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", autoComplete: "current-password", className: inputCls })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: loading, className: "inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60", children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-4" }),
        loading ? "Đang đăng nhập..." : "Đăng nhập"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary hover:underline", children: "← Về trang chủ" }) })
  ] }) });
}
function AdminLayout() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const router = useRouter();
  const [token, setToken] = reactExports.useState(() => getAdminToken());
  const handleLogout = () => {
    adminLogout();
    setToken(null);
    toast.success("Đã đăng xuất");
    router.navigate({
      to: "/admin"
    });
  };
  if (!token) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginGate, { onSuccess: () => setToken(getAdminToken()) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-secondary/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-card md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-2 border-b border-border px-5 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-tight text-primary", children: "DermaXin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-1 flex-col gap-1 p-3", children: navItems.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-4" }),
          item.label
        ] }, item.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-3 flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-4" }),
          "Xem website"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
          "Đăng xuất"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "font-display font-semibold text-primary", children: "DermaXin Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-muted-foreground", children: "Website" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "text-sm text-destructive", children: "Đăng xuất" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
