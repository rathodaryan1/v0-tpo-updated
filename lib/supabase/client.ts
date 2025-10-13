// lib/supabase/client.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Server-side client for API routes (no cookies needed)
export function createServerClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase environment variables are not configured.')
  }

  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
