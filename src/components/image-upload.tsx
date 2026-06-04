import { ImagePlus, X } from "lucide-react";

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Single image upload field. In this UI prototype the image is stored as a
 * data URL; wire to Cloudinary (or another store) on the backend later.
 */
export function ImageUpload({
  value,
  onChange,
  label = "Ảnh đại diện",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await fileToDataUrl(file);
    onChange(url);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>

      {value ? (
        <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted">
          <img src={value} alt="preview" className="size-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Xóa ảnh"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label className="flex aspect-[16/9] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary/40">
          <ImagePlus className="size-6" />
          <span className="text-sm">Nhấn để tải ảnh lên</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      )}
    </div>
  );
}
