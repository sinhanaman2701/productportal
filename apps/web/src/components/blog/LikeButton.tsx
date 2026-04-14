"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { incrementLikes } from "@/app/actions";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const likedArticles = JSON.parse(localStorage.getItem("liked_articles") || "[]");
    if (likedArticles.includes(slug)) {
      setHasLiked(true);
    }
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked) return;
    
    setIsAnimating(true);
    setHasLiked(true);
    setLikes(prev => prev + 1);

    // Save to localStorage
    const likedArticles = JSON.parse(localStorage.getItem("liked_articles") || "[]");
    localStorage.setItem("liked_articles", JSON.stringify([...likedArticles, slug]));

    const result = await incrementLikes(slug);
    if (!result.success) {
      // Rollback on failure (optional, but good for UX)
      setHasLiked(false);
      setLikes(prev => prev - 1);
      const updated = likedArticles.filter((s: string) => s !== slug);
      localStorage.setItem("liked_articles", JSON.stringify(updated));
    }

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <motion.button
          onClick={handleLike}
          disabled={hasLiked}
          whileHover={!hasLiked ? { scale: 1.05 } : {}}
          whileTap={!hasLiked ? { scale: 0.95 } : {}}
          className={cn(
            "group relative flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300",
            hasLiked 
              ? "bg-[var(--color-rose-50)] border-[var(--color-rose-200)] text-[var(--color-rose-500)]" 
              : "bg-white border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-rose-200)] hover:text-[var(--color-rose-400)]"
          )}
        >
          <Heart 
            className={cn(
              "w-6 h-6 transition-transform duration-300",
              hasLiked && "fill-current scale-110",
              !hasLiked && "group-hover:scale-110"
            )} 
          />
          
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full border-2 border-[var(--color-rose-400)] pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* Particle effect */}
        {isAnimating && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              x: Math.cos(i * 60 * Math.PI / 180) * 40,
              y: Math.sin(i * 60 * Math.PI / 180) * 40,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[var(--color-rose-400)] rounded-full"
          />
        ))}
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-[var(--color-text-primary)] font-[var(--font-heading)]">
          {likes.toLocaleString()}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
          Claps
        </span>
      </div>
    </div>
  );
}
