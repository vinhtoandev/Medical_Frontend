import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Save, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ImageUpload } from "@/components/image-upload";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  useCategories,
  createArticle,
  updateArticle,
  slugify,
  type ArticleInput,
} from "@/lib/admin-store";
import type { Article } from "@/lib/mock-data";

const todayIso = () => new Date().toISOString().slice(0, 10);

export function ArticleForm({ existing }: { existing?: Article }) {
  const navigate = useNavigate();
  const categories = useCategories();

  const [title, setTitle] = useState(existing?.title ?? "");
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "");
  const [content, setContent] = useState(existing?.content ?? "");
  const [thumbnail, setThumbnail] = useState(existing?.thumbnail ?? "");
  const [categorySlug, setCategorySlug] = useState(
    existing?.categorySlug ?? categories[0]?.slug ?? "",
  );
  const [author, setAuthor] = useState(existing?.author ?? "Ban biên tập");
  const [readingMinutes, setReadingMinutes] = useState(
    existing?.readingMinutes ?? 5,
  );
  const [publishedAt, setPublishedAt] = useState(
    existing?.publishedAt ?? todayIso(),
  );

  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Vui lòng nhập tiêu đề.");
    if (!categorySlug) return toast.error("Vui lòng chọn danh mục.");

    const input: ArticleInput = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      excerpt: excerpt.trim(),
      content,
      thumbnail,
      categorySlug,
      author: author.trim() || "Ban biên tập",
      readingMinutes: Number(readingMinutes) || 5,
      publishedAt,
    };

    if (existing) {
      updateArticle(existing.id, input);
    } else {
      createArticle(input);
    }

    // Mimic the backend behaviour: embedding is generated on save.
    toast.success(
      existing ? "Đã cập nhật bài viết" : "Đã lưu bài viết",
      { description: "Đã tạo embedding tiêu đề cho tìm kiếm ngữ nghĩa." },
    );
    navigate({ to: "/admin" });
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
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Save className="size-4" />
          {existing ? "Cập nhật" : "Lưu bài viết"}
        </button>
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
              Dùng nút ảnh trên thanh công cụ để chèn ảnh ở đầu, giữa hoặc cuối
              bài — hỗ trợ nhiều ảnh.
            </p>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="order-1 flex flex-col gap-5 lg:order-2">
          <ImageUpload value={thumbnail} onChange={setThumbnail} />

          <div>
            <label className="mb-2 block text-sm font-medium">Danh mục</label>
            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className={inputCls}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Ngày đăng</label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Phút đọc</label>
              <input
                type="number"
                min={1}
                value={readingMinutes}
                onChange={(e) => setReadingMinutes(Number(e.target.value))}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tác giả</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              Tìm kiếm ngữ nghĩa
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Khi lưu, hệ thống sẽ tự động tạo embedding cho tiêu đề và lưu vào
              pgvector để phục vụ tìm kiếm tương đồng.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
