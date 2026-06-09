"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateSlug, calcReadingTime } from "@/lib/blog";
import type { Blog } from "@/types";
import { Save, Eye, Trash2, Upload, X } from "lucide-react";

const CATEGORIES = [
  "Manual Testing","Test Cases","Bug Reports","API Testing",
  "Automation Testing","Playwright","Selenium","QA Career","ISTQB",
  "AI in Testing","Mobile Testing","Web Testing",
  "Real Project Scenarios","Performance Testing","Security Testing",
];

interface Props {
  existing?: Blog;
}

export default function BlogEditor({ existing }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle]               = useState(existing?.title ?? "");
  const [slug, setSlug]                 = useState(existing?.slug ?? "");
  const [excerpt, setExcerpt]           = useState(existing?.excerpt ?? "");
  const [content, setContent]           = useState(existing?.content ?? "");
  const [category, setCategory]         = useState(existing?.category ?? CATEGORIES[0]);
  const [tagInput, setTagInput]         = useState((existing?.tags ?? []).join(", "));
  const [featuredImage, setFeaturedImage] = useState(existing?.featured_image ?? "");
  const [metaTitle, setMetaTitle]       = useState(existing?.meta_title ?? "");
  const [metaDesc, setMetaDesc]         = useState(existing?.meta_description ?? "");
  const [status, setStatus]             = useState<"draft" | "published">(existing?.status ?? "draft");
  const [saving, setSaving]             = useState(false);
  const [message, setMessage]           = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [uploading, setUploading]       = useState(false);

  // Auto-generate slug from title (only when creating new)
  useEffect(() => {
    if (!existing && title) setSlug(generateSlug(title));
  }, [title, existing]);

  const save = useCallback(
    async (saveStatus: "draft" | "published") => {
      setSaving(true);
      setMessage(null);
      const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
      const readingTime = calcReadingTime(content);

      const payload = {
        title, slug, excerpt, content, category, tags,
        featured_image: featuredImage || null,
        status: saveStatus,
        meta_title: metaTitle || null,
        meta_description: metaDesc || null,
        reading_time: readingTime,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (existing) {
        ({ error } = await supabase.from("blogs").update(payload).eq("id", existing.id));
      } else {
        ({ error } = await supabase.from("blogs").insert({ ...payload, created_at: new Date().toISOString() }));
      }

      setSaving(false);
      if (error) {
        setMessage({ type: "err", text: error.message });
      } else {
        setStatus(saveStatus);
        setMessage({ type: "ok", text: saveStatus === "published" ? "Published!" : "Saved as draft." });
        setTimeout(() => router.push("/secure-admin/dashboard"), 1200);
      }
    },
    [title, slug, excerpt, content, category, tagInput, featuredImage, metaTitle, metaDesc, existing, supabase, router]
  );

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `blog-images/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setFeaturedImage(data.publicUrl);
    }
    setUploading(false);
  }

  async function handleDelete() {
    if (!existing || !confirm("Delete this post permanently?")) return;
    await supabase.from("blogs").delete().eq("id", existing.id);
    router.push("/secure-admin/dashboard");
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/secure-admin/dashboard")}
            className="text-xs text-gray-400 hover:text-gray-700"
          >
            ← Dashboard
          </button>
          <span className="text-gray-300">|</span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              status === "published" ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            {status}
          </span>
          <span className="text-xs text-gray-400">{wordCount} words</span>
        </div>
        <div className="flex items-center gap-2">
          {existing && (
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete post"
            >
              <Trash2 size={15} />
            </button>
          )}
          {status === "published" && existing && (
            <a
              href={`/blog/${existing.slug}`}
              target="_blank"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 border border-gray-200 rounded-lg px-3 py-1.5"
            >
              <Eye size={13} /> View
            </a>
          )}
          <button
            onClick={() => save("draft")}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <Save size={13} /> Save Draft
          </button>
          <button
            onClick={() => save("published")}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-800 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </header>

      {message && (
        <div
          className={`mx-4 sm:mx-6 mt-3 px-4 py-2.5 rounded-lg text-sm flex items-center justify-between ${
            message.type === "ok"
              ? "bg-teal-50 text-teal-700 border border-teal-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
          <button onClick={() => setMessage(null)}><X size={14} /></button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title…"
              className="w-full font-serif text-2xl font-semibold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-300"
            />
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-gray-400">Slug:</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-xs text-teal-600 bg-transparent border-none outline-none flex-1"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <label className="block text-xs font-medium text-gray-500 mb-2">Excerpt (shown on listing page)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="A short summary of this post…"
              className="w-full text-sm text-gray-700 bg-transparent border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-teal-400 resize-none"
            />
          </div>

          {/* Content */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium text-gray-500">Content (HTML supported)</label>
              <span className="text-xs text-gray-400">{wordCount} words · {calcReadingTime(content)} min read</span>
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5 pb-3 border-b border-gray-100">
              {[
                { label: "H2", insert: "<h2></h2>" },
                { label: "H3", insert: "<h3></h3>" },
                { label: "Bold", insert: "<strong></strong>" },
                { label: "List", insert: "<ul>\n  <li></li>\n</ul>" },
                { label: "Ordered", insert: "<ol>\n  <li></li>\n</ol>" },
                { label: "Code", insert: "<code></code>" },
                { label: "Pre", insert: "<pre><code></code></pre>" },
                { label: "Link", insert: '<a href=""></a>' },
                { label: "Table", insert: "<table>\n  <thead><tr><th></th></tr></thead>\n  <tbody><tr><td></td></tr></tbody>\n</table>" },
              ].map(({ label, insert }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setContent((c) => c + "\n" + insert)}
                  className="text-xs px-2.5 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={22}
              placeholder="<p>Start writing your post here…</p>"
              className="w-full text-sm text-gray-700 font-mono bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-teal-400 resize-y leading-relaxed"
            />
            <p className="mt-2 text-xs text-gray-400">Write in HTML. Use the toolbar buttons above to insert tags quickly.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish settings */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Publish</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-700">Status</span>
              <button
                onClick={() => setStatus(status === "published" ? "draft" : "published")}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  status === "published" ? "bg-teal-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    status === "published" ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <button
              onClick={() => save("published")}
              disabled={saving || !title}
              className="w-full py-2.5 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-800 disabled:opacity-50 transition-colors mb-2"
            >
              {saving ? "Saving…" : "Publish Now"}
            </button>
            <button
              onClick={() => save("draft")}
              disabled={saving}
              className="w-full py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Save as Draft
            </button>
          </div>

          {/* Category & Tags */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Category & Tags</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Tags <span className="text-gray-400 font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="e.g. api, postman, REST"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50"
              />
            </div>
          </div>

          {/* Featured image */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Featured Image</h3>
            {featuredImage && (
              <div className="mb-3 relative">
                <img src={featuredImage} alt="" className="w-full h-32 object-cover rounded-xl" />
                <button
                  onClick={() => setFeaturedImage("")}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50"
                >
                  <X size={12} className="text-red-500" />
                </button>
              </div>
            )}
            <label className="flex items-center gap-2 justify-center w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-teal-300 cursor-pointer transition-colors">
              <Upload size={14} />
              {uploading ? "Uploading…" : "Upload image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="Or paste image URL…"
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">SEO</h3>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Meta Title <span className="text-gray-400 font-normal">({metaTitle.length}/60)</span>
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50"
              />
              {metaTitle.length > 60 && (
                <p className="text-xs text-amber-600 mt-1">Too long — keep under 60 characters</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Meta Description <span className="text-gray-400 font-normal">({metaDesc.length}/160)</span>
              </label>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                placeholder={excerpt}
                rows={3}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50 resize-none"
              />
              {metaDesc.length > 160 && (
                <p className="text-xs text-amber-600 mt-1">Too long — keep under 160 characters</p>
              )}
            </div>
            {/* Simple SEO score */}
            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs font-medium text-gray-600 mb-2">SEO Checklist</p>
              {[
                { label: "Title filled", ok: title.length > 0 },
                { label: "Excerpt filled", ok: excerpt.length > 0 },
                { label: "Meta description", ok: metaDesc.length > 0 && metaDesc.length <= 160 },
                { label: "Category selected", ok: !!category },
                { label: "Tags added", ok: tagInput.length > 0 },
                { label: "Content written", ok: content.length > 200 },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center gap-2 text-xs py-0.5">
                  <span className={ok ? "text-teal-500" : "text-gray-300"}>
                    {ok ? "✓" : "○"}
                  </span>
                  <span className={ok ? "text-gray-700" : "text-gray-400"}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
