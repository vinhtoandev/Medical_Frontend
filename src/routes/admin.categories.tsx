import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
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
  useCategories,
  useArticles,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const categories = useCategories();
  const articles = useArticles();

  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [toDelete, setToDelete] = useState<{ id: string; name: string } | null>(
    null,
  );

  const countFor = (slug: string) =>
    articles.filter((a) => a.categorySlug === slug).length;

  const inputCls =
    "rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-4 focus:ring-primary/10";

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createCategory(newName.trim());
    setNewName("");
    toast.success("Đã thêm danh mục");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Danh mục
        </h1>
        <p className="mt-1 text-muted-foreground">
          Thêm, sửa, xóa danh mục bài viết.
        </p>
      </div>

      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Tên danh mục mới"
          className={inputCls + " flex-1"}
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Thêm
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <ul className="divide-y divide-border">
          {categories.map((c) => {
            const editing = editId === c.id;
            return (
              <li key={c.id} className="flex items-center gap-3 px-4 py-3">
                {editing ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                      className={inputCls + " flex-1"}
                    />
                    <button
                      onClick={() => {
                        if (editName.trim()) {
                          updateCategory(c.id, editName.trim());
                          toast.success("Đã cập nhật");
                        }
                        setEditId(null);
                      }}
                      className="grid size-9 place-items-center rounded-md text-primary transition-colors hover:bg-primary/10"
                      title="Lưu"
                    >
                      <Check className="size-4" />
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
                      title="Hủy"
                    >
                      <X className="size-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium">{c.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">/{c.slug}</p>
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                      {countFor(c.slug)} bài
                    </span>
                    <button
                      onClick={() => {
                        setEditId(c.id);
                        setEditName(c.name);
                      }}
                      className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      title="Sửa"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => setToDelete({ id: c.id, name: c.name })}
                      className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      title="Xóa"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa danh mục?</AlertDialogTitle>
            <AlertDialogDescription>
              Danh mục “{toDelete?.name}” sẽ bị xóa. Các bài viết thuộc danh mục
              này sẽ không còn được gắn danh mục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (toDelete) {
                  deleteCategory(toDelete.id);
                  toast.success("Đã xóa danh mục");
                }
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
