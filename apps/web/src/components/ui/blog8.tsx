"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, Heart } from "lucide-react";

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
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ y: -5 }}
        >
          <Link
            href={post.url}
            className={cn(
              "group block h-full surface rounded-[var(--radius-lg)] overflow-hidden",
              "transition-all duration-300 ease-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
              "border border-[var(--color-border)] hover:border-[var(--color-indigo-200)]"
            )}
          >
            {/* Cover Image */}
            <div className="relative h-52 bg-[var(--color-surface-2)] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-white/90 backdrop-blur-md text-[var(--color-indigo-600)] rounded-md border border-[var(--color-indigo-100)] shadow-sm">
                  {post.label}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-[calc(100%-13rem)]">
              <div className="flex-1">
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-500)] transition-colors line-clamp-2 leading-tight tracking-tighter mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-6 font-medium opacity-80">
                  {post.summary}
                </p>
              </div>

              {/* Footer Metrics */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-hover)]/30">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1.5 transition-colors group-hover:text-[var(--color-text-secondary)]">
                    <Calendar size={12} className="text-[var(--color-indigo-400)]" />
                    {post.published}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-muted)] text-[10px] font-bold">
                    <Eye size={12} className="text-[var(--color-indigo-400)]" />
                    {post.views || 0}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-rose-50)] text-[var(--color-rose-500)] text-[10px] font-bold">
                    <Heart size={11} className="fill-current" />
                    {post.likes || 0}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
