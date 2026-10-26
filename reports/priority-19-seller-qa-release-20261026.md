# dyasse shop — Priority 19: release audit and seller QA attestation

**Date:** 2026-10-26  
**Scope:** Only the 19 priorities below. **Not** the 148 remaining catalog items.

## Source and provenance
- Original archive: [Dyasse_19_PDF_Images_Drive_Claude_Ready.zip](https://drive.google.com/file/d/1rvOXWAK8Qmv-Xu2YkOgNy22dwwH8AeLR/view), folder [Dyasse_19_PRIORITY](https://drive.google.com/drive/folders/1m4VGA_GR-6LiNnoOG8IAdPzU0_FD2Epc).
- Separately corrected **DYS-0138** PDF: [DYS-0138_Cocoa_Bobble_Handbag_QA_Corrected.pdf](https://drive.google.com/file/d/1I_DWbSPA0WYHUied2E8hl1gKlWovKHAh/view). This corrected PDF (496,564 bytes) **overrides** the outdated 4,210,843-byte DYS-0138 PDF in the original ZIP.
- The seller explicitly stated in chat on 2026-10-26 that they manually checked **all 19** patterns, found them QA PASS, and authorized publication of the 19 patterns on dyasse.com and Gumroad. This is a **seller attestation**, not an independent crocheted physical-sample/load-test report.

## Automated archive inspection
- ZIP CRC integrity: **passed** (no corrupt ZIP entries).
- Manifest-to-content: **19 distinct DYS IDs**, **one PDF per ID**, expected file exists for each, all listed images exist.
- **19/19 PDF SHA-256 hashes matched** the archive MANIFEST.json; file lengths, PDF signature, reported page counts, and PDF parsing passed.
- All listed JPG files parsed successfully. Product folder names match respective source IDs; listing image counts below.
- **19/19 source UUID mappings present in live Supabase products**, and specified PayPal USD-cent prices matched.
- These automated tests cannot independently establish that the crocheted physical objects have been made or compare their physical dimensions to photos. Those aspects remain on the seller's manual testing attestation.

## Approved 19 products

| ID | PDF pages in source archive | Images | PayPal USD | Status |
|---|---:|---:|---:|---|
| DYS-0014 | 8 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0036 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0048 | 15 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0049 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0058 | 14 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0079 | 12 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0082 | 12 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0087 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0098 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0100 | 16 | 6 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0101 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0107 | 15 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0108 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0109 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0112 | 16 | 7 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0115 | 12 | 13 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0130 | 11 | 6 | $5.09 | Seller QA-pass attested; file format verified |
| DYS-0131 | 15 | 6 | $6.11 | Seller QA-pass attested; file format verified |
| DYS-0138 | 13 | 6 | $7.12 | Seller QA-pass attested; file format verified |

## Publication and fulfillment rules
1. Publish a product only if **its correct PDF is present** in the private bucket `dyasse-paid-patterns/DYS-XXXX/Pattern.pdf`, with expected byte length. DYS-0138 must use the corrected override.
2. All 19 are **digital PDF patterns**; no physical craft item is delivered. Keep confidential PDFs inside private storage; public listing photos are okay.
3. Gumroad publication is a separate process and only after each draft has its actual PDF attached, listing photos mapped, description cleaned, price verified and buyer download tested. Seller-only ZIP, source pack, internal instructions and QA report must not be offered as paid downloads.
4. Direct PayPal orders must be linked to an authenticated buyer account and fulfilled with secure per-order download links; do not publish products without checkout completeness.

**Note:** This file records verified digital-file integrity plus the seller's own QA attestation. It does **not** claim independent 100% proof of physical production quality.
