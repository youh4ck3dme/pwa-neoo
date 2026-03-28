# MA.GI.CA Development & Integration Guide

## 📋 Current Status (28.03.2026)

### ✅ Completed
- [x] ZIP Labs integration with metadata extraction
- [x] AI image generation (Pollinations.ai)
- [x] Admin dashboard with 50+ resources
- [x] Portfolio management with localStorage
- [x] Font upgrade: Outfit + Apple San Francisco
- [x] Responsive mobile-first design
- [x] Service worker for PWA
- [x] Security headers (CSP, HSTS, X-Frame-Options)
- [x] Static asset serving fixed (CSS/JS MIME types)
- [x] CSP updated for Pollinations.ai, Supabase, Vercel

### ⏳ Pending Implementation
- [ ] Supabase integration (free tier)
- [ ] Vercel Deploy Hook setup
- [ ] Admin Sandbox tab (isolated ZIP preview + approval)
- [ ] Admin Deploy tab (workflow visualization)
- [ ] API route: `/api/projects` (GET/POST)
- [ ] API route: `/api/deploy` (Vercel trigger)
- [ ] Portfolio.tsx Supabase fetch
- [ ] Environment variables (Supabase + Vercel)

---

## 🔧 Integration Setup (User Action Required)

### Phase 1: Supabase Free Tier Setup

**Time estimate: 5 minutes**

#### Step 1.1: Create Supabase Project
1. Go to https://supabase.com
2. Sign up or login
3. Click "New project"
4. Fill in:
   - Project name: `pwa-neoo` (or similar)
   - Database password: (save it)
   - Region: Europe (closest to Slovakia)
5. Wait for database creation (~1-2 min)

#### Step 1.2: Get API Keys
1. Go to project Settings → API
2. Copy these values to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_KEY=eyJ...
   ```
   (Also add to Vercel dashboard → Settings → Environment Variables)

#### Step 1.3: Create Database Table
1. In Supabase: SQL Editor → New query
2. Paste and run:

```sql
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  "imageUrl" text,
  "shortDescription" text,
  technologies text[],
  "specialFeatures" text[],
  created_at timestamptz default now()
);

alter table projects enable row level security;

create policy "Public read" on projects
  for select using (true);

create policy "Service insert" on projects
  for insert with check (true);
```

### Phase 2: Vercel Deploy Hook Setup

**Time estimate: 3 minutes**

1. Go to https://vercel.com/dashboard
2. Select project `pwa-neoo`
3. Settings → Git
4. Scroll to "Deploy Hooks"
5. Click "Add"
   - Name: `Admin Deploy`
   - Branch: `main`
6. Copy the generated URL
7. Add to `.env.local`:
   ```
   VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
   ```

---

## 🔌 Files to Create (Assistant Will Do)

Once you provide env vars, I will create:

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase client initialization |
| `app/api/projects/route.ts` | GET: fetch projects, POST: save project |
| `app/api/deploy/route.ts` | POST: trigger Vercel deploy hook |
| `.env.local` | Updated with all env vars |

And update:
- `app/admin/page.tsx` - Add Sandbox + Deploy tabs
- `components/sections/Portfolio.tsx` - Fetch from Supabase
- `next.config.mjs` - ✅ CSP already updated
- `package.json` - Install @supabase/supabase-js

---

## 🐛 UI/UX Breaking Issues - Analysis

### Known Issues & Root Causes

#### Issue 1: Static Assets 404 + MIME Type Errors
**Status**: ✅ **FIXED**
- **Root cause**: Dev server process crashed or stale cache
- **Symptoms**:
  - "Refused to apply style from CSS because its MIME type is 'text/plain'"
  - 404 errors on `_next/static/css/` and `_next/static/chunks/`
- **Fix applied**:
  1. Killed all Node processes: `taskkill /F /IM node.exe`
  2. Cleared build cache: `rm -rf .next`
  3. Rebuilt: `npm run build` (88 seconds, 0 errors)
  4. Restarted dev: `npm run dev`
  5. Verified: CSS returns `Content-Type: text/css`, JS returns `application/javascript`
- **Port note**: Dev server uses port **3003** (not 3000 or 3001) when port 3000 is occupied

#### Issue 2: CSP Blocking External Resources
**Status**: ✅ **FIXED (28.03.2026)**
- **Root cause**: `next.config.mjs` img-src didn't include Pollinations.ai, Supabase
- **Symptoms**:
  - AI-generated images fail to load in production
  - Supabase API calls blocked
  - Vercel deploy hook requests blocked
- **Fix applied**: Updated CSP headers to allow:
  ```
  img-src 'self' blob: data: https://images.unsplash.com
          https://magicasro.cloud https://image.pollinations.ai
          https://*.supabase.co

  connect-src 'self' https://magicasro.cloud
              https://*.supabase.co https://api.vercel.com
  ```

#### Issue 3: Mixed HTTP/HTTPS Content
**Status**: ✅ **FIXED**
- **Root cause**: `layout.tsx` metadataBase hardcoded to `https://magicasro.cloud` while dev runs on `http://localhost`
- **Symptoms**: "Unsafe attempt to load URL https:// from frame with URL http://localhost:3000"
- **Fix applied**: Updated to use `process.env.NEXT_PUBLIC_BASE_URL || "https://magicasro.cloud"`

