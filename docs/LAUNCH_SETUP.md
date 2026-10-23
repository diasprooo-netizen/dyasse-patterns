# dyasse.com launch checklist

## Status
- New storefront, collection pages, metadata, sitemap, robots, newsletter capture endpoint, QA approval area and admin metrics prepared on a feature branch.
- Requires a Supabase project, env values and SQL setup, then review of 177 product drafts.
- Do NOT attach dyasse.com DNS before testing Vercel preview and existing DNS/mail records.
- Do NOT infer Gumroad sales from checkout clicks.

## Supabase
1. Create a Supabase project in the user's selected organization.
2. Run `supabase/migrations/20261023_dyasse_commerce.sql` through approved database deployment workflow.
3. Create exactly one Supabase Auth user for store admin. Add their verified user UUID + email to `public.admin_users` using SQL Editor, after verifying ownership.
4. On Vercel set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable key), `SUPABASE_SECRET_KEY` (secret server only), `NEXT_PUBLIC_SITE_URL=https://dyasse.com`; optionally `ADMIN_EMAIL` as a display convenience only.
5. Protect environment variables, do not put them in GitHub or screenshots.
6. Admin is at /admin; QA page /admin/qa; subscribers /admin/subscribers; analytics /admin/analytics.

## Products
- Import owned Etsy catalog as *drafts only* with `qa_verified=false`.
- Validate every final PDF, human test record, image, description, ownership/license and Gumroad acceptance.
- Upload downloadable PDF to Gumroad separately and paste actual published Gumroad checkout link into the product manager. Gumroad owns PDF access after checkout.
- Verify item price/currency at Gumroad matches your site's listing.
- Admin approval on /admin/qa requires an https URL to evidence; afterward publish draft with a valid Gumroad URL. A SQL check blocks untested live products.
- Existing /api/migrate must remain admin-only.

## Newsletter/analytics
- Newsletter endpoint records voluntary consent. Set up double opt-in, unsubscribe links and a real ESP before marketing emails. Complete privacy policy with company contact, processors and retention terms before signup goes live.
- Vercel Analytics tracks traffic if enabled; /admin/analytics only counts site outbound checkout clicks, not actual Gumroad orders. Gumroad reports verified sales until secure webhook integration.
- Respect data minimization and never import past Etsy buyers as subscribers without marketing consent.

## SEO
- Verify Search Console domain property; submit https://dyasse.com/sitemap.xml.
- Add canonical product pages, review crawlability and product schema validity with Google's Rich Results Test.
- See docs/SEO_PRIORITY_2026.md.
- DNS: in Cloudflare, use exact domain records issued by the linked Vercel project, DNS-only until verified, preserving MX, SPF, DKIM and DMARC.
