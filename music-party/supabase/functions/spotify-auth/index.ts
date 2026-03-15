// Supabase Edge Function: spotify-auth
// Handles exchange/refresh server-side. Do not move secret handling to client.
Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  return new Response(
    JSON.stringify({
      ok: true,
      note: 'OAuth exchange scaffolded. Configure Spotify app + redirect URI in docs/setup-spotify.md.',
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
});
