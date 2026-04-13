import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { TabbedBlogSection } from "@/components/blog/TabbedBlogSection";
import {
  getFeaturedPost,
  getAllCategories,
  getPeoplesChoicePosts,
  getTopPosts,
  getNewestPosts,
} from "@/lib/payload";
import Link from "next/link";
import { CategoryBentoGrid } from "@/components/ui/category-bento-grid";
import { formatDateShort } from "@/lib/utils";
import type { Category, Media } from "@/payload-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PM Craft — Insights for Product Managers",
  description:
    "Deep dives on PM craft — AI for PMs, interview prep, RCA, guesstimates, and career growth.",
};

export const dynamic = "force-dynamic";

function postToBlog8(post: any) {
  const category = post.category as Category | null;
  const coverImage = post.coverImage as Media | null;
  return {
    id: post.id as string,
    title: post.title,
    summary: post.excerpt || "",
    label: category?.name || "Uncategorized",
    author: "PM Craft",
    published: post.publishedAt ? formatDateShort(post.publishedAt) : "Recently",
    url: `/blog/${post.slug}`,
    image:
      coverImage && typeof coverImage !== "number"
        ? `/media/${coverImage.filename}`
        : "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
    tags: category ? [category.name] : [],
    views: typeof post.views === "number" ? post.views : 0,
    likes: typeof post.likes === "number" ? post.likes : 0,
  };
}

export default async function HomePage() {
  const [featured, categories, peoplesChoice, top, newest] = await Promise.all([
    getFeaturedPost(),
    getAllCategories(),
    getPeoplesChoicePosts(10),
    getTopPosts(10),
    getNewestPosts(10),
  ]);

  return (
    <>
      <main>
        {/* ── Topics (Bento Grid Hero) ─────────────────────────────── */}
        <CategoryBentoGrid categories={categories.slice(0, 6)} />

        {/* ── Featured Post ─────────────────────────────────────────── */}
        {featured && (
          <div className="max-w-7xl mx-auto px-4 mt-8 mb-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Featured
                </h2>
              </div>
              <ArticleCard post={featured} variant="featured" />
            </section>
          </div>
        )}

        {/* ── Tabbed Blog Section ───────────────────────────────────── */}
        <TabbedBlogSection
          peoplesChoice={peoplesChoice.map(postToBlog8)}
          top={top.map(postToBlog8)}
          newest={newest.map(postToBlog8)}
        />
      </main>
    </>
  );
}
