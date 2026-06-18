import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleForm } from "@/components/article-form";
import { fetchArticleById } from "@/lib/api-client";
import type { Article } from "@/lib/api-types";

export const Route = createFileRoute("/admin/articles/$id")({
  loader: async ({ params }) => {
    const article = await fetchArticleById(Number(params.id));
    return { article };
  },
  component: EditArticle,
  errorComponent: ({ error }) => (
    <div className="py-24 text-center">
      <h1 className="font-display text-2xl font-semibold">Không tìm thấy bài viết</h1>
      <p className="mt-2 text-sm text-muted-foreground">{(error as Error).message}</p>
      <Link to="/admin" className="mt-4 inline-block text-sm text-primary hover:underline">
        ← Quay lại quản trị
      </Link>
    </div>
  ),
});

function EditArticle() {
  const { article } = Route.useLoaderData() as { article: Article };
  return <ArticleForm existing={article} />;
}
