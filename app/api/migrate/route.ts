import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** Retired: the standalone Dyasse store must never scrape or import third-party listings. */
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'External marketplace migration has been retired. Manage products through the Dyasse admin.' },
    { status: 410 },
  )
}
