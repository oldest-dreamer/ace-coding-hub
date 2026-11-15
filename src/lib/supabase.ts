import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};

export const SUPABASE_URL = (env.VITE_SUPABASE_URL ?? '').trim();
export const SUPABASE_KEY = (
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  ''
).trim();

export const ADMIN_EMAIL = (env.VITE_ADMIN_EMAIL || 'sciencesaru30@gmail.com')
  .trim()
  .toLowerCase();

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export function isUserAdminAccount(
  email?: string | null,
  profileAdminFlag?: boolean | null,
): boolean {
  if (profileAdminFlag === true) return true;
  if (!email) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL;
}
