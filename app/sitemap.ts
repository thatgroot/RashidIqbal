import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aestho.xyz';
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/v2`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Blog posts
  const posts = getAllPosts();
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Blog tag pages
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag.toLowerCase())));
  
  const tagPages: MetadataRoute.Sitemap = Array.from(tags).map((tag) => ({
    url: `${siteUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...blogPosts, ...tagPages];
}
