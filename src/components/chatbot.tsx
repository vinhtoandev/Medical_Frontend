import { useMemo, useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_MESSAGES = [
  {
    id: "welcome",
    role: "bot",
    text: "Chào bạn! Tôi là trợ lý AI. Tôi có thể giúp bạn giải thích các kết quả dự đoán và trả lời các câu hỏi về da liễu.",
  },
];

const DEFAULT_API_BASE = "/api-ai";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp?: string;
}

export function Chatbot({ apiBase = DEFAULT_API_BASE }: { apiBase?: string }) {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatUrl = useMemo(() => `${apiBase}/chat`, [apiBase]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isLoading) return;

    const nowIso = new Date().toISOString();

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      text,
      timestamp: nowIso,
    };

    const history = [...messages, userMessage]
      .filter((message) => message.role === "user")
      .map((message) => ({
        role: "user",
        content: message.text,
        timestamp: message.timestamp || nowIso,
      }));

    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(chatUrl, {
        method: "POST",
        credentials: "omit", // usually omit or include based on CORS setup
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text, history }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Lỗi khi gọi chatbot");
      }

      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        role: "bot",
        text: payload?.answer || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot-error`,
          role: "bot",
          text: `Lỗi: ${message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-secondary/30 px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="size-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Trợ lý Da liễu AI</h3>
          <p className="text-xs text-muted-foreground">Luôn sẵn sàng hỗ trợ</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full gap-3",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {message.role === "user" ? (
                <User className="size-4" />
              ) : (
                <Bot className="size-4" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : message.id.includes("error")
                    ? "bg-destructive/10 text-destructive rounded-tl-sm border border-destructive/20"
                    : "bg-secondary text-secondary-foreground rounded-tl-sm"
              )}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Bot className="size-4" />
            </div>
            <div className="flex max-w-[80%] items-center rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-3">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 overflow-hidden rounded-full border border-input bg-background pl-4 pr-1 focus-within:ring-1 focus-within:ring-ring"
        >
          <input
            type="text"
            className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Nhập câu hỏi của bạn..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!draft.trim() || isLoading}
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="size-4 shrink-0" />
            <span className="sr-only">Gửi</span>
          </button>
        </form>
        {error && (
          <p className="mt-2 flex items-center gap-1 px-2 text-xs text-destructive">
            <AlertCircle className="size-3" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
