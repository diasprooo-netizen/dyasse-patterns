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
  return (
    <section aria-labelledby="etsy-reviews-title" className="relative overflow-hidden border-y border-[#E8D9EB] bg-[linear-gradient(115deg,#FFF5F3_0%,#F8EDFC_58%,#EDF2FF_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#B54865]">WORDS FROM OUR ETSY CUSTOMERS</p>
            <h2 id="etsy-reviews-title" className="mt-4 max-w-2xl font-serif text-[clamp(2.65rem,5vw,4.4rem)] leading-[1.08] tracking-[-.045em] text-[#1F3356]">
              A few kind words from <em className="font-normal text-[#D55367]">real makers.</em>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#5C6C86]">
              Twelve selected five-star reviews from customers who purchased through our Etsy shop.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#E4D7E6] bg-white/85 px-5 py-4 shadow-[0_7px_25px_rgba(26,45,75,.04)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCE6E9] text-[#C74D62]"><Quote size={24} aria-hidden="true"/></span>
            <div>
              <p className="text-sm font-extrabold text-[#233958]">From our Etsy shop</p>
              <p className="text-xs font-medium text-[#7484A0]">Past customer feedback</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review,index)=>(
            <figure key={review.reviewer+review.date} className="flex min-h-[235px] flex-col rounded-[22px] border border-[#E6DEEC] bg-white/95 p-6 shadow-[0_8px_28px_rgba(28,45,83,.045)] transition-shadow hover:shadow-[0_18px_38px_rgba(28,45,83,.08)]">
              <div role="img" aria-label="5 out of 5 stars" className="flex gap-1 text-[#EBA047]">
                {Array.from({length:5},(_,i)=><Star key={i} size={17} fill="currentColor" strokeWidth={1.3} aria-hidden="true"/>)}
              </div>
              <blockquote className="mt-5 flex-1 whitespace-pre-wrap text-[14px] leading-7 text-[#30425D]">“{review.message}”</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-[#EDF0F4] pt-4">
                <span className="min-w-0 truncate text-[13px] font-extrabold text-[#263B5C]">{review.reviewer}</span>
                <time dateTime={review.date.slice(6)+'-'+review.date.slice(0,2)+'-'+review.date.slice(3,5)} className="shrink-0 text-[11px] font-medium text-[#8492A7]">
                  {review.date}
                </time>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-center text-xs leading-6 text-[#687993]">
          Selected five-star Etsy reviews, reproduced from the original export. This is not a storewide average rating.
          Feedback relates to prior Etsy purchases, not orders placed on dyasse.com.
        </p>
      </div>
    </section>
  )
}
