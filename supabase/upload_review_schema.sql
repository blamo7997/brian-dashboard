create table if not exists role_upload_reviews (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  applicant_name text,
  applicant_email text,
  upload_type text not null,
  file_name text,
  file_url text,
  status text default 'pending',
  ai_review jsonb default '{}'::jsonb,
  admin_notes text,
  risk_flags jsonb default '[]'::jsonb,
  consent_confirmed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists role_applications (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  name text,
  email text,
  region text,
  language text,
  portfolio_url text,
  business_name text,
  status text default 'pending',
  required_media_submitted boolean default false,
  founder_approval_required boolean default true,
  created_at timestamptz default now()
);

create table if not exists upload_audit_logs (
  id uuid primary key default gen_random_uuid(),
  review_id uuid,
  action text not null,
  actor text,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
