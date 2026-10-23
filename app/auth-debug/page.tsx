import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function AuthDebugPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold">Auth Debug</h1>
      <pre className="mt-6 rounded-xl bg-white/10 p-4">
        {JSON.stringify(
          {
            userEmail: user?.email ?? null,
            userId: user?.id ?? null,
            error: error?.message ?? null,
          },
          null,
          2
        )}
      </pre>
    </main>
  )
}
