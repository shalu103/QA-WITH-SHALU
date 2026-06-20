import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag, ChevronRight, Share2 } from "lucide-react";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogBySlug, getRelatedBlogs, calcReadingTime } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qawithshalu.com";
  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || "",
      url: `${siteUrl}/blog/${blog.slug}`,
      type: "article",
      ...(blog.featured_image && { images: [{ url: blog.featured_image }] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const related = await getRelatedBlogs(blog.slug, blog.category);
  const readingTime = blog.reading_time ?? calcReadingTime(blog.content);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qawithshalu.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    author: {
      "@type": "Person",
      name: "Shalu Sharma",
      jobTitle: "ISTQB CTFL Certified QA Engineer",
    },
    publisher: { "@type": "Organization", name: "QA With Shalu" },
    url: `${siteUrl}/blog/${blog.slug}`,
    ...(blog.featured_image && { image: blog.featured_image }),
    keywords: blog.tags.join(", "),
  };

  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-teal-600">Blog</Link>
            <ChevronRight size={12} />
            <Link
              href={`/blog?category=${encodeURIComponent(blog.category)}`}
              className="hover:text-teal-600"
            >
              {blog.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-500 truncate max-w-xs">{blog.title}</span>
          </nav>
        </div>

        {/* Article header */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href={`/blog?category=${encodeURIComponent(blog.category)}`}
            className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full mb-4 hover:bg-teal-100"
          >
            {blog.category}
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-gray-900">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">{blog.excerpt}</p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-xs font-semibold text-teal-700">
                SS
              </div>
              <span className="text-gray-600 font-medium">Shalu Sharma</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {readingTime} min read
            </span>
          </div>
        </header>

        {/* Featured image */}
        {blog.featured_image && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-teal-50">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                // className="object-cover"
                priority
              
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <div
            className="prose-qa"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-gray-400" />
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-teal-50 hover:text-teal-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <Share2 size={14} /> Share this article:
            </span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${siteUrl}/blog/${blog.slug}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors"
            >
              Twitter / X
            </a>
          </div>

          {/* Author box */}
          <div className="mt-10 p-6 bg-teal-50 rounded-2xl border border-teal-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center text-sm font-bold text-teal-800 flex-shrink-0">
                SS
              </div>
              <div>
                <p className="font-semibold text-gray-900">Shalu Sharma</p>
                <p className="text-xs text-teal-700 font-medium mb-2">ISTQB CTFL Certified QA Engineer</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Helping QA professionals learn from practical industry scenarios, real bugs, testing strategies, and modern QA trends through accessible, experience-driven content.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-xl font-semibold text-gray-900 mb-6">
                More in {blog.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <BlogCard key={r.id} blog={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
