import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { getCurrentClientSession } from "@/lib/portal/auth";
import { listClientProjects, TIER_LABELS } from "@/lib/portal/queries";
import { StatusPill } from "@/components/portal/status-pill";

export const dynamic = "force-dynamic";

export default async function PortalHome() {
  const session = (await getCurrentClientSession())!;
  const projects = await listClientProjects(session.client.id);

  return (
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        Welcome
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
        Hi, {session.client.name?.split(" ")[0] || "there"}.
      </h1>
      <p className="text-sm text-zinc-500 mb-8">
        Every project we&rsquo;re working on lives here. Click any card to see
        timeline, links, and the full conversation.
      </p>

      {projects.length === 0 ? (
        <div className="border border-zinc-200 bg-white p-10 text-center">
          <FolderOpen className="w-8 h-8 text-zinc-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-sm text-zinc-500">
            No active projects yet. Once Rashid kicks one off, it shows up here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => (
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
