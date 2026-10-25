'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type AtelierCategory = {
  href: string
  title: string
  sub: string
  image: string
}

/**
 * A gentle, draggable "box-office" shelf for the five shop collections.
 * Autoplay never runs while a visitor hovers, focuses, drags, or prefers reduced motion.
 * Embla provides native touch dragging and snap-to-card navigation.
 */
export function CategoryCarousel({ items }: { items: AtelierCategory[] }) {
  const [viewportRef, api] = useEmblaCarousel({
    align: 'start',
    loop: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })
  const [active, setActive] = useState(0)
  const interacting = useRef(false)
  const resumeAfter = useRef(0)

  useEffect(() => {
    if (!api) return
    const sync = () => setActive(api.selectedScrollSnap())
    sync()
    api.on('select', sync)
    api.on('reInit', sync)
    return () => {
      api.off('select', sync)
      api.off('reInit', sync)
    }
  }, [api])

  const navigate = useCallback((way: 'next' | 'prev') => {
    if (!api) return
    resumeAfter.current = Date.now() + 9000
    if (way === 'next') {
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    } else {
      if (api.canScrollPrev()) api.scrollPrev()
      else api.scrollTo(api.scrollSnapList().length - 1)
    }
  }, [api])

  useEffect(() => {
    if (!api || items.length <= 1) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const timer = window.setInterval(() => {
      if (reduced.matches || document.hidden || interacting.current || Date.now() < resumeAfter.current) return
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [api, items.length])

  if (!items.length) return null

  return <div
    className="dyasse-category-shelf"
    aria-label="Crochet and knitting pattern categories"
    onMouseEnter={() => { interacting.current = true }}
    onMouseLeave={() => { interacting.current = false }}
    onFocusCapture={() => { interacting.current = true }}
    onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) interacting.current = false
    }}
    onPointerDown={() => { resumeAfter.current = Date.now() + 10000 }}
  >
    <div className="mb-4 flex items-center justify-between gap-3">
      <p className="text-[11px] font-medium tracking-[.13em] text-[#617384]">
        EXPLORE THE ATELIER <span className="ml-2 font-semibold text-[#81253B]">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
      </p>
      <div className="flex gap-2" aria-label="Category carousel controls">
        <button type="button" aria-label="Previous category" onClick={() => navigate('prev')} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CFDEE8] bg-white text-[#24394B] transition duration-200 hover:-translate-y-0.5 hover:border-[#81253B] hover:bg-[#F9F2F4] hover:text-[#81253B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#81253B]">
          <ArrowLeft size={17} strokeWidth={1.8}/>
        </button>
        <button type="button" aria-label="Next category" onClick={() => navigate('next')} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CFDEE8] bg-white text-[#24394B] transition duration-200 hover:-translate-y-0.5 hover:border-[#81253B] hover:bg-[#F9F2F4] hover:text-[#81253B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#81253B]">
          <ArrowRight size={17} strokeWidth={1.8}/>
        </button>
      </div>
    </div>
    <div ref={viewportRef} className="overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Browse categories">
      <div className="flex touch-pan-y gap-3 sm:gap-4">
        {items.map((item, index) => <div key={item.href} className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_45%] md:flex-[0_0_34%] lg:flex-[0_0_27%] xl:flex-[0_0_24%]" role="group" aria-roledescription="slide" aria-label={String(index + 1) + ' of ' + items.length + ': ' + item.title}>
          <Link href={item.href} className="group relative isolate flex h-[188px] flex-col justify-end overflow-hidden rounded-[15px] border border-[#E2EAF0] bg-[#EBF3F8] p-5 shadow-[0_3px_13px_rgba(23,53,78,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#BDD2E0] hover:shadow-[0_15px_28px_rgba(25,52,73,.12)] sm:h-[205px]">
            <div aria-hidden="true" className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.075]" style={{ backgroundImage: 'url("' + item.image + '")' }}/>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#FDFEFF]/95 via-[#FDFEFF]/45 to-transparent"/>
            <span className="max-w-[220px] font-serif text-[23px] font-semibold leading-[1.08] tracking-[-.025em] text-[#172A3B] sm:text-[25px]">{item.title}</span>
            <span className="mt-2 flex items-center justify-between gap-3 text-[12px] font-medium text-[#42586B]">
              <span className="line-clamp-1">{item.sub}</span>
              <ArrowRight size={18} className="shrink-0 text-[#81253B] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.7}/>
            </span>
          </Link>
        </div>)}
      </div>
    </div>
    <p className="mt-3 text-center text-[11px] text-[#73828F] sm:hidden">Swipe to explore more patterns</p>
  </div>
}
