# Dyasse launch review — catalog of 177 Etsy patterns

## Current implemented state
- Existing Supabase project is the database source; the October 2026 catalog contains 177 unique product slugs.
- Historic Etsy titles, descriptions, tags, images and approximate listed MAD prices are imported as DRAFTS. They are not verified technical promises.
- The old 20 top-selling patterns were preserved by slug, including manually edited fields.
- Product QA is recorded separately in the admin interface; SQL blocks publishing until `qa_verified`, a test-evidence URL and a Gumroad URL exist.
- Vercel site currently lives at `https://dyasse-patterns.vercel.app`; no dyasse.com DNS changes have been made.
- Staging domain must remain `noindex, nofollow` and robots disallow until launch on dyasse.com.

## Connect existing Gumroad inventory
1. Open /admin/gumroad (admin Supabase Auth login is required).
2. From your *own Gumroad seller account*, copy the real product-specific link (e.g. https://your-shop.gumroad.com/l/your-product).
3. Edit a product and paste its Gumroad URL, or click 'Copy CSV template' on /admin/gumroad and paste `slug,url` pairs back for bulk mapping. Links must be real verified checkout pages. Saving URLs does not make a product public.
4. On Gumroad check that the correct PDF is uploaded, digital delivery works, the PDF/version matches the photo, and the product is active.
5. Check checkout price and currency **manually**: source Etsy values are mostly MAD and Gumroad may be in another currency. A link does not guarantee the prices match.
6. In /admin/qa record actual physical test evidence and compare the exact PDF and image. Only then approve and publish.
7. Test a real low-risk checkout and refund flow before advertising. Link clicks in /admin/analytics are NOT verified sales.

## Catalog QA priorities
- Sage Baby Clog, Scooter Keychain, Scalloped Baby Booties and Cable Knit Hat previously had buyer-reported concerns.
- Investigate existing PDFs and stitch/row totals before describing any pattern as tested.
- Correct Etsy-specific delivery wording in imported product descriptions. Do not claim Gumroad PDF delivery until the Gumroad checkout works.

## Email / privacy
- Newsletter database exists, but emailing subscribers requires a verified opt-in email provider and unsubscribe mechanism.
- Do not import Etsy buyers' emails or enroll previous buyers in marketing without valid consent.

## SEO launch
- Domain must be connected only after final buyer flow is functional and approved.
- On switching the site to dyasse.com, update `NEXT_PUBLIC_SITE_URL` to `https://dyasse.com`, redeploy, verify canonical/robots/sitemap, then submit Google Search Console.
- Until then, preserve staging noindex to avoid premature indexing of incomplete products.
