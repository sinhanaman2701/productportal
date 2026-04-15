import Link from "next/link";
import { Rss, Twitter, Linkedin } from "lucide-react";

export function FooterMinimal() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 mt-24">
      <div className="max-w-[600px] mx-auto px-4 py-12">
        <div className="flex flex-col gap-6">
          {/* Links row */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link
              href="/about"
              className="hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href="/api/rss"
              className="hover:text-gray-900 transition-colors"
            >
              RSS
            </Link>
            <span className="text-gray-300">·</span>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Twitter/X
            </a>
            <span className="text-gray-300">·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            © {year} PM Craft
          </p>
        </div>
      </div>
    </footer>
  );
}
