import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArticleForm } from "@/components/article-form";
import { getArticle } from "@/lib/admin-store";
import type { Article } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/articles/$id")({
  component: EditArticle,
});

function EditArticle() {
  const { id } = Route.useParams();
  const [article, setArticle] = useState<Article | undefined | null>(undefined);

  // localStorage store reads on the client only
  useEffect(() => {
    setArticle(getArticle(id) ?? null);
  }, [id]);

  if (article === undefined) {
    return <div className="h-96 animate-pulse rounded-2xl bg-muted/40" />;
  }

  if (article === null) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Không tìm thấy bài viết
        </h1>
        <Link to="/admin" className="mt-4 inline-block text-sm text-primary hover:underline">
          ← Quay lại quản trị
        </Link>
      </div>
    );
  }

  return <ArticleForm existing={article} />;
}
