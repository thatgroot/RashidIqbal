import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL as siteUrl } from '@/lib/constants';
import { listPublishedCaseStudies, listAllResearchReports } from '@/lib/cms/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Get all blog posts for sitemap
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // CMS-driven entries: case studies + research reports.
  const [cases, reports] = await Promise.all([
    listPublishedCaseStudies().catch(() => []),
    listAllResearchReports().catch(() => []),
  ]);
  const caseEntries: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${siteUrl}/work/${c.slug}`,
    lastModified: c.updatedAt.toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  const researchEntries: MetadataRoute.Sitemap = reports
    .filter((r) => !!r.publishedAt)
    .map((r) => ({
      url: `${siteUrl}/research/${r.slug}`,
      lastModified: r.updatedAt.toISOString(),
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/links`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/framer-expert-for-saas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/framer-expert-for-fintech`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/framer-expert-for-ai-startups`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/framer-expert-for-yc-startups`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/chrome-extension-developer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/figma-to-framer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/framer-vs-webflow-for-saas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/framer-vs-wordpress-for-startups`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/hire-framer-expert-vs-agency`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/figma-to-framer-cost-2026`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...caseEntries,
    ...researchEntries,
    ...blogEntries,
  ];
}
