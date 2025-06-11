import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.SUPABASE_URL || 'https://oblizsnafpjwumiohham.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ibGl6c25hZnBqd3VtaW9oaGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzE0NjAsImV4cCI6MjA2NTE0NzQ2MH0.oVNUFJHvgaw5GVRQ0YZAvZavKaYS6EoWDgT8zNXyhz8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 