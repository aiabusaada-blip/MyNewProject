-- Nujeel Phase 2: Technology Capability Graph
-- Technology taxonomy: Domain → Category → Vendor → Product → Capability

-- ── TECHNOLOGY DOMAINS ──
create table if not exists public.technology_domains (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  name_ar text,
  description text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ── TECHNOLOGY CATEGORIES ──
create table if not exists public.technology_categories (
  id uuid default gen_random_uuid() primary key,
  domain_id uuid references public.technology_domains(id) on delete cascade not null,
  name text not null,
  name_ar text,
  description text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  unique(domain_id, name)
);

-- ── VENDORS ──
create table if not exists public.vendors (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  name_ar text,
  description text,
  headquarters_country_id uuid references public.countries(id),
  website text,
  logo_url text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ── PRODUCTS ──
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  vendor_id uuid references public.vendors(id) on delete cascade not null,
  name text not null,
  name_ar text,
  description text,
  category_id uuid references public.technology_categories(id),
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  unique(vendor_id, name)
);

-- ── CAPABILITIES ──
create table if not exists public.capabilities (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  name_ar text,
  description text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ── PRODUCT_CAPABILITIES (junction table with proficiency levels) ──
create table if not exists public.product_capabilities (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  capability_id uuid references public.capabilities(id) on delete cascade not null,
  proficiency_level text check (proficiency_level in ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  created_at timestamp with time zone default now(),
  unique(product_id, capability_id)
);

-- ── TECHNOLOGY ALIASES (canonical names + abbreviations) ──
create table if not exists public.technology_aliases (
  id uuid default gen_random_uuid() primary key,
  canonical_name text not null references public.products(name) on delete cascade,
  alias text not null,
  alias_type text check (alias_type in ('abbreviation', 'historical', 'common_misspelling', 'alternative')),
  created_at timestamp with time zone default now(),
  unique(canonical_name, alias)
);

-- ── INDEXES ──
create index idx_categories_domain on public.technology_categories(domain_id);
create index idx_products_vendor on public.products(vendor_id);
create index idx_products_category on public.products(category_id);
create index idx_product_capabilities_product on public.product_capabilities(product_id);
create index idx_product_capabilities_capability on public.product_capabilities(capability_id);
create index idx_aliases_canonical on public.technology_aliases(canonical_name);
create index idx_aliases_alias on public.technology_aliases(alias);
create index idx_domains_name on public.technology_domains(name);
create index idx_vendors_name on public.vendors(name);
create index idx_capabilities_name on public.capabilities(name);

-- ── ROW LEVEL SECURITY ──
alter table public.technology_domains enable row level security;
alter table public.technology_categories enable row level security;
alter table public.vendors enable row level security;
alter table public.products enable row level security;
alter table public.capabilities enable row level security;
alter table public.product_capabilities enable row level security;
alter table public.technology_aliases enable row level security;

-- Public read for taxonomy data
create policy "Domains are public" on public.technology_domains for select using (true);
create policy "Categories are public" on public.technology_categories for select using (true);
create policy "Vendors are public" on public.vendors for select using (true);
create policy "Products are public" on public.products for select using (true);
create policy "Capabilities are public" on public.capabilities for select using (true);
create policy "Product capabilities are public" on public.product_capabilities for select using (true);
create policy "Aliases are public" on public.technology_aliases for select using (true);

-- Admin can manage taxonomy
create policy "Admins manage taxonomy"
  on public.technology_domains for all using (
    exists (select 1 from public.profiles p
      join public.organization_members om on om.user_id = p.id
      join public.roles r on r.id = om.role_id
      where p.id = auth.uid() and r.name = 'ADMIN')
  );

create policy "Admins manage taxonomy categories"
  on public.technology_categories for all using (
    exists (select 1 from public.profiles p
      join public.organization_members om on om.user_id = p.id
      join public.roles r on r.id = om.role_id
      where p.id = auth.uid() and r.name = 'ADMIN')
  );

create policy "Admins manage vendors"
  on public.vendors for all using (
    exists (select 1 from public.profiles p
      join public.organization_members om on om.user_id = p.id
      join public.roles r on r.id = om.role_id
      where p.id = auth.uid() and r.name = 'ADMIN')
  );

create policy "Admins manage products"
  on public.products for all using (
    exists (select 1 from public.profiles p
      join public.organization_members om on om.user_id = p.id
      join public.roles r on r.id = om.role_id
      where p.id = auth.uid() and r.name = 'ADMIN')
  );

create policy "Admins manage capabilities"
  on public.capabilities for all using (
    exists (select 1 from public.profiles p
      join public.organization_members om on om.user_id = p.id
      join public.roles r on r.id = om.role_id
      where p.id = auth.uid() and r.name = 'ADMIN')
  );

-- Auto-update updated_at
create or replace function update_capability_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger technology_domains_updated_at
  before update on public.technology_domains
  for each row execute function update_capability_updated_at();

create trigger vendors_updated_at
  before update on public.vendors
  for each row execute function update_capability_updated_at();

create trigger capabilities_updated_at
  before update on public.capabilities
  for each row execute function update_capability_updated_at();
