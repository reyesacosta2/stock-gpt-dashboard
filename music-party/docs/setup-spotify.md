# Spotify setup

## Security model
- Spotify client secret is server-side only (Supabase function env vars).
- Mobile app never receives Spotify secret.
- Access and refresh tokens are stored in `host_provider_sessions` using encrypted-at-rest fields.

## Required env vars
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REDIRECT_URI`
- `SUPABASE_SERVICE_ROLE_KEY`

## Implementation status
- OAuth + token refresh endpoints are scaffolded in `supabase/functions/spotify-auth`.
- Spotify search endpoint scaffolded in `supabase/functions/spotify-search`.
- Full production OAuth callback + refresh persistence remains TODO pending real credentials.
