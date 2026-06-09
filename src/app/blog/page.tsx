import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPublishedBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all QA articles — test cases, bug reports, automation, ISTQB, API testing, and more from Shalu Sharma.",
};

const CATEGORIES = [
  "All","Manual Testing","Test Cases","Bug Reports","API Testing",
  "Automation Testing","Playwright","Selenium","QA Career","ISTQB",
  "AI in Testing","Mobile Testing","Web Testing","Performance Testing","Security Testing",
];

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category || "All";
  const searchQuery = params.q || "";

  let blogs = await getAllPublishedBlogs();

  if (selectedCategory !== "All") {
    blogs = blogs.filter((b) => b.category === selectedCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    blogs = blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return (
    <>
      <SiteNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold text-gray-900">All Articles</h1>
          <p className="mt-2 text-gray-500 text-sm">
            {blogs.length} article{blogs.length !== 1 ? "s" : ""} on QA testing, automation, bugs, ISTQB, and more.
          </p>
        </div>

        {/* Search */}
        <form method="GET" className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search articles…"
              className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-white"
            />
            {selectedCategory !== "All" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-800 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
              className={`text-xs font-medium px-3.5 py-2 rounded-full transition-colors ${
                selectedCategory === cat
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Results */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No articles found.</p>
            <Link href="/blog" className="mt-3 inline-block text-teal-600 text-sm underline">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
