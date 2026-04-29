import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, getRelatedPosts, BlogPost } from "@/lib/blog";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageBackground } from "@/components/ui/page-background";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { SITE_URL as siteUrl, SOCIAL_LINKS } from "@/lib/constants";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Share2 } from "lucide-react";
import { SiX, SiLinkedin } from "react-icons/si";
import { CopyLinkButton } from "@/components/blog/copy-link";



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

  const ogParams = new URLSearchParams({
    title: post.title,
    description: post.description,
  });

  const dynamicOgUrl = `${siteUrl}/api/og?${ogParams.toString()}`;

  const imageUrl = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteUrl}${post.coverImage}`
    : dynamicOgUrl;

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
        <PageBackground />
        <Navbar />

        {/* Article Header */}
        <section className="pt-16 bg-white relative">
          <div className="max-w-container border-l border-zinc-100 relative">
            <GridContainer cols={1}>
              <GridItem className="border-t pt-10 pb-12" padding={false}>
                <div className="px-8 sm:px-12">
                  {/* Back nav */}
                  <nav className="mb-8" aria-label="Breadcrumb">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-600 transition-colors font-mono"
                    >
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      Back to Blog
                    </Link>
                  </nav>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 flex-wrap mb-6">
                    <span className="text-[10px] font-mono text-orange-600 uppercase tracking-widest border border-orange-100 bg-orange-50 px-2 py-1">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-zinc-200" aria-hidden="true">•</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-900 mb-4 tracking-tight leading-[1.1]">
                    {post.title}
                  </h1>
                  <p className="text-lg text-zinc-500 leading-relaxed mb-8 max-w-2xl">
                    {post.description}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                    <div className="w-10 h-10 bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 text-sm">{post.author.name}</p>
                      {post.author.twitter && (
                        <a
                          href={`https://twitter.com/${post.author.twitter.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-400 font-mono hover:text-orange-600 transition-colors"
                        >
                          {post.author.twitter}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </section>

        {/* Article Content + Sidebar */}
        <section className="bg-white">
          <div className="max-w-container border-l border-zinc-100">
            <div className="grid desktop:grid-cols-3 border-b border-zinc-100">

              {/* Main content — 2 cols */}
              <div className="desktop:col-span-2 border-r border-zinc-100 p-8 sm:p-12">
                <div className="prose prose-lg max-w-none">
                  <MarkdownRenderer content={post.content} />
                </div>

                {/* Newsletter signup — every blog post */}
                <NewsletterForm source={`blog:${slug}`} />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-8 mt-8 border-t border-zinc-100">
                    <Tag className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-600 px-3 py-1 border border-zinc-100 font-mono hover:border-orange-200 hover:text-orange-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Share */}
                <div className="pt-8 mt-8 border-t border-zinc-100">
                  <h2 className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-5">
                    <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Share this article
                  </h2>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
                      aria-label="Share on X (Twitter)"
                    >
                      <SiX className="w-4 h-4" aria-hidden="true" />
                      X / Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white text-sm font-medium hover:bg-[#006699] transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <SiLinkedin className="w-4 h-4" aria-hidden="true" />
                      LinkedIn
                    </a>
                    <CopyLinkButton url={postUrl} />
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <aside>
                {/* CTA */}
                <div className="border-b border-zinc-100 p-8 sm:p-10">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                    Work Together
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3 leading-snug">
                    Have a project in mind?
                  </h3>
                  <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                    I design in Figma, build in Framer, and ship Chrome extensions that convert.
                  </p>
                  <a
                    href={SOCIAL_LINKS.calcom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-700 text-white font-bold text-sm hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                  >
                    Book a Free Call
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>

                {/* About */}
                <div className="p-8 sm:p-10">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                    About the Author
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {post.author.name.charAt(0)}
                    </div>
                    <p className="font-medium text-zinc-900 text-sm">{post.author.name}</p>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Figma &amp; Framer expert specializing in high-converting landing pages, UX copywriting, and Chrome extensions.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 mt-5 hover:text-orange-500 transition-colors"
                  >
                    View portfolio
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white">
            <div className="max-w-container border-l border-zinc-100">
              <GridContainer cols={1}>
                <GridItem padding={false} className="py-6 px-8 sm:px-12">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    Related Articles
                  </span>
                </GridItem>
              </GridContainer>
              <GridContainer cols={3}>
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <GridItem className="h-full flex flex-col min-h-[160px]">
                      <h3 className="font-medium text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug flex-1 mb-4">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-400 font-mono">{relatedPost.readingTime}</span>
                        <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </div>
                    </GridItem>
                  </Link>
                ))}
              </GridContainer>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}
