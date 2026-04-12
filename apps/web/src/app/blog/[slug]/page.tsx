import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgressBar } from "@/components/layout/ReadingProgressBar";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/payload";
import { formatDate, absoluteUrl } from "@/lib/utils";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type { Post, Category, Media, User } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const ogImage =
    (post.seo?.ogImage as Media | null)?.filename ??
    (post.coverImage as Media | null)?.filename;

  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt ?? "",
    robots: post.seo?.noIndex ? "noindex" : "index, follow",
    openGraph: {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt ?? "",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: [(post.author as User | null)?.name ?? "PM Craft"],
      images: ogImage
        ? [{ url: absoluteUrl(`/media/${ogImage}`), width: 1200, height: 630 }]
        : [],
    },
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
  };
}

function ArticleJsonLd({ post }: { post: Post }) {
  const author = post.author as User | null;
  const coverImage = post.coverImage as Media | null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    image: coverImage ? absoluteUrl(`/media/${coverImage.filename}`) : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: author?.name ?? "PM Craft",
    },
    publisher: {
      "@type": "Organization",
      name: "PM Craft",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const category = post.category as Category | null;
  const coverImage = post.coverImage as Media | null;
  const author = post.author as User | null;

  const related = category
    ? await getRelatedPosts(slug, typeof category === "object" ? category.id : category, 3)
    : [];

  return (
    <>
      <ReadingProgressBar />
      <Navbar />
      <ArticleJsonLd post={post} />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
            <span>/</span>
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-[var(--color-text-primary)] transition-colors">
                  {category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-[var(--color-text-secondary)] truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Article */}
            <article>
              {/* Header */}
              <header className="mb-10">
                {category && (
                  <Link
                    href={`/category/${category.slug}`}
                    className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-indigo-400)] hover:text-[var(--color-indigo-300)] transition-colors mb-4"
                  >
                    {category.name}
                  </Link>
                )}

                <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] leading-[1.15] mb-5">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-5 text-sm text-[var(--color-text-muted)]">
                  {author && (
                    <span className="font-medium text-[var(--color-text-secondary)]">
                      {author.name}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                  {post.readingTime ? (
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {post.readingTime} min read
                    </span>
                  ) : null}
                </div>
              </header>

              {/* Cover image */}
              {coverImage && (
                <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-[var(--radius-lg)] overflow-hidden mb-10 bg-[var(--color-surface-2)]">
                  <Image
                    src={`/media/${coverImage.filename}`}
                    alt={coverImage.alt ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 720px"
                    priority
                  />
                </div>
              )}

              {/* Content — rich text rendered as prose */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-[var(--font-heading)] prose-headings:font-bold prose-headings:text-[var(--color-text-primary)]
                  prose-p:text-[var(--color-text-secondary)] prose-p:leading-[1.8]
                  prose-a:text-[var(--color-indigo-400)] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[var(--color-text-primary)]
                  prose-code:text-[var(--color-orange-400)] prose-code:bg-[var(--color-surface-2)] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
                  prose-pre:bg-[var(--color-surface)] prose-pre:border prose-pre:border-[var(--color-border)]
                  prose-blockquote:border-l-[var(--color-indigo-500)] prose-blockquote:text-[var(--color-text-secondary)]
                  prose-hr:border-[var(--color-border)]
                  prose-img:rounded-[var(--radius-md)]"
              >
                {post.content ? (
                  <RichText data={post.content} />
                ) : (
                  <p className="text-[var(--color-text-muted)] italic">
                    This article has no content.
                  </p>
                )}
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <ArrowLeft size={15} /> Back to articles
                </Link>
                <button
                  aria-label="Share article"
                  className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-indigo-400)] transition-colors"
                >
                  <Share2 size={15} /> Share
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {related.length > 0 && (
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                      Related Articles
                    </h2>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <ArticleCard key={r.id} post={r} variant="compact" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
