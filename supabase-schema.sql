-- Capital Vault — Client Tracking Schema
-- Run this in the Supabase SQL editor

-- ── clients ─────────────────────────────────────────────────────────────────
create table public.clients (
  id                        uuid primary key default gen_random_uuid(),
  created_at                timestamptz default now(),
  updated_at                timestamptz default now(),

  owner_name                text not null,
  business_name             text not null,
  email                     text,
  phone                     text,

  fico_band                 text not null,  -- 'below-580' | '580-649' | '650-699' | '700-749' | '750+'
  monthly_revenue           integer not null,
  tib_months                integer not null,
  positions                 integer not null default 0,

  industry                  text,
  entity_type               text,
  business_state            text,
  has_tax_lien              boolean default false,
  nsf_count                 integer default 0,
  ownership_pct             integer default 100,

  track                     integer,
  track_reason              text,

  stage                     text not null default 'onboarded',

  funding_amount_requested  integer,
  funded_amount             integer,
  fee_collected             integer,

  notes                     text
);

create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger clients_updated_at
  before update on public.clients
  for each row execute function update_updated_at_column();

-- ── applications ─────────────────────────────────────────────────────────────
create table public.applications (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),

  client_id         uuid not null references public.clients(id) on delete cascade,

  lender_name       text not null,
  lender_type       text,
  status            text not null default 'submitted',

  predicted_score   text,
  submission_order  integer,

  approved_amount   integer,
  rate              text,
  terms             text,
  lender_notes      text,

  status_token      uuid not null default gen_random_uuid() unique,
  token_used_at     timestamptz
);

create trigger applications_updated_at
  before update on public.applications
  for each row execute function update_updated_at_column();

create index applications_status_token_idx on public.applications(status_token);
create index applications_client_id_idx on public.applications(client_id);

-- ── status_updates (audit log) ───────────────────────────────────────────────
create table public.status_updates (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  application_id  uuid not null references public.applications(id) on delete cascade,
  new_status      text not null,
  approved_amount integer,
  rate            text,
  terms           text,
  notes           text
);

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table public.clients enable row level security;
alter table public.applications enable row level security;
alter table public.status_updates enable row level security;

-- Service role has full access (used by all API routes via SUPABASE_SERVICE_ROLE_KEY)
create policy "service role full access clients"
  on public.clients for all using (auth.role() = 'service_role');

create policy "service role full access applications"
  on public.applications for all using (auth.role() = 'service_role');

create policy "service role full access status_updates"
  on public.status_updates for all using (auth.role() = 'service_role');
