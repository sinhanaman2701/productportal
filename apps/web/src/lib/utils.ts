import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}${path}`;
}

/** Extract plain text from Payload Lexical rich text for excerpt/reading time */
export function lexicalToPlainText(content: unknown): string {
  if (!content || typeof content !== "object") return "";
  const root = (content as { root?: { children?: unknown[] } }).root;
  if (!root?.children) return "";

  function traverse(nodes: unknown[]): string {
    return nodes
      .map((node) => {
        const n = node as {
          type?: string;
          text?: string;
          children?: unknown[];
        };
        if (n.type === "text" && n.text) return n.text;
        if (n.children) return traverse(n.children);
        return "";
      })
      .join(" ");
  }

  return traverse(root.children).replace(/\s+/g, " ").trim();
}

export function calculateReadingTime(content: unknown): number {
  const text = lexicalToPlainText(content);
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
