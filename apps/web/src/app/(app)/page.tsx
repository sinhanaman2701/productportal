import { getAllPosts, getAllCategories } from "@/lib/payload";
import { BlogListingColumn } from "@/components/homepage/BlogListingColumn";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(50),
    getAllCategories(),
  ]);

  return (
    <main className="min-h-screen">
      {/* Blog Listing with Category Filter */}
      <BlogListingColumn
        posts={posts}
        categories={categories}
      />
    </main>
  );
}
