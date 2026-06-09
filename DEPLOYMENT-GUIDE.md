# 🚀 Deployment Guide for QA With Shalu
### Written for someone with no developer background

---

## What you will end up with
- A live website at a URL like `https://qa-with-shalu.vercel.app`
- A private admin panel only you can log in to
- The ability to write and publish blog posts from your browser

**Total time: about 45–60 minutes**
**Cost: completely free**

---

## STEP 1 — Create a GitHub account (5 min)

GitHub is where your website code is stored.

1. Open your browser and go to **https://github.com**
2. Click **Sign up**
3. Enter your email, create a password, and choose a username (e.g. `shalu-qa`)
4. Verify your email
5. You are done with GitHub for now

---

## STEP 2 — Create a Supabase account (5 min)

Supabase is your free database — it stores all your blog posts.

1. Go to **https://supabase.com**
2. Click **Start your project** (top right)
3. Sign in with your GitHub account (the one you just created)
4. Click **New project**
5. Fill in:
   - **Name:** `qa-with-shalu`
   - **Database Password:** create a strong password — **write it down somewhere safe**
   - **Region:** choose the closest to India (e.g. Singapore)
6. Click **Create new project**
7. Wait about 2 minutes for it to set up

---

## STEP 3 — Set up your database (10 min)

This creates all the tables your blog needs.

1. In your Supabase dashboard, look at the left sidebar
2. Click **SQL Editor** (the icon looks like a `>`  symbol)
3. Click **New query** (top right)
4. Open the file `supabase/migrations/001_initial_schema.sql` from this project — copy all the text inside it
5. Paste it into the SQL Editor box
6. Click the green **Run** button
7. You should see "Success. No rows returned" — that means it worked ✅

---

## STEP 4 — Create your admin login (5 min)

1. In the Supabase left sidebar, click **Authentication**
2. Click **Users**
3. Click **Add user** → **Create new user**
4. Enter:
   - **Email:** your email address (you will use this to log in)
   - **Password:** create a strong password — **write it down**
5. Click **Create user**
6. You will see your new user appear — **click on it** to open it
7. Copy the long **User UID** (looks like: `a1b2c3d4-...`) — you need it next

Now add yourself as admin:

1. Go back to **SQL Editor**
2. Click **New query**
3. Paste this (replace the two placeholder values with your real ones):

```sql
INSERT INTO profiles (id, email, role)
VALUES ('PASTE_YOUR_USER_UID_HERE', 'PASTE_YOUR_EMAIL_HERE', 'admin');
```

Example:
```sql
INSERT INTO profiles (id, email, role)
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'shalu@gmail.com', 'admin');
```

4. Click **Run** ✅

---

## STEP 5 — Create image storage (3 min)

This lets you upload featured images to your blog posts.

1. In the Supabase left sidebar, click **Storage**
2. Click **New bucket**
3. Enter:
   - **Name:** `blog-images`
   - Toggle **Public bucket: ON** (important!)
4. Click **Create bucket** ✅

---

## STEP 6 — Get your Supabase keys (3 min)

1. In Supabase, click **Settings** (gear icon, bottom of left sidebar)
2. Click **API**
3. You will see two things you need — copy them:
   - **Project URL** (looks like `https://abcdefg.supabase.co`)
   - **anon public** key (a very long text string)
4. Keep this browser tab open — you will need these in Step 8

---

## STEP 7 — Upload code to GitHub (5 min)

Now upload the project code to your GitHub account.

### Option A — Using GitHub's website (easiest, no coding)

1. Go to **https://github.com** and log in
2. Click the **+** icon (top right) → **New repository**
3. Name it `qa-with-shalu`
4. Keep it **Private** (recommended)
5. Click **Create repository**
6. On the next page, click **uploading an existing file**
7. Drag and drop ALL the files and folders from the downloaded `qa-with-shalu` folder
8. Scroll down, click **Commit changes**

### Option B — If you have VS Code installed

1. Open the `qa-with-shalu` folder in VS Code
2. Open the terminal (View → Terminal)
3. Run these commands one by one:

```
git init
git add .
git commit -m "My QA blog"
git remote add origin https://github.com/YOUR_USERNAME/qa-with-shalu.git
git push -u origin main
```

---

## STEP 8 — Deploy on Vercel (10 min)

Vercel hosts your website for free.

1. Go to **https://vercel.com**
2. Click **Sign Up** → **Continue with GitHub**
3. Authorize Vercel to access your GitHub
4. Click **Add New Project**
5. Find `qa-with-shalu` in the list → click **Import**
6. Vercel auto-detects Next.js — leave all settings as default
7. **IMPORTANT:** Before clicking Deploy, click **Environment Variables**

Add these one by one (click **Add** after each):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Paste your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Paste your Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://qa-with-shalu.vercel.app` (put your actual Vercel URL after deploy) |

8. Click **Deploy**
9. Wait 2–3 minutes ⏳
10. You will see a confetti animation — your site is live! 🎉

---

## STEP 9 — Visit your live website

1. Click the URL Vercel shows you (e.g. `https://qa-with-shalu.vercel.app`)
2. Your homepage is live!
3. Go to `https://qa-with-shalu.vercel.app/secure-admin/login`
4. Log in with the email and password you created in Step 4
5. You are now in your private admin dashboard ✅

---

## STEP 10 — Write your first blog post

1. In the admin dashboard, click **New Post**
2. Fill in:
   - **Title** — the slug auto-generates
   - **Excerpt** — 1–2 sentence summary
   - **Content** — write in the text box (HTML is supported)
   - **Category** — pick from dropdown
   - **Tags** — comma separated
   - **Meta Description** — for SEO (keep under 160 characters)
3. Click **Publish Now**
4. Visit your blog to see it live!

---

## Troubleshooting

**"Invalid credentials" when logging in to admin**
→ Check that you ran the INSERT INTO profiles SQL in Step 4 correctly

**Blog posts not showing**
→ Make sure you clicked "Publish Now" not just saved as draft

**Images not uploading**
→ Make sure the `blog-images` bucket is set to Public in Supabase Storage

**Website shows error after deploy**
→ In Vercel dashboard → your project → Settings → Environment Variables — double-check all three variables are correct with no extra spaces

---

## Your website URLs

| URL | What it is |
|-----|-----------|
| `your-site.vercel.app` | Public homepage |
| `your-site.vercel.app/blog` | All blog posts |
| `your-site.vercel.app/categories` | Browse by category |
| `your-site.vercel.app/resources` | QA resources hub |
| `your-site.vercel.app/about` | Your about page |
| `your-site.vercel.app/contact` | Contact form |
| `your-site.vercel.app/secure-admin/login` | Your private admin login |
| `your-site.vercel.app/secure-admin/dashboard` | Admin dashboard |

---

## Optional: Get a custom domain (e.g. qawithshalu.com)

1. Buy a domain from **https://namecheap.com** (~₹800–1200/year)
2. In Vercel → your project → **Settings → Domains**
3. Add your domain
4. Vercel shows you DNS records to add
5. In Namecheap → manage your domain → Advanced DNS → add the records
6. Wait up to 24 hours for it to work

---

*Built with Next.js 15 · Supabase · Tailwind CSS · Deployed on Vercel*
