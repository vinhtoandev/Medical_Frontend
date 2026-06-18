import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { Chatbot } from "@/components/chatbot";
import { Upload, X, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kiem-tra")({
  head: () => ({
    meta: [
      { title: "Kiểm tra tổn thương da | DermaXin" },
      {
        name: "description",
        content: "Phân tích ảnh da liễu với AI model.",
      },
    ],
  }),
  component: PredictPage,
});

const DEFAULT_API_BASE = "/api";

const SEX_OPTIONS = [
  { value: "female", label: "Nữ" },
  { value: "male", label: "Nam" },
  { value: "unknown", label: "Không rõ" },
];

const LOCALIZATION_OPTIONS = [
  { value: "abdomen", label: "Bụng" },
  { value: "acral", label: "Chi (bàn tay, bàn chân)" },
  { value: "back", label: "Lưng" },
  { value: "chest", label: "Ngực" },
  { value: "ear", label: "Tai" },
  { value: "face", label: "Mặt" },
  { value: "foot", label: "Bàn chân" },
  { value: "genital", label: "Sinh dục" },
  { value: "hand", label: "Bàn tay" },
  { value: "lower extremity", label: "Chi dưới" },
  { value: "neck", label: "Cổ" },
  { value: "scalp", label: "Da đầu" },
  { value: "trunk", label: "Thân mình" },
  { value: "unknown", label: "Không rõ" },
  { value: "upper extremity", label: "Chi trên" },
];

function formatPercent(value: number | undefined | null) {
  if (typeof value !== "number") return "N/A";
  return `${(value * 100).toFixed(1)}%`;
}

function buildMaskSrc(maskBase64?: string | null) {
  if (!maskBase64) return null;
  return `data:image/png;base64,${maskBase64}`;
}

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [sex, setSex] = useState("");
  const [localization, setLocalization] = useState("");
  const [age, setAge] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiBase = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE;

  const maskSrc = useMemo(() => buildMaskSrc(result?.overlay_base64), [result]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
    setResult(null);

    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
      return;
    }

    setPreviewUrl("");
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl("");
    setResult(null);
    setSex("");
    setLocalization("");
    setAge("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || isLoading) return;

    if (!sex || !localization || !age) {
      toast.error("Vui lòng điền đầy đủ giới tính, vị trí và tuổi.");
      return;
    }

    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 100) {
      toast.error("Tuổi phải là số nguyên từ 1 đến 100.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    const toastId = toast.loading("Đang phân tích ảnh...");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("sex", sex);
      formData.append("localization", localization);
      formData.append("age", String(parsedAge));

      const response = await fetch(`${apiBase}/predict`, {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Phân tích thất bại");
      }

      setResult(payload);
      toast.success("Phân tích hoàn tất", { id: toastId });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Lỗi không xác định";
      toast.error(msg, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">

        {/* Header */}
        <header className="mb-12 max-w-3xl animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <Sparkles className="size-4" />
            Skin Insight Lab
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Kiểm tra tổn thương da bằng AI
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tải lên ảnh vùng da bị tổn thương rõ nét và chạy mô hình dự đoán nhanh để biết thêm thông tin tham khảo.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Main content - Upload & Results */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: "100ms" }}>

            {/* Upload Panel */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-semibold">Tải ảnh lên</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Giới tính</label>
                    <select
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Chọn giới tính</option>
                      {SEX_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vị trí</label>
                    <select
                      value={localization}
                      onChange={(e) => setLocalization(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Chọn vị trí</option>
                      {LOCALIZATION_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Độ tuổi</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="1-100"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <label className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-secondary/30 p-8 transition-colors hover:border-primary/40 hover:bg-secondary/50",
                  file ? "border-primary/40 bg-primary/5" : "border-border"
                )}>
                  <Upload className="size-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {file ? file.name : "Chọn hoặc kéo thả ảnh da"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Định dạng JPG, PNG, WEBP (Tối đa 10MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">Ảnh gốc</span>
                    <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="size-full object-cover" />
                      ) : (
                        <div className="flex size-full items-center justify-center text-sm text-muted-foreground">Chưa có ảnh</div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">Ảnh phân tích (Mask)</span>
                    <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                      {maskSrc ? (
                        <img src={maskSrc} alt="Mask" className="size-full object-cover" />
                      ) : (
                        <div className="flex size-full items-center justify-center text-sm text-muted-foreground">Sẽ xuất hiện sau khi phân tích</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    type="submit"
                    disabled={!file || isLoading}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isLoading && <Loader2 className="size-4 animate-spin" />}
                    {isLoading ? "Đang xử lý..." : "Bắt đầu dự đoán"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={!file && !result}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/80 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Xóa làm lại
                  </button>
                </div>
              </form>
            </div>

            {/* Results Panel */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-semibold mb-6">Kết quả</h2>
              {result ? (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ResultItem label="Tình trạng" value={result.stage || "Unknown"} />
                    <ResultItem label="Có tổn thương" value={result.has_lesion ? "Có" : "Không"} />
                    <ResultItem label="Nhận dạng da" value={result.is_skin ? "Có" : "Không"} />
                    <ResultItem label="Loại bệnh" value={result.lesion_class || "N/A"} highlight />
                    <ResultItem label="Độ tin cậy" value={formatPercent(result.confidence)} highlight />
                  </div>

                  {result.message && (
                    <div className="rounded-lg bg-accent/10 p-4 text-sm text-accent">
                      <div className="flex gap-2 font-medium">
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                        <p>{result.message}</p>
                      </div>
                    </div>
                  )}

                  {Array.isArray(result.top_predictions) && result.top_predictions.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Top dự đoán:</h3>
                      <div className="space-y-2">
                        {result.top_predictions.map((item: any) => (
                          <div key={item.class} className="flex items-center justify-between rounded-lg bg-secondary/40 p-3 text-sm">
                            <span className="font-medium">{item.class}</span>
                            <span className="text-muted-foreground">{formatPercent(item.confidence)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40">
                  <p className="text-sm text-muted-foreground">Chạy dự đoán để xem kết quả tại đây.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Chatbot */}
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="sticky top-24">
              <Chatbot apiBase={apiBase} />
            </div>
          </div>

        </div>
      </div>
    </SiteShell>
  );
}

function ResultItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col gap-1 rounded-xl border p-4",
      highlight ? "border-primary/20 bg-primary/5" : "border-border bg-card"
    )}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <strong className={cn(
        "text-lg font-semibold",
        highlight ? "text-primary" : "text-foreground"
      )}>{value}</strong>
    </div>
  );
}
