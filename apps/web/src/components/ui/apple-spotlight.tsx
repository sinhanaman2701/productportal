"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Search, BookOpen } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Action } from "@/components/ui/action-search-bar";

const SVGFilter = () => {
  return (
    <svg width="0" height="0" className="hidden">
      <filter id="blob">
        <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
        <feColorMatrix
          values="
      1 0 0 0 0
      0 1 0 0 0
      0 0 1 0 0
      0 0 0 18 -9
    "
          result="blob"
        />
        <feBlend in="SourceGraphic" in2="blob" />
      </filter>
    </svg>
  );
};

interface SpotlightPlaceholderProps {
  text: string;
  className?: string;
}

const SpotlightPlaceholder = ({ text, className }: SpotlightPlaceholderProps) => {
  return (
    <div
      className={cn("absolute text-[var(--color-text-muted)] flex items-center pointer-events-none z-10 left-0 whitespace-nowrap", className)}
    >
      <AnimatePresence mode="popLayout">
        <motion.p
          layoutId={`placeholder-${text}`}
          key={`placeholder-${text}`}
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

interface SpotlightInputProps {
  placeholder: string;
  hidePlaceholder: boolean;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  placeholderClassName?: string;
}

const SpotlightInput = ({
  placeholder,
  hidePlaceholder,
  value,
  onChange,
  onFocus,
  placeholderClassName,
}: SpotlightInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center w-full justify-start gap-2 px-3 h-8">
      <motion.div>
        <Search className="text-[var(--color-text-muted)] w-3.5 h-3.5 shrink-0" />
      </motion.div>
      <div className="flex-1 relative text-sm h-full flex items-center overflow-hidden whitespace-nowrap">
        {!hidePlaceholder && (
          <SpotlightPlaceholder text={placeholder} className={placeholderClassName} />
        )}

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="w-full h-full bg-transparent outline-none border-none ring-0 text-[var(--color-text-primary)] z-20 relative"
        />
      </div>
    </div>
  );
};

interface SearchResultCardProps extends Action {
  isLast: boolean;
  onClick: () => void;
}

const SearchResultCard = ({ icon, label, description, isLast, onClick }: SearchResultCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center text-[var(--color-text-primary)] justify-start hover:bg-[var(--color-surface-2)] gap-3 py-2 px-3 rounded-xl cursor-pointer w-full transition-colors",
        isLast && "rounded-b-2xl"
      )}
    >
      <div className="size-8 aspect-square flex items-center justify-center shrink-0">
        {icon || <BookOpen className="w-4 h-4 text-[var(--color-indigo-500)]" />}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <p className="font-medium text-sm truncate">{label}</p>
        {description && <p className="text-xs text-[var(--color-text-muted)] truncate">{description}</p>}
      </div>
      <div className="flex items-center justify-end opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 shrink-0">
        <ChevronRight className="size-4 text-[var(--color-text-muted)]" />
      </div>
    </div>
  );
};

interface SearchResultsContainerProps {
  searchResults: Action[];
  onHover: (index: number | null) => void;
  onSelect: (url?: string) => void;
}

const SearchResultsContainer = ({ searchResults, onHover, onSelect }: SearchResultsContainerProps) => {
  return (
    <motion.div
      layout
      onMouseLeave={() => onHover(null)}
      className="px-2 border-t border-[var(--color-border)] flex flex-col bg-[var(--color-surface)] max-h-80 overflow-y-auto w-full py-2"
    >
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <motion.div
            key={`search-result-${index}`}
            onMouseEnter={() => onHover(index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.2,
              ease: "easeOut",
            }}
            className="group/card"
          >
            <SearchResultCard
              {...result}
              isLast={index === searchResults.length - 1}
              onClick={() => onSelect(result.url)}
            />
          </motion.div>
        ))
      ) : (
        <div className="text-center text-sm text-[var(--color-text-muted)] py-4">No results found.</div>
      )}
    </motion.div>
  );
};

interface AppleSpotlightProps {
  actions: Action[];
}

export const AppleSpotlight = ({ actions = [] }: AppleSpotlightProps) => {
  const [hoveredSearchResult, setHoveredSearchResult] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // Fuzzy filter actions
  const filteredActions = searchValue
    ? actions.filter(
        (a) =>
          a.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          (a.description && a.description.toLowerCase().includes(searchValue.toLowerCase()))
      )
    : [];

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (url?: string) => {
    if (url) {
      router.push(url);
      setSearchValue("");
      setIsExpanded(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const wrapper = document.getElementById("apple-spotlight-wrapper");
    if (wrapper && !wrapper.contains(e.target as Node)) {
      setIsExpanded(false);
      setSearchValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      id="apple-spotlight-wrapper" 
      className="relative z-50 w-full max-w-[320px] h-8 cursor-text"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        if (!searchValue) setIsExpanded(false);
      }}
    >
      <SVGFilter />

      <div
        style={{ filter: "url(#blob)" }}
        className="absolute top-0 left-0 w-full z-20 group"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            initial={{ borderRadius: 16 }}
            animate={{
              borderRadius: isExpanded && searchValue ? 16 : 16,
              width: isExpanded ? "100%" : 180,
            }}
            className="w-full flex items-start justify-start z-10 relative bg-black/[0.03] hover:bg-black/[0.06] transition-colors overflow-hidden flex-col origin-top-left"
          >
            <SpotlightInput
              placeholder={
                hoveredSearchResult !== null && filteredActions[hoveredSearchResult]
                  ? filteredActions[hoveredSearchResult].label
                  : "Find articles..."
              }
              placeholderClassName={
                hoveredSearchResult !== null ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
              }
              hidePlaceholder={isExpanded && searchValue.length > 0 && hoveredSearchResult === null}
              value={searchValue}
              onChange={handleSearchValueChange}
              onFocus={() => {}}
            />

            {/* Results dropdown seamlessly expanding downwards using AnimatePresence layout tracking */}
            <AnimatePresence mode="popLayout">
              {isExpanded && searchValue && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full origin-top"
                >
                  <SearchResultsContainer
                    searchResults={filteredActions}
                    onHover={setHoveredSearchResult}
                    onSelect={handleSelect}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
