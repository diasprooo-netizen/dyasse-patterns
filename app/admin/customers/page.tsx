import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-products'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'

export default async function AdminCustomers({searchParams}:{searchParams?:{page?:string}}) {
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p>Administrator access required.</p>
 const db=createServiceClient()
 const rawPage=Number(searchParams?.page||1)
 const page=Number.isSafeInteger(rawPage)&&rawPage>0&&rawPage<=1000?rawPage:1
 const perPage=100
 const [usersResult,profilesResult,adminsResult,ppResult,cartResult,grResult]=await Promise.all([
  db.auth.admin.listUsers({page,perPage}),
  db.from('customer_profiles').select('user_id,full_name'),
  db.from('admin_users').select('user_id'),
  db.from('paypal_orders').select('customer_email,status').eq('status','completed'),
  db.from('paypal_cart_orders').select('customer_email,status').eq('status','completed'),
  db.from('gumroad_sales').select('buyer_email,status').eq('status','paid')
 ])
 const users=usersResult.data?.users??[]
 const total=usersResult.data && 'total' in usersResult.data && typeof usersResult.data.total==='number' ? usersResult.data.total : users.length
 const profiles=new Map((profilesResult.data??[]).map(p=>[p.user_id,p.full_name]))
 const adminIds=new Set((adminsResult.data??[]).map(a=>a.user_id))
 const counts=new Map<string,{paypal:number;gumroad:number}>()
 function count(email:string|null|undefined,kind:'paypal'|'gumroad'){
  if(!email)return
  const key=email.toLowerCase().trim()
  const old=counts.get(key)??{paypal:0,gumroad:0}
  old[kind]+=1
  counts.set(key,old)
 }
 for(const o of ppResult.data??[])count(o.customer_email,'paypal')
 for(const o of cartResult.data??[])count(o.customer_email,'paypal')
 for(const o of grResult.data??[])count(o.buyer_email,'gumroad')
 const verified=users.filter(u=>Boolean(u.email_confirmed_at)).length
 const fmt=(v:string|null|undefined)=>v?new Date(v).toLocaleString('en-GB'):'—'
 return <main className="space-y-6">
  <section className="rounded-3xl border border-[#D6E7F2] bg-[#EAF6FC] p-7 sm:p-9">
   <p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">PRIVATE ACCOUNT REGISTRY</p>
   <h2 className="mt-3 font-serif text-4xl">Registered Dyasse accounts</h2>
   <p className="mt-4 max-w-3xl text-sm leading-7 text-[#536B7D]">Every account registered through dyasse.com is read from Supabase Auth, whether or not the person subscribed to emails or placed an order. Gumroad shoppers are not automatically registered here.</p>
   <div className="mt-5 flex flex-wrap gap-3"><Link href="/admin/gumroad-sales" className="rounded-full border bg-white px-5 py-3 text-sm font-bold">Gumroad sales</Link><Link href="/admin/orders" className="rounded-full border bg-white px-5 py-3 text-sm font-bold">PayPal orders</Link><Link href="/admin/subscribers" className="rounded-full border bg-white px-5 py-3 text-sm font-bold">Newsletter subscribers</Link></div>
  </section>
  {usersResult.error?<p role="alert" className="rounded-xl bg-red-50 p-4">Could not load registered users. Confirm the server Supabase secret key and admin permissions.</p>:null}
  <div className="grid gap-4 sm:grid-cols-3">
   <section className="rounded-xl border bg-white p-6"><p className="text-xs text-[#6C8193]">Registered accounts</p><p className="mt-2 text-3xl font-bold">{total}</p></section>
   <section className="rounded-xl border bg-white p-6"><p className="text-xs text-[#6C8193]">Email confirmed on this page</p><p className="mt-2 text-3xl font-bold">{verified}</p></section>
   <section className="rounded-xl border bg-white p-6"><p className="text-xs text-[#6C8193]">Registered accounts shown</p><p className="mt-2 text-3xl font-bold">{users.length}</p></section>
  </div>
  <div className="overflow-x-auto rounded-xl border border-[#DCE9F1] bg-white"><table className="w-full min-w-[820px] text-left text-sm">
   <thead className="bg-[#F0F8FD] text-xs text-[#456275]"><tr><th className="p-4">Account</th><th className="p-4">Email verified</th><th className="p-4">Registered</th><th className="p-4">Last login</th><th className="p-4">Verified paid orders matched by email</th></tr></thead>
   <tbody>{users.map(u=>{
    const email=u.email?.toLowerCase().trim()||''
    const purchases=counts.get(email)
    const name=profiles.get(u.id)||(typeof u.user_metadata?.full_name==='string'?u.user_metadata.full_name:'')
    return <tr key={u.id} className="border-t border-[#E5EEF4]">
      <td className="p-4"><p className="font-semibold">{email||'No email'}</p>{name?<p className="mt-1 text-xs text-[#6B7E90]">{name}</p>:null}{adminIds.has(u.id)?<p className="mt-1 text-xs text-[#8B5173]">Administrator</p>:null}</td>
      <td className="p-4 text-xs">{u.email_confirmed_at?'Yes':'Not confirmed'}</td>
      <td className="whitespace-nowrap p-4 text-xs">{fmt(u.created_at)}</td>
      <td className="whitespace-nowrap p-4 text-xs">{fmt(u.last_sign_in_at)}</td>
      <td className="p-4 text-xs">{purchases?'PayPal: '+purchases.paypal+' · Gumroad: '+purchases.gumroad:'No verified orders matched'}</td>
    </tr>
   })}</tbody>
  </table>
  {!users.length&&!usersResult.error?<p className="p-6 text-sm text-[#6B7E90]">No registered accounts found on this page.</p>:null}</div>
  <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
    <span className="text-[#63788A]">Page {page}. Order matches use email only; they do not grant downloads.</span>
    <div className="flex gap-2">
      {page>1?<Link href={'/admin/customers?page='+(page-1)} className="rounded-lg border bg-white px-4 py-2 font-semibold">Previous</Link>:null}
      {page*perPage<total?<Link href={'/admin/customers?page='+(page+1)} className="rounded-lg border bg-white px-4 py-2 font-semibold">Next</Link>:null}
    </div>
  </div>
  <p className="rounded-lg bg-[#F4F8FB] p-4 text-xs leading-6 text-[#5B7182]">Account registration and email marketing consent are different. Only people who opted into newsletters may be contacted for promotional emails. Do not automatically import Gumroad buyer emails to your subscriber list.</p>
 </main>
}
