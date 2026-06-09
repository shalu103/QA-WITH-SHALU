import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getAllPublishedBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse QA articles by category — manual testing, API testing, ISTQB, automation, bug reports, and more.",
};

const CATEGORY_META: Record<string, { color: string; bg: string; desc: string }> = {
  "Manual Testing":        { color: "text-teal-700",   bg: "bg-teal-50",   desc: "Functional, regression, smoke, sanity, UI testing guides and best practices." },
  "Test Cases":            { color: "text-blue-700",   bg: "bg-blue-50",   desc: "How to write, organize, and maintain effective test cases for any feature." },
  "Bug Reports":           { color: "text-red-700",    bg: "bg-red-50",    desc: "Real bug case studies, templates, and defect lifecycle management." },
  "API Testing":           { color: "text-indigo-700", bg: "bg-indigo-50", desc: "Postman, REST APIs, status codes, authentication, and 20+ testing scenarios." },
  "Automation Testing":    { color: "text-amber-700",  bg: "bg-amber-50",  desc: "Getting started with automation, frameworks, and when to automate." },
  "Playwright":            { color: "text-teal-700",   bg: "bg-teal-50",   desc: "Modern end-to-end testing with Playwright — from setup to CI pipelines." },
  "Selenium":              { color: "text-orange-700", bg: "bg-orange-50", desc: "Selenium WebDriver guides, page object model, and test maintenance." },
  "QA Career":             { color: "text-purple-700", bg: "bg-purple-50", desc: "Career roadmaps, interview prep, ISTQB advice, and professional growth." },
  "ISTQB":                 { color: "text-blue-700",   bg: "bg-blue-50",   desc: "CTFL exam preparation, chapter notes, and concept explanations." },
  "AI in Testing":         { color: "text-pink-700",   bg: "bg-pink-50",   desc: "AI-powered testing tools, prompt engineering for QA, and future of testing." },
  "Mobile Testing":        { color: "text-teal-700",   bg: "bg-teal-50",   desc: "iOS and Android testing strategies, real device vs emulator, gestures." },
  "Web Testing":           { color: "text-blue-700",   bg: "bg-blue-50",   desc: "Cross-browser, responsive design, and web accessibility testing." },
  "Real Project Scenarios":{ color: "text-red-700",    bg: "bg-red-50",    desc: "Stories from real projects — what went wrong, what we learned, how we fixed it." },
  "Performance Testing":   { color: "text-amber-700",  bg: "bg-amber-50",  desc: "Load testing, stress testing, response time benchmarks, and tools." },
  "Security Testing":      { color: "text-gray-700",   bg: "bg-gray-100",  desc: "OWASP basics, SQL injection, XSS, and security test cases every QA should know." },
};

export default async function CategoriesPage() {
  const blogs = await getAllPublishedBlogs();

  const counts = blogs.reduce<Record<string, number>>((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <SiteNav />
      <main>
        <section className="bg-white border-b border-gray-100 py-14 px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto">
            <h1 className="font-serif text-4xl font-semibold text-gray-900">Browse by Category</h1>
            <p className="mt-4 text-gray-500">
              {Object.keys(CATEGORY_META).length} topic areas · {blogs.length} total articles
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(CATEGORY_META).map(([name, meta]) => (
              <Link
                key={name}
                href={`/blog?category=${encodeURIComponent(name)}`}
                className="group block p-5 bg-white border border-gray-100 rounded-2xl hover:border-teal-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className={`font-semibold text-sm ${meta.color}`}>{name}</h2>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                    {counts[name] ?? 0}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{meta.desc}</p>
                <span className="mt-3 inline-block text-xs text-teal-600 group-hover:underline">
                  View articles →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
