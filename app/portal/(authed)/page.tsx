import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { getCurrentPortalViewer } from "@/lib/portal/auth";
import {
  listAllProjectsAdmin,
  listClientProjects,
  TIER_LABELS,
} from "@/lib/portal/queries";
import { StatusPill } from "@/components/portal/status-pill";

export const dynamic = "force-dynamic";

export default async function PortalHome() {
  const viewer = (await getCurrentPortalViewer())!;
  const isPreview = viewer.kind === "admin-preview";

  // Admin previewing → see every project with the client name on the card.
  // Real client → see only their own projects.
  const items = isPreview
    ? (await listAllProjectsAdmin()).map(({ project, client }) => ({
        ...project,
        clientName: client.name || client.email,
      }))
    : (await listClientProjects(viewer.client.id)).map((p) => ({
        ...p,
        clientName: null as string | null,
      }));

  const greetingName = isPreview
    ? "Rashid"
    : viewer.client.name?.split(" ")[0] || "there";

  return (
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        {isPreview ? "All projects" : "Welcome"}
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
        {isPreview ? "Every active project" : `Hi, ${greetingName}.`}
      </h1>
      <p className="text-sm text-zinc-500 mb-8">
        {isPreview
          ? "Browsing as the owner. Each card opens the same view your client sees."
          : "Every project we’re working on lives here. Click any card to see timeline, links, and the full conversation."}
      </p>

      {items.length === 0 ? (
        <div className="border border-zinc-200 bg-white p-10 text-center">
          <FolderOpen className="w-8 h-8 text-zinc-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-sm text-zinc-500">
            {isPreview
              ? "No projects in the system yet. Convert a form submission from /dashboard/inbox to provision the first one."
              : "No active projects yet. Once Rashid kicks one off, it shows up here."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((p) => (
            <li key={p.id}>
              <Link
                href={`/portal/projects/${p.id}`}
                className="block border border-zinc-200 bg-white p-5 hover:border-orange-300 transition-colors group"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <StatusPill status={p.status} />
                    {p.tier && (
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em]">
                        {TIER_LABELS[p.tier] || p.tier}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <p className="text-base md:text-lg font-bold text-zinc-900 group-hover:text-orange-700 transition-colors mb-1">
                  {p.title}
                </p>
                <p className="text-xs text-zinc-500">
                  {p.clientName && (
                    <>
                      <span className="text-zinc-700 font-semibold">{p.clientName}</span>
                      <span className="text-zinc-300 mx-1.5">·</span>
                    </>
                  )}
                  Started {new Date(p.createdAt).toLocaleDateString()} ·{" "}
                  Updated {new Date(p.updatedAt).toLocaleDateString()}
                  {p.targetLaunchDate && (
                    <> · Target launch {new Date(p.targetLaunchDate).toLocaleDateString()}</>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
