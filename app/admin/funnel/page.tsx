import Link from 'next/link'
import { ArrowUpRight, BarChart3, MousePointerClick, ShoppingBag, Eye } from 'lucide-react'
import { requireAdmin } from '@/lib/admin-products'
import { createServiceClient } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Rose Bag sales funnel | Dyasse manager', robots: { index: false, follow: false } }

const ROSE_BAG_ID = 'df4fb26c-d274-4b1a-b5e2-b94a62c2a4d3'
const sources = ['facebook','instagram','tiktok','pinterest','direct','other'] as const
const price = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)

export default async function RoseBagFunnelDashboard() {
  const account = await requireAdmin()
  if (!account.isAdmin) return <p className="p-6 text-red-700">Access denied.</p>
  const db = createServiceClient()
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()

  const [channels, paypal, gumroad] = await Promise.all([
    Promise.all(sources.map(async source => {
      const [visits, clicks] = await Promise.all([
        db.from('marketing_funnel_events').select('id', { count: 'exact', head: true })
          .eq('product_id', ROSE_BAG_ID).eq('event_type', 'landing_view').eq('source', source).gte('happened_at', since),
        db.from('checkout_clicks').select('id', { count: 'exact', head: true })
          .eq('product_id', ROSE_BAG_ID).eq('source', source).gte('clicked_at', since),
      ])
      return { source, views: visits.count ?? 0, clicks: clicks.count ?? 0, error: Boolean(visits.error || clicks.error) }
    })),
    db.from('paypal_orders').select('amount_cents,completed_at')
      .eq('product_id', ROSE_BAG_ID).eq('status', 'completed').gte('completed_at', since).limit(500),
    db.from('gumroad_sales').select('status,price_cents,currency,sale_at,verified_at')
      .ilike('product_permalink', '%qyonoe%').order('verified_at', { ascending: false }).limit(500),
  ])

  const views = channels.reduce((sum,c) => sum + c.views, 0)
  const clicks = channels.reduce((sum,c) => sum + c.clicks, 0)
  const paidPayPal = paypal.data ?? []
  const paidGumroad = (gumroad.data ?? []).filter(s => s.status === 'paid' && s.currency === 'USD' &&
    new Date(s.sale_at ?? s.verified_at).getTime() >= Date.parse(since))
  const sales = paidPayPal.length + paidGumroad.length
  const grossCents = paidPayPal.reduce((sum,x) => sum + x.amount_cents, 0) +
    paidGumroad.reduce((sum,x) => sum + x.price_cents, 0)
  const incomplete = channels.some(x=>x.error) || Boolean(paypal.error || gumroad.error)

  return <main className="space-y-7">
    <section className="rounded-3xl border border-[#D8E7F1] bg-[#EAF6FC] p-7 sm:p-9">
      <div className="flex items-start gap-3"><BarChart3 className="mt-1 text-[#781D35]"/><div>
        <p className="text-xs font-bold uppercase tracking-[.15em] text-[#781D35]">ONE PRODUCT · ONE CLEAR FUNNEL</p>
        <h2 className="mt-3 font-serif text-4xl text-[#172231]">Rose Bag sales funnel</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4E687C]">Last 14 days. Counts come from Dyasse's first-party landing page, Gumroad checkout redirects and verified imported payment records. Page views and checkout clicks are actions, not unique customers.</p>
      </div></div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/rose-bag" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#781D35] px-5 text-sm font-bold text-white">Open funnel landing page <ArrowUpRight size={15}/></Link>
        <Link href="/admin/gumroad-sales" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C6DCE9] bg-white px-5 text-sm font-bold">Sync Gumroad purchases</Link>
      </div>
    </section>
    {incomplete?<p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Some figures could not be loaded. Check the database, table permissions or payment imports before using these totals.</p>:null}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[
        {label:'Landing page loads',value:String(views),Icon:Eye,detail:'Not unique visitors'},
        {label:'Gumroad checkout clicks',value:String(clicks),Icon:MousePointerClick,detail:'Redirect actions, not payments'},
        {label:'Verified paid orders',value:String(sales),Icon:ShoppingBag,detail:'PayPal + imported Gumroad only'},
        {label:'Verified gross USD',value:price(grossCents),Icon:BarChart3,detail:'Before platform fees, not net profit'},
      ].map(({label,value,Icon,detail})=><section key={label} className="rounded-2xl border border-[#DBE8F0] bg-white p-6">
        <Icon size={21} className="text-[#781D35]"/><p className="mt-4 text-xs font-bold text-[#607588]">{label}</p>
        <p className="mt-2 text-3xl font-bold text-[#172231]">{value}</p><p className="mt-2 text-xs text-[#6F8596]">{detail}</p>
      </section>)}
    </div>
    <section className="overflow-x-auto rounded-2xl border border-[#DDE8F0] bg-white">
      <div className="p-6"><h3 className="font-serif text-2xl">Where did people come from?</h3><p className="mt-2 text-sm text-[#637A8B]">Actions measured by UTM source, not sales attribution. New funnel tracking starts when this feature goes live; older traffic is not backfilled.</p></div>
      <table className="w-full min-w-[570px] text-left text-sm">
        <thead className="bg-[#EAF6FC] text-xs text-[#496276]"><tr><th className="p-4">Source</th><th className="p-4 text-right">Landing loads</th><th className="p-4 text-right">Checkout clicks</th><th className="p-4 text-right">Clicks / loads</th></tr></thead>
        <tbody>{channels.map(c=><tr key={c.source} className="border-t border-[#E6EEF4]"><th className="p-4 capitalize">{c.source}</th><td className="p-4 text-right">{c.views}</td><td className="p-4 text-right">{c.clicks}</td><td className="p-4 text-right">{c.views ? (100*c.clicks/c.views).toFixed(1)+'%' : '—'}</td></tr>)}</tbody>
      </table>
    </section>
    <section className="rounded-2xl border border-[#DDE8F0] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-2xl">Use these direct campaign links</h3>
      <p className="mt-2 text-sm leading-7 text-[#5A7081]">Put the right link in each social profile, Pin destination or ad. Each link reaches the same fast one-product page and records a source label.</p>
      <div className="mt-5 space-y-3">{(['facebook','instagram','tiktok','pinterest'] as const).map(source=><div key={source} className="rounded-xl border border-[#E0EAF0] bg-[#F8FBFD] p-4">
        <p className="text-xs font-extrabold capitalize text-[#781D35]">{source}</p>
        <p className="mt-2 break-all font-mono text-xs leading-6">https://dyasse.com/rose-bag?utm_source={source}&amp;utm_medium=social&amp;utm_campaign=rose_bag</p>
      </div>)}</div>
    </section>
    <p className="text-xs leading-6 text-[#64798A]">Verified purchases do not currently include a reliably matched marketing source: Gumroad processes guest checkout off-site, and its sales feed is imported separately. A missing Gumroad sync can make paid-order totals look lower than actual. No visitor emails, IP addresses or tracking IDs are stored in the new event counters.</p>
  </main>
}
