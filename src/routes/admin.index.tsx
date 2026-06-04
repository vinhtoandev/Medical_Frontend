import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, FileText, FolderTree, Eye } from "lucide-react";
import { useState } from "react";
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
  useArticles,
  useCategories,
  deleteArticle,
} from "@/lib/admin-store";
import { categoryBySlug, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const articles = useArticles();
  const categories = useCategories();
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(
    null,
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Tổng quan
          </h1>
          <p className="mt-1 text-muted-foreground">
            Quản lý bài viết và danh mục da liễu.
          </p>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Viết bài mới
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-2xl border border-border bg-card p-5">
          <FileText className="size-5 text-primary" />
          <p className="mt-3 text-3xl font-semibold">{articles.length}</p>
          <p className="text-sm text-muted-foreground">Bài viết</p>
        </div>
        <Link
          to="/admin/categories"
          className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
        >
          <FolderTree className="size-5 text-primary" />
          <p className="mt-3 text-3xl font-semibold">{categories.length}</p>
          <p className="text-sm text-muted-foreground">Danh mục</p>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
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
            {articles.map((a) => {
              const cat = categoryBySlug(a.categorySlug);
              return (
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
                      {cat?.name ?? "—"}
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
                        params={{ id: a.id }}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Sửa"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        onClick={() => setToDelete({ id: a.id, title: a.title })}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Xóa"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa bài viết?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bài viết “{toDelete?.title}” sẽ bị
              xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (toDelete) deleteArticle(toDelete.id);
                setToDelete(null);
              }}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
