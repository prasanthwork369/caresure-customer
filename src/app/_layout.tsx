import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { queryClient } from "@/lib/react-query/queryClient";
import { rootStackScreenOptions } from "@/navigation";

export default function RootLayout() {
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
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SafeAreaProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
