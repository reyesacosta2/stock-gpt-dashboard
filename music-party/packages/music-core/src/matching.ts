import type { SpotifyTrackCandidate } from '@music-party/types';
import { normalizeSongRequest } from './normalize';

export interface MatchInput {
  title: string;
  artist: string;
  album?: string;
  durationMs?: number;
  explicitPreference?: 'explicit' | 'clean' | 'no_preference';
}

export interface CandidateScore {
  candidate: SpotifyTrackCandidate;
  confidenceScore: number;
  reviewNeeded: boolean;
  status: 'auto_match' | 'review_needed' | 'failed';
  matchReason: {
    titleScore: number;
    artistScore: number;
    durationScore: number;
    albumBonus: number;
    explicitBonus: number;
  };
}

const ratio = (a: string, b: string): number => {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const shorter = a.length < b.length ? a : b;
  const longer = a.length >= b.length ? a : b;
  return shorter.length / longer.length;
};

const durationScore = (requested?: number, candidate?: number): number => {
  if (!requested || !candidate) return 0.5;
  const diff = Math.abs(requested - candidate);
  if (diff <= 3000) return 1;
  if (diff <= 7000) return 0.8;
  if (diff <= 15000) return 0.5;
  return 0.2;
};

export const scoreCandidate = (request: MatchInput, candidate: SpotifyTrackCandidate): CandidateScore => {
  const normalizedRequest = normalizeSongRequest({
    title: request.title,
    artist: request.artist,
    album: request.album,
    durationMs: request.durationMs,
    explicitPreference: request.explicitPreference,
  });

  const titleScore = ratio(normalizedRequest.normalizedTitle, candidate.title.toLowerCase());
  const artistScore = Math.max(
    ...candidate.artists.map((artist) => ratio(normalizedRequest.normalizedArtist, artist.toLowerCase())),
  );
  const duration = durationScore(request.durationMs, candidate.durationMs);
  const albumBonus = normalizedRequest.normalizedAlbum && candidate.album
    ? ratio(normalizedRequest.normalizedAlbum, candidate.album.toLowerCase()) * 0.08
    : 0;
  const explicitBonus =
    request.explicitPreference && request.explicitPreference !== 'no_preference'
      ? candidate.isExplicit === (request.explicitPreference === 'explicit')
        ? 0.04
        : -0.04
      : 0;

  const confidenceScore = Math.min(
    1,
    Math.max(0, titleScore * 0.45 + artistScore * 0.35 + duration * 0.2 + albumBonus + explicitBonus),
  );

  const status =
    confidenceScore >= 0.9 ? 'auto_match' : confidenceScore >= 0.75 ? 'review_needed' : 'failed';

  return {
    candidate,
    confidenceScore,
    reviewNeeded: status === 'review_needed',
    status,
    matchReason: {
      titleScore,
      artistScore,
      durationScore: duration,
      albumBonus,
      explicitBonus,
    },
  };
};

export const rankCandidates = (request: MatchInput, candidates: SpotifyTrackCandidate[]): CandidateScore[] =>
  candidates.map((candidate) => scoreCandidate(request, candidate)).sort((a, b) => b.confidenceScore - a.confidenceScore);
