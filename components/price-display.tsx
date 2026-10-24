interface PriceDisplayProps {
  price: number
  salePrice?: number | null
  currency?: string
  size?: 'sm' | 'lg'
}

export function formatPrice(price: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)
}

export function getDiscountPercent(price: number, salePrice: number | null): number | null {
  if (!salePrice || salePrice >= price || price <= 0) return null
  return Math.round(((price - salePrice) / price) * 100)
}

export function PriceDisplay({ price, salePrice, currency = 'USD', size = 'lg' }: PriceDisplayProps) {
  const discount = getDiscountPercent(price, salePrice ?? null)
  const activeSale = salePrice !== null && salePrice !== undefined && salePrice < price
  const priceClass = size === 'lg' ? 'text-4xl' : 'text-2xl'

  if (!activeSale) {
    return <p className={`${priceClass} font-bold text-[#1D3558]`}>{formatPrice(price, currency)}</p>
  }

  return (
    <div className="flex flex-wrap items-end gap-3" aria-label="Sale price">
      <span className="text-lg font-semibold text-slate-400 line-through">{formatPrice(price, currency)}</span>
      <span className={`${priceClass} font-black text-[#DF4D60]`}>{formatPrice(salePrice, currency)}</span>
      {discount ? <span className="rounded-full bg-[#FCE4E9] px-3 py-1 text-sm font-bold text-[#A83A50]">Save {discount}%</span> : null}
    </div>
  )
}
