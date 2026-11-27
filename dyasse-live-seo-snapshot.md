# dyasse.com - live production SEO snapshot

**Captured:** 2026-11-27 20:05:54 UTC
**Method:** REAL curl from a GitHub Actions Linux runner; redirects followed with -L and response bodies saved without running client-side JavaScript. Both User-Agents below are explicitly set with curl -A. HTTPS TLS verification enabled.
**Browser User-Agent:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/158.0.0.0 Safari/537.36`
**Googlebot User-Agent (simulated, not authenticated Google crawler IP):** `Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`
**Scope:** codebase checkout on isolated audit branch, live production HTML, and Supabase read-only totals fetched earlier in this same audit.

## 1. Live HTTP Status, Redirect Chains & Response Headers

Every row is a separate curl request; each HTTP chain includes all status hops, and Location values are transcribed from the chain headers. Cloudflare ray values are request-specific. Missing header = dash.
| UA | URL | HTTP chain | Location targets | server | cf-ray | CF challenge | x-robots-tag | content-type | cache-control | cf-cache-status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browser | http://dyasse.com/ | 308 -> 200 | https://dyasse.com/ | cloudflare | a613c017a87fc8b8-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | http://dyasse.com/ | 308 -> 200 | https://dyasse.com/ | cloudflare | a613c01768c2e5fc-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://www.dyasse.com/ | 308 -> 200 | https://dyasse.com/ | cloudflare | a613c017dca59ad5-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://www.dyasse.com/ | 308 -> 200 | https://dyasse.com/ | cloudflare | a613c0187900d6af-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/ | 200 | — | cloudflare | a613c0174e03f704-EWR | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/ | 200 | — | cloudflare | a613c0172ce4d5ea-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf | 200 | — | cloudflare | a613c025d8b3c5c0-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf | 200 | — | cloudflare | a613c0260ec1c6d7-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download | 200 | — | cloudflare | a613c026f93642d0-EWR | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download | 200 | — | cloudflare | a613c0274af29bd3-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/collections/crochet-bags | 200 | — | cloudflare | a613c02a6f8c5612-EWR | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/collections/crochet-bags | 200 | — | cloudflare | a613c02c29794232-EWR | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/guides/crochet-patterns-for-beginners | 200 | — | cloudflare | a613c02d6b01447a-EWR | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/guides/crochet-patterns-for-beginners | 200 | — | cloudflare | a613c02dcfa5c10e-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/our-story | 404 | — | cloudflare | a613c02eaf759aa4-EWR | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/our-story | 404 | — | cloudflare | a613c02e78a8c56a-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/faq | 200 | — | cloudflare | a613c02f59383944-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/faq | 200 | — | cloudflare | a613c02f7d8c0143-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/robots.txt | 200 | — | cloudflare | a613c02fc800acd7-EWR | — | — | text/plain | public, max-age=14400, must-revalidate | EXPIRED |
| Googlebot | https://dyasse.com/robots.txt | 200 | — | cloudflare | a613c02fd99c416e-IAD | — | — | text/plain | public, max-age=14400, must-revalidate | EXPIRED |
| Browser | https://dyasse.com/sitemap.xml | 200 | — | cloudflare | a613c0304ba67f1d-EWR | — | — | application/xml | public, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/sitemap.xml | 200 | — | cloudflare | a613c0305bc5ad11-IAD | — | — | application/xml | public, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/cart | 200 | — | cloudflare | a613c0308bb5ebc5-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/cart | 200 | — | cloudflare | a613c030cb7bbacb-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/account | 404 | — | cloudflare | a613c031db81177e-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/account | 404 | — | cloudflare | a613c032099bbae3-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/account/login | 200 | — | cloudflare | a613c0328faf427c-EWR | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/account/login | 200 | — | cloudflare | a613c032ae47e604-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/favorites | 200 | — | cloudflare | a613c0337d36ef5e-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/favorites | 200 | — | cloudflare | a613c033baea9841-EWR | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/studio-preview | 200 | — | cloudflare | a613c037cc545f91-EWR | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/studio-preview | 200 | — | cloudflare | a613c037eb7553e3-IAD | — | — | text/html; charset=utf-8 | private, no-cache, no-store, max-age=0, must-revalidate | DYNAMIC |
| Browser | https://dyasse.com/checkout | 307 | — | cloudflare | a613c0384c39f30f-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |
| Googlebot | https://dyasse.com/checkout | 307 | — | cloudflare | a613c038ecb5cbe6-IAD | — | — | text/html; charset=utf-8 | public, max-age=0, must-revalidate | DYNAMIC |

## 2. Live `robots.txt` & `sitemap.xml` Audit

**FULL raw browser `robots.txt`:**
```text
User-Agent: *
Allow: /
Disallow: /admin
Disallow: /account
Disallow: /api
Disallow: /auth
Disallow: /auth-debug
Disallow: /go
Disallow: /cart
Disallow: /checkout
Disallow: /login
Disallow: /products

