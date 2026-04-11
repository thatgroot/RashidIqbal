"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

const PROJECT_TYPES = [
  "Landing Page",
  "Multi-Page Website",
  "Website Redesign",
  "Chrome Extension",
  "UX Copy / CRO Audit",
  "Other",
];

const BUDGET_RANGES = [
  "$500 - $1,000",
  "$1,000 - $2,000",
  "$2,000 - $5,000",
  "$5,000+",
  "Not sure yet",
];

const TIMELINES = [
  "ASAP (this week)",
  "This month",
  "Next month",
  "No rush, just exploring",
];

interface InquiryFormProps {
  variant?: "page" | "inline";
  heading?: string;
  subheading?: string;
}

export function InquiryForm({
  variant = "page",
  heading = "Start a Project",
  subheading = "Tell me about your project and I'll get back to you within 24 hours.",
}: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
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
          url: formData.website || "N/A",
          scores: {
            name: formData.name,
            projectType: formData.projectType,
            budget: formData.budget,
            timeline: formData.timeline,
            description: formData.description,
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
        className="text-center py-16"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-zinc-900 mb-2">Got it!</h3>
        <p className="text-zinc-500">I'll review your project and get back within 24 hours.</p>
      </motion.div>
    );
  }

  const containerClass = variant === "page" ? "max-w-2xl mx-auto" : "";

  return (
    <div className={containerClass}>
      {variant === "page" && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-zinc-900 mb-3">{heading}</h2>
          <p className="text-zinc-500">{subheading}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row: Name + Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inquiry-name" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Name
            </label>
            <input
              id="inquiry-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="inquiry-email" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Email
            </label>
            <input
              id="inquiry-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              placeholder="you@company.com"
            />
          </div>
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="inquiry-website" className="block text-sm font-medium text-zinc-700 mb-1.5">
            Current website (optional)
          </label>
          <input
            id="inquiry-website"
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="yourwebsite.com"
          />
        </div>

        {/* Row: Project Type + Budget */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inquiry-type" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Project type
            </label>
            <select
              id="inquiry-type"
              required
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
            >
              <option value="">Select a type</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="inquiry-budget" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Budget range
            </label>
            <select
              id="inquiry-budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
            >
              <option value="">Select a range</option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="inquiry-timeline" className="block text-sm font-medium text-zinc-700 mb-1.5">
            Timeline
          </label>
          <select
            id="inquiry-timeline"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
          >
            <option value="">Select timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="inquiry-desc" className="block text-sm font-medium text-zinc-700 mb-1.5">
            Project description
          </label>
          <textarea
            id="inquiry-desc"
            required
            rows={4}
            maxLength={500}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
            placeholder="Describe your project in as much detail as possible..."
          />
          <p className="text-xs text-zinc-400 mt-1">{formData.description.length}/500</p>
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
              Submit Inquiry <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-xs text-zinc-400 text-center">
          I respond within 24 hours. No spam, no sales calls.
        </p>
      </form>
    </div>
  );
}
