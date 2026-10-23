import { redirect } from "next/navigation"
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabaseConfig()) {
    redirect("/account/login?next=/admin")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/account/login?next=/admin")
  }

  return children
}
