-- Verified Gumroad sale mirror, accessible only through server-side service role.
create table if not exists public.gumroad_sales (
 sale_id text primary key,
 gumroad_order_id text,
 gumroad_product_id text,
 product_name text not null,
 product_permalink text,
 buyer_email text,
 price_cents integer not null check (price_cents between 0 and 100000000),
 fee_cents integer check (fee_cents is null or fee_cents >= 0),
 currency text not null default 'UNK' check (currency ~ '^[A-Z]{3}$'),
 status text not null check (status in ('paid','refunded','disputed','test')),
 sale_at timestamptz,
 imported_at timestamptz not null default now(),
 verified_at timestamptz not null default now()
);
create index if not exists gumroad_sales_sale_at_idx on public.gumroad_sales(sale_at desc);
create index if not exists gumroad_sales_buyer_idx on public.gumroad_sales (lower(buyer_email));
alter table public.gumroad_sales enable row level security;
revoke all on public.gumroad_sales from public, anon, authenticated;
grant select, insert, update on public.gumroad_sales to service_role;
comment on table public.gumroad_sales is 'Gumroad sales independently verified via authenticated API; not downloadable entitlements or marketing consent.';
