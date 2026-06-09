import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Eye, Pencil, Trash2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAllBlogsForAdmin } from "@/lib/blog";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/secure-admin/login");

  const blogs = await getAllBlogsForAdmin();
  const published = blogs.filter((b) => b.status === "published");
  const drafts = blogs.filter((b) => b.status === "draft");

  async function deleteBlog(id: string) {
    "use server";
    const supabase = await createClient();
    await supabase.from("blogs").delete().eq("id", id);
    redirect("/secure-admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between">
        <span className="font-serif font-semibold text-base">
          QA <span className="text-teal-600">Admin</span>
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-700"
          >
            <ExternalLink size={12} /> View site
          </Link>
          <form action="/api/auth/signout" method="post">
            <button className="text-xs text-gray-400 hover:text-gray-700">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 min-h-screen bg-white border-r border-gray-100 py-6 hidden md:block">
          {[
            { href: "/secure-admin/dashboard", label: "Dashboard", icon: FileText },
            { href: "/secure-admin/blogs/new", label: "New Post", icon: Plus },
            { href: "/secure-admin/categories", label: "Categories", icon: FileText },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Welcome back, Shalu 👋
              </p>
            </div>
            <Link
              href="/secure-admin/blogs/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors"
            >
              <Plus size={14} /> New Post
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total Posts", value: blogs.length, color: "text-gray-900" },
              { label: "Published", value: published.length, color: "text-teal-600" },
              { label: "Drafts", value: drafts.length, color: "text-amber-600" },
              { label: "Categories", value: 15, color: "text-blue-600" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-gray-100 rounded-xl p-4"
              >
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Blog list */}
          <h2 className="text-sm font-medium text-gray-500 mb-3">
            All posts
          </h2>
          <div className="space-y-2">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{blog.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {blog.category} ·{" "}
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    blog.status === "published"
                      ? "bg-teal-50 text-teal-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {blog.status}
                </span>
                <div className="flex items-center gap-1">
                  {blog.status === "published" && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-teal-600"
                      title="View post"
                    >
                      <Eye size={13} />
                    </Link>
                  )}
                  <Link
                    href={`/secure-admin/blogs/${blog.id}`}
                    className="p-1.5 text-gray-400 hover:text-teal-600"
                    title="Edit post"
                  >
                    <Pencil size={13} />
                  </Link>
                  <form action={deleteBlog.bind(null, blog.id)}>
                    <button
                      className="p-1.5 text-gray-400 hover:text-red-500"
                      title="Delete post"
                    >
                      <Trash2 size={13} />
                    </button>
                  </form>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <div className="text-center py-12 text-sm text-gray-400">
                No posts yet.{" "}
                <Link
                  href="/secure-admin/blogs/new"
                  className="text-teal-600 underline"
                >
                  Create your first post →
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
