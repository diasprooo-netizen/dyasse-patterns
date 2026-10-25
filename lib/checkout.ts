/**
 * Only accept shareable, provider-hosted variant checkout links.
 * Reject arbitrary hosts and one-time cart links to avoid accidental misrouting.
 */
export function validLemonCheckoutUrl(value: string | null | undefined): boolean {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
      && !url.username && !url.password && !url.port
      && /^[a-z0-9-]+\.lemonsqueezy\.com$/i.test(url.hostname)
      && /^\/checkout\/buy\/[a-z0-9_-]+\/?$/i.test(url.pathname)
      && !url.hash
  } catch { return false }
}
