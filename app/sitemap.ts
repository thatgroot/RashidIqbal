import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SERVICES, LOCATIONS, TECHNOLOGIES } from '@/lib/seo-data';
import { SITE_URL as siteUrl } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Get all blog posts for sitemap
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Service pages
  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Location pages
  const locationEntries: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
    url: `${siteUrl}/hire/${location.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Technology pages
  const technologyEntries: MetadataRoute.Sitemap = TECHNOLOGIES.map((tech) => ({
    url: `${siteUrl}/developer/${tech.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
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
      url: `${siteUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/hire`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/developer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/audit`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/partners`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/links`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/assets`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...serviceEntries,
    ...locationEntries,
    ...technologyEntries,
    ...blogEntries,
  ];
}
