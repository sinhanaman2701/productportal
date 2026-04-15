"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import type { Blog8Post } from "./blog8";

export type { Blog8Post };

const ANIMATION_DELAY_PER_ITEM = 0.04;
const MAX_TAGS_TO_SHOW = 2;
const PRIORITY_IMAGE_COUNT = 3;

interface BlogListingProps {
  posts?: Blog8Post[];
  className?: string;
}

export function BlogListing({ posts, className }: BlogListingProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col gap-12 py-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex gap-2">
                <div className="h-5 bg-[var(--color-surface-2)] rounded-full w-20" />
                <div className="h-5 bg-[var(--color-surface-2)] rounded-full w-20" />
              </div>
              <div className="h-7 bg-[var(--color-surface-2)] rounded w-3/4" />
              <div className="h-4 bg-[var(--color-surface-2)] rounded w-full" />
              <div className="h-4 bg-[var(--color-surface-2)] rounded w-2/3" />
            </div>
            <div className="w-80 h-48 bg-[var(--color-surface-2)] rounded-[var(--radius-lg)] shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-12 py-4", className)}>
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * ANIMATION_DELAY_PER_ITEM }}
          className="group"
        >
          <Link href={post.url} className="flex gap-6 items-center" aria-label={post.title}>
            {/* Content - Left Side */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-indigo-50)] text-[var(--color-indigo-600)] rounded-full">
                  {post.label}
                </span>
                {post.tags && post.tags.length > 0 && post.tags.slice(0, MAX_TAGS_TO_SHOW).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-500)] transition-colors line-clamp-2 leading-tight mb-3">
                {post.title}
              </h3>

              {/* Summary/Excerpt */}
              <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-4">
                {post.summary}
              </p>

              {/* Metadata Row - Just views and likes */}
              <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Eye size={14} className="text-[var(--color-text-muted)]" />
                  <span className="font-medium">{post.views ?? 0}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart size={14} className="text-[var(--color-text-muted)]" />
                  <span className="font-medium">{post.likes ?? 0}</span>
                </span>
              </div>
            </div>

            {/* Large Landscape Image - Right Side */}
            <div className="relative w-80 h-48 shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-2)]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 280px, 320px"
                priority={index < PRIORITY_IMAGE_COUNT}
              />
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
