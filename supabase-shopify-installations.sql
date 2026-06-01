create table if not exists public.shopify_installations (
  shop text primary key,
  access_token text not null,
  scope text,
  status text default 'active',
  installed_at timestamptz default now(),
  updated_at timestamptz default now()
);
