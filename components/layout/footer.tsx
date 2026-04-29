"use client";

import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";
import { triggerEmailMe } from "@/components/shared/email-me-toast";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center font-bold rounded">
                R
              </div>
              <span className="font-bold text-lg">Rashid Iqbal</span>
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

          {/* Pages */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
              Pages
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Home
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
                  href="/contact"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/links"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Links
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
              © {new Date().getFullYear()} Rashid Iqbal. Remote, working worldwide.
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
