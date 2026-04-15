"use client";

import Link from "next/link";
import { BlogCardMinimal } from "./BlogCardMinimal";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppleSpotlight } from "@/components/ui/apple-spotlight";
import { getSearchActions } from "@/app/actions";
import type { Post } from "@/payload-types";
import type { Action } from "@/components/ui/action-search-bar";

interface BlogListingColumnProps {
  posts: Post[];
  categories?: any[];
}

export function BlogListingColumn({
  posts,
  categories,
}: BlogListingColumnProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchActions, setSearchActions] = useState<Action[]>([]);

  useEffect(() => {
    getSearchActions().then((actions) =>
      setSearchActions(actions.map((a) => ({ ...a, id: String(a.id) })))
    );
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleFilterChange = (categorySlug: string | null) => {
    if (!categorySlug) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.category &&
            typeof post.category === "object" &&
            (post.category.slug === categorySlug ||
              String(post.category.id) === categorySlug)
        )
      );
    }
    setVisibleCount(8);
  };

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="max-w-5xl ml-[12%] px-6">
      {/* Category Filter - Second Header */}
      {categories && (
        <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
          <div className="h-14 flex items-center">
            <div className="flex items-center justify-between gap-4 w-full">
              {/* Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  onClick={() => handleFilterChange(null)}
                  className="px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors bg-gray-900 text-white"
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      handleFilterChange(category.slug || String(category.id))
                    }
                    className="px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {/* Search Bar - Right Side */}
              <div className="w-64 shrink-0">
                <AppleSpotlight actions={searchActions} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="flex flex-col">
        {visiblePosts.map((post, index) => {
          const category =
            post.category && typeof post.category === "object"
              ? post.category.name
              : "Uncategorized";
          // Calculate read time from content if available, otherwise default to 5
          const contentLength = post.content ? String(post.content).length : 1000;
          const readTime = Math.max(1, Math.round(contentLength / 1000)) || 5;

          return (
            <div
              key={post.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
            >
              <BlogCardMinimal
                id={String(post.id)}
                title={post.title}
                excerpt={post.excerpt || ""}
                category={category}
                slug={post.slug || ""}
                publishedAt={post.publishedAt || ""}
                readTime={readTime}
                coverImage={post.coverImage}
              />
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredPosts.length && (
        <div className="py-16 text-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="px-8 py-3 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Load More Posts
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="py-16 text-center text-gray-500">
          <p className="text-lg">No posts found in this category.</p>
          <button
            onClick={() => handleFilterChange(null)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            View all posts
          </button>
        </div>
      )}
    </div>
  );
}
