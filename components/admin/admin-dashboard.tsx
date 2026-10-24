import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Check, CheckCircle2, CircleAlert, ClipboardCheck, ExternalLink, FilePlus2, FileText, Layers3, Link2, Package, SearchCheck, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'
import type { Product, ProductStats } from '@/types/product'

function StatCard({title,value,note,tone,icon:Icon}:{title:string,value:number,note:string,tone:'indigo'|'coral'|'mint'|'amber',icon:typeof Package}){
 const themes={
  indigo:['bg-[#E9EDFF] text-[#445DE0]','bg-[#455AE4]'],
  coral:['bg-[#FFEBE9] text-[#E45A62]','bg-[#EB6672]'],
  mint:['bg-[#E5F9F1] text-[#109E74]','bg-[#13B18A]'],
  amber:['bg-[#FFF3DD] text-[#D29129]','bg-[#F4B449]'],
 }
 const [iconClass,accent]=themes[tone]
 return <div className="relative overflow-hidden rounded-[22px] border border-[#E3E9F3] bg-white p-6 shadow-[0_8px_28px_rgba(28,46,77,.035)]">
  <div className={'absolute inset-x-0 top-0 h-[4px] '+accent}/>
  <div className="flex items-center justify-between"><span className="text-[12px] font-bold text-[#7787A0]">{title}</span>
   <span className={'flex h-11 w-11 items-center justify-center rounded-[14px] '+iconClass}><Icon size={21} strokeWidth={1.9}/></span></div>
  <p className="mt-4 text-[clamp(2rem,3vw,2.8rem)] font-extrabold tracking-[-.055em] text-[#172C49]">{value.toLocaleString('en-US')}</p>
  <p className="mt-1 text-[12px] text-[#8090A8]">{note}</p>
 </div>
}
const quickActions=[
 {href:'/admin/products',icon:Package,title:'Manage products',description:'Edit listings, copy and pricing',color:'bg-[#E8EDFF] text-[#425AE5]'},
 {href:'/admin/gumroad',icon:Link2,title:'Connect Gumroad',description:'Map PDF checkout pages',color:'bg-[#FFE5E2] text-[#D9535D]'},
 {href:'/admin/qa',icon:ClipboardCheck,title:'Quality review',description:'Record tested pattern evidence',color:'bg-[#E2F7EE] text-[#0E9871]'},
 {href:'/admin/seo',icon:SearchCheck,title:'Optimize SEO',description:'Titles, tags and descriptions',color:'bg-[#FFF0D5] text-[#C58727]'},
]
export function AdminDashboard({products,stats,adminEmail}:{products:Product[],stats:ProductStats,adminEmail:string|null}){
 const qaReady=products.filter(p=>p.qa_verified).length
 const linksReady=products.filter(p=>Boolean(p.gumroad_link)).length
 const withSeo=products.filter(p=>Boolean(p.seo_title&&p.seo_description)).length
 const readyToPublish=products.filter(p=>p.qa_verified&&Boolean(p.gumroad_link)).length
 const progress=stats.totalProducts ? Math.round(100*readyToPublish/stats.totalProducts):0
 const categories=[...products.reduce((m,p)=>{const c=p.category?.trim()||'Uncategorized';m.set(c,(m.get(c)||0)+1);return m},new Map<string,number>()).entries()].sort((a,b)=>b[1]-a[1]).slice(0,5)
 const recent=[...products].sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime()).slice(0,6)
 return <div className="space-y-8">
  <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(110deg,#182D51_0%,#323F8B_55%,#7951C9_100%)] p-7 text-white shadow-[0_18px_40px_rgba(44,64,152,.17)] sm:p-9 lg:p-11">
   <div className="pointer-events-none absolute -right-24 -top-32 h-[370px] w-[370px] rounded-full border-[40px] border-white/10"/>
   <div className="pointer-events-none absolute bottom-0 right-24 h-60 w-60 rounded-full bg-[#FF7E78]/15 blur-3xl"/>
   <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
    <div><span className="inline-flex items-center gap-2 rounded-full border border-[#9BABFF]/40 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#CDD7FF]"><Sparkles size={15}/> STORE COMMAND CENTER</span>
     <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-.05em] sm:text-4xl">Your studio, your next chapter<span className="text-[#FF9A85]">.</span></h2>
     <p className="mt-4 max-w-xl text-sm leading-7 text-[#D7DEFF]">Organize your pattern catalog, check what is ready to launch, and manage each release confidently in one dedicated space.</p>
     <p className="mt-5 text-xs text-[#BBC7F7]">Welcome back, {adminEmail?.split('@')[0] || 'Manager'}.</p>
    </div>
    <div className="flex shrink-0 flex-wrap gap-3">
     <Link href="/admin/products" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-[13px] font-extrabold text-[#293F84] transition hover:bg-[#EFF3FF]"><Package size={17}/> Manage catalog <ArrowRight size={16}/></Link>
     <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 text-[13px] font-semibold text-white transition hover:bg-white/20">View store <ExternalLink size={16}/></Link>
    </div>
   </div>
  </div>
  <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#7083A1]">LIVE DATABASE SNAPSHOT</p><h2 className="mt-2 text-xl font-extrabold tracking-[-.03em] text-[#1B2E4C]">Store at a glance</h2></div><span className="inline-flex items-center gap-2 rounded-full border border-[#D8E2F3] bg-white px-4 py-2 text-xs font-semibold text-[#72839D]"><span className="h-2 w-2 rounded-full bg-[#20C087]"/> Supabase</span></div>
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
   <StatCard title="Total patterns" value={stats.totalProducts} note="All catalog entries" tone="indigo" icon={Package}/>
   <StatCard title="Draft patterns" value={stats.draftProducts} note="Not visible to shoppers" tone="coral" icon={FileText}/>
   <StatCard title="Available for sale" value={stats.publishedProducts} note="Actually published" tone="mint" icon={BadgeCheck}/>
   <StatCard title="Needs technical QA" value={stats.totalProducts-qaReady} note="Awaiting sample verification" tone="amber" icon={ShieldAlert}/>
  </div>
  <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
   <section className="rounded-[25px] border border-[#E2E9F3] bg-white p-6 shadow-[0_8px_25px_rgba(25,42,74,.035)] sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#5169D2]">RELEASE PIPELINE</p><h3 className="mt-2 text-[23px] font-extrabold tracking-[-.045em]">Launch readiness</h3><p className="mt-2 text-sm text-[#7B8AA1]">A real checklist — no estimated revenue or unverified reviews.</p></div><span className="rounded-xl bg-[#EEF0FF] px-4 py-2 text-sm font-extrabold text-[#445AD2]">{progress}% ready</span></div>
    <div role="progressbar" aria-label="Products meeting QA and checkout conditions" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="mt-6 h-3 overflow-hidden rounded-full bg-[#E9EDF7]"><div className="h-full rounded-full bg-[linear-gradient(90deg,#5567ED,#E66A85)]" style={{width:progress+'%'}}/></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-2">
     {[{label:'QA verified',number:qaReady,icon:ClipboardCheck,tone:'text-[#119776] bg-[#E9F9F2]'},
       {label:'Gumroad linked',number:linksReady,icon:Link2,tone:'text-[#4D62DF] bg-[#EBEEFF]'},
       {label:'SEO fields complete',number:withSeo,icon:SearchCheck,tone:'text-[#CF8B27] bg-[#FFF4DF]'},
       {label:'QA + checkout ready',number:readyToPublish,icon:CheckCircle2,tone:'text-[#C65D6D] bg-[#FFF0F1]'}].map(item=>
       <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-[#EEF1F6] bg-[#FAFBFD] p-4">
        <span className={'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl '+item.tone}><item.icon size={19}/></span>
        <div className="min-w-0"><p className="text-xs font-medium text-[#7989A2]">{item.label}</p><p className="mt-1 text-lg font-extrabold text-[#1D304C]">{item.number} <span className="text-xs font-medium text-[#9CAAC0]">/ {stats.totalProducts}</span></p></div>
       </div>)}
    </div>
    <div className="mt-6 rounded-2xl border border-[#F7DCCF] bg-[#FFF7F0] p-4 text-sm leading-7 text-[#8A5A3C]"><CircleAlert size={19} className="mr-2 inline-block align-middle"/> A product stays unpublished until the exact pattern is tested and its real Gumroad checkout link is verified.</div>
   </section>
   <section className="rounded-[25px] border border-[#E2E9F3] bg-white p-6 shadow-[0_8px_25px_rgba(25,42,74,.035)] sm:p-8">
    <div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#5169D2]">CATALOG INSIGHTS</p><h3 className="mt-2 text-[23px] font-extrabold tracking-[-.045em]">Top categories</h3><p className="mt-2 text-sm text-[#7B8AA1]">From your actual database products.</p></div>
    <div className="mt-7 space-y-5">{categories.map(([name,n],i)=><div key={name}><div className="mb-2 flex items-center justify-between gap-2 text-xs"><span className="truncate font-semibold text-[#41536F]">{name}</span><strong className="text-[#203654]">{n}</strong></div><div className="h-2.5 overflow-hidden rounded-full bg-[#ECF0F6]"><div className={'h-full rounded-full '+['bg-[#5367E9]','bg-[#EB6975]','bg-[#19AA94]','bg-[#A36FDE]','bg-[#F1AF4B]'][i]} style={{width:Math.max(5,Math.round(100*n/Math.max(1,stats.totalProducts)))+'%'}}/></div></div>)}</div>
    {categories.length===0?<p className="mt-7 text-sm text-[#8595AC]">No categories yet.</p>:null}
    <Link href="/admin/products" className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#4B60DE]">Explore entire catalog <ArrowUpRight size={16}/></Link>
   </section>
  </div>
  <section><div className="mb-5 flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#7182A0]">GET THINGS DONE</p><h2 className="mt-2 text-xl font-extrabold tracking-[-.03em] text-[#1B2E4C]">Quick actions</h2></div></div>
   <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{quickActions.map(item=><Link key={item.href} href={item.href} className="group flex items-start gap-4 rounded-[22px] border border-[#E1E8F2] bg-white p-5 shadow-[0_8px_24px_rgba(28,46,77,.025)] transition hover:-translate-y-1 hover:border-[#C3CEEF] hover:shadow-[0_17px_35px_rgba(28,46,77,.08)]">
     <span className={'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl '+item.color}><item.icon size={23}/></span>
     <span className="min-w-0 flex-1"><strong className="block text-[13px] font-extrabold text-[#253955]">{item.title}</strong><span className="mt-2 block text-xs leading-6 text-[#8391A7]">{item.description}</span></span><ArrowUpRight size={17} className="text-[#9EACC2] transition group-hover:text-[#4F63DD]"/>
    </Link>)}</div>
  </section>
  <section className="overflow-hidden rounded-[25px] border border-[#E2E9F3] bg-white shadow-[0_8px_25px_rgba(25,42,74,.035)]">
   <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDF0F6] p-6 sm:px-8"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#5169D2]">CATALOG ACTIVITY</p><h2 className="mt-2 text-xl font-extrabold tracking-[-.03em]">Recently imported</h2></div><Link href="/admin/products" className="inline-flex items-center gap-2 rounded-xl bg-[#EFF2FF] px-4 py-2.5 text-xs font-bold text-[#4A5FCD]">Manage all <ArrowRight size={15}/></Link></div>
   {recent.length?<div className="divide-y divide-[#EDF0F6]">{recent.map(p=><div key={p.id} className="flex flex-wrap items-center gap-4 px-6 py-4 sm:px-8">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1F3FA] text-[#7986A7]"><Layers3 size={20}/></span>
    <div className="min-w-[170px] flex-1"><p className="truncate text-sm font-bold text-[#253957]">{p.title}</p><p className="mt-1 truncate text-[11px] text-[#8391A7]">{p.category??'Uncategorized'} · {p.currency} {p.price.toFixed(2)}</p></div>
    <span className={'rounded-full px-3 py-1.5 text-[11px] font-bold '+(p.is_published?'bg-[#E5F9F1] text-[#16865E]':'bg-[#FFF0EA] text-[#B96343]')}>{p.is_published?'Published':'Draft'}</span>
    <Link href={'/admin/preview/'+encodeURIComponent(p.slug)} className="inline-flex items-center gap-1 text-xs font-semibold text-[#5365DF]">Preview <ArrowUpRight size={15}/></Link>
   </div>)}</div>:<p className="p-8 text-sm text-[#7A8BA5]">Your catalog is empty. Import drafts to start.</p>}
  </section>
  <div className="flex items-start gap-3 rounded-2xl border border-[#DBE5F4] bg-[#EAF0FA] p-5"><ShieldAlert size={20} className="mt-0.5 shrink-0 text-[#5069B8]"/><p className="text-xs leading-6 text-[#637793]">Actual orders, sales and refunds remain in Gumroad; no revenue is shown here until a verified integration exists. The product database is managed through Supabase.</p></div>
 </div>
}
