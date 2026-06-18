import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X, Loader2, RefreshCw } from "lucide-react";
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
  fetchCategories,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "@/lib/api-client";
import type { Category } from "@/lib/api-types";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [toDelete, setToDelete] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadCategories = useCallback(async () => {
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

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      await createCategoryApi({ name: newName.trim() });
      setNewName("");
      toast.success("Đã thêm danh mục");
      loadCategories();
    } catch {
      toast.error("Thêm danh mục thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      await updateCategoryApi(Number(id), { name: editName.trim() });
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

  const inputCls =
    "rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-4 focus:ring-primary/10";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Danh mục</h1>
          <p className="mt-1 text-muted-foreground">Thêm, sửa, xóa danh mục bài viết.</p>
        </div>
        <button
          onClick={loadCategories}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          Làm mới
        </button>
      </div>

      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Tên danh mục mới"
          className={inputCls + " flex-1"}
          disabled={saving}
        />
        <button
          type="submit"
          disabled={saving || !newName.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Thêm
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-sm">Đang tải...</span>
          </div>
        ) : categories.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">Chưa có danh mục nào.</p>
        ) : (
          <ul className="divide-y divide-border">
            {categories.map((c) => {
              const editing = editId === String(c.id);
              return (
                <li key={c.id} className="flex items-center gap-3 px-4 py-3">
                  {editing ? (
                    <>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        disabled={saving}
                        className={inputCls + " flex-1"}
                      />
                      <button
                        onClick={() => handleUpdate(String(c.id))}
                        disabled={saving}
                        className="grid size-9 place-items-center rounded-md text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
                        title="Lưu"
                      >
                        {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        disabled={saving}
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
                      <button
                        onClick={() => {
                          setEditId(String(c.id));
                          setEditName(c.name);
                        }}
                        className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Sửa"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => setToDelete({ id: Number(c.id), name: c.name })}
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
        )}
      </div>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa danh mục?</AlertDialogTitle>
            <AlertDialogDescription>
              Danh mục "{toDelete?.name}" sẽ bị xóa. Các bài viết thuộc danh mục
              này sẽ không còn được gắn danh mục.
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
