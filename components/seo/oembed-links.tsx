const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

/**
 * Server-side rendered oEmbed discovery links
 * These links enable platforms like Slack, Discord, and other services
 * to discover and display rich embeds when sharing links to this site.
 */
export function OEmbedLinks() {
  return (
    <>
      <link
        rel="alternate"
        type="application/json+oembed"
        href={`${siteUrl}/api/oembed?url=${encodeURIComponent(siteUrl)}&format=json`}
        title="oEmbed Profile"
      />
      <link
        rel="alternate"
        type="application/xml+oembed"
        href={`${siteUrl}/api/oembed?url=${encodeURIComponent(siteUrl)}&format=xml`}
        title="oEmbed Profile"
      />
    </>
  );
}

