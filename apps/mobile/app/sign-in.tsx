import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "@/lib/supabase";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMagicLink() {
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "forge://",
        },
      });

      if (error) throw error;
      setMessage("Check your email for the Forge sign-in link.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send sign-in link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Supabase Auth</Text>
      <Text style={styles.title}>Sign in to sync your growth system.</Text>
      <TextInput
        autoCapitalize="none"
        autoComplete="email"
        inputMode="email"
        onChangeText={setEmail}
        placeholder="you@example.com"
        placeholderTextColor="#6f7789"
        style={styles.input}
        value={email}
      />
      <Pressable disabled={loading || !email} onPress={sendMagicLink} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? "Sending..." : "Send magic link"}</Text>
      </Pressable>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080a0f",
    padding: 20,
    paddingTop: 96,
  },
  eyebrow: {
    color: "#7cf4c4",
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  title: {
    color: "#f7f7fb",
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    marginBottom: 28,
  },
  input: {
    minHeight: 56,
    borderRadius: 18,
    paddingHorizontal: 18,
    color: "#f7f7fb",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    fontSize: 16,
  },
  button: {
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: "#7cf4c4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#07110d",
    fontWeight: "900",
    fontSize: 16,
  },
  message: {
    color: "#aeb5c8",
    lineHeight: 22,
    marginTop: 18,
  },
});
