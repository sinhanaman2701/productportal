"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  Layers,
  Rocket,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export type BentoCategory = {
  id: string | number;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
};

interface CategoryBentoGridProps {
  categories: BentoCategory[];
}

// Category themes - subtle, distinct color palettes
const CATEGORY_THEMES: Record<string, {
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
  bgHover: string;
  text: string;
  border: string;
  accent: string;
}> = {
  "ai": {
    icon: Brain,
    bg: "bg-violet-50",
    bgHover: "group-hover:bg-violet-100",
    text: "text-violet-600",
    border: "group-hover:border-violet-200",
    accent: "group-hover:bg-violet-500",
  },
  "product": {
    icon: Target,
    bg: "bg-blue-50",
    bgHover: "group-hover:bg-blue-100",
    text: "text-blue-600",
    border: "group-hover:border-blue-200",
    accent: "group-hover:bg-blue-500",
  },
  "user": {
    icon: Users,
    bg: "bg-rose-50",
    bgHover: "group-hover:bg-rose-100",
    text: "text-rose-600",
    border: "group-hover:border-rose-200",
    accent: "group-hover:bg-rose-500",
  },
  "metrics": {
    icon: BarChart3,
    bg: "bg-emerald-50",
    bgHover: "group-hover:bg-emerald-100",
    text: "text-emerald-600",
    border: "group-hover:border-emerald-200",
    accent: "group-hover:bg-emerald-500",
  },
  "career": {
    icon: Rocket,
    bg: "bg-amber-50",
    bgHover: "group-hover:bg-amber-100",
    text: "text-amber-600",
    border: "group-hover:border-amber-200",
    accent: "group-hover:bg-amber-500",
  },
  "interview": {
    icon: Lightbulb,
    bg: "bg-indigo-50",
    bgHover: "group-hover:bg-indigo-100",
    text: "text-indigo-600",
    border: "group-hover:border-indigo-200",
    accent: "group-hover:bg-indigo-500",
  },
  "feature": {
    icon: Zap,
    bg: "bg-orange-50",
    bgHover: "group-hover:bg-orange-100",
    text: "text-orange-600",
    border: "group-hover:border-orange-200",
    accent: "group-hover:bg-orange-500",
  },
  "roadmap": {
    icon: Layers,
    bg: "bg-cyan-50",
    bgHover: "group-hover:bg-cyan-100",
    text: "text-cyan-600",
    border: "group-hover:border-cyan-200",
    accent: "group-hover:bg-cyan-500",
  },
  "growth": {
    icon: TrendingUp,
    bg: "bg-lime-50",
    bgHover: "group-hover:bg-lime-100",
    text: "text-lime-600",
    border: "group-hover:border-lime-200",
    accent: "group-hover:bg-lime-500",
  },
  "default": {
    icon: BookOpen,
    bg: "bg-neutral-50",
    bgHover: "group-hover:bg-neutral-100",
    text: "text-neutral-600",
    border: "group-hover:border-neutral-200",
    accent: "group-hover:bg-neutral-500",
  },
};

function getCategoryKey(slug: string): string {
  const slugLower = slug.toLowerCase();
  const key = Object.keys(CATEGORY_THEMES).find((k) => slugLower.includes(k));
  return key || "default";
}

// Category card component
function CategoryCard({
  category,
  index,
}: {
  category: BentoCategory;
  index: number;
}) {
  const categoryKey = getCategoryKey(category.slug);
  const theme = CATEGORY_THEMES[categoryKey] || CATEGORY_THEMES.default;
  const IconComponent = theme.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/category/${category.slug}`}
        className={cn(
          "group relative flex flex-col p-5 h-full",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)] rounded-[var(--radius-lg)]",
          "transition-all duration-300 ease-out",
          "hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
          theme.border
        )}
      >
        {/* Subtle gradient background on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-[var(--radius-lg)]",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300",
            "bg-gradient-to-br from-transparent via-transparent to-black/[0.02]",
            "pointer-events-none"
          )}
        />

        {/* Icon with theme background */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={cn(
              "p-2.5 rounded-[var(--radius-md)]",
              "transition-all duration-300 ease-out",
              theme.bg,
              theme.bgHover
            )}
            whileHover={{ scale: 1.08, rotate: 6 }}
          >
            <IconComponent className={cn("w-5 h-5", theme.text)} />
          </motion.div>

          {/* Arrow - appears on hover */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 0, x: -8 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={cn(
              "p-1.5 rounded-full",
              "bg-[var(--color-surface-2)]",
              "group-hover:bg-[var(--color-indigo-50)]",
              "transition-colors duration-200"
            )}>
              <ArrowRight className={cn(
                "w-3.5 h-3.5",
                "text-[var(--color-text-muted)]",
                "group-hover:text-[var(--color-indigo-500)]",
                "transition-colors duration-200"
              )} />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-end">
          <h3
            className={cn(
              "font-[var(--font-heading)] text-base font-semibold",
              "text-[var(--color-text-primary)]",
              "group-hover:text-[var(--color-text-primary)]",
              "transition-colors duration-200",
              "mb-2"
            )}
          >
            {category.name}
          </h3>

          {category.description && (
            <p
              className={cn(
                "text-xs leading-relaxed",
                "text-[var(--color-text-secondary)]",
                "line-clamp-2",
                "transition-colors duration-200",
                "group-hover:text-[var(--color-text-primary)]"
              )}
            >
              {category.description}
            </p>
          )}

          {/* Animated accent line */}
          <div className={cn(
            "h-px mt-4",
            "w-0 group-hover:w-12",
            "transition-all duration-300 ease-out",
            theme.accent
          )} />
        </div>

        {/* Subtle corner accent */}
        <div className={cn(
          "absolute top-0 right-0 w-12 h-12",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
          "pointer-events-none"
        )}>
          <div className={cn(
            "absolute top-3 right-3 w-1.5 h-1.5 rounded-full",
            theme.bg.replace("50", "400"),
            "shadow-[0_0_8px_currentColor]"
          )} />
        </div>
      </Link>
    </motion.div>
  );
}

// Main grid component
export function CategoryBentoGrid({ categories }: CategoryBentoGridProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="pt-20 pb-6 px-4 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
