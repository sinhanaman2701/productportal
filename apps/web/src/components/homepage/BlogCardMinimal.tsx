import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateShort } from "@/lib/utils";
import type { Media } from "@/payload-types";

interface BlogCardMinimalProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  coverImage?: Media | null;
  className?: string;
}

export function BlogCardMinimal({
  id,
  title,
  excerpt,
  category,
  slug,
  publishedAt,
  readTime,
  coverImage,
  className,
}: BlogCardMinimalProps) {
  const imageUrl = coverImage && typeof coverImage !== "number" && coverImage.filename
    ? `/media/${coverImage.filename}`
    : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop&q=80";

  return (
    <article className={cn("py-8 border-b border-gray-200", className)}>
      <div className="grid gap-6 sm:grid-cols-2 items-start">
        {/* Content - Left Side */}
        <div className="flex flex-col gap-3">
          {/* Category */}
          <span className="text-xs uppercase tracking-wider text-gray-500">
            {category}
          </span>

          {/* Title */}
          <Link
            href={`/blog/${slug}`}
            className="group block"
          >
            <h2 className="text-2xl font-bold font-serif text-gray-900 leading-tight transition-transform group-hover:translate-x-1">
              {title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-base text-gray-600 leading-relaxed">
            {excerpt}
          </p>

          {/* Metadata Row - Bottom */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{readTime} min read</span>
            <span className="text-gray-300">·</span>
            <span>{formatDateShort(publishedAt)}</span>
          </div>

          {/* Read More CTA */}
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-all group w-fit"
          >
            Read more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Thumbnail Image - Right Side */}
        {imageUrl && (
          <div className="sm:col-span-1">
            <Link href={`/blog/${slug}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-gray-200 bg-gray-100 ml-auto w-[85%]">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover transition-opacity duration-200 hover:opacity-80"
                  sizes="(max-width: 640px) 100vw, 326px"
                  priority
                />
              </div>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
