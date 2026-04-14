import Link from "next/link";
import { Rss, Github, Twitter } from "lucide-react";

const FOOTER_LINKS = {
  Topics: [
    { label: "AI for PMs", href: "/category/ai-for-pms" },
    { label: "Interview Prep", href: "/category/interview-prep" },
    { label: "PM Craft", href: "/category/pm-craft" },
    { label: "Career", href: "/category/career" },
  ],
  More: [
    { label: "About", href: "/about" },
    { label: "RSS Feed", href: "/api/rss" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-24">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-7 h-7 rounded-[4px] bg-gradient-to-br from-[var(--color-indigo-500)] to-[var(--color-orange-500)] flex items-center justify-center">
                <span className="text-white text-xs font-bold">PM</span>
              </div>
              <span className="font-[var(--font-heading)] font-semibold text-[var(--color-text-primary)] tracking-tight">
                PM Craft
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed">
              Deep dives on PM craft — AI, interview prep, strategy, and career
              growth. Written by practitioners, for practitioners.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Link
                href="/api/rss"
                aria-label="RSS Feed"
                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-orange-400)] hover:bg-[var(--color-surface-2)] rounded-[var(--radius-sm)] transition-all"
              >
                <Rss size={16} />
              </Link>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-indigo-400)] hover:bg-[var(--color-surface-2)] rounded-[var(--radius-sm)] transition-all"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-border)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {year} PM Craft. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built for Product Managers, by a Product Manager.
          </p>
        </div>
      </div>
    </footer>
  );
}
