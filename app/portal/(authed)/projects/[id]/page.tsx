import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Target, Sparkles } from "lucide-react";
import { getCurrentClientSession } from "@/lib/portal/auth";
import {
  getProjectForClient,
  listAssets,
  listMessages,
  listTodos,
  markMessagesRead,
  TIER_LABELS,
} from "@/lib/portal/queries";
import { StatusPill } from "@/components/portal/status-pill";
import { MessageThread } from "@/components/portal/message-thread";
import { TodoList } from "@/components/portal/todo-list";
import { NotesPanel } from "@/components/portal/notes-panel";
import { AssetGrid } from "@/components/portal/asset-grid";

export const dynamic = "force-dynamic";

export default async function PortalProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = (await getCurrentClientSession())!;
  const project = await getProjectForClient({ projectId: id, clientId: session.client.id });
  if (!project) notFound();

  const [messages, todos, assets] = await Promise.all([
    listMessages(project.id),
    listTodos(project.id),
    listAssets(project.id),
  ]);
  // Mark as read on detail open (best-effort)
  markMessagesRead({ projectId: project.id, reader: "client" }).catch(() => {});

  const brief = (project.brief || {}) as Record<string, unknown>;

  return (
    <div>
      <Link
        href="/portal"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        All projects
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <StatusPill status={project.status} />
        {project.tier && (
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em]">
            {TIER_LABELS[project.tier] || project.tier}
          </span>
        )}
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-6 leading-tight">
        {project.title}
      </h1>

      {/* Quick facts */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <Card icon={<Calendar className="w-4 h-4 text-zinc-400" />} label="Started">
          {new Date(project.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Card>
        <Card icon={<Target className="w-4 h-4 text-zinc-400" />} label="Target launch">
          {project.targetLaunchDate
            ? new Date(project.targetLaunchDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—"}
        </Card>
        <Card icon={<Sparkles className="w-4 h-4 text-zinc-400" />} label="Status">
          {project.status === "live" && project.launchedAt
            ? `Launched ${new Date(project.launchedAt).toLocaleDateString()}`
            : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Card>
      </div>

      {/* Assets */}
      <section className="mb-8">
        <AssetGrid
          projectId={project.id}
          initial={assets.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() }))}
          viewer="client"
        />
      </section>

      {/* Todo + notes side-by-side on desktop */}
      <section className="grid lg:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
            Todo list
          </p>
          <TodoList
            projectId={project.id}
            viewer="client"
            initial={todos.map((t) => ({
              ...t,
              completedAt: t.completedAt ? t.completedAt.toISOString() : null,
              createdAt: t.createdAt.toISOString(),
            }))}
          />
        </div>
        <div>
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
            Notes
          </p>
          <NotesPanel
            projectId={project.id}
            viewer="client"
            initialShared={project.notesShared ?? ""}
            initialInternal=""
          />
        </div>
      </section>

      {/* Brief */}
      {Object.keys(brief).length > 0 && (
        <section className="mb-8">
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
            Project brief
          </p>
          <dl className="border border-zinc-200 bg-white divide-y divide-zinc-100">
            {Object.entries(brief).map(([k, v]) => (
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

      {/* Messages */}
      <section>
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
          Conversation with Rashid
        </p>
        <MessageThread
          projectId={project.id}
          initialMessages={messages.map((m) => ({
            ...m,
            createdAt: m.createdAt.toISOString(),
          }))}
          viewer="client"
          viewerName={session.client.name || session.client.email}
        />
      </section>
    </div>
  );
}

function Card({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-zinc-200 bg-white p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em]">
          {label}
        </p>
      </div>
      <p className="text-sm font-bold text-zinc-900">{children}</p>
    </div>
  );
}
