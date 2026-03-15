import type { CanonicalSongRequest, SpotifyTrackCandidate } from '@music-party/types';

export interface PlaybackAdapter {
  searchTracks(query: string): Promise<SpotifyTrackCandidate[]>;
  getTrackCandidates(songRequest: CanonicalSongRequest): Promise<SpotifyTrackCandidate[]>;
  addToQueue(providerTrackUri: string): Promise<void>;
  getCurrentPlayback(): Promise<{ trackName?: string; artistName?: string; isPlaying: boolean }>;
  skipNext(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
}

export class SpotifyPlaybackAdapter implements PlaybackAdapter {
  async searchTracks(_query: string): Promise<SpotifyTrackCandidate[]> {
    return [];
  }

  async getTrackCandidates(_songRequest: CanonicalSongRequest): Promise<SpotifyTrackCandidate[]> {
    return [];
  }

  async addToQueue(_providerTrackUri: string): Promise<void> {}

  async getCurrentPlayback(): Promise<{ trackName?: string; artistName?: string; isPlaying: boolean }> {
    return { isPlaying: false };
  }

  async skipNext(): Promise<void> {}
  async pause(): Promise<void> {}
  async resume(): Promise<void> {}
}
