import { redirect } from 'next/navigation'
import { getCurrentAdminState } from '@/lib/admin-products'
import { AdminShell } from '@/components/admin/admin-shell'

export const dynamic = 'force-dynamic'
export default async function AdminLayout({children}:{children:React.ReactNode}){
 const account=await getCurrentAdminState()
 if(!account.isLoggedIn)redirect('/account/login?next=/admin')
 if(!account.isAdmin){
  return <div className="flex min-h-screen items-center justify-center bg-[#F3F6FC] px-5">
   <div className="w-full max-w-lg rounded-3xl border border-[#E1E7F2] bg-white p-10 text-[#253750] shadow-xl">
    <p className="text-xs font-bold uppercase tracking-[.18em] text-[#D34F5A]">Restricted workspace</p>
    <h1 className="mt-4 text-3xl font-extrabold">Administrator access required</h1>
    <p className="mt-4 text-sm leading-7 text-[#6B7B94]">Your account is signed in, but it is not approved as a Dyasse manager. Contact the store owner for access.</p>
    <a href="/" className="mt-7 inline-flex rounded-xl bg-[#4257E8] px-5 py-3 text-sm font-bold text-white">Return to store</a>
   </div>
  </div>
 }
 return <AdminShell email={account.email??'Administrator'}>{children}</AdminShell>
}
