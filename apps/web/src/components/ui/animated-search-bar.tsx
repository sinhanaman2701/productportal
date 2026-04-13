"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { Action } from "@/components/ui/action-search-bar";

const GooeyFilter = () => {
  return (
    <svg aria-hidden="true" className="hidden">
      <defs>
        <filter id="goo-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const SearchIcon = ({ isUnsupported }: { isUnsupported: boolean }) => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
        scale: 0.8,
        x: -4,
        filter: isUnsupported ? "none" : "blur(5px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: -4,
        filter: isUnsupported ? "none" : "blur(5px)",
      }}
      transition={{
        delay: 0.1,
        duration: 1,
        type: "spring",
        bounce: 0.15,
      }}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[var(--color-text-secondary)] mt-0.5"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      />
    </motion.svg>
  );
};

const LoadingIcon = () => {
  return (
    <svg
      className="animate-spin text-[var(--color-text-secondary)] mt-0.5 h-[15px] w-[15px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      aria-label="Loading"
      role="status"
    >
      <rect width="256" height="256" fill="none" />
      <line
        x1="128"
        y1="32"
        x2="128"
        y2="64"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="195.88"
        y1="60.12"
        x2="173.25"
        y2="82.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="224"
        y1="128"
        x2="192"
        y2="128"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="195.88"
        y1="195.88"
        x2="173.25"
        y2="173.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="128"
        y1="224"
        x2="128"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="60.12"
        y1="195.88"
        x2="82.75"
        y2="173.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="32"
        y1="128"
        x2="64"
        y2="128"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="60.12"
        y1="60.12"
        x2="82.75"
        y2="82.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </svg>
  );
};

const InfoIcon = ({ index }: { index: number }) => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.12 + 0.3 }}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="text-[var(--color-indigo-500)] shrink-0 w-[14px] h-[14px]"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 14V9M10 6H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
};

const buttonVariants = {
  initial: { x: 0, width: 120 },
  step1: { x: 0, width: 120 },
  // Expand rightwards without sliding left
  step2: { x: 0, width: 300 },
};

const iconVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 12, opacity: 1 },
};

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const isUnsupportedBrowser = () => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent.toLowerCase();

  const isSafari =
    ua.includes("safari") &&
    !ua.includes("chrome") &&
    !ua.includes("chromium") &&
    !ua.includes("android") &&
    !ua.includes("firefox");

  const isChromeOniOS = ua.includes("crios");

  return isSafari || isChromeOniOS;
};

const getResultItemVariants = (index: number, isUnsupported: boolean) => ({
  initial: {
    y: -10,
    opacity: 0,
    scale: 0.9,
    filter: isUnsupported ? "none" : "blur(4px)",
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: isUnsupported ? 0 : -4,
    opacity: 0,
    scale: 0.9,
  },
});

const getResultItemTransition = (index: number) => ({
  duration: 0.4,
  delay: index * 0.05,
  type: "spring",
  bounce: 0,
});

interface GooeySearchBarProps {
  actions?: Action[];
}

export const GooeySearchBar = ({ actions = [] }: GooeySearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [state, setState] = useState({
    step: 1,
    searchData: [] as Action[],
    searchText: "",
    isLoading: false,
  });

  const debouncedSearchText = useDebounce(state.searchText, 300);
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

  const handleButtonClick = () => {
    if (state.step === 1) {
      setState((prevState) => ({ ...prevState, step: 2 }));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, searchText: e.target.value }));
  };

  const handleClickOutside = (e: MouseEvent) => {
    // Basic approach: click outside resets
    const wrapper = document.getElementById("gooey-wrapper");
    if (wrapper && !wrapper.contains(e.target as Node)) {
      setState((prevState) => ({ ...prevState, step: 1 }));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (state.step === 2) {
      inputRef.current?.focus();
    } else {
      setState((prevState) => ({
        ...prevState,
        searchText: "",
        searchData: [],
        isLoading: false,
      }));
    }
  }, [state.step]);

  useEffect(() => {
    let isCancelled = false;

    if (debouncedSearchText) {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      const fetchData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 300)); // Simulating network speed

          const filteredData = actions.filter((item) =>
            item.label.toLowerCase().includes(debouncedSearchText.trim().toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(debouncedSearchText.trim().toLowerCase()))
          );

          if (!isCancelled) {
            setState((prevState) => ({
              ...prevState,
              searchData: filteredData,
              isLoading: false,
            }));
          }
        } catch {
          if (!isCancelled) {
            setState((prevState) => ({ ...prevState, isLoading: false }));
          }
        }
      };

      fetchData();
    } else {
      setState((prevState) => ({
        ...prevState,
        searchData: [],
        isLoading: false,
      }));
    }

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchText, actions]);

  const handleActionClick = (url?: string) => {
    if (url) {
      router.push(url);
      setState((prevState) => ({ ...prevState, step: 1 }));
    }
  };

  return (
    <div id="gooey-wrapper" className={cn("relative z-50 flex items-center h-[36px]", isUnsupported && "no-goo")}>
      <GooeyFilter />

      <div className="relative flex items-center h-full">
        <motion.div
          className="relative flex items-center"
          initial="initial"
          animate={state.step === 1 ? "step1" : "step2"}
          transition={{ duration: 0.5, type: "spring", bounce: 0.15 }}
          style={!isUnsupported ? { filter: "url('#goo-effect')" } : {}}
        >
          <motion.div
            variants={buttonVariants}
            onClick={handleButtonClick}
            whileHover={{ scale: state.step === 2 ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center h-[36px] bg-[var(--color-surface-2)] rounded-[18px] border border-[var(--color-border)] cursor-pointer overflow-hidden shadow-sm"
            role="button"
          >
            {state.step === 1 ? (
              <span className="w-full text-center text-sm font-medium text-[var(--color-text-secondary)] select-none">
                Search
              </span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                className="w-full h-full bg-transparent outline-none border-none text-sm text-[var(--color-text-primary)] pl-10 pr-4 placeholder:text-[var(--color-text-muted)] text-left"
                placeholder="Find articles..."
                aria-label="Search input"
                onChange={handleSearch}
              />
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {state.step === 2 && (
              <motion.div
                key="icon"
                className="absolute left-0 pointer-events-none"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariants}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.15,
                }}
              >
                {!state.isLoading ? (
                  <SearchIcon isUnsupported={isUnsupported} />
                ) : (
                  <LoadingIcon />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Results Display */}
        <AnimatePresence mode="popLayout">
          {state.step === 2 && state.searchData.length > 0 && (
            <motion.div
              key="search-text-wrapper"
              className="absolute left-0 top-[44px] w-[300px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] shadow-lg overflow-hidden z-50 flex flex-col p-2 space-y-1"
              role="listbox"
              initial={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -5, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {state.searchData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02, backgroundColor: "var(--color-surface-2)", transition: { duration: 0.15 } }}
                    variants={getResultItemVariants(index, isUnsupported)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={getResultItemTransition(index)}
                    className="flex flex-col cursor-pointer p-2 rounded-lg"
                    role="option"
                    onClick={() => handleActionClick(item.url)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="shrink-0">{item.icon || <InfoIcon index={index} />}</div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-xs text-[var(--color-text-muted)] truncate">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
