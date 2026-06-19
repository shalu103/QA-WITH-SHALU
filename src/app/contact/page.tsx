import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactDetails } from "@/lib/contact";
import { Mail, Linkedin, Github, MessageSquare, Mic, PenSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shalu Sharma — for collaboration, guest blogging, or speaking opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-14 px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto">
            <h1 className="font-serif text-4xl font-semibold text-gray-900">Get in Touch</h1>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Have a question, a collaboration idea, or want to write a guest post? I would love to hear from you.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">Send a Message</h2>
            <ContactForm />
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Direct links */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-5">Connect Directly</h2>
              <div className="space-y-3">
                <a
                  href={contactDetails.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-teal-200 hover:bg-teal-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Linkedin size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                    <p className="text-xs text-gray-400">Connect professionally</p>
                  </div>
                </a>
                <a
                  href={contactDetails.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-teal-200 hover:bg-teal-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Github size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">GitHub</p>
                    <p className="text-xs text-gray-400">See my projects</p>
                  </div>
                </a>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-teal-200 hover:bg-teal-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                    <Mail size={18} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-xs text-gray-400">{contactDetails.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Opportunities */}
            <div className="space-y-4" id="guest">
              {[
                {
                  icon: PenSquare,
                  title: "Guest Blog Inquiry",
                  color: "bg-amber-50",
                  iconColor: "text-amber-600",
                  desc: "Are you a QA professional with a story to share? I welcome guest posts on real testing experiences, bug case studies, ISTQB preparation, and automation journeys. Original, practical content only.",
                },
                {
                  icon: MessageSquare,
                  title: "Collaboration",
                  color: "bg-teal-50",
                  iconColor: "text-teal-600",
                  desc: "Open to collaborating on QA content, testing resources, tools, and community initiatives that help QA engineers grow.",
                },
                {
                  icon: Mic,
                  title: "Speaking Opportunity",
                  color: "bg-purple-50",
                  iconColor: "text-purple-600",
                  desc: "Available for webinars, podcasts, and community events on topics like ISTQB preparation, API testing, manual testing best practices, and QA career growth.",
                },
              ].map(({ icon: Icon, title, color, iconColor, desc }) => (
                <div key={title} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
                      <Icon size={15} className={iconColor} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
