import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that env vars are actual URLs/keys, not placeholders
const isValidConfig =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  supabaseAnonKey.length > 20;

export const supabase = isValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