#### Issue 4: Port Already in Use
**Status**: ✅ **FIXED**
- **Root cause**: Previous node process wasn't cleaned up (EADDRINUSE on port 3000)
- **Fix applied**: `taskkill /F /IM node.exe` then `npm run dev`
- **Result**: Automatically falls back to port 3003

#### Issue 5: Stale Production Build
**Status**: ✅ **FIXED**
- **Root cause**: Running `npm run start` used cached `.next/` from before code changes
- **Symptoms**: ZIP upload didn't work despite code changes being made
- **Fix applied**: Ran `npm run build` to create fresh build

#### Issue 6: npm Vulnerabilities
**Status**: ✅ **FIXED**
- **Root cause**: Outdated dependencies (Next.js < 15.5.14)
- **Symptoms**: 2 vulnerabilities (1 moderate, 1 critical) on `npm audit`
- **Fix applied**: `npm audit fix --force` (updated to Next.js 15.5.14)

#### Issue 7: Stale URLs in Configuration
**Status**: ✅ **FIXED**
- Root cause: External library URLs changed or were outdated
- Examples:
  - `https://particles.js.org` → `https://tsparticles.github.io/tsparticles/`
  - `https://ricostacruz.com/nprogress/` → `https://github.com/rstacruz/nprogress`
  - Trustpilot URL truncated → corrected to full slug

### Prevention Checklist

To prevent UI/UX breakage in future:

1. **Before testing**: Clear cache manually
   ```bash
   rm -rf .next .turbopack
   npm run dev
   ```

2. **When static assets fail**: Check 3 things
   - [ ] CSS/JS MIME types via `curl -I http://localhost:3003/_next/static/...`
   - [ ] Port number (check terminal output, might be 3003 not 3000)
   - [ ] CSP headers allow the resource domain

3. **When API calls fail**: Check CSP `connect-src`
   ```bash
   curl -I http://localhost:3003 | grep "Content-Security-Policy"
   ```

4. **When images don't load**: Check CSP `img-src`
   - Add domain to `next.config.mjs` img-src
   - Restart dev server

5. **When tests fail**: Run full build first
   ```bash
   npm run build
   npm run test
   ```

---

## 🔍 Technical Architecture

### Current Data Flow

```
HOME PAGE
  └─ Portfolio Component (localStorage)
     ├─ Load: Check localStorage "magica-portfolio-projects"
     ├─ Fallback: sampleProject
     └─ Display: ProjectCard[] grid

UPLOAD FLOW
  ├─ DropZone → File selected
  ├─ UploadModal → ZIP processing
  │  ├─ Extract: package.json, README.md
  │  ├─ Generate: AI image via Pollinations.ai
  │  ├─ Validate: Password "23513900"
  │  └─ Animate: Shake on error, pulse on success
  └─ handleProjectAdd → setProjects([...prev, newProject])
     └─ Auto-save to localStorage

ADMIN DASHBOARD
  ├─ Navigation: 5 main tabs (Dashboard, Roadmap, Free Stack, Templates, Widgets)
  ├─ Dashboard: Stats + tips
  ├─ Roadmap: 3-phase freelance growth timeline
  ├─ Free Stack: 40 tools in 5 categories
  ├─ Templates: 32 templates in 4 categories
  └─ Widgets: 50 resources in 5 categories
```

