import { getAllPosts } from "@/lib/payload";
import { absoluteUrl } from "@/lib/utils";
import { NextResponse } from "next/server";
import type { Post, Media, User } from "@/payload-types";

export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts(50);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>PM Craft</title>
    <link>${siteUrl}</link>
    <description>Deep dives on PM craft — AI for PMs, interview prep, RCA, guesstimates, and career growth.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/api/rss")}" rel="self" type="application/rss+xml"/>
    <managingEditor>hello@pmcraft.io (PM Craft)</managingEditor>
    <ttl>60</ttl>
    ${posts
      .map((post: Post) => {
        const coverImage = post.coverImage as Media | null;
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <description><![CDATA[${post.excerpt ?? ""}]]></description>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : ""}</pubDate>
      ${coverImage ? `<enclosure url="${absoluteUrl(`/media/${coverImage.filename}`)}" type="image/jpeg"/>` : ""}
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=7200",
    },
  });
}
