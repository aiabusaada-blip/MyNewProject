/**
 * Check whether Supabase is configured in the current environment.
 * Returns true if Supabase URL and anon key are both set.
 */
export function isSupabaseConfigured(): boolean {
  if (typeof window === "undefined") {
    // Server-side: check env vars
    return !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  // Client-side: check env vars (Next.js exposes public env vars on the client)
  return !!(
    window.process?.env?.NEXT_PUBLIC_SUPABASE_URL &&
    window.process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Attempt to create a Supabase client. Returns null if not configured.
 */
export function getOptionalSupabase() {
  if (typeof window === "undefined") return null;
  try {
    const { createClient } = require("@supabase/supabase-js");
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  } catch {
    return null;
  }
}
