import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroArticleProps {
  title: string;
  excerpt: string;
  slug: string;
  className?: string;
}

export function HeroArticle({
  title,
  excerpt,
  slug,
  className,
}: HeroArticleProps) {
  return (
    <article className={cn("w-full", className)}>
      <div className="max-w-[600px] mx-auto px-4 pt-32 pb-20">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold font-serif text-gray-900 tracking-tight mb-6 leading-[1.1]">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          {excerpt}
        </p>

        {/* CTA */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-base font-medium text-blue-600 hover:text-blue-700 transition-all group"
        >
          Read Article
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