Host: https://dyasse.com
Sitemap: https://dyasse.com/sitemap.xml
```
Browser and Googlebot received byte-identical robots.txt contents.

**Sitemap:** 196 URL elements; XML parse error = —.
| Route class | Count |
| --- | --- |
| homepage | 1 |
| categories incl pagination | 12 |
| guides | 6 |
| products | 172 |
| core | 4 |
| catalog | 1 |
| utility/coming soon | 0 |
| other | 0 |

Lastmod present: 172; absent: 24.

**First 20 sitemap URLs in exact XML order:**
| # | URL | lastmod |
| --- | --- | --- |
| 1 | https://dyasse.com/ | — |
| 2 | https://dyasse.com/about | — |
| 3 | https://dyasse.com/contact | — |
| 4 | https://dyasse.com/faq | — |
| 5 | https://dyasse.com/privacy | — |
| 6 | https://dyasse.com/guides | — |
| 7 | https://dyasse.com/patterns | — |
| 8 | https://dyasse.com/guides/crochet-patterns-for-beginners | — |
| 9 | https://dyasse.com/guides/knitting-patterns-for-beginners | — |
| 10 | https://dyasse.com/guides/crochet-keychain-patterns | — |
| 11 | https://dyasse.com/guides/choosing-yarn-for-crochet-bags | — |
| 12 | https://dyasse.com/guides/crochet-baby-shoes-sizing | — |
| 13 | https://dyasse.com/collections/crochet-patterns | — |
| 14 | https://dyasse.com/collections/christmas-crochet | — |
| 15 | https://dyasse.com/collections/knitting-patterns | — |
| 16 | https://dyasse.com/collections/baby-shoes | — |
| 17 | https://dyasse.com/collections/keychains | — |
| 18 | https://dyasse.com/collections/crochet-bags | — |
| 19 | https://dyasse.com/collections/amigurumi | — |
| 20 | https://dyasse.com/collections/crochet-accessories | — |

**Full sitemap crawl with Browser:** 196 checked, 196 HTTP 200, 0 noindex, 0 non-200 / transport / WAF challenge anomalies.
**Full sitemap crawl with Googlebot:** 196 checked, 196 HTTP 200, 0 noindex, 0 non-200 / transport / WAF challenge anomalies.

## 3. Raw SSR HTML Extraction (Page-by-Page)

HTML is from curl response bodies only; no browser JS. Main word count uses alphanumeric words in server-rendered main excluding nav, aside, footer, scripts, styles and SVG. All H1 and H2 includes footer headings.

### Homepage /

- HTTP: Browser 200; Googlebot 200
- Exact title (31 characters): `Crochet & Knitting PDF Patterns`
- Exact meta description (153 characters): `Browse crochet and knitting PDF patterns for bags, keychains, baby booties and more. See design photos, project details and digital delivery information.`
- Exact meta robots: `index, follow`
- Exact canonical: `https://dyasse.com`
- Header logo raw element text: `ddyasse.Patterns for makers`; accessible aria-label: `dyasse — home`
- Main-content visible SSR words: 1012
- Internal crawlable anchor count (main): 63; unique hrefs: 27
- From our earlier Etsy shop: False; selected/cherry-picked Etsy reviews: False; Coming soon in main: True
- Image alt sample: `Christmas Tree Keychain Crochet Pattern PDF, Mini Holiday Tree Ornament, Festive Crochet Pattern crochet PDF pattern design from Dyasse Shop`; `Christmas Tree Crochet Keychain Pattern`; `Chunky crochet shoulder purse shaped like a large bow with tails and a strap`; `3D Crochet Rose Clutch Bag Pattern`; `Baby Giraffe Crochet Amigurumi — Overalls`
- ALL H1: `Crochet PDF patterns for a more handmade world.`
- ALL H2: `Shop by category`; `Featured patterns`; `Christmas crochet PDF patterns`; `Find your next crochet PDF pattern`; `New designs on the way`; `Buy the pattern, not a promise.`; `Create with confidence.`; `Questions before you begin?`; `Categories`; `Helpful guides`; `Dyasse`
- SEO-field difference from Googlebot: none
- HTML SHA256: browser `0e6063fd75483537c2293e090ea9889cec6a1b48a2041892a60fdac034400bb6`; Googlebot `0e6063fd75483537c2293e090ea9889cec6a1b48a2041892a60fdac034400bb6`
- Coming soon links: `Coming soon Crochet Beach Bag: Rainbow Granny Stripe Large Cotton Shoulder Tote -> /studio-preview`, `Coming soon Custom Crochet Laptop Sleeve: Puffy Cloud Chenille Tablet Case, Handmade Padded Tec -> /studio-preview`, `Coming soon Matching Dog and Owner Set: Handmade Greyhound Snood and Twisted Headband, Chenille -> /studio-preview`

