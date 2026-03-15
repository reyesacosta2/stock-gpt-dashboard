# Schema

Migration file: `supabase/migrations/202603150001_init_music_party.sql`

## Tables
- `rooms`
- `room_members`
- `song_requests`
- `track_mappings`
- `votes`
- `host_provider_sessions`

## Notes
- `track_mappings` supports multiple candidates by using `is_primary` with unique partial index.
- `host_provider_sessions` stores encrypted tokens server-side only.
- `room_members.left_at` enables future soft-leave behavior.

## Index strategy
- fast join code lookup (`rooms.join_code`)
- queue ordering retrieval (`song_requests(room_id, queue_position)`)
- vote aggregation paths (`votes(room_id, song_request_id)`)
