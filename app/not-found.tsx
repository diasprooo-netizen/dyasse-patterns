import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Page Not Found | Dyasse' },
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <section className="mx-auto max-w-3xl px-6 py-24 text-center">
    <h1 className="font-serif text-4xl text-[#172231]">Page not found</h1>
    <p className="mt-5 text-[#536779]">This page is unavailable. Browse our released PDF patterns or contact support.</p>
    <Link href="/patterns" className="mt-8 inline-block rounded-full bg-[#781D35] px-6 py-3 font-semibold text-white">Browse PDF patterns</Link>
  </section>
}
