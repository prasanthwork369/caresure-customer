import { QueryClientProvider } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAppFonts } from "@/hooks/useAppFonts";
import { queryClient } from "@/lib/react-query/queryClient";
import { rootStackScreenOptions, screenTransitions } from "@/navigation";
import { useAuthStore } from "@/store/authStore";
import { colors } from "@/theme";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  // Edge-to-edge (mandatory since SDK 55) makes the nav bar transparent —
  // without an explicit style, its icons can end up unreadable against
  // whatever's drawn behind them. Matches the old app's proven setup.
  // Guarded: this native module only exists in a build made after it was
  // added, so it must not throw against an older dev client still running.
  useEffect(() => {
    if (Platform.OS === "android") {
      try {
        NavigationBar.setStyle("dark");
      } catch {
        // Native module not linked yet in the currently-installed build —
        // resolves itself after the next native rebuild.
      }
    }
  }, []);

  // Android measures text with whichever family is active at that moment
  // and never re-measures once a font loads later, so nothing may mount
  // before Inter is ready. iOS/web load no fonts here (useAppFonts is a
  // no-op off Android) but useFonts({}) still resolves on a later tick, so
  // gating on it there would blank a static/SSR render forever — only wait
  // on the platform that's actually loading something.
  if (Platform.OS === "android" && !fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <SafeAreaProvider>
            {/* Explicit white background at the true window root — edge-to-edge
                makes the status/nav bars transparent, so without this the strip
                behind them has no guaranteed color of its own. Matches the old
                app's proven root wrapper. */}
            <View style={{ flex: 1, backgroundColor: colors.white }}>
              {/* Pinned to dark content: the theme foundation is light-only for
                  now, so status bar text must not flip light when the device
                  is in system dark mode. */}
              <StatusBar style="dark" />
              <Stack screenOptions={rootStackScreenOptions}>
                <Stack.Screen name="index" options={screenTransitions.fade} />
                <Stack.Screen name="(auth)" options={screenTransitions.none} />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </View>
          </SafeAreaProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
