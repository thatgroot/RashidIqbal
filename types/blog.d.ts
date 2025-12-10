/**
 * Blog Types - Global declarations (no import/export needed)
 * These types are available throughout the project via TypeScript's ambient declarations
 */

interface BlogAuthor {
  name: string;
  avatar?: string;
  twitter?: string;
  linkedin?: string;
}

interface BlogPost {
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
  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  // Social preview
  twitterCard?: "summary" | "summary_large_image";
  linkedinTitle?: string;
  linkedinDescription?: string;
}

type BlogPostMeta = Omit<BlogPost, "content">;

interface BlogTagCount {
  tag: string;
  count: number;
}

interface BlogCategoryCount {
  category: string;
  count: number;
}

