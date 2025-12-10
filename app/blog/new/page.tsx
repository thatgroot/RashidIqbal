"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TiptapEditor } from "@/components/blog/tiptap-editor";
import {
  ArrowLeft,
  Save,
  Eye,
  Settings,
  X,
  Image as ImageIcon,
  Tag,
  Calendar,
  Globe,
  Twitter,
  Linkedin,
  AlertCircle,
  CheckCircle,
  Upload,
  Loader2,
} from "lucide-react";

interface PostData {
  title: string;
  description: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage: string;
  published: boolean;
  featured: boolean;
  // SEO
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  // Social
  twitterCard: "summary" | "summary_large_image";
  linkedinTitle: string;
  linkedinDescription: string;
}

const categories = [
  "Development",
  "Technology",
  "Mobile",
  "Design",
  "Business",
  "Tutorial",
];

export default function BlogEditorPage() {
  const router = useRouter();
  const [showSeoPanel, setShowSeoPanel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    content: "",
    slug: "",
    category: "Development",
    tags: [],
    coverImage: "",
    published: false,
    featured: false,
    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    linkedinTitle: "",
    linkedinDescription: "",
  });

  const [tagInput, setTagInput] = useState("");

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setPostData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seoTitle: prev.seoTitle || title,
      linkedinTitle: prev.linkedinTitle || title,
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setPostData((prev) => ({
      ...prev,
      description,
      seoDescription: prev.seoDescription || description,
      linkedinDescription: prev.linkedinDescription || description,
    }));
  };

  const handleContentChange = useCallback((content: string) => {
    setPostData((prev) => ({ ...prev, content }));
  }, []);

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCoverImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", postData.slug || "general");

      const response = await fetch("/api/blog/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      setPostData((prev) => ({
        ...prev,
        coverImage: data.url,
        ogImage: prev.ogImage || data.url,
      }));
    } catch (error) {
      console.error("Cover image upload error:", error);
      alert(error instanceof Error ? error.message : "Failed to upload cover image");
    } finally {
      setCoverImageUploading(false);
      if (coverImageInputRef.current) {
        coverImageInputRef.current.value = "";
      }
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSave = async (publish = false) => {
    if (!postData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    setSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch("/api/blog/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...postData,
          published: publish,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      setSaveStatus("success");
      setTimeout(() => {
        if (publish) {
          router.push(`/blog/${postData.slug}`);
        }
      }, 1000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Store in sessionStorage for preview
    sessionStorage.setItem("blog-preview", JSON.stringify(postData));
    window.open("/blog/preview", "_blank");
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
              aria-label="Back to blog"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-zinc-900">New Post</h1>
              <p className="text-xs text-zinc-500">
                {postData.slug ? `/${postData.slug}` : "Enter a title to generate URL"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Status */}
            {saveStatus === "success" && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                Saved
              </span>
            )}
            {saveStatus === "error" && (
              <span className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                Error saving
              </span>
            )}

            {/* SEO Settings */}
            <button
              onClick={() => setShowSeoPanel(!showSeoPanel)}
              className={`p-2 rounded transition-colors ${
                showSeoPanel
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
              aria-label="SEO Settings"
              title="SEO Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Preview */}
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            {/* Save Draft */}
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>

            {/* Publish */}
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded text-sm font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Main Editor */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <div>
            <input
              type="text"
              value={postData.title}
              onChange={handleTitleChange}
              placeholder="Enter post title..."
              className="w-full text-4xl font-bold text-zinc-900 placeholder:text-zinc-300 bg-transparent border-none outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              value={postData.description}
              onChange={handleDescriptionChange}
              placeholder="Brief description of your post (shows in previews)..."
              rows={2}
              className="w-full text-lg text-zinc-600 placeholder:text-zinc-300 bg-transparent border-none outline-none resize-none"
            />
          </div>

          {/* Cover Image */}
          <div className="border border-dashed border-zinc-300 rounded-lg overflow-hidden">
            {postData.coverImage ? (
              <div className="relative">
                <div className="relative aspect-video bg-zinc-100">
                  <Image
                    src={postData.coverImage}
                    alt="Cover image preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => coverImageInputRef.current?.click()}
                    className="px-4 py-2 bg-white text-zinc-900 rounded text-sm font-medium hover:bg-zinc-100"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostData((prev) => ({ ...prev, coverImage: "" }))}
                    className="px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                    {coverImageUploading ? (
                      <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-700">Add cover image</p>
                    <p className="text-xs text-zinc-500 mt-1">Recommended: 1200×630px (16:9 ratio)</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => coverImageInputRef.current?.click()}
                      disabled={coverImageUploading}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded hover:bg-zinc-800 disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </button>
                    <span className="text-zinc-400 text-sm self-center">or</span>
                    <input
                      type="text"
                      value={postData.coverImage}
                      onChange={(e) =>
                        setPostData((prev) => ({ ...prev, coverImage: e.target.value }))
                      }
                      placeholder="Paste URL..."
                      className="px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Hidden file input */}
            <input
              ref={coverImageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleCoverImageUpload}
              className="hidden"
              aria-hidden="true"
            />
          </div>

          {/* Editor */}
          <TiptapEditor
            content={postData.content}
            onChange={handleContentChange}
            placeholder="Start writing your blog post..."
            slug={postData.slug || "general"}
          />
        </div>

        {/* Sidebar */}
        <aside className="w-80 space-y-6">
          {/* Post Settings */}
          <div className="bg-white border border-zinc-200 rounded-lg p-4">
            <h3 className="font-medium text-zinc-900 mb-4">Post Settings</h3>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Category
              </label>
              <select
                value={postData.category}
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-zinc-100 text-zinc-700 rounded text-sm hover:bg-zinc-200"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {postData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 text-zinc-700 text-xs rounded"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-zinc-400 hover:text-zinc-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={postData.featured}
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="rounded border-zinc-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-zinc-700">Featured post</span>
            </label>
          </div>

          {/* SEO Panel */}
          {showSeoPanel && (
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <h3 className="font-medium text-zinc-900 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                SEO & Social
              </h3>

              {/* SEO Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={postData.seoTitle}
                  onChange={(e) =>
                    setPostData((prev) => ({ ...prev, seoTitle: e.target.value }))
                  }
                  placeholder={postData.title || "SEO title..."}
                  className="w-full px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-zinc-400 mt-1">
                  {postData.seoTitle.length || postData.title.length}/60 characters
                </p>
              </div>

              {/* SEO Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={postData.seoDescription}
                  onChange={(e) =>
                    setPostData((prev) => ({
                      ...prev,
                      seoDescription: e.target.value,
                    }))
                  }
                  placeholder={postData.description || "Meta description..."}
                  rows={3}
                  className="w-full px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
                <p className="text-xs text-zinc-400 mt-1">
                  {postData.seoDescription.length || postData.description.length}/160 characters
                </p>
              </div>

              {/* Canonical URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Canonical URL (optional)
                </label>
                <input
                  type="text"
                  value={postData.canonicalUrl}
                  onChange={(e) =>
                    setPostData((prev) => ({
                      ...prev,
                      canonicalUrl: e.target.value,
                    }))
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <hr className="my-4 border-zinc-200" />

              {/* Twitter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  <Twitter className="w-4 h-4 inline mr-1" />
                  Twitter Card Type
                </label>
                <select
                  value={postData.twitterCard}
                  onChange={(e) =>
                    setPostData((prev) => ({
                      ...prev,
                      twitterCard: e.target.value as "summary" | "summary_large_image",
                    }))
                  }
                  className="w-full px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="summary_large_image">Large Image</option>
                  <option value="summary">Summary</option>
                </select>
              </div>

              {/* LinkedIn Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  <Linkedin className="w-4 h-4 inline mr-1" />
                  LinkedIn Title
                </label>
                <input
                  type="text"
                  value={postData.linkedinTitle}
                  onChange={(e) =>
                    setPostData((prev) => ({
                      ...prev,
                      linkedinTitle: e.target.value,
                    }))
                  }
                  placeholder={postData.title || "LinkedIn title..."}
                  className="w-full px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* OG Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Custom OG Image
                </label>
                <input
                  type="text"
                  value={postData.ogImage}
                  onChange={(e) =>
                    setPostData((prev) => ({ ...prev, ogImage: e.target.value }))
                  }
                  placeholder={postData.coverImage || "/blog/og-image.jpg"}
                  className="w-full px-3 py-2 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-zinc-400 mt-1">
                  Leave empty to auto-generate from cover image
                </p>
              </div>
            </div>
          )}

          {/* Preview Card */}
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
            <div className="p-3 bg-zinc-50 border-b border-zinc-200">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Social Preview
              </span>
            </div>
            <div className="p-4">
              {/* OG Preview */}
              <div className="border border-zinc-200 rounded overflow-hidden">
                <div className="bg-zinc-100 aspect-video flex items-center justify-center">
                  {postData.coverImage || postData.ogImage ? (
                    <span className="text-xs text-zinc-500">
                      {postData.coverImage || postData.ogImage}
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400">Auto-generated OG image</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-zinc-400 mb-1">aestho.xyz</p>
                  <h4 className="text-sm font-medium text-zinc-900 line-clamp-2">
                    {postData.seoTitle || postData.title || "Post Title"}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {postData.seoDescription || postData.description || "Post description..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

