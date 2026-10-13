import type { ConfigContext, ExpoConfig } from "expo/config";

const appEnv = process.env.EXPO_PUBLIC_APP_ENV ?? "development";
const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://qa-csapi.codeneptune.com";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "CareSure",
  slug: "CareSure",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "caresure",
  userInterfaceStyle: "automatic",
  runtimeVersion: {
    policy: "fingerprint",
  },
  ios: {
    icon: "./assets/expo.icon",
    bundleIdentifier: "com.codeneptune.caresure",
    supportsTablet: true,
  },
  android: {
    package: "com.codeneptune.caresure",
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        image: "./assets/images/splash-icon.png",
        imageWidth: 76,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    // Disabled: its mutation analysis doesn't understand Reanimated's
    // `.value` shared-value pattern (used throughout the tab bar animation
    // and every future animated feature) and flags it as a false-positive
    // error. The auto-memoization it would provide is a minor nicety we
    // already get manually via the permanent no-unnecessary-rerenders rule.
  },
  extra: {
    appEnv,
    apiBaseUrl,
  },
});
