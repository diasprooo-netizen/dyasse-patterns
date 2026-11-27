import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Only public, RLS-verified product records may use this cookie-free client.
// Never reuse for auth, orders, profiles, admin pages, or paid file downloads.
const catalogFetch: typeof fetch = (input, init) => fetch(input, {
  ...init,
  next: { revalidate: 3600 },
} as RequestInit & { next: { revalidate: number } })

export function createCatalogClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) throw new Error('Public catalog is not configured')
  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: catalogFetch },
  })
}
