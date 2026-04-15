"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { Button } from "@/components/ui/button";
import { AppleSpotlight } from "@/components/ui/apple-spotlight";
import { getSearchActions } from "@/app/actions";
import type { Action } from "@/components/ui/action-search-bar";

export function HeaderMinimal() {
  const [open, setOpen] = useState(false);
  const [searchActions, setSearchActions] = useState<Action[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getSearchActions().then((actions) =>
      setSearchActions(actions.map((a) => ({ ...a, id: String(a.id) })))
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled && !open
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        )}
      >
        <nav className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-end">
          {/* Mobile Menu Toggle */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="md:hidden shrink-0 h-10 w-10 p-0 text-gray-900"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="w-6 h-6" duration={300} />
          </Button>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean;
  onClose: () => void;
};

function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open || typeof window === "undefined") return null;

  const handleClick = () => {
    onClose();
  };

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-white/95 backdrop-blur-xl",
        "fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-gray-200 md:hidden"
      )}
    >
      <div className="w-full h-full p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
            onClick={handleClick}
          >
            Home
          </Link>
          <Link
            href="/category/ai-for-pms"
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
            onClick={handleClick}
          >
            AI for PMs
          </Link>
          <Link
            href="/category/interview-prep"
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
            onClick={handleClick}
          >
            Interview Prep
          </Link>
          <Link
            href="/category/pm-craft"
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
            onClick={handleClick}
          >
            PM Craft
          </Link>
          <Link
            href="/category/career"
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
            onClick={handleClick}
          >
            Career
          </Link>
        </div>
        <div className="mt-auto pt-6 border-t border-gray-200">
          <Link
            href="/subscribe"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            onClick={handleClick}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
