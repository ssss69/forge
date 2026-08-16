import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Forge",
  slug: "forge",
  scheme: "forge",
  version: "0.1.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "app.forge.mobile",
  },
  android: {
    package: "app.forge.mobile",
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-notifications",
    "react-native-reanimated/plugin",
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
