import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Target, Sparkles } from "lucide-react";
import { getCurrentPortalViewer } from "@/lib/portal/auth";
import { db, schema } from "@/db/client";
import { eq } from "drizzle-orm";
import {
  getProjectForClient,
  listAssets,
  listMessages,
  listTodos,
  markMessagesRead,
  TIER_LABELS,
} from "@/lib/portal/queries";
import { ProjectWorkspace } from "@/components/portal/project-workspace";

export const dynamic = "force-dynamic";

export default async function PortalProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const viewer = (await getCurrentPortalViewer())!;
  const isPreview = viewer.kind === "admin-preview";

  // Real clients are scoped to their own projects; admin preview can open any
  // project in the system.
  let project: typeof schema.projects.$inferSelect | null = null;
  if (isPreview) {
    const rows = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, id))
      .limit(1);
    project = rows[0] ?? null;
  } else {
    project = await getProjectForClient({ projectId: id, clientId: viewer.client.id });
  }
  if (!project) notFound();

  const [messages, todos, assets] = await Promise.all([
    listMessages(project.id),
    listTodos(project.id),
    listAssets(project.id),
  ]);
  markMessagesRead({
    projectId: project.id,
    reader: isPreview ? "admin" : "client",
  }).catch(() => {});

  const brief = (project.brief || {}) as Record<string, unknown>;
  const viewerKind = isPreview ? "admin" : "client";
  const viewerName = isPreview ? "Rashid" : viewer.client.name || viewer.client.email;

  return (
    <div>
      <Link
        href="/portal"
        className="inline-flex items-center gap-1.5 text-xs text-[#73706d] hover:text-[#292827] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        All projects
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-3 leading-tight">
        {project.title}
      </h1>
      {project.tier && (
        <p className="text-[10px] font-mono text-[#9a9794] uppercase tracking-[0.18em] mb-6">
          {TIER_LABELS[project.tier] || project.tier}
        </p>
      )}

      {/* Quick facts */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <Card icon={<Calendar className="w-4 h-4 text-[#9a9794]" />} label="Started">
          {new Date(project.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Card>
        <Card icon={<Target className="w-4 h-4 text-[#9a9794]" />} label="Target launch">
          {project.targetLaunchDate
            ? new Date(project.targetLaunchDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—"}
        </Card>
        <Card icon={<Sparkles className="w-4 h-4 text-[#9a9794]" />} label="Status">
          {project.status === "live" && project.launchedAt
            ? `Launched ${new Date(project.launchedAt).toLocaleDateString()}`
            : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Card>
      </div>

      {/* Live, realtime workspace — assets, todos, notes, conversation */}
      <ProjectWorkspace
        projectId={project.id}
        viewer={viewerKind}
        viewerName={viewerName}
        initialProject={{
          id: project.id,
          title: project.title,
          status: project.status,
          tier: project.tier,
          targetLaunchDate: project.targetLaunchDate?.toISOString() ?? null,
          launchedAt: project.launchedAt?.toISOString() ?? null,
          links: (project.links as Record<string, string> | null) ?? {},
          brief,
          notesShared: project.notesShared ?? "",
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

      {/* Brief renders below the workspace */}
      {Object.keys(brief).length > 0 && (
        <section className="mt-10">
          <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-3">
            Project brief
          </p>
          <dl className="border border-[#e8e4dd] bg-white divide-y divide-[#e8e4dd]">
            {Object.entries(brief).map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row gap-1 sm:gap-4 px-5 py-3">
                <dt className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em] sm:w-44 shrink-0 sm:pt-0.5">
                  {k.replace(/_/g, " ")}
                </dt>
                <dd className="text-sm text-[#292827] whitespace-pre-wrap break-words">
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
    <div className="border border-[#e8e4dd] bg-white p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em]">
          {label}
        </p>
      </div>
      <p className="text-sm font-bold text-[#292827]">{children}</p>
    </div>
  );
}
