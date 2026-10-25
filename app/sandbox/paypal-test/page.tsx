import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PayPalCheckout } from '@/components/paypal-checkout'
import { getCurrentAdminState } from '@/lib/admin-products'
import { createServiceClient } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dyasse — Sandbox PayPal Test', robots: { index: false, follow: false } }

export default async function SandboxPayPalTest() {
  if (process.env.VERCEL_ENV === 'production') notFound()

  const admin = await getCurrentAdminState()
  if (!admin.isAdmin) {
    return <main className="mx-auto max-w-xl px-5 py-16 text-[#233449]">
      <h1 className="text-2xl font-bold">Shop administrator sign-in required</h1>
      <p className="mt-3">This test is not a public product page. It is accessible only to a Dyasse administrator.</p>
      <Link className="mt-6 inline-block rounded-lg bg-[#781D35] px-5 py-3 font-semibold text-white"
        href="/account/login?next=/sandbox/paypal-test">Sign in to run the Sandbox test</Link>
    </main>
  }

  if (process.env.PAYPAL_ENVIRONMENT !== 'sandbox') {
    return <main className="mx-auto max-w-xl px-5 py-16"><h1 className="text-2xl font-bold">PayPal Sandbox configuration is unavailable</h1><p className="mt-3">Only the Preview environment can run this test. No real payments are enabled.</p></main>
  }

  const db = createServiceClient()
  const { data: product } = await db.from('products')
    .select('slug,title,paypal_price_usd_cents,digital_file_path')
    .eq('digital_file_path', 'DYS-0138/Pattern.pdf').maybeSingle()
  const { data: uploaded } = await db.storage.from('dyasse-paid-patterns')
    .list('DYS-0138', { search: 'Pattern.pdf', limit: 20 })
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const available = product && product.digital_file_path === 'DYS-0138/Pattern.pdf'
    && uploaded?.some(item => item.name === 'Pattern.pdf')
    && clientId
    && Number.isSafeInteger(product.paypal_price_usd_cents)
    && product.paypal_price_usd_cents > 0

  return <main className="min-h-[70vh] bg-[#F4F8FC] px-5 py-12 text-[#233449]">
    <div className="mx-auto max-w-xl space-y-6 rounded-2xl border border-[#D7E6F1] bg-white p-6 shadow-sm sm:p-10">
      <p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Administrator only · PayPal Sandbox</p>
      <h1 className="font-serif text-3xl font-semibold">Test a PDF purchase</h1>
      <p className="text-sm leading-7">DYS-0138 — Cocoa Bobble Handbag. The pattern is still a draft and has <strong>not</strong> passed its technical pattern review. This checkout uses fake Sandbox money only.</p>
      <p className="rounded-lg border border-[#E9DABA] bg-[#FFF9ED] p-4 text-sm">
        Use a <strong>Sandbox Personal buyer</strong> account from PayPal Developer → Testing Tools → Sandbox Accounts.
        Do not sign in with a real PayPal account or pay real money.
      </p>
      {available ? <PayPalCheckout slug={product.slug} priceCents={product.paypal_price_usd_cents}
        clientId={clientId} sandboxTest /> : <p role="alert" className="text-sm font-semibold text-red-700">
        Sandbox checkout not ready. Verify the private DYS-0138 PDF and Preview credentials.
      </p>}
      <p className="text-xs text-[#58697E]">After PayPal confirms your Sandbox payment, the test must display a private download link. This does not publish or activate the pattern in the real shop.</p>
    </div>
  </main>
}
