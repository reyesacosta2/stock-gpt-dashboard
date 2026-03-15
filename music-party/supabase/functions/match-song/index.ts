import { normalizeSongRequest, rankCandidates } from '../../../packages/music-core/src/index.ts';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const body = await req.json();
  const normalized = normalizeSongRequest({
    title: body.title,
    artist: body.artist,
    album: body.album,
    durationMs: body.durationMs,
    explicitPreference: body.explicitPreference,
  });

  const ranked = rankCandidates(
    {
      title: body.title,
      artist: body.artist,
      album: body.album,
      durationMs: body.durationMs,
      explicitPreference: body.explicitPreference,
    },
    body.candidates ?? [],
  );

  return new Response(JSON.stringify({ normalized, ranked }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
