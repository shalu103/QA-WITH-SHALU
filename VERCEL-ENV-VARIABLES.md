# 🔐 Vercel Environment Variables Setup

## Required Environment Variables for Deployment

Add these to Vercel **Settings → Environment Variables**:

### Step-by-Step Instructions

1. **Click "Add More"** for each variable below
2. **Enter Key and Value** as shown
3. Make sure **Production and Preview** are checked
4. **Save** each one

---

## Variables to Add

### 1️⃣ NEXT_PUBLIC_SUPABASE_URL
**Key:** `NEXT_PUBLIC_SUPABASE_URL`
**Value:** `https://your-project.supabase.co`
- Get from: Supabase Dashboard → Settings → API → Project URL
- Example: `https://abcdefgh.supabase.co`

### 2️⃣ NEXT_PUBLIC_SUPABASE_ANON_KEY
**Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
**Value:** Your anon public key
- Get from: Supabase Dashboard → Settings → API → Anon Public Key
- Starts with: `eyJhbGc...`

### 3️⃣ SUPABASE_SERVICE_ROLE_KEY
**Key:** `SUPABASE_SERVICE_ROLE_KEY`
**Value:** Your service role secret key
- Get from: Supabase Dashboard → Settings → API → Service Role Secret
- ⚠️ **KEEP THIS SECRET!** It's for server-side only
- Starts with: `eyJhbGc...` (longer than anon key)

### 4️⃣ ADMIN_EMAIL
**Key:** `ADMIN_EMAIL`
**Value:** Your admin email (the only email that can login to `/secure-admin`)
- Example: `your-email@gmail.com`

### 5️⃣ NEXT_PUBLIC_SITE_URL (Optional but Recommended)
**Key:** `NEXT_PUBLIC_SITE_URL`
**Value:** Your production URL
- Example: `https://qawithshalu.vercel.app`
- Or your custom domain: `https://qawithshalu.com`

---

## 📋 Checklist Before Deploy

- [ ] Have Supabase Project created?
- [ ] Have copied Project URL?
- [ ] Have copied Anon Public Key?
- [ ] Have copied Service Role Secret?
- [ ] Have admin email ready?
- [ ] All 5 variables added to Vercel?

---

## ⚠️ Important Notes

1. **NEXT_PUBLIC_** prefix means these are exposed to the browser (safe)
2. **SUPABASE_SERVICE_ROLE_KEY** is NEVER exposed (server-only)
3. Keep Service Role Key SECRET - never commit to GitHub
4. Make sure "Production and Preview" checkboxes are ✅ checked

---

## 🚀 After Adding Variables

1. Click **Deploy** button
2. Vercel will rebuild with new environment variables
3. Your site will be live!

