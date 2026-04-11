"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

const SITE_TYPES = [
  "SaaS / Software",
  "E-commerce",
  "Agency / Services",
  "Personal Brand",
  "Startup / Landing Page",
  "Other",
];

export function AuditForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    siteType: "",
    biggestProblem: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch("/api/audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          url: formData.website,
          scores: {
            name: formData.name,
            projectType: `Free Audit - ${formData.siteType}`,
            description: formData.biggestProblem,
          },
        }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-zinc-900 mb-2 text-center">You&apos;re in!</h3>
        <p className="text-zinc-500 text-center mb-8">Here&apos;s what happens next:</p>
        <div className="space-y-4 max-w-sm mx-auto">
          {[
            { num: "1", text: "I visit your site and take notes (today)" },
            { num: "2", text: "I record a personalized Loom walkthrough" },
            { num: "3", text: "You get the video in your inbox within 48 hours" },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0 rounded-full">
                {step.num}
              </span>
              <span className="text-sm text-zinc-700">{step.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-1">Request Your Free Audit</h2>
      <p className="text-sm text-zinc-500 mb-6">Takes 30 seconds. I&apos;ll send a Loom within 48 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            name="company_website_url"
            tabIndex={-1}
            autoComplete="off"
            onChange={(e) => { if (e.target.value) setStatus("error"); }}
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="audit-name" className="block text-sm font-medium text-zinc-700 mb-1.5">
            Name
          </label>
          <input
            id="audit-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="audit-email" className="block text-sm font-medium text-zinc-700 mb-1.5">
            Email
          </label>
          <input
            id="audit-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="you@company.com"
          />
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="audit-website" className="block text-sm font-medium text-zinc-700 mb-1.5">
            Website URL
          </label>
          <input
            id="audit-website"
            type="url"
            required
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="https://yourwebsite.com"
          />
        </div>

        {/* Site Type */}
        <div>
          <label htmlFor="audit-type" className="block text-sm font-medium text-zinc-700 mb-1.5">
            What kind of site is it?
          </label>
          <select
            id="audit-type"
            required
            value={formData.siteType}
            onChange={(e) => setFormData({ ...formData, siteType: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
          >
            <option value="">Select type</option>
            {SITE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Biggest Problem */}
        <div>
          <label htmlFor="audit-problem" className="block text-sm font-medium text-zinc-700 mb-1.5">
            What&apos;s your biggest concern with the site? <span className="text-zinc-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="audit-problem"
            rows={3}
            maxLength={300}
            value={formData.biggestProblem}
            onChange={(e) => setFormData({ ...formData, biggestProblem: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
            placeholder="e.g. Low conversions, slow load time, outdated design..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get My Free Audit <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-xs text-red-500 text-center">Something went wrong. Try again.</p>
        )}

        <p className="text-xs text-zinc-400 text-center">
          No spam. No sales pitch. Just a honest video review of your site.
        </p>
      </form>
    </div>
  );
}
