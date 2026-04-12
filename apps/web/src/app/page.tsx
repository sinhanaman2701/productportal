import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getFeaturedPost, getLatestPosts, getAllCategories } from "@/lib/payload";
import Link from "next/link";
import { ArrowRight, Zap, BookOpen, TrendingUp, Brain } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PM Craft — Insights for Product Managers",
  description:
    "Deep dives on PM craft — AI for PMs, interview prep, RCA, guesstimates, and career growth.",
};

export const revalidate = 60; // ISR — revalidate every 60 seconds

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  "ai-for-pms": <Brain size={20} />,
  "interview-prep": <Zap size={20} />,
  "pm-craft": <BookOpen size={20} />,
  career: <TrendingUp size={20} />,
};

const TOPIC_DESCRIPTIONS: Record<string, string> = {
  "ai-for-pms": "Vibe coding, evals, AI product lifecycle, prompt engineering",
  "interview-prep": "Guesstimates, RCA, product design, case studies",
  "pm-craft": "Prioritisation, roadmaps, stakeholder management",
  career: "Breaking in, levelling up, comp, remote work",
};

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedPost(),
    getLatestPosts(9),
    getAllCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--color-indigo-600)]/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-indigo-500)]/30 bg-[var(--color-indigo-600)]/10 text-xs font-medium text-[var(--color-indigo-400)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-indigo-400)] animate-pulse" />
              For Product Managers, by a Product Manager
            </div>

            <h1 className="font-[var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-[var(--color-text-primary)]">Master the </span>
              <span className="text-gradient-indigo">PM craft</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8">
              Deep dives on AI for PMs, interview prep, RCA, guesstimates, and
              career growth — written for practitioners who want to go beyond
              the textbook.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/category/ai-for-pms"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-indigo-600)] hover:bg-[var(--color-indigo-500)] text-white text-sm font-semibold rounded-[var(--radius-sm)] transition-colors"
              >
                Start Reading <ArrowRight size={16} />
              </Link>
              <Link
                href="/category/interview-prep"
                className="inline-flex items-center gap-2 px-5 py-2.5 surface surface-hover text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm font-medium rounded-[var(--radius-sm)] transition-all"
              >
                Interview Prep →
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Featured Post ──────────────────────────────────────── */}
          {featured && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Featured
                </h2>
              </div>
              <ArticleCard post={featured} variant="featured" />
            </section>
          )}

          {/* ── Latest Articles ──────────────────────────────────────── */}
          {latest.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Latest
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {latest.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* ── Topics ──────────────────────────────────────────────── */}
          {categories.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Topics
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="group surface surface-hover rounded-[var(--radius-md)] p-5 flex flex-col gap-3"
                  >
                    <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--color-indigo-600)]/15 text-[var(--color-indigo-400)] flex items-center justify-center group-hover:bg-[var(--color-indigo-600)]/25 transition-colors">
                      {TOPIC_ICONS[cat.slug] ?? <BookOpen size={20} />}
                    </div>
                    <div>
                      <h3 className="font-[var(--font-heading)] text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-indigo-400)] transition-colors mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {TOPIC_DESCRIPTIONS[cat.slug] ?? cat.description ?? ""}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center gap-1 text-xs text-[var(--color-indigo-400)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse <ArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
