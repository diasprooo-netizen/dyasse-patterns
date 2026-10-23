import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { getProductStats, listAdminProducts, requireAdmin } from '@/lib/admin-products'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const admin = await requireAdmin()

  if (!admin.isAdmin) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] px-4 py-24 text-center text-[#2F261F]">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8 shadow-luxury">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-200">Access Denied</p>
          <h1 className="mt-4 text-4xl font-black">Admin access required</h1>
          <p className="mt-4 text-[#6B5B4D]">You are signed in, but this email is not listed in ADMIN_EMAIL or the Supabase admin_users table.</p>
        </div>
      </div>
    )
  }

  const products = await listAdminProducts()
  const stats = await getProductStats(products)

  return <AdminDashboard products={products} stats={stats} adminEmail={admin.email} />
}
