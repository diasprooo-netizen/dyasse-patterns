import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { CommerceOverview } from '@/components/admin/commerce-overview'
import { getProductStats, listAdminProducts, requireAdmin } from '@/lib/admin-products'
export const dynamic='force-dynamic'
export default async function AdminPage(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="rounded-xl bg-white p-7 text-red-700">Administrator access required.</p>
 const products=await listAdminProducts()
 const stats=await getProductStats(products)
 return <div className="space-y-7"><CommerceOverview/><AdminDashboard products={products} stats={stats} adminEmail={admin.email}/></div>
}
