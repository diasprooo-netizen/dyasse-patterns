// One-time catalog migration rate agreed for the October 2026 Etsy-to-Gumroad migration.
// Stored prices are always USD; never convert an amount that is already USD.
export const LEGACY_MAD_PER_USD = 9.8239

export function legacyPriceToUsd(amount: number, sourceCurrency: string): number {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Invalid product price')
  const currency = sourceCurrency.trim().toUpperCase()
  if (currency !== 'MAD' && currency !== 'USD') {
    throw new Error('Import price currency must be explicitly MAD or USD')
  }
  const usd = currency === 'MAD' ? amount / LEGACY_MAD_PER_USD : amount
  return Math.round((usd + Number.EPSILON) * 100) / 100
}
