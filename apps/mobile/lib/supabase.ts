import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim();

function getSupabaseConfigError() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return "Add Supabase values to apps/mobile/.env before signing in.";
  }

  try {
    const url = new URL(supabaseUrl);
    if (!url.hostname.endsWith(".supabase.co") || url.pathname !== "/") {
      return "EXPO_PUBLIC_SUPABASE_URL must look like https://your-project-ref.supabase.co with no extra path.";
    }
  } catch {
    return "EXPO_PUBLIC_SUPABASE_URL must be a valid https://your-project-ref.supabase.co URL.";
  }

  return null;
}

export const supabaseConfigError = getSupabaseConfigError();
export const isSupabaseConfigured = !supabaseConfigError;

export function getAuthRedirectUrl() {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.origin}/sign-in`;
  }

  return "forge://sign-in";
}

export const supabase = createClient(
  supabaseUrl ?? "https://example.supabase.co",
  supabaseAnonKey ?? "missing-anon-key",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
