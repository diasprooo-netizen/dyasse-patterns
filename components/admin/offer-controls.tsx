'use client'

interface OfferControlsProps {
  isOnSale: boolean
  isFeatured: boolean
  saleBadge: string
  onChange: (patch: { is_on_sale?: boolean; is_featured?: boolean; sale_badge?: string }) => void
}

const badgeSuggestions = ['Limited Offer', 'New Pattern', 'Summer Sale']

export function OfferControls({ isOnSale, isFeatured, saleBadge, onChange }: OfferControlsProps) {
  return (
    <section className="space-y-5 rounded-[24px] border border-[#D8E2F3] bg-[#F2F5FC] p-5 sm:p-6">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#5063C9]">Merchandising</p>
        <h3 className="mt-2 text-xl font-extrabold tracking-[-.025em] text-[#1D3251]">Offers & homepage highlights</h3>
        <p className="mt-2 text-sm leading-6 text-[#526681]">Choose sale labels and featured placement for this pattern.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex min-h-[68px] cursor-pointer items-center gap-3 rounded-2xl border border-[#D7E0EE] bg-white px-4 py-3 text-[13px] font-semibold text-[#243953] shadow-sm transition hover:border-[#5367DE] hover:bg-[#F9FAFF]">
          <input type="checkbox" checked={isOnSale} onChange={(event) => onChange({ is_on_sale: event.target.checked })} className="h-[18px] w-[18px] shrink-0 accent-[#4B60DF]" />
          Put product on sale
        </label>
        <label className="flex min-h-[68px] cursor-pointer items-center gap-3 rounded-2xl border border-[#D7E0EE] bg-white px-4 py-3 text-[13px] font-semibold text-[#243953] shadow-sm transition hover:border-[#5367DE] hover:bg-[#F9FAFF]">
          <input type="checkbox" checked={isFeatured} onChange={(event) => onChange({ is_featured: event.target.checked })} className="h-[18px] w-[18px] shrink-0 accent-[#4B60DF]" />
          Feature on homepage
        </label>
      </div>
      <div className="space-y-3">
        <label htmlFor="dyasse-sale-badge" className="block text-sm font-bold text-[#324966]">Sale badge</label>
        <input id="dyasse-sale-badge" value={saleBadge} onChange={(event) => onChange({ sale_badge: event.target.value })} placeholder="e.g. Limited Offer" className="w-full rounded-xl border border-[#C9D6EB] bg-white px-4 py-3.5 text-sm font-medium text-[#1F334E] placeholder:text-[#8898AD] outline-none transition focus:border-[#4B60DF] focus:ring-[3px] focus:ring-[#4B60DF]/15" />
        <div className="flex flex-wrap gap-2" aria-label="Suggested sale badges">
          {badgeSuggestions.map((badge) => (
            <button key={badge} type="button" onClick={() => onChange({ sale_badge: badge })}
              aria-pressed={saleBadge === badge}
              className={'rounded-full border px-4 py-2 text-xs font-semibold transition ' +
                (saleBadge === badge ? 'border-[#4B60DF] bg-[#4B60DF] text-white' : 'border-[#CAD6EC] bg-white text-[#455A78] hover:border-[#4B60DF] hover:bg-[#E7EBFF]')}>
              {badge}
            </button>
          ))}
        </div>
        <p className="text-xs leading-5 text-[#607490]">Use accurate claims only. A badge does not automatically publish a draft.</p>
      </div>
    </section>
  )
}
