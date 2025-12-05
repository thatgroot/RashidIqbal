"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Link Share Preview Components (How link appears when shared)
const FacebookLinkPreview = () => (
  <div className="w-full bg-white rounded-lg border border-zinc-200 overflow-hidden">
    {/* OG Image Preview */}
    <div className="aspect-1200/630 bg-zinc-100 relative overflow-hidden">
      <Image 
        src="/opengraph-image" 
        alt="Facebook Link Preview" 
        fill 
        className="object-cover"
        unoptimized
      />
    </div>
    <div className="p-4 bg-zinc-50 border-t border-zinc-100">
      <p className="text-[11px] text-zinc-400 uppercase tracking-wide mb-1">aestho.xyz</p>
      <p className="text-sm font-semibold text-zinc-900 line-clamp-2 mb-1">Your Vision, Built Right | Rashid Iqbal</p>
      <p className="text-xs text-zinc-500 line-clamp-2">High-converting landing pages, scalable web apps, and native mobile applications.</p>
    </div>
  </div>
);

const TwitterLinkPreview = () => (
  <div className="w-full bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
    {/* Twitter Card Image */}
    <div className="aspect-1200/630 bg-zinc-900 relative overflow-hidden">
      <Image 
        src="/twitter-image" 
        alt="Twitter Link Preview" 
        fill 
        className="object-cover"
        unoptimized
      />
    </div>
    <div className="p-4">
      <p className="text-[15px] text-white font-medium line-clamp-1">Your Vision, Built Right | Rashid Iqbal</p>
      <p className="text-[13px] text-zinc-500 line-clamp-2 mt-1">High-converting landing pages, scalable web apps, and native mobile applications.</p>
      <p className="text-[13px] text-zinc-600 mt-2 flex items-center gap-1">
        <ExternalLink className="w-3 h-3" /> aestho.xyz
      </p>
    </div>
  </div>
);

const LinkedInLinkPreview = () => (
  <div className="w-full bg-white rounded-lg border border-zinc-200 overflow-hidden">
    {/* LinkedIn Card Image */}
    <div className="aspect-1200/630 bg-zinc-100 relative overflow-hidden">
      <Image 
        src="/opengraph-image" 
        alt="LinkedIn Link Preview" 
        fill 
        className="object-cover"
        unoptimized
      />
    </div>
    <div className="p-4 bg-white border-t border-zinc-100">
      <p className="text-sm font-semibold text-zinc-900 line-clamp-2">Your Vision, Built Right | Rashid Iqbal</p>
      <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
        <span className="w-3 h-3 bg-zinc-200 rounded-full inline-block"></span>
        aestho.xyz
      </p>
    </div>
  </div>
);

const InstagramLinkPreview = () => (
  <div className="w-full bg-linear-to-br from-zinc-900 to-zinc-950 rounded-2xl overflow-hidden">
    {/* Instagram Bio Link Style - Conversion Focused */}
    <div className="p-5">
      {/* Profile Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full p-[2px] bg-linear-to-tr from-yellow-400 via-orange-500 to-purple-600">
          <div className="w-full h-full bg-zinc-900 rounded-full p-[2px]">
            <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-white font-bold text-sm">rashid.dev</p>
          <p className="text-zinc-500 text-xs">Web & Mobile Developer</p>
        </div>
      </div>
      
      {/* Value Prop */}
      <div className="bg-linear-to-r from-orange-500/20 to-orange-600/10 rounded-xl p-4 mb-3 border border-orange-500/20">
        <p className="text-white font-semibold text-sm mb-1">🚀 Your Vision, Built Right</p>
        <p className="text-zinc-400 text-xs">High-converting websites & apps</p>
      </div>
      
      {/* CTA Links */}
      <div className="space-y-2">
        <div className="bg-white rounded-lg p-3 flex items-center justify-between">
          <span className="text-zinc-900 font-semibold text-sm">View Portfolio</span>
          <span className="text-orange-500 text-xs">→</span>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 flex items-center justify-between">
          <span className="text-white font-medium text-sm">Start a Project</span>
          <span className="text-orange-500 text-xs">→</span>
        </div>
      </div>
      
      {/* Domain */}
      <p className="text-center text-zinc-600 text-xs mt-3">aestho.xyz</p>
    </div>
  </div>
);

