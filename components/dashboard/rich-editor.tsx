"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
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
  ListChecks,
  Quote,
  Link as LinkIcon,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";

// Notion-style WYSIWYG markdown editor.
//
// Behaviour:
// - Single canvas, no separate preview pane. Headings, lists, quotes,
//   etc render inline as you type. Markdown shortcuts work natively
//   (`## ` → H2, `> ` → quote, `- ` → bullet, `1. ` → ordered, ` ``` ` → code, `[]` → task).
// - Round-trips to markdown via tiptap-markdown so the parent only ever
//   sees a markdown string in/out — drop-in replacement for a textarea.
// - Initial content is loaded via setContent in a useEffect so the
//   tiptap-markdown extension's setContent override is active. Otherwise
//   seeded `## Heading` arrives as literal text.
// - Floating toolbar appears at top; sticky during scroll so headings
//   are reachable on long posts.

const MARKDOWN_STORAGE_KEY = "markdown" as const;

type MarkdownStorage = {
  markdown: { getMarkdown: () => string };
};

function getMarkdown(editor: Editor): string {
  return (editor.storage as unknown as MarkdownStorage)[MARKDOWN_STORAGE_KEY].getMarkdown();
}

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
  rows?: number;
  minHeight?: string;
}) {
  const lastEmitRef = useRef<string>("");
  const initializedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const editor = useEditor({
    immediatelyRender: false, // Next.js SSR
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class:
              "rounded bg-[#1b1938] text-zinc-100 p-3 font-mono text-xs overflow-x-auto",
          },
        },
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "text-[#1b1938] underline" },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Type '/' or just start writing… Markdown shortcuts work (## heading, > quote, - list, 1. ordered, ``` code).",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:float-left before:text-zinc-300 before:pointer-events-none before:h-0",
      }),
      TaskList.configure({ HTMLAttributes: { class: "not-prose space-y-1.5 my-2" } }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: "flex items-start gap-2" },
      }),
      Markdown.configure({
        linkify: true,
        breaks: false,
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
        tightLists: true,
      }),
    ],
    // Important: pass empty initial content. We hydrate from `value` in a
    // useEffect below so tiptap-markdown's setContent override is active
    // when the markdown is parsed.
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc max-w-none focus:outline-none px-6 py-6 " +
          "prose-headings:font-semibold prose-headings:tracking-tight " +
          "prose-h1:text-3xl prose-h1:mt-6 prose-h1:mb-3 " +
          "prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 " +
          "prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2 " +
          "prose-p:my-3 prose-p:leading-relaxed " +
          "prose-li:my-1 " +
          "prose-blockquote:border-l-4 prose-blockquote:border-[#c9b4fa] prose-blockquote:bg-[#fafaf8]/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic " +
          "prose-code:bg-[#fafaf8] prose-code:text-[#292827] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none " +
          "prose-hr:my-8 prose-a:text-[#1b1938]",
      },
    },
    onCreate: () => setReady(true),
    onUpdate: ({ editor }) => {
      const md = getMarkdown(editor);
      if (md !== lastEmitRef.current) {
        lastEmitRef.current = md;
        onChange(md);
      }
    },
  });

  // Hydrate the editor with the parent's markdown value once the editor
  // is ready. Re-runs when `value` changes from outside (e.g. parent
  // refreshes from server) but skips if the editor already matches.
  useEffect(() => {
    if (!editor || !ready) return;
    if (initializedRef.current) {
      // Subsequent external changes — only reset if it differs.
      const current = getMarkdown(editor);
      if (current === value) return;
    }
    initializedRef.current = true;
    lastEmitRef.current = value;
    editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, ready, value]);

  if (!editor) {
    return (
      <div
        className="border border-[#e8e4dd] bg-white text-sm text-[#9a9794] px-4 py-3 rounded"
        style={{ minHeight: minHeight || `${(rows || 8) * 1.6}rem` }}
      >
        Loading editor…
      </div>
    );
  }

  return (
    <div className="border border-[#e8e4dd] bg-white rounded-md overflow-hidden focus-within:border-[#e8e4dd] transition-colors">
      <Toolbar editor={editor} />
      <div
        className="bg-white"
        style={{ minHeight: minHeight || `${(rows || 16) * 1.6}rem` }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toolbar — sticky at top of the editor body so headings stay reachable on
// long blog posts. Visually minimal so the canvas dominates.
// ---------------------------------------------------------------------------
function Toolbar({ editor }: { editor: Editor }) {
  const btn = (active: boolean) =>
    `inline-flex items-center justify-center w-8 h-8 text-[#73706d] hover:text-[#292827] hover:bg-[#fafaf8] rounded transition-colors disabled:opacity-40 ${
      active ? "bg-[#fafaf8] text-[#292827]" : ""
    }`;

  return (
    <div className="sticky top-0 z-10 flex items-center gap-0.5 px-2 py-1.5 border-b border-[#e8e4dd] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 flex-wrap">
      <Group>
        <ToolButton
          title="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          cls={btn(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          cls={btn(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          cls={btn(editor.isActive("heading", { level: 3 }))}
        >
          <Heading3 className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
      </Group>
      <Divider />
      <Group>
        <ToolButton
          title="Bold (⌘B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          cls={btn(editor.isActive("bold"))}
        >
          <Bold className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Italic (⌘I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          cls={btn(editor.isActive("italic"))}
        >
          <Italic className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          cls={btn(editor.isActive("strike"))}
        >
          <Strikethrough className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Inline code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          cls={btn(editor.isActive("code"))}
        >
          <Code className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
      </Group>
      <Divider />
      <Group>
        <ToolButton
          title="Bulleted list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          cls={btn(editor.isActive("bulletList"))}
        >
          <List className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          cls={btn(editor.isActive("orderedList"))}
        >
          <ListOrdered className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Task list"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          cls={btn(editor.isActive("taskList"))}
        >
          <ListChecks className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          cls={btn(editor.isActive("blockquote"))}
        >
          <Quote className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          cls={btn(false)}
        >
          <Minus className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
      </Group>
      <Divider />
      <Group>
        <ToolButton
          title="Add link (⌘K)"
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
          <LinkIcon className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
      </Group>
      <Divider />
      <Group>
        <ToolButton
          title="Undo (⌘Z)"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          cls={btn(false)}
        >
          <Undo2 className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
        <ToolButton
          title="Redo (⌘⇧Z)"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          cls={btn(false)}
        >
          <Redo2 className="w-4 h-4" aria-hidden="true" />
        </ToolButton>
      </Group>
      <span className="ml-auto text-[10px] font-mono text-[#9a9794] hidden md:block pr-2">
        Markdown · live preview
      </span>
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function ToolButton({
  onClick,
  disabled,
  cls,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  cls: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={cls}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-[#e8e4dd] mx-1" aria-hidden="true" />;
}
