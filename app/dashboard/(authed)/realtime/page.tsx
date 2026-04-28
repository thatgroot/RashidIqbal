export default function RealtimeStub() {
  return (
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        Realtime
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-3">
        Live activity
      </h1>
      <p className="text-sm text-zinc-600 max-w-xl">
        Lands in Phase 3. Last 5 minutes of activity, polling every 10s. Country
        flags, page paths, and CTAs clicked.
      </p>
    </div>
  );
}
