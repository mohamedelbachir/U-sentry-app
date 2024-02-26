import "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://jpgbhncvkbrgjirszsal.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZ2JobmN2a2JyZ2ppcnN6c2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MTAyNjMsImV4cCI6MjAyNDE4NjI2M30.jws2goYjkBPXaPOw0fA4KC4Ji2F7O7ryFJvT1-9reyw";

export const supabase = createClient(supabaseURL, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
