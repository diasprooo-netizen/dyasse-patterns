-- One-time, high-entropy job capabilities for server-side Gumroad PDF delivery.
-- No client/anonymous access. Random UUID must remain private and is single-use.
create table if not exists public.gumroad_transfer_jobs (
  id uuid primary key default gen_random_uuid(),
  catalog_id text not null check (catalog_id ~ '^DYS-[0-9]{4}$'),
  product_id uuid not null references public.products(id) on delete restrict,
  expected_price_cents integer not null check (expected_price_cents > 0),
  expected_gumroad_link text not null,
  status text not null default 'queued' check (status in ('queued','running','published','failed','attached_needs_review')),
  stage text not null default 'queued',
  error_code text,
  gumroad_product_id text,
  file_size_bytes bigint,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '20 minutes'),
  started_at timestamptz,
  finished_at timestamptz
);
create unique index if not exists one_open_gumroad_job_per_product
  on public.gumroad_transfer_jobs(product_id)
  where status in ('queued','running','attached_needs_review');
create index if not exists gumroad_transfer_jobs_status_idx on public.gumroad_transfer_jobs(status,created_at);
alter table public.gumroad_transfer_jobs enable row level security;
revoke all on table public.gumroad_transfer_jobs from public, anon, authenticated;
grant select, insert, update on table public.gumroad_transfer_jobs to service_role;
