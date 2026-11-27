import { NextResponse } from 'next/server'
import { customerIdentity } from '@/lib/customer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Private account-only status for hydrated checkout components. */
export async function GET() {
  try {
    const me = await customerIdentity()
    return NextResponse.json({
      authenticated: !!me,
      hasName: !!me?.name,
    }, { headers: { 'Cache-Control': 'private, no-store, max-age=0' } })
  } catch {
    return NextResponse.json({ error: 'Account status unavailable' }, {
      status: 503,
      headers: { 'Cache-Control': 'private, no-store, max-age=0' },
    })
  }
}
