import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAppFonts } from "@/hooks/useAppFonts";
import { queryClient } from "@/lib/react-query/queryClient";
import { rootStackScreenOptions, screenTransitions } from "@/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  useEffect(() => {
    useAuthStore.getState().initialize();
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
            {/* Pinned to dark content: the theme foundation is light-only for
                now, so status bar text must not flip light when the device
                is in system dark mode. */}
            <StatusBar style="dark" />
            <Stack screenOptions={rootStackScreenOptions}>
              <Stack.Screen name="index" options={screenTransitions.fade} />
              <Stack.Screen name="(auth)" options={screenTransitions.none} />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SafeAreaProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
