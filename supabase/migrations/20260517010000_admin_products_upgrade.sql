-- Dyasse Shop remote product admin upgrade.
-- Safe to run on an existing project: every schema change is guarded with IF NOT EXISTS.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now(),
  constraint admin_users_email_lowercase check (email = lower(email))
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  slug text unique not null,
  description text not null,
  price numeric not null,
  sale_price numeric null,
  currency text not null default 'USD',
  image_url text not null,
  gallery_images jsonb not null default '[]'::jsonb,
  gumroad_link text null,
  paypal_link text null,
  features jsonb not null default '[]'::jsonb,
  materials jsonb not null default '[]'::jsonb,
  what_you_will_learn jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  category text null,
  is_published boolean not null default true,
  is_featured boolean not null default false,
  is_on_sale boolean not null default false,
  sale_badge text null,
  upsell_product_ids jsonb not null default '[]'::jsonb,
  cross_sell_product_ids jsonb not null default '[]'::jsonb,
  seo_title text null,
  seo_description text null
);

alter table public.products add column if not exists updated_at timestamptz not null default now();
alter table public.products add column if not exists sale_price numeric null;
alter table public.products add column if not exists currency text not null default 'USD';
alter table public.products add column if not exists gallery_images jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists tags jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists category text null;
alter table public.products add column if not exists is_featured boolean not null default false;
alter table public.products add column if not exists is_on_sale boolean not null default false;
alter table public.products add column if not exists sale_badge text null;
alter table public.products add column if not exists upsell_product_ids jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists cross_sell_product_ids jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists seo_title text null;
alter table public.products add column if not exists seo_description text null;

alter table public.products alter column created_at set default now();
alter table public.products alter column updated_at set default now();
alter table public.products alter column currency set default 'USD';
alter table public.products alter column gallery_images set default '[]'::jsonb;
alter table public.products alter column features set default '[]'::jsonb;
alter table public.products alter column materials set default '[]'::jsonb;
alter table public.products alter column what_you_will_learn set default '[]'::jsonb;
alter table public.products alter column tags set default '[]'::jsonb;
alter table public.products alter column is_published set default true;
alter table public.products alter column is_featured set default false;
alter table public.products alter column is_on_sale set default false;
alter table public.products alter column upsell_product_ids set default '[]'::jsonb;
alter table public.products alter column cross_sell_product_ids set default '[]'::jsonb;

update public.products set updated_at = coalesce(updated_at, created_at, now());
update public.products set currency = coalesce(nullif(currency, ''), 'USD');
update public.products set gallery_images = '[]'::jsonb where gallery_images is null;
update public.products set features = '[]'::jsonb where features is null;
update public.products set materials = '[]'::jsonb where materials is null;
update public.products set what_you_will_learn = '[]'::jsonb where what_you_will_learn is null;
update public.products set tags = '[]'::jsonb where tags is null;
update public.products set upsell_product_ids = '[]'::jsonb where upsell_product_ids is null;
update public.products set cross_sell_product_ids = '[]'::jsonb where cross_sell_product_ids is null;

alter table public.products drop constraint if exists products_sale_price_non_negative;
alter table public.products add constraint products_sale_price_non_negative check (sale_price is null or sale_price >= 0);
alter table public.products drop constraint if exists products_price_non_negative;
alter table public.products add constraint products_price_non_negative check (price >= 0);
alter table public.products drop constraint if exists products_gallery_images_array;
alter table public.products add constraint products_gallery_images_array check (jsonb_typeof(gallery_images) = 'array');
alter table public.products drop constraint if exists products_features_array;
alter table public.products add constraint products_features_array check (jsonb_typeof(features) = 'array');
alter table public.products drop constraint if exists products_materials_array;
alter table public.products add constraint products_materials_array check (jsonb_typeof(materials) = 'array');
alter table public.products drop constraint if exists products_what_you_will_learn_array;
alter table public.products add constraint products_what_you_will_learn_array check (jsonb_typeof(what_you_will_learn) = 'array');
alter table public.products drop constraint if exists products_tags_array;
alter table public.products add constraint products_tags_array check (jsonb_typeof(tags) = 'array');
alter table public.products drop constraint if exists products_upsell_product_ids_array;
alter table public.products add constraint products_upsell_product_ids_array check (jsonb_typeof(upsell_product_ids) = 'array');
alter table public.products drop constraint if exists products_cross_sell_product_ids_array;
alter table public.products add constraint products_cross_sell_product_ids_array check (jsonb_typeof(cross_sell_product_ids) = 'array');

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.set_products_updated_at();

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin_user() from public;
grant execute on function public.is_admin_user() to authenticated;

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_is_published_idx on public.products (is_published);
create index if not exists products_is_featured_idx on public.products (is_featured);
create index if not exists products_is_on_sale_idx on public.products (is_on_sale);
create index if not exists products_category_idx on public.products (category);

alter table public.admin_users enable row level security;
alter table public.products enable row level security;

-- Remove legacy policies from the initial build migration so admin access is controlled by public.admin_users.
drop policy if exists "Published products are readable by everyone" on public.products;
drop policy if exists "Admins can read all products" on public.products;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;

drop policy if exists "Admins can view own admin profile" on public.admin_users;
create policy "Admins can view own admin profile"
  on public.admin_users
  for select
  to authenticated
  using (email = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
  on public.products
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can read all products" on public.products;
create policy "Admins can read all products"
  on public.products
  for select
  to authenticated
  using (public.is_admin_user());

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
  on public.products
  for insert
  to authenticated
  with check (public.is_admin_user());

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
  on public.products
  for update
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
  on public.products
  for delete
  to authenticated
  using (public.is_admin_user());

grant usage on schema public to anon, authenticated;
grant select on public.admin_users to authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
