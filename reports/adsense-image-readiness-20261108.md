# Dyasse AdSense and image-readiness record — 8 November 2026

## Product-image migration performed

- Catalog rows inspected: 177.
- Rows using an Etsy URL before this batch: 158 primary images and 158 galleries.
- Drive image sets in the verified import pack: 20.
- Exact Drive-to-catalog matches: 19, using both the recorded product UUID and exact slug.
- Public WebP objects uploaded to Supabase Storage: 135.
- Product rows updated after public-read verification: 19.
- Unmatched sets assigned: 0.
- `Reading Buddy Toilet Roll Holder` was explicitly excluded because the pack did not contain a matching catalog row.
- The existing private `dyasse-paid-patterns` PDF bucket was not changed.
- Checkout, publication status, prices and downloadable file paths were not changed.

The destination bucket is `dyasse-product-images`. It is public-read, limited to `image/*`, and has a 10 MB per-file limit. A temporary anonymous insert policy was used for the controlled import and removed immediately afterward. Source files in Google Drive and the supplied ZIP were left intact.

## Remaining image limitation

This batch does not claim that all 177 catalog products have an owned Drive original. After the verified update, 139 product rows still reference Etsy-hosted primary/gallery images. Those URLs were deliberately left unchanged because no high-confidence owned source match was established in this batch. Replacing them by filename similarity or visual guesswork would create a product-mismatch risk.

## AdSense readiness audit

- Contact and customer-support routes are live and explain the separate Dyasse and Gumroad support paths.
- Privacy explains Supabase account data, payment processors, analytics consent, marketing choice and data-request routes.
- The current consent control is for analytics only. It is not represented as an advertising CMP.
- Five substantial, indexable crochet/knitting guides provide editorial content beyond product listings.
- Product pages identify the offer as digital PDF instructions rather than a physical finished item.
- Cart, checkout, account, search, admin and API routes are excluded from indexing or from the sitemap as appropriate.
- The sitemap contains published/QA-approved products and the editorial pages; draft products are excluded.
- The default social preview image no longer depends on Etsy CDN.

## Must be completed at AdSense activation time

- Configure a Google-certified CMP for the EEA, UK and Switzerland before serving ads there, then test consent mode with real ad tags.
- Add a real `ads.txt` entry only after Google issues the publisher ID; do not publish a placeholder ID.
- Keep ads off checkout, cart, login/account, support chat, order/download and other low-content transactional pages.
- Continue the image migration only when an owned source can be tied to the exact product UUID/slug, and retain a rollback record before each database update.

No audit can guarantee AdSense approval. The remaining material risks are the 139 Etsy-hosted catalog rows, proof of image/pattern provenance outside the files reviewed here, and the CMP/ads.txt work that cannot be finalized before an AdSense publisher account is available.
