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
  Mail,
  Figma,
} from "lucide-react";
import { AUTHOR } from "@/lib/constants";

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
  location: string;
  pageCount: string;
  budget: string;
  timeline: string;
  description: string;
  selectedServices: string[];
  stack: string[];
}

// ============================================================================
// Constants
// ============================================================================

const AVAILABLE_SERVICES: ServiceOption[] = [
  {
    slug: "figma-design",
    name: "Figma Design",
    description: "UI design, UX copy, and interactive prototype in Figma.",
    icon: <Figma className="w-5 h-5" />,
  },
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

// Stack / discipline the visitor actually needs. Decoupled from deliverable
// type: they may want design only (Figma), dev only (Framer/Webflow/Next.js),
// or both. Multi-select so the common "Figma + Framer" pair is expressible.
const STACK_OPTIONS: { value: string; label: string; kind: "design" | "build" }[] = [
  { value: "figma", label: "Figma (design)", kind: "design" },
  { value: "framer", label: "Framer", kind: "build" },
  { value: "webflow", label: "Webflow", kind: "build" },
  { value: "nextjs", label: "Next.js / custom", kind: "build" },
  { value: "unsure", label: "Not sure yet", kind: "design" },
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
// Mailto builder
// ============================================================================
// Construct a `mailto:` URL that pre-fills a plain-text summary of the form.
// Used by the "Open in your email app" fallback next to Submit. When the
// visitor sends from their real inbox, it lands in Rashid's inbox like a
// regular personal email — bypassing Resend and the spam classifiers that
// sometimes flag automated mail from new domains.
//
// Note: `mailto:` is plain-text only per RFC 2368 — the HTML client template
// cannot ride along here. We mirror its structure (sectioned labels, warm
// sign-off) in plain text instead.
//
// Spaces MUST encode as %20 (not + as URLSearchParams does). Gmail, Apple
// Mail, and Outlook all treat literal + in the body as the character +,
// which produces the "Name:+Jane" artifact visible in some clients.

function buildMailtoHref(form: ServiceBuilderFormData, servicesLabel: string, stackLabel: string): string {
  const firstName = form.name.trim().split(/\s+/)[0] || "there";

  const subject = `Project inquiry${form.name ? ` from ${form.name}` : ""}${
    servicesLabel ? ` — ${servicesLabel}` : ""
  }`;

  const section = (title: string, rows: (string | null | undefined)[]): string => {
    const filled = rows.filter(Boolean) as string[];
    if (filled.length === 0) return "";
    return `— ${title.toUpperCase()} —\n${filled.join("\n")}`;
  };

  const body = [
    `Hey Rashid,`,
    ``,
    `I'd like to talk about a project. Emailing you directly in case the form lands in spam. Here are the details I entered:`,
    ``,
    section("Project", [
      servicesLabel ? `Services:  ${servicesLabel}` : null,
      stackLabel ? `Stack:     ${stackLabel}` : null,
      form.budget ? `Budget:    ${form.budget}` : null,
      form.timeline ? `Timeline:  ${form.timeline}` : null,
      form.pageCount ? `Pages:     ${form.pageCount}` : null,
    ]),
    ``,
    section("About me", [
      form.name ? `Name:      ${form.name}` : null,
      form.email ? `Email:     ${form.email}` : null,
      form.website ? `Website:   ${form.website}` : null,
      form.location ? `Location:  ${form.location}` : null,
    ]),
    form.description
      ? `\n— WHAT I'M THINKING —\n${form.description}`
      : ``,
    ``,
    `Looking forward to hearing back.`,
    ``,
    `Thanks,`,
    firstName,
  ]
    .filter((line) => line !== undefined && line !== null)
    .join("\n");

  // encodeURIComponent uses %20 for spaces — the only encoding every mail
  // client handles correctly. URLSearchParams uses `+`, which some clients
  // render literally.
  return `mailto:${AUTHOR.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ============================================================================
// Component
// ============================================================================

export function ServiceBuilder() {
  const [step, setStep] = useState(1);
  // Sensible defaults for the most common inquiry shape (Figma Design + CRO
  // Audit done in Figma, ~$2–5k, within a month). Visitors land on step 1
  // with both Figma Design and CRO Audit already selected, so they can just
  // click through if that's what they want, or uncheck/swap as needed.
  const [formData, setFormData] = useState<ServiceBuilderFormData>({
    name: "",
    email: "",
    website: "",
    location: "",
    pageCount: "",
    budget: "$2,000 - $5,000",
    timeline: "This month",
    description: "",
    selectedServices: ["figma-design", "ux-audit"],
    stack: ["figma"],
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

  function toggleStack(value: string) {
    setFormData((prev) => {
      // "Not sure yet" is exclusive — picking it clears others, and picking
      // another tool clears "Not sure yet".
      if (value === "unsure") {
        return {
          ...prev,
          stack: prev.stack.includes("unsure") ? [] : ["unsure"],
        };
      }
      const nextStack = prev.stack.filter((s) => s !== "unsure");
      if (nextStack.includes(value)) {
        return { ...prev, stack: nextStack.filter((s) => s !== value) };
      }
      return { ...prev, stack: [...nextStack, value] };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const projectTypes = formData.selectedServices
        .map((slug) => AVAILABLE_SERVICES.find((s) => s.slug === slug)?.name || slug)
        .join(", ");

      const stackLabels = formData.stack
        .map((v) => STACK_OPTIONS.find((o) => o.value === v)?.label || v)
        .join(", ");

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "service-builder",
          email: formData.email,
          name: formData.name,
          website: formData.website,
          location: formData.location,
          services: projectTypes,
          stack: stackLabels,
          pageCount: formData.pageCount,
          budget: formData.budget,
          timeline: formData.timeline,
          description: formData.description,
          botcheck: "", // honeypot
        }),
      });

      const body = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };

      if (!res.ok || body.success === false) {
        console.error("[ServiceBuilder] API error:", res.status, body);
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
          <a href="https://update.ai" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">UpdateAI</a>,{" "}
          <a href="https://vanos.ai" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">Vanos AI</a>,{" "}
          <a href="https://leanscale.team" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">Leanscale</a>, and{" "}
          <a href="https://founderfist.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 underline">FounderFist</a>.
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
                if (
                  s.num === 3 &&
                  (formData.selectedServices.length === 0 ||
                    formData.stack.length === 0 ||
                    !formData.budget ||
                    !formData.timeline)
                ) {
                  return;
                }

                if (
                  s.num <= step ||
                  (s.num === 2 && formData.selectedServices.length > 0) ||
                  (s.num === 3 &&
                    formData.stack.length > 0 &&
                    formData.budget &&
                    formData.timeline)
                ) {
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
            <p className="text-zinc-500 mb-6">Let me know your stack, budget, and timeline.</p>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-zinc-700 mb-1 block">Stack / Discipline</label>
                <p className="text-xs text-zinc-500 mb-3">
                  Pick the tools you need. Most projects pair Figma (design) with Framer (build).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STACK_OPTIONS.map((option) => {
                    const selected = formData.stack.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleStack(option.value)}
                        className={`relative py-3 px-4 border text-left text-sm font-medium transition-all ${
                          selected
                            ? "border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500"
                            : "border-zinc-200 text-zinc-700 hover:border-zinc-300 bg-white"
                        }`}
                      >
                        <span
                          className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${
                            selected ? "text-orange-600" : "text-zinc-400"
                          }`}
                        >
                          {option.kind === "design" ? "Design" : "Build"}
                        </span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

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

              {/* Conditional Field: Number of Pages */}
              {(formData.selectedServices.includes("multi-page") || formData.selectedServices.includes("website-redesign")) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2"
                >
                  <label htmlFor="pkg-pages" className="block text-sm font-medium text-zinc-700 mb-2">
                    Approximate Number of Pages
                  </label>
                  <input
                    id="pkg-pages"
                    type="text"
                    required
                    value={formData.pageCount}
                    onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    placeholder="e.g. 5-10 pages"
                  />
                </motion.div>
              )}
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
                disabled={
                  formData.stack.length === 0 ||
                  !formData.budget ||
                  !formData.timeline ||
                  ((formData.selectedServices.includes("multi-page") || formData.selectedServices.includes("website-redesign")) && !formData.pageCount.trim())
                }
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

              <div className="grid md:grid-cols-2 gap-4">
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
                  <label htmlFor="pkg-location" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Location
                  </label>
                  <input
                    id="pkg-location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="City, Country"
                  />
                </div>
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

              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-zinc-200 text-zinc-700 text-sm font-medium hover:border-zinc-400 transition-colors flex items-center justify-center gap-2 sm:w-auto"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                  <a
                    href={buildMailtoHref(
                      formData,
                      formData.selectedServices
                        .map((slug) => AVAILABLE_SERVICES.find((s) => s.slug === slug)?.name || slug)
                        .join(", "),
                      formData.stack
                        .map((v) => STACK_OPTIONS.find((o) => o.value === v)?.label || v)
                        .join(", ")
                    )}
                    className="px-6 py-3 border border-zinc-200 text-zinc-700 text-sm font-medium hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
                    title="Opens your email app with the form pre-filled — useful if automated mail ends up in your spam folder."
                  >
                    <Mail className="w-4 h-4" /> Open in email app
                  </a>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="px-6 py-3 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600 text-center">
                  Something went wrong. Try &ldquo;Open in email app&rdquo; above, or email me directly.
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
