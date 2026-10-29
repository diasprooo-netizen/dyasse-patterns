import Link from 'next/link'
import type { Metadata } from 'next'
import { safeJsonLd, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
 title:'How to Read Crochet Patterns: Beginner PDF Guide',
 description:'Learn crochet pattern abbreviations, gauge, stitch counts, rounds and rows. A clear beginner guide to reading crochet PDF instructions before you start.',
 alternates:{canonical:'/guides/crochet-patterns-for-beginners'},
 openGraph:{type:'article',title:'How to Read Crochet Patterns: Beginner PDF Guide',description:'Understand crochet instructions, abbreviations, gauge and stitch counts before starting a PDF pattern.',url:'/guides/crochet-patterns-for-beginners'},
}

const terms=[
 ['ch','Chain: creates a foundation or a space in a project.'],
 ['sc','Single crochet in US terminology; called double crochet in UK terminology.'],
 ['hdc','Half double crochet in US terminology.'],
 ['dc','Double crochet in US terminology; called treble crochet in UK terminology.'],
 ['sl st','Slip stitch: often used to join rounds or move along stitches.'],
 ['inc','Increase: typically work more than one stitch in the specified location; follow the pattern definition.'],
 ['dec','Decrease: combine stitches to reduce the stitch count; the method depends on the pattern.'],
 ['BLO / FLO','Work into the back loop only / front loop only of the stitch.'],
]
const checks=[
 ['Check US or UK terms','The same abbreviation can refer to different stitches across conventions. Always follow the pattern glossary.'],
 ['Read the materials first','Note the hook, yarn weight, notions and any requested substitutes before buying supplies.'],
 ['Make a gauge swatch when sizing matters','Yarn, tension and hook choice affect dimensions; follow the listed gauge where provided.'],
 ['Track stitch counts','Numbers at the end of a row or round are checkpoints. Count after increases, decreases and joins.'],
 ['Look for working method','A continuous spiral and joined rounds are constructed differently. Use a marker when appropriate.'],
 ['Understand what you buy','A PDF pattern is an instruction document; the yarn and finished object are not included.'],
]
export default function CrochetGuide(){
 const url=SITE_URL+'/guides/crochet-patterns-for-beginners'
 const schema={'@context':'https://schema.org','@graph':[
 {'@type':'Article',headline:'How to Read Crochet Patterns: A Beginner Guide',description:metadata.description,url,mainEntityOfPage:url,author:{'@type':'Organization',name:'Dyasse Shop'},publisher:{'@type':'Organization',name:'Dyasse Shop'}},
 {'@type':'BreadcrumbList',itemListElement:[
  {'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},
  {'@type':'ListItem',position:2,name:'Crochet patterns',item:SITE_URL+'/collections/crochet-patterns'},
  {'@type':'ListItem',position:3,name:'How to read crochet patterns',item:url},
 ]}
 ]}
 return <article className="bg-[#FFFDFD] text-[#223755]">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(schema)}}/>
  <header className="bg-[linear-gradient(115deg,#FCE8DE,#F4DEEC,#E9E8FF)] px-5 py-16 sm:px-8 lg:py-24">
   <div className="mx-auto max-w-4xl">
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs font-semibold text-[#6A5971]"><Link href="/">Home</Link><span>/</span><Link href="/collections/crochet-patterns">Crochet patterns</Link><span>/</span><span>Beginner guide</span></nav>
    <p className="mt-10 text-xs font-extrabold uppercase tracking-[.2em] text-[#B35767]">CROCHET LEARNING CENTRE</p>
    <h1 className="mt-5 font-serif text-[clamp(3rem,6vw,5rem)] leading-[1.07] tracking-[-.05em]">How to read a crochet pattern</h1>
    <p className="mt-7 max-w-3xl text-[17px] leading-9 text-[#5F627A]">A beginner-friendly guide to crochet pattern abbreviations, row and round instructions, stitch counts and choosing the right PDF project.</p>
   </div>
  </header>
  <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
   <div className="space-y-12 text-[15px] leading-8 text-[#5B6779]">
    <section><h2 className="font-serif text-3xl text-[#243A59]">Start with the pattern overview</h2>
      <p className="mt-4">Before the first stitch, look for the pattern’s terminology (US or UK), yarn and hook requirements, finished dimensions, construction method and skill level. A trustworthy PDF should explain what item you are making and which supplies are needed. If a listing lacks essential sizing or gauge information, ask before buying.</p>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Common crochet abbreviations</h2>
      <p className="mt-4">These are common US-style abbreviations. Your pattern’s own glossary takes priority, especially when it uses special stitches or UK terminology.</p>
      <dl className="mt-6 divide-y divide-[#E6DDE5] overflow-hidden rounded-2xl border border-[#E6DDE5] bg-white">
       {terms.map(([term,meaning])=><div key={term} className="grid gap-1 px-5 py-4 sm:grid-cols-[110px_1fr]"><dt className="font-extrabold text-[#B64F69]">{term}</dt><dd>{meaning}</dd></div>)}
      </dl>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">How rows, rounds and repeats work</h2>
      <p className="mt-4">Rows turn the work at the end unless directed otherwise. Rounds may be joined with a slip stitch or worked continuously in a spiral. A pattern may write a repeat as <strong className="text-[#293F5E]">[sc, inc] × 6</strong>, which means work the bracketed sequence six times. Do not assume how many stitches this creates: read the definitions for the specific project and check its stated end-of-round count.</p>
      <p className="mt-4">Use a stitch marker to find the start of a round, particularly for amigurumi. If a count is unclear, recount before continuing: small early differences compound in shaped pieces.</p>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Checklist before choosing a PDF pattern</h2>
      <div className="mt-5 grid gap-4">{checks.map(([heading,detail])=><div key={heading} className="rounded-xl border border-[#E7DEEA] bg-[#FAF8FC] px-5 py-4"><h3 className="font-bold text-[#263E60]">{heading}</h3><p className="mt-1">{detail}</p></div>)}</div>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">If the finished piece looks different</h2>
      <p className="mt-4">Check gauge and yarn size first, then compare the count and construction direction at the last matching row or round. Keep a note of your hook size and any modifications. If the written steps genuinely conflict with the listing or counts, contact the seller with the pattern title and exact row or round before proceeding.</p>
    </section>
   </div>
   <aside className="self-start rounded-[25px] border border-[#E8DFEB] bg-[#F7F2FA] p-7 lg:sticky lg:top-32">
    <h2 className="font-serif text-2xl">Explore patterns</h2>
    <p className="mt-3 text-sm leading-7 text-[#68758A]">Find a project with materials and construction details that fit your skill and supplies.</p>
    <nav aria-label="Related crochet collections" className="mt-6 grid gap-3 text-sm font-bold text-[#385A89]">
      <Link href="/collections/crochet-patterns">All crochet PDF patterns →</Link>
      <Link href="/collections/baby-shoes">Crochet baby booties →</Link>
      <Link href="/collections/crochet-bags">Crochet bag patterns →</Link>
      <Link href="/collections/keychains">Crochet keychain patterns →</Link>
      <Link href="/guides">More crochet project guides →</Link>
      <Link href="/faq">Download & pattern support →</Link>
    </nav>
   </aside>
  </div>
 </article>
}
