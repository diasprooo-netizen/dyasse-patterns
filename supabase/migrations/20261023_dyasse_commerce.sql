-- Dyasse Store: initial schema. All products start as drafts.
create extension if not exists pgcrypto;
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
create policy "admin read self" on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));
grant select on public.admin_users to authenticated;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(), updated_at timestamptz,
  title text not null, slug text not null unique,
  description text not null, price numeric(12,2) not null check (price >= 0),
  sale_price numeric(12,2) check (sale_price is null or sale_price >= 0),
  currency text not null default 'USD',
  image_url text not null default '',
  gallery_images text[] not null default '{}',
  gumroad_link text, paypal_link text,
  features text[] not null default '{}',materials text[] not null default '{}',
  what_you_will_learn text[] not null default '{}',tags text[] not null default '{}',
  category text, is_published boolean not null default false,
  is_featured boolean not null default false, is_on_sale boolean not null default false,
  sale_badge text,upsell_product_ids text[] not null default '{}',
  cross_sell_product_ids text[] not null default '{}',
  seo_title text,seo_description text,
  qa_verified boolean not null default false,
  test_evidence_url text,
  constraint publish_requires_qa_and_checkout check (
    not is_published or (
      qa_verified and test_evidence_url is not null and length(test_evidence_url)>8
      and gumroad_link is not null and gumroad_link ~* '^https://([a-z0-9-]+[.])?gumroad[.]com/'
    )
  )
);
create index if not exists products_published_idx on public.products(is_published,created_at desc);
create index if not exists products_category_idx on public.products(category);
alter table public.products enable row level security;
create policy "public view verified products" on public.products for select to anon,authenticated
  using (is_published = true and qa_verified = true or exists (
     select 1 from public.admin_users a where a.user_id=(select auth.uid())
  ));
create policy "admins create products" on public.products for insert to authenticated
  with check (exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())));
create policy "admins update products" on public.products for update to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())))
  with check (exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())));
create policy "admins delete products" on public.products for delete to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())));
grant select on public.products to anon,authenticated;
grant insert,update,delete on public.products to authenticated;

create table if not exists public.qa_audits (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.products(id) on delete cascade,
 reviewed_by uuid not null references auth.users(id),
 evidence_url text not null, created_at timestamptz not null default now()
);
alter table public.qa_audits enable row level security;
create policy "admin view QA" on public.qa_audits for select to authenticated
 using (exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())));
create policy "admin record QA" on public.qa_audits for insert to authenticated
 with check (reviewed_by=(select auth.uid()) and exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())));
grant select,insert on public.qa_audits to authenticated;

create table if not exists public.newsletter_subscribers (
 id uuid primary key default gen_random_uuid(),
 email text not null unique,
 consent boolean not null default false check (consent = true),
 consented_at timestamptz not null default now(),
 source text not null default 'dyasse.com',
 unsubscribed_at timestamptz,
 created_at timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;
create policy "admins view subscribers" on public.newsletter_subscribers for select to authenticated
 using (exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())));
grant select on public.newsletter_subscribers to authenticated;

create table if not exists public.checkout_clicks (
 id bigint generated always as identity primary key,
 product_id uuid references public.products(id) on delete set null,
 clicked_at timestamptz not null default now()
);
alter table public.checkout_clicks enable row level security;
create policy "admins view checkout clicks" on public.checkout_clicks for select to authenticated
 using (exists(select 1 from public.admin_users a where a.user_id=(select auth.uid())));
grant select on public.checkout_clicks to authenticated;

-- Add admin only after creating and confirming the real Supabase Auth user.
-- insert into public.admin_users(user_id,email)
-- values ('<auth-user-uuid>', '<verified-admin-email>');
