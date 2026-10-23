import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'
export const dynamic='force-dynamic'
export default async function Subscribers(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="p-10">Access denied.</p>
 const db=await createClient()
 const {data,error}=await db.from('newsletter_subscribers').select('id,email,consented_at,source,unsubscribed_at').order('consented_at',{ascending:false}).limit(100)
 return <main className="mx-auto max-w-6xl px-6 py-14"><Link href="/admin" className="underline">← Admin</Link>
  <h1 className="mt-5 text-4xl font-bold">Newsletter subscribers</h1>
  <p className="mt-3 text-[#79685b]">Only people who opted in on dyasse.com. Do not import Etsy customer emails without consent. This list is private to admins.</p>
  {error?<p className="mt-6 text-red-700">Could not load subscribers. Check Supabase permissions.</p>:
  <div className="mt-8 overflow-x-auto rounded-3xl border border-[#eadbc8] bg-white"><table className="w-full min-w-[600px] text-left text-sm"><thead><tr className="bg-[#f7e7ce]"><th className="p-4">Email</th><th className="p-4">Opted in at</th><th className="p-4">Source</th><th className="p-4">Status</th></tr></thead><tbody>{(data??[]).map(a=><tr key={a.id} className="border-t border-[#eadbc8]"><td className="p-4">{a.email}</td><td className="p-4">{new Date(a.consented_at).toLocaleDateString()}</td><td className="p-4">{a.source}</td><td className="p-4">{a.unsubscribed_at?'Unsubscribed':'Subscribed'}</td></tr>)}</tbody></table></div>}
  <p className="mt-5 text-sm text-[#79685b]">Email delivery, unsubscribe automation and double opt-in are not yet enabled.</p>
 </main>
}
