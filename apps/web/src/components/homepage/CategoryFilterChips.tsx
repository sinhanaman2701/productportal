"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/payload-types";

interface CategoryFilterChipsProps {
  categories: Category[];
  onFilterChange?: (category: string | null) => void;
}

export function CategoryFilterChips({
  categories,
  onFilterChange,
}: CategoryFilterChipsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleClick = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
    onFilterChange?.(categorySlug);
  };

  return (
    <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 py-4">
      <div className="max-w-[600px] mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* All Posts */}
          <button
            onClick={() => handleClick(null)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors",
              activeCategory === null
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            All
          </button>

          {/* Category Chips */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleClick(category.slug || String(category.id))}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors",
                activeCategory === (category.slug || String(category.id))
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
