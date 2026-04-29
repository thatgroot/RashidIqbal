"use client";

import {
  useRealtimeProject,
  type SnapshotMessage,
  type SnapshotProject,
  type SnapshotTodo,
  type SnapshotAsset,
} from "@/lib/portal/use-realtime-project";
import { MessageThread } from "@/components/portal/message-thread";
import { TodoList } from "@/components/portal/todo-list";
import { AssetGrid } from "@/components/portal/asset-grid";
import { NotesPanel } from "@/components/portal/notes-panel";
import { StatusPill } from "@/components/portal/status-pill";

// Single client-side wrapper that owns the realtime hook and renders all
// four collaborative sections (assets, todos, notes, message thread).
// Pages pass server-rendered initial state to avoid the empty-flash on
// first paint; the hook reconciles every 2.5s afterward.

type Props = {
  projectId: string;
  viewer: "admin" | "client";
  viewerName: string;
  initialProject: SnapshotProject;
  initialMessages: SnapshotMessage[];
  initialTodos: SnapshotTodo[];
  initialAssets: SnapshotAsset[];
};

export function ProjectWorkspace({
  projectId,
  viewer,
  viewerName,
  initialProject,
  initialMessages,
  initialTodos,
  initialAssets,
}: Props) {
  const live = useRealtimeProject(projectId, {
    project: initialProject,
    messages: initialMessages,
    todos: initialTodos,
    assets: initialAssets,
  });

  return (
    <div className="space-y-8">
      {/* Live status pill — admin's status changes appear on the portal in ~3s */}
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill status={live.project.status} />
        {live.project.tier && (
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em]">
            {live.project.tier}
          </span>
        )}
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em] ml-auto">
          Updated {new Date(live.project.updatedAt).toLocaleTimeString()}
        </span>
      </div>

      {/* Conversation lifted up — the primary surface for clients */}
      <section>
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3 flex items-center gap-2">
          Conversation
          {live.wsConnected && (
            <span
              className="inline-flex items-center gap-1 normal-case tracking-normal text-emerald-600 font-mono text-[9px]"
              title="Realtime connection active"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          )}
        </p>
        <MessageThread
          projectId={projectId}
          messages={live.messages}
          viewer={viewer}
          viewerName={viewerName}
          onLocalMessage={live.upsertLocalMessage}
          onRevalidate={live.revalidate}
          remoteTyping={live.remoteTyping}
          onTyping={live.triggerTyping}
        />
      </section>

      {/* Assets */}
      <section>
        <AssetGrid
          projectId={projectId}
          assets={live.assets}
          viewer={viewer}
          onLocalUpsert={live.upsertLocalAsset}
          onLocalRemove={live.removeLocalAsset}
          onRevalidate={live.revalidate}
        />
      </section>

      {/* Todos + notes side-by-side on desktop */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
            Todo list
          </p>
          <TodoList
            projectId={projectId}
            todos={live.todos}
            viewer={viewer}
            onLocalUpsert={live.upsertLocalTodo}
            onLocalRemove={live.removeLocalTodo}
            onRevalidate={live.revalidate}
          />
        </div>
        <div>
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
            Notes
          </p>
          <NotesPanel
            projectId={projectId}
            viewer={viewer}
            remoteShared={live.project.notesShared}
            remoteInternal={live.project.notesInternal ?? ""}
            remoteUpdatedAt={live.project.updatedAt}
          />
        </div>
      </section>
    </div>
  );
}
