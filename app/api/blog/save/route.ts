import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

interface PostData {
  title: string;
  description: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage: string;
  published: boolean;
  featured: boolean;
  date: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  twitterCard: string;
  linkedinTitle: string;
  linkedinDescription: string;
}

// Convert HTML to Markdown (basic conversion)
function htmlToMarkdown(html: string): string {
  let markdown = html;

  // Headings
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n");
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n");
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n");

  // Paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");

  // Bold and italic
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");

  // Strikethrough
  markdown = markdown.replace(/<s[^>]*>(.*?)<\/s>/gi, "~~$1~~");
  markdown = markdown.replace(/<strike[^>]*>(.*?)<\/strike>/gi, "~~$1~~");

  // Code
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n\n");

  // Links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // Images
  markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Lists
  markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
    return content.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n") + "\n";
  });
  markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
    let counter = 0;
    return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => {
      counter++;
      return `${counter}. $1\n`;
    }) + "\n";
  });

  // Blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    return content.split("\n").map((line: string) => `> ${line}`).join("\n") + "\n\n";
  });

  // Horizontal rule
  markdown = markdown.replace(/<hr[^>]*\/?>/gi, "\n---\n\n");

  // Line breaks
  markdown = markdown.replace(/<br[^>]*\/?>/gi, "\n");

  // Remove remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  markdown = markdown.replace(/&amp;/g, "&");
  markdown = markdown.replace(/&lt;/g, "<");
  markdown = markdown.replace(/&gt;/g, ">");
  markdown = markdown.replace(/&quot;/g, '"');
  markdown = markdown.replace(/&#39;/g, "'");
  markdown = markdown.replace(/&nbsp;/g, " ");

  // Clean up extra whitespace
  markdown = markdown.replace(/\n{3,}/g, "\n\n");
  markdown = markdown.trim();

  return markdown;
}

export async function POST(request: Request) {
  try {
    const data: PostData = await request.json();

    // Validate required fields
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Ensure blog directory exists
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    // Convert HTML content to markdown
    const markdownContent = htmlToMarkdown(data.content);

    // Prepare frontmatter
    const frontmatter = {
      title: data.title,
      description: data.description,
      date: data.date || new Date().toISOString(),
      author: {
        name: "Rashid Iqbal",
        twitter: "@rashidiqbal",
        linkedin: "rashidiqbal",
      },
      coverImage: data.coverImage || null,
      tags: data.tags,
      category: data.category,
      published: data.published,
      featured: data.featured,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.description,
      canonicalUrl: data.canonicalUrl || null,
      ogImage: data.ogImage || data.coverImage || null,
      twitterCard: data.twitterCard || "summary_large_image",
      linkedinTitle: data.linkedinTitle || data.title,
      linkedinDescription: data.linkedinDescription || data.description,
    };

    // Create markdown file with frontmatter
    const fileContent = matter.stringify(markdownContent, frontmatter);

    // Write file
    const filePath = path.join(BLOG_DIR, `${data.slug}.md`);
    fs.writeFileSync(filePath, fileContent, "utf-8");

    return NextResponse.json({
      success: true,
      slug: data.slug,
      message: `Post ${data.published ? "published" : "saved as draft"}`,
    });
  } catch (error) {
    console.error("Error saving blog post:", error);
    return NextResponse.json(
      { error: "Failed to save blog post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST to save blog posts" });
}

