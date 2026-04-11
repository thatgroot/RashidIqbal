"use client";

import Link from "next/link";
import { SERVICES, LOCATIONS } from "@/lib/seo-data";
import { SOCIAL_LINKS, AUTHOR } from "@/lib/constants";

export function FooterV2() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
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
            <a
              href={`mailto:${AUTHOR.email}`}
              className="text-orange-500 hover:text-orange-400 transition-colors text-sm"
            >
              {AUTHOR.email}
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
              Locations
            </p>
            <ul className="space-y-3">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/hire/${location.slug}`}
                    className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                  >
                    {location.country}
                  </Link>
                </li>
              ))}
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
                  href="/work"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Portfolio
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
                  href="/hire"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Hire Me
                </Link>
              </li>
              <li>
                <Link
                  href="/audit"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Free Audit
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
                  href="https://contra.com/rashidiqbal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                >
                  Contra
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} Rashid Iqbal. Based in Pakistan, working worldwide.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/services"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/work"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/blog"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/partners"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                For Agencies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
