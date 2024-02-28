import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Database } from "./supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://jpgbhncvkbrgjirszsal.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZ2JobmN2a2JyZ2ppcnN6c2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MTAyNjMsImV4cCI6MjAyNDE4NjI2M30.jws2goYjkBPXaPOw0fA4KC4Ji2F7O7ryFJvT1-9reyw";

const ExpoStorage = {
  setItem: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item:", error);
    }
  },
  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  },
};
export const supabase = createClient<Database>(supabaseURL, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
