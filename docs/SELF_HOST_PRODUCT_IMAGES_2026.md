# Dyasse Shop: one-time self-hosted catalog images migration

## Goal

Remove runtime dependence on `i.etsystatic.com` from the Dyasse Shop product catalog, moving all listing image bytes into the owner's public Supabase Storage bucket `dyasse-product-images`.

**Never** make the paid pattern bucket `dyasse-paid-patterns` public. This operation is **only** for non-secret customer-facing product photos.

## Source audit, 2026-11-26

- `public.products`: 177 rows; 172 `is_published=true AND qa_verified=true`. Total **139 Etsy-hosted primary** and **568 Etsy gallery** references across all 177 rows (including unpublished).
- Among those 172: **134 Etsy-hosted primary images** and **556 Etsy-hosted gallery image references**.
- Three other source groups already host primary images on Supabase or dyasse.com: 19 Supabase and 19 dyasse.com.
- `dyasse-product-images` already contains 135 photos for 19 distinct designs.
- A separate group of **75 WebP images for 19 designs** is **already self-hosted** under `https://dyasse.com/images/catalog/` (not in the Supabase bucket). Every one of those 75 URLs was checked on 2026-11-26 and returned **HTTP 200**. Skip re-uploading or re-mapping them; they are not part of the Etsy external images migration.
- Google Drive contains `Dyasse_Product_Photos_Staging` (75 WebP files) and `Dyasse_Products2_Product_by_Product_V2` (44 product review archives) plus unmatched archives. **Do not assume those ZIPs are already mapped to every product.** Inspection of the Watermelon Baby Mary Jane ZIP showed **a pattern PDF and one image extracted from that PDF, explicitly labeled `NOT_LISTING_PHOTOS`**. It is not safe to substitute that image for the Etsy listing cover without visual verification. The separate unmatched-image ZIP also contains an image marked for manual review.
- There may be five additional unpublished rows with Etsy source photos; the script checks every row rather than published only.

## Safety and execution

This is a maintenance-only script; never execute it on a public route or client browser.

1. Use the connected Google Drive account to extract matched original product photos to a temporary **private local directory**. For exact, proven matches, create a JSON manifest where each key is the current image URL stored in Supabase and each value is the absolute local file path. The script prioritizes manifest files.
2. With the service role key available **only in an authorized maintenance shell** (not `NEXT_PUBLIC_*`), run:
   `node scripts/migrate-owned-images.mjs --manifest=./media-manifest.json`
   This is read-only, enumerates candidates and writes a backup.
3. Run a safe pilot:
   `node scripts/migrate-owned-images.mjs --manifest=./media-manifest.json --apply --limit=1`
   Download the migrated image via its Supabase public URL and visually compare with the actual product.
4. Only after verification, migrate the remaining mapped files. If some Drive archives cannot be mapped and the business owner authorizes a **one-time copy** from a current legacy image URL, add `--legacy-source` to fill those gaps. This is a transport source during the migration, **not** continued image hosting.
5. For each product, the script downloads all changed image bytes, validates image signatures and size, uploads with idempotent deterministic keys, checks stored bytes with SHA-256, performs an optimistic concurrency check, then updates `image_url` and `gallery_images` together. Failed products keep old URLs and are logged in `migration-reports/`.
6. Re-run the audit after completion:
   ```sql
   SELECT count(*) FILTER (WHERE image_url ILIKE '%etsystatic.com%') AS remaining_hero,
          sum((SELECT count(*) FROM unnest(gallery_images) g WHERE g ILIKE '%etsystatic.com%')) AS remaining_gallery
   FROM public.products;
   ```
   The **final acceptance condition is both numbers zero**, with product, sitemap image URLs and visible galleries all using owned hosts.
7. Inspect representative product cards and Google image previews; run live HTTP checks; only then recheck GSC. Never automatically republish products or change prices.

## Why this is a separate PR

A connector-level attempt to invoke an automatic migration operation was blocked. That attempt did **not** modify any product media. The temporary Edge Function was immediately disabled with JWT verification enabled. No user-facing image URLs were changed.

This PR adds a standalone, reviewable migration utility only. It does not add an insecure upload endpoint, change `robots.txt`, publish unpublished products, or alter canonical tags. Do not merge or run as an automatic deploy task without a successful pilot and a proper maintenance environment.

## Verified implementation readiness (2026-11-26)

- The Vercel production environment defines a server-only `SUPABASE_SECRET_KEY` (and `NEXT_PUBLIC_SUPABASE_URL`). The migration script now accepts that variable, without storing its value.
- PR preview Vercel deployment built to READY after the script fix. It does not execute data migration as part of the build.
- No product image or gallery URL has been changed in production yet. End-to-end migration must be executed by a trusted maintenance process; avoid exposing public write endpoints or putting production secrets in scripts/PR content.
