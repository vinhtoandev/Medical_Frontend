import { Link } from "@tanstack/react-router";
import { Search, Menu, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = (onClick?: () => void) => (
  <>
    <Link
      to="/"
      onClick={onClick}
      activeOptions={{ exact: true }}
      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0"
    >
      Bài viết
    </Link>
    <Link
      to="/danh-muc/$slug"
      params={{ slug: "benh-da-lieu" }}
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0"
    >
      Bệnh da liễu
    </Link>
    <Link
      to="/danh-muc/$slug"
      params={{ slug: "cham-soc-da" }}
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0"
    >
      Chăm sóc da
    </Link>
    <Link
      to="/danh-muc/$slug"
      params={{ slug: "my-pham-hoat-chat" }}
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary md:px-0 md:py-0"
    >
      Hoạt chất
    </Link>
  </>
);

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Stethoscope className="size-4" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-primary">
              DermaXin
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">{navItems()}</nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/tim-kiem"
            className="flex items-center gap-2 rounded-full bg-muted px-3.5 py-2 text-sm text-muted-foreground ring-1 ring-black/5 transition-colors hover:bg-secondary md:w-60 md:justify-start"
          >
            <Search className="size-4 shrink-0" />
            <span className="hidden md:inline">Tìm kiếm bài viết...</span>
          </Link>

          <Link
            to="/admin"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Quản trị
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden" aria-label="Mở menu">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {navItems(() => setOpen(false))}
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
                >
                  Quản trị
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