**FULL raw browser JSON-LD scripts (1):**
JSON-LD block 1:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","url":"https://dyasse.com","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}},{"@type":"WebSite","@id":"https://dyasse.com/#website","name":"Dyasse Shop","url":"https://dyasse.com","publisher":{"@id":"https://dyasse.com/#organization"},"inLanguage":"en"}]}
```
Googlebot JSON-LD bytes match the browser response blocks.

### /product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf

- HTTP: Browser 200; Googlebot 200
- Exact title (52 characters): `3D Crochet Rose Clutch Bag Pattern PDF \| Dyasse Shop`
- Exact meta description (137 characters): `Crochet a sculptural red rose clutch bag with three-dimensional petals and gold O-ring handles. Digital PDF covers the flower-shaped bag.`
- Exact meta robots: `index, follow`
- Exact canonical: `https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf`
- Header logo raw element text: `ddyasse.Patterns for makers`; accessible aria-label: `dyasse — home`
- Main-content visible SSR words: 1029
- Internal crawlable anchor count (main): 18; unique hrefs: 11
- From our earlier Etsy shop: False; selected/cherry-picked Etsy reviews: False; Coming soon in main: False
- Image alt sample: `3D Crochet Rose Clutch Bag Pattern`; `3D Crochet Rose Clutch Bag Pattern — additional product photo 2`; `3D Crochet Rose Clutch Bag Pattern — additional product photo 3`; `3D Crochet Rose Clutch Bag Pattern — additional product photo 4`; `3D Crochet Rose Clutch Bag Pattern — additional product photo 5`
- ALL H1: `3D Crochet Rose Clutch Bag Pattern PDF`
- ALL H2: `Making notes for this pattern`; `Everything you need to know.`; `More worth making.`; `Pattern reviews`; `Categories`; `Helpful guides`; `Dyasse`
- SEO-field difference from Googlebot: none
- HTML SHA256: browser `92a7d0b4a66ffc49a5323b7059cecf973c8e3b66cabc8e4059733d1d857d3993`; Googlebot `92a7d0b4a66ffc49a5323b7059cecf973c8e3b66cabc8e4059733d1d857d3993`

**FULL raw browser JSON-LD scripts (2):**
JSON-LD block 1:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","url":"https://dyasse.com","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}},{"@type":"WebSite","@id":"https://dyasse.com/#website","name":"Dyasse Shop","url":"https://dyasse.com","publisher":{"@id":"https://dyasse.com/#organization"},"inLanguage":"en"}]}
```
JSON-LD block 2:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Product","@id":"https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf#product","url":"https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf","name":"3D Crochet Rose Clutch Bag Pattern PDF","description":"Crochet a sculptural red rose clutch bag with three-dimensional petals and gold O-ring handles. Digital PDF covers the flower-shaped bag.","image":["https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf/73d521170fa9cf2f52af202f.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf/3d9f2571b3b2b915f9717417.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf/bb07842380436aec14ffe799.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf/80fdb79970ab4f4f811db9ff.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf/66d08621c252e1aec928c743.jpg"],"sku":"df4fb26c-d274-4b1a-b5e2-b94a62c2a4d3","brand":{"@type":"Brand","name":"Dyasse Shop"},"offers":{"@type":"Offer","url":"https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf","price":4.89,"priceCurrency":"USD","availability":"https://schema.org/InStock","seller":{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","logo":"https://dyasse.com/icon.svg"}},"category":"Crochet bags & purses","additionalProperty":[{"@type":"PropertyValue","name":"Product format","value":"Digital PDF crochet or knitting instructions; no physical product"}]},{"@type":"BreadcrumbList","@id":"https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf#breadcrumbs","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://dyasse.com/"},{"@type":"ListItem","position":2,"name":"Crochet bags & purses","item":"https://dyasse.com/collections/crochet-bags"},{"@type":"ListItem","position":3,"name":"3D Crochet Rose Clutch Bag Pattern PDF","item":"https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf"}]}]}
```
Googlebot JSON-LD bytes match the browser response blocks.

### /product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download

- HTTP: Browser 200; Googlebot 200
- Exact title (68 characters): `Sage Green Crochet Baby Clogs Pattern PDF \| 0–9 Months \| Dyasse Shop`
- Exact meta description (149 characters): `Crochet sage green baby clogs with rounded toes, eyelet details and double soles. Downloadable US-terms pattern covers baby sizes from 0 to 9 months.`
- Exact meta robots: `index, follow`
- Exact canonical: `https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download`
- Header logo raw element text: `ddyasse.Patterns for makers`; accessible aria-label: `dyasse — home`
- Main-content visible SSR words: 890
- Internal crawlable anchor count (main): 15; unique hrefs: 10
- From our earlier Etsy shop: False; selected/cherry-picked Etsy reviews: False; Coming soon in main: False
- Image alt sample: `Sage green crochet baby clogs with rounded toes and structured soles`; `Sage green crochet baby clogs with rounded toes and structured soles — additional product photo 2`; `Sage green crochet baby clogs with rounded toes and structured soles — additional product photo 3`; `Sage green crochet baby clogs with rounded toes and structured soles — additional product photo 4`; `Sage green crochet baby clogs with rounded toes and structured soles — additional product photo 5`
- ALL H1: `Sage Green Crochet Baby Clogs Pattern PDF — 0–9 Months`
- ALL H2: `Making notes for this pattern`; `Everything you need to know.`; `More worth making.`; `Pattern reviews`; `Categories`; `Helpful guides`; `Dyasse`
- SEO-field difference from Googlebot: none
- HTML SHA256: browser `e2cc1605d05a066315d5a359e0779816ca59680e01bded72a78ea77b04f187a0`; Googlebot `e2cc1605d05a066315d5a359e0779816ca59680e01bded72a78ea77b04f187a0`

**FULL raw browser JSON-LD scripts (2):**
JSON-LD block 1:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","url":"https://dyasse.com","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}},{"@type":"WebSite","@id":"https://dyasse.com/#website","name":"Dyasse Shop","url":"https://dyasse.com","publisher":{"@id":"https://dyasse.com/#organization"},"inLanguage":"en"}]}
```
JSON-LD block 2:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Product","@id":"https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download#product","url":"https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download","name":"Sage Green Crochet Baby Clogs Pattern PDF — 0–9 Months","description":"Crochet sage green baby clogs with rounded toes, eyelet details and double soles. Downloadable US-terms pattern covers baby sizes from 0 to 9 months.","image":["https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download/7862e02c0dfc9a7400d40cb3.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download/a67c23d7a11bd39c5965df30.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download/97b10bd1c2ac61c77bda2e4b.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download/c1ebc06519d9da1d3094d0fe.jpg","https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download/e09808c4852d43529649c6a9.jpg"],"sku":"280ce311-b457-40ed-8f36-7bbe66b3868b","brand":{"@type":"Brand","name":"Dyasse Shop"},"offers":{"@type":"Offer","url":"https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download","price":4.89,"priceCurrency":"USD","availability":"https://schema.org/InStock","seller":{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","logo":"https://dyasse.com/icon.svg"}},"category":"Baby booties & shoes","additionalProperty":[{"@type":"PropertyValue","name":"Product format","value":"Digital PDF crochet or knitting instructions; no physical product"}]},{"@type":"BreadcrumbList","@id":"https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download#breadcrumbs","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://dyasse.com/"},{"@type":"ListItem","position":2,"name":"Baby booties & shoes","item":"https://dyasse.com/collections/baby-shoes"},{"@type":"ListItem","position":3,"name":"Sage Green Crochet Baby Clogs Pattern PDF — 0–9 Months","item":"https://dyasse.com/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download"}]}]}
```
Googlebot JSON-LD bytes match the browser response blocks.

### /collections/crochet-bags

- HTTP: Browser 200; Googlebot 200
- Exact title (46 characters): `Crochet Bag & Purse PDF Patterns \| Dyasse Shop`
- Exact meta description (149 characters): `Explore crochet bag PDF patterns for textured totes, raffia clutches, crossbody purses and bow bags. Browse materials, assembly and finished designs.`
- Exact meta robots: `index, follow`
- Exact canonical: `https://dyasse.com/collections/crochet-bags`
- Header logo raw element text: `ddyasse.Patterns for makers`; accessible aria-label: `dyasse — home`
- Main-content visible SSR words: 1283
- Internal crawlable anchor count (main): 83; unique hrefs: 32
- From our earlier Etsy shop: False; selected/cherry-picked Etsy reviews: False; Coming soon in main: False
- Image alt sample: `Mustard Mesh Crochet Market Tote Bag Pattern`; `Mustard Mesh Crochet Market Tote Bag Pattern`; `Striped Origami Crochet Hobo Tote Pattern`; `Pastel crochet pencil case with cherry decorations and a zipper closure`; `Cloud Puff Crochet Sling Phone Bag Pattern`
- ALL H1: `Crochet bags & purses .`
- ALL H2: `Explore the patterns`; `Crochet handbag, backpack and pouch PDF patterns`; `Plan your next project`; `Categories`; `Helpful guides`; `Dyasse`
- SEO-field difference from Googlebot: none
- HTML SHA256: browser `7cfb760eafd8b4b63e66b76c9038441f2efee0e1f8c98cfcfedca74a09af5386`; Googlebot `7cfb760eafd8b4b63e66b76c9038441f2efee0e1f8c98cfcfedca74a09af5386`

