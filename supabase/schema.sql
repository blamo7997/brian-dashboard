create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  role text,
  locale text,
  accessibility jsonb,
  created_at timestamptz default now()
);

create table if not exists interaction_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid,
  type text,
  payload jsonb,
  created_at timestamptz default now()
);

create table if not exists approval_queue (
  id uuid primary key default gen_random_uuid(),
  category text,
  payload jsonb,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text,
  payload jsonb,
  created_at timestamptz default now()
);
