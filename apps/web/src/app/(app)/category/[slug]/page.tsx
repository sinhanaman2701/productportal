import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from "@/lib/payload";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} Articles`,
    description: category.description ?? `All articles in ${category.name}`,
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug),
  ]);

  if (!category) notFound();

  return (
    <>
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-indigo-400)] mb-3">
              Topic
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-[var(--color-text-secondary)]">
                {category.description}
              </p>
            )}
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </p>
          </header>

          {/* Articles grid */}
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[var(--color-text-muted)]">
              <p>No articles yet. Check back soon.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
