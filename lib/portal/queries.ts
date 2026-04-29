import { db, schema } from "@/db/client";
import { and, asc, desc, eq, isNull } from "drizzle-orm";

// Re-exported for server-component convenience. Client components must
// import these from `@/lib/portal/constants` directly so the bundler
// doesn't try to drag the DB into a client chunk.
export {
  STATUS_LABELS,
  STATUS_KEYS,
  TIER_LABELS,
} from "./constants";

export async function listClientProjects(clientId: string) {
  return db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.clientId, clientId))
    .orderBy(desc(schema.projects.createdAt));
}

export async function getProjectForClient(opts: {
  projectId: string;
  clientId: string;
}) {
  const [row] = await db
    .select()
    .from(schema.projects)
    .where(
      and(
        eq(schema.projects.id, opts.projectId),
        eq(schema.projects.clientId, opts.clientId)
      )
    )
    .limit(1);
  return row ?? null;
}

export async function getProjectAdmin(projectId: string) {
  const [row] = await db
    .select({
      project: schema.projects,
      client: schema.clients,
    })
    .from(schema.projects)
    .innerJoin(schema.clients, eq(schema.projects.clientId, schema.clients.id))
    .where(eq(schema.projects.id, projectId))
    .limit(1);
  return row ?? null;
}

export async function listMessages(projectId: string) {
  return db
    .select()
    .from(schema.projectMessages)
    .where(eq(schema.projectMessages.projectId, projectId))
    .orderBy(asc(schema.projectMessages.createdAt));
}

export async function listTodos(projectId: string) {
  return db
    .select()
    .from(schema.projectTodos)
    .where(eq(schema.projectTodos.projectId, projectId))
    .orderBy(asc(schema.projectTodos.sortOrder), asc(schema.projectTodos.createdAt));
}

export async function listAssets(projectId: string) {
  return db
    .select()
    .from(schema.projectAssets)
    .where(eq(schema.projectAssets.projectId, projectId))
    .orderBy(desc(schema.projectAssets.createdAt));
}

export async function listAllProjectsAdmin() {
  return db
    .select({
      project: schema.projects,
      client: schema.clients,
    })
    .from(schema.projects)
    .innerJoin(schema.clients, eq(schema.projects.clientId, schema.clients.id))
    .orderBy(desc(schema.projects.updatedAt));
}

export async function listAllClientsAdmin() {
  return db
    .select()
    .from(schema.clients)
    .orderBy(desc(schema.clients.createdAt));
}

export async function markMessagesRead(opts: {
  projectId: string;
  reader: "admin" | "client";
}) {
  // Only mark messages authored by the OTHER side as read. An admin
  // opening a thread shouldn't restamp their own outbound messages, and
  // we skip already-read rows so the timestamp records the first read,
  // not the most recent open. (Phase A3 fix.)
  const otherSender = opts.reader === "admin" ? "client" : "admin";
  const conds = [
    eq(schema.projectMessages.projectId, opts.projectId),
    eq(schema.projectMessages.senderType, otherSender),
    opts.reader === "admin"
      ? isNull(schema.projectMessages.readByAdminAt)
      : isNull(schema.projectMessages.readByClientAt),
  ];
  await db
    .update(schema.projectMessages)
    .set(
      opts.reader === "admin"
        ? { readByAdminAt: new Date() }
        : { readByClientAt: new Date() }
    )
    .where(and(...conds));
}
