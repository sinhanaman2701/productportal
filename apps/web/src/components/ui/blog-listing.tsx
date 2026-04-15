"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Eye, Heart, MessageSquare } from "lucide-react";
import type { Blog8Post } from "./blog8";

export type { Blog8Post };

interface BlogListingProps {
  posts?: Blog8Post[];
}

export function BlogListing({ posts }: BlogListingProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col gap-10 py-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-6">
            <div className="flex-1 space-y-3">
              <div className="h-3 bg-[var(--color-surface-2)] rounded w-24" />
              <div className="h-6 bg-[var(--color-surface-2)] rounded w-3/4" />
              <div className="h-4 bg-[var(--color-surface-2)] rounded w-full" />
              <div className="h-4 bg-[var(--color-surface-2)] rounded w-2/3" />
            </div>
            <div className="w-24 h-24 bg-[var(--color-surface-2)] rounded-[var(--radius-sm)] shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 py-4">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.04 }}
        >
          <Link
            href={post.url}
            className={cn(
              "flex gap-6 group",
              "transition-colors duration-200"
            )}
          >
            {/* Content - Left Side */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Author */}
              <span className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                {post.author}
              </span>

              {/* Title */}
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-500)] transition-colors line-clamp-3 leading-tight mb-3">
                {post.title}
              </h3>

              {/* Summary/Excerpt */}
              <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed mb-4">
                {post.summary}
              </p>

              {/* Metadata Row */}
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {post.published}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {post.views ?? 0}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={12} />
                  {post.likes ?? 0}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    {post.tags.length}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Image - Right Side */}
            <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-surface-2)]">
              <Image
                src={post.image}
                alt={post.summary?.slice(0, 80) || post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="96px"
              />
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
