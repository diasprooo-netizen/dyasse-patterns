-- Secure direct PayPal sales for verified digital PDF products.
-- All access to customer orders and paid files is server-side.
-- PayPal checkout stays disabled for every product until explicitly enabled.

alter table public.products
  add column if not exists paypal_price_usd_cents integer,
  add column if not exists digital_file_path text,
  add column if not exists paypal_checkout_enabled boolean not null default false;

alter table public.products
  add constraint paypal_price_positive check (paypal_price_usd_cents is null or paypal_price_usd_cents > 0),
  add constraint paypal_file_path_safe check (digital_file_path is null or digital_file_path ~ '^DYS-[0-9]{4}/Pattern[.]pdf$'),
  add constraint paypal_setup_complete check (
    not paypal_checkout_enabled or (paypal_price_usd_cents > 0 and digital_file_path is not null)
  );

-- Preserve existing QA evidence and the other checkout options.
alter table public.products drop constraint if exists publish_requires_qa_and_checkout;
alter table public.products add constraint publish_requires_qa_and_checkout check (
  not is_published or (
    qa_verified and test_evidence_url is not null and length(test_evidence_url)>8
    and (
      (gumroad_link is not null and gumroad_link ~* '^https://([a-z0-9-]+[.])?gumroad[.]com/')
      or (lemon_checkout_url is not null and lemon_checkout_url ~* '^https://[a-z0-9-]+[.]lemonsqueezy[.]com/checkout/buy/[a-z0-9_-]+/?([?][^#]*)?$')
      or (paypal_checkout_enabled and paypal_price_usd_cents > 0 and digital_file_path is not null)
    )
  )
);

create table if not exists public.paypal_orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  paypal_order_id text not null unique,
  paypal_capture_id text unique,
  amount_cents integer not null check(amount_cents > 0),
  currency text not null default 'USD' check(currency = 'USD'),
  status text not null default 'created' check(status in ('created','completed','refunded')),
  payer_email text,
  download_token_hash text unique,
  download_token_expires_at timestamptz,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index if not exists paypal_orders_lookup_idx on public.paypal_orders(download_token_hash) where download_token_hash is not null;
alter table public.paypal_orders enable row level security;
revoke all on public.paypal_orders from public, anon, authenticated;
grant select,insert,update on public.paypal_orders to service_role;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('dyasse-paid-patterns','dyasse-paid-patterns',false,33554432,array['application/pdf']::text[])
on conflict (id) do update set public=false;

-- NEVER add public read permissions for this paid storage bucket.
