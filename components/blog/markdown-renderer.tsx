"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Highlight, themes } from "prism-react-renderer";
import Image from "next/image";
import Link from "next/link";

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
      ]}
      components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-12 mb-6 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mt-10 mb-4 scroll-mt-20">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mt-8 mb-3 scroll-mt-20">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-bold text-zinc-900 mt-6 mb-2">
            {children}
          </h4>
        ),

        // Paragraphs
        p: ({ children }) => (
          <p className="text-zinc-600 leading-relaxed mb-6">
            {children}
          </p>
        ),

        // Links
        a: ({ href, children }) => {
          const isExternal = href?.startsWith("http");
          if (isExternal) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-500 underline underline-offset-2"
              >
                {children}
              </a>
            );
          }
          return (
            <Link
              href={href || "#"}
              className="text-orange-600 hover:text-orange-500 underline underline-offset-2"
            >
              {children}
            </Link>
          );
        },

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-6 text-zinc-600">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-6 text-zinc-600">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-6 bg-orange-50/50 rounded-r-lg">
            <div className="text-zinc-700 italic">{children}</div>
          </blockquote>
        ),

        // Code blocks
        code: ({ className, children }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";
          const codeString = String(children).replace(/\n$/, "");

          if (!match) {
            // Inline code
            return (
              <code className="px-1.5 py-0.5 bg-zinc-100 text-zinc-800 text-sm rounded font-mono">
                {children}
              </code>
            );
          }

          // Code block with syntax highlighting
          return (
            <div className="my-6 rounded-lg overflow-hidden border border-zinc-200">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 text-zinc-400">
                <span className="text-xs font-mono uppercase">{language}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(codeString)}
                  className="text-xs hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <Highlight
                theme={themes.nightOwl}
                code={codeString}
                language={language}
              >
                {({ style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    style={style}
                    className="p-4 overflow-x-auto text-sm"
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        <span className="inline-block w-8 text-zinc-500 select-none text-right mr-4">
                          {i + 1}
                        </span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          );
        },

        // Images
        img: ({ src, alt }) => {
          if (!src || typeof src !== "string") return null;
          const isExternal = src.startsWith("http");
          
          if (isExternal) {
            // eslint-disable-next-line @next/next/no-img-element
            return (
              <figure className="my-8">
                <img
                  src={src}
                  alt={alt || ""}
                  className="w-full rounded-lg shadow-lg"
                />
                {alt && (
                  <figcaption className="text-center text-sm text-zinc-500 mt-3">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          }

          return (
            <figure className="my-8">
              <div className="relative aspect-video w-full">
                <Image
                  src={src}
                  alt={alt || ""}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              {alt && (
                <figcaption className="text-center text-sm text-zinc-500 mt-3">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        },

        // Tables
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse border border-zinc-200 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-50">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 border-b border-zinc-200">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm text-zinc-600 border-b border-zinc-100">
            {children}
          </td>
        ),

        // Horizontal rule
        hr: () => <hr className="my-8 border-zinc-200" />,

        // Strong & emphasis
        strong: ({ children }) => (
          <strong className="font-bold text-zinc-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

