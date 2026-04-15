# Medium-Style Blog Listing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current 3-column grid blog listing with a Medium-style horizontal card list (image on right, content on left, no border separators - just whitespace), left-aligned with the existing Category Bento Grid hero section.

**Architecture:** Create a new `BlogListing` component that renders posts as horizontal cards with: author info at top, bold title, excerpt text, and metadata row on the left; square thumbnail image on the right. Cards separated by ~40px vertical gap (no border lines). The existing `Blog8` grid component will be replaced with this new component in `TabbedBlogSection`.

**Tech Stack:** React, Next.js 15, Tailwind CSS v4, Framer Motion (for subtle hover animations), Lucide React icons.

---

## File Structure

**Files to create:**
- `apps/web/src/components/ui/blog-listing.tsx` - New Medium-style horizontal card list component

**Files to modify:**
- `apps/web/src/components/blog/TabbedBlogSection.tsx:34-42` - Replace `Blog8` with `BlogListing`
- `apps/web/src/components/ui/blog8.tsx` - (Optional) Keep for fallback or remove if unused

**Files unchanged:**
- `apps/web/src/app/(app)/page.tsx` - Already uses `max-w-7xl mx-auto` for alignment
- `apps/web/src/components/ui/category-bento-grid.tsx` - Hero section, no changes

---

### Task 1: Create Medium-Style Blog Listing Component

**Files:**
- Create: `apps/web/src/components/ui/blog-listing.tsx`

- [ ] **Step 1: Create the BlogListing component with Medium-style horizontal cards**

Create `apps/web/src/components/ui/blog-listing.tsx`:

```tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Eye, Heart, MessageSquare } from "lucide-react";
import type { Blog8Post } from "./blog8";

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
                alt={post.title}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd apps/web && npx tsc --noEmit`

Expected: No errors related to `blog-listing.tsx`

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/ui/blog-listing.tsx
git commit -m "feat: add Medium-style vertical blog listing component"
```

---

### Task 2: Replace Blog8 with BlogListing in TabbedBlogSection

**Files:**
- Modify: `apps/web/src/components/blog/TabbedBlogSection.tsx`

- [ ] **Step 1: Update imports and component usage**

Modify `apps/web/src/components/blog/TabbedBlogSection.tsx`:

```tsx
"use client";

import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { BlogListing, type Blog8Post } from "@/components/ui/blog-listing";
import { Flame, TrendingUp, Sparkles } from "lucide-react";

interface TabbedBlogSectionProps {
  peoplesChoice: Blog8Post[];
  top: Blog8Post[];
  newest: Blog8Post[];
}

export function TabbedBlogSection({ peoplesChoice, top, newest }: TabbedBlogSectionProps) {
  return (
    <div className="max-w-7xl mx-auto w-full px-4">
      <Tabs defaultValue="peoples-choice">
        <div className="border-b border-[var(--color-border)]">
          <TabsList variant="underline" className="gap-x-2">
            <TabsTab value="peoples-choice" className="flex items-center gap-2 text-sm font-semibold px-3">
              <Flame size={15} />
              People&apos;s Choice
            </TabsTab>
            <TabsTab value="top" className="flex items-center gap-2 text-sm font-semibold px-3">
              <TrendingUp size={15} />
              GOAT
            </TabsTab>
            <TabsTab value="newest" className="flex items-center gap-2 text-sm font-semibold px-3">
              <Sparkles size={15} />
              Newest
            </TabsTab>
          </TabsList>
        </div>

        <TabsPanel value="peoples-choice">
          <BlogListing posts={peoplesChoice.length > 0 ? peoplesChoice : undefined} />
        </TabsPanel>
        <TabsPanel value="top">
          <BlogListing posts={top.length > 0 ? top : undefined} />
        </TabsPanel>
        <TabsPanel value="newest">
          <BlogListing posts={newest.length > 0 ? newest : undefined} />
        </TabsPanel>
      </Tabs>
    </div>
  );
}
```

Changes made:
- Line 4: Changed import from `Blog8` to `BlogListing` from `@/components/ui/blog-listing`
- Lines 35, 38, 41: Changed `<Blog8 />` to `<BlogListing />`

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd apps/web && npx tsc --noEmit`

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/blog/TabbedBlogSection.tsx
git commit -m "feat: replace grid layout with Medium-style vertical listing"
```

---

### Task 3: Verify Visual Alignment and Test

**Files:**
- No file changes - verification only

- [ ] **Step 1: Verify dev server is running**

Run: `curl -s http://localhost:3006 | head -5`

Expected: HTML response with 200 status

- [ ] **Step 2: Check homepage renders correctly**

Open browser to: `http://localhost:3006`

Verify:
1. Category Bento Grid hero section displays at top (unchanged)
2. Tabbed section below shows horizontal card list (Medium-style)
3. Each card has: Author name → Bold title → Excerpt → Metadata row (left side), Square thumbnail (right side)
4. Cards separated by ~40px whitespace gap (NO border lines)
5. Left edge of blog listing aligns with left edge of bento grid cards

- [ ] **Step 3: Test tab switching**

Click each tab (People's Choice, GOAT, Newest) and verify:
- Content switches correctly
- Horizontal card layout maintained in all tabs
- Hover effect on title (indigo color) and image (scale) works

- [ ] **Step 4: Test responsive behavior**

Resize browser window and verify:
- On mobile (< 640px), image may stack below content or shrink
- Alignment maintained at different viewport widths

---

## Self-Review Checklist

**1. Spec coverage:**
- ✅ Medium-style horizontal cards (image on right) - BlogListing component
- ✅ No border separators - Cards separated by `gap-10` whitespace
- ✅ Author name at top, bold title, excerpt, metadata row - Content structure matches Medium
- ✅ Left-aligned with bento grid - Both use `max-w-7xl mx-auto px-4`
- ✅ Hero category section unchanged - No modifications to `category-bento-grid.tsx`

**2. Placeholder scan:**
- ✅ No TBD/TODO statements
- ✅ All code blocks complete
- ✅ Exact file paths provided
- ✅ Commands include expected output

**3. Type consistency:**
- ✅ `Blog8Post` type imported and reused
- ✅ Component names consistent (`BlogListing`)
- ✅ Props interface matches usage

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-15-medium-style-blog-listing.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
