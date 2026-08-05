import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (anon key, RLS enforced).
 * All current usage is in Server Components and route handlers, so one
 * module-level client is enough. When auth arrives, switch to @supabase/ssr
 * with per-request clients.
 */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
