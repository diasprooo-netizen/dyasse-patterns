'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Item = {
  catalogId: string
  title: string
  price: number
  gumroadLink: string | null
  uploaded: boolean
  sourceReviewRequired: boolean
}
type FileLink = {
  catalogId: string
  title: string
  price: number
  gumroadLink: string | null
  pdfName: string
  url: string
}

function handoffText(items: FileLink[]): string {
  const header = [
    'DYASSE SHOP — GUMROAD FILE DELIVERY PREPARATION',
    'Use the connected official Gumroad assistant to attach each PDF from its temporary direct file URL to the exact matching Gumroad product.',
    'Match catalog ID, title, and USD price. Search existing Gumroad drafts before creating anything; do not duplicate a product.',
    'Use the Gumroad connector file-from-URL action, which COPIES the source PDF into Gumroad-hosted buyer downloads. A buyer-visible external link is NOT sufficient.',
    'After attaching, verify the PDF is listed in Gumroad Content. DO NOT publish products in this batch: any source-version or seller-copy warnings need resolution first.',
    'Report success or failure, actual Gumroad product URL, and file attached for each catalog ID. Never claim a purchase was tested.',
    'The URLs below grant one-hour private access to these PDFs. Never post them publicly.',
  ].join('\n')
  return header + '\n\n' + items.map(item => [
    'Catalog ID: ' + item.catalogId,
    'Product: ' + item.title,
    'Price: USD ' + item.price.toFixed(2),
    'Existing Gumroad draft: ' + (item.gumroadLink ?? 'None linked — search before creating; observe daily creation limit'),
    'PDF filename: ' + item.pdfName,
    'Temporary direct PDF URL: ' + item.url,
  ].join('\n')).join('\n\n')
}

export default function GumroadFileTransferPage() {
  const [items, setItems] = useState<Item[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [links, setLinks] = useState<FileLink[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const handoff = useMemo(() => handoffText(links), [links])

  useEffect(() => {
    fetch('/api/admin/gumroad-file-transfer', { cache: 'no-store' })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Could not load drafts')
        const rows = (data.items || []) as Item[]
        setItems(rows)
        setSelected(rows.filter(item => item.uploaded && item.gumroadLink).slice(0, 10).map(item => item.catalogId))
      })
      .catch(e => setStatus(e instanceof Error ? e.message : 'Could not load'))
      .finally(() => setLoading(false))
  }, [])

  function toggle(catalogId: string, checked: boolean) {
    setLinks([])
    setSelected(prev => checked
      ? (prev.length >= 10 || prev.includes(catalogId) ? prev : [...prev, catalogId])
      : prev.filter(x => x !== catalogId))
  }

  async function generate() {
    if (!selected.length || busy) return
    setBusy(true)
    setLinks([])
    setStatus('')
    try {
      const response = await fetch('/api/admin/gumroad-file-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catalogIds: selected }),
        cache: 'no-store',
      })
      const body = await response.json()
      if (!response.ok) throw new Error(body.error || 'Could not generate links')
      setLinks(body.files)
      setStatus('Private links generated. Copy them into your connected Gumroad assistant now. They expire in one hour.')
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Unable to generate links')
    } finally {
      setBusy(false)
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(handoff)
      setStatus('Copied. Paste into Claude with the connected Gumroad assistant. Do not share the URLs publicly.')
    } catch {
      setStatus('Copy not available. Select the text below and copy it manually.')
    }
  }

  return <main className="mx-auto max-w-5xl space-y-7 px-5 py-8">
    <Link href="/admin/gumroad" className="text-sm font-semibold text-[#781D35]">← Gumroad manager</Link>
    <section className="rounded-2xl border border-[#CFE3EF] bg-[#EAF5FC] p-7">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-[#781D35]">Private admin · PDF handoff</p>
      <h1 className="mt-3 font-serif text-3xl text-[#172231]">Prepare secure PDF files for Gumroad</h1>
      <p className="mt-4 text-sm leading-7 text-[#40596B]">
        Your PDFs stay in private Supabase Storage. Generate temporary file links so your connected Gumroad assistant can copy them into actual Gumroad customer downloads. No products are published here.
      </p>
      <p className="mt-2 text-xs font-semibold leading-6 text-[#9A5146]">
        Anyone holding a generated link can access that one PDF until expiry. Copy only into a trusted assistant. Do not post publicly.
      </p>
    </section>
    <section className="rounded-xl border border-[#DCE9F0] bg-white p-6">
      <h2 className="font-serif text-2xl text-[#172231]">Select up to 10 private PDFs</h2>
      <p className="mt-2 text-sm text-[#536F81]">
        {loading ? 'Loading…' : items.filter(x => x.uploaded).length + ' uploaded draft PDFs; ' + items.filter(x => x.uploaded && x.gumroadLink).length + ' with Gumroad links. Existing drafts selected first.'}
      </p>
      <div className="mt-5 max-h-[420px] space-y-1 overflow-y-auto">
        {items.filter(x => x.uploaded).map(item => <label key={item.catalogId} className="flex cursor-pointer items-start gap-3 border-b border-[#E9F0F5] p-3 hover:bg-[#F8FCFF]">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#781D35]"
            checked={selected.includes(item.catalogId)}
            disabled={busy || (!selected.includes(item.catalogId) && selected.length >= 10)}
            onChange={e => toggle(item.catalogId, e.target.checked)}/>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-[#293C4E]">{item.catalogId} — {item.title}</span>
            <span className="mt-1 block text-xs text-[#7D8891]">
              {item.gumroadLink ? 'Existing Gumroad draft' : 'No Gumroad draft link'}
              {item.sourceReviewRequired ? ' · PDF source/version needs review before publication' : ''}
            </span>
          </span>
          <span className="shrink-0 text-xs font-bold text-[#306A52]">{'$' + item.price.toFixed(2)}</span>
        </label>)}
      </div>
      <button type="button" onClick={generate} disabled={loading || busy || !selected.length}
        className="mt-5 w-full rounded-full bg-[#781D35] px-6 py-4 text-sm font-bold text-white disabled:opacity-50">
        {busy ? 'Creating secure URLs…' : 'Prepare ' + selected.length + ' temporary PDF URLs'}
      </button>
      {status ? <p role="status" className="mt-4 rounded-lg bg-[#EFF7FC] p-4 text-sm text-[#40576B]">{status}</p> : null}
    </section>
    {links.length ? <section className="rounded-xl border border-[#DCE9F0] bg-white p-6">
      <h2 className="font-serif text-2xl text-[#172231]">Ready to transfer into Gumroad Content</h2>
      <p className="mt-3 text-sm leading-7 text-[#526C7E]">
        Copy these instructions into Claude with its connected official Gumroad assistant. Verify buyer PDF attachments before publishing.
      </p>
      <button type="button" onClick={copy} className="mt-4 rounded-full bg-[#781D35] px-6 py-3 text-sm font-bold text-white">Copy secure handoff for Claude</button>
      <textarea readOnly aria-label="Secure Gumroad file handoff" value={handoff} rows={12}
        className="mt-4 w-full rounded-xl border border-[#D2E3EC] bg-[#F8FCFF] p-4 font-mono text-xs leading-6 text-[#293F52]"/>
      <p className="mt-3 text-xs text-[#A05246]">Links expire one hour after creation. Regenerate if expired.</p>
    </section> : null}
  </main>
}
