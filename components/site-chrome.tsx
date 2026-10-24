'use client'
import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function SiteChrome({children}:{children:React.ReactNode}){
  const path=usePathname()
  const isAdmin=path==='/admin'||path.startsWith('/admin/')
  if (isAdmin) return <main id="main-content" className="min-h-screen">{children}</main>
  return <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-[#352b23]">Skip to content</a>
    <SiteHeader/>
    <main id="main-content" className="min-h-[55vh]">{children}</main>
    <SiteFooter/>
  </>
}
