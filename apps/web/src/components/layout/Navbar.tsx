"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Rss } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "AI for PMs", href: "/category/ai-for-pms" },
  { label: "Interview Prep", href: "/category/interview-prep" },
  { label: "PM Craft", href: "/category/pm-craft" },
  { label: "Career", href: "/category/career" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--color-background)]/95 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="PM Craft home"
          >
            <div className="w-7 h-7 rounded-[4px] bg-gradient-to-br from-[var(--color-indigo-500)] to-[var(--color-orange-500)] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold font-[var(--font-heading)]">
                PM
              </span>
            </div>
            <span className="font-[var(--font-heading)] font-semibold text-[var(--color-text-primary)] text-lg tracking-tight group-hover:text-[var(--color-indigo-400)] transition-colors">
              PM Craft
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] rounded-[var(--radius-sm)] transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] rounded-[var(--radius-sm)] transition-all"
            >
              <Search size={17} />
            </Link>
            <Link
              href="/api/rss"
              aria-label="RSS Feed"
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-orange-400)] hover:bg-[var(--color-surface)] rounded-[var(--radius-sm)] transition-all"
            >
              <Rss size={17} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-[var(--radius-sm)]"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] py-3 space-y-1 bg-[var(--color-background)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] rounded-[var(--radius-sm)] transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] rounded-[var(--radius-sm)] transition-all"
            >
              <Search size={15} /> Search
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
