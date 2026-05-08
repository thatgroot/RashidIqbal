"use client";

import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";
import { triggerEmailMe } from "@/components/shared/email-me-toast";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-36">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center font-bold rounded">
                R
              </div>
              <span className="font-bold text-lg">Aestho</span>
            </div>
            <p className="text-zinc-400 text-sm mb-6 max-w-xs">
              Figma design, Framer development, and Chrome extensions.
              I build things that convert.
            </p>
            <button
              type="button"
              onClick={triggerEmailMe}
              className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              Email me
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Industries */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
              Industries
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/framer-expert-for-saas"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  SaaS
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-expert-for-fintech"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Fintech
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-expert-for-ai-startups"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  AI startups
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-expert-for-yc-startups"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Y Combinator
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare — decision-stage SEO pages */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
              Compare
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/framer-vs-webflow-for-saas"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Framer vs Webflow
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-vs-wordpress-for-startups"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Framer vs WordPress
                </Link>
              </li>
              <li>
                <Link
                  href="/hire-framer-expert-vs-agency"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Expert vs agency
                </Link>
              </li>
              <li>
                <Link
                  href="/figma-to-framer-cost-2026"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Figma → Framer cost
                </Link>
              </li>
              <li>
                <Link
                  href="/figma-to-framer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Figma to Framer service
                </Link>
              </li>
            </ul>
          </div>

          {/* Proof — case studies, research, and free audit */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
              Proof
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/work"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Case studies
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/offer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Free audit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Start a project
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Twitter / X
                </Link>
              </li>
              <li>
                <Link
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.framer.com/@rashidiqbal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Framer
                </Link>
              </li>
              <li>
                <Link
                  href={SOCIAL_LINKS.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Upwork
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} Aestho · led by Rashid Iqbal. Remote, working worldwide.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/blog"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/links"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Links
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
