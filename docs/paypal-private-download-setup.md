# Direct PayPal payments + private PDF delivery for Dyasse Shop

This adds an OPTIONAL second checkout provider. Lemon Squeezy and Gumroad remain supported.

## Why Google Drive is not the buyer's public download link
Public Drive links can be redistributed to anyone. Keep the 19-product Drive folder PRIVATE for archival and for an authorized Claude upload process. Buyer files belong in the private Supabase Storage bucket dyasse-paid-patterns. After a verified PayPal capture, dyasse.com issues a high-entropy order link. When opened, the server checks that the order is completed and not refunded, then creates a 60-second Supabase signed download URL. No PDF is publicly accessible.

## Setup: never put API secrets in GitHub or ChatGPT messages
In Vercel production/preview environment settings, set:
- NEXT_PUBLIC_PAYPAL_CLIENT_ID: client ID of the REST app in PayPal Developer
- PAYPAL_CLIENT_SECRET: PRIVATE secret of the same REST app
- PAYPAL_ENVIRONMENT: sandbox first, later live
- PAYPAL_WEBHOOK_ID: webhook ID from PayPal Developer for https://dyasse.com/api/paypal/webhook
- Existing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be configured.
- Optional email delivery: RESEND_API_KEY and DYASSE_RECEIPT_FROM_EMAIL. The sender must be verified in Resend. If missing, buyers receive their link immediately on-screen but NO email is sent by the store.
A changed NEXT_PUBLIC environment variable requires redeploy.

## PDFs
Use the accompanying Dyasse_19_PDF_Images_Drive_Claude_Ready.zip. Do NOT unzip to a public web folder. In Supabase Storage upload only reviewed PDFs using exactly:
    dyasse-paid-patterns/DYS-0138/Pattern.pdf
    dyasse-paid-patterns/DYS-0100/Pattern.pdf
    ...
one PDF for each DYS source ID, taken from its matching ZIP folder's PDF/Pattern.pdf.
The storage bucket must remain PRIVATE. Source PDF technical QA is NOT inferred from successful extraction or page counts.

## Catalog readiness
In the Admin product editor set:
- PayPal USD price in CENTS, reviewed against user-approved pricing.
- Private PDF storage path: DYS-0138/Pattern.pdf (for product DYS-0138).
- Enable direct PayPal checkout ONLY after private storage upload is verified.
- Run a real QA process and provide evidence through the existing QA workflow before setting Published.
- Confirm the displayed local MAD price and charged USD amount. USD amount is FIXED and is not a live exchange rate; make both visible.

## PayPal testing
1. Use PayPal Developer Sandbox test merchant and test buyer, never your own account for a live test.
2. Test one real uploaded, verified PDF with a small sandbox-priced listing.
3. Ensure the orders API creates a server-priced USD order and capture succeeds.
4. On approval verify the private download appears; without completed capture there must be no link.
5. Confirm expired and invalid links fail, private bucket has no public URL.
6. Configure the webhook for PAYMENT.CAPTURE.REFUNDED and PAYMENT.CAPTURE.REVERSED, and test revocation.
7. Activate live API only after your PayPal Business account is eligible and the store is reviewed.
8. Configure a verified email-sending service if you promise PDF links by email.
9. Keep customer-facing support channel for payment success but delivery error; never invite a buyer to pay twice.

## Important limitations
- This repository cannot receive PayPal Business approval on your behalf.
- The original user Google Drive account was not connected in the chat; the ZIP is prepared for private upload.
- The private PDF files have not yet been uploaded to Supabase Storage.
- All products remain unpublished and PayPal disabled until QA, live prices, PDF files, and merchant credentials are verified.
- For paid file recovery after losing the on-screen link, buyer may contact support with PayPal order reference; an authenticated orders portal can be added later.
- Tax and VAT responsibilities for your direct PayPal sales remain with your business; this is not a Merchant of Record service like Lemon Squeezy.
