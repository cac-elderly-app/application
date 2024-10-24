import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from './database';

// Environment variables for Supabase
const SUPABASE_URL = process.env.EXPO_PUBLIC_API_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_ANON;

// Throw an error if the environment variables are missing
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase URL or anon key environment variables.');
}

const supabase: SupabaseClient<Database> = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, 
    },
  });


export default supabase;
