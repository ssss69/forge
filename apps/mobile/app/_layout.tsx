import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "@/lib/notifications";

const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export default function RootLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync().catch(() => {
      // Permission can be denied; onboarding will surface this gently later.
    });
  }, []);

  const stack = (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#080a0f" },
        }}
      />
    </>
  );

  if (!posthogKey) {
    return stack;
  }

  return (
    <PostHogProvider apiKey={posthogKey} options={{ host: posthogHost }}>
      {stack}
    </PostHogProvider>
  );
}
