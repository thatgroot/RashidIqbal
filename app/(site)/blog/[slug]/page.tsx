import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { BlogPostStructuredData } from "@/components/blog/structured-data";
import { ShareButtons } from "@/components/blog/share-buttons";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.ogImage
        ? [{ url: post.ogImage.startsWith("http") ? post.ogImage : `${siteUrl}${post.ogImage}` }]
        : undefined,
    },
    twitter: {
      card: post.twitterCard || "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      images: post.ogImage
        ? [post.ogImage.startsWith("http") ? post.ogImage : `${siteUrl}${post.ogImage}`]
        : undefined,
    },
    alternates: {
      canonical: post.canonicalUrl || `${siteUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags);

  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <BlogPostStructuredData post={post} />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="py-6" aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
            <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-zinc-600 mb-6">{post.description}</p>

          {/* Author */}
          <div className="flex items-center gap-4 pb-6 border-b border-zinc-200">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-zinc-900">{post.author.name}</p>
              {post.author.twitter && (
                <a
                  href={`https://twitter.com/${post.author.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-orange-600 transition-colors"
                >
                  {post.author.twitter}
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap pt-8 mt-8 border-t border-zinc-200">
            <Tag className="w-4 h-4 text-zinc-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-zinc-600 px-3 py-1 bg-zinc-100 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="py-8 mt-8 border-t border-zinc-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">
            Share this article
          </h2>
          <ShareButtons 
            title={post.title} 
            description={post.description} 
            slug={slug} 
            tags={post.tags} 
          />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-zinc-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-6">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                {relatedPost.coverImage && (
                  <div className="relative aspect-video mb-3 rounded-lg overflow-hidden bg-zinc-100">
                    <Image
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <h3 className="font-medium text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {relatedPost.readingTime}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

