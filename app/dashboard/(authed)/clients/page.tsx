import Link from "next/link";
import { db, schema } from "@/db/client";
import { count, desc, eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function listClientsWithStats() {
  // Pull each client + how many projects + last activity timestamp.
  const rows = await db
    .select({
      id: schema.clients.id,
      email: schema.clients.email,
      name: schema.clients.name,
      company: schema.clients.company,
      createdAt: schema.clients.createdAt,
      lastLoginAt: schema.clients.lastLoginAt,
      projectCount: sql<number>`(
        select count(*) from ${schema.projects} where ${schema.projects.clientId} = ${schema.clients.id}
      )`,
      lastActivityAt: sql<Date | null>`(
        select max(${schema.projects.updatedAt}) from ${schema.projects} where ${schema.projects.clientId} = ${schema.clients.id}
      )`,
    })
    .from(schema.clients)
    .orderBy(desc(schema.clients.createdAt));

  void count;
  void eq;
  return rows;
}

function timeAgo(d: Date | null | undefined): string {
  if (!d) return "—";
  const ms = Date.now() - new Date(d).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default async function ClientsPage() {
  const rows = await listClientsWithStats();

  return (
    <div>
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] mb-2">
        Clients
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-2">
        Client roster
      </h1>
      <p className="text-sm text-[#73706d] mb-8">
        Every client provisioned in the portal. Adding a project from an inbox
        entry auto-creates the client row.
      </p>

      <div className="border border-[#e8e4dd] bg-white">
        {rows.length === 0 ? (
          <p className="text-sm text-[#73706d] px-6 py-12 text-center">
            No clients yet. Convert a form submission into a project to get
            started.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#fafaf8] text-[10px] font-mono uppercase tracking-[0.18em] text-[#73706d]">
              <tr>
                <th className="text-left px-4 py-2.5 font-normal">Name</th>
                <th className="text-left px-4 py-2.5 font-normal">Email</th>
                <th className="text-left px-4 py-2.5 font-normal">Company</th>
                <th className="text-right px-4 py-2.5 font-normal">Projects</th>
                <th className="text-left px-4 py-2.5 font-normal">Last activity</th>
                <th className="text-left px-4 py-2.5 font-normal">Last login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e4dd]">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-[#fafaf8]/60 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-[#292827]">
                    {r.name || "—"}
                  </td>
                  <td className="px-4 py-2.5 text-[#73706d] font-mono text-[12px] break-all">
                    {r.email}
                  </td>
                  <td className="px-4 py-2.5 text-[#73706d]">{r.company || "—"}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    <Link
                      href={`/dashboard/projects?client=${r.id}`}
                      className="font-bold text-[#292827] hover:text-[#1b1938]"
                    >
                      {Number(r.projectCount)}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-[#73706d]">
                    {timeAgo(r.lastActivityAt)}
                  </td>
                  <td className="px-4 py-2.5 text-[#73706d]">
                    {timeAgo(r.lastLoginAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
