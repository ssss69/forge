import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const durations = [25, 45, 60, 90, 180];

export default function FocusScreen() {
  const [duration, setDuration] = useState(45);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function startFocus() {
    setMessage("");

    if (!isSupabaseConfigured) {
      setMessage("Add Supabase values to apps/mobile/.env to sync focus sessions.");
      return;
    }

    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setMessage("Sign in first, then Forge can save your focus session.");
        return;
      }

      const { error } = await supabase.from("focus_sessions").insert({
        user_id: user.id,
        planned_minutes: duration,
        strict_mode: true,
        status: "active",
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(`${duration} minute focus session started.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to start focus session.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.screen}>
      <Animated.View entering={FadeIn.duration(360)} style={styles.timer}>
        <Text style={styles.duration}>{duration}</Text>
        <Text style={styles.minutes}>minutes</Text>
      </Animated.View>

      <View style={styles.row}>
        {durations.map((value) => (
          <Pressable
            key={value}
            onPress={() => setDuration(value)}
            style={[styles.durationButton, duration === value && styles.activeButton]}
          >
            <Text style={[styles.durationText, duration === value && styles.activeText]}>
              {value === 180 ? "3h" : `${value}m`}
            </Text>
          </Pressable>
        ))}
      </View>

      <Animated.View entering={FadeInDown.delay(140)} style={styles.panel}>
        <Text style={styles.panelTitle}>Strict Mode</Text>
        <Text style={styles.copy}>
          Distracting apps stay locked until the mission stack is complete or an emergency unlock is used.
        </Text>
      </Animated.View>

      <Pressable disabled={saving} onPress={startFocus} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>{saving ? "Starting..." : "Begin deep focus"}</Text>
      </Pressable>
      {message ? (
        <Text style={styles.setupText}>{message}</Text>
      ) : !isSupabaseConfigured ? (
        <Text style={styles.setupText}>
          Add Supabase values to apps/mobile/.env to sync focus sessions.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080a0f",
    padding: 20,
    paddingTop: 86,
    gap: 22,
  },
  timer: {
    width: 260,
    height: 260,
    borderRadius: 999,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 12,
    borderColor: "#7cf4c4",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  duration: {
    color: "#f7f7fb",
    fontSize: 72,
    fontWeight: "900",
  },
  minutes: {
    color: "#aeb5c8",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  durationButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  activeButton: {
    backgroundColor: "#7cf4c4",
  },
  durationText: {
    color: "#f7f7fb",
    fontWeight: "800",
  },
  activeText: {
    color: "#07110d",
  },
  panel: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  panelTitle: {
    color: "#f7f7fb",
    fontSize: 24,
    fontWeight: "900",
  },
  copy: {
    color: "#aeb5c8",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: "#ffd166",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#120d02",
    fontSize: 16,
    fontWeight: "900",
  },
  setupText: {
    color: "#aeb5c8",
    lineHeight: 22,
    textAlign: "center",
  },
});
