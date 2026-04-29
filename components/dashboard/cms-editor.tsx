"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2 } from "lucide-react";

// Generic field schema. Renders a form for any CMS collection.
// `kind` drives the input type; `key` matches the column on the row.

export type FieldSpec =
  | { kind: "text"; key: string; label: string; required?: boolean; placeholder?: string }
  | { kind: "textarea"; key: string; label: string; rows?: number; placeholder?: string }
  | { kind: "markdown"; key: string; label: string; rows?: number; placeholder?: string }
  | { kind: "url"; key: string; label: string; placeholder?: string }
  | { kind: "number"; key: string; label: string; min?: number; max?: number }
  | { kind: "select"; key: string; label: string; options: { value: string; label: string }[] }
  | { kind: "publishedAt"; key: string; label?: string }
  | { kind: "json"; key: string; label: string; placeholder?: string };

export type RowLike = Record<string, unknown>;

export function CmsEditor({
  collection,
  rowId,
  initial,
  fields,
  collectionLabel,
}: {
  collection: string;
  rowId: string | null; // null = new row
  initial: RowLike;
  fields: FieldSpec[];
  collectionLabel: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<RowLike>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function setField(key: string, value: unknown) {
    setState((s) => ({ ...s, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const url = rowId
        ? `/api/cms/${collection}/${rowId}`
        : `/api/cms/${collection}`;
      const method = rowId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        setError("Couldn't save. Try again.");
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { row?: { id: string } };
      setSavedAt(new Date().toLocaleTimeString());
      // On create, jump to the row's edit page so refresh works
      if (!rowId && body.row?.id) {
        router.push(`/dashboard/cms/${collection}/${body.row.id}`);
      } else {
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!rowId) return;
    if (!confirm(`Delete this ${collectionLabel.toLowerCase()}?`)) return;
    await fetch(`/api/cms/${collection}/${rowId}`, { method: "DELETE" });
    router.push(`/dashboard/cms/${collection}`);
  }

  async function togglePublished() {
    const next = state.publishedAt ? null : new Date().toISOString();
    setField("publishedAt", next);
    if (!rowId) return;
    await fetch(`/api/cms/${collection}/${rowId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publishedAt: next }),
    });
    router.refresh();
  }

  const isPublished = !!state.publishedAt;

  return (
    <div className="space-y-5 max-w-3xl">
      {fields.map((f) => (
        <Field key={f.key} field={f} value={state[f.key]} onChange={(v) => setField(f.key, v)} />
      ))}

      <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-xs font-bold hover:bg-orange-600 transition-colors disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          {rowId ? "Save changes" : "Create"}
        </button>
        {rowId && (
          <button
            type="button"
            onClick={togglePublished}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold border transition-colors ${
              isPublished
                ? "border-emerald-300 text-emerald-700 bg-emerald-50/40 hover:border-emerald-400"
                : "border-zinc-200 text-zinc-600 hover:border-orange-300 hover:text-orange-700"
            }`}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
        )}
        {savedAt && <span className="text-[11px] text-zinc-400">Saved at {savedAt}</span>}
        <span className="ml-auto" />
        {rowId && (
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-500 border border-zinc-200 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            Delete
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2">{error}</p>
      )}
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldSpec;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const labelEl = (
    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em] mb-1.5 block">
      {"label" in field && field.label}
      {"required" in field && field.required ? " · required" : ""}
    </span>
  );

  switch (field.kind) {
    case "text":
    case "url":
      return (
        <label className="block">
          {labelEl}
          <input
            type={field.kind === "url" ? "url" : "text"}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            required={"required" in field && field.required}
            placeholder={"placeholder" in field ? field.placeholder : undefined}
            className="w-full px-3 py-2 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </label>
      );
    case "number":
      return (
        <label className="block">
          {labelEl}
          <input
            type="number"
            value={(value as number) ?? 0}
            min={"min" in field ? field.min : undefined}
            max={"max" in field ? field.max : undefined}
            onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
            className="w-full px-3 py-2 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </label>
      );
    case "textarea":
      return (
        <label className="block">
          {labelEl}
          <textarea
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            rows={field.rows ?? 4}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono"
          />
        </label>
      );
    case "markdown":
      return (
        <label className="block">
          {labelEl}
          <textarea
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            rows={field.rows ?? 12}
            placeholder={field.placeholder ?? "Markdown supported. # Heading, **bold**, [link](url)…"}
            className="w-full px-3 py-2 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono leading-relaxed"
          />
          <p className="text-[10px] text-zinc-400 mt-1">
            Markdown supported · headings, lists, links, code blocks
          </p>
        </label>
      );
    case "select":
      return (
        <label className="block">
          {labelEl}
          <select
            value={(value as string) ?? field.options[0]?.value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      );
    case "json":
      return (
        <label className="block">
          {labelEl}
          <textarea
            value={
              typeof value === "string"
                ? value
                : value === null || value === undefined
                  ? ""
                  : JSON.stringify(value, null, 2)
            }
            onChange={(e) => {
              const raw = e.target.value;
              try {
                onChange(raw ? JSON.parse(raw) : null);
              } catch {
                // Allow temporary invalid JSON while typing; persist as string for now.
                onChange(raw);
              }
            }}
            rows={6}
            placeholder={field.placeholder ?? '[\n  {"label": "...", "value": "..."}\n]'}
            className="w-full px-3 py-2 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono"
          />
          <p className="text-[10px] text-zinc-400 mt-1">JSON · validated on save</p>
        </label>
      );
    case "publishedAt":
      return null; // managed by the publish/unpublish button instead
    default:
      return null;
  }
}
