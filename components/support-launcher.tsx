'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
export function SupportLauncher(){
 const path=usePathname()
 if(path==='/support'||path.startsWith('/admin'))return null
 return <Link href="/support" aria-label="Chat with a real Dyasse team member" className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full border border-white/40 bg-[#781D35] px-5 py-3.5 text-xs font-bold text-white shadow-[0_10px_36px_rgba(41,31,49,.22)] hover:bg-[#5C1428]"><MessageCircle size={20}/> Chat with us</Link>
}
