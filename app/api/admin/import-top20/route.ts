import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** Retired migration API: new catalog entries must be reviewed independently. */
export async function POST() {
  return NextResponse.json(
    { message: 'Legacy imports are retired. Manage draft patterns through the Dyasse product editor.' },
    { status: 410 },
  )
}
