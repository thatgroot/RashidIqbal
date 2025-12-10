import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogAuthor {
  name: string;
  twitter?: string;
  linkedin?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: BlogAuthor;
  coverImage?: string;
  tags: string[];
  category: string;
  published: boolean;
  featured?: boolean;
  readingTime: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  twitterCard?: "summary" | "summary_large_image";
  linkedinTitle?: string;
  linkedinDescription?: string;
}

export type BlogPostMeta = Omit<BlogPost, "content">;

/**
 * Get all post slugs from the blog directory
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Only return published posts
  if (!data.published) {
    return null;
  }

  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    author: {
      name: data.author?.name || "Rashid Iqbal",
      twitter: data.author?.twitter,
      linkedin: data.author?.linkedin,
    },
    coverImage: data.coverImage,
    tags: data.tags || [],
    category: data.category || "General",
    published: data.published || false,
    featured: data.featured || false,
    readingTime: stats.text,
    content,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    twitterCard: data.twitterCard || "summary_large_image",
    linkedinTitle: data.linkedinTitle,
    linkedinDescription: data.linkedinDescription,
  };
}

/**
 * Get all published posts, sorted by date (newest first)
 */
export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .map(({ content: _, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique tags with counts
 */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

  // Score posts by number of matching tags
  const scoredPosts = allPosts.map((post) => {
    const matchingTags = post.tags.filter((tag) =>
      tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
    return { post, score: matchingTags.length };
  });

  return scoredPosts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

