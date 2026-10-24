import { NextResponse } from 'next/server'
import { getCurrentAdminState } from '@/lib/admin-products'

export const runtime='nodejs'
export const dynamic='force-dynamic'

export async function GET() {
 try {
  const user = await getCurrentAdminState()
  return NextResponse.json({
   authenticated: user.isLoggedIn,
   isAdmin: user.isAdmin,
   email: user.email,
  }, { headers: { 'Cache-Control':'private, no-store, max-age=0' } })
 } catch {
  return NextResponse.json({authenticated:false,isAdmin:false,email:null}, {
   status: 503, headers: { 'Cache-Control':'no-store' }
  })
 }
}
