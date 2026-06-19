import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { contactDetails } from "@/lib/contact";
import { CheckCircle2, Award, BookOpen, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Shalu Sharma — ISTQB CTFL Certified QA Engineer",
  description: "Learn about Shalu Sharma, an ISTQB CTFL certified QA engineer sharing real-world testing knowledge through QA With Shalu.",
};

const skills = [
  "Manual Testing", "Functional Testing", "Regression Testing",
  "Sanity Testing", "UI Testing", "Mobile Testing",
  "Web Testing", "API Testing", "Database Testing",
  "Cross-Browser Testing", "Bug Reporting", "Test Case Design",
  "Defect Lifecycle Management", "ISTQB CTFL Certified",
];

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-10">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-teal-100 flex items-center justify-center text-3xl font-bold font-serif text-teal-700 flex-shrink-0">
              SS
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
                ISTQB CTFL Certified
              </span>
              <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-gray-900">
                Shalu Sharma
              </h1>
              <p className="mt-1 text-gray-500 text-base">QA Engineer · Technical Writer · Testing Educator</p>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm max-w-xl">
                I am a certified QA engineer with hands-on experience in manual testing, API testing, mobile and web testing, and defect lifecycle management. I built this platform to share what I have learned through real projects — the bugs that slipped through, the test cases that caught critical issues, and the testing strategies that actually work in production.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={contactDetails.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-800 transition-colors"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-sm font-medium px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Send an Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
            {[
              {
                icon: Target,
                title: "Mission",
                text: "Helping QA professionals learn from practical industry scenarios, real bugs, and modern testing trends through accessible, experience-driven content.",
              },
              {
                icon: BookOpen,
                title: "What You Will Find",
                text: "Real bug case studies, ISTQB notes, test case templates, API testing guides, automation roadmaps, and QA career advice.",
              },
              {
                icon: Award,
                title: "Credentials",
                text: "ISTQB Certified Foundation Level (CTFL) with industry experience across manual, functional, regression, and API testing.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-5 border border-gray-100 rounded-2xl bg-white">
                <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon size={18} className="text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-2 text-sm px-4 py-2 bg-teal-50 text-teal-800 rounded-full border border-teal-100"
                >
                  <CheckCircle2 size={13} className="text-teal-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* My story */}
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-5">My Story</h2>
            <div className="prose-qa">
              <p>I started my QA journey testing mobile and web applications, quickly learning that quality assurance is far more than just finding bugs — it is about building confidence in software before it reaches real users.</p>
              <p>Along the way I earned my ISTQB CTFL certification and worked on projects spanning UI testing, API testing, database validation, and cross-browser compatibility. Every project taught me something new, and many of those lessons became the articles you will find on this blog.</p>
              <p>I created QA With Shalu because I noticed a gap: most QA learning resources are either too theoretical or too shallow. Real projects are messy. Bugs behave unexpectedly. Requirements change. I wanted a place where QA engineers could learn from those real, imperfect scenarios — not just textbook examples.</p>
              <p>Whether you are preparing for your ISTQB exam, looking for test case templates, trying to understand API testing, or just wondering what to do when a release goes wrong — you will find practical, honest answers here.</p>
            </div>
          </div>

          {/* Topics */}
          <div className="mt-14 p-8 bg-gray-50 rounded-2xl">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
              Topics I Write About
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Real bug case studies from production",
                "ISTQB concepts explained simply",
                "Test case writing guides",
                "API testing with Postman",
                "Playwright automation for beginners",
                "QA career advice and growth",
                "AI tools in software testing",
                "Mobile and web testing strategies",
                "Defect lifecycle management",
                "Cross-browser testing tips",
                "Performance testing basics",
                "Security testing fundamentals",
              ].map((topic) => (
                <div
                  key={topic}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-teal-500 mt-0.5 flex-shrink-0">✦</span>
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
