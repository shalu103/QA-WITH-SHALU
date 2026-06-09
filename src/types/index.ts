export type BlogStatus = "draft" | "published";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured_image: string | null;
  status: BlogStatus;
  meta_title: string | null;
  meta_description: string | null;
  reading_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Profile {
  id: string;
  email: string;
  role: "admin";
}
