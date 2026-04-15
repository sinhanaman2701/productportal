"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Heart } from "lucide-react";
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
          <div key={i} className="grid gap-6 sm:grid-cols-10 sm:gap-5 md:gap-8 lg:gap-12">
            <div className="sm:col-span-5 space-y-4">
              <div className="flex gap-3">
                <div className="h-5 bg-[var(--color-surface-2)] rounded w-20" />
                <div className="h-5 bg-[var(--color-surface-2)] rounded w-20" />
              </div>
              <div className="h-8 bg-[var(--color-surface-2)] rounded w-3/4" />
              <div className="h-4 bg-[var(--color-surface-2)] rounded w-full" />
              <div className="h-4 bg-[var(--color-surface-2)] rounded w-2/3" />
            </div>
            <div className="sm:col-span-5">
              <div className="aspect-[16/9] bg-[var(--color-surface-2)] rounded-lg" />
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 lg:gap-12">
            {/* Content - Left Side */}
            <div className="md:col-span-5 flex flex-col justify-center">
              {/* Category Tags */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] md:gap-5 lg:gap-6">
                  <span className="text-[var(--color-indigo-600)]">{post.label}</span>
                  {post.tags && post.tags.length > 0 && post.tags.slice(0, MAX_TAGS_TO_SHOW).map((tag, i) => (
                    <span key={i} className="text-[var(--color-text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                <Link href={post.url} className="hover:underline">
                  {post.title}
                </Link>
              </h3>

              {/* Summary/Excerpt */}
              <p className="mt-4 text-[var(--color-text-secondary)] md:mt-5 md:text-base">
                {post.summary}
              </p>

              {/* Metadata Row */}
              <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                  <Eye size={14} />
                  <span className="font-medium">{post.views ?? 0}</span>
                </span>
                <span className="text-[var(--color-text-muted)]">•</span>
                <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                  <Heart size={14} />
                  <span className="font-medium">{post.likes ?? 0}</span>
                </span>
              </div>

              {/* Read More Link */}
              <div className="mt-6 flex items-center space-x-2 md:mt-8">
                <Link
                  href={post.url}
                  className="inline-flex items-center font-semibold text-[var(--color-indigo-600)] hover:underline md:text-base"
                >
                  <span>Read more</span>
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="md:col-span-5 w-full">
              <Link href={post.url} className="block relative">
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-[var(--color-border)]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-opacity duration-200 hover:opacity-70"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority={index < PRIORITY_IMAGE_COUNT}
                  />
                </div>
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
