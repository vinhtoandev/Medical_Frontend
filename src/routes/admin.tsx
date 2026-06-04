import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FileText, FolderTree, ExternalLink, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

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

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

        <div className="border-t border-border p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="size-4" />
            Xem website
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <Link to="/admin" className="font-display font-semibold text-primary">
            DermaXin Admin
          </Link>
          <Link to="/" className="text-sm text-muted-foreground">
            Website
          </Link>
        </div>
        <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
