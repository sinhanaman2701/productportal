"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

export interface Blog8Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
  views?: number;
  likes?: number;
}

interface Blog8Props {
  posts?: Blog8Post[];
}

export function Blog8({ posts }: Blog8Props) {
  if (!posts || posts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-[var(--color-surface-2)] rounded-[var(--radius-lg)] h-64"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={post.url}
          className={cn(
            "group block surface surface-hover rounded-[var(--radius-lg)] overflow-hidden",
            "transition-all duration-200 ease-out"
          )}
        >
          {/* Cover Image */}
          <div className="relative h-48 bg-[var(--color-surface-2)] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-semibold bg-[var(--color-background)]/80 backdrop-blur-sm text-[var(--color-indigo-400)] rounded-[var(--radius-sm)] border border-[var(--color-indigo-500)]/20">
                {post.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-400)] transition-colors line-clamp-2 leading-snug mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-4">
              {post.summary}
            </p>
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {post.published}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                5 min read
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
