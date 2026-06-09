# QA With Shalu 🧪

**A professional personal QA blog platform by Shalu Sharma, ISTQB CTFL Certified QA Engineer.**

Built with Next.js 15, Supabase, Tailwind CSS, and TypeScript.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- A [Vercel](https://vercel.com) account (free tier works)
- A [GitHub](https://github.com) account

---

## 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/qa-with-shalu.git
cd qa-with-shalu
npm install
```

---

## 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → New project
2. Name it `qa-with-shalu`, set a strong password
3. Wait for the project to be provisioned (~2 minutes)
4. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Run the Database Migration

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New query**
3. Paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run** — this creates all tables, RLS policies, and seed data

### Create Your Admin User

1. Go to **Authentication → Users → Add user**
2. Enter your email and a strong password
3. Copy the user `id`
4. Go to **SQL Editor** and run:
   ```sql
   INSERT INTO profiles (id, email, role)
   VALUES ('YOUR_USER_ID_HERE', 'your@email.com', 'admin');
   ```

### Create the Storage Bucket

1. Go to **Storage → Create Bucket**
2. Name: `blog-images`
3. Toggle **Public bucket: ON**
4. File size limit: `5242880` (5MB)
5. Allowed MIME types: `image/jpeg,image/png,image/webp,image/gif`

---

## 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=https://qawithshalu.com
```

---

## 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — your site is running!

Admin panel: [http://localhost:3000/secure-admin/login](http://localhost:3000/secure-admin/login)

---

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — QA With Shalu"
git remote add origin https://github.com/YOUR_USERNAME/qa-with-shalu.git
git push -u origin main
```

---

## 6. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables (same as `.env.local`)
5. Click **Deploy**

Your site will be live at `https://qa-with-shalu.vercel.app` in ~90 seconds.

### Custom Domain (optional)
1. Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `qawithshalu.com`)
3. Update DNS at your registrar (Namecheap/GoDaddy etc.)
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables

---

## 7. Writing a Blog Post

1. Go to `https://your-site.com/secure-admin/login`
2. Sign in with your admin credentials
3. Click **New Post**
4. Fill in:
   - Title (slug auto-generates)
   - Content (rich text editor)
   - Category
   - Tags
   - Featured image (upload or URL)
   - Meta title + description
5. Toggle **Published** → click **Publish**

### SEO Checklist Before Publishing
- [ ] Meta title is under 60 characters
- [ ] Meta description is 120–160 characters
- [ ] Include target keyword in title and first paragraph
- [ ] Add relevant tags (3–5)
- [ ] Upload a featured image (1200×630px recommended)
- [ ] Add internal links to related posts
- [ ] Preview with `?preview=true` before publishing

---

## 8. Project Structure

```
qa-with-shalu/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── blog/                 # Blog listing + detail
│   │   ├── categories/           # Category pages
│   │   ├── about/                # About Shalu
│   │   ├── contact/              # Contact page
│   │   ├── resources/            # QA resources hub
│   │   └── secure-admin/         # Admin panel (auth-protected)
│   │       ├── login/
│   │       ├── dashboard/
│   │       └── blogs/
│   ├── components/
│   │   ├── layout/               # Nav, Footer
│   │   ├── blog/                 # BlogCard, BlogDetail
│   │   └── admin/                # Editor, Dashboard widgets
│   ├── lib/
│   │   ├── supabase/             # client.ts + server.ts
│   │   └── blog.ts               # Data fetching helpers
│   └── types/
│       └── index.ts              # TypeScript types
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── public/
├── .env.local.example
└── README.md
```

---

## 9. Analytics Setup (When Ready)

1. **Google Analytics 4**: Add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` and uncomment the GA script in `layout.tsx`
2. **Google Search Console**: Verify site ownership via DNS or meta tag
3. **Microsoft Clarity**: Add `NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxx`

---

## 10. Backup Strategy

Supabase automatically backs up your database daily on paid plans. For the free tier:

1. Go to **SQL Editor** weekly
2. Run: `SELECT * FROM blogs;`
3. Export as CSV
4. Store in Google Drive

For images: Supabase Storage → Download all files monthly.

---

## 11. Scaling Guide

When you reach 100+ articles:
- Enable **ISR** (Incremental Static Regeneration) for blog pages
- Add **full-text search** via Supabase `pg_trgm` extension
- Consider **Redis caching** for category/tag pages
- Add **pagination** to blog listing (already prepared in code)

When you reach 1000+ articles:
- Upgrade Supabase to Pro plan
- Add CDN (Cloudflare) in front of Vercel
- Enable database read replicas

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | React framework, SSR + SSG |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Auth, database, file storage |
| Vercel | Hosting + deployments |

---

## License

Personal project — all blog content © Shalu Sharma. Code is MIT licensed.
