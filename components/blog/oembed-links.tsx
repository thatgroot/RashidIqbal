const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

export function BlogOEmbedLinks() {
  return (
    <>
      <link
        rel="alternate"
        type="application/json+oembed"
        href={`${siteUrl}/api/oembed?url=${encodeURIComponent(`${siteUrl}/blog`)}&format=json`}
        title="Blog oEmbed"
      />
      <link
        rel="alternate"
        type="text/xml+oembed"
        href={`${siteUrl}/api/oembed?url=${encodeURIComponent(`${siteUrl}/blog`)}&format=xml`}
        title="Blog oEmbed"
      />
    </>
  );
}

interface BlogPostOEmbedLinksProps {
  slug: string;
  title: string;
}

export function BlogPostOEmbedLinks({ slug, title }: BlogPostOEmbedLinksProps) {
  const postUrl = `${siteUrl}/blog/${slug}`;
  
  return (
    <>
      <link
        rel="alternate"
        type="application/json+oembed"
        href={`${siteUrl}/api/oembed?url=${encodeURIComponent(postUrl)}&format=json`}
        title={`${title} oEmbed`}
      />
      <link
        rel="alternate"
        type="text/xml+oembed"
        href={`${siteUrl}/api/oembed?url=${encodeURIComponent(postUrl)}&format=xml`}
        title={`${title} oEmbed`}
      />
    </>
  );
}

