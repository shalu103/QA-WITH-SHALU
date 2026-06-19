import Link from "next/link";
import { contactDetails } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
            QA <span className="text-teal-600">with Shalu</span>
          </Link>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
            Helping QA professionals learn from practical industry scenarios,
            real bugs, and modern QA trends.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href={contactDetails.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={contactDetails.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${contactDetails.email}`}
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Content
          </p>
          <ul className="space-y-2">
            {["Blog", "Categories", "Resources", "ISTQB Corner"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            About
          </p>
          <ul className="space-y-2">
            {[
              { label: "About Shalu", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Guest Post", href: "/contact#guest" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} QA With Shalu · Shalu Sharma
        </p>
        <p className="text-xs text-gray-400">
          ISTQB CTFL Certified QA Engineer
        </p>
      </div>
    </footer>
  );
}
