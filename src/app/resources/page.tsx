import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  FileText, HelpCircle, BookOpen, CheckSquare, Bug,
  Zap, Code2, Smartphone, Briefcase, Brain,
} from "lucide-react";

export const metadata: Metadata = {
  title: "QA Resources",
  description: "Free QA resources — interview questions, ISTQB notes, test case templates, bug report templates, API testing guides, and automation roadmaps.",
};

const resources = [
  {
    icon: HelpCircle,
    color: "bg-blue-50 text-blue-600",
    title: "QA Interview Questions",
    desc: "100+ commonly asked QA interview questions with detailed answers — covering manual testing, ISTQB concepts, bug lifecycle, and test design techniques.",
    tags: ["Manual Testing", "ISTQB", "Career"],
    href: "/blog?category=QA+Career",
    cta: "Browse Questions",
  },
  {
    icon: BookOpen,
    color: "bg-purple-50 text-purple-600",
    title: "ISTQB Notes",
    desc: "Chapter-by-chapter notes for the ISTQB CTFL exam — testing fundamentals, test design, test management, and tool support, written in plain English.",
    tags: ["ISTQB", "CTFL", "Certification"],
    href: "/blog?category=ISTQB",
    cta: "Read ISTQB Notes",
  },
  {
    icon: CheckSquare,
    color: "bg-teal-50 text-teal-600",
    title: "Testing Checklists",
    desc: "Ready-to-use checklists for login testing, registration flows, checkout pages, API endpoints, and mobile apps — copy and adapt for your project.",
    tags: ["Checklists", "Manual Testing"],
    href: "/blog?q=checklist",
    cta: "Get Checklists",
  },
  {
    icon: Bug,
    color: "bg-red-50 text-red-600",
    title: "Bug Report Templates",
    desc: "Professional bug report templates with all required fields — title, environment, steps to reproduce, expected vs actual result, severity, priority, and attachments.",
    tags: ["Bug Reports", "Templates"],
    href: "/blog?category=Bug+Reports",
    cta: "Get Templates",
  },
  {
    icon: FileText,
    color: "bg-amber-50 text-amber-600",
    title: "Test Case Templates",
    desc: "Excel and written test case templates for functional, regression, smoke, sanity, and API testing — with worked examples for login, search, and checkout flows.",
    tags: ["Test Cases", "Templates"],
    href: "/blog?category=Test+Cases",
    cta: "Get Templates",
  },
  {
    icon: Zap,
    color: "bg-teal-50 text-teal-600",
    title: "API Testing Resources",
    desc: "Everything you need for API testing — Postman collection setup, common status codes, authentication testing, JSON schema validation, and 20 must-test scenarios.",
    tags: ["API Testing", "Postman", "REST"],
    href: "/blog?category=API+Testing",
    cta: "Explore API Testing",
  },
  {
    icon: Code2,
    color: "bg-blue-50 text-blue-600",
    title: "Playwright Learning Roadmap",
    desc: "A structured roadmap to go from zero to writing real Playwright tests — setup, locators, assertions, page objects, CI integration, and debugging failed tests.",
    tags: ["Playwright", "Automation"],
    href: "/blog?category=Playwright",
    cta: "Start the Roadmap",
  },
  {
    icon: Code2,
    color: "bg-amber-50 text-amber-600",
    title: "Automation Learning Path",
    desc: "Not sure where to start with test automation? This path covers what to learn first, which tools matter, and how to move from manual to automation testing in your career.",
    tags: ["Automation", "Career", "Selenium"],
    href: "/blog?category=Automation+Testing",
    cta: "Start Learning",
  },
  {
    icon: Briefcase,
    color: "bg-purple-50 text-purple-600",
    title: "QA Career Roadmap",
    desc: "From junior QA to senior — skills to build, certifications to get, tools to learn, and how to position yourself for growth in a competitive QA job market.",
    tags: ["Career", "Growth", "ISTQB"],
    href: "/blog?category=QA+Career",
    cta: "Plan Your Career",
  },
  {
    icon: Brain,
    color: "bg-red-50 text-red-600",
    title: "AI Testing Resources",
    desc: "How AI is changing QA — tools to know, what manual skills still matter, how to use AI for test generation, and how to future-proof your testing career.",
    tags: ["AI", "Future of QA"],
    href: "/blog?category=AI+in+Testing",
    cta: "Explore AI Testing",
  },
  {
    icon: Smartphone,
    color: "bg-teal-50 text-teal-600",
    title: "Mobile Testing Guide",
    desc: "Real device vs emulator, gestures, network conditions, interrupt testing, battery and performance — everything QAs need to test mobile apps properly.",
    tags: ["Mobile Testing"],
    href: "/blog?category=Mobile+Testing",
    cta: "Read the Guide",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="bg-white border-b border-gray-100 py-14 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-serif text-4xl font-semibold text-gray-900">QA Resources</h1>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Free, practical resources to help you test better — templates, roadmaps, checklists, interview prep, and more.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r) => (
              <div
                key={r.title}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-teal-200 hover:shadow-sm transition-all flex flex-col"
              >
                <div className={`w-10 h-10 ${r.color} rounded-xl flex items-center justify-center mb-4`}>
                  <r.icon size={18} />
                </div>
                <h2 className="font-semibold text-gray-900 mb-2">{r.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{r.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={r.href}
                  className="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
                >
                  {r.cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-teal-600 py-14 px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-white">
              New resources every week
            </h2>
            <p className="mt-3 text-teal-100 text-sm">
              Subscribe to get new templates, guides, and articles delivered to your inbox.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-teal-700 text-white border border-teal-400 placeholder:text-teal-300 focus:outline-none focus:border-white"
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
