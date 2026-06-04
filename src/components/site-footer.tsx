import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Stethoscope className="size-4" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-primary">
              DermaXin
            </span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Kiến thức da liễu dựa trên bằng chứng — chia sẻ thông tin chăm sóc da,
            bệnh lý và điều trị một cách chuyên nghiệp, dễ hiểu.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Nội dung chỉ mang tính tham khảo, không thay thế tư vấn y khoa.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Danh mục</h4>
          <ul className="space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link
                  to="/danh-muc/$slug"
                  params={{ slug: c.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Liên kết</h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/tim-kiem" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Tìm kiếm
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Trang quản trị
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} DermaXin. Kiến thức da liễu cho cộng đồng.
        </div>
      </div>
    </footer>
  );
}
