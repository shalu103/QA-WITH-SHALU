-- ============================================================
-- QA WITH SHALU — Supabase Database Migration
-- Run this in the Supabase SQL Editor for your project
-- ============================================================

-- 1. PROFILES TABLE (admin user metadata)
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email      TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BLOGS TABLE
CREATE TABLE IF NOT EXISTS blogs (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  excerpt          TEXT,
  content          TEXT NOT NULL DEFAULT '',
  category         TEXT NOT NULL,
  tags             TEXT[] DEFAULT '{}',
  featured_image   TEXT,
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title       TEXT,
  meta_description TEXT,
  reading_time     INTEGER,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published blogs
CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Only authenticated admins can read ALL blogs (inc. drafts)
CREATE POLICY "Admin can read all blogs"
  ON blogs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admin can insert blogs
CREATE POLICY "Admin can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admin can update blogs
CREATE POLICY "Admin can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admin can delete blogs
CREATE POLICY "Admin can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Categories — public read
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Categories — admin write
CREATE POLICY "Admin can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Profiles — admin can see own profile
CREATE POLICY "User can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- ============================================================
-- STORAGE BUCKET for featured images
-- ============================================================
-- Run in Supabase dashboard: Storage > New Bucket
-- Name: blog-images
-- Public: YES (so images load without auth)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- Storage RLS (set in dashboard > Storage > Policies)
-- Policy name: "Admin can upload images"
-- Allowed operation: INSERT
-- Target roles: authenticated
-- Policy expression:
--   (bucket_id = 'blog-images' AND auth.role() = 'authenticated')

-- ============================================================
-- SEED — initial categories
-- ============================================================
INSERT INTO categories (name, slug) VALUES
  ('Manual Testing', 'manual-testing'),
  ('Test Cases', 'test-cases'),
  ('Bug Reports', 'bug-reports'),
  ('API Testing', 'api-testing'),
  ('Automation Testing', 'automation-testing'),
  ('Playwright', 'playwright'),
  ('Selenium', 'selenium'),
  ('QA Career', 'qa-career'),
  ('ISTQB', 'istqb'),
  ('AI in Testing', 'ai-in-testing'),
  ('Mobile Testing', 'mobile-testing'),
  ('Web Testing', 'web-testing'),
  ('Real Project Scenarios', 'real-project-scenarios'),
  ('Performance Testing', 'performance-testing'),
  ('Security Testing', 'security-testing')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED — 5 sample blog posts
-- ============================================================
INSERT INTO blogs (title, slug, excerpt, content, category, tags, status, meta_title, meta_description, reading_time)
VALUES
(
  'How to Write Effective Test Cases for a Login Page',
  'how-to-write-effective-test-cases-for-login-page',
  'A real-world walkthrough covering positive paths, negative scenarios, boundary value analysis, and edge cases that most junior QAs miss.',
  '<h2>Introduction</h2><p>Writing test cases for a login page seems straightforward — but experienced QAs know it is one of the most deceptively complex features to test thoroughly...</p><h2>Positive Test Cases</h2><ul><li>Valid username and password → successful login</li><li>Login with email (case-insensitive)</li></ul><h2>Negative Test Cases</h2><ul><li>Wrong password → error message shown</li><li>Empty fields → validation triggered</li><li>SQL injection attempt → rejected safely</li></ul>',
  'Manual Testing',
  ARRAY['test cases', 'login', 'manual testing', 'QA basics'],
  'published',
  'How to Write Effective Test Cases for a Login Page | QA With Shalu',
  'Learn how to write comprehensive test cases for login pages — covering positive, negative, boundary, and security scenarios.',
  8
),
(
  'Smoke vs Sanity vs Regression Testing — When to Use Which',
  'smoke-vs-sanity-vs-regression-testing',
  'Confused about when to run which type of testing? This guide breaks it down with real project examples and decision frameworks.',
  '<h2>The Confusion</h2><p>Many QA engineers use these three terms interchangeably — that is a mistake that can cost you a release...</p><h2>Smoke Testing</h2><p>A shallow, wide check of the most critical paths. Run after every build.</p><h2>Sanity Testing</h2><p>A focused check after a bug fix or small change. Narrower than regression.</p><h2>Regression Testing</h2><p>Full re-verification that existing features still work after any change.</p>',
  'ISTQB',
  ARRAY['smoke testing', 'sanity testing', 'regression', 'ISTQB'],
  'published',
  'Smoke vs Sanity vs Regression Testing | QA With Shalu',
  'Clear explanation of smoke, sanity, and regression testing with real examples of when to use each.',
  7
),
(
  'Real Bug Story: Mandatory Mobile Number Field Broke Registration',
  'real-bug-story-mandatory-mobile-number-broke-registration',
  'A production bug that slipped through QA — here is exactly how it happened, what we missed, and how to prevent it.',
  '<h2>The Bug</h2><p>During a release, the mobile number field was silently made mandatory on the server side — but the UI had no asterisk or validation message...</p><h2>What We Missed</h2><ul><li>No test case for server-side vs UI-side validation mismatch</li><li>No cross-platform validation test</li></ul><h2>The Fix</h2><p>Server validation was relaxed, and the UI was updated to reflect mandatory fields clearly.</p><h2>Lesson</h2><p>Always test validation rules from both frontend and API perspectives independently.</p>',
  'Bug Reports',
  ARRAY['bug story', 'registration', 'validation', 'real bugs'],
  'published',
  'Real Bug: Mandatory Mobile Number Field Broke Registration | QA With Shalu',
  'A real-world bug case study about silent server-side validation changes that broke registration for all users.',
  6
),
(
  'Top 20 API Testing Scenarios Every QA Should Know',
  'top-20-api-testing-scenarios-every-qa-should-know',
  'A practical guide to 20 real-world API testing scenarios — from auth flows to error handling and data integrity.',
  '<h2>Why API Testing Matters</h2><p>UI testing only covers the surface. API testing goes deeper — validating business logic, security, and data integrity at the service layer...</p><h2>Top Scenarios</h2><ol><li>Valid login returns 200 and JWT token</li><li>Invalid password returns 401</li><li>Missing required field returns 400 with clear error</li><li>Duplicate email registration returns 409</li><li>Pagination works correctly</li></ol>',
  'API Testing',
  ARRAY['API testing', 'Postman', 'REST', 'scenarios'],
  'published',
  'Top 20 API Testing Scenarios | QA With Shalu',
  'Master 20 essential API testing scenarios covering authentication, validation, error handling, and data integrity.',
  10
),
(
  'Manual Testing in the AI Era: What Still Matters?',
  'manual-testing-in-the-ai-era',
  'AI tools are changing QA — but exploratory testing, UX judgment, and domain expertise remain irreplaceable.',
  '<h2>The Fear</h2><p>Will AI replace manual testers? The short answer: not entirely — and not soon...</p><h2>What AI Does Well</h2><ul><li>Generating test cases from requirements</li><li>Running regression suites automatically</li><li>Visual diff testing</li></ul><h2>What Humans Still Own</h2><ul><li>Exploratory testing and curiosity-driven discovery</li><li>UX judgment and empathy</li><li>Domain expertise and risk intuition</li></ul>',
  'AI in Testing',
  ARRAY['AI testing', 'manual testing', 'future of QA'],
  'published',
  'Manual Testing in the AI Era | QA With Shalu',
  'Explore what manual testing skills remain essential in 2025 as AI tools transform the QA landscape.',
  9
);
