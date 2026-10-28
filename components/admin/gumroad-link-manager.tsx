'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'

export type GumroadProduct = {
  slug: string
  title: string
  price: number
  currency: string
  gumroad_link: string | null
  qa_verified: boolean
  is_published: boolean
}
type Filter = 'all' | 'missing' | 'linked' | 'review'
type Status = { ok: boolean; text: string } | null

export function GumroadLinkManager({ products }: { products: GumroadProduct[] }) {
  const [links, setLinks] = useState<Record<string, string>>(
    Object.fromEntries(products.map(p => [p.slug, p.gumroad_link ?? ''])),
  )
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [bulkText, setBulkText] = useState('')
  const [status, setStatus] = useState<Status>(null)
  const [busy, setBusy] = useState(false)
  const [saving, setSaving] = useState<string | null>(null)

  const counts = useMemo(() => ({
    total: products.length,
    connected: products.filter(p => Boolean(p.gumroad_link)).length,
    reviewed: products.filter(p => p.qa_verified).length,
    live: products.filter(p => p.is_published).length,
  }), [products])
  const visible = useMemo(() => products.filter(p => {
    const match = (p.title + ' ' + p.slug).toLowerCase().includes(search.toLowerCase())
    return match && (filter === 'all' || (filter === 'missing' && !p.gumroad_link)
      || (filter === 'linked' && !!p.gumroad_link)
      || (filter === 'review' && !p.qa_verified))
  }), [products, search, filter])

  async function save(items: { slug: string; gumroad_link: string }[]) {
    setBusy(true)
    setStatus(null)
    try {
      const response = await fetch('/api/admin/gumroad-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links: items }),
      })
      const result = await response.json()
      setStatus({ ok: response.ok && !result.failed?.length, text: result.message +
        (result.updated === undefined ? '' : ' Updated: ' + result.updated) })
      if (response.ok && !result.failed?.length) window.location.reload()
    } catch { setStatus({ ok: false, text: 'Could not save. Please retry.' }) }
    finally { setBusy(false); setSaving(null) }
  }
  async function saveOne(slug: string) {
    const url = links[slug]?.trim() ?? ''
    if (!url) { setStatus({ ok: false, text: 'Paste a real Gumroad product URL first.' }); return }
    setSaving(slug)
    await save([{ slug, gumroad_link: url }])
  }
  function parseBulk() {
    const known = new Set(products.map(p => p.slug))
    const seen = new Set<string>()
    const result: { slug: string; gumroad_link: string }[] = []
    const lines = bulkText.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    for (const [index, line] of lines.entries()) {
      if (index === 0 && /^slug[,\t]/i.test(line)) continue
      const sep = line.indexOf('\t') >= 0 ? '\t' : ','
      const pos = line.indexOf(sep)
      if (pos === -1) throw Error('Each row must contain slug,link or slug followed by TAB and link.')
      const slug = line.slice(0, pos).trim().replace(/^"|"$/g, '')
      const gumroad_link = line.slice(pos + 1).trim().replace(/^"|"$/g, '')
      if (!known.has(slug)) throw Error('Product not found: ' + slug)
      if (seen.has(slug)) throw Error('Duplicate slug: ' + slug)
      if (!/^https:\/\/([a-z0-9-]+\.)?gumroad\.com\//i.test(gumroad_link))
        throw Error('Not a valid Gumroad product URL: ' + slug)
      seen.add(slug)
      result.push({ slug, gumroad_link })
    }
    if (!result.length || result.length > 177) throw Error('Paste 1–177 product mappings.')
    return result
  }
  function saveBulk() {
    try { void save(parseBulk()) } catch (e) {
      setStatus({ ok: false, text: e instanceof Error ? e.message : 'Invalid mapping.' })
    }
  }
  async function copyTemplate() {
    const text = 'slug,gumroad_link\n' + products.map(p => p.slug + ',').join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setStatus({ ok: true, text: 'CSV template copied. Paste it into a spreadsheet, add Gumroad URLs, then paste the two columns below.' })
    } catch { setStatus({ ok: false, text: 'Clipboard unavailable. You can copy product slugs from the table.' }) }
  }

  return <div className="space-y-8 text-[#243957]">
    <div className="grid gap-4 sm:grid-cols-4">{([
      ['Total catalog', counts.total], ['Linked to Gumroad', counts.connected],
      ['QA approved', counts.reviewed], ['Live in store', counts.live],
    ] as const).map(([label, value]) =>
      <div key={label} className="rounded-3xl border border-[#E0E7F2] bg-white p-6">
        <p className="text-sm text-[#7B8DA4]">{label}</p>
        <p className="mt-3 text-3xl font-bold">{value}</p>
      </div>,
    )}</div>

    <div className="rounded-3xl border border-[#E0E7F2] bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Bulk connect Gumroad products</h2>
        <button type="button" onClick={copyTemplate} className="rounded-full border border-[#9d816b] px-5 py-2 text-sm font-semibold">Copy CSV template</button>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#70829D]">
        From your Gumroad dashboard, copy each real published product URL. Paste two columns:
        Dyasse product slug, Gumroad product URL. This does not upload PDFs, synchronize prices,
        import sales or publish any product automatically.
      </p>
      <textarea aria-label="Bulk Gumroad URLs" value={bulkText} onChange={e => setBulkText(e.target.value)}
        placeholder={'slug,gumroad_link\ncrochet-pattern-name,https://your-shop.gumroad.com/l/your-pattern'}
        rows={6} className="mt-5 w-full rounded-xl border border-[#DDE4F1] bg-[#FAFBFE] p-4 font-mono text-xs" />
      <button type="button" disabled={busy || !bulkText.trim()} onClick={saveBulk}
        className="mt-3 rounded-full bg-[#465BE2] px-7 py-3 font-semibold text-white disabled:opacity-50">
        {busy ? 'Saving…' : 'Validate & save links'}
      </button>
      <p className="mt-4 text-sm text-[#A36042]">All catalog prices are in USD. Match the exact USD amount, verify the PDF and confirm the Gumroad product is published before enabling checkout.</p>
    </div>

    {status && <p role="status" className={'rounded-2xl p-4 text-sm ' + (status.ok ? 'bg-[#e9f4e9] text-[#235b32]' : 'bg-[#fff0ec] text-[#9a2727]')}>{status.text}</p>}

    <section className="rounded-3xl border border-[#E0E7F2] bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h2 className="text-2xl font-bold">Gumroad product mapping</h2>
          <p className="mt-1 text-sm text-[#7B8DA4]">Only matching live Gumroad product links should be saved here.</p></div>
        <Link href="/admin/qa" className="text-sm font-semibold underline">Go to pattern QA →</Link>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <input aria-label="Search patterns" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search product title or slug" className="min-w-0 flex-1 rounded-xl border border-[#DDE4F1] px-4 py-3" />
        <select aria-label="Filter by readiness" value={filter} onChange={e => setFilter(e.target.value as Filter)}
          className="rounded-xl border border-[#DDE4F1] px-4 py-3">
          <option value="all">All products</option>
          <option value="missing">Missing Gumroad</option>
          <option value="linked">Gumroad linked</option>
          <option value="review">Needs QA</option>
        </select>
      </div>
      <p className="mt-3 text-sm text-[#7B8DA4]">Showing {visible.length} of {products.length}</p>
      <div className="mt-4 max-h-[72vh] overflow-auto">
        <table className="w-full min-w-[750px] border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-[#EDF1FF]"><tr>
            <th className="p-3">Pattern</th><th className="p-3">Listed price</th>
            <th className="p-3">Gumroad product URL</th><th className="p-3">QA / Store</th><th className="p-3">Save</th>
          </tr></thead>
          <tbody>{visible.map(p => <tr key={p.slug} className="border-b border-[#ede2d5]">
            <td className="max-w-[240px] p-3"><p className="font-semibold">{p.title}</p><p className="mt-1 break-all text-xs text-[#7B8DA4]">{p.slug}</p></td>
            <td className="whitespace-nowrap p-3">{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(p.price)}</td>
            <td className="p-3"><input aria-label={'Gumroad link for ' + p.title} value={links[p.slug] ?? ''} onChange={e => setLinks(a => ({ ...a, [p.slug]: e.target.value }))}
              placeholder="https://seller.gumroad.com/l/..." className="w-full min-w-[280px] rounded-lg border border-[#DDE4F1] p-3 text-xs" /></td>
            <td className="whitespace-nowrap p-3">{p.qa_verified ? 'QA ✓' : 'Needs QA'}<p className="mt-1 text-xs">{p.is_published ? 'Live' : 'Draft'}</p></td>
            <td className="p-3"><button type="button" disabled={busy || saving===p.slug} onClick={() => saveOne(p.slug)}
                className="rounded-xl bg-[#465BE2] px-4 py-2 text-white disabled:opacity-50">Save</button></td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
  </div>
}
