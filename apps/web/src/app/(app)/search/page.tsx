"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";

// Make TS aware of Pagefind globally
declare global {
  interface Window {
    pagefind: any;
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load pagefind script
    const loadPagefind = async () => {
      try {
        if (typeof window !== "undefined" && !window.pagefind) {
          // Use a variable for the path to prevent tsc from trying to resolve the static module
          const pagefindPath = "/pagefind/pagefind.js";
          const pagefind = await import(
            /* webpackIgnore: true */ pagefindPath
          );
          await pagefind.options({
            mergeIndex: [{ bundlePath: "/pagefind/" }],
          });
          window.pagefind = pagefind;
        }
      } catch (err) {
        console.error("Pagefind not found. Be sure to run npx pagefind after build.");
      }
      setHasLoaded(true);
    };

    loadPagefind();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.trim() || !window.pagefind) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const searchRes = await window.pagefind.search(query);
        // Pagefind returns promises for each result element. Load the top 20.
        const topResults = await Promise.all(
          searchRes.results.slice(0, 20).map((r: any) => r.data())
        );
        setResults(topResults);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(() => {
      handleSearch();
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-text-primary)] mb-6">
              Search PM Craft
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                size={20}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, keywords..."
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] pl-12 pr-4 py-4 text-base focus:outline-none focus:border-[var(--color-indigo-500)] text-[var(--color-text-primary)] transition-colors"
                autoFocus
                disabled={!hasLoaded}
              />
            </div>
          </header>

          <div className="space-y-6">
            {isSearching && (
              <div className="flex justify-center py-12 text-[var(--color-indigo-400)]">
                <Loader2 size={24} className="animate-spin" />
              </div>
            )}

            {!isSearching && query && results.length === 0 && (
              <div className="text-center py-12 text-[var(--color-text-muted)]">
                <p>No results found for &quot;{query}&quot;.</p>
                <p className="text-sm mt-2">Try different or shorter keywords.</p>
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Found {results.length} results
                </p>
                {results.map((result, idx) => (
                  <Link
                    key={idx}
                    href={result.url}
                    className="block p-5 surface surface-hover rounded-[var(--radius-md)]"
                  >
                    <h2 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-indigo-400)] transition-colors">
                      {result.meta.title}
                    </h2>
                    <p
                      className="text-sm text-[var(--color-text-secondary)] line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
