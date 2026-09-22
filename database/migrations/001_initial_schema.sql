-- Nujeel Phase 1 Database Schema
-- Created: 2026-09-22
-- Description: Core identity, organization, roles, and geography tables

-- ─────────────────────────────────────────────
-- 1. PROFILES — User display information
-- ─────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  headline text,
  professional_title text,
  summary text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ─────────────────────────────────────────────
-- 2. ORGANIZATIONS — Companies and entities
-- ─────────────────────────────────────────────
create table if not exists public.organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  org_type text check (org_type in ('customer', 'provider')) not null,
  headquarters_country_id uuid references public.countries(id),
  website text,
  description text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ─────────────────────────────────────────────
-- 3. ORGANIZATION_MEMBERS — User-to-org membership + role
-- ─────────────────────────────────────────────
create table if not exists public.organization_members (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  organization_id uuid references public.organizations(id) on delete cascade not null,
  role_id uuid references public.roles(id) on delete cascade not null,
  joined_at timestamp with time zone default now(),
  unique(user_id, organization_id)
);

-- ─────────────────────────────────────────────
-- 4. ROLES — System roles
-- ─────────────────────────────────────────────
create table if not exists public.roles (
  id uuid default gen_random_uuid() primary key,
  name text unique not null check (name in ('ADMIN', 'CUSTOMER_ADMIN', 'CUSTOMER_RECRUITER', 'PROVIDER_ADMIN', 'PROVIDER_MEMBER', 'PROFESSIONAL')),
  description text,
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────────────
-- 5. PERMISSIONS — Role-based permissions
-- ─────────────────────────────────────────────
create table if not exists public.permissions (
  id uuid default gen_random_uuid() primary key,
  role_id uuid references public.roles(id) on delete cascade not null,
  permission text not null,
  created_at timestamp with time zone default now(),
  unique(role_id, permission)
);

-- ─────────────────────────────────────────────
-- 6. REGIONS — World Regions (top level)
-- ─────────────────────────────────────────────
create table if not exists public.regions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  name_ar text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  unique(name)
);

-- ─────────────────────────────────────────────
-- 7. SUBREGIONS — Subdivisions within regions
-- ─────────────────────────────────────────────
create table if not exists public.subregions (
  id uuid default gen_random_uuid() primary key,
  region_id uuid references public.regions(id) on delete cascade not null,
  name text not null,
  name_ar text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  unique(region_id, name)
);

-- ─────────────────────────────────────────────
-- 8. COUNTRIES — Countries with ISO codes
-- ─────────────────────────────────────────────
create table if not exists public.countries (
  id uuid default gen_random_uuid() primary key,
  subregion_id uuid references public.subregions(id) on delete cascade,
  iso_code text not null unique,
  name text not null,
  name_ar text,
  continent text default 'Asia',
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  unique(subregion_id, name)
);

-- ─────────────────────────────────────────────
-- 9. ADMINISTRATIVE_AREAS — States, provinces, governorates
-- ─────────────────────────────────────────────
create table if not exists public.administrative_areas (
  id uuid default gen_random_uuid() primary key,
  country_id uuid references public.countries(id) on delete cascade not null,
  name text not null,
  name_ar text,
  area_type text default 'province',
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  unique(country_id, name)
);

-- ─────────────────────────────────────────────
-- 10. CITIES
-- ─────────────────────────────────────────────
create table if not exists public.cities (
  id uuid default gen_random_uuid() primary key,
  administrative_area_id uuid references public.administrative_areas(id) on delete cascade,
  country_id uuid references public.countries(id) on delete cascade,
  name text not null,
  name_ar text,
  latitude decimal(10, 7),
  longitude decimal(10, 7),
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  unique(country_id, name)
);

-- ─────────────────────────────────────────────
-- 11. CUSTOM_REGION_GROUPS — User-defined region groupings
-- ─────────────────────────────────────────────
create table if not exists public.custom_region_groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  name_ar text,
  description text,
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────────────
-- 12. CUSTOM_REGION_GROUP_MEMBERS
-- ─────────────────────────────────────────────
create table if not exists public.custom_region_group_members (
  id uuid default gen_random_uuid() primary key,
  custom_region_group_id uuid references public.custom_region_groups(id) on delete cascade not null,
  country_id uuid references public.countries(id) on delete cascade not null,
  unique(custom_region_group_id, country_id)
);

-- ─────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────
create index idx_countries_subregion on public.countries(subregion_id);
create index idx_countries_name on public.countries(name);
create index idx_cities_country on public.cities(country_id);
create index idx_cities_area on public.cities(administrative_area_id);
create index idx_admin_areas_country on public.administrative_areas(country_id);
create index idx_subregions_region on public.subregions(region_id);
create index idx_organization_members_user on public.organization_members(user_id);
create index idx_organization_members_org on public.organization_members(organization_id);
create index idx_org_members_role on public.organization_members(role_id);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.regions enable row level security;
alter table public.subregions enable row level security;
alter table public.countries enable row level security;
alter table public.administrative_areas enable row level security;
alter table public.cities enable row level security;
alter table public.custom_region_groups enable row level security;
alter table public.custom_region_group_members enable row level security;

-- Public read access for geography tables
create policy "Geography is publicly readable"
  on public.regions for select using (true);
create policy "Geography is publicly readable"
  on public.subregions for select using (true);
create policy "Countries are publicly readable"
  on public.countries for select using (true);
create policy "Administrative areas are publicly readable"
  on public.administrative_areas for select using (true);
create policy "Cities are publicly readable"
  on public.cities for select using (true);
create policy "Region groups are publicly readable"
  on public.custom_region_groups for select using (true);
create policy "Region group members are publicly readable"
  on public.custom_region_group_members for select using (true);

-- Profiles: users can only read their own profile
create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Organizations: org admins can read their own org
create policy "Org admins read own org"
  on public.organizations for select using (
    exists (select 1 from public.organization_members om
      join public.roles r on r.id = om.role_id
      where om.organization_id = organizations.id
      and om.user_id = auth.uid()
      and r.name in ('ADMIN', 'CUSTOMER_ADMIN', 'PROVIDER_ADMIN'))
  );

-- Organization members: members can read their own membership
create policy "Members read own membership"
  on public.organization_members for select using (auth.uid() = user_id);

-- Roles are readable by everyone
create policy "Roles are public"
  on public.roles for select using (true);

-- Permissions are readable by everyone
create policy "Permissions are public"
  on public.permissions for select using (true);

-- ─────────────────────────────────────────────
-- AUTO-UPDATE UPDATED_AT
-- ─────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at();

create trigger organizations_updated_at
  before update on public.organizations
  for each row execute function update_updated_at();
