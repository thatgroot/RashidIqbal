import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { listAllProjectsAdmin, TIER_LABELS } from "@/lib/portal/queries";
import { StatusPill } from "@/components/portal/status-pill";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const rows = await listAllProjectsAdmin();

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-2">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em]">
          Projects
        </p>
      </div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Active projects
          </h1>
          <p className="text-sm text-zinc-500">
            Convert a form submission into a project from the inbox. Click any
            row to manage status, links, and the conversation.
          </p>
        </div>
        <Link
          href="/dashboard/inbox"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-xs font-bold hover:bg-orange-600 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          New from inbox
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="border border-zinc-200 bg-white p-10 text-center">
          <p className="text-sm text-zinc-500">
            No projects yet. Open the inbox, click a submission, and hit
            "Convert to project" to provision the first one.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map(({ project, client }) => (
            <li key={project.id}>
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="block border border-zinc-200 bg-white p-5 hover:border-orange-300 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <StatusPill status={project.status} />
                  {project.tier && (
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em]">
                      {TIER_LABELS[project.tier] || project.tier}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em] ml-auto">
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-base md:text-lg font-bold text-zinc-900 truncate group-hover:text-orange-700 transition-colors">
                      {project.title}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {client.name || client.email} ·{" "}
                      <span className="font-mono">{client.email}</span>
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors shrink-0" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
