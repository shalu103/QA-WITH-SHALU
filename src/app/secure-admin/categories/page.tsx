"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/blog";
import { Trash2, Plus, ArrowLeft } from "lucide-react";

interface Category { id: string; name: string; slug: string; }

export default function AdminCategoriesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [cats, setCats] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({ data }) => {
      if (data) setCats(data);
    });
  }, []);

  async function addCategory() {
    if (!newName.trim()) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("categories")
      .insert({ name: newName.trim(), slug: generateSlug(newName) })
      .select()
      .single();
    if (!error && data) {
      setCats((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
      setMsg("Category added!");
    } else {
      setMsg(error?.message ?? "Error");
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 2500);
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;
    await supabase.from("categories").delete().eq("id", id);
    setCats((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4">
        <button onClick={() => router.push("/secure-admin/dashboard")} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft size={13} /> Dashboard
        </button>
        <h1 className="text-sm font-semibold text-gray-900">Manage Categories</h1>
      </header>

      <div className="max-w-xl mx-auto px-6 py-10">
        {msg && <div className="mb-4 px-4 py-2.5 bg-teal-50 text-teal-700 rounded-xl text-sm">{msg}</div>}

        {/* Add new */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Add New Category</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              placeholder="Category name…"
              className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50"
            />
            <button
              onClick={addCategory}
              disabled={saving || !newName.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-800 disabled:opacity-50"
            >
              <Plus size={14} /> Add
            </button>
          </div>
          {newName && (
            <p className="mt-2 text-xs text-gray-400">Slug: {generateSlug(newName)}</p>
          )}
        </div>

        {/* List */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {cats.length} Categories
            </span>
          </div>
          {cats.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.slug}</p>
              </div>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
