"use server";
import { getPayloadClient } from "@/lib/payload";
import type { Category } from "@/payload-types";

export async function incrementViews(slug: string) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    
    if (docs.length > 0) {
      const doc = docs[0];
      const currentViews = typeof (doc as any).views === 'number' ? (doc as any).views : 0;
      
      await payload.update({
        collection: "posts",
        id: doc.id,
        data: { views: currentViews + 1 },
      });
      return { success: true };
    }
    return { success: false, reason: "Not found" };
  } catch (error) {
    console.error("Failed to increment views:", error);
    return { success: false };
  }
}

export async function getSearchActions() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 100, // Reasonable limit for client-side search wrapper
      depth: 1,
    });
    
    return docs.map((doc) => {
      const category = doc.category as Category | null;
      return {
        id: doc.id,
        label: doc.title,
        description: doc.excerpt || "Read this article",
        short: category?.name || "Blog",
        url: `/blog/${doc.slug}`,
      };
    });
  } catch (error) {
    console.error("Failed to fetch search actions:", error);
    return [];
  }
}

export async function incrementLikes(slug: string) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    
    if (docs.length > 0) {
      const doc = docs[0];
      const currentLikes = typeof (doc as any).likes === 'number' ? (doc as any).likes : 0;
      
      await payload.update({
        collection: "posts",
        id: doc.id,
        data: { likes: currentLikes + 1 },
      });
      return { success: true, newLikes: currentLikes + 1 };
    }
    return { success: false, reason: "Not found" };
  } catch (error) {
    console.error("Failed to increment likes:", error);
    return { success: false };
  }
}
