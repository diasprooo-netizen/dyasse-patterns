# Dyasse Shop: independent-store content and Search quality recovery
Audit snapshot: 27 November 2026

## Evidence, not assumptions
- Current production data contains 177 products; 172 are marked published and QA-approved.
- Among these 172, 105 imported **display titles** contain comma-separated marketplace-style phrases.
- All 172 have a separate non-comma SEO title and a meta description. Do **not** claim they lack SEO titles.
- All 172 descriptions have at least 350 characters, and exact text matching found no identical descriptions **within this catalog**. This does not rule out overlap with listings on external sites.
- A highly visible homepage module selected 12 five-star reviews from the owner's older Etsy export. It explicitly disclaimed that the selection was not the overall shop rating; nonetheless, it was unsuitable as the trust foundation for this independent storefront.
- One published product, `mini-crochet-heart-ring-keychain-pdf-pattern-tiny-bag-charm`, told buyers to download through Etsy. This sentence was corrected in Supabase on 27 November 2026 to give provider-specific Dyasse/Gumroad directions.
- About page previously provided generic brand copy. No real founder identity or in-person test evidence should be invented.
- Google Search Console previously showed a large discovered/crawled-not-indexed group. It did **not** prove a manual action. Always confirm under GSC Manual Actions before claiming a penalty.

## Changes in this branch (phase 1)
1. Replace the curated Etsy five-star homepage section with a clear, factual explanation of digital format, what to check before paying, order-eligible site reviews, and how to contact support.
2. Use each product's *already-curated separate SEO title* as the on-site H1, catalog-card name, structured Product name, breadcrumb label, and fallback image alt text. Keep existing product URLs, checkout IDs, database titles and payment details intact.
3. Add hand-authored, design-specific buying notes, practical checklists and two real buyer Q&As to eight flagship designs. Notes are based on existing listing information; they do not claim complete physical test results.
4. Clarify real listing review/support practices on the About page without inventing a founder bio, customer reviews or pattern-testing credentials.
5. Mark the decorative letter in the brand mark as aria-hidden so accessible brand text is not read as “ddyasse”.
6. Replace the homepage category stock imagery with verified photos already hosted on dyasse.com where a truthful design/category match exists. Use decorative own-site gradients where matching local photography is not yet confirmed.

## Intentionally deferred
- **No bulk `noindex`** based on a 350-word rule. Google has no such per-product minimum. Blanket noindex while the site's index coverage is weak can hide valuable pages.
- No wholesale automatic rewriting of 172 PDFs' technical claims. Descriptions and yarn, hook, finished size and gauge values require matching to the actual PDF and, ideally, sample testing. Randomly invented specs and 172 paraphrased AI templates would create the very quality problem we seek to avoid.
- No fake rating or AggregateRating schema.
- Do not change `robots.txt`, existing product permalinks or canonical URLs without a demonstrated technical fault.
- The separate self-hosting media migration is tracked in **PR #58**. This PR does not silently move or rename image objects.

## Independent editorial rollout (next batches)
- First prioritize the URLs Google actually crawled but chose not to index, then flagship products with strong, verified source files.
- For each product, check the original PDF: exact finished dimensions, material list, hook/needle size, terminology, page count, safety details, size mapping and any images. Only publish claims that the PDF supports.
- Produce a specific short introduction, a concise specs block based on PDF evidence, sizing or maker tips where genuine, and clear post-purchase support. Preserve any important cautions from the original description.
- Avoid copying Etsy description paragraphs verbatim, but do **not** treat all shared catalogue information as a spam violation: a seller can describe the same product in multiple shops. Add actual, on-site buyer value.
- Compare 5–10 changed URLs in GSC URL Inspection after publishing and monitor indexed URLs, impressions, CTR and purchase conversion. Indexing is not guaranteed or immediate.

## Acceptance checks
- Vercel preview build reaches READY for this exact commit.
- Home has no 12-review curated marketplace slider and contains straightforward trust/help information.
- Product cards, H1, social descriptions, breadcrumbs and Product schema use readable titles for the eight editorial examples and other selected designs; URL slugs remain unchanged.
- Homepage category images are all dyasse.com-owned or decorative CSS, no Pexels dependencies.
- Unpublished previews remain noindex.
- Actual Supabase `products` price, publish flags, PDF links and existing canonical settings are unchanged by this PR.
