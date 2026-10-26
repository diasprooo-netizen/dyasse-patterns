import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function customerIdentity() {
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user?.id || !user.email) return null
  const db = createServiceClient()
  const [{ data: profile }, { data: admin }] = await Promise.all([
    db.from('customer_profiles').select('full_name,phone').eq('user_id',user.id).maybeSingle(),
    db.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle(),
  ])
  return { id:user.id, email:user.email.toLowerCase(), name:String(profile?.full_name||'').trim(), phone:profile?.phone??null, isAdmin:!!admin }
}
export function allowedNext(next:unknown, fallback='/account/orders') {
  return typeof next==='string' && next.startsWith('/') && !next.startsWith('//') && !next.includes('\\') && !next.includes('\r') && !next.includes('\n') ? next : fallback
}
export function originMatches(request:Request) {
 const origin=request.headers.get('origin')
 if (!origin) return false
 try {return new URL(origin).origin===new URL(request.url).origin}catch{return false}
}
