# Nujeel

AI-powered Technology Talent Intelligence and Capability Network.

Describe the capability you need. Nujeel finds who can deliver it.

## Getting Started

1. Copy `.env.example` to `.env.local` and fill in Supabase credentials
2. `npm install`
3. `npm run db:migrate` to create the database schema
4. `npm run seed` to populate geography data
5. `npm run dev` to start the development server

## Project Structure

- `app/` — Next.js App Router pages and layouts
- `lib/supabase/` — Supabase client instances
- `lib/i18n/` — Custom bilingual (English/Arabic) internationalization
- `lib/geography/` — Global geography model utilities
- `lib/auth/` — Authentication and role-based access control
- `database/migrations/` — Supabase SQL migrations
- `database/seed/` — Fictional seed data scripts
- `components/` — Shared React components
- `lib/ai/` — AI service abstraction layer (Phase 4+)
- `lib/matching/` — Matching engine (Phase 7+)
