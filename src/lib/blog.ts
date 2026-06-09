import slugify from "slugify";
import { createClient } from "./supabase/client";
import type { Blog } from "@/types";

export function generateSlug(title: string): string {
  return slugify(title, { lower: true, strict: true, trim: true });
}

export function calcReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function getAllPublishedBlogs(): Promise<Blog[]> {
  const supabase = createClient();

  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return data ?? null;
}

export async function getRelatedBlogs(currentSlug: string, category: string, limit = 3): Promise<Blog[]> {
  const supabase = createClient();

  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("category", category)
    .eq("status", "published")
    .neq("slug", currentSlug)
    .limit(limit);

  return data ?? [];
}

export async function getAllBlogsForAdmin(): Promise<Blog[]> {
  const supabase = createClient();

  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export const CATEGORIES = [
  "Manual Testing",
  "Test Cases",
  "Bug Reports",
  "API Testing",
  "Automation Testing",
  "Playwright",
  "Selenium",
  "QA Career",
  "ISTQB",
  "AI in Testing",
  "Mobile Testing",
  "Web Testing",
  "Real Project Scenarios",
  "Performance Testing",
  "Security Testing",
] as const;

export type Category = (typeof CATEGORIES)[number];