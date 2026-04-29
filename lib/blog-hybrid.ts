import {
  type BlogPost,
  type BlogPostMeta,
} from "@/lib/blog";
import readingTime from "reading-time";
import { db, schema } from "@/db/client";
import { and, desc, eq, isNotNull } from "drizzle-orm";

// CMS-backed blog reader. Originally merged filesystem markdown with
// DB-managed posts; the filesystem source has since been migrated into
// the DB and removed (see scripts/migrate-blog-to-cms.ts), so this is
// effectively a thin DB wrapper now. The "Hybrid" suffix is kept on the
// exported names so existing call sites don't have to churn.

function dbRowToPost(row: typeof schema.cmsBlogPosts.$inferSelect): BlogPost {
  const stats = readingTime(row.body || "");
  return {
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    date: (row.publishedAt ?? row.createdAt).toISOString(),
    author: {
      name: "Rashid Iqbal",
    },
    ...(row.coverImage ? { coverImage: row.coverImage } : {}),
    tags: (row.tags ?? []) as string[],
    category: row.category ?? "General",
    published: !!row.publishedAt,
    featured: !!row.featured,
    readingTime: stats.text,
    content: row.body || "",
    ...(row.seoTitle ? { seoTitle: row.seoTitle } : {}),
    ...(row.seoDescription ? { seoDescription: row.seoDescription } : {}),
    twitterCard: "summary_large_image" as const,
  };
}

export async function getAllPostsHybrid(): Promise<BlogPostMeta[]> {
  let dbPosts: BlogPost[] = [];
  try {
    const rows = await db
      .select()
      .from(schema.cmsBlogPosts)
      .where(isNotNull(schema.cmsBlogPosts.publishedAt))
      .orderBy(desc(schema.cmsBlogPosts.publishedAt));
    dbPosts = rows.map(dbRowToPost);
  } catch (e) {
    console.error("[blog] DB read failed", e);
    return [];
  }

  return dbPosts
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlugHybrid(slug: string): Promise<BlogPost | null> {
  try {
    const [row] = await db
      .select()
      .from(schema.cmsBlogPosts)
      .where(
        and(
          eq(schema.cmsBlogPosts.slug, slug),
          isNotNull(schema.cmsBlogPosts.publishedAt)
        )
      )
      .limit(1);
    if (row) return dbRowToPost(row);
  } catch (e) {
    console.error("[blog] DB lookup failed for slug", slug, e);
  }
  return null;
}

export async function getPostSlugsHybrid(): Promise<string[]> {
  const all = await getAllPostsHybrid();
  return all.map((p) => p.slug);
}

export async function getFeaturedPostsHybrid(): Promise<BlogPostMeta[]> {
  const all = await getAllPostsHybrid();
  return all.filter((p) => p.featured);
}

export async function getPostsByTagHybrid(tag: string): Promise<BlogPostMeta[]> {
  const all = await getAllPostsHybrid();
  return all.filter((p) => p.tags.includes(tag));
}

export async function getAllTagsHybrid(): Promise<{ tag: string; count: number }[]> {
  const all = await getAllPostsHybrid();
  const counts = new Map<string, number>();
  for (const p of all) {
    for (const t of p.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getRelatedPostsHybrid(
  currentSlug: string,
  currentTags: string[],
  limit = 3
): Promise<BlogPostMeta[]> {
  const all = await getAllPostsHybrid();
  return all
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score: _s, ...rest }) => rest);
}
