import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { uploadImageApi } from "@/lib/api-client";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  ImagePlus,
  Undo,
  Redo,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active && "bg-primary/10 text-primary",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Soạn nội dung bài viết..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "article-prose min-h-[360px] max-w-none px-4 py-4 focus:outline-none",
      },
    },
  });
  const uploadingRef = useRef(false);

  // Keep editor in sync if the value is reset externally (e.g. loading an article)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) {
    return (
      <div className="h-[420px] animate-pulse rounded-xl border border-border bg-muted/40" />
    );
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
        toast.error("Tải ảnh thất bại: " + (err as Error).message, { id: toastId });
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

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-secondary/40 p-1.5">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Đậm">
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Nghiêng">
          <Italic className="size-4" />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Tiêu đề 2">
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Tiêu đề 3">
          <Heading3 className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Danh sách">
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Danh sách số">
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Trích dẫn">
          <Quote className="size-4" />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} label="Liên kết">
          <Link2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImageFromFile} label="Tải ảnh lên">
          <ImagePlus className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImageFromUrl} label="Ảnh từ URL">
          <Link2 className="size-4 rotate-45" />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} label="Hoàn tác">
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} label="Làm lại">
          <Redo className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
