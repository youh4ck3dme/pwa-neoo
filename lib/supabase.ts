import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  if (supabaseServiceKey) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }
} else {
  console.warn('[Supabase] Missing env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY). Running in offline mode.');
}

// Client for public operations (uses anon key) — null if not configured
export const supabase = _supabase;

// Client for server-side operations (uses service key) — null if not configured
export const supabaseAdmin = _supabaseAdmin;

export interface Project {
  id?: string;
  title: string;
  imageUrl: string;
  shortDescription: string;
  technologies: string[];
  specialFeatures: string[];
  createdAt?: string;
  updatedAt?: string;
}
