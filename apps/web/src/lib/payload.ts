import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Post, Category, Tag } from "@/payload-types";

// ── Payload singleton ──────────────────────────────────────────────────────

let payloadInstance: ReturnType<typeof getPayload> extends Promise<infer T>
  ? T
  : never;

export async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise });
  }
  return payloadInstance;
}

// ── Posts ──────────────────────────────────────────────────────────────────

export async function getAllPosts(limit = 100): Promise<Post[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    limit,
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 2,
  });
  return result.docs;
}

export async function getFeaturedPost(): Promise<Post | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    limit: 1,
    where: {
      and: [
        { status: { equals: "published" } },
        { featured: { equals: true } },
      ],
    },
    sort: "-publishedAt",
    depth: 2,
  });
  return result.docs[0] ?? null;
}

export async function getLatestPosts(limit = 6): Promise<Post[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    limit,
    where: {
      and: [
        { status: { equals: "published" } },
        { featured: { equals: false } },
      ],
    },
    sort: "-publishedAt",
    depth: 2,
  });
  return result.docs;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  return result.docs[0] ?? null;
}

export async function getRelatedPosts(
  currentSlug: string,
  categoryId: string | number,
  limit = 3
): Promise<Post[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    limit,
    where: {
      and: [
        { status: { equals: "published" } },
        { slug: { not_equals: currentSlug } },
        { category: { equals: categoryId } },
      ],
    },
    sort: "-publishedAt",
    depth: 2,
  });
  return result.docs;
}

export async function getPostsByCategory(
  categorySlug: string,
  limit = 20
): Promise<Post[]> {
  const payload = await getPayloadClient();
  const cats = await payload.find({
    collection: "categories",
    where: { slug: { equals: categorySlug } },
    limit: 1,
  });
  const cat = cats.docs[0];
  if (!cat) return [];

  const result = await payload.find({
    collection: "posts",
    limit,
    where: {
      and: [
        { status: { equals: "published" } },
        { category: { equals: cat.id } },
      ],
    },
    sort: "-publishedAt",
    depth: 2,
  });
  return result.docs;
}

export async function getPostsByTag(
  tagSlug: string,
  limit = 20
): Promise<Post[]> {
  const payload = await getPayloadClient();
  const tags = await payload.find({
    collection: "tags",
    where: { slug: { equals: tagSlug } },
    limit: 1,
  });
  const tag = tags.docs[0];
  if (!tag) return [];

  const result = await payload.find({
    collection: "posts",
    limit,
    where: {
      and: [
        { status: { equals: "published" } },
        { tags: { contains: tag.id } },
      ],
    },
    sort: "-publishedAt",
    depth: 2,
  });
  return result.docs;
}

// ── Sorted / Ranked feeds ─────────────────────────────────────────────────

/** Top by likes in the last 7 days (People's Choice) */
export async function getPeoplesChoicePosts(limit = 10): Promise<Post[]> {
  const payload = await getPayloadClient();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const result = await payload.find({
    collection: "posts",
    limit,
    where: {
      and: [
        { status: { equals: "published" } },
        { publishedAt: { greater_than_equal: oneWeekAgo } },
      ],
    },
    sort: "-likes",
    depth: 2,
  });
  // fallback: if no posts in last 7 days, return global top by likes
  if (result.docs.length === 0) {
    const fallback = await payload.find({
      collection: "posts",
      limit,
      where: { status: { equals: "published" } },
      sort: "-likes",
      depth: 2,
    });
    return fallback.docs;
  }
  return result.docs;
}

/** Top by all-time likes */
export async function getTopPosts(limit = 10): Promise<Post[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    limit,
    where: { status: { equals: "published" } },
    sort: "-likes",
    depth: 2,
  });
  return result.docs;
}

/** Newest by publishedAt (not updatedAt) */
export async function getNewestPosts(limit = 10): Promise<Post[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    limit,
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 2,
  });
  return result.docs;
}

// ── Categories ─────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "categories",
    limit: 100,
    sort: "order", // Sorts numerically 1, 2, 3...
  });
  return result.docs;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "categories",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

// ── Tags ───────────────────────────────────────────────────────────────────

export async function getAllTags(): Promise<Tag[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "tags",
    limit: 100,
    sort: "name",
  });
  return result.docs;
}

export async function getTagBySlug(
  slug: string
): Promise<Tag | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "tags",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}
