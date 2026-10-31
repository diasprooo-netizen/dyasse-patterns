import Link from 'next/link'
import type { Metadata } from 'next'
import { safeJsonLd, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
 title:'How to Read a Knitting Pattern PDF: Rows & Abbreviations',
 description:'Learn how to read a knitting pattern PDF, decode K/P and cable abbreviations, follow a worked row-by-row example, and check stitch counts and gauge.',
 alternates:{canonical:'/guides/knitting-patterns-for-beginners'},
 openGraph:{type:'article',title:'How to Read Knitting Patterns: Beginner PDF Guide',description:'Understand a knitting PDF with clear abbreviations, a counted row-by-row example, cable guidance and gauge checks.',url:'/guides/knitting-patterns-for-beginners'},
}
const terms=[
 ['CO','Cast on: make the initial stitches on your needles.'],
 ['K / P','Knit and purl stitches, the building blocks of many textures.'],
 ['RS / WS','Right side and wrong side of the fabric.'],
 ['st(s)','Stitch or stitches.'],
 ['rep','Repeat the specified stitch sequence or rows.'],
 ['K2tog','Knit two together, a right-leaning decrease in many contexts.'],
 ['SSK','Slip, slip, knit: a common left-leaning decrease.'],
 ['BO / cast off','Bind off or cast off, to secure live stitches at the end.'],
]
const steps=[
 ['Check the needle and yarn specifications','A pattern may require both a specific needle size and a yarn weight. Substitution may affect fit and drape.'],
 ['Measure your gauge','Work a swatch in the specified stitch pattern. Count stitches and rows over the stated measurement before starting size-sensitive work.'],
 ['Check whether rows alternate','Garter stitch worked flat is normally knit on every row; stockinette worked flat typically alternates knit and purl rows.'],
 ['Follow cable directions precisely','Cable notation varies. Use the pattern’s own legend for held stitches, needle position and cable direction.'],
 ['Read the finished measurements','Size labels can vary. Check the finished circumference or length and the intended ease when provided.'],
]
export default function KnittingGuide(){
 const url=SITE_URL+'/guides/knitting-patterns-for-beginners'
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'Article',headline:'How to Read a Knitting Pattern PDF: A Beginner Guide',description:metadata.description,url,mainEntityOfPage:url,author:{'@type':'Organization',name:'Dyasse Shop'},publisher:{'@type':'Organization',name:'Dyasse Shop'}},
  {'@type':'BreadcrumbList',itemListElement:[
   {'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},
   {'@type':'ListItem',position:2,name:'Pattern guides',item:SITE_URL+'/guides'},
   {'@type':'ListItem',position:3,name:'How to read knitting patterns',item:url},
  ]}
 ]}
 return <article className="bg-[#FFFDFD] text-[#223755]">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(schema)}}/>
  <header className="bg-[linear-gradient(115deg,#E1F0E8,#E8E5F8,#F9E9DF)] px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto max-w-4xl">
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs font-semibold text-[#5D667A]"><Link href="/">Home</Link><span>/</span><Link href="/guides">Pattern guides</Link><span>/</span><span>Beginner guide</span></nav>
    <p className="mt-10 text-xs font-extrabold uppercase tracking-[.2em] text-[#657B92]">KNITTING LEARNING CENTRE</p>
    <h1 className="mt-5 font-serif text-[clamp(3rem,6vw,5rem)] leading-[1.07] tracking-[-.05em]">How to read a knitting pattern PDF</h1>
    <p className="mt-7 max-w-3xl text-[17px] leading-9 text-[#5F687E]">Follow written knitting instructions step by step: learn abbreviations, count stitches, work row repeats and understand what the diagrams in a downloadable PDF mean.</p>
  </div></header>
  <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
   <div className="space-y-12 text-[15px] leading-8 text-[#5B6779]">
    <section><h2 className="font-serif text-3xl text-[#243A59]">Read the project notes first</h2>
      <p className="mt-4">Check yarn weight, recommended needles, gauge, finished dimensions and any required accessories. Read the whole construction overview before casting on, particularly if the garment is worked sideways or in the round. If your pattern includes several sizes, mark the numbers for your size throughout.</p>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Useful knitting abbreviations</h2>
      <p className="mt-4">These are widely used knitting terms, but the designer’s key and chart notes always take priority.</p>
      <dl className="mt-6 divide-y divide-[#E6DDE5] overflow-hidden rounded-2xl border border-[#E6DDE5] bg-white">
       {terms.map(([term,meaning])=><div key={term} className="grid gap-1 px-5 py-4 sm:grid-cols-[110px_1fr]"><dt className="font-extrabold text-[#4C7980]">{term}</dt><dd>{meaning}</dd></div>)}
      </dl>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Rows, rounds and cable charts</h2>
      <p className="mt-4">Flat knitting is worked back and forth in rows. In the round, most techniques are worked continuously on the right side, so stitch instructions may change. Charts may be read in different directions depending on whether the work is flat or circular: use the chart key supplied with that pattern.</p>
      <p className="mt-4">Cable abbreviations such as C4F or C6B depend on the number of stitches and whether held stitches sit in front or behind the work. Never substitute cable moves based on the image alone; follow the written legend.</p>
    </section>
    <section aria-labelledby="knitting-pdf-example"><h2 id="knitting-pdf-example" className="font-serif text-3xl text-[#243A59]">How to read a knitting pattern PDF, row by row</h2>
      <p className="mt-4">Here is a small teaching example, not a finished Dyasse product pattern. The stitch count in parentheses tells you how many stitches should be on the needle when the row is complete.</p>
      <div className="mt-5 space-y-3 rounded-2xl border border-[#C7DFEB] bg-white p-6 font-mono text-[13px] leading-7 text-[#26394B]">
        <p><strong>CO 16 sts.</strong> Begin with sixteen stitches on the needle.</p>
        <p><strong>Row 1 (RS): K across. (16 sts)</strong> Knit all sixteen stitches.</p>
        <p><strong>Row 2 (WS): P across. (16 sts)</strong> Turn the work and purl all sixteen stitches.</p>
        <p><strong>Rep Rows 1–2 three more times.</strong> You have now worked eight rows in total, not six.</p>
        <p><strong>Row 9 (RS): K2tog, K12, K2tog. (14 sts)</strong> Each K2tog turns two stitches into one: sixteen stitches become fourteen.</p>
      </div>
      <p className="mt-4">The abbreviations describe <em>what to do</em>; the numbers confirm <em>whether you did it correctly</em>. If the count is not fourteen after Row 9, stop before starting the next row and recount the stitches.</p>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Reading a PDF on your phone or from a printout</h2>
      <p className="mt-4">On a small screen, zoom in on the written stitch key before reading a chart. Keep the abbreviation legend visible while following rows, and mark your current row on a personal copy or printout. If the PDF contains instructions for several sizes, highlight only your size; numbers in parentheses often correspond to different sizes, not additional stitches.</p>
      <p className="mt-4">Check whether charts start at the bottom right and whether right-side and wrong-side rows are shown. Chart conventions vary between patterns, especially for flat knitting versus working in the round. The PDF’s own legend always takes precedence over a general tutorial.</p>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Quick questions about knitting PDF instructions</h2>
      <div className="mt-5 space-y-5">
        <div><h3 className="font-bold text-[#263E60]">What does an asterisk (*) mean in a knitting pattern?</h3><p className="mt-1">It normally marks the beginning of a repeated sequence. Follow the instruction that says where the repeat ends and how many times to work it, including any stitches outside the repeat.</p></div>
        <div><h3 className="font-bold text-[#263E60]">What if the row stitch count is wrong?</h3><p className="mt-1">Count stitches again, check whether an increase or decrease was missed, and compare the expected count at the end of that specific row. Do not continue shaping until the count agrees.</p></div>
        <div><h3 className="font-bold text-[#263E60]">Is a knitting PDF the finished item?</h3><p className="mt-1">No. A knitting PDF is a digital instruction document. The finished hat, scarf, yarn and needles are not included unless a listing explicitly describes something different.</p></div>
      </div>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Five checks before starting</h2>
      <div className="mt-5 grid gap-4">{steps.map(([heading,detail])=><div key={heading} className="rounded-xl border border-[#E7DEEA] bg-[#FAF8FC] px-5 py-4"><h3 className="font-bold text-[#263E60]">{heading}</h3><p className="mt-1">{detail}</p></div>)}</div>
    </section>
    <section><h2 className="font-serif text-3xl text-[#243A59]">Troubleshooting a pattern</h2>
      <p className="mt-4">If the size or texture is unexpected, compare your stitch count and gauge to the pattern’s checkpoints. For cable projects, check that stitches were held in the correct position. If instructions and the pictured design disagree, ask the seller about the exact row and repeat. A well-written pattern should make the construction reproducible, not depend on guesswork.</p>
    </section>
   </div>
   <aside className="self-start rounded-[25px] border border-[#E8DFEB] bg-[#F4F7FA] p-7 lg:sticky lg:top-32">
    <h2 className="font-serif text-2xl">Find your next knit</h2>
    <p className="mt-3 text-sm leading-7 text-[#68758A]">Choose a project by style, materials and the techniques you want to practise.</p>
    <nav aria-label="Related knitting resources" className="mt-6 grid gap-3 text-sm font-bold text-[#385A89]">
      <Link href="/guides">All crochet and knitting guides →</Link>
      <Link href="/collections/knitting-patterns">Knitting PDF patterns (when available) →</Link>
      <Link href="/collections/crochet-patterns">Crochet patterns →</Link>
      <Link href="/guides/crochet-patterns-for-beginners">How to read crochet patterns →</Link>
      <Link href="/faq">PDF download help →</Link>
    </nav>
   </aside>
  </div>
 </article>
}
