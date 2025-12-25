import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL as siteUrl } from '@/lib/constants';

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

  // oEmbed response
  const oembedResponse = {
    type: 'rich',
    version: '1.0',
    title: 'Rashid Iqbal - Freelance Web Developer & Designer',
    author_name: 'Rashid Iqbal',
    author_url: siteUrl,
    provider_name: 'Rashid Iqbal',
    provider_url: siteUrl,
    cache_age: 3600,
    html: `<iframe src="${url}" width="${maxwidth || '800'}" height="${maxheight || '600'}" frameborder="0" allowfullscreen></iframe>`,
    width: maxwidth ? parseInt(maxwidth) : 800,
    height: maxheight ? parseInt(maxheight) : 600,
    thumbnail_url: `${siteUrl}/og-image.jpg`,
    thumbnail_width: 1200,
    thumbnail_height: 630,
  };

  if (format === 'xml') {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<oembed>
  <type>${oembedResponse.type}</type>
  <version>${oembedResponse.version}</version>
  <title>${oembedResponse.title}</title>
  <author_name>${oembedResponse.author_name}</author_name>
  <author_url>${oembedResponse.author_url}</author_url>
  <provider_name>${oembedResponse.provider_name}</provider_name>
  <provider_url>${oembedResponse.provider_url}</provider_url>
  <cache_age>${oembedResponse.cache_age}</cache_age>
  <html>${oembedResponse.html}</html>
  <width>${oembedResponse.width}</width>
  <height>${oembedResponse.height}</height>
  <thumbnail_url>${oembedResponse.thumbnail_url}</thumbnail_url>
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

