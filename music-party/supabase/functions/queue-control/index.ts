// Supabase Edge Function: queue-control
// Host-only moderation endpoint for approve/queue/skip transitions.
Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { action } = await req.json();
  if (!action) return new Response(JSON.stringify({ error: 'action is required' }), { status: 400 });

  return new Response(JSON.stringify({ ok: true, action, note: 'Queue control wiring scaffolded for MVP.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