function AssetCard({ 
  title, 
  desc, 
  children, 
  downloadUrl,
  fullWidth = false 
}: { 
  title: string, 
  desc: string, 
  children: React.ReactNode, 
  downloadUrl?: string,
  fullWidth?: boolean 
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div 
          className={`border border-zinc-100 rounded-2xl p-6 bg-white hover:border-orange-200 transition-all duration-300 group ${fullWidth ? 'col-span-full' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
        >
            <div className={`bg-zinc-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-zinc-100/50 group-hover:bg-white group-hover:border-orange-100 transition-colors ${fullWidth ? 'aspect-2/1 p-8' : 'aspect-video'}`}>
                {children}
            </div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-zinc-900 mb-1">{title}</h3>
                    <p className="text-xs text-zinc-500">{desc}</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handleCopy}
                        className="p-2 hover:bg-orange-50 rounded-lg text-zinc-400 hover:text-orange-500 transition-colors"
                        title="Copy"
                        aria-label="Copy asset"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    {downloadUrl && (
                        <a 
                            href={downloadUrl} 
                            download
                            className="p-2 hover:bg-orange-50 rounded-lg text-zinc-400 hover:text-orange-500 transition-colors"
                            title="Download"
                            aria-label="Download asset"
                        >
                            <Download className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function SectionHeader({ title, color = "orange" }: { title: string, color?: string }) {
  const colorClass = color === "orange" ? "bg-orange-500" : color === "blue" ? "bg-blue-500" : "bg-green-500";
  return (
    <div className="flex items-center gap-4 mb-8 border-b border-zinc-100 pb-4">
      <div className={`w-2 h-2 ${colorClass} rounded-full`}></div>
      <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
    </div>
  );
}

export default function AssetsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative">
      {/* Grid Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/50" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-zinc-100 bg-white/80 backdrop-blur-md z-50 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="mx-auto flex items-center gap-3">
          <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-bold text-zinc-900">Brand Assets</span>
        </div>
        <div className="w-20"></div>
      </nav>

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <h1 className="text-5xl font-bold mb-6 text-zinc-900">
              Brand Guidelines<br />& Assets
            </h1>
            <p className="text-lg text-zinc-500">
                Official brand assets for Rashid Iqbal. Use these assets to ensure consistency across all platforms and communications.
            </p>
        </motion.div>

        {/* Core Identity */}
        <section className="mb-24">
            <SectionHeader title="Core Identity" color="orange" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AssetCard title="Primary Logo" desc="SVG / Horizontal Lockup" downloadUrl="/logo.svg">
                    <div className="w-full h-16 relative">
                        <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                    </div>
                </AssetCard>
                <AssetCard title="Favicon" desc="SVG / 32x32px" downloadUrl="/favicon.svg">
                    <div className="w-16 h-16 relative">
                        <Image src="/favicon.svg" alt="Favicon" fill className="object-contain" />
                    </div>
                </AssetCard>
                <AssetCard title="Color Palette" desc="Primary Brand Colors">
                    <div className="flex gap-6">
                        <div className="text-center">
                            <div className="w-14 h-14 bg-orange-500 rounded-xl mb-2"></div>
                            <span className="text-[10px] font-mono text-zinc-400">#F97316</span>
                            <p className="text-[9px] text-zinc-300 mt-1">Primary</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 bg-zinc-900 rounded-xl mb-2"></div>
                            <span className="text-[10px] font-mono text-zinc-400">#18181B</span>
                            <p className="text-[9px] text-zinc-300 mt-1">Dark</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 bg-white border border-zinc-200 rounded-xl mb-2"></div>
                            <span className="text-[10px] font-mono text-zinc-400">#FFFFFF</span>
                            <p className="text-[9px] text-zinc-300 mt-1">Light</p>
                        </div>
                    </div>
                </AssetCard>
            </div>
        </section>

        {/* Social Media Link Previews */}
        <section className="mb-24">
            <SectionHeader title="Link Share Previews" color="blue" />
            <p className="text-sm text-zinc-500 mb-8 -mt-4">How your link appears when shared on social media platforms</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AssetCard title="Facebook" desc="Open Graph Card (1200×630)">
                    <div className="w-full max-w-md mx-auto scale-95">
                        <FacebookLinkPreview />
                    </div>
                </AssetCard>

                <AssetCard title="Twitter / X" desc="Summary Large Image Card">
                    <div className="w-full max-w-md mx-auto scale-95">
                        <TwitterLinkPreview />
                    </div>
                </AssetCard>

                <AssetCard title="LinkedIn" desc="Link Preview Card">
                    <div className="w-full max-w-md mx-auto scale-95">
                        <LinkedInLinkPreview />
                    </div>
                </AssetCard>

                <AssetCard title="Instagram" desc="Link Sticker / Bio Link">
                    <div className="w-full max-w-xs mx-auto scale-95">
                        <InstagramLinkPreview />
                    </div>
                </AssetCard>
            </div>
        </section>

        {/* OG Image Download */}
        <section>
            <SectionHeader title="Social Preview Image" color="green" />
            <div className="grid grid-cols-1 gap-8">
                <AssetCard title="Open Graph Image" desc="PNG / 1200×630px — Used for Facebook, LinkedIn, and general link previews" downloadUrl="/opengraph-image" fullWidth>
                    <div className="w-full max-w-4xl aspect-1200/630 relative mx-auto">
                        <Image 
                            src="/opengraph-image" 
                            alt="OG Image Preview" 
                            fill 
                            className="object-contain rounded-lg"
                            unoptimized
                        />
                    </div>
                </AssetCard>
            </div>
        </section>
      </div>
    </main>
  );
}
