import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Database } from "./supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://mtktimngklgdhdjznaxr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10a3RpbW5na2xnZGhkanpuYXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNzQ2ODMsImV4cCI6MjA1Njg1MDY4M30.QNlMAMDVzCb-DEeijrBRJveVnEk7B5g4Z4KOBeQBZ2Q";

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
    storage: ExpoStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
