import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/service'
import { requireAdmin } from '@/lib/admin-products'
import { gumroadConfigured } from '@/lib/gumroad-sales'
import { syncGumroadNow } from './actions'

export const dynamic = 'force-dynamic'
const money = (cents:number, currency:string) => currency==='UNK'
  ? (cents/100).toFixed(2)+' (currency unverified)'
  : new Intl.NumberFormat('en-US',{style:'currency',currency}).format(cents/100)

export default async function GumroadSalesPage({ searchParams }: {
 searchParams?: {sync?:string;count?:string;more?:string}
}) {
  const admin=await requireAdmin()
  if(!admin.isAdmin)return <p>Administrator access required.</p>
  const connected=gumroadConfigured()
  const db=createServiceClient()
  const {data,error}=await db.from('gumroad_sales')
    .select('sale_id,gumroad_order_id,product_name,buyer_email,price_cents,fee_cents,currency,status,sale_at,verified_at')
    .order('sale_at',{ascending:false,nullsFirst:false}).limit(150)
  const rows=data??[]
  const paid=rows.filter(x=>x.status==='paid')
  const usdPaid=paid.filter(x=>x.currency==='USD')
  const gross=usdPaid.reduce((sum,x)=>sum+x.price_cents,0)
  const unverifiedCurrency=paid.filter(x=>x.currency!=='USD').length
  const notice=searchParams?.sync
  return <main className="space-y-6">
   <section className="rounded-3xl border border-[#D7E9F4] bg-[#EAF6FC] p-7 sm:p-9">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-[#781D35]">VERIFIED PAYMENT ACTIVITY</p>
    <h2 className="mt-3 font-serif text-4xl text-[#172231]">Gumroad sales</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4D6579]">Sales appear here after dyasse.com verifies them with the private Gumroad API. Orders are recorded separately from PayPal. A Gumroad buyer does not automatically become a Dyasse account or newsletter subscriber.</p>
    <div className="mt-5 flex flex-wrap items-center gap-3">
     <form action={syncGumroadNow}>
      <button disabled={!connected} type="submit" className="rounded-full bg-[#781D35] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-45">Sync sales from Gumroad now</button>
     </form>
     <Link href="/admin/orders" className="rounded-full border border-[#BFD5E5] bg-white px-5 py-3 text-sm font-bold text-[#314F64]">View PayPal orders</Link>
     <Link href="/admin/customers" className="rounded-full border border-[#BFD5E5] bg-white px-5 py-3 text-sm font-bold text-[#314F64]">Registered accounts</Link>
    </div>
   </section>
   {!connected?<section className="rounded-2xl border border-[#F0D49F] bg-[#FFF9ED] p-6">
      <h3 className="font-semibold text-[#704A1A]">Connection not yet configured — past Gumroad sales are not imported</h3>
      <p className="mt-3 text-sm leading-7 text-[#735B3B]">1. In Gumroad: <strong>Settings → Advanced → Applications</strong>. Generate an API access token with <strong>view_sales</strong> permission.</p>
      <p className="mt-2 text-sm leading-7 text-[#735B3B]">2. In Vercel → dyasse-patterns → Settings → Environment Variables add <code>GUMROAD_ACCESS_TOKEN</code> to <strong>Production</strong>. Redeploy production. Never send the token in chat or expose it as NEXT_PUBLIC_.</p>
      <p className="mt-2 text-sm leading-7 text-[#735B3B]">3. Return here and press <strong>Sync sales from Gumroad now</strong> to import the previous sale too. For new sales, configure Gumroad <strong>Ping</strong> with <code>https://dyasse.com/api/gumroad/ping</code>.</p>
     </section>:<p className="rounded-xl border border-[#BDE3D3] bg-[#F1FAF6] p-4 text-sm font-semibold text-[#326A52]">Gumroad API access token configured. Sales shown below are verified records from the connected merchant account. Sync again to check new sales and refunds.</p>}
   {notice==='ok'?<p role="status" className="rounded-xl border border-[#BDE3D3] bg-[#F1FAF6] p-4 text-sm text-[#326A52]">Gumroad sync finished: {Number(searchParams?.count||0)} verified sale records processed. {searchParams?.more==='1'?'There are additional older pages: repeat sync of the most recent records or extend the importer to backfill older history.':''}</p>:null}
   {notice==='failed'?<p role="alert" className="rounded-xl bg-[#FFF1EC] p-4 text-sm text-[#994A32]">Could not sync Gumroad. Verify your access token and view_sales permission in Vercel and check the server logs. Existing records were kept.</p>:null}
   {notice==='configure'?<p role="status" className="rounded-xl bg-[#FFF5E5] p-4 text-sm">Add GUMROAD_ACCESS_TOKEN first.</p>:null}
   <div className="grid gap-4 sm:grid-cols-3">
    <section className="rounded-xl border bg-white p-5"><p className="text-xs text-[#60778A]">Verified sale records</p><p className="mt-2 text-3xl font-bold">{rows.length}</p><p className="mt-2 text-xs text-[#667A8E]">Latest 150 records</p></section>
    <section className="rounded-xl border bg-white p-5"><p className="text-xs text-[#60778A]">Active paid orders</p><p className="mt-2 text-3xl font-bold">{paid.length}</p><p className="mt-2 text-xs text-[#667A8E]">Refunds, disputes, tests excluded</p></section>
    <section className="rounded-xl border bg-white p-5"><p className="text-xs text-[#60778A]">Gross recorded USD</p><p className="mt-2 text-3xl font-bold">{money(gross,'USD')}</p><p className="mt-2 text-xs text-[#667A8E]">Sales before fees; latest 150 only {unverifiedCurrency? '· '+unverifiedCurrency+' other/unknown currency rows excluded':''}</p></section>
   </div>
   {error?<p role="alert" className="rounded-xl bg-red-50 p-4 text-sm">Could not load Gumroad sale records.</p>:null}
   <section className="overflow-x-auto rounded-xl border border-[#DFEBF3] bg-white">
    <table className="min-w-[800px] w-full text-left text-sm">
     <thead className="bg-[#F0F8FD] text-xs text-[#4A6377]"><tr><th className="p-4">Date</th><th className="p-4">Pattern</th><th className="p-4">Buyer email</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Gumroad sale ID</th></tr></thead>
     <tbody>
      {rows.map(row=><tr key={row.sale_id} className="border-t border-[#E7EEF4]">
       <td className="whitespace-nowrap p-4 text-xs">{new Date(row.sale_at??row.verified_at).toLocaleString('en-GB')}{!row.sale_at?' (imported)':''}</td>
       <td className="max-w-[300px] p-4 font-semibold">{row.product_name}</td>
       <td className="p-4 text-xs">{row.buyer_email??'Not provided'}</td>
       <td className="whitespace-nowrap p-4 font-bold">{money(row.price_cents,row.currency)}</td>
       <td className="p-4"><span className={'rounded-full px-2.5 py-1 text-xs font-bold '+(row.status==='paid'?'bg-[#E8F7EE] text-[#27744C]':'bg-[#FCEFED] text-[#94503A]')}>{row.status}</span></td>
       <td className="break-all p-4 font-mono text-xs">{row.sale_id}</td>
      </tr>)}
     </tbody>
    </table>
    {!rows.length&&!error?<p className="p-7 text-sm text-[#617789]">No Gumroad sales imported yet. This does not mean you have no Gumroad sales — connect the Gumroad API and use Sync to import verified transactions.</p>:null}
   </section>
   <p className="text-xs leading-6 text-[#718399]">Privacy: buyer emails and order references are shown only to an authenticated Dyasse administrator. This dashboard does not grant Gumroad download access, issue refunds or add marketing consent.</p>
  </main>
}
