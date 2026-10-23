declare module '@supabase/ssr' {
  export function createBrowserClient<Database = unknown>(
    supabaseUrl: string,
    supabaseKey: string,
  ): import('@supabase/supabase-js').SupabaseClient<Database>

  export function createServerClient<Database = unknown>(
    supabaseUrl: string,
    supabaseKey: string,
    options: {
      cookies: {
        get(name: string): string | undefined
        set(name: string, value: string, options: Record<string, unknown>): void
        remove(name: string, options: Record<string, unknown>): void
      }
    },
  ): import('@supabase/supabase-js').SupabaseClient<Database>
}
