"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Palette,
  Layout,
  Globe,
  Puzzle,
  Search,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

interface ServiceOption {
  slug: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceBuilderFormData {
  name: string;
  email: string;
  website: string;
  budget: string;
  timeline: string;
  description: string;
  selectedServices: string[];
}

// ============================================================================
// Constants
// ============================================================================

const AVAILABLE_SERVICES: ServiceOption[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    description: "High-converting, single-page site optimized for conversion.",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    slug: "multi-page",
    name: "Multi-Page Website",
    description: "Complete website with CMS, blogs, and multiple pages.",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    description: "Modernizing existing sites for better UX/UI and conversion.",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    slug: "chrome-extension",
    name: "Chrome Extension",
    description: "Custom browser extension development (React, TS).",
    icon: <Puzzle className="w-5 h-5" />,
  },
  {
    slug: "ux-audit",
    name: "UX Copy / CRO Audit",
    description: "Reviewing copy and user flow to boost your metrics.",
    icon: <Search className="w-5 h-5" />,
  },
  {
    slug: "other",
    name: "Other",
    description: "Something else in mind? Let's discuss.",
    icon: <CheckCircle className="w-5 h-5" />,
  },
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

// ============================================================================
// Component
// ============================================================================

export function ServiceBuilder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ServiceBuilderFormData>({
    name: "",
    email: "",
    website: "",
    budget: "",
    timeline: "",
    description: "",
    selectedServices: [],
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Toggle service selection
  function toggleService(slug: string) {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(slug);
      if (exists) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((s) => s !== slug),
        };
      }
      return {
        ...prev,
        selectedServices: [...prev.selectedServices, slug],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      console.error("[ServiceBuilder] NEXT_PUBLIC_WEB3FORMS_KEY is not set.");
      setStatus("error");
      return;
    }

    try {
      const projectTypes = formData.selectedServices
        .map((slug) => AVAILABLE_SERVICES.find((s) => s.slug === slug)?.name || slug)
        .join(", ");

      const message = `New project inquiry from ${formData.name}.

Name: ${formData.name}
Email: ${formData.email}
Website: ${formData.website || "N/A"}
Project Type: ${projectTypes}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Description:
${formData.description}`;

      // Submit directly from the browser. Web3Forms' free tier blocks
      // server-originated requests; client-side is the intended pattern.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          to: "rashidiqbal.framer@gmail.com",
          subject: `New Inquiry: ${projectTypes} from ${formData.name}`,
          from_name: "Aestho",
          email: formData.email,
          replyto: formData.email,
          message,
          // Honeypot (empty = human). Web3Forms drops the submission if filled.
          botcheck: "",
        }),
      });

      const body = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };

      if (!res.ok || body.success === false) {
        console.error("[ServiceBuilder] Web3Forms error:", res.status, body);
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch (err) {
      console.error("[ServiceBuilder] Submit failed:", err);
      setStatus("error");
    }
  }

  const isServiceSelected = (slug: string) =>
    formData.selectedServices.includes(slug);

  // ============================================================================
  // Render: Success State
  // ============================================================================

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 text-center"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-zinc-900 mb-2">Got it!</h3>
        <p className="text-zinc-500 mb-8">Here&apos;s what happens next:</p>
        <div className="space-y-4 max-w-sm mx-auto text-left">
          {[
            { num: "1", text: "I review your project details (today)" },
            { num: "2", text: "I send questions or a rough scope within 24 hours" },
            { num: "3", text: "We hop on a quick call if it's a fit" },
          ].map((s) => (
            <div key={s.num} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0 rounded-full">
                {s.num}
              </span>
              <span className="text-sm text-zinc-700">{s.text}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-400 text-center mt-8">
          Trusted by 53+ companies including{" "}
          <a href="https://composio.dev" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">Composio</a>,{" "}
          <a href="https://www.crezco.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">Crezco</a>,{" "}
          <a href="https://relace.ai" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">Relace AI</a>, and{" "}
          <a href="https://update.ai" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">UpdateAI</a>.
        </p>
      </motion.div>
    );
  }

  // ============================================================================
  // Render: Step Indicator
  // ============================================================================

  const steps = [
    { num: 1, label: "Select Services" },
    { num: 2, label: "Project Scope" },
    { num: 3, label: "Your Details" },
  ];

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (s.num === 2 && formData.selectedServices.length === 0) return;
                if (s.num === 3 && (formData.selectedServices.length === 0 || !formData.budget || !formData.timeline)) return;
                
                if (s.num <= step || (s.num === 2 && formData.selectedServices.length > 0) || (s.num === 3 && formData.budget && formData.timeline)) {
                  setStep(s.num);
                }
              }}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === s.num
                  ? "text-orange-600"
                  : step > s.num
                  ? "text-zinc-900 hover:text-orange-600 cursor-pointer"
                  : "text-zinc-400"
              }`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full transition-colors ${
                  step === s.num
                    ? "bg-orange-500 text-white"
                    : step > s.num
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-200 text-zinc-500"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`w-8 h-px ${step > s.num ? "bg-zinc-900" : "bg-zinc-200"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ================================================================== */}
        {/* Step 1: Select Services */}
        {/* ================================================================== */}
        {step === 1 && (
           <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Select Your Services</h2>
            <p className="text-zinc-500 mb-6">Choose one or more areas you need help with.</p>

            <div className="grid gap-3">
              {AVAILABLE_SERVICES.map((service) => {
                const selected = isServiceSelected(service.slug);
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => toggleService(service.slug)}
                    className={`flex items-center gap-4 p-4 border text-left transition-all ${
                      selected
                        ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                        selected ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900">{service.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{service.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 border flex items-center justify-center shrink-0 ${
                        selected ? "border-orange-500 bg-orange-500" : "border-zinc-300"
                      }`}
                    >
                      {selected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                disabled={formData.selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Project Scope <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ================================================================== */}
        {/* Step 2: Project Scope */}
        {/* ================================================================== */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Project Scope</h2>
            <p className="text-zinc-500 mb-6">Let me know your budget and timeline.</p>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-zinc-700 mb-3 block">Budget Range</label>
                <div className="grid grid-cols-2 gap-3">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-3 px-4 border text-center text-sm font-medium transition-all ${
                        formData.budget === b
                          ? "border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500"
                          : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-700 mb-3 block">Timeline</label>
                <div className="grid grid-cols-2 gap-3">
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: t })}
                      className={`py-3 px-4 border text-center text-sm font-medium transition-all ${
                        formData.timeline === t
                          ? "border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500"
                          : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-zinc-200 text-zinc-700 text-sm font-medium hover:border-zinc-400 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                disabled={!formData.budget || !formData.timeline}
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Your Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ================================================================== */}
        {/* Step 3: Contact Details */}
        {/* ================================================================== */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Your Details</h2>
            <p className="text-zinc-500 mb-6">Tell me a bit about yourself and your project.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input type="text" name="website_url_confirm" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pkg-name" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Name
                  </label>
                  <input
                    id="pkg-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="pkg-email" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="pkg-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pkg-website" className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Website
                </label>
                <input
                  id="pkg-website"
                  type="text"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="yourcompany.com"
                />
              </div>

              <div>
                <label htmlFor="pkg-desc" className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Project description
                </label>
                <textarea
                  id="pkg-desc"
                  required
                  rows={4}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
                  placeholder="Describe your project in as much detail as possible..."
                />
                <p className="text-xs text-zinc-400 mt-1">{formData.description.length}/1000</p>
              </div>

              {/* Summary reminder */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 flex flex-col gap-1">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Project Summary
                </h4>
                <p className="text-sm text-zinc-700 flex justify-between">
                  <span>Services:</span>
                  <span className="font-medium text-right max-w-[60%]">
                    {formData.selectedServices
                      .map(slug => AVAILABLE_SERVICES.find(s => s.slug === slug)?.name || slug)
                      .join(", ")}
                  </span>
                </p>
                <p className="text-sm text-zinc-700 flex justify-between">
                  <span>Budget:</span>
                  <span className="font-medium">{formData.budget}</span>
                </p>
                <p className="text-sm text-zinc-700 flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">{formData.timeline}</span>
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-zinc-200 text-zinc-700 text-sm font-medium hover:border-zinc-400 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Details <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600 text-center">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <p className="text-xs text-zinc-400 text-center">
                I respond within 24 hours. No spam, no sales calls.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
