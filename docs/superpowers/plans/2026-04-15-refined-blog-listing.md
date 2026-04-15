# Refined Medium-Style Blog Listing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the BlogListing component to match the refined Medium design with large landscape image on right, category tag pills at top, and cleaner metadata (views + likes only, no date/author).

**Architecture:** Modify the existing `BlogListing` component to: (1) use large landscape image ~300x200px on right, (2) show category as pill badges at top, (3) remove author name, (4) simplify metadata to just views and likes icons.

**Tech Stack:** React, Next.js 15, Tailwind CSS v4, Framer Motion, Lucide React icons.

---

## File Structure

**Files to create:**
- None

**Files to modify:**
- `apps/web/src/components/ui/blog-listing.tsx` - Update card layout, image size, category pills, metadata
- `apps/web/src/components/ui/blog8.tsx` - May need to add category color/variant support if not present

**Files unchanged:**
- `apps/web/src/components/blog/TabbedBlogSection.tsx` - Already uses BlogListing
- `apps/web/src/app/(app)/page.tsx` - No changes needed

---

### Task 1: Update BlogListing Component with Refined Design

**Files:**
- Modify: `apps/web/src/components/ui/blog-listing.tsx`

**Design Reference:**
```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY  PLANNING                              ┌────────────┐ │
│                                                                  │
│  Building Modern Product Strategies             │              │ │
│                                                  │   IMAGE      │ │
│  Join us for an in-depth exploration of         │   (large,    │ │
│  building modern product roadmaps that          │  landscape)  │ │
│  actually align with business outcomes.         │              │ │
│                                                  └──────────── │
│  👁 1240   ❤ 85                                               │
└─────────────────────────────────────────────────────────────────┘
```

- [ ] **Step 1: Update the BlogListing component**

Modify `apps/web/src/components/ui/blog-listing.tsx`:

```tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import type { Blog8Post } from "./blog8";

interface BlogListingProps {
  posts?: Blog8Post[];
}

export function BlogListing({ posts }: BlogListingProps) {
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
    <div className="flex flex-col gap-12 py-4">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.04 }}
          className="group"
        >
          <Link href={post.url} className="flex gap-8">
            {/* Content - Left Side */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-indigo-50)] text-[var(--color-indigo-600)] rounded-full">
                  {post.label}
                </span>
                {post.tags && post.tags.length > 0 && post.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-500)] transition-colors line-clamp-2 leading-tight mb-4">
                {post.title}
              </h3>

              {/* Summary/Excerpt */}
              <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed mb-6">
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
                alt={post.summary?.slice(0, 80) || post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 280px, 320px"
                priority={index < 3}
              />
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
```

**Key changes from current implementation:**
1. **Gap increased**: `gap-6` → `gap-8` (more breathing room)
2. **Image size**: `w-24 h-24` → `w-80 h-48` (large landscape, ~320x192px)
3. **Image border radius**: `rounded-[var(--radius-sm)]` → `rounded-[var(--radius-lg)]`
4. **Category tags**: Added pill badges at top with `bg-[var(--color-indigo-50)]` styling
5. **Author removed**: No more author name display
6. **Title size**: `text-xl` → `text-2xl` (more prominent)
7. **Metadata simplified**: Only views and likes, no date, no comment count
8. **Icon size**: `size={12}` → `size={14}` for better visibility
9. **Vertical alignment**: Content uses `justify-center` to vertically center with image

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd apps/web && npx tsc --noEmit`

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/ui/blog-listing.tsx
git commit -m "feat: refine blog listing with large image and category pills"
```

---

### Task 2: Verify Visual Design and Test

**Files:**
- No file changes - verification only

- [ ] **Step 1: Check homepage renders correctly**

Open browser to: `http://localhost:3006`

Verify:
1. Each blog card shows category pill(s) at top left
2. Title is larger (text-2xl) and prominent
3. Large landscape image on right (~320x192px) with rounded corners
4. Excerpt text below title
5. Metadata row shows only views and likes (no date)
6. Cards separated by ~48px whitespace gap
7. Hover effect: title turns indigo, image scales up
8. Left edge aligns with Category Bento Grid above

- [ ] **Step 2: Test tab switching**

Click each tab (People's Choice, GOAT, Newest) and verify:
- Content switches correctly
- Layout consistent across all tabs
- Hover animations work smoothly

- [ ] **Step 3: Test responsive behavior**

Resize browser window and verify:
- On tablet (768px-1024px): Image may shrink slightly but stays on right
- On mobile (< 640px): Image stacks below content or shrinks significantly
- Typography remains readable at all sizes

---

## Self-Review Checklist

**1. Spec coverage:**
- ✅ Large landscape image on right (~320x192px)
- ✅ Category pill badges at top left
- ✅ No author name displayed
- ✅ Simplified metadata (views + likes only)
- ✅ Larger, more prominent title
- ✅ Generous spacing between cards

**2. Placeholder scan:**
- ✅ No TBD/TODO statements
- ✅ All code blocks complete
- ✅ Exact file paths provided
- ✅ Commands include expected output

**3. Type consistency:**
- ✅ Uses existing Blog8Post type
- ✅ Component name unchanged (BlogListing)
- ✅ Props interface matches usage

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-15-refined-blog-listing.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
