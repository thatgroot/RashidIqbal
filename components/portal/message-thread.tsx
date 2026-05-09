"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import type { SnapshotMessage } from "@/lib/portal/use-realtime-project";
import type { TypingPayload } from "@/lib/portal/use-project-channel";
import { TypingIndicator } from "./typing-indicator";

const SUGGESTION_CHIPS = [
  "Hi! Ready to kick off.",
  "Quick question about the brief.",
  "Sharing some assets with you.",
] as const;

function timeStamp(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const sameDay =
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();
  return sameDay
    ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : d.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

export function MessageThread({
  projectId,
  messages,
  viewer,
  viewerName,
  onLocalMessage,
  onRevalidate,
  remoteTyping,
  onTyping,
}: {
  projectId: string;
  messages: SnapshotMessage[];
  viewer: "admin" | "client";
  viewerName: string;
  onLocalMessage: (m: SnapshotMessage) => void;
  onRevalidate: () => void;
  remoteTyping: TypingPayload | null;
  onTyping: (p: TypingPayload) => void;
}) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastCountRef = useRef<number>(messages.length);

  // Auto-focus the input on mount when the thread is empty (first-message
  // friction reduction from B4).
  useEffect(() => {
    if (messages.length === 0) textareaRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to bottom when a new message arrives.
  useEffect(() => {
    if (messages.length !== lastCountRef.current) {
      lastCountRef.current = messages.length;
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [messages.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      const url =
        viewer === "client"
          ? "/api/portal/messages"
          : `/api/dashboard/projects/${projectId}/messages`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, body: body.trim() }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error || "Could not send. Try again.");
        return;
      }
      const out = (await res.json()) as { message: SnapshotMessage };
      onLocalMessage(out.message);
      onRevalidate();
      setBody("");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border border-[#e8e4dd] bg-white flex flex-col">
      <div
        ref={scrollRef}
        className="flex-1 px-5 py-5 max-h-[480px] overflow-auto space-y-4"
      >
        {messages.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <p className="text-sm text-[#73706d]">
              {viewer === "client"
                ? "No messages yet. Drop a note below to start the conversation."
                : "No messages yet. Send the first note to kick off communication."}
            </p>
            {viewer === "client" && (
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setBody(chip);
                      textareaRef.current?.focus();
                    }}
                    className="text-xs px-3 py-1.5 border border-[#e8e4dd] hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          messages.map((m) => {
            const fromMe = m.senderType === viewer;
            return (
              <div
                key={m.id}
                className={`flex ${fromMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] ${fromMe ? "items-end" : "items-start"} flex flex-col`}>
                  <p
                    className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-1 ${
                      fromMe ? "text-[#9a9794]" : "text-[#1b1938]"
                    }`}
                  >
                    {fromMe ? viewerName : m.senderType === "admin" ? "Rashid" : "Client"} ·{" "}
                    {timeStamp(m.createdAt)}
                  </p>
                  <div
                    className={`px-4 py-2.5 text-sm whitespace-pre-wrap break-words ${
                      fromMe
                        ? "bg-[#1b1938] text-white"
                        : "bg-[#fafaf8] border border-[#e8e4dd] text-[#292827]"
                    }`}
                  >
                    {m.body}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {remoteTyping && remoteTyping.who !== viewer && (
        <div className="px-5 border-t border-[#e8e4dd] bg-[#fafaf8]/40">
          <TypingIndicator
            name={
              remoteTyping.name ||
              (remoteTyping.who === "admin" ? "Rashid" : "Client")
            }
          />
        </div>
      )}
      <form onSubmit={send} className="border-t border-[#e8e4dd] p-3 bg-[#fafaf8]/40">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (e.target.value.trim()) {
                onTyping({ who: viewer, name: viewerName });
              }
            }}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                send(e as unknown as React.FormEvent);
              }
            }}
            placeholder={viewer === "client" ? "Message Rashid…" : "Reply to client…"}
            rows={2}
            className="flex-1 px-3 py-2 text-sm border border-[#e8e4dd] bg-white text-[#292827] placeholder:text-[#9a9794] focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938] resize-none"
          />
          <button
            type="submit"
            disabled={!body.trim() || sending}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1b1938] text-white text-xs font-bold hover:bg-[#1b1938] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                Send
              </>
            )}
          </button>
        </div>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        <p className="text-[10px] text-[#9a9794] mt-1.5">
          {viewer === "client"
            ? "Rashid gets an email when you send. Replies appear here in seconds. ⌘/Ctrl + Enter to send."
            : "The client gets an email when you reply. Replies appear here in seconds. ⌘/Ctrl + Enter to send."}
        </p>
      </form>
    </div>
  );
}
