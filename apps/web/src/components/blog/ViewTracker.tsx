"use client";

import { useEffect, useRef } from "react";
import { incrementViews } from "@/app/actions";

export function ViewTracker({ slug }: { slug: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Check localStorage to prevent spamming on rapid refresh
    const key = `viewed_${slug}`;
    const lastViewed = localStorage.getItem(key);
    const now = Date.now();

    // If viewed within the last 1 hour, don't increment again
    if (lastViewed && now - parseInt(lastViewed, 10) < 1000 * 60 * 60) {
      return;
    }

    // Ping the server to safely increment
    incrementViews(slug).then((res) => {
      if (res?.success) {
        localStorage.setItem(key, now.toString());
      }
    });
  }, [slug]);

  return <span className="sr-only">Tracker Active</span>;
}
