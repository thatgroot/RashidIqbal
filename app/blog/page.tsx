import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getFeaturedPosts, getAllTags } from "@/lib/blog";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

export const metadata: Metadata = {
  title: "Blog - Web Development Insights & Tutorials",
  description:
    "Expert articles on web development, mobile apps, design systems, and conversion optimization. Learn from real project experiences and industry best practices.",
  keywords: [
    "web development blog",
    "Next.js tutorials",
    "React development",
    "mobile app development",
    "conversion optimization",
    "Framer tutorials",
    "freelance developer blog",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/blog`,
    siteName: "Rashid Iqbal",
    title: "Blog - Web Development Insights & Tutorials",
    description:
      "Expert articles on web development, mobile apps, design systems, and conversion optimization.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Web Development Insights & Tutorials",
    description:
      "Expert articles on web development, mobile apps, and conversion optimization.",
    creator: "@rashidiqbal",
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
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/50" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-zinc-100 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
              Insights & Tutorials
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
              Deep dives into web development, mobile apps, design systems, and the strategies that help businesses convert more visitors into customers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="h-full border border-zinc-200 rounded-lg overflow-hidden hover:border-orange-500 transition-colors">
                    {post.coverImage && (
                      <div className="relative aspect-video bg-zinc-100">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/50 to-transparent" />
                        <span className="absolute bottom-4 left-4 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          {post.readingTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-zinc-500 line-clamp-2 mb-4">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts & Sidebar */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Posts List */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
              All Articles
            </h2>
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="flex gap-6 p-6 border border-zinc-100 rounded-lg hover:border-orange-500/50 hover:bg-zinc-50/50 transition-all">
                    {post.coverImage && (
                      <div className="hidden sm:block relative w-48 h-32 rounded overflow-hidden bg-zinc-100 shrink-0">
                        <Image
                          src={post.coverImage}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="192px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          {post.readingTime}
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-zinc-500 text-sm line-clamp-2 mb-3">
                        {post.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 group-hover:text-orange-500">
                        Read article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-16 border border-dashed border-zinc-200 rounded-lg">
                <p className="text-zinc-500">No posts yet. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Tags */}
            <div className="p-6 border border-zinc-100 rounded-lg">
              <h3 className="flex items-center gap-2 text-sm font-mono text-zinc-900 uppercase tracking-widest mb-4">
                <Tag className="w-4 h-4" aria-hidden="true" />
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-sm rounded hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-default"
                  >
                    {tag} ({count})
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="p-6 bg-zinc-900 text-white rounded-lg">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Get notified when I publish new articles on web development and design.
              </p>
              <a
                href="https://cal.com/rashid.iqbal"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 bg-orange-500 text-white text-center text-sm font-medium rounded hover:bg-orange-600 transition-colors"
              >
                Let&apos;s Connect
              </a>
            </div>

            {/* About */}
            <div className="p-6 border border-zinc-100 rounded-lg">
              <h3 className="text-sm font-mono text-zinc-900 uppercase tracking-widest mb-4">
                About the Author
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                I&apos;m Rashid, a freelance web developer specializing in high-converting landing pages, web applications, and mobile apps. I write about what I learn building products for clients.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 mt-4 hover:text-orange-500"
              >
                View portfolio
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

