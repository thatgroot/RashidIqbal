import { NextRequest, NextResponse } from 'next/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aestho.xyz';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  const format = searchParams.get('format') || 'json';
  const maxwidth = searchParams.get('maxwidth');
  const maxheight = searchParams.get('maxheight');

  // Validate URL
  if (!url || !url.startsWith(siteUrl)) {
    return NextResponse.json(
      { error: 'Invalid URL' },
      { status: 400 }
    );
  }

  // Check if this is a blog post
  const blogMatch = url.match(/\/blog\/([^\/]+)$/);
  let title = 'Rashid Iqbal - Freelance Web Developer & Designer';
  let description = 'Your Vision, Built Right. Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.';
  let thumbnailUrl = `${siteUrl}/og-image.jpg`;
  let embedType = 'rich';

  if (blogMatch) {
    const slug = blogMatch[1];
    // Format slug to title (basic conversion since we can't read files in edge runtime)
    title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    description = `Read "${title}" on Rashid Iqbal's blog about web development, mobile apps, and design.`;
    thumbnailUrl = `${siteUrl}/blog/${slug}/opengraph-image`;
    embedType = 'article';
  } else if (url.includes('/blog')) {
    title = 'Blog - Rashid Iqbal';
    description = 'Expert articles on web development, mobile apps, design systems, and conversion optimization.';
  }

  // oEmbed response
  const oembedResponse = {
    type: embedType,
    version: '1.0',
    title,
    description,
    author_name: 'Rashid Iqbal',
    author_url: siteUrl,
    provider_name: 'Rashid Iqbal',
    provider_url: siteUrl,
    cache_age: 3600,
    html: `<iframe src="${url}" width="${maxwidth || '800'}" height="${maxheight || '600'}" frameborder="0" allowfullscreen title="${escapeXml(title)}"></iframe>`,
    width: maxwidth ? parseInt(maxwidth) : 800,
    height: maxheight ? parseInt(maxheight) : 600,
    thumbnail_url: thumbnailUrl,
    thumbnail_width: 1200,
    thumbnail_height: 630,
  };

  if (format === 'xml') {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<oembed>
  <type>${escapeXml(oembedResponse.type)}</type>
  <version>${oembedResponse.version}</version>
  <title>${escapeXml(oembedResponse.title)}</title>
  <description>${escapeXml(oembedResponse.description)}</description>
  <author_name>${escapeXml(oembedResponse.author_name)}</author_name>
  <author_url>${escapeXml(oembedResponse.author_url)}</author_url>
  <provider_name>${escapeXml(oembedResponse.provider_name)}</provider_name>
  <provider_url>${escapeXml(oembedResponse.provider_url)}</provider_url>
  <cache_age>${oembedResponse.cache_age}</cache_age>
  <html><![CDATA[${oembedResponse.html}]]></html>
  <width>${oembedResponse.width}</width>
  <height>${oembedResponse.height}</height>
  <thumbnail_url>${escapeXml(oembedResponse.thumbnail_url)}</thumbnail_url>
  <thumbnail_width>${oembedResponse.thumbnail_width}</thumbnail_width>
  <thumbnail_height>${oembedResponse.thumbnail_height}</thumbnail_height>
</oembed>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }

  return NextResponse.json(oembedResponse);
}
