import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, Tag } from "lucide-react";
import type { Blog } from "@/types";
import { calcReadingTime } from "@/lib/blog";

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  const readingTime = blog.reading_time ?? calcReadingTime(blog.content);

  if (featured) {
    return (
      <Link href={`/blog/${blog.slug}`} className="group block">
        <article className="border border-gray-100 rounded-2xl overflow-hidden hover:border-teal-200 hover:shadow-sm transition-all bg-white">
          {blog.featured_image && (
            <div className="relative h-48 w-full bg-teal-50">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              {blog.category}
            </span>
            <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-gray-900 group-hover:text-teal-700 transition-colors">
              {blog.title}
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
              {blog.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {readingTime} min read
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <article className="border border-gray-100 rounded-xl p-4 hover:border-teal-200 hover:shadow-sm transition-all bg-white">
        <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {blog.category}
        </span>
        <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-gray-900 group-hover:text-teal-700 transition-colors">
          {blog.title}
        </h3>
        <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {blog.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {readingTime} min
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          {blog.tags[0] && (
            <span className="flex items-center gap-1">
              <Tag size={11} />
              {blog.tags[0]}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
