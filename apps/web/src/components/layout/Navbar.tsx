"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { AppleSpotlight } from "@/components/ui/apple-spotlight";
import { getSearchActions } from "@/app/actions";
import type { Action } from "@/components/ui/action-search-bar";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);
  const [searchActions, setSearchActions] = useState<Action[]>([]);

  useEffect(() => {
    // Fetch posts mapping for search
    getSearchActions().then(setSearchActions);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 mx-auto w-full transition-all duration-300 ease-out border-b border-transparent",
          scrolled && !open
            ? "bg-[var(--color-surface)]/60 backdrop-blur-xl border-[var(--color-border)] md:top-4 md:max-w-4xl md:rounded-full md:border md:shadow-md py-1 top-0"
            : "top-0 max-w-7xl bg-transparent pt-4 pb-1 md:border-transparent md:rounded-none",
          open && "bg-[var(--color-background)]/95 top-0 max-w-7xl"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between h-10 w-full md:transition-all md:ease-out px-4",
            scrolled ? "md:px-6" : "md:px-4"
          )}
        >
            <div className="flex items-center">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center group shrink-0 transition-all duration-300"
                aria-label="PM Craft home"
              >
                <div className="w-6 h-6 rounded-[4px] bg-gradient-to-br from-[var(--color-indigo-500)] to-[var(--color-orange-500)] flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold font-[var(--font-heading)] leading-none">
                    PM
                  </span>
                </div>
              </Link>
            </div>

            {/* Apple Spotlight Search - Aligned beside Logo */}
            <div className="flex-1 ml-4 sm:ml-8 flex justify-center sm:justify-start">
              <AppleSpotlight actions={searchActions} />
            </div>


            {/* Mobile Menu Toggle */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(!open)}
              className="md:hidden shrink-0 ml-2 h-10 w-10 p-0 text-[var(--color-text-primary)]"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <MenuToggleIcon open={open} className="w-6 h-6" duration={300} />
            </Button>
        </nav>
      </header>
      
      <MobileMenu open={open} className="flex flex-col justify-between gap-4">

      </MobileMenu>
    </>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-[var(--color-background)]/95 backdrop-blur-xl",
        "fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-[var(--color-border)] md:hidden"
      )}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "transition-all duration-300 ease-out",
          open ? "opacity-100 scale-100" : "opacity-0 scale-95",
          "w-full h-full p-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
