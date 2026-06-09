import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-5xl font-serif font-semibold text-teal-600 mb-4">404</p>
          <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-3">Page not found</h1>
          <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-800 transition-colors">
              Go Home
            </Link>
            <Link href="/blog" className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
              Read Blog
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
