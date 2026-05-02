
-- SDAC App — Supabase setup (Phase 1 + Stripe-ready access helpers)

begin;

create extension if not exists citext with schema public;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email public.citext unique not null,
  username public.citext unique not null,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'premium', 'admin')),
  is_owner boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_plan_idx on public.profiles(plan);
create index if not exists profiles_created_at_idx on public.profiles(created_at desc);

create table if not exists public.billing_customers (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  stripe_customer_id text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_subscription_id text unique not null,
  stripe_price_id text not null,
  billing_interval text not null check (billing_interval in ('monthly', 'annual')),
  status text not null,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  last_event_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscriptions_status_idx on public.subscriptions(status);
create index if not exists subscriptions_current_period_end_idx on public.subscriptions(current_period_end);

create table if not exists public.promo_redemptions (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  code text not null,
  stripe_promotion_code_id text,
  redeemed_at timestamptz not null default now()
);

create index if not exists promo_redemptions_user_id_idx on public.promo_redemptions(user_id);
create index if not exists promo_redemptions_code_idx on public.promo_redemptions(code);

create table if not exists public.billing_events (
  id bigserial primary key,
  stripe_event_id text unique not null,
  event_type text not null,
  user_id uuid references public.profiles(id) on delete set null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists billing_events_user_id_idx on public.billing_events(user_id);
create index if not exists billing_events_type_idx on public.billing_events(event_type);
create index if not exists billing_events_created_at_idx on public.billing_events(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  generated_username text;
begin
  generated_username :=
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
      'user_' || substr(new.id::text, 1, 8)
    );

  insert into public.profiles (
    id,
    email,
    username,
    full_name,
    plan,
    is_owner
  )
  values (
    new.id,
    new.email,
    generated_username,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    'free',
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

create or replace function public.user_has_premium_access(p_user_id uuid)
returns boolean
language sql
stable
set search_path = public
as $$
  with current_profile as (
    select p.*
    from public.profiles p
    where p.id = p_user_id
  ),
  latest_sub as (
    select s.*
    from public.subscriptions s
    where s.user_id = p_user_id
    order by s.created_at desc
    limit 1
  )
  select case
    when exists (
      select 1
      from current_profile p
      where p.plan = 'admin' or p.is_owner = true
    ) then true

    when exists (
      select 1
      from latest_sub s
      where s.status in ('active', 'trialing')
    ) then true

    when exists (
      select 1
      from latest_sub s
      where s.status = 'past_due'
        and s.last_event_at >= now() - interval '3 days'
    ) then true

    else false
  end;
$$;

create or replace function public.current_user_has_premium_access()
returns boolean
language sql
stable
set search_path = public
as $$
  select public.user_has_premium_access((select auth.uid()));
$$;

drop view if exists public.admin_subscriber_registry;

create view public.admin_subscriber_registry as
select
  p.id,
  p.email,
  p.username,
  p.full_name,
  p.plan,
  p.is_owner,
  s.stripe_subscription_id,
  s.stripe_price_id,
  s.billing_interval,
  s.status as subscription_status,
  s.current_period_end,
  s.cancel_at_period_end,
  s.canceled_at,
  s.last_event_at,
  public.user_has_premium_access(p.id) as has_premium_access,
  p.created_at,
  p.updated_at
from public.profiles p
left join lateral (
  select *
  from public.subscriptions s
  where s.user_id = p.id
  order by s.created_at desc
  limit 1
) s on true;

alter table public.profiles enable row level security;
alter table public.billing_customers enable row level security;
alter table public.subscriptions enable row level security;
alter table public.promo_redemptions enable row level security;
alter table public.billing_events enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "billing_customers_select_own" on public.billing_customers;
create policy "billing_customers_select_own"
on public.billing_customers
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
on public.subscriptions
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "promo_redemptions_select_own" on public.promo_redemptions;
create policy "promo_redemptions_select_own"
on public.promo_redemptions
for select
to authenticated
using ((select auth.uid()) = user_id);

commit;

-- OPTIONAL:
-- update public.profiles
-- set plan = 'admin', is_owner = true
-- where email = 'luxandro010@gmail.com';
