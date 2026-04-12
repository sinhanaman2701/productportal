import { getAllPosts, getAllCategories } from "@/lib/payload";
import { absoluteUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

export const revalidate = 3600; // revalidate hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: absoluteUrl(`/category/${cat.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/search"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...postUrls];
}
