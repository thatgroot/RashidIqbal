"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ]}
      components={{
        // Custom image component using next/image
        img: ({ src, alt }) => {
          if (!src) return null;

          // Handle external images
          const isExternal = (src as string).startsWith("http");

          if (isExternal) {
            return (
              <span className="block my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src as string}
                  alt={alt || ""}
                  className="rounded-lg w-full"
                  loading="lazy"
                />
              </span>
            );
          }

          return (
            <span className="block my-8 relative aspect-video">
              <Image
                src={src as string}
                alt={alt || ""}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </span>
          );
        },
        // Custom heading styles. Demote markdown `#` to <h2> so the
        // page-level <h1> (from frontmatter title) stays unique.
        h1: ({ children }) => (
          <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-[#292827] border-b border-[#e8e4dd] pb-2">
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-[#292827] border-b border-[#e8e4dd] pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#292827]">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold mt-6 mb-2 text-[#292827]">
            {children}
          </h4>
        ),
        // Paragraph styles
        p: ({ children }) => (
          <p className="text-[#73706d] leading-relaxed mb-4">{children}</p>
        ),
        // Link styles
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-[#1b1938] hover:text-[#1b1938]"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        // List styles
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-[#73706d]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-[#73706d]">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="ml-4">{children}</li>,
        // Blockquote styles
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#1b1938] pl-4 py-2 my-6 bg-[#fafaf8]/50 text-[#292827] italic">
            {children}
          </blockquote>
        ),
        // Code styles
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-[#fafaf8] text-[#292827] px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className={className}>{children}</code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-[#1b1938] text-zinc-100 p-4 rounded-lg overflow-x-auto my-6 text-sm">
            {children}
          </pre>
        ),
        // Table styles
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-[#e8e4dd] rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#fafaf8]">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left text-sm font-semibold text-[#292827] border-b border-[#e8e4dd]">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-sm text-[#73706d] border-b border-[#e8e4dd]">
            {children}
          </td>
        ),
        // Horizontal rule
        hr: () => <hr className="my-8 border-[#e8e4dd]" />,
        // Strong and emphasis
        strong: ({ children }) => (
          <strong className="font-semibold text-[#292827]">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

