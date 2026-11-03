'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getCurrentAdminState } from '@/lib/admin-products'
import { gumroadConfigured, syncRecentGumroadSales } from '@/lib/gumroad-sales'

export async function syncGumroadNow() {
  const admin = await getCurrentAdminState()
  if (!admin.isAdmin) redirect('/account/login?next=/admin/gumroad-sales')
  if (!gumroadConfigured()) redirect('/admin/gumroad-sales?sync=configure')
  let imported = 0
  let more = false
  try {
    const result = await syncRecentGumroadSales(12)
    imported = result.imported
    more = result.hasMore
  } catch (error) {
    console.error('Authenticated Gumroad sync failed', error instanceof Error ? error.message : 'Unknown error')
    redirect('/admin/gumroad-sales?sync=failed')
  }
  revalidatePath('/admin')
  revalidatePath('/admin/gumroad-sales')
  revalidatePath('/admin/customers')
  revalidatePath('/admin/orders')
  revalidatePath('/admin/analytics')
  redirect('/admin/gumroad-sales?sync=ok&count=' + imported + (more ? '&more=1' : ''))
}
