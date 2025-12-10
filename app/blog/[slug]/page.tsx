import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, getRelatedPosts, BlogPost } from "@/lib/blog";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { SiX, SiLinkedin } from "react-icons/si";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

/**
 * Article Structured Data component for blog posts
 * Implements schema.org Article markup for rich search results
 */
function ArticleStructuredData({ post, slug }: { post: BlogPost; slug: string }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.coverImage
      ? post.coverImage.startsWith("http")
        ? post.coverImage
        : `${siteUrl}${post.coverImage}`
      : `${siteUrl}/opengraph-image`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Rashid Iqbal",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

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

  const imageUrl = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteUrl}${post.coverImage}`
    : `${siteUrl}/opengraph-image`;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name, url: siteUrl }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      section: post.category,
      siteName: "Rashid Iqbal",
      locale: "en_US",
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: post.twitterCard || "summary_large_image",
      site: "@rashidiqbal",
      creator: post.author.twitter || "@rashidiqbal",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
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
  const postUrl = `${siteUrl}/blog/${slug}`;

  return (
    <>
      <ArticleStructuredData post={post} slug={slug} />
      <main id="main-content" className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/50" />
      </div>

      <Navbar />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 pt-24">
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
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
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
            <Tag className="w-4 h-4 text-zinc-400" aria-hidden="true" />
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
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">
            <Share2 className="w-4 h-4" aria-hidden="true" />
            Share this article
          </h2>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition-colors"
              aria-label="Share on X (Twitter)"
            >
              <SiX className="w-4 h-4" aria-hidden="true" />
              X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded hover:bg-[#006699] transition-colors"
              aria-label="Share on LinkedIn"
            >
              <SiLinkedin className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
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

      <Footer />
      </main>
    </>
  );
}

