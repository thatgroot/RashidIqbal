import { Metadata } from "next";
import Link from "next/link";
import {
  getAllPostsHybrid,
  getFeaturedPostsHybrid,
  getPostsByTagHybrid,
  getAllTagsHybrid,
} from "@/lib/blog-hybrid";
import { Navbar } from "@/components/layout/navbar";
import { PageBackground } from "@/components/ui/page-background";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ArrowRight, Calendar, Clock, Tag, X, ChevronLeft, ChevronRight } from "@/components/icons";
import { SITE_URL as siteUrl, SOCIAL_LINKS } from "@/lib/constants";

// ============================================================================
// Constants
// ============================================================================

const POSTS_PER_PAGE = 6;

// ============================================================================
// Types
// ============================================================================

type BlogPageProps = {
  searchParams: Promise<{ tag?: string; page?: string }>;
};

// ============================================================================
// Helpers
// ============================================================================

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parsePage(raw: string | undefined): number {
  const n = parseInt(raw ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

function normalizeTag(raw: string | undefined): string | null {
  const t = raw?.trim();
  return t ? t : null;
}

// Build a `/blog` URL preserving/overriding current tag + page
function buildBlogUrl(
  currentTag: string | null,
  currentPage: number,
  overrides: { tag?: string | null; page?: number } = {}
): string {
  const finalTag =
    overrides.tag !== undefined ? overrides.tag : currentTag;
  const finalPage = overrides.page !== undefined ? overrides.page : currentPage;
  const params = new URLSearchParams();
  if (finalTag) params.set("tag", finalTag);
  if (finalPage && finalPage > 1) params.set("page", String(finalPage));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

// Produce a compact pagination range with ellipsis, e.g. [1, "…", 4, 5, 6, "…", 12]
function paginationRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const out: (number | "…")[] = [];
  const around = [current - 1, current, current + 1].filter(
    (n) => n > 1 && n < total
  );
  out.push(1);
  if (around[0] && around[0] > 2) out.push("…");
  out.push(...around);
  if (around[around.length - 1] && around[around.length - 1] < total - 1) {
    out.push("…");
  }
  out.push(total);
  return out;
}

// ============================================================================
// Metadata (dynamic: reflects tag + page)
// ============================================================================

export async function generateMetadata(
  props: BlogPageProps
): Promise<Metadata> {
  const sp = await props.searchParams;
  const tag = normalizeTag(sp.tag);
  const page = parsePage(sp.page);

  const baseTitle = "Blog: Figma, Framer & Conversion Insights";
  const baseDesc =
    "Articles on Figma design, Framer development, UX copy, and conversion optimization. Real insights from 50+ projects shipped.";

  let title = baseTitle;
  let description = baseDesc;
  let canonical = `${siteUrl}/blog`;

  if (tag) {
    title = `${tag} articles · Rashid Iqbal`;
    description = `Articles tagged "${tag}", covering ${tag.toLowerCase()} for Figma, Framer, and conversion-focused web design.`;
    // Canonical uses LOWERCASE tag so /blog?tag=Design and
    // /blog?tag=design collapse to one URL in Google's index. Case
    // variants were producing 4 duplicate-content pairs in the audit.
    canonical = `${siteUrl}${buildBlogUrl(tag.toLowerCase(), 1)}`;
  }

  if (page > 1) {
    title = `${title} · page ${page}`;
    // Paginated canonical also lowercases the tag for the same reason.
    canonical = `${siteUrl}${buildBlogUrl(tag ? tag.toLowerCase() : null, page)}`;
  }

  // Noindex paginated views (page > 1) — they otherwise duplicate the
  // canonical /blog?tag=… page's title + description in Google's eyes.
  // Search results should always land on page 1; pagination is for the
  // visitor, not the search engine.
  const isPaginated = page > 1;

  return {
    title,
    description,
    ...(isPaginated ? { robots: { index: false, follow: true } } : {}),
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
      url: canonical,
      siteName: "Rashid Iqbal",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/api/blog-og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@rashidrealme",
      creator: "@rashidrealme",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/api/blog-og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical,
    },
  };
}

// ============================================================================
// Page
// ============================================================================

export default async function BlogPage(props: BlogPageProps) {
  const sp = await props.searchParams;
  const activeTag = normalizeTag(sp.tag);
  const rawPage = parsePage(sp.page);

  // Filter posts
  const filteredPosts = activeTag
    ? await getPostsByTagHybrid(activeTag)
    : await getAllPostsHybrid();

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );
  const currentPage = Math.min(Math.max(1, rawPage), totalPages);
  const pagePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured posts only render on page 1 of the unfiltered list
  const showFeatured = !activeTag && currentPage === 1;
  const featuredPosts = showFeatured ? await getFeaturedPostsHybrid() : [];

  // All tags for the filter sidebar
  const tags = await getAllTagsHybrid();

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#ffffff] text-[#0a0a0a] selection:bg-[#0a0a0a]/30 selection:text-black font-sans relative overflow-hidden"
    >
      <PageBackground />
      <Navbar />

      {/* Hero */}
      <section className="pt-16 bg-white relative">
        <div className="max-w-container border-l border-[#e5e5e5] relative">
          <GridContainer cols={1}>
            <GridItem className="border-t pt-16 pb-12" padding={false}>
              <div className="px-8 sm:px-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#fafafa] text-[#0a0a0a] text-xs font-mono uppercase tracking-widest mb-6">
                  <span
                    className="w-1.5 h-1.5 bg-[#0a0a0a] animate-pulse"
                    aria-hidden="true"
                  />
                  Blog
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0a0a0a] mb-6 tracking-tight leading-[0.95]">
                  Insights &amp; Tutorials
                </h1>
                <p className="text-lg md:text-xl text-[#737373] leading-relaxed max-w-2xl">
                  Deep dives into Figma design, Framer development, UX
                  copywriting, Chrome extensions, and the strategies that turn
                  visitors into customers.
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </section>

      {/* Featured Posts, only on page 1, unfiltered */}
      {featuredPosts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-container border-l border-[#e5e5e5]">
            <GridContainer cols={1}>
              <GridItem padding={false} className="py-6 px-8 sm:px-12">
                <span className="text-xs font-mono text-[#737373] uppercase tracking-widest">
                  Which posts are worth reading first?
                </span>
              </GridItem>
            </GridContainer>
            <GridContainer cols={2}>
              {featuredPosts.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <GridItem className="h-full flex flex-col min-h-[260px]">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="px-2 py-1 bg-[#0a0a0a] text-white text-[10px] font-mono uppercase tracking-widest">
                        Featured
                      </span>
                      <span className="text-[10px] font-mono text-[#737373] uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a] transition-colors flex-1 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#737373] line-clamp-2 mb-6">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                      <div className="flex items-center gap-4 text-xs text-[#737373] font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {post.readingTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0a0a0a]">
                        Read
                        <ArrowRight
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
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
        <div className="max-w-container border-l border-[#e5e5e5]">
          <GridContainer cols={1}>
            <GridItem padding={false} className="py-6 px-8 sm:px-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#737373] uppercase tracking-widest">
                  {activeTag
                    ? `Tagged "${activeTag}" · ${filteredPosts.length} article${
                        filteredPosts.length === 1 ? "" : "s"
                      }`
                    : "What else is on the blog?"}
                </span>
                {activeTag && (
                  <Link
                    href={buildBlogUrl(activeTag, currentPage, {
                      tag: null,
                      page: 1,
                    })}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                    Clear filter
                  </Link>
                )}
              </div>
            </GridItem>
          </GridContainer>

          {/* Main + Sidebar grid, 2col: articles take 2, sidebar takes 1 */}
          <div className="grid desktop:grid-cols-3 border-b border-[#e5e5e5]">
            {/* Articles list, spans 2 cols */}
            <div className="desktop:col-span-2 border-r border-[#e5e5e5]">
              {pagePosts.length === 0 && (
                <div className="p-12 text-center border-b border-[#e5e5e5]">
                  <p className="text-[#737373] font-mono text-sm mb-4">
                    {activeTag
                      ? `No posts tagged "${activeTag}" yet.`
                      : "No posts yet. Check back soon!"}
                  </p>
                  {activeTag && (
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0a0a0a] hover:text-[#0a0a0a]"
                    >
                      <ArrowRight
                        className="w-4 h-4 rotate-180"
                        aria-hidden="true"
                      />
                      Back to all articles
                    </Link>
                  )}
                </div>
              )}
              {pagePosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="relative border-b border-[#e5e5e5] p-8 sm:p-12 transition-colors duration-200 grid-item-hover grid-item-corners overflow-hidden bg-white hover:bg-[#fafafa]/80">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-[10px] font-mono text-[#737373] uppercase tracking-widest border border-[#e5e5e5] px-2 py-1">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#737373] font-mono">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#737373] font-mono">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-[#0a0a0a] mb-2 group-hover:text-[#0a0a0a] transition-colors line-clamp-1 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#737373] line-clamp-2 mb-5">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0a0a0a]">
                      Read article
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </article>
                </Link>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="flex items-center justify-between gap-3 p-6 sm:p-8"
                  aria-label="Blog pagination"
                >
                  {/* Prev */}
                  {currentPage > 1 ? (
                    <Link
                      href={buildBlogUrl(activeTag, currentPage, {
                        page: currentPage - 1,
                      })}
                      rel="prev"
                      aria-label="Previous page"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] text-sm font-medium text-[#0a0a0a] hover:border-[#8b7cf8] hover:text-[#0a0a0a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      Prev
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] text-sm font-medium text-zinc-300 cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      Prev
                    </span>
                  )}

                  {/* Page numbers */}
                  <ol className="flex items-center gap-1.5">
                    {paginationRange(currentPage, totalPages).map((p, i) =>
                      p === "…" ? (
                        <li
                          key={`gap-${i}`}
                          className="px-2 text-xs font-mono text-zinc-300"
                          aria-hidden="true"
                        >
                          …
                        </li>
                      ) : (
                        <li key={p}>
                          {p === currentPage ? (
                            <span
                              aria-current="page"
                              className="inline-flex items-center justify-center w-9 h-9 text-sm font-bold text-white bg-[#0a0a0a]"
                            >
                              {p}
                            </span>
                          ) : (
                            <Link
                              href={buildBlogUrl(activeTag, currentPage, {
                                page: p,
                              })}
                              aria-label={`Page ${p}`}
                              className="inline-flex items-center justify-center w-9 h-9 text-sm font-medium text-[#737373] border border-[#e5e5e5] hover:border-[#8b7cf8] hover:text-[#0a0a0a] transition-colors"
                            >
                              {p}
                            </Link>
                          )}
                        </li>
                      )
                    )}
                  </ol>

                  {/* Next */}
                  {currentPage < totalPages ? (
                    <Link
                      href={buildBlogUrl(activeTag, currentPage, {
                        page: currentPage + 1,
                      })}
                      rel="next"
                      aria-label="Next page"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] text-sm font-medium text-[#0a0a0a] hover:border-[#8b7cf8] hover:text-[#0a0a0a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] text-sm font-medium text-zinc-300 cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  )}
                </nav>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              {/* Topics, now clickable filters */}
              <div className="border-b border-[#e5e5e5] p-8 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="flex items-center gap-2 text-xs font-mono text-[#737373] uppercase tracking-widest">
                    <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                    Topics
                  </h3>
                  {activeTag && (
                    <Link
                      href="/blog"
                      className="text-[10px] font-mono text-[#0a0a0a] hover:text-[#0a0a0a] uppercase tracking-widest"
                    >
                      Reset
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* "All" pill */}
                  {activeTag ? (
                    <Link
                      href="/blog"
                      className="px-3 py-1.5 border border-[#e5e5e5] text-[#737373] text-xs font-mono hover:border-[#e5e5e5] hover:text-[#0a0a0a] transition-colors"
                    >
                      All
                    </Link>
                  ) : (
                    <span className="px-3 py-1.5 border border-[#0a0a0a] bg-[#0a0a0a] text-white text-xs font-mono">
                      All
                    </span>
                  )}
                  {tags.map(({ tag, count }) => {
                    const isActive =
                      activeTag?.toLowerCase() === tag.toLowerCase();
                    return isActive ? (
                      <span
                        key={tag}
                        aria-current="true"
                        className="px-3 py-1.5 border border-[#0a0a0a] bg-[#0a0a0a] text-white text-xs font-mono"
                      >
                        {tag} ({count})
                      </span>
                    ) : (
                      <Link
                        key={tag}
                        href={buildBlogUrl(null, 1, { tag, page: 1 })}
                        className="px-3 py-1.5 border border-[#e5e5e5] text-[#737373] text-xs font-mono hover:border-[#e5e5e5] hover:text-[#0a0a0a] transition-colors"
                      >
                        {tag} ({count})
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="border-b border-[#e5e5e5] p-8 sm:p-10">
                <span className="text-xs font-mono text-[#737373] uppercase tracking-widest block mb-4">
                  Work Together
                </span>
                <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3 leading-snug">
                  Have a project in mind?
                </h3>
                <p className="text-sm text-[#737373] mb-6 leading-relaxed">
                  I design in Figma, build in Framer, and ship Chrome
                  extensions. Book a free call to get started.
                </p>
                <a
                  href={SOCIAL_LINKS.calcom}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white font-bold text-sm hover:bg-[#0a0a0a] transition-colors shadow-lg shadow-[#0a0a0a]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2"
                >
                  Book a Free Call
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              {/* About */}
              <div className="p-8 sm:p-10">
                <span className="text-xs font-mono text-[#737373] uppercase tracking-widest block mb-4">
                  About the Author
                </span>
                <p className="text-sm text-[#737373] leading-relaxed">
                  I&apos;m Rashid, a Figma &amp; Framer expert specializing in
                  high-converting landing pages, UX copywriting, and Chrome
                  extensions. I write about what I learn.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#0a0a0a] mt-5 hover:text-[#0a0a0a] transition-colors"
                >
                  View portfolio
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
