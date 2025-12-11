import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://lemqkbcedumyobezibiv.supabase.co';
const supabaseKey = 'sb_publishable_gbU8ceL1v6eu0daYYbkxtA_g4TLIfe9';

console.log(
  'ENV CHECK',
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);


if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_KEY');
}

console.log('URL', supabaseUrl, 'KEY', !!supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true }
});
// --- auth helpers ---

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://your-app.com/welcome',
    },
  });
  return { data, error };
} 

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return;
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error(error);
  await supabase.auth.getSession(); // Force refresh
// Navigate to login screen
}
