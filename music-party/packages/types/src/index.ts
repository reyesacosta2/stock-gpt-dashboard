export type HostService = 'spotify';
export type RoomStatus = 'active' | 'closed';
export type RoomRole = 'host' | 'guest';

export type SongRequestStatus =
  | 'pending'
  | 'matched'
  | 'review_needed'
  | 'failed'
  | 'approved'
  | 'queued'
  | 'played'
  | 'skipped';

export type OriginalSourceType =
  | 'search'
  | 'spotify_link'
  | 'apple_music_link'
  | 'youtube_link'
  | 'manual';

export type ExplicitPreference = 'explicit' | 'clean' | 'no_preference';

export interface CanonicalSongRequest {
  id: string;
  roomId: string;
  submittedByUserId: string;
  originalInput: string;
  originalSourceType: OriginalSourceType;
  normalizedTitle: string;
  normalizedArtist: string;
  normalizedAlbum?: string | null;
  durationMs?: number | null;
  explicitPreference?: ExplicitPreference | null;
  status: SongRequestStatus;
  queuePosition?: number | null;
}

export interface TrackMapping {
  id: string;
  songRequestId: string;
  provider: HostService;
  providerTrackId: string;
  providerUri: string;
  matchedTitle: string;
  matchedArtist: string;
  matchedAlbum?: string | null;
  matchedDurationMs?: number | null;
  artworkUrl?: string | null;
  isExplicit?: boolean | null;
  confidenceScore: number;
  matchReason: Record<string, unknown>;
  reviewNeeded: boolean;
}

export interface SpotifyTrackCandidate {
  providerTrackId: string;
  providerUri: string;
  title: string;
  artists: string[];
  album?: string;
  durationMs?: number;
  isExplicit?: boolean;
  artworkUrl?: string;
}
