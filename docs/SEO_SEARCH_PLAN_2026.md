# Dyasse Shop: organic search plan (24 October 2026)

This is a **search-intent map**, not a claim of search volume, ranking, traffic, or competitor difficulty. Validate demand later using Google Search Console, Google Trends and a keyword data provider. Avoid automatically publishing all 177 imported drafts.

## Existing catalog (Supabase, 24 Oct 2026)

| Source category | Products | Search intent |
|---|---:|---|
| Crochet baby footwear | 51 | crochet baby booties pattern; crochet baby shoes PDF; baby sandals crochet pattern |
| Knitting | 29 | knitting patterns PDF; knitted headband pattern; cable knit hat pattern; knitted scarf pattern |
| Crochet keychains | 28 | crochet keychain pattern; mini crochet charm PDF; crochet gift pattern |
| Crochet bags & cases | 25 | crochet bag pattern PDF; crochet clutch pattern; crochet pouch pattern |
| Crochet wearables | 12 | crochet accessory patterns; crochet wearables PDF |
| Other crochet | 12 | crochet PDF patterns; specific product/title long tails |
| Crochet toys & decor | 10 | amigurumi crochet pattern; crochet plush PDF; small crochet decor |
| Beaded bags | 7 | beaded bag pattern; beaded purse tutorial |
| Verify item type | 3 | **Do not keyword-target as a specific craft until item type is verified** |

Total: **177**, currently 0 approved/live products. Categories overlap by topic and are not additive as ranking targets.

## Primary pages and keyword targets

| Page | Primary target | Secondary long-tail / search intent |
|---|---|---|
| / | crochet and knitting PDF patterns | digital crochet patterns, knitting pattern downloads |
| /collections/crochet-patterns | crochet patterns PDF | crochet gift patterns, digital crochet instructions |
| /collections/knitting-patterns | knitting patterns PDF | knit headband PDF, cable knitting patterns |
| /collections/baby-shoes | crochet baby booties pattern | baby crochet sandals, crochet baby sneakers |
| /collections/keychains | crochet keychain patterns | mini crochet patterns, keychain PDF |
| /collections/crochet-bags | crochet bag pattern PDF | crochet clutch, crochet coin purse PDF |
| /collections/amigurumi | amigurumi crochet patterns | crochet plush pattern, crochet toy PDF |
| /collections/crochet-accessories | crochet accessories patterns | wearable crochet PDF |
| /collections/beaded-bags | beaded bag patterns | beaded purse pattern, beaded evening bag |
| /guides/crochet-patterns-for-beginners | how to read crochet patterns | US vs UK crochet abbreviations, crochet stitch counts |
| /guides/knitting-patterns-for-beginners | how to read knitting patterns | knitting abbreviations, knitting cable symbols, gauge |

## On-page SEO standard for each released product

- Single descriptive H1 taken from the actual product title; accurate search title and natural-language meta description; self-canonical URL.
- Original project details, accurate gauge/materials/finished sizing/skill expectations **only when confirmed by the PDF and QA**. Never fabricate a gauge, size, skill rating, tutorial photos, reviews, or finished sample.
- Crawlable links to a relevant collection, the pattern reading guide and up to four genuinely related approved products.
- Helpful image alt text identifying the actual item. Add product-specific original gallery photos, image sizes and file names where possible; verify rights and image-to-PDF match.
- Structured data: Product and BreadcrumbList using verified facts. **Do not publish Offer prices until catalog price/currency match real Gumroad checkout.** Etsy shop-wide reviews are not ratings for each individual product.
- Etsy-migration descriptions must be manually checked for wrong download/channel claims ("download from Etsy"), technique inconsistencies and generic duplicate copy. Unique text should describe genuine distinguishing features confirmed by instructions.
- SEO metadata fields may be customized per listing in admin; fallback is product-specific, derived from verified stored fields.

## Launch blockers and release order

1. Verify **dyasse.com** domain ownership and configure DNS only after explicit authorization; keep the existing staging hostname noindex/disallowed.
2. Verify every released PDF, file version, image/photo alignment, instructions, pricing and currency; finish the Gumroad draft, upload the PDF, conduct a test purchase and check delivery.
3. Mark `qa_verified=true` with evidence and publish only selected verified products. The database is designed to enforce checks before `is_published=true`.
4. Search Console: verify dyasse.com, submit `https://dyasse.com/sitemap.xml`; inspect `robots.txt`, sitemap count, canonical, mobile content and Indexing reports.
5. Test live pages in Google's Rich Results Test; run mobile performance audits and review Core Web Vitals before scale.
6. Track actual clicks/impressions per query/URL and improve low-CTR page titles and weak category content. No guarantees of #1 positions or estimated volumes.

## Post-launch editorial roadmap (research first)

- Crochet baby booties: choosing yarn, understanding sole size and gauge (informational; link to checked baby footwear patterns)
- How to choose a crochet bag construction (materials, lining, dimensions; links to real matching products)
- Crochet keychain hardware, attachment safety and finishing methods
- Reading amigurumi rounds, increases, decreases and stuffing
- Knitted headband sizing, negative ease and garter vs ribbed stitch
- Cable knitting symbol and crown shaping guide
- Common digital PDF download problems and how to resolve them

Write genuinely useful, illustrated and tested guidance. Do not generate dozens of thin keyword-variation pages or make claims unsupported by the product PDFs.

## Relevant references

- Google Search Central: https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure
- URLs and canonical: https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites
- Product markup: https://developers.google.com/search/docs/appearance/structured-data/product
- Titles: https://developers.google.com/search/docs/appearance/title-link
