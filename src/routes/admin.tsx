import { Outlet, createFileRoute, Link, useRouterState, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, FileText, FolderTree, ExternalLink, Stethoscope, LogOut, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { adminLogin, adminLogout, getAdminToken } from "@/lib/api-client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Quản trị — DermaXin" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

const navItems = [
  { to: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { to: "/admin/articles/new", label: "Viết bài mới", icon: FileText, exact: false },
  { to: "/admin/categories", label: "Danh mục", icon: FolderTree, exact: false },
];

// ─── Login Form ───────────────────────────────────────────────────────────────

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
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

  const inputCls =
    "w-full rounded-lg border border-border bg-secondary px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-4 focus:ring-primary/10";

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-primary">
            <Lock className="size-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-semibold">Đăng nhập quản trị</h1>
          <p className="mt-1 text-sm text-muted-foreground">DermaXin Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Tên đăng nhập</label>
              <input
                id="admin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoFocus
                autoComplete="username"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Mật khẩu</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className={inputCls}
              />
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary hover:underline">← Về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}

// ─── Admin Sidebar ────────────────────────────────────────────────────────────

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();

  // Re-render khi token thay đổi
  const [token, setToken] = useState<string | null>(() => getAdminToken());

  const handleLogout = () => {
    adminLogout();
    setToken(null);
    toast.success("Đã đăng xuất");
    router.navigate({ to: "/admin" });
  };

  if (!token) {
    return <LoginGate onSuccess={() => setToken(getAdminToken())} />;
  }

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
        <Link to="/admin" className="flex items-center gap-2 border-b border-border px-5 py-4">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="size-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-primary">
            DermaXin
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3 flex flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="size-4" />
            Xem website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <Link to="/admin" className="font-display font-semibold text-primary">
            DermaXin Admin
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground">Website</Link>
            <button onClick={handleLogout} className="text-sm text-destructive">Đăng xuất</button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
