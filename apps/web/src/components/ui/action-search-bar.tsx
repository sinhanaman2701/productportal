"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export interface Action {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
  url?: string;
}

interface SearchResult {
  actions: Action[];
}

function ActionSearchBar({ actions = [] }: { actions?: Action[] }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const debouncedQuery = useDebounce(query, 200);
  const router = useRouter();

  useEffect(() => {
    // Add default icons if none provided
    const enrichedActions = actions.map(action => ({
      ...action,
      icon: action.icon || <BookOpen className="h-4 w-4 text-[var(--color-indigo-500)]" />
    }));

    if (!isFocused) {
      setResult(null);
      return;
    }

    if (!debouncedQuery) {
      setResult({ actions: enrichedActions });
      return;
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    const filteredActions = enrichedActions.filter((action) => {
      const searchableText = action.label.toLowerCase() + (action.description?.toLowerCase() || "");
      return searchableText.includes(normalizedQuery);
    });

    setResult({ actions: filteredActions });
  }, [debouncedQuery, isFocused, actions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const handleFocus = () => {
    setSelectedAction(null);
    setIsFocused(true);
  };

  const handleActionClick = (action: Action) => {
    setSelectedAction(action);
    if (action.url) {
      router.push(action.url);
    }
  };

  return (
    <div className="w-full max-w-[280px] sm:max-w-md mx-auto">
      <div className="relative flex flex-col justify-start">
        <div className="w-full relative z-20">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg border border-[var(--color-border)] focus:border-[var(--color-indigo-500)] focus:ring-1 focus:ring-[var(--color-indigo-500)] transition-all bg-[var(--color-surface)] placeholder:text-[var(--color-text-muted)] text-[var(--color-text-primary)]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
            <AnimatePresence mode="popLayout">
              {query.length > 0 ? (
                <motion.div
                  key="send"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send className="w-4 h-4 text-[var(--color-text-muted)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full absolute top-[110%] left-0 z-50">
          <AnimatePresence>
            {isFocused && result && !selectedAction && (
              <motion.div
                className="w-full border rounded-md shadow-lg overflow-hidden border-[var(--color-border)] bg-[var(--color-surface)]"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul className="max-h-[300px] overflow-y-auto">
                  {result.actions.length > 0 ? (
                    result.actions.map((action) => (
                      <motion.li
                        key={action.id}
                        className="px-3 py-2 flex items-center justify-between hover:bg-[var(--color-surface-2)] cursor-pointer rounded-md transition-colors"
                        variants={item}
                        layout
                        onClick={() => handleActionClick(action)}
                      >
                        <div className="flex items-center gap-2 justify-between flex-1 overflow-hidden">
                          <div className="flex items-center gap-2 w-full">
                            <span className="shrink-0">{action.icon}</span>
                            <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                              {action.label}
                            </span>
                            {action.description && (
                              <span className="text-xs text-[var(--color-text-muted)] truncate hidden sm:block">
                                {action.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {action.short && (
                            <span className="text-xs text-[var(--color-text-muted)]">
                              {action.short}
                            </span>
                          )}
                        </div>
                      </motion.li>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-[var(--color-text-muted)]">
                      No results found.
                    </div>
                  )}
                </motion.ul>
                {result.actions.length > 0 && (
                  <div className="mt-1 px-3 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                      <span>Jump to article</span>
                      <span>ESC to cancel</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export { ActionSearchBar };
