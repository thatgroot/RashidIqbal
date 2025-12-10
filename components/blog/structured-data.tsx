const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

// Types are declared globally in types/blog.d.ts
interface BlogStructuredDataProps {
  posts: BlogPostMeta[];
}

export function BlogStructuredData({ posts }: BlogStructuredDataProps) {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog#blog`,
    mainEntityOfPage: `${siteUrl}/blog`,
    name: "Rashid Iqbal Blog",
    description: "Expert articles on web development, mobile apps, design systems, and conversion optimization.",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Rashid Iqbal",
      url: siteUrl,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      "@id": `${siteUrl}/blog/${post.slug}#article`,
      headline: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: post.author.name,
      },
      image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/og-image.jpg`,
      keywords: post.tags.join(", "),
      articleSection: post.category,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

interface BlogPostStructuredDataProps {
  post: BlogPost;
}

export function BlogPostStructuredData({ post }: BlogPostStructuredDataProps) {
  // Calculate word count for schema
  const wordCount = post.content.split(/\s+/).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.description,
    image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: post.author.name,
      url: siteUrl,
      sameAs: [
        post.author.twitter ? `https://twitter.com/${post.author.twitter.replace("@", "")}` : null,
        post.author.linkedin ? `https://linkedin.com/in/${post.author.linkedin}` : null,
      ].filter(Boolean),
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Rashid Iqbal",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: wordCount,
    inLanguage: "en-US",
    copyrightYear: new Date(post.date).getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: post.author.name,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  // FAQ schema if the post contains FAQ-like content (questions)
  const faqItems = extractFAQs(post.content);
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

// Helper to extract FAQ-like content from markdown
function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split("\n");
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Look for headings that end with "?"
    if ((line.startsWith("## ") || line.startsWith("### ")) && line.endsWith("?")) {
      const question = line.replace(/^#+\s*/, "");
      // Get the next paragraph as the answer
      let answer = "";
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        if (nextLine.startsWith("#") || nextLine === "") {
          if (answer) break;
          continue;
        }
        answer += nextLine + " ";
      }
      if (answer) {
        faqs.push({ question, answer: answer.trim() });
      }
    }
  }
  
  return faqs.slice(0, 10); // Limit to 10 FAQs
}

