import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Bug, Zap, Award } from "lucide-react";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPublishedBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "QA With Shalu — Real QA Lessons from Real Testing Scenarios",
  description:
    "Helping QA engineers learn through real bugs, practical testing techniques, ISTQB concepts, AI-powered testing insights, and automation journeys.",
};

const CATEGORIES = [
  { name: "Manual Testing", color: "bg-teal-50 text-teal-800" },
  { name: "API Testing", color: "bg-blue-50 text-blue-800" },
  { name: "Automation Testing", color: "bg-amber-50 text-amber-800" },
  { name: "Bug Reports", color: "bg-red-50 text-red-800" },
  { name: "ISTQB", color: "bg-purple-50 text-purple-800" },
  { name: "Playwright", color: "bg-teal-50 text-teal-800" },
  { name: "QA Career", color: "bg-blue-50 text-blue-800" },
  { name: "AI in Testing", color: "bg-amber-50 text-amber-800" },
  { name: "Performance Testing", color: "bg-red-50 text-red-800" },
  { name: "Security Testing", color: "bg-purple-50 text-purple-800" },
];

export default async function HomePage() {
  const blogs = await getAllPublishedBlogs();
  const featured = blogs[0];
  const latest = blogs.slice(1, 5);

  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full mb-5">
              ✦ ISTQB CTFL Certified QA Engineer
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight text-gray-900 text-balance">
              Real QA Lessons from{" "}
              <em className="not-italic text-teal-600">Real</em> Testing
              Scenarios
            </h1>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed text-balance">
              Helping QA engineers learn through real bugs, practical testing
              techniques, ISTQB concepts, AI-powered testing insights, and
              automation journeys.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-800 transition-colors"
              >
                Read Blogs <ArrowRight size={16} />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Start Learning QA
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: BookOpen, label: "Articles Published", value: blogs.length.toString() },
              { icon: Award, label: "ISTQB Certified", value: "CTFL" },
              { icon: Bug, label: "Bug Case Studies", value: "Real" },
              { icon: Zap, label: "Topics Covered", value: "15+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div className="flex justify-center mb-2 text-teal-600">
                  <Icon size={20} />
                </div>
                <div className="font-serif text-xl font-semibold">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Browse by topic
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/categories?c=${encodeURIComponent(cat.name)}`}
                className={`text-xs font-medium px-3.5 py-2 rounded-full ${cat.color} hover:opacity-80 transition-opacity`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured + Latest */}
        {featured && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Featured article
            </p>
            <BlogCard blog={featured} featured />
          </section>
        )}

        {latest.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Latest posts
              </p>
              <Link
                href="/blog"
                className="text-xs text-teal-600 font-medium hover:underline flex items-center gap-1"
              >
                All articles <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latest.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="bg-teal-600 py-14 px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              Get QA insights in your inbox
            </h2>
            <p className="mt-3 text-teal-100 text-sm leading-relaxed">
              New articles on testing, bugs, automation, and QA career growth —
              delivered weekly.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg text-sm border border-teal-400 bg-teal-700 text-white placeholder:text-teal-300 focus:outline-none focus:border-white"
              />
              <button className="px-5 py-2.5 bg-white text-teal-700 font-semibold text-sm rounded-lg hover:bg-teal-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
