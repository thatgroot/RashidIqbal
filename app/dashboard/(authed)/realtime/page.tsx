import { RealtimeClient } from "@/components/dashboard/realtime-client";
import { getRealtime } from "@/lib/dashboard/queries";

export const dynamic = "force-dynamic";

export default async function RealtimePage() {
  const initial = await getRealtime(80);

  return (
    <div>
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] mb-2">
        Realtime
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-2">
        Live activity
      </h1>
      <p className="text-sm text-[#73706d] mb-8">
        Every event in the last 5 minutes. Refreshes every 10 seconds.
      </p>

      <RealtimeClient
        initial={initial.map((r) => ({
          ...r,
          createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
        }))}
      />
    </div>
  );
}
