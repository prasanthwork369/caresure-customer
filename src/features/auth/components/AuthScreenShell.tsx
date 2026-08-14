import ArrowForwardDarkGreenIcon from "@/assets/icons/arrow_forward_darkgreen.svg";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import {
  type LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/authStore";

import { AuthBackground } from "./AuthBackground";
import { styles } from "./AuthScreenShell.styles";

interface AuthScreenShellProps {
  children: ReactNode;
  footer?: ReactNode;
}

// Crash guard only — panelTopY (measured on every layout pass) overrides
// this the instant the panel has rendered once.
const MIN_BACKGROUND_HEIGHT = 80;

// Shared chrome for Login/OTP: background, Skip-to-guest button, and a
// bottom-anchored white panel that rises above the keyboard.
export function AuthScreenShell({ children, footer }: AuthScreenShellProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest);
  const { height: screenHeight } = useWindowDimensions();

  // The medicine background's own bottom fade only reaches solid white at
  // ITS bottom edge (see AuthBackground.styles.ts bottomFade). This height
  // must therefore always match exactly where the white panel begins —
  // otherwise the fade finishes off-screen behind the panel and the panel's
  // rounded top edge cuts a flat, ungraded line instead of a visible curve.
  // Proven approach ported from the old app's AuthScreenShell.
  const panelTopY = useSharedValue(screenHeight * 0.6);
  const backgroundStyle = useAnimatedStyle(() => ({
    height: Math.max(MIN_BACKGROUND_HEIGHT, panelTopY.value),
  }));
  const handlePanelLayout = (e: LayoutChangeEvent) => {
    panelTopY.value = e.nativeEvent.layout.y;
  };

  const handleSkip = () => {
    continueAsGuest();
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.background, backgroundStyle]}>
        <AuthBackground />
      </Animated.View>

      <Pressable
        onPress={handleSkip}
        style={[styles.skipButton, { top: insets.top + 12 }]}
        accessibilityRole="button"
        accessibilityLabel="Skip"
      >
        <BlurView
          intensity={60}
          tint="systemChromeMaterialLight"
          style={styles.skipBlur}
        >
          <Text style={styles.skipText}>Skip</Text>
          <ArrowForwardDarkGreenIcon width={7} height={12} />
        </BlurView>
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View
            style={[styles.panel, { paddingBottom: insets.bottom + 24 }]}
            onLayout={handlePanelLayout}
          >
            {children}
            {footer}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
