import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Image, Pressable, type ImageSourcePropType } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { colors, springs } from "@/theme";

import { FAB_ICON_SIZE, styles } from "./FabButton.styles";

interface FabButtonProps {
  icon: ImageSourcePropType;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

// Figma-sourced slide distances — each icon/label fully clears the button.
const ICON_OFF_LEFT = -100;
const LABEL_OFF_RIGHT = 150;

// Attention-cycle timing: reveal after mount, hold, repeat, then stop.
const AUTO_REVEAL_DELAY_MS = 500;
const HOLD_REVEALED_MS = 2200;
const HOLD_COLLAPSED_MS = 1400;
const MAX_CYCLES = 3;

/**
 * Prescription CTA — periodically reveals its label after mount, then
 * settles to icon-only. Reduced motion skips the cycle; pressing still works.
 */
export function FabButton({ icon, label, isActive, onPress }: FabButtonProps) {
  const reducedMotion = useReducedMotion();
  const iconTranslate = useSharedValue(0);
  const labelTranslate = useSharedValue(LABEL_OFF_RIGHT);

  useEffect(() => {
    if (reducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;
    let completedCycles = 0;

    const reveal = (expand: boolean) => {
      if (expand) {
        iconTranslate.value = withSpring(ICON_OFF_LEFT, springs.gentle);
        labelTranslate.value = withSpring(0, springs.gentle);
      } else {
        labelTranslate.value = withSpring(LABEL_OFF_RIGHT, springs.gentle);
        iconTranslate.value = withSpring(0, springs.gentle);
      }
      // Stop once cycles are spent so an idle screen animates nothing.
      if (!expand && ++completedCycles >= MAX_CYCLES) return;
      timeout = setTimeout(
        () => reveal(!expand),
        expand ? HOLD_REVEALED_MS : HOLD_COLLAPSED_MS,
      );
    };

    timeout = setTimeout(() => reveal(true), AUTO_REVEAL_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: iconTranslate.value }],
  }));
  const labelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: labelTranslate.value }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
      onPress={handlePress}
      style={styles.button}
    >
      <LinearGradient
        colors={colors.gradients.upload}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Animated.View style={[styles.iconLayer, iconStyle]}>
          <Image
            source={icon}
            style={{ width: FAB_ICON_SIZE, height: FAB_ICON_SIZE }}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.Text style={[styles.label, labelStyle]} numberOfLines={1}>
          {label}
        </Animated.Text>
      </LinearGradient>
    </Pressable>
  );
}
