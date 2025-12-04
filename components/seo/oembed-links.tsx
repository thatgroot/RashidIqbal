"use client";

import { useEffect } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

export function OEmbedLinks() {
  useEffect(() => {
    // Add oEmbed discovery links to head
    // Note: Next.js metadata API doesn't support custom link tags,
    // so we add them via script for oEmbed discovery
    const jsonLink = document.createElement("link");
    jsonLink.rel = "alternate";
    jsonLink.type = "application/json+oembed";
    jsonLink.href = `${siteUrl}/api/oembed?url=${encodeURIComponent(siteUrl)}&format=json`;
    jsonLink.title = "oEmbed Profile";
    
    const xmlLink = document.createElement("link");
    xmlLink.rel = "alternate";
    xmlLink.type = "application/xml+oembed";
    xmlLink.href = `${siteUrl}/api/oembed?url=${encodeURIComponent(siteUrl)}&format=xml`;
    xmlLink.title = "oEmbed Profile";

    document.head.appendChild(jsonLink);
    document.head.appendChild(xmlLink);

    return () => {
      jsonLink.remove();
      xmlLink.remove();
    };
  }, []);

  return null;
}

