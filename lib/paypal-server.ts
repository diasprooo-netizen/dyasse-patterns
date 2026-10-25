import 'server-only'

type PayPalResponse = Record<string, unknown>

function paypalApiBase(): string {
  return process.env.PAYPAL_ENVIRONMENT === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
}

export function hasPayPalCredentials() {
  return !!(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET)
}

async function accessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !clientSecret) throw new Error('PayPal merchant API not configured')
  const response = await fetch(paypalApiBase() + '/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('PayPal merchant authentication failed')
  const data = await response.json() as { access_token?: string }
  if (!data.access_token) throw new Error('Missing PayPal access token')
  return data.access_token
}

export async function callPayPal(
  path: string,
  method: 'GET' | 'POST',
  payload?: unknown,
  requestId?: string,
): Promise<PayPalResponse> {
  const token = await accessToken()
  const response = await fetch(paypalApiBase() + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      ...(requestId ? { 'PayPal-Request-Id': requestId } : {}),
    },
    ...(payload === undefined ? {} : { body: JSON.stringify(payload) }),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('PayPal order service returned HTTP ' + response.status)
  return await response.json() as PayPalResponse
}

export function completedCapture(
  order: PayPalResponse,
  productId: string,
  amountCents: number,
): { id: string; payerEmail: string | null } | null {
  if (order.status !== 'COMPLETED' || !Array.isArray(order.purchase_units)) return null
  const unit = order.purchase_units[0] as Record<string, unknown> | undefined
  if (!unit || unit.custom_id !== productId) return null
  const payments = unit.payments as { captures?: Array<Record<string, unknown>> } | undefined
  const capture = payments?.captures?.find(item => item.status === 'COMPLETED')
  const amount = capture?.amount as { value?: string; currency_code?: string } | undefined
  if (!capture || typeof capture.id !== 'string' || amount?.currency_code !== 'USD'
      || !amount.value || !/^\d+\.\d{2}$/.test(amount.value)) return null
  if (Number(amount.value.replace('.', '')) !== amountCents) return null
  const payer = order.payer as { email_address?: unknown } | undefined
  const email = typeof payer?.email_address === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payer.email_address)
    ? payer.email_address : null
  return { id: capture.id, payerEmail: email }
}

export function paypalErrorResponse() {
  return { error: 'PayPal checkout is currently unavailable. Please try again or contact support.' }
}
