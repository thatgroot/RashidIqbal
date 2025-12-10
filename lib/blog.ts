import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// Types are declared globally in types/blog.d.ts

function parseFrontmatter(fileContent: string, slug: string): BlogPost {
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    author: data.author || {
      name: "Rashid Iqbal",
      twitter: "@rashidiqbal",
      linkedin: "rashidiqbal",
    },
    coverImage: data.coverImage || null,
    tags: data.tags || [],
    category: data.category || "General",
    published: data.published !== false,
    featured: data.featured || false,
    readingTime: stats.text,
    content,
    // SEO
    seoTitle: data.seoTitle || data.title,
    seoDescription: data.seoDescription || data.description,
    canonicalUrl: data.canonicalUrl,
    ogImage: data.ogImage || data.coverImage,
    // Social
    twitterCard: data.twitterCard || "summary_large_image",
    linkedinTitle: data.linkedinTitle || data.title,
    linkedinDescription: data.linkedinDescription || data.description,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const post = parseFrontmatter(fileContent, slug);
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(fileContent, slug);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts();

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      ...post,
      relevance: post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((post) => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const categoryCount: Record<string, number> = {};

  posts.forEach((post) => {
    categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
  });

  return Object.entries(categoryCount)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

// For saving new posts (used by the editor)
export function savePost(slug: string, frontmatter: Partial<BlogPost>, content: string): void {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  
  const markdown = matter.stringify(content, {
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date || new Date().toISOString(),
    author: frontmatter.author,
    coverImage: frontmatter.coverImage,
    tags: frontmatter.tags,
    category: frontmatter.category,
    published: frontmatter.published,
    featured: frontmatter.featured,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
    ogImage: frontmatter.ogImage,
    twitterCard: frontmatter.twitterCard,
    linkedinTitle: frontmatter.linkedinTitle,
    linkedinDescription: frontmatter.linkedinDescription,
  });

  fs.writeFileSync(filePath, markdown, "utf-8");
}

