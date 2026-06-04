import { Link } from "@tanstack/react-router";
import { type Article, categoryBySlug, formatDate } from "@/lib/mock-data";

export function ArticleCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  const category = categoryBySlug(article.categorySlug);

  return (
    <Link
      to="/bai-viet/$slug"
      params={{ slug: article.slug }}
      className="group block animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted outline outline-1 -outline-offset-1 outline-black/5">
        <img
          src={article.thumbnail}
          alt={article.title}
          loading="lazy"
          width={800}
          height={600}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mb-2 flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          {category?.name}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {formatDate(article.publishedAt)}
        </span>
      </div>
      <h3 className="mb-2 text-balance text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        {article.title}
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>
    </Link>
  );
}
