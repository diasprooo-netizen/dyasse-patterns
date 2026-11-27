import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** Never re-import third-party-hosted images or source prices into Dyasse. */
export async function POST() {
  return NextResponse.json(
    { message: 'Legacy catalog imports are retired. Use the Dyasse product editor and owned media.' },
    { status: 410 },
  )
}
