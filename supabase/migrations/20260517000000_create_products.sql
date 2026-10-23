-- STEP 1: Dyasse Shop products schema + secure Row Level Security policies.
-- Run this migration in Supabase SQL editor or through the Supabase CLI.
--
-- IMPORTANT ADMIN CONFIGURATION:
-- Replace the email below with the same value used by ADMIN_EMAIL in your Vercel
-- environment variables, then run it once in Supabase SQL editor:
--   alter database postgres set app.admin_email = 'owner@dyasse-shop.com';
--
-- RLS write policies intentionally fail closed until app.admin_email is configured.

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  description text not null,
  price numeric(10, 2) not null,
  image_url text not null,
  gumroad_link text,
  paypal_link text,
  features jsonb not null default '[]'::jsonb,
  materials jsonb not null default '[]'::jsonb,
  what_you_will_learn jsonb not null default '[]'::jsonb,
  is_published boolean not null default true,
  constraint products_price_non_negative check (price >= 0),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint products_features_array check (jsonb_typeof(features) = 'array'),
  constraint products_materials_array check (jsonb_typeof(materials) = 'array'),
  constraint products_what_you_will_learn_array check (jsonb_typeof(what_you_will_learn) = 'array')
);

comment on table public.products is 'Premium crochet PDF patterns sold by Dyasse Shop.';
comment on column public.products.gumroad_link is 'External Gumroad checkout or product URL.';
comment on column public.products.paypal_link is 'External PayPal checkout/payment URL.';

create or replace function public.configured_admin_email()
returns text
language sql
stable
as $$
  select lower(nullif(current_setting('app.admin_email', true), ''));
$$;

create or replace function public.is_products_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
    and lower(coalesce(auth.jwt() ->> 'email', '')) = public.configured_admin_email();
$$;

revoke all on function public.configured_admin_email() from public;
revoke all on function public.is_products_admin() from public;
grant execute on function public.is_products_admin() to authenticated;

grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

alter table public.products enable row level security;
alter table public.products force row level security;

drop policy if exists "Published products are readable by everyone" on public.products;
create policy "Published products are readable by everyone"
  on public.products
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can read all products" on public.products;
create policy "Admins can read all products"
  on public.products
  for select
  to authenticated
  using (public.is_products_admin());

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
  on public.products
  for insert
  to authenticated
  with check (public.is_products_admin());

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
  on public.products
  for update
  to authenticated
  using (public.is_products_admin())
  with check (public.is_products_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
  on public.products
  for delete
  to authenticated
  using (public.is_products_admin());

create index if not exists products_created_at_idx on public.products (created_at desc);
create index if not exists products_is_published_created_at_idx on public.products (is_published, created_at desc);
create index if not exists products_published_slug_idx on public.products (slug) where is_published = true;
create index if not exists products_title_trgm_idx on public.products using gin (title gin_trgm_ops);
