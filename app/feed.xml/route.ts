import { getAllPostsHybrid } from '@/lib/blog-hybrid';
import { SITE_URL as siteUrl } from '@/lib/constants';

export async function GET() {
  const posts = await getAllPostsHybrid();

  const feedItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>rashid@aestho.xyz (Rashid Iqbal)</author>
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`;
    })
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Rashid Iqbal - Web Development Blog</title>
    <link>${siteUrl}</link>
    <description>Articles on web development, design, and freelancing by Rashid Iqbal</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logo.svg</url>
      <title>Rashid Iqbal</title>
      <link>${siteUrl}</link>
    </image>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

