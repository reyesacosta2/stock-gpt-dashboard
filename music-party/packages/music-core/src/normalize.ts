import { z } from 'zod';

export const rawRequestSchema = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  album: z.string().optional(),
  durationMs: z.number().int().positive().optional(),
  explicitPreference: z.enum(['explicit', 'clean', 'no_preference']).optional(),
});

const NOISE_PATTERNS = [
  /\(?(?:\d{4}\s*)?remaster(?:ed)?(?:\s*\d{4})?\)?/gi,
  /\(?live\)?/gi,
  /\(?sped\s*up\)?/gi,
  /\(?slowed(?:\s*\+\s*reverb)?\)?/gi,
  /\(?deluxe(?:\s*edition)?\)?/gi,
  /\(?clean\)?/gi,
  /\(?explicit\)?/gi,
];

export interface NormalizedSong {
  normalizedTitle: string;
  normalizedArtist: string;
  normalizedAlbum?: string;
}

const sanitize = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[“”‘’]/g, "'")
    .replace(/[‐‑–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

const stripFeaturing = (value: string): string =>
  value
    .replace(/\b(ft\.?|feat\.?|featuring)\b.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();

const stripNoiseSuffixes = (value: string): string => {
  let next = value;
  NOISE_PATTERNS.forEach((pattern) => {
    next = next.replace(pattern, '');
  });

  return next
    .replace(/\s+-\s+$/g, '')
    .replace(/\s+\(\s*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const normalizeSongRequest = (input: z.input<typeof rawRequestSchema>): NormalizedSong => {
  const parsed = rawRequestSchema.parse(input);

  const normalizedTitle = stripNoiseSuffixes(sanitize(parsed.title)).toLowerCase();
  const normalizedArtist = stripFeaturing(sanitize(parsed.artist)).toLowerCase();

  return {
    normalizedTitle,
    normalizedArtist,
    normalizedAlbum: parsed.album ? sanitize(parsed.album).toLowerCase() : undefined,
  };
};
