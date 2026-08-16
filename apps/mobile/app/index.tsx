import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const metrics = [
  ["Streak", "18d"],
  ["Level", "24"],
  ["XP", "1,840"],
  ["Focus", "3.6h"],
];

const missions = [
  "Physics revision sprint",
  "45 min deep work",
  "Evening workout",
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeInUp.duration(420)} style={styles.hero}>
        <Text style={styles.eyebrow}>Forge</Text>
        <Text style={styles.title}>Turn discipline into a daily game.</Text>
        <Text style={styles.copy}>
          Goals, deep focus, adaptive blocking, AI coaching, and RPG progress in one calm mobile OS.
        </Text>
        <Link href="/focus" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Start focus</Text>
          </Pressable>
        </Link>
        <Link href="/sign-in" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Sign in</Text>
          </Pressable>
        </Link>
      </Animated.View>

      <View style={styles.grid}>
        {metrics.map(([label, value], index) => (
          <Animated.View entering={FadeInDown.delay(index * 70)} key={label} style={styles.metric}>
            <Text style={styles.metricLabel}>{label}</Text>
            <Text style={styles.metricValue}>{value}</Text>
          </Animated.View>
        ))}
      </View>

      <Animated.View entering={FadeInDown.delay(280)} style={styles.panel}>
        <Text style={styles.panelTitle}>Today&apos;s missions</Text>
        {missions.map((mission) => (
          <View key={mission} style={styles.missionRow}>
            <View style={styles.dot} />
            <Text style={styles.missionText}>{mission}</Text>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080a0f",
  },
  content: {
    padding: 20,
    paddingTop: 72,
    gap: 18,
  },
  hero: {
    borderRadius: 32,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  eyebrow: {
    color: "#7cf4c4",
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  title: {
    color: "#f7f7fb",
    fontSize: 42,
    lineHeight: 44,
    fontWeight: "900",
  },
  copy: {
    color: "#aeb5c8",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: "#7cf4c4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  primaryButtonText: {
    color: "#07110d",
    fontWeight: "900",
    fontSize: 16,
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#f7f7fb",
    fontWeight: "800",
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metric: {
    width: "47.8%",
    borderRadius: 24,
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  metricLabel: {
    color: "#aeb5c8",
  },
  metricValue: {
    color: "#f7f7fb",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 8,
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
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 16,
  },
  missionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#ffd166",
  },
  missionText: {
    color: "#d9deea",
    fontSize: 16,
  },
});