**FULL raw browser JSON-LD scripts (2):**
JSON-LD block 1:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","url":"https://dyasse.com","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}},{"@type":"WebSite","@id":"https://dyasse.com/#website","name":"Dyasse Shop","url":"https://dyasse.com","publisher":{"@id":"https://dyasse.com/#organization"},"inLanguage":"en"}]}
```
JSON-LD block 2:
```json
{"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","@id":"https://dyasse.com/collections/crochet-bags#page","name":"Crochet Bag & Purse PDF Patterns","description":"Shop crochet bag patterns for handbags, backpacks, purses and pencil cases. Explore photos, materials, sizing and PDF instructions before you make your next handmade bag.","url":"https://dyasse.com/collections/crochet-bags"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://dyasse.com/"},{"@type":"ListItem","position":2,"name":"Crochet bags & purses","item":"https://dyasse.com/collections/crochet-bags"}]},{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Mustard Mesh Crochet Tote Bag Pattern PDF: Macrame Cord Market Bag, Beach Shoulder Purse Tutorial","url":"https://dyasse.com/product/mustard-mesh-crochet-tote-bag-pattern-pdf-macrame-cord-market-bag-beach-shoulder-purse-tutorial"},{"@type":"ListItem","position":2,"name":"Striped Crochet Hobo Bag Pattern PDF: Origami Fold Geometric Tote","url":"https://dyasse.com/product/striped-crochet-hobo-bag-pattern-pdf-origami-fold-geometric-tote"},{"@type":"ListItem","position":3,"name":"Crochet Pencil Case Pattern PDF, Pastel Cherry Zipper Pouch Tutorial, Beginner Friendly","url":"https://dyasse.com/product/crochet-pencil-case-pattern-pdf-pastel-cherry-zipper-pouch-tutorial-beginner-friendly"},{"@type":"ListItem","position":4,"name":"Crochet Sling Bag Pattern: Cloud Puff Stitch Phone Pouch (PDF Download)","url":"https://dyasse.com/product/crochet-sling-bag-pattern-cloud-puff-stitch-phone-pouch-pdf-download"},{"@type":"ListItem","position":5,"name":"Sunshine Daisy Crochet Backpack Pattern PDF, Floral Drawstring Bag Tutorial, Digital Download","url":"https://dyasse.com/product/sunshine-daisy-crochet-backpack-pattern-pdf-floral-drawstring-bag-tutorial-digital-download"},{"@type":"ListItem","position":6,"name":"Crochet Clutch Bag Pattern: Emerald Ribbed Dumpling Evening Purse (PDF Download)","url":"https://dyasse.com/product/crochet-clutch-bag-pattern-emerald-ribbed-dumpling-evening-purse-pdf-download"},{"@type":"ListItem","position":7,"name":"Cocoa Bobble Handbag Crochet Pattern PDF, Chunky Tube Yarn Purse with D-Shaped Handles","url":"https://dyasse.com/product/cocoa-bobble-handbag-crochet-pattern-pdf-chunky-tube-yarn-purse-with-d-shaped-handles"},{"@type":"ListItem","position":8,"name":"Penguin Coin Purse Crochet Pattern PDF, Navy Kiss-Clasp Pouch","url":"https://dyasse.com/product/penguin-coin-purse-crochet-pattern-pdf-navy-kiss-clasp-pouch"},{"@type":"ListItem","position":9,"name":"Crochet Glasses Case Pattern PDF, Cat Eyeglass Pouch with Wrist Strap","url":"https://dyasse.com/product/crochet-glasses-case-pattern-pdf-cat-eyeglass-pouch-with-wrist-strap"},{"@type":"ListItem","position":10,"name":"Avocado Crossbody Bag Crochet Pattern PDF, Fruit Purse Digital Download","url":"https://dyasse.com/product/avocado-crossbody-bag-crochet-pattern-pdf-fruit-purse-digital-download"},{"@type":"ListItem","position":11,"name":"Kawaii Crochet Pencil Case Pattern, Zipper Pouch PDF","url":"https://dyasse.com/product/kawaii-crochet-pencil-case-pattern-zipper-pouch-pdf"},{"@type":"ListItem","position":12,"name":"Crochet Hobo Bag Pattern PDF: Geometric Origami Shoulder Purse Tutorial","url":"https://dyasse.com/product/crochet-hobo-bag-pattern-pdf-geometric-origami-shoulder-purse-tutorial"},{"@type":"ListItem","position":13,"name":"Chunky Crochet Backpack Pattern PDF: Structured Drawstring Mochila","url":"https://dyasse.com/product/chunky-crochet-backpack-pattern-pdf-structured-drawstring-mochila"},{"@type":"ListItem","position":14,"name":"Crochet Hobo Tote Bag Pattern PDF: Raffia Tote with Integrated Handles","url":"https://dyasse.com/product/crochet-hobo-tote-bag-pattern-pdf-raffia-tote-with-integrated-handles"},{"@type":"ListItem","position":15,"name":"Crochet Rose Bag Pattern: 3D Floral Clutch with Gold O-Ring Handles (PDF)","url":"https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf"},{"@type":"ListItem","position":16,"name":"Crochet Bow Bag Pattern PDF, Chunky Yarn Shoulder Purse, Coquette Ribbon Bag DIY","url":"https://dyasse.com/product/crochet-bow-bag-pattern-pdf-chunky-yarn-shoulder-purse-coquette-ribbon-bag-diy"},{"@type":"ListItem","position":17,"name":"Crochet Clutch Bag Pattern PDF: Metallic Purple Flex Frame Purse, Braided Strap Handbag Tutorial","url":"https://dyasse.com/product/crochet-clutch-bag-pattern-pdf-metallic-purple-flex-frame-purse-braided-strap-handbag-tutorial"},{"@type":"ListItem","position":18,"name":"Gray Raised Diagonal Crochet Handbag Pattern PDF | Flower Shoulder Bag","url":"https://dyasse.com/product/gray-raised-diagonal-crochet-handbag-pattern-pdf-flower-shoulder-bag"},{"@type":"ListItem","position":19,"name":"Round Crochet Bag Pattern PDF: Structured Tambourine Crossbody Purse, Chunky Cord Handbag Tutorial","url":"https://dyasse.com/product/round-crochet-bag-pattern-pdf-structured-tambourine-crossbody-purse-chunky-cord-handbag-tutorial"},{"@type":"ListItem","position":20,"name":"Crochet Bucket Bag Pattern: Pearl Strap Drawstring Purse (PDF Download)","url":"https://dyasse.com/product/crochet-bucket-bag-pattern-pearl-strap-drawstring-purse-pdf-download"},{"@type":"ListItem","position":21,"name":"Crochet Clutch Bag Pattern PDF: Metallic Gold Dumpling Evening Purse Flex Frame Tutorial","url":"https://dyasse.com/product/crochet-clutch-bag-pattern-pdf-metallic-gold-dumpling-evening-purse-flex-frame-tutorial"},{"@type":"ListItem","position":22,"name":"Sculptural Mini Tote Crochet Pattern PDF: Seamless Waistcoat Stitch Modern Minimalist Handbag","url":"https://dyasse.com/product/sculptural-mini-tote-crochet-pattern-pdf-seamless-waistcoat-stitch-modern-minimalist-handbag"},{"@type":"ListItem","position":23,"name":"Crochet Micro Bag Pattern PDF: Mini Tote Earbud Pouch Tutorial","url":"https://dyasse.com/product/crochet-micro-bag-pattern-pdf-mini-tote-earbud-pouch-tutorial"},{"@type":"ListItem","position":24,"name":"Structured Crochet Tote Bag Pattern PDF: Chevron Bobble Bag with Wooden Ring Handles","url":"https://dyasse.com/product/structured-crochet-tote-bag-pattern-pdf-chevron-bobble-bag-with-wooden-ring-handles"},{"@type":"ListItem","position":25,"name":"Crochet Raffia Clutch Pattern PDF: Dumpling Flex Frame Purse Tutorial, Summer Bag","url":"https://dyasse.com/product/crochet-raffia-clutch-pattern-pdf-dumpling-flex-frame-purse-tutorial-summer-bag"}]}]}
```
Googlebot JSON-LD bytes match the browser response blocks.

### /guides/crochet-patterns-for-beginners

- HTTP: Browser 200; Googlebot 200
- Exact title (62 characters): `How to Read Crochet Patterns: Beginner PDF Guide \| Dyasse Shop`
- Exact meta description (152 characters): `Learn crochet pattern abbreviations, gauge, stitch counts, rounds and rows. A clear beginner guide to reading crochet PDF instructions before you start.`
- Exact meta robots: `index, follow`
- Exact canonical: `https://dyasse.com/guides/crochet-patterns-for-beginners`
- Header logo raw element text: `ddyasse.Patterns for makers`; accessible aria-label: `dyasse — home`
- Main-content visible SSR words: 485
- Internal crawlable anchor count (main): 8; unique hrefs: 7
- From our earlier Etsy shop: False; selected/cherry-picked Etsy reviews: False; Coming soon in main: False
- Image alt sample: none
- ALL H1: `How to read a crochet pattern`
- ALL H2: `Start with the pattern overview`; `Common crochet abbreviations`; `How rows, rounds and repeats work`; `Checklist before choosing a PDF pattern`; `If the finished piece looks different`; `Explore patterns`; `Categories`; `Helpful guides`; `Dyasse`
- SEO-field difference from Googlebot: none
- HTML SHA256: browser `ab45b6a109c3a3995bfe67ca21fa429aea09bea3b285ebdabfa3ada7daf7b6a3`; Googlebot `ab45b6a109c3a3995bfe67ca21fa429aea09bea3b285ebdabfa3ada7daf7b6a3`

**FULL raw browser JSON-LD scripts (2):**
JSON-LD block 1:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","url":"https://dyasse.com","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}},{"@type":"WebSite","@id":"https://dyasse.com/#website","name":"Dyasse Shop","url":"https://dyasse.com","publisher":{"@id":"https://dyasse.com/#organization"},"inLanguage":"en"}]}
```
JSON-LD block 2:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"How to Read Crochet Patterns: A Beginner Guide","description":"Learn crochet pattern abbreviations, gauge, stitch counts, rounds and rows. A clear beginner guide to reading crochet PDF instructions before you start.","url":"https://dyasse.com/guides/crochet-patterns-for-beginners","mainEntityOfPage":"https://dyasse.com/guides/crochet-patterns-for-beginners","author":{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop"},"publisher":{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://dyasse.com/"},{"@type":"ListItem","position":2,"name":"Crochet patterns","item":"https://dyasse.com/collections/crochet-patterns"},{"@type":"ListItem","position":3,"name":"How to read crochet patterns","item":"https://dyasse.com/guides/crochet-patterns-for-beginners"}]}]}
```
Googlebot JSON-LD bytes match the browser response blocks.

### /our-story

- HTTP: Browser 404; Googlebot 404
- Exact title (99 characters): `404: This page could not be found.Crochet PDF Patterns: Keychains, Bags & Accessories \| Dyasse Shop`
- Exact meta description (144 characters): `Shop crochet PDF patterns for miniature keychains, handmade bags, baby booties and accessories. Browse designs, materials and digital downloads.`
- Exact meta robots: `index, follow`
- Exact canonical: `—`
- Header logo raw element text: `ddyasse.Patterns for makers`; accessible aria-label: `dyasse — home`
- Main-content visible SSR words: 7
- Internal crawlable anchor count (main): 0; unique hrefs: 0
- From our earlier Etsy shop: False; selected/cherry-picked Etsy reviews: False; Coming soon in main: False
- Image alt sample: none
- ALL H1: `404`
- ALL H2: `This page could not be found.`; `Categories`; `Helpful guides`; `Dyasse`
- SEO-field difference from Googlebot: none
- HTML SHA256: browser `5f392c8c072d261894abf161cc49a69b2efbb8cd71573dc16f76e1a743707371`; Googlebot `5f392c8c072d261894abf161cc49a69b2efbb8cd71573dc16f76e1a743707371`

**FULL raw browser JSON-LD scripts (1):**
JSON-LD block 1:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","url":"https://dyasse.com","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}},{"@type":"WebSite","@id":"https://dyasse.com/#website","name":"Dyasse Shop","url":"https://dyasse.com","publisher":{"@id":"https://dyasse.com/#organization"},"inLanguage":"en"}]}
```
Googlebot JSON-LD bytes match the browser response blocks.

### /faq

- HTTP: Browser 200; Googlebot 200
- Exact title (40 characters): `Frequently asked questions \| Dyasse Shop`
- Exact meta description (115 characters): `Buy digital crochet PDF patterns on Dyasse Shop. How PayPal checkout, accounts, downloads and pattern support work.`
- Exact meta robots: `index, follow`
- Exact canonical: `https://dyasse.com/faq`
- Header logo raw element text: `ddyasse.Patterns for makers`; accessible aria-label: `dyasse — home`
- Main-content visible SSR words: 566
- Internal crawlable anchor count (main): 2; unique hrefs: 2
- From our earlier Etsy shop: False; selected/cherry-picked Etsy reviews: False; Coming soon in main: True
- Image alt sample: none
- ALL H1: `A little clarity goes a long way.`
- ALL H2: `Frequently asked questions`; `Categories`; `Helpful guides`; `Dyasse`
- SEO-field difference from Googlebot: none
- HTML SHA256: browser `c7524714ad3f052868212a622f724411a4da0bdb01cff090009fc097024248b3`; Googlebot `c7524714ad3f052868212a622f724411a4da0bdb01cff090009fc097024248b3`

**FULL raw browser JSON-LD scripts (1):**
JSON-LD block 1:
```json
{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://dyasse.com/#organization","name":"Dyasse Shop","url":"https://dyasse.com","logo":{"@type":"ImageObject","url":"https://dyasse.com/icon.svg"}},{"@type":"WebSite","@id":"https://dyasse.com/#website","name":"Dyasse Shop","url":"https://dyasse.com","publisher":{"@id":"https://dyasse.com/#organization"},"inLanguage":"en"}]}
```
Googlebot JSON-LD bytes match the browser response blocks.

## 4. Full Catalog & Index-Hygiene Summary (Codebase / Data)

Supabase read-only SQL checked earlier in this audit: **177 total products; 172 published and QA verified; 5 unpublished drafts; 0 published-but-unverified**. The stored product columns contained 0 Etsy references. All 177 had regular price $6.99 and sale price $4.89 during the query.
Sitemap product count by live curl: **172**. Product pages returned HTTP 200 with index-follow and without noindex for browser: **172**. Product pages with noindex in sitemap: **0**. Technically indexable does not mean Google-indexed.

**All unpublished draft slugs, fetched by curl at their product URLs:**
| slug | HTTP | meta robots | canonical |
| --- | --- | --- | --- |
| crochet-beach-bag-rainbow-granny-stripe-large-cotton-shoulder-tote | 404 | index, follow | — |
| crochet-cookie-keychain-pattern-pdf-kawaii-biscuit-amigurumi-bag-charm-sandwich-plush-tutorial | 404 | index, follow | — |
| crochet-dinosaur-pattern-pdf-t-rex-amigurumi-plush-toy-dino-crochet-download | 404 | index, follow | — |
| custom-crochet-laptop-sleeve-puffy-cloud-chenille-tablet-case-handmade-padded-tech-cover | 404 | index, follow | — |
| matching-dog-and-owner-set-handmade-greyhound-snood-and-twisted-headband-chenille-winter-gift | 404 | index, follow | — |

**Ten randomly selected published products:** Source selection: earlier Supabase query `ORDER BY random() LIMIT 10`. Exact title and meta / main text metrics come from raw production curl HTML; DB description word counts are from contemporaneous Supabase SQL, not the on-page visible main text.
| slug | HTTP | exact title | title chars | commas | meta description words | DB description words | SSR main words | robots |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| crochet-cow-baby-booties-pattern-pdf-newborn-farm-animal-shoes-0-3-month-tutorial | 200 | Cow Crochet Baby Booties Pattern PDF \| Newborn \| Dyasse Shop | 60 | 0 | 19 | 487 | 805 | index, follow |
| crochet-bucket-hat-pattern-pdf-burgundy-bow-sun-hat-with-mesh-brim-for-women | 200 | Burgundy Crochet Bucket Hat Pattern PDF \| Bow \| Dyasse Shop | 59 | 0 | 27 | 422 | 772 | index, follow |
| crochet-vintage-car-keychain-pattern-pdf-retro-amigurumi-auto-bag-charm | 200 | Vintage Car Crochet Keychain Pattern PDF \| Retro Charm \| Dyasse Shop | 68 | 0 | 21 | 446 | 989 | index, follow |
| crochet-baby-sandals-pattern-pdf-red-gold-t-strap-shoes-double-sole-and-headband-set | 200 | Red & Gold Crochet Baby Sandals PDF \| Headband Set \| Dyasse Shop | 64 | 0 | 20 | 639 | 938 | index, follow |
| crochet-baby-booties-pattern-pdf-ballerina-shoes-and-headband-set-with-satin-bow | 200 | Ballerina Crochet Baby Booties & Headband PDF \| Dyasse Shop | 59 | 0 | 17 | 557 | 876 | index, follow |
| strawberry-airpods-pro-case-crochet-pattern-pdf-kawaii-earbud-keychain-cover | 200 | Strawberry Crochet AirPods Pro Case Pattern PDF \| Dyasse Shop | 61 | 0 | 22 | 647 | 1149 | index, follow |
| crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download | 200 | Sage Green Crochet Baby Clogs Pattern PDF \| 0–9 Months \| Dyasse Shop | 68 | 0 | 24 | 367 | 890 | index, follow |
| striped-crochet-hobo-bag-pattern-pdf-origami-fold-geometric-tote | 200 | Striped Origami Crochet Hobo Tote Pattern PDF \| Dyasse Shop | 59 | 0 | 17 | 299 | 655 | index, follow |
| christmas-tree-keychain-crochet-pattern-pdf-mini-holiday-tree-ornament-festive-crochet-pattern | 200 | Christmas Tree Crochet Keychain Pattern PDF \| Dyasse Shop | 57 | 0 | 20 | 356 | 910 | index, follow |
| amigurumi-mouse-keychain-crochet-pattern-pdf | 200 | Mouse Crochet Keychain Pattern PDF \| Amigurumi \| Dyasse Shop | 60 | 0 | 23 | 373 | 724 | index, follow |

**Utility / filter / pagination routes:** meta robots and canonical refer to the final HTML response after curl redirects; an HTTP redirect itself has no indexable document.
| path | HTTP chain | final HTML robots | final HTML canonical | x-robots-tag | Location hops |
| --- | --- | --- | --- | --- | --- |
| /search?q=crochet | 200 | noindex, follow | — | — | — |
| /search | 200 | noindex, follow | — | — | — |
| /patterns | 200 | index, follow | https://dyasse.com/patterns | — | — |
| /collections/crochet-patterns?page=2 | 200 | index, follow | https://dyasse.com/collections/crochet-patterns?page=2 | — | — |
| /collections/crochet-patterns?page=999 | 404 | index, follow | — | — | — |
| /collections/crochet-patterns?sort=latest | 200 | index, follow | https://dyasse.com/collections/crochet-patterns | — | — |
| /cart | 200 | noindex, nofollow | — | — | — |
| /checkout | 307 | index, follow | — | — | — |
| /favorites | 200 | noindex, nofollow | — | — | — |
| /account | 404 | index, follow | — | — | — |
| /account/login | 200 | noindex, nofollow | — | — | — |
| /account/signup | 200 | noindex, nofollow | — | — | — |
| /account/orders | 307 -> 200 | noindex, nofollow | — | — | /account/login?next=/account/orders |
| /account/profile | 307 -> 200 | noindex, nofollow | — | — | /account/login?next=%2Faccount%2Fprofile%3Fnext%3D%2Faccount%2Forders |
| /account/addresses | 307 | index, follow | — | — | — |
| /account/favorites | 307 | index, follow | — | — | — |
| /admin | 307 -> 200 | noindex, nofollow | — | — | /account/login?next=/admin |
| /admin/import | 307 -> 200 | noindex, nofollow | — | — | /account/login?next=/admin |
| /studio-preview | 200 | noindex, follow | — | — | — |
| /rose-bag | 200 | noindex, follow | https://dyasse.com/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf | — | — |
| /support | 200 | index, follow | — | — | — |
| /products | 404 | index, follow | — | — | — |
| /login | 307 | index, follow | — | — | — |
| /kids-quest | 404 | index, follow | — | — | — |
| /auth-debug | 404 | index, follow | — | — | — |

## 5. Technical / Rendering Notes

- Framework: Next.js 14.2.35 / React 18.3.1 App Router; based on checked-out repo `09feb50`.
- Hosting / CDN: Cloudflare evidenced by server / cf-ray headers; Vercel evidenced by x-vercel-id / x-vercel-cache headers. Product images use own domain and public Supabase bucket. Next.js image optimization disabled: True.
- Middleware: official-domain check in `middleware.ts`; preview/nonofficial hosts receive X-Robots-Tag noindex,nofollow, with disallow-all preview robots. Explicit Googlebot UA branch in source: False. Full Cloudflare WAF policy cannot be inferred from middleware.
- WAF/Cloudflare: compare all Browser/Googlebot HTTP chains and cf-mitigated in sections 1-2. Spoofed Googlebot UA is not an authenticated Google crawler; absence of challenge on test traffic cannot prove Google crawl access.
- SSR: No client-side JavaScript was executed. Content visible only after client hydration is deliberately excluded. Header logo begins with a decorative d marked aria-hidden; accessible name is dyasse - home, but concatenated raw logo text may resemble ddyasse.
- Observed content issue: /our-story is tested separately; the live About page is /about. Homepage Coming soon cards link to /studio-preview, a noindex page; changing their linking may reduce crawl of non-sellable preview content.
- Index hygiene: Google indexing is not equivalent to the presence of an index,follow tag. Confirm index coverage and URL Inspection directly in GSC.

**Recommended priority order:** verify UA-specific bot blocks if any, eliminate or make non-clickable Coming soon links to noindex preview, map legitimate old /our-story links to /about if applicable, review titles/unique product detail, and monitor Google indexing.

**No website files, product prices, customer data, or deployments were modified by this audit.**
