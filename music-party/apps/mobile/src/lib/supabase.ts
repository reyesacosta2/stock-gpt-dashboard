import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Security: only public anon values are expected on client; service role must stay server-side.
  console.warn('Missing Supabase env values for client init.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
