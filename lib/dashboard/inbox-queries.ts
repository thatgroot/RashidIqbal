import { db, schema } from "@/db/client";
import { and, count, desc, eq, isNull, isNotNull, or, sql } from "drizzle-orm";

export type InboxFolder = "all" | "unread" | "starred" | "archived";

export type InboxItem = {
  id: string;
  source: string;
  email: string;
  name: string | null;
  subject: string;
  preview: string;
  createdAt: Date;
  readAt: Date | null;
  starred: boolean;
  archivedAt: Date | null;
};

function previewFor(body: Record<string, unknown> | null): string {
  if (!body) return "";
  // Pull the first non-empty narrative-style field; falls back to JSON keys.
  const candidates = [
    body["description"],
    body["concern"],
    body["plan"],
    body["services"],
  ];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim().slice(0, 140);
  }
  return Object.entries(body)
    .filter(([, v]) => v != null && v !== "")
    .slice(0, 2)
    .map(([k, v]) => `${k}: ${String(v).slice(0, 40)}`)
    .join(" · ");
}

export async function listInbox(opts: {
  folder?: InboxFolder | undefined;
  limit?: number;
  offset?: number;
  search?: string | undefined;
}): Promise<{ rows: InboxItem[]; total: number }> {
  const folder = opts.folder ?? "all";
  const limit = Math.min(200, opts.limit ?? 50);
  const offset = Math.max(0, opts.offset ?? 0);

  const filters = [] as ReturnType<typeof eq>[];
  if (folder === "unread")
    filters.push(isNull(schema.formSubmissions.readAt), isNull(schema.formSubmissions.archivedAt));
  else if (folder === "starred")
    filters.push(eq(schema.formSubmissions.starred, true), isNull(schema.formSubmissions.archivedAt));
  else if (folder === "archived")
    filters.push(isNotNull(schema.formSubmissions.archivedAt));
  else if (folder === "all") filters.push(isNull(schema.formSubmissions.archivedAt));

  const where = filters.length ? and(...filters) : undefined;

  const [{ total } = { total: 0 }] = await db
    .select({ total: count() })
    .from(schema.formSubmissions)
    .where(where);

  const rows = await db
    .select({
      id: schema.formSubmissions.id,
      source: schema.formSubmissions.source,
      email: schema.formSubmissions.email,
      name: schema.formSubmissions.name,
      subject: schema.formSubmissions.subject,
      body: schema.formSubmissions.body,
      createdAt: schema.formSubmissions.createdAt,
      readAt: schema.formSubmissions.readAt,
      starred: schema.formSubmissions.starred,
      archivedAt: schema.formSubmissions.archivedAt,
    })
    .from(schema.formSubmissions)
    .where(where)
    .orderBy(desc(schema.formSubmissions.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    rows: rows.map((r) => ({
      id: r.id,
      source: r.source,
      email: r.email,
      name: r.name,
      subject: r.subject,
      preview: previewFor(r.body as Record<string, unknown> | null),
      createdAt: r.createdAt,
      readAt: r.readAt,
      starred: r.starred,
      archivedAt: r.archivedAt,
    })),
    total: Number(total),
  };
}

export async function inboxCounts(): Promise<{
  unread: number;
  starred: number;
  archived: number;
  all: number;
}> {
  const [u] = await db
    .select({ n: count() })
    .from(schema.formSubmissions)
    .where(
      and(
        isNull(schema.formSubmissions.readAt),
        isNull(schema.formSubmissions.archivedAt)
      )
    );
  const [s] = await db
    .select({ n: count() })
    .from(schema.formSubmissions)
    .where(
      and(
        eq(schema.formSubmissions.starred, true),
        isNull(schema.formSubmissions.archivedAt)
      )
    );
  const [a] = await db
    .select({ n: count() })
    .from(schema.formSubmissions)
    .where(isNotNull(schema.formSubmissions.archivedAt));
  const [all] = await db
    .select({ n: count() })
    .from(schema.formSubmissions)
    .where(isNull(schema.formSubmissions.archivedAt));
  return {
    unread: Number(u?.n ?? 0),
    starred: Number(s?.n ?? 0),
    archived: Number(a?.n ?? 0),
    all: Number(all?.n ?? 0),
  };
}

export async function getInboxItem(id: string) {
  const [row] = await db
    .select()
    .from(schema.formSubmissions)
    .where(eq(schema.formSubmissions.id, id))
    .limit(1);
  return row ?? null;
}

export async function markRead(id: string, read: boolean) {
  await db
    .update(schema.formSubmissions)
    .set({ readAt: read ? new Date() : null })
    .where(eq(schema.formSubmissions.id, id));
}

export async function setStar(id: string, starred: boolean) {
  await db
    .update(schema.formSubmissions)
    .set({ starred })
    .where(eq(schema.formSubmissions.id, id));
}

export async function setArchived(id: string, archived: boolean) {
  await db
    .update(schema.formSubmissions)
    .set({ archivedAt: archived ? new Date() : null })
    .where(eq(schema.formSubmissions.id, id));
}

// suppress unused-import warnings when filters change
void or;
void sql;
