import { db, schema } from "@/db/client";
import { and, asc, desc, eq, isNotNull } from "drizzle-orm";

// Public readers — used at SSR by the marketing components. Always filter
// by published_at so unpublished drafts never leak. Server-only.

export async function listPublishedTestimonials() {
  return db
    .select()
    .from(schema.cmsTestimonials)
    .where(isNotNull(schema.cmsTestimonials.publishedAt))
    .orderBy(asc(schema.cmsTestimonials.sortOrder), desc(schema.cmsTestimonials.publishedAt));
}

export async function listPublishedFaqs(surface = "landing") {
  return db
    .select()
    .from(schema.cmsFaqs)
    .where(
      and(
        isNotNull(schema.cmsFaqs.publishedAt),
        eq(schema.cmsFaqs.surface, surface)
      )
    )
    .orderBy(asc(schema.cmsFaqs.sortOrder));
}

export async function listPublishedCaseStudies() {
  return db
    .select()
    .from(schema.cmsCaseStudies)
    .where(isNotNull(schema.cmsCaseStudies.publishedAt))
    .orderBy(asc(schema.cmsCaseStudies.sortOrder), desc(schema.cmsCaseStudies.publishedAt));
}

export async function getCaseStudyBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(schema.cmsCaseStudies)
    .where(
      and(
        eq(schema.cmsCaseStudies.slug, slug),
        isNotNull(schema.cmsCaseStudies.publishedAt)
      )
    )
    .limit(1);
  return row ?? null;
}

export async function listPublishedBlogPosts() {
  return db
    .select()
    .from(schema.cmsBlogPosts)
    .where(isNotNull(schema.cmsBlogPosts.publishedAt))
    .orderBy(desc(schema.cmsBlogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(schema.cmsBlogPosts)
    .where(
      and(
        eq(schema.cmsBlogPosts.slug, slug),
        isNotNull(schema.cmsBlogPosts.publishedAt)
      )
    )
    .limit(1);
  return row ?? null;
}

// Admin readers — return everything regardless of published state.

export async function listAllTestimonials() {
  return db.select().from(schema.cmsTestimonials).orderBy(asc(schema.cmsTestimonials.sortOrder));
}

export async function listAllFaqs() {
  return db.select().from(schema.cmsFaqs).orderBy(asc(schema.cmsFaqs.sortOrder));
}

export async function listAllCaseStudies() {
  return db.select().from(schema.cmsCaseStudies).orderBy(asc(schema.cmsCaseStudies.sortOrder));
}

export async function listAllBlogPosts() {
  return db
    .select()
    .from(schema.cmsBlogPosts)
    .orderBy(desc(schema.cmsBlogPosts.publishedAt), desc(schema.cmsBlogPosts.updatedAt));
}

export async function listAllSubscribers() {
  return db.select().from(schema.cmsSubscribers).orderBy(desc(schema.cmsSubscribers.createdAt));
}

export async function listAllNewsletterIssues() {
  return db
    .select()
    .from(schema.cmsNewsletterIssues)
    .orderBy(desc(schema.cmsNewsletterIssues.sentAt), desc(schema.cmsNewsletterIssues.updatedAt));
}

export async function listAllIndustryPages() {
  return db
    .select()
    .from(schema.cmsIndustryPages)
    .orderBy(asc(schema.cmsIndustryPages.industry));
}

export async function listAllResearchReports() {
  return db
    .select()
    .from(schema.cmsResearchReports)
    .orderBy(desc(schema.cmsResearchReports.publishedAt));
}
