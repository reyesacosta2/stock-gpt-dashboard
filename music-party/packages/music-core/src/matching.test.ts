import { describe, expect, it } from 'vitest';
import { normalizeSongRequest } from './normalize';
import { rankCandidates } from './matching';

describe('normalizeSongRequest', () => {
  it('normalizes spacing and noisy suffixes', () => {
    const out = normalizeSongRequest({
      title: '  Blinding Lights (Remastered 2020)  ',
      artist: 'The Weeknd feat. Rosalia',
    });

    expect(out.normalizedTitle).toBe('blinding lights');
    expect(out.normalizedArtist).toBe('the weeknd');
  });
});

describe('rankCandidates', () => {
  it('returns an auto match for strong similarity', () => {
    const ranked = rankCandidates(
      { title: 'Blinding Lights', artist: 'The Weeknd', durationMs: 200000 },
      [
        {
          providerTrackId: '1',
          providerUri: 'spotify:track:1',
          title: 'Blinding Lights',
          artists: ['The Weeknd'],
          durationMs: 200123,
        },
      ],
    );

    expect(ranked[0]?.status).toBe('auto_match');
    expect(ranked[0]?.confidenceScore).toBeGreaterThanOrEqual(0.9);
  });
});
