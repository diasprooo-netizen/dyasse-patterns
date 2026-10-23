interface SaleBadgeProps {
  badge?: string | null
  isFeatured?: boolean
}

export function SaleBadge({ badge, isFeatured }: SaleBadgeProps) {
  if (!badge && !isFeatured) return null

  return (
    <div className="flex flex-wrap gap-2">
      {badge ? <span className="rounded-full bg-[#D8A24A] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#111827]">{badge}</span> : null}
      {isFeatured ? <span className="rounded-full border border-[#D8A24A]/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#D8A24A]">Featured</span> : null}
    </div>
  )
}
