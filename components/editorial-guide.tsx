import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2 } from 'lucide-react'
import { safeJsonLd, SITE_URL } from '@/lib/seo'

export type GuideSection = { title: string; paragraphs: string[]; bullets?: string[] }
export type GuideLink = { href: string; label: string; context: string }

export function EditorialGuide({
  slug, title, description, eyebrow, sections, related,
}: {
  slug: string
  title: string
  description: string
  eyebrow: string
  sections: GuideSection[]
  related: GuideLink[]
}) {
  const url = SITE_URL + '/guides/' + slug
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': url + '#article',
        url,
        headline: title,
        description,
        inLanguage: 'en',
        mainEntityOfPage: url,
        author: { '@type': 'Organization', name: 'Dyasse Shop' },
        publisher: { '@type': 'Organization', name: 'Dyasse Shop' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Crochet patterns', item: SITE_URL + '/collections/crochet-patterns' },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  }
  return <article className="bg-white text-[#172231]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(graph) }} />
    <header className="border-b border-[#D7E9F3] bg-[#EAF6FC] px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs font-semibold text-[#667987]">
          <Link href="/" className="hover:text-[#781D35]">Home</Link><span>/</span>
          <Link href="/collections/crochet-patterns" className="hover:text-[#781D35]">Crochet patterns</Link><span>/</span><span>{eyebrow}</span>
        </nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-[#781D35]">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.09] tracking-[-.045em]">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#4C6170]">{description}</p>
      </div>
    </header>
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14">
      <div className="space-y-11">
        {sections.map((section, i) => <section key={section.title} aria-labelledby={'guide-section-' + i}>
          <h2 id={'guide-section-' + i} className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-tight tracking-[-.035em]">{section.title}</h2>
          {section.paragraphs.map((paragraph, j) =>
            <p key={j} className="mt-4 text-[15px] leading-8 text-[#516676]">{paragraph}</p>)}
          {section.bullets?.length ? <ul className="mt-5 space-y-3">
            {section.bullets.map((bullet, k) => <li key={k} className="flex items-start gap-3 text-sm leading-7 text-[#526775]">
              <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#781D35]" strokeWidth={1.5} /><span>{bullet}</span>
            </li>)}
          </ul> : null}
        </section>)}
        <div className="border-l-2 border-[#781D35] bg-[#F3F9FD] p-6">
          <p className="text-sm leading-7 text-[#4D6373]">Dyasse Shop sells downloadable crochet instructions, not finished items. The exact materials, pattern sizes and construction details vary by design. Read the linked product page before buying supplies.</p>
        </div>
        <Link href="/guides/crochet-patterns-for-beginners" className="inline-flex items-center gap-2 font-semibold text-[#781D35] underline underline-offset-4">
          <BookOpen size={17}/> How to read crochet PDF patterns <ArrowUpRight size={15}/>
        </Link>
      </div>
      <aside className="self-start border border-[#DCEAF2] bg-[#F7FBFE] p-6 lg:sticky lg:top-32">
        <h2 className="font-serif text-2xl">Explore related patterns</h2>
        <p className="mt-3 text-sm leading-7 text-[#5B6E7A]">Product pages include the design photos, digital delivery details and materials noted by the pattern maker.</p>
        <nav aria-label="Products and collections mentioned in this guide" className="mt-5 grid gap-3">
          {related.map(item => <Link key={item.href} href={item.href} className="border border-[#DBEAF2] bg-white p-4 hover:border-[#B9D0DD]">
            <span className="flex items-start justify-between gap-2 text-[14px] font-bold text-[#781D35]">{item.label}<ArrowUpRight size={16} className="shrink-0" /></span>
            <span className="mt-2 block text-xs leading-5 text-[#526775]">{item.context}</span>
          </Link>)}
        </nav>
        <Link href="/collections/crochet-patterns" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#405669]"><ArrowLeft size={15}/> See all crochet patterns</Link>
      </aside>
    </div>
  </article>
}
