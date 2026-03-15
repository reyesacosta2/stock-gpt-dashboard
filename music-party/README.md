# Music Party (MVP)

Mobile-first social music queue where a host plays through Spotify and guests submit provider-agnostic song requests.

## Monorepo structure

- `apps/mobile` – Expo React Native app
- `packages/types` – shared domain types
- `packages/music-core` – normalization + matching engine
- `packages/ui` – shared design tokens
- `supabase/migrations` – SQL schema
- `supabase/functions` – edge function scaffolds
- `docs` – architecture and setup docs

## Local setup

1. `cd music-party`
2. `pnpm install`
3. `cp .env.example .env` and fill values
4. Run mobile app: `pnpm dev`
5. Run tests: `pnpm test`

## Supabase setup

1. Create a Supabase project.
2. Apply migration in `supabase/migrations/202603150001_init_music_party.sql`.
3. Deploy edge functions in `supabase/functions/*`.

## MVP flow supported by current scaffold

- Host creates Spotify room
- Guest joins by code
- Guest submits neutral request
- Matching logic scores candidates
- Host review path exists for low-confidence songs
- Queue state + voting model in place

## TODO / FUTURE

- Wire full Spotify OAuth token exchange and secure token encryption lifecycle.
- Replace local Zustand room demo state with Supabase-backed realtime data.
- Add integration tests against Supabase local stack.
- Add conflict handling for concurrent queue operations.