### Future Data Flow (After Supabase Integration)

```
HOME PAGE
  └─ Portfolio Component
     ├─ fetch('/api/projects') → GET Supabase DB
     ├─ If online: Load from DB + sampleProject
     ├─ If offline: Fallback to localStorage
     └─ Display: ProjectCard[] grid (persisted)

UPLOAD FLOW
  ├─ DropZone → File selected
  ├─ UploadModal → ZIP processing (same as before)
  └─ handleProjectAdd
     └─ POST '/api/projects' → Supabase insert
        └─ On success: Project persisted to DB ✅

ADMIN SANDBOX (NEW)
  ├─ Upload ZIP (isolated, doesn't affect home page)
  ├─ Preview: Metadata + AI image
  ├─ "✅ Approve" → POST '/api/projects' → Supabase
  ├─ "❌ Reject" → Delete draft
  └─ "🚀 Deploy" → POST '/api/deploy' → Vercel hook

ADMIN DEPLOY (NEW)
  ├─ Visual workflow: Validate → Build → Deploy → Verify
  ├─ POST '/api/deploy' → Vercel webhook
  ├─ Vercel rebuilds app with new projects from DB
  └─ All projects remain after deploy ✅
```

---

## 📦 Dependencies

### Current
- next: 15.5.14
- react: 18.3.1
- typescript: 5.x
- tailwindcss: 3.4.1
- framer-motion: 11.x
- jszip: (for ZIP processing)

### To Install (After Setup)
```bash
npm install @supabase/supabase-js
```

---

## 🚀 Next Steps

1. **User completes Supabase setup** (Phase 1 above)
2. **User completes Vercel Deploy Hook** (Phase 2 above)
3. **User provides env vars**: Slack/email NEXT_PUBLIC_SUPABASE_URL, etc.
4. **I create 4 new files**: `lib/supabase.ts`, 2 API routes, updated `.env.local`
5. **I update 2 existing files**: `app/admin/page.tsx`, `components/sections/Portfolio.tsx`
6. **Testing**: Upload ZIP → approve in Sandbox → appears in Portfolio
7. **Deploy**: Click "Deploy" button → Vercel rebuilds → projects visible on production

---

## 📊 Feature Completeness Matrix

| Feature | Status | Subtasks |
|---------|--------|----------|
| ZIP Upload | ✅ 100% | Extract metadata, AI image, password validation |
| Portfolio Display | ✅ 100% | Grid layout, responsive, localStorage |
| Admin Dashboard | ✅ 100% | 50 resources, 5 tabs, mobile navigation |
| Font System | ✅ 100% | Outfit + San Francisco, Tailwind integrated |
| PWA/Service Worker | ✅ 100% | Registration, offline support |
| Security Headers | ✅ 100% | CSP, HSTS, X-Frame-Options, Permissions-Policy |
| Supabase Integration | ⏳ 0% | User setup required, then API routes + fetch |
| Admin Sandbox | ⏳ 0% | New tab, isolated preview, approval workflow |
| Admin Deploy | ⏳ 0% | New tab, deploy visualization, Vercel trigger |
| Vercel Deployment | ⏳ 0% | Deploy Hook setup, automation |

---

## 🔗 Useful Links

- Supabase docs: https://supabase.com/docs
- Vercel Deploy Hooks: https://vercel.com/docs/rest-api/deploy-hooks
- Next.js CSP: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
- Framer Motion: https://www.framer.com/motion/
- Tailwind CSS: https://tailwindcss.com/docs

---

**Last updated**: 28.03.2026
**Branch**: master
**Environment**: Development (localhost:3003)
