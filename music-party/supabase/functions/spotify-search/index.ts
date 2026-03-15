// Supabase Edge Function: spotify-search
// Security: Spotify credentials are read from server-side env vars only.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { query } = await req.json();
  if (!query) return new Response(JSON.stringify({ error: 'query is required' }), { status: 400 });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  void supabase; // placeholder for session/token lookup from host_provider_sessions.

  return new Response(JSON.stringify({ candidates: [], note: 'Implement with Spotify access token lookup.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
