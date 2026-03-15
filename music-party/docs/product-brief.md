# Product brief: Music Party

## What the app does
Music Party lets a room host run playback from Spotify while guests add requests through text search or links from any platform. Requests are stored as neutral metadata, then matched to Spotify for host playback.

## What it does not do (v1)
- No Apple Music playback adapter
- No cross-service playback
- No in-app audio streaming
- No lyrics, friend graphs, profile social network, or recommendations

## Why host-provider model
A single host provider keeps playback deterministic, simplifies legal/technical scope, and still allows open guest participation through provider-agnostic requests.

## v1 success criteria
1. Host can create a Spotify-backed room.
2. Guests can join via short code and submit songs.
3. System can auto-match or route low-confidence matches for host review.
4. Host can execute basic queue controls.
5. Room updates stay synced in realtime.
