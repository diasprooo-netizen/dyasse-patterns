import { Quote, Star } from 'lucide-react'

type EtsyReview = { reviewer: string; date: string; message: string }

/**
 * Twelve selected real five-star reviews copied verbatim from the owner's
 * Etsy reviews export dated October 2026. Dates and reviewer display names
 * are preserved. Order IDs and private customer/order data are excluded.
 *
 * Do not render an aggregate rating or claim these reviews were collected
 * on the Dyasse website. This is a curated five-star selection.
 */
const reviews: readonly EtsyReview[] = [
  {
    "reviewer": "Michelle and Steve",
    "date": "10/07/2026",
    "message": "Great pattern, easy to follow"
  },
  {
    "reviewer": "Peggy",
    "date": "10/04/2026",
    "message": "Easy pattern. Helpful owner. Great service."
  },
  {
    "reviewer": "Julie",
    "date": "09/29/2026",
    "message": "Great pattern easy to read and quick to make"
  },
  {
    "reviewer": "Karen",
    "date": "09/18/2026",
    "message": "5* customer service. Pattern updated now and communication with seller was excellent"
  },
  {
    "reviewer": "Emunah",
    "date": "09/07/2026",
    "message": "I had a concern and it was handled beyond normal customer service with efficiency like if I were buying a  $200 item. I rarely receive that kind of beyond service, yet this seller provided this experience. Thank you!"
  },
  {
    "reviewer": "TerryC",
    "date": "08/25/2026",
    "message": "Easy pattern and what I was looking for, also a great gift!"
  },
  {
    "reviewer": "Cerise",
    "date": "08/17/2026",
    "message": "Couldn't download  pattern so contacted seller and issue was resolved quickly, Thankyou. Excellent product from an excellent seller."
  },
  {
    "reviewer": "Farrah",
    "date": "07/30/2026",
    "message": "Very easy to follow and cute end product."
  },
  {
    "reviewer": "Mackenzie",
    "date": "07/20/2026",
    "message": "Easy to follow and worked out well for slightly larger yarn!"
  },
  {
    "reviewer": "Beatrice",
    "date": "07/15/2026",
    "message": "Super service and very quick reply to my question!"
  },
  {
    "reviewer": "Priscilla Medina",
    "date": "06/11/2026",
    "message": "Instructions are very detailed easy to follow."
  },
  {
    "reviewer": "Julie",
    "date": "05/18/2026",
    "message": "Beautiful pattern, easy to follow instructions. Responsive seller. Very happy with my purchase!"
  }
]

export function EtsyTestimonials() {
 return <section aria-labelledby="etsy-reviews-title" className="border-y border-[#DCEAF2] bg-[#EAF6FC]">
   <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
     <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_.5fr] lg:items-end">
       <div>
         <p className="dyasse-eyebrow">FROM OUR EARLIER ETSY SHOP</p>
         <h2 id="etsy-reviews-title" className="mt-5 max-w-2xl font-serif text-[clamp(2.7rem,5vw,4.3rem)] leading-[1.08] tracking-[-.055em] text-[#172231]">
           Words from people who <em className="font-normal text-[#781D35]">made it.</em>
         </h2>
         <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#66717C]">A hand-picked selection of twelve genuine five-star reviews from past customers of our Etsy shop.</p>
       </div>
       <div className="flex items-center gap-4 border-t border-[#E6DCD2] pt-5 lg:ml-auto lg:mt-0">
         <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#781D35]"><Quote size={20} strokeWidth={1.4}/></span>
         <span><span className="block text-[13px] font-bold text-[#354655]">Past Etsy buyer feedback</span><span className="mt-1 block text-xs text-[#7D8586]">Selected reviews, not a storewide rating</span></span>
       </div>
     </div>
     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
       {reviews.map(review=><figure key={review.reviewer+review.date} className="flex min-h-[216px] flex-col border border-[#DCEAF2] bg-white p-6 sm:p-7">
         <div role="img" aria-label="5 out of 5 stars" className="flex gap-1 text-[#781D35]">
           {Array.from({length:5},(_,i)=><Star key={i} size={15} fill="currentColor" strokeWidth={1} aria-hidden="true"/>)}
         </div>
         <blockquote className="mt-5 flex-1 whitespace-pre-wrap text-[14px] leading-7 text-[#414F59]">“{review.message}”</blockquote>
         <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-[#E7EEF3] pt-4">
           <span className="min-w-0 truncate text-[13px] font-bold text-[#354656]">{review.reviewer}</span>
           <time dateTime={review.date.slice(6)+'-'+review.date.slice(0,2)+'-'+review.date.slice(3,5)} className="shrink-0 text-[11px] text-[#868785]">{review.date}</time>
         </figcaption>
       </figure>)}
     </div>
     <p className="mt-8 max-w-3xl text-xs leading-6 text-[#586D7B]">
       Original texts from our Etsy reviews export. These twelve selected five-star reviews are not an overall shop rating and do not represent purchases made through the new Dyasse website.
     </p>
   </div>
 </section>
}
