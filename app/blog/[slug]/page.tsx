import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { BlogPostStructuredData } from "@/components/blog/structured-data";
import { BlogPostOEmbedLinks } from "@/components/blog/oembed-links";
import { ShareButtons } from "@/components/blog/share-buttons";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { BlogNavbar } from "@/components/blog/blog-navbar";
import { FooterV2 } from "@/components/v2/footer";
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

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

  const ogImageUrl = post.ogImage 
    ? `${siteUrl}${post.ogImage}` 
    : `${siteUrl}/blog/${slug}/opengraph-image`;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `${siteUrl}/blog/${slug}`,
      siteName: "Rashid Iqbal",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: post.twitterCard || "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      images: [ogImageUrl],
      creator: post.author.twitter || "@rashidiqbal",
    },
    alternates: {
      canonical: post.canonicalUrl || `${siteUrl}/blog/${slug}`,
    },
    other: {
      // LinkedIn specific meta tags
      "og:title": post.linkedinTitle || post.title,
      "og:description": post.linkedinDescription || post.description,
      // Article meta
      "article:published_time": post.date,
      "article:modified_time": post.date,
      "article:author": post.author.name,
      "article:section": post.category,
      "article:tag": post.tags.join(", "),
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags, 3);

  return (
    <>
      <BlogPostOEmbedLinks slug={slug} title={post.title} />
      <BlogPostStructuredData post={post} />
      <BlogNavbar />

      <main id="main-content" className="min-h-screen bg-white pt-16">
        {/* Article Header */}
        <header className="border-b border-zinc-100">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-zinc-300">/</li>
                <li>
                  <Link href="/blog" className="text-zinc-500 hover:text-zinc-900 transition-colors">
                    Blog
                  </Link>
                </li>
                <li className="text-zinc-300">/</li>
                <li className="text-zinc-900 font-medium truncate max-w-[200px]">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to all articles
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
              {post.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 mb-8">
              {/* Author */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                <span>{post.author.name}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded hover:bg-zinc-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Share Buttons */}
            <ShareButtons
              title={post.title}
              description={post.description}
              slug={slug}
              tags={post.tags}
            />
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-8">
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>

        {/* Author Bio */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="p-6 bg-zinc-50 rounded-lg border border-zinc-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                R
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">{post.author.name}</h3>
                <p className="text-sm text-zinc-500 mb-3">
                  Freelance web developer specializing in high-converting landing pages, web applications, and mobile apps.
                </p>
                <div className="flex items-center gap-4">
                  {post.author.twitter && (
                    <a
                      href={`https://twitter.com/${post.author.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-500"
                    >
                      Twitter
                    </a>
                  )}
                  {post.author.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${post.author.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-500"
                    >
                      LinkedIn
                    </a>
                  )}
                  <Link href="/" className="text-sm text-orange-600 hover:text-orange-500">
                    Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 py-8 border-t border-zinc-100">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block p-4 border border-zinc-100 rounded-lg hover:border-orange-500/50 transition-colors"
                >
                  <span className="text-xs text-orange-600 font-mono uppercase tracking-wider">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-zinc-900 font-medium mt-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500 mt-3">
                    {relatedPost.readingTime}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="p-8 bg-zinc-900 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need help with your project?
            </h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              I help businesses build high-converting landing pages, web applications, and mobile apps.
            </p>
            <a
              href="https://cal.com/rashid.iqbal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      
      <FooterV2 />
    </>
  );
}

