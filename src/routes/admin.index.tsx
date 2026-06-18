import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, FileText, FolderTree, Eye, Loader2, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  fetchArticles,
  fetchCategories,
  deleteArticleApi,
  formatDate,
} from "@/lib/api-client";
import type { Article, Category } from "@/lib/api-types";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [articlesPage, cats] = await Promise.all([
        fetchArticles({ page: 0, size: 100 }),
        fetchCategories(),
      ]);
      setArticles(articlesPage.articles);
      setCategories(cats);
    } catch (e) {
      if ((e as Error).message === "UNAUTHORIZED") {
        router.navigate({ to: "/admin" });
      } else {
        toast.error("Không thể tải dữ liệu. Kiểm tra kết nối backend.");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
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

  const categoryName = (categoryId: number) =>
    categories.find((c) => Number(c.id) === categoryId)?.name ?? "—";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Tổng quan</h1>
          <p className="mt-1 text-muted-foreground">Quản lý bài viết và danh mục da liễu.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </button>
          <Link
            to="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            Viết bài mới
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-2xl border border-border bg-card p-5">
          <FileText className="size-5 text-primary" />
          <p className="mt-3 text-3xl font-semibold">
            {loading ? <span className="inline-block h-8 w-10 animate-pulse rounded bg-muted" /> : articles.length}
          </p>
          <p className="text-sm text-muted-foreground">Bài viết</p>
        </div>
        <Link
          to="/admin/categories"
          className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
        >
          <FolderTree className="size-5 text-primary" />
          <p className="mt-3 text-3xl font-semibold">
            {loading ? <span className="inline-block h-8 w-10 animate-pulse rounded bg-muted" /> : categories.length}
          </p>
          <p className="text-sm text-muted-foreground">Danh mục</p>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-sm">Đang tải bài viết...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            Chưa có bài viết nào.{" "}
            <Link to="/admin/articles/new" className="text-primary hover:underline">Viết bài đầu tiên</Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[45%]">Bài viết</TableHead>
                <TableHead className="hidden sm:table-cell">Danh mục</TableHead>
                <TableHead className="hidden md:table-cell">Ngày đăng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {a.thumbnail && (
                          <img src={a.thumbnail} alt="" className="size-full object-cover" />
                        )}
                      </div>
                      <span className="line-clamp-2 font-medium">{a.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                      {a.categoryName}
                    </span>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {formatDate(a.publishedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to="/bai-viet/$slug"
                        params={{ slug: a.slug }}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Xem"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <Link
                        to="/admin/articles/$id"
                        params={{ id: String(a.id) }}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Sửa"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        onClick={() => setToDelete({ id: Number(a.id), title: a.title })}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Xóa"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Delete confirm */}
      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa bài viết?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bài viết "{toDelete?.title}" sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <><Loader2 className="mr-1.5 size-3.5 animate-spin" /> Đang xóa...</> : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
