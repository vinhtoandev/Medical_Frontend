import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Save, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ImageUpload } from "@/components/image-upload";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  fetchCategories,
  createArticleApi,
  updateArticleApi,
} from "@/lib/api-client";
import type { Article, Category } from "@/lib/api-types";
import { useEffect } from "react";

const todayIso = () => new Date().toISOString().slice(0, 10);

// Slug helper: convert Vietnamese to ASCII slug
function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ArticleForm({ existing }: { existing?: Article }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState(existing?.title ?? "");
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "");
  const [content, setContent] = useState(existing?.content ?? "");
  const [thumbnail, setThumbnail] = useState(existing?.thumbnail ?? "");
  const [categoryId, setCategoryId] = useState<string>(
    existing ? String((existing as unknown as { categoryId?: number }).categoryId ?? "") : ""
  );
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [publishedAt] = useState(existing?.publishedAt ?? todayIso());

  // Auto-slug from title
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  // Load categories from API
  useEffect(() => {
    fetchCategories()
      .then((cats) => {
        setCategories(cats);
        if (!categoryId && cats.length > 0) setCategoryId(String(cats[0].id));
      })
      .catch(() => toast.error("Không thể tải danh mục"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Vui lòng nhập tiêu đề.");
    if (!categoryId) return toast.error("Vui lòng chọn danh mục.");

    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        summary: excerpt.trim(),
        content,
        thumbnailUrl: thumbnail,
        categoryId: Number(categoryId),
        status,
      };

      if (existing) {
        await updateArticleApi(Number(existing.id), payload);
        toast.success("Đã cập nhật bài viết", {
          description: "Embedding đã được tái tạo tự động.",
        });
      } else {
        await createArticleApi(payload);
        toast.success("Đã lưu bài viết", {
          description: "Embedding ngữ nghĩa đã được tạo.",
        });
      }
      navigate({ to: "/admin" });
    } catch (err) {
      const msg = (err as Error).message;
      if (msg === "UNAUTHORIZED") {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        navigate({ to: "/admin" });
      } else {
        toast.error("Lưu thất bại: " + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-4 focus:ring-primary/10";

  return (
    <form onSubmit={handleSubmit}>
      <Link
        to="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Quay lại
      </Link>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {existing ? "Chỉnh sửa bài viết" : "Viết bài mới"}
        </h1>
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "PUBLISHED" | "DRAFT")}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary/40"
          >
            <option value="PUBLISHED">Xuất bản</option>
            <option value="DRAFT">Nháp</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {loading ? "Đang lưu..." : existing ? "Cập nhật" : "Lưu bài viết"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="order-2 flex flex-col gap-5 lg:order-1">
          <div>
            <label className="mb-2 block text-sm font-medium">Tiêu đề</label>
            <input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Nhập tiêu đề bài viết"
              className={inputCls + " text-base font-medium"}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tóm tắt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Một câu mô tả ngắn gọn nội dung bài viết"
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Nội dung</label>
            <RichTextEditor value={content} onChange={setContent} />
            <p className="mt-2 text-xs text-muted-foreground">
              Dùng nút ảnh trên thanh công cụ để chèn ảnh — hỗ trợ nhiều ảnh.
            </p>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="order-1 flex flex-col gap-5 lg:order-2">
          <ImageUpload value={thumbnail} onChange={setThumbnail} />

          <div>
            <label className="mb-2 block text-sm font-medium">Danh mục</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={inputCls}
            >
              {categories.length === 0 && (
                <option value="">Đang tải danh mục...</option>
              )}
              {categories.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Đường dẫn (slug)</label>
            <input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              placeholder="duong-dan-bai-viet"
              className={inputCls + " font-mono text-xs"}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Slug được tự động sinh từ tiêu đề.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ảnh bìa URL</label>
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://..."
              className={inputCls + " font-mono text-xs"}
            />
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              Tìm kiếm ngữ nghĩa
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Khi lưu, hệ thống tự động gọi OpenAI tạo vector embedding cho tiêu đề
              + tóm tắt và lưu vào pgvector.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
