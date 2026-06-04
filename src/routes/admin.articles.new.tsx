import { createFileRoute } from "@tanstack/react-router";
import { ArticleForm } from "@/components/article-form";

export const Route = createFileRoute("/admin/articles/new")({
  component: () => <ArticleForm />,
});
