'use client'

interface OfferControlsProps {
  isOnSale: boolean
  isFeatured: boolean
  saleBadge: string
  onChange: (patch: { is_on_sale?: boolean; is_featured?: boolean; sale_badge?: string }) => void
}

const badgeSuggestions = ['Limited Offer', 'Best Seller', 'New Pattern', 'Summer Sale']

export function OfferControls({ isOnSale, isFeatured, saleBadge, onChange }: OfferControlsProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
      <div>
        <h3 className="text-lg font-bold text-[#F8FAFC]">Offers & Homepage Highlights</h3>
        <p className="text-sm text-[#94A3B8]">Control sale labels, featured cards, and homepage offer sections from Supabase-backed fields.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl bg-black/20 p-3 text-sm text-[#CBD5E1]">
          <input type="checkbox" checked={isOnSale} onChange={(event) => onChange({ is_on_sale: event.target.checked })} className="h-4 w-4 accent-[#10B981]" />
          Put product on sale
        </label>
        <label className="flex items-center gap-3 rounded-2xl bg-black/20 p-3 text-sm text-[#CBD5E1]">
          <input type="checkbox" checked={isFeatured} onChange={(event) => onChange({ is_featured: event.target.checked })} className="h-4 w-4 accent-[#10B981]" />
          Mark as featured / homepage highlight
        </label>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#CBD5E1]">Sale badge</label>
        <input value={saleBadge} onChange={(event) => onChange({ sale_badge: event.target.value })} placeholder="Limited Offer" className="w-full rounded-2xl border border-white/[0.1] bg-black/30 px-4 py-3 text-[#F8FAFC] outline-none focus:border-[#10B981]" />
        <div className="flex flex-wrap gap-2">
          {badgeSuggestions.map((badge) => <button key={badge} type="button" onClick={() => onChange({ sale_badge: badge })} className="rounded-full border border-white/[0.1] px-3 py-1 text-xs text-[#CBD5E1] hover:border-[#D4AF37]/50">{badge}</button>)}
        </div>
      </div>
    </section>
  )
}
