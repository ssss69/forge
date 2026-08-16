import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const rawSupabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim();
const authRedirectUrl = process.env.EXPO_PUBLIC_AUTH_REDIRECT_URL?.trim();

function normalizeSupabaseUrl(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (!url.hostname.endsWith(".supabase.co")) return null;

    return `${url.protocol}//${url.hostname}`;
  } catch {
    return null;
  }
}

const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);

function getSupabaseConfigError() {
  if (!rawSupabaseUrl || !supabaseAnonKey) {
    return "Add Supabase values to apps/mobile/.env before signing in.";
  }

  if (!supabaseUrl) {
    return "EXPO_PUBLIC_SUPABASE_URL must be a valid https://your-project-ref.supabase.co URL.";
  }

  return null;
}

export const supabaseConfigError = getSupabaseConfigError();
export const isSupabaseConfigured = !supabaseConfigError;

export function getAuthRedirectUrl() {
  if (authRedirectUrl) {
    return authRedirectUrl;
  }

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
