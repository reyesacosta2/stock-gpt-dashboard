# Architecture

## Layers

### 1) Social layer
- Room lifecycle: create/join/close.
- Membership + host role.
- Shared queue and votes.
- Host moderation and controls.

### 2) Canonical song layer
- Provider-independent request storage (`song_requests`).
- Normalization and scoring in `packages/music-core`.
- Mappings + confidence reason (`track_mappings.match_reason`).

### 3) Playback adapter layer
- `SpotifyPlaybackAdapter` interface implementation boundary in mobile.
- Server-side Spotify operations via Supabase Edge Functions.

## Realtime
- Supabase Realtime publication includes `rooms`, `room_members`, `song_requests`, `votes`.
- Mobile should subscribe to room-scoped changes and reconcile queue state.

## Why this split
It keeps queue/social behavior decoupled from provider APIs so additional providers can be added later without rewriting core room logic.
