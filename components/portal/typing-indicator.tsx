"use client";

// WhatsApp-style three-dot animation. Renders nothing when no one is
// typing. The bouncing dots use a tiny custom keyframe declared inline
// so we don't depend on a Tailwind plugin.

export function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-1 py-2 text-xs text-zinc-500">
      <span className="font-mono uppercase tracking-[0.18em] text-orange-600">
        {name}
      </span>
      <span className="text-zinc-400">is typing</span>
      <span className="inline-flex items-end gap-0.5 ml-0.5">
        <Dot delay={0} />
        <Dot delay={0.18} />
        <Dot delay={0.36} />
      </span>
      <style>{`
        @keyframes aestho-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%           { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block w-1 h-1 rounded-full bg-orange-500"
      style={{
        animation: "aestho-typing-bounce 1.1s ease-in-out infinite",
        animationDelay: `${delay}s`,
      }}
    />
  );
}
