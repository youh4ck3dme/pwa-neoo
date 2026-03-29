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

-- Policy: Only service role can insert
create policy "Service role can insert projects" on projects
  for insert with check (true);

-- Policy: Only service role can update
create policy "Service role can update projects" on projects
  for update using (true);

-- Policy: Only service role can delete
create policy "Service role can delete projects" on projects
  for delete using (true);

-- Create index for faster queries
create index if not exists projects_createdAt_idx on projects(createdAt desc);

-- Insert default sample project
insert into projects (title, imageUrl, shortDescription, technologies, specialFeatures)
values (
  'SecureVault Enterprise',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Hardened PWA s end-to-end šifrovaním a biometrickou autentifikáciou pre bankový sektor.',
  array['Next.js 15', 'WAF', 'MFA'],
  array['E2EE Encryption', 'Biometrics', 'Audit Logs', 'PWA']
) on conflict (id) do nothing;
