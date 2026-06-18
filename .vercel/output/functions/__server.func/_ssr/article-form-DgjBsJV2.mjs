import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { e as fetchCategories, o as updateArticleApi, p as createArticleApi, c as cn, n as uploadImageApi } from "./router-wC0kUIzv.mjs";
import { u as useEditor, E as EditorContent } from "../_libs/tiptap__react.mjs";
import { i as index_default } from "../_libs/tiptap__starter-kit.mjs";
import { i as index_default$1 } from "../_libs/tiptap__extension-image.mjs";
import { i as index_default$2 } from "../_libs/tiptap__extension-link.mjs";
import { i as index_default$3 } from "../_libs/tiptap__extension-placeholder.mjs";
import { A as ArrowLeft, L as LoaderCircle, r as Save, S as Sparkles, s as Bold, I as Italic, H as Heading2, t as Heading3, u as List, v as ListOrdered, Q as Quote, w as Link2, x as ImagePlus, y as Undo, z as Redo, X } from "../_libs/lucide-react.mjs";
function ImageUpload({
  value,
  onChange,
  label = "Ảnh đại diện"
}) {
  const [uploading, setUploading] = reactExports.useState(false);
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const toastId = toast.loading("Đang tải ảnh bìa lên...");
    try {
      const url = await uploadImageApi(file);
      onChange(url);
      toast.success("Tải ảnh bìa thành công", { id: toastId });
    } catch (err) {
      toast.error("Tải ảnh thất bại: " + err.message, { id: toastId });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-foreground", children: label }),
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "preview", className: "size-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(""),
          className: "absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground",
          "aria-label": "Xóa ảnh",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex aspect-[16/9] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary/40 ${uploading ? "pointer-events-none opacity-60" : ""}`, children: [
      uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Đang tải lên..." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "size-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Nhấn để tải ảnh lên" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: handleFile,
          disabled: uploading
        }
      )
    ] })
  ] });
}
function ToolbarButton({
  onClick,
  active,
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      title: label,
      "aria-label": label,
      className: cn(
        "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active && "bg-primary/10 text-primary"
      ),
      children
    }
  );
}
function RichTextEditor({
  value,
  onChange
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      index_default,
      index_default$1.configure({ inline: false, allowBase64: false }),
      index_default$2.configure({ openOnClick: false }),
      index_default$3.configure({ placeholder: "Soạn nội dung bài viết..." })
    ],
    content: value || "",
    onUpdate: ({ editor: editor2 }) => onChange(editor2.getHTML()),
    editorProps: {
      attributes: {
        class: "article-prose min-h-[360px] max-w-none px-4 py-4 focus:outline-none"
      }
    }
  });
  const uploadingRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor]);
  if (!editor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[420px] animate-pulse rounded-xl border border-border bg-muted/40" });
  }
  const addImageFromFile = async () => {
    if (uploadingRef.current) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      uploadingRef.current = true;
      const toastId = toast.loading("Đang tải ảnh lên...");
      try {
        const url = await uploadImageApi(file);
        editor?.chain().focus().setImage({ src: url }).run();
        toast.success("Tải ảnh thành công", { id: toastId });
      } catch (err) {
        toast.error("Tải ảnh thất bại: " + err.message, { id: toastId });
      } finally {
        uploadingRef.current = false;
      }
    };
    input.click();
  };
  const addImageFromUrl = () => {
    const url = window.prompt("Dán đường dẫn ảnh (URL):");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };
  const setLink = () => {
    const url = window.prompt("Đường dẫn liên kết:");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-0.5 border-b border-border bg-secondary/40 p-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Đậm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Nghiêng", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "Tiêu đề 2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading2, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), label: "Tiêu đề 3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading3, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Danh sách", children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Danh sách số", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), label: "Trích dẫn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: setLink, active: editor.isActive("link"), label: "Liên kết", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: addImageFromFile, label: "Tải ảnh lên", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: addImageFromUrl, label: "Ảnh từ URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "size-4 rotate-45" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().undo().run(), label: "Hoàn tác", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => editor.chain().focus().redo().run(), label: "Làm lại", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContent, { editor })
  ] });
}
const todayIso = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function slugify(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
function ArticleForm({ existing }) {
  const navigate = useNavigate();
  const [categories, setCategories] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState(existing?.title ?? "");
  const [slugTouched, setSlugTouched] = reactExports.useState(!!existing);
  const [excerpt, setExcerpt] = reactExports.useState(existing?.excerpt ?? "");
  const [content, setContent] = reactExports.useState(existing?.content ?? "");
  const [thumbnail, setThumbnail] = reactExports.useState(existing?.thumbnail ?? "");
  const [categoryId, setCategoryId] = reactExports.useState(
    existing ? String(existing.categoryId ?? "") : ""
  );
  const [status, setStatus] = reactExports.useState("PUBLISHED");
  const [publishedAt] = reactExports.useState(existing?.publishedAt ?? todayIso());
  const [slug, setSlug] = reactExports.useState(existing?.slug ?? "");
  const onTitleChange = (v) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };
  reactExports.useEffect(() => {
    fetchCategories().then((cats) => {
      setCategories(cats);
      if (!categoryId && cats.length > 0) setCategoryId(String(cats[0].id));
    }).catch(() => toast.error("Không thể tải danh mục"));
  }, []);
  const handleSubmit = async (e) => {
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
        status
      };
      if (existing) {
        await updateArticleApi(Number(existing.id), payload);
        toast.success("Đã cập nhật bài viết", {
          description: "Embedding đã được tái tạo tự động."
        });
      } else {
        await createArticleApi(payload);
        toast.success("Đã lưu bài viết", {
          description: "Embedding ngữ nghĩa đã được tạo."
        });
      }
      navigate({ to: "/admin" });
    } catch (err) {
      const msg = err.message;
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
  const inputCls = "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-4 focus:ring-primary/10";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/admin",
        className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
          "Quay lại"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: existing ? "Chỉnh sửa bài viết" : "Viết bài mới" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: status,
            onChange: (e) => setStatus(e.target.value),
            className: "rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PUBLISHED", children: "Xuất bản" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "DRAFT", children: "Nháp" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
            children: [
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
              loading ? "Đang lưu..." : existing ? "Cập nhật" : "Lưu bài viết"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 flex flex-col gap-5 lg:order-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium", children: "Tiêu đề" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: title,
              onChange: (e) => onTitleChange(e.target.value),
              placeholder: "Nhập tiêu đề bài viết",
              className: inputCls + " text-base font-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium", children: "Tóm tắt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: excerpt,
              onChange: (e) => setExcerpt(e.target.value),
              rows: 2,
              placeholder: "Một câu mô tả ngắn gọn nội dung bài viết",
              className: inputCls + " resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium", children: "Nội dung" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RichTextEditor, { value: content, onChange: setContent }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Dùng nút ảnh trên thanh công cụ để chèn ảnh — hỗ trợ nhiều ảnh." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-1 flex flex-col gap-5 lg:order-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: thumbnail, onChange: setThumbnail }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium", children: "Danh mục" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: categoryId,
              onChange: (e) => setCategoryId(e.target.value),
              className: inputCls,
              children: [
                categories.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Đang tải danh mục..." }),
                categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(c.id), children: c.name }, c.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium", children: "Đường dẫn (slug)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: slug,
              onChange: (e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              },
              placeholder: "duong-dan-bai-viet",
              className: inputCls + " font-mono text-xs"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Slug được tự động sinh từ tiêu đề." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium", children: "Ảnh bìa URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: thumbnail,
              onChange: (e) => setThumbnail(e.target.value),
              placeholder: "https://...",
              className: inputCls + " font-mono text-xs"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
            "Tìm kiếm ngữ nghĩa"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: "Khi lưu, hệ thống tự động gọi OpenAI tạo vector embedding cho tiêu đề + tóm tắt và lưu vào pgvector." })
        ] })
      ] })
    ] })
  ] });
}
export {
  ArticleForm as A
};
