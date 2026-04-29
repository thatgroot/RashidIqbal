// Type definitions only.
//
// Filesystem-backed blog posts have been migrated into the CMS database
// (see scripts/migrate-blog-to-cms.ts). The reader functions live in
// lib/blog-hybrid.ts, even though there is nothing to "merge" with the
// filesystem anymore — the name is preserved so existing imports keep
// working without churn.

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
