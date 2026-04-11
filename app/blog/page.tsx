import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getAllTags } from "@/lib/blog";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { GridContainer, GridItem } from "@/components/v2/grid-system";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { SITE_URL as siteUrl, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Figma, Framer & Conversion Insights",
  description:
    "Articles on Figma design, Framer development, UX copy, and conversion optimization. Real insights from 50+ projects shipped.",
  keywords: [
    "Figma blog",
    "Framer tutorials",
    "UX copywriting",
    "conversion optimization",
    "Chrome extension development",
    "Figma to Framer",
    "landing page design",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/blog`,
    siteName: "Rashid Iqbal",
    title: "Blog | Figma, Framer & Conversion Insights",
    description:
      "Articles on Figma design, Framer development, UX copywriting, and conversion optimization.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal — Figma & Framer Blog",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rashidrealme",
    creator: "@rashidrealme",
    title: "Blog | Figma, Framer & Conversion Insights",
    description:
      "Figma design, Framer development, UX copywriting, and conversion optimization insights.",
    images: [
      {
        url: `${siteUrl}/twitter-image`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal — Figma & Framer Blog",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const tags = getAllTags().slice(0, 8);

  return (
    <main id="main-content" className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden">
      <PageBackground />
      <Navbar />

      {/* Hero */}
      <section className="pt-16 bg-white relative">
        <div className="max-w-container border-l border-zinc-100 relative">
          <GridContainer cols={1}>
            <GridItem className="border-t pt-16 pb-12" padding={false}>
              <div className="px-8 sm:px-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-mono uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 bg-orange-500 animate-pulse" aria-hidden="true" />
                  Blog
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 mb-6 tracking-tight leading-[0.95]">
                  Insights &amp; Tutorials
                </h1>
                <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl">
                  Deep dives into Figma design, Framer development, UX copywriting, Chrome extensions, and the strategies that turn visitors into customers.
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-container border-l border-zinc-100">
            <GridContainer cols={1}>
              <GridItem padding={false} className="py-6 px-8 sm:px-12">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Featured Articles
                </span>
              </GridItem>
            </GridContainer>
            <GridContainer cols={2}>
              {featuredPosts.slice(0, 2).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <GridItem className="h-full flex flex-col min-h-[260px]">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="px-2 py-1 bg-orange-500 text-white text-[10px] font-mono uppercase tracking-widest">
                        Featured
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{post.category}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors flex-1 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-zinc-500 line-clamp-2 mb-6">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                      <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {post.readingTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                        Read
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </span>
                    </div>
                  </GridItem>
                </Link>
              ))}
            </GridContainer>
          </div>
        </section>
      )}

      {/* All Articles + Sidebar */}
      <section className="bg-white">
        <div className="max-w-container border-l border-zinc-100">
          <GridContainer cols={1}>
            <GridItem padding={false} className="py-6 px-8 sm:px-12">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                All Articles
              </span>
            </GridItem>
          </GridContainer>

          {/* Main + Sidebar grid — 2col: articles take 2, sidebar takes 1 */}
          <div className="grid desktop:grid-cols-3 border-b border-zinc-100">

            {/* Articles list — spans 2 cols */}
            <div className="desktop:col-span-2 border-r border-zinc-100">
              {posts.length === 0 && (
                <div className="p-12 text-center border-b border-zinc-100">
                  <p className="text-zinc-500 font-mono text-sm">No posts yet. Check back soon!</p>
                </div>
              )}
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="relative border-b border-zinc-100 p-8 sm:p-12 transition-colors duration-200 grid-item-hover grid-item-corners overflow-hidden bg-white hover:bg-zinc-50/80">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest border border-zinc-100 px-2 py-1">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-zinc-500 line-clamp-2 mb-5">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>

            {/* Sidebar */}
            <aside>
              {/* Topics */}
              <div className="border-b border-zinc-100 p-8 sm:p-10">
                <h3 className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
                  <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(({ tag, count }) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 border border-zinc-100 text-zinc-600 text-xs font-mono hover:border-orange-200 hover:text-orange-600 transition-colors cursor-default"
                    >
                      {tag} ({count})
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="border-b border-zinc-100 p-8 sm:p-10">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                  Work Together
                </span>
                <h3 className="text-lg font-semibold text-zinc-900 mb-3 leading-snug">
                  Have a project in mind?
                </h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  I design in Figma, build in Framer, and ship Chrome extensions. Book a free call to get started.
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
                <p className="text-sm text-zinc-500 leading-relaxed">
                  I&apos;m Rashid, a Figma &amp; Framer expert specializing in high-converting landing pages, UX copywriting, and Chrome extensions. I write about what I learn.
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

      <Footer />
    </main>
  );
}
