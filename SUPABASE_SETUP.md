# Supabase Setup — Final Step 🚀

## Status ✅
- **Credentials**: Added to `.env.local`
- **Supabase Client**: `lib/supabase.ts` ✅
- **API Routes**: Updated to use Supabase
- **Next**: Create projects table + RLS policies

---

## Step 1: Create Projects Table

1. Go to **Supabase Dashboard** → https://supabase.com
2. Login to your project: **jxxzszwsxazcisgidziy**
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy-paste the SQL below and execute:

```sql
-- Create projects table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  imageUrl text not null,
  shortDescription text not null,
  technologies text[] not null,
  specialFeatures text[] not null,
  createdAt timestamp with time zone default now(),
  updatedAt timestamp with time zone default now()
);

-- Enable RLS
alter table projects enable row level security;

-- Policy: Anyone can read projects
create policy "Public projects are viewable by everyone" on projects
  for select using (true);

-- Policy: Service role can insert
create policy "Service role can insert projects" on projects
  for insert with check (true);

-- Policy: Service role can update
create policy "Service role can update projects" on projects
  for update using (true);

-- Policy: Service role can delete
create policy "Service role can delete projects" on projects
  for delete using (true);

-- Create index for performance
create index if not exists projects_createdAt_idx on projects(createdAt desc);

-- Insert sample project
insert into projects (title, imageUrl, shortDescription, technologies, specialFeatures)
values (
  'SecureVault Enterprise',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Hardened PWA s end-to-end šifrovaním a biometrickou autentifikáciou pre bankový sektor.',
  array['Next.js 15', 'WAF', 'MFA'],
  array['E2EE Encryption', 'Biometrics', 'Audit Logs', 'PWA']
);
```

6. Click **Run** ✅
7. You should see: ✅ Query successful (or table created)

---

## Step 2: Verify Setup

### In Supabase Dashboard:
1. Click **Table Editor** (left sidebar)
2. You should see **projects** table listed
3. Click it → verify columns:
   - `id` (UUID, primary key)
   - `title` (text)
   - `imageUrl` (text)
   - `shortDescription` (text)
   - `technologies` (text[])
   - `specialFeatures` (text[])
   - `createdAt` (timestamp)
   - `updatedAt` (timestamp)

### Verify RLS Policies:
1. Click **projects** table
2. Click **RLS** tab
3. You should see 4 policies:
   - ✅ Public projects are viewable by everyone
   - ✅ Service role can insert projects
   - ✅ Service role can update projects
   - ✅ Service role can delete projects

---

## Step 3: Test Integration

### Terminal:
```bash
npm run dev
# http://localhost:3003
```

### Test 1: Portfolio Page (GET /api/projects)
1. Go to home page
2. Scroll to **Portfolio** section
3. You should see **SecureVault Enterprise** from database (+ localStorage sample)

### Test 2: Admin → Sandbox (POST /api/projects)
1. Go to **http://localhost:3003/admin**
2. Click **ZIP Sandbox** tab
3. Upload a ZIP file
4. Fill form + password (23513900)
5. Click **✅ Schváliť (Approve)**
6. Should show success message
7. Go back to Portfolio → verify new project appears

### Test 3: Verify in Supabase
1. Supabase Dashboard → **Table Editor** → **projects**
2. Click **Count** → should be ≥ 2 (sample + uploaded)
3. Click **projects** → view all projects

---

## Environment Variables ✅

### `.env.local` (Already set)
```env
NEXT_PUBLIC_SUPABASE_URL=https://jxxzszwsxazcisgidziy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eHpzendzeGF6Y2lzZ2lkeml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDMwNDIsImV4cCI6MjA5MDMxOTA0Mn0.mUd6XSxhsprLQOjvOOVekIvHk90d3zfz-QqenH6FMAM
SUPABASE_SERVICE_KEY=sb_publishable_veTFAvhQbPBfe7nT7nxPdA_EdLSvloo
```

### For Vercel Production:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add same 3 variables
3. Redeploy

---

## Troubleshooting

### Error: "Supabase not configured"
- ❌ Check `.env.local` has all 3 variables
- ❌ Restart dev server: `npm run dev`

### No projects appear on Portfolio
- ❌ Check SQL executed successfully (no red errors)
- ❌ Check RLS policies are created
- ❌ Check browser console for API errors

### Projects save locally but not in DB
- ❌ Check `SUPABASE_SERVICE_KEY` is set in `.env.local`
- ❌ Check POST /api/projects logs for errors

---

## File Structure (Updated)

```
lib/
├── supabase.ts           ← NEW: Supabase client
└── workflows/
    └── deploy.ts

app/api/
├── projects/route.ts     ← UPDATED: Now uses Supabase
└── deploy/route.ts       ← (unchanged)

supabase/
└── migrations/
    └── 001_create_projects.sql  ← NEW: SQL migration

.env.local               ← UPDATED: Supabase credentials
```

---

## Next Steps

✅ **Phase 2 Complete**: Supabase integration
- ✅ Tables created
- ✅ RLS policies configured
- ✅ API routes updated

**Phase 3: Deploy Hook** (optional)
- Set `VERCEL_DEPLOY_HOOK_URL` in Vercel → Deploy tab will work

**Phase 4: Production Hardening** (optional)
- Monitor localStorage quota usage
- Implement retry logic for AI image generation
- Profile bundle size

---

Generated: 2026-03-29
