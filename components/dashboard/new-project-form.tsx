"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import { STATUS_KEYS, TIER_LABELS } from "@/lib/portal/constants";

const TIERS = [
  { value: "landing-page", label: TIER_LABELS["landing-page"]! },
  { value: "four-page-site", label: TIER_LABELS["four-page-site"]! },
  { value: "custom", label: TIER_LABELS["custom"]! },
] as const;

type Prefill = {
  title: string;
  clientEmail: string;
  clientName: string;
  sourceFormId: string | undefined;
  brief: Record<string, unknown>;
};

export function NewProjectForm({ prefill }: { prefill: Prefill }) {
  const router = useRouter();
  const [title, setTitle] = useState(prefill.title);
  const [email, setEmail] = useState(prefill.clientEmail);
  const [name, setName] = useState(prefill.clientName);
  const [tier, setTier] = useState<string>("custom");
  const [status, setStatus] = useState<string>("kickoff");
  const [target, setTarget] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/dashboard/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          clientEmail: email.trim().toLowerCase(),
          clientName: name.trim() || undefined,
          tier: tier === "custom" ? null : tier,
          status,
          targetLaunchDate: target || null,
          sourceFormId: prefill.sourceFormId,
          brief: prefill.brief,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        id?: string;
        error?: string;
      };
      if (!res.ok || !body.id) {
        setError(body.error || "Could not create project. Try again.");
        setBusy(false);
        return;
      }
      router.push(`/dashboard/projects/${body.id}`);
    } catch {
      setError("Network error. Try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-2xl">
      <Field label="Project title">
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Partiful · Landing page rebuild"
          className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Client email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm font-mono focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </Field>
        <Field label="Client name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Grace"
            className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Tier">
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            {TIERS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 capitalize"
          >
            {STATUS_KEYS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Target launch (optional)">
          <input
            type="date"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </Field>
      </div>
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Creating…
          </>
        ) : (
          <>
            Create project
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2">
          {error}
        </p>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em] mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}
