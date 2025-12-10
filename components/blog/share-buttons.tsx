"use client";

import { Twitter, Linkedin, Link as LinkIcon, Facebook, Check } from "lucide-react";
import { useState } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

interface ShareButtonsProps {
  title: string;
  description: string;
  slug: string;
  tags?: string[];
}

export function ShareButtons({ title, description, slug, tags = [] }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const postUrl = `${siteUrl}/blog/${slug}`;

  // Twitter/X share
  const twitterText = encodeURIComponent(`${title}\n\n${description.slice(0, 100)}...`);
  const twitterHashtags = tags.slice(0, 3).map(t => t.replace(/\s+/g, "")).join(",");
  const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(postUrl)}&hashtags=${twitterHashtags}`;

  // LinkedIn share (using share URL format)
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  // Facebook share
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = postUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-500 mr-2">Share:</span>
      
      {/* Twitter/X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-900 hover:text-white transition-colors"
        aria-label="Share on Twitter/X"
        title="Share on Twitter/X"
      >
        <Twitter className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-[#0077b5] hover:text-white transition-colors"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* Facebook */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-[#1877f2] hover:text-white transition-colors"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-lg transition-colors ${
          copied 
            ? "bg-green-100 text-green-600" 
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
        }`}
        aria-label={copied ? "Link copied!" : "Copy link"}
        title={copied ? "Link copied!" : "Copy link"}
      >
        {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}

