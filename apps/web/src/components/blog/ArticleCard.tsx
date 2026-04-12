import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Post, Category, Media } from "@/payload-types";

interface ArticleCardProps {
  post: Post;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function ArticleCard({
  post,
  variant = "default",
  className,
}: ArticleCardProps) {
  const category = post.category as Category | null;
  const coverImage = post.coverImage as Media | null;

  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group block surface surface-hover rounded-[var(--radius-lg)] overflow-hidden",
          className
        )}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-56 md:h-72 bg-[var(--color-surface-2)] overflow-hidden">
            {coverImage && typeof coverImage !== "number" ? (
              <Image
                src={`/media/${coverImage.filename}`}
                alt={coverImage.alt ?? post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-indigo-600)]/20 to-[var(--color-orange-500)]/10" />
            )}
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            {category && (
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-indigo-400)] mb-3">
                {category.name}
              </span>
            )}
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-400)] transition-colors leading-snug mb-3">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3 mb-4">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDateShort(post.publishedAt)}
                </span>
              )}
              {post.readingTime ? (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readingTime} min read
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex items-start gap-4 p-4 surface surface-hover rounded-[var(--radius-md)]",
          className
        )}
      >
        <div className="relative w-16 h-16 rounded-[var(--radius-sm)] overflow-hidden shrink-0 bg-[var(--color-surface-2)]">
          {coverImage && typeof coverImage !== "number" ? (
            <Image
              src={`/media/${coverImage.filename}`}
              alt={coverImage.alt ?? post.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-indigo-600)]/20 to-[var(--color-orange-500)]/10" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-400)] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-muted)]">
            {post.publishedAt && (
              <span>{formatDateShort(post.publishedAt)}</span>
            )}
            {post.readingTime && <span>{post.readingTime} min</span>}
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block surface surface-hover rounded-[var(--radius-md)] overflow-hidden",
        className
      )}
    >
      {/* Cover image */}
      <div className="relative h-48 bg-[var(--color-surface-2)] overflow-hidden">
        {coverImage && typeof coverImage !== "number" ? (
          <Image
            src={`/media/${coverImage.filename}`}
            alt={coverImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-indigo-600)]/20 to-[var(--color-orange-500)]/10" />
        )}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-semibold bg-[var(--color-background)]/80 backdrop-blur-sm text-[var(--color-indigo-400)] rounded-[var(--radius-sm)] border border-[var(--color-indigo-500)]/20">
              {category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-400)] transition-colors line-clamp-2 leading-snug mb-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDateShort(post.publishedAt)}
            </span>
          )}
          {post.readingTime ? (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readingTime} min read
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
