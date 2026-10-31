'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type BulkItem = {
  catalogId: string
  sourceKey: string
  filename: string
  bytes: number
  sha256: string
  productTitle: string
  uploaded: boolean
  published: boolean
}

function digestHex(bytes: ArrayBuffer) {
  return crypto.subtle.digest('SHA-256', bytes)
    .then(hash => Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, '0')).join(''))
}

export default function BulkPdfUploadPage() {
  const [items, setItems] = useState<BulkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [selected, setSelected] = useState<File[]>([])
  const [events, setEvents] = useState<string[]>([])
  const [completed, setCompleted] = useState(0)
  const ready = useMemo(() => new Map(items.map(i => [i.catalogId, i])), [items])

  async function refresh() {
    const response = await fetch('/api/admin/pdf-bulk-upload', { cache: 'no-store' })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Cannot load intake')
    setItems(data.items || [])
  }

  useEffect(() => {
    refresh().catch(e => setEvents([e instanceof Error ? e.message : 'Could not load products'])).finally(() => setLoading(false))
  }, [])

  function log(message: string) {
    setEvents(prev => [message, ...prev].slice(0, 60))
  }

  async function upload() {
    if (!selected.length || busy) return
    setBusy(true)
    setCompleted(0)
    let success = 0
    const client = createClient()
    for (const file of selected) {
      const found = file.name.match(/^(DYS-\d{4})__Pattern\.pdf$/)
      if (!found) {
        log('Skipped ' + file.name + ': extract the ZIP and select PDF files named DYS-0000__Pattern.pdf')
        continue
      }
      const catalogId = found[1]
      const row = ready.get(catalogId)
      if (!row || row.published) {
        log('Skipped ' + file.name + ': not one of the unverified catalog drafts')
        continue
      }
      if (row.uploaded) {
        log('Skipped ' + file.name + ': file already linked in private Storage')
        continue
      }
      if (file.size !== row.bytes || file.size < 5) {
        log('Rejected ' + catalogId + ': wrong PDF size')
        continue
      }
      try {
        const sha256 = await digestHex(await file.arrayBuffer())
        if (sha256 !== row.sha256) throw new Error('Wrong PDF version or wrong item; SHA256 does not match')
        const sign = await fetch('/api/admin/pdf-bulk-upload', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ catalogId, bytes: file.size, sha256 }),
        })
        const signed = await sign.json()
        if (!sign.ok || !signed.token) throw new Error(signed.error || 'Unable to sign PDF upload')
        const { error: storageError } = await client.storage
          .from('dyasse-paid-patterns')
          .uploadToSignedUrl(signed.path, signed.token, file, { contentType: 'application/pdf', upsert: false })
        if (storageError) throw new Error(storageError.message)
        const finalize = await fetch('/api/admin/pdf-bulk-upload', {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ catalogId }),
        })
        const done = await finalize.json()
        if (!finalize.ok || !done.ok) throw new Error(done.error || 'Private file uploaded; catalog link needs review')
        success += 1
        log('Stored and linked ' + catalogId + ' / Pattern.pdf — still draft')
      } catch (e) {
        log('FAILED ' + catalogId + ': ' + (e instanceof Error ? e.message : 'upload error'))
      }
      setCompleted(prev => prev + 1)
    }
    log('Completed: ' + success + ' private PDFs linked. No products were published automatically.')
    await refresh().catch(() => {})
    setBusy(false)
  }

  const candidates = items.filter(p => !p.published)
  const linked = candidates.filter(p => p.uploaded).length
  return <main className="mx-auto max-w-5xl space-y-7 px-5 py-10 text-[#20334A] sm:px-8">
    <Link href="/admin/products" className="text-sm font-semibold text-[#781D35]">← Catalog management</Link>
    <section className="rounded-2xl border border-[#C9E2EF] bg-[#E9F6FC] p-7">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-[#781D35]">Restricted admin · Private digital downloads</p>
      <h1 className="mt-3 font-serif text-3xl sm:text-4xl">Import PDF patterns in bulk</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[#3F556B]">Upload all matching DYS PDF files securely from your own computer directly to Supabase private Storage. Each PDF is checked against the approved source file name, size and SHA-256 before linking. Your customers cannot download these before paying.</p>
      <p className="mt-3 text-sm font-semibold text-[#334E62]">{loading ? 'Loading…' : `${linked} of ${candidates.length} matched draft PDFs already linked`}</p>
    </section>

    <section className="rounded-2xl border border-[#DDE7EE] bg-white p-7">
      <h2 className="font-serif text-2xl">1. Prepare the upload</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7">
        <li>Download <strong>Dyasse_PDF_Bulk_Upload_Ready_20261031.zip</strong> from your private Drive or ChatGPT file link.</li>
        <li>Unzip it. Open the <strong>UPLOAD_PDFS</strong> folder and select all its PDF files below.</li>
        <li>Keep this page open until the file upload completes. Do not select the ZIP itself.</li>
      </ol>
      <label className="mt-6 block text-sm font-bold" htmlFor="bulk-pdf-files">Select extracted PDF files</label>
      <input id="bulk-pdf-files" type="file" accept=".pdf,application/pdf" multiple disabled={busy}
        className="mt-2 block w-full rounded-lg border border-[#D6E5ED] p-3 text-sm"
        onChange={event => setSelected(Array.from(event.target.files || []))}/>
      <button type="button" disabled={busy || !selected.length || loading} onClick={upload}
        className="mt-5 w-full rounded-full bg-[#781D35] px-6 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
        {busy ? `Uploading PDF files… (${completed}/${selected.length} processed)` : `Upload and link ${selected.length} PDFs privately`}
      </button>
      <p className="mt-3 text-xs leading-6 text-[#59717D]">Security: administrator login required. No service keys are sent to the browser. Signed upload tokens expire automatically. Files are uploaded one by one and validated against their source checksums. Existing files are never overwritten.</p>
    </section>

    {events.length > 0 && <section aria-live="polite" className="rounded-xl border border-[#DCE7EE] bg-[#F8FBFE] p-5">
      <h2 className="font-bold">Upload results</h2>
      <div className="mt-3 max-h-56 space-y-2 overflow-y-auto text-xs leading-6">{events.map((e,i) => <p key={i}>{e}</p>)}</div>
    </section>}

    <section className="rounded-2xl border border-[#DDE7EE] bg-white p-7">
      <h2 className="font-serif text-2xl">2. Review before publishing</h2>
      <p className="mt-3 text-sm leading-7 text-[#526777]">These uploads connect the PDF files and configure PayPal delivery, but every newly imported product remains an unpublished draft until its page, seller-facing PDF, Gumroad checkout and payment delivery have been verified. Do not flip publication flags to skip review.</p>
      <div className="mt-5 grid gap-2">
        {candidates.map(p => <div key={p.catalogId} className="flex items-center justify-between gap-3 border-b border-[#E5EDF2] py-3 text-sm">
          <div><span className="font-bold">{p.catalogId}</span><span className="ml-3 text-[#5C6D7D]">{p.productTitle}</span></div>
          <span className={p.uploaded ? 'shrink-0 font-bold text-[#26734F]' : 'shrink-0 text-[#A04C33]'}>{p.uploaded ? 'Private PDF linked' : 'Not uploaded'}</span>
        </div>)}
      </div>
    </section>
  </main>
}
