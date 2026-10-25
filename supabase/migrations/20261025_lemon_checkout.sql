-- Temporary on-site Lemon Squeezy checkout for verified digital PDF patterns.
-- Keep existing Gumroad provider available for later migration.
-- Do not change publication status or invent any QA approvals.

alter table public.products
  add column if not exists lemon_checkout_url text;

comment on column public.products.lemon_checkout_url is
  'Shareable LIVE Lemon Squeezy checkout/buy URL. PDF must be uploaded and prices verified in Lemon Squeezy before publishing.';

alter table public.products drop constraint if exists publish_requires_qa_and_checkout;
alter table public.products add constraint publish_requires_qa_and_checkout
  check (
    not is_published or (
      qa_verified
      and test_evidence_url is not null
      and length(test_evidence_url) > 8
      and (
        (gumroad_link is not null and gumroad_link ~* '^https://([a-z0-9-]+[.])?gumroad[.]com/')
        or
        (lemon_checkout_url is not null and
         lemon_checkout_url ~* '^https://[a-z0-9-]+[.]lemonsqueezy[.]com/checkout/buy/[a-z0-9_-]+/?([?][^#]*)?$')
      )
    )
  );
