import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, ExternalLink, Mail } from "lucide-react";
import {
  getProjectAdmin,
  listAssets,
  listMessages,
  listTodos,
  markMessagesRead,
} from "@/lib/portal/queries";
import { ProjectEditor } from "@/components/dashboard/project-editor";
import { ProjectWorkspace } from "@/components/portal/project-workspace";

export const dynamic = "force-dynamic";

export default async function AdminProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ctx = await getProjectAdmin(id);
  if (!ctx) notFound();
  const { project, client } = ctx;
  const [messages, todos, assets] = await Promise.all([
    listMessages(project.id),
    listTodos(project.id),
    listAssets(project.id),
  ]);
  markMessagesRead({ projectId: project.id, reader: "admin" }).catch(() => {});

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to projects
        </Link>
        <Link
          href={`/portal/projects/${project.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-600 border border-zinc-200 hover:border-orange-300 hover:text-orange-700 transition-colors"
          title="Open the portal view in a new tab"
        >
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          Preview as client
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 leading-tight mb-1">
        {project.title}
      </h1>
      <p className="text-sm text-zinc-500 mb-8">
        Client:{" "}
        <span className="text-zinc-900 font-semibold">
          {client.name || client.email}
        </span>{" "}
        ·{" "}
        <a
          href={`mailto:${client.email}`}
          className="font-mono hover:text-orange-700 inline-flex items-center gap-1"
        >
          <Mail className="w-3 h-3" aria-hidden="true" />
          {client.email}
        </a>
        {project.targetLaunchDate && (
          <>
            {" "}· Target launch{" "}
            {new Date(project.targetLaunchDate).toLocaleDateString()}
          </>
        )}
        {project.sourceFormId && (
          <>
            {" "}·{" "}
            <Link
              href={`/dashboard/inbox/${project.sourceFormId}`}
              className="text-orange-700 hover:underline inline-flex items-center gap-1"
            >
              View origin <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </Link>
          </>
        )}
      </p>

      <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">
        <section>
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
            Manage
          </p>
          <ProjectEditor
            projectId={project.id}
            initial={{
              title: project.title,
              status: project.status,
              tier: project.tier ?? "",
              targetLaunchDate: project.targetLaunchDate
                ? new Date(project.targetLaunchDate).toISOString().slice(0, 10)
                : "",
              launchedAt: project.launchedAt
                ? new Date(project.launchedAt).toISOString().slice(0, 10)
                : "",
              notesInternal: project.notesInternal ?? "",
              links: (project.links as Record<string, string> | null) ?? {},
            }}
          />
        </section>

        {/* Realtime workspace — assets, todos, notes, conversation */}
        <ProjectWorkspace
          projectId={project.id}
          viewer="admin"
          viewerName="Rashid"
          initialProject={{
            id: project.id,
            title: project.title,
            status: project.status,
            tier: project.tier,
            targetLaunchDate: project.targetLaunchDate?.toISOString() ?? null,
            launchedAt: project.launchedAt?.toISOString() ?? null,
            links: (project.links as Record<string, string> | null) ?? {},
            brief: (project.brief as Record<string, unknown>) ?? {},
            notesShared: project.notesShared ?? "",
            notesInternal: project.notesInternal ?? "",
            updatedAt: project.updatedAt.toISOString(),
            createdAt: project.createdAt.toISOString(),
          }}
          initialMessages={messages.map((m) => ({
            ...m,
            createdAt: m.createdAt.toISOString(),
            readByAdminAt: m.readByAdminAt?.toISOString() ?? null,
            readByClientAt: m.readByClientAt?.toISOString() ?? null,
          }))}
          initialTodos={todos.map((t) => ({
            ...t,
            completedAt: t.completedAt?.toISOString() ?? null,
            createdAt: t.createdAt.toISOString(),
          }))}
          initialAssets={assets.map((a) => ({
            ...a,
            createdAt: a.createdAt.toISOString(),
          }))}
        />
      </div>

      {project.brief && Object.keys(project.brief).length > 0 && (
        <section className="mt-10">
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
            Brief (from intake)
          </p>
          <dl className="border border-zinc-200 bg-white divide-y divide-zinc-100">
            {Object.entries(project.brief as Record<string, unknown>).map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row gap-1 sm:gap-4 px-5 py-3">
                <dt className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em] sm:w-44 shrink-0 sm:pt-0.5">
                  {k.replace(/_/g, " ")}
                </dt>
                <dd className="text-sm text-zinc-900 whitespace-pre-wrap break-words">
                  {typeof v === "string"
                    ? v
                    : Array.isArray(v)
                      ? v.join(", ")
                      : JSON.stringify(v)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
