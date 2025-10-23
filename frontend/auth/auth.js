import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Sign up a new user. Supabase will send a confirmation email to the user.
 * @param {string} email
 * @param {string} password
 */
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Redirect URL user sees after clicking confirmation link (optional)
      emailRedirectTo: 'https://your-app.com/welcome', // change as needed
    },
  });
  return { data, error };
}

/**
 * Sign in an existing user.
 * @param {string} email
 * @param {string} password
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/**
 * Get the current signed-in user (if logged in).
 */
export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * Listen for auth state changes.
 * @param {Function} callback - function(event, session)
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
