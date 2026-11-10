import { NextRequest, NextResponse } from 'next/server'
import { createClient, hasSupabaseConfig } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
export async function GET(request:NextRequest,{params}:{params:{slug:string}}) {
  if (!hasSupabaseConfig()) return NextResponse.redirect(new URL('/collections/crochet-patterns',request.url))
  const supabase=await createClient()
  const {data}=await supabase.from('products').select('id,gumroad_link,gumroad_checkout_verified,gumroad_is_published').eq('slug',params.slug).eq('is_published',true).eq('qa_verified',true).maybeSingle()
  if (!data?.gumroad_link || !data.gumroad_checkout_verified || !data.gumroad_is_published) return new NextResponse('Product unavailable', {status:404})
  let target: URL
  try {target=new URL(data.gumroad_link)} catch {return new NextResponse('Invalid checkout link',{status:503})}
  const allowed=(target.hostname==='gumroad.com'||target.hostname.endsWith('.gumroad.com'))&&target.protocol==='https:'
  if(!allowed) return new NextResponse('Checkout unavailable',{status:503})
  // Gumroad's documented `wanted=true` parameter opens the secure payment form
  // immediately, skipping a second click on the Gumroad product page.
  // Preserve any existing variant/coupon parameters on the verified product URL.
  target.searchParams.set('wanted', 'true')
  // Anonymous source label only: no visitor IDs, emails or IPs stored.
  const supplied=request.nextUrl.searchParams.get('utm_source')?.toLowerCase() || 'direct'
  const source=['facebook','instagram','tiktok','pinterest','direct'].includes(supplied)?supplied:'other'
  try {const admin=createServiceClient();await admin.from('checkout_clicks').insert({product_id:data.id,source})} catch {}
  return NextResponse.redirect(target,302)
}
