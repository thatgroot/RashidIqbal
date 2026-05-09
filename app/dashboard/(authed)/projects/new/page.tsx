import Link from "next/link";
import { db, schema } from "@/db/client";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { NewProjectForm } from "@/components/dashboard/new-project-form";

export const dynamic = "force-dynamic";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const sp = await searchParams;
  let prefill: {
    title: string;
    clientEmail: string;
    clientName: string;
    sourceFormId: string | undefined;
    brief: Record<string, unknown>;
  } = {
    title: "",
    clientEmail: "",
    clientName: "",
    sourceFormId: undefined,
    brief: {},
  };

  if (sp.from) {
    const [form] = await db
      .select()
      .from(schema.formSubmissions)
      .where(eq(schema.formSubmissions.id, sp.from))
      .limit(1);
    if (form) {
      const body = (form.body as Record<string, unknown> | null) || {};
      prefill = {
        title: form.subject.replace(/^[^|]+\|\s*/, "").replace(/\sfrom\s+.+$/, "") ||
          form.subject,
        clientEmail: form.email,
        clientName: form.name || "",
        sourceFormId: form.id,
        brief: {
          services: body["services"],
          pages: body["pageCount"],
          stack: body["stack"],
          budget: body["budget"],
          timeline: body["timeline"],
          location: body["location"],
          plan: body["plan"],
          mode: body["mode"],
          description: body["description"] || body["concern"],
          source: form.source,
        },
      };
    }
  }

  return (
    <div>
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-1.5 text-xs text-[#73706d] hover:text-[#292827] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        Back to projects
      </Link>
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] mb-2">
        Projects
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-2">
        New project
      </h1>
      <p className="text-sm text-[#73706d] mb-8">
        Auto-creates the client row if it doesn&rsquo;t exist, then provisions
        the project. The client gets an email with their portal sign-in code as
        soon as the first message is sent.
      </p>
      <NewProjectForm prefill={prefill} />
    </div>
  );
}
