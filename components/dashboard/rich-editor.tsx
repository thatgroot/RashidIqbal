"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";

// Tiptap-based WYSIWYG with markdown round-trip. The `value` prop is a
// markdown string; the component converts → ProseMirror on mount and
// converts ProseMirror → markdown on every change. The parent only ever
// sees markdown — drop-in replacement for the previous textarea.

export function RichEditor({
  value,
  onChange,
  placeholder,
  rows,
  minHeight,
}: {
  value: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
  rows?: number; // ignored visually; kept for API parity with the old textarea
  minHeight?: string; // CSS value, e.g. "24rem"
}) {
  const lastEmitRef = useRef<string>(value);

  const editor = useEditor({
    immediatelyRender: false, // Next.js SSR
    extensions: [
      StarterKit.configure({
        // Code-block uses StarterKit's default (no syntax highlight in
        // editor — we ship rendered code through the existing
        // MarkdownRenderer on the public side).
        codeBlock: { HTMLAttributes: { class: "rounded bg-zinc-900 text-zinc-100 p-3 font-mono text-xs" } },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-orange-700 underline" },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something — markdown supported.",
      }),
      Markdown.configure({
        linkify: true,
        breaks: false,
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-zinc max-w-none focus:outline-none min-h-[12rem] px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      const md = (editor.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown();
      if (md !== lastEmitRef.current) {
        lastEmitRef.current = md;
        onChange(md);
      }
    },
  });

  // Sync external value changes (e.g. when the parent receives a new
  // server-side load) without bouncing the editor on every onChange.
  useEffect(() => {
    if (!editor) return;
    if (value === lastEmitRef.current) return;
    const current = (editor.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown();
    if (current !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
      lastEmitRef.current = value;
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div
        className="border border-zinc-200 bg-white text-sm text-zinc-400 px-4 py-3"
        style={{ minHeight: minHeight || `${(rows || 8) * 1.5}rem` }}
      >
        Loading editor…
      </div>
    );
  }

  return (
    <div className="border border-zinc-200 bg-white focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-colors">
      <Toolbar editor={editor} />
      <div style={{ minHeight: minHeight || `${(rows || 12) * 1.5}rem` }}>
        <EditorContent editor={editor} />
      </div>
      <p className="px-3 py-1.5 text-[10px] text-zinc-400 border-t border-zinc-100 font-mono">
        Markdown round-trip · headings, lists, links, code, quotes ·{" "}
        <span className="text-zinc-500">⌘B bold · ⌘I italic · ⌘K link · ⌘Z undo</span>
      </p>
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const btn = (active: boolean) =>
    `inline-flex items-center justify-center w-7 h-7 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors disabled:opacity-40 ${
      active ? "bg-zinc-100 text-zinc-900" : ""
    }`;

  return (
    <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-zinc-100 bg-zinc-50/40 flex-wrap">
      <ToolButton
        title="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        cls={btn(editor.isActive("heading", { level: 1 }))}
      >
        <Heading1 className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        cls={btn(editor.isActive("heading", { level: 2 }))}
      >
        <Heading2 className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        cls={btn(editor.isActive("heading", { level: 3 }))}
      >
        <Heading3 className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <Divider />
      <ToolButton
        title="Bold (⌘B)"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        cls={btn(editor.isActive("bold"))}
      >
        <Bold className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Italic (⌘I)"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        cls={btn(editor.isActive("italic"))}
      >
        <Italic className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        cls={btn(editor.isActive("strike"))}
      >
        <Strikethrough className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Inline code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
        cls={btn(editor.isActive("code"))}
      >
        <Code className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <Divider />
      <ToolButton
        title="Bulleted list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        cls={btn(editor.isActive("bulletList"))}
      >
        <List className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        cls={btn(editor.isActive("orderedList"))}
      >
        <ListOrdered className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        cls={btn(editor.isActive("blockquote"))}
      >
        <Quote className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Horizontal rule"
        active={false}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        cls={btn(false)}
      >
        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <Divider />
      <ToolButton
        title="Add link (⌘K)"
        active={editor.isActive("link")}
        onClick={() => {
          const prev = editor.getAttributes("link").href as string | undefined;
          const url = window.prompt("Link URL", prev || "https://");
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        cls={btn(editor.isActive("link"))}
      >
        <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <Divider />
      <ToolButton
        title="Undo (⌘Z)"
        active={false}
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
        cls={btn(false)}
      >
        <Undo2 className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
      <ToolButton
        title="Redo (⌘⇧Z)"
        active={false}
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
        cls={btn(false)}
      >
        <Redo2 className="w-3.5 h-3.5" aria-hidden="true" />
      </ToolButton>
    </div>
  );
}

function ToolButton({
  onClick,
  active,
  disabled,
  cls,
  title,
  children,
}: {
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
  cls: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        // Prevent the editor from losing focus when clicking the toolbar
        e.preventDefault();
      }}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={cls}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-4 bg-zinc-200 mx-1" aria-hidden="true" />;
}
