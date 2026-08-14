import { Pressable } from "react-native";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { colors, fontWeight, typography } from "@/theme";

import { ICON_SIZE, styles } from "./PillTabItem.styles";

interface PillTabItemProps {
  index: number;
  label: string;
  icon: ComponentType<SvgProps>;
  activeIcon: ComponentType<SvgProps>;
  isActive: boolean;
  /** Shared with the sliding pill indicator so both move in lockstep. */
  followerX: SharedValue<number>;
  pillOpacity: SharedValue<number>;
  onPress: () => void;
}

/**
 * One pill tab: crossfades outline/filled artwork and nudges label color
 * based on proximity to the active tab.
 */
export function PillTabItem({
  index,
  label,
  // Already Animated-wrapped in tabConfig.ts — nothing to create here.
  icon: AnimatedIcon,
  activeIcon: AnimatedActiveIcon,
  isActive,
  followerX,
  pillOpacity,
  onPress,
}: PillTabItemProps) {
  const activeIconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(followerX.value - index);
    const weight =
      distance < 0.3
        ? interpolate(distance, [0, 0.2], [1, 0], Extrapolation.CLAMP) *
          pillOpacity.value
        : 0;
    return { opacity: weight };
  });

  const inactiveIconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(followerX.value - index);
    const weight =
      distance < 0.3
        ? interpolate(distance, [0, 0.2], [1, 0], Extrapolation.CLAMP) *
          pillOpacity.value
        : 0;
    return { opacity: 1 - weight };
  });

  const zoomStyle = useAnimatedStyle(() => {
    const distance = Math.abs(followerX.value - index);
    const scale = interpolate(distance, [0, 0.4], [1.1, 1], Extrapolation.CLAMP);
    return { transform: [{ scale: 1 + (scale - 1) * pillOpacity.value }] };
  });

  const labelStyle = useAnimatedStyle(() => {
    const distance = Math.abs(followerX.value - index);
    const weight =
      interpolate(distance, [0, 0.2], [1, 0], Extrapolation.CLAMP) *
      pillOpacity.value;
    return {
      color: interpolateColor(weight, [0, 1], [
        colors.text.secondary,
        colors.brand.primary,
      ]),
      fontWeight: weight > 0.5 ? fontWeight.bold : fontWeight.medium,
    };
  });

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.item}
    >
      <Animated.View style={[styles.iconWrap, zoomStyle]}>
        <Animated.View style={[styles.iconLayer, activeIconStyle]}>
          <AnimatedActiveIcon width={ICON_SIZE} height={ICON_SIZE} />
        </Animated.View>
        <Animated.View style={[styles.iconLayer, inactiveIconStyle]}>
          <AnimatedIcon width={ICON_SIZE} height={ICON_SIZE} />
        </Animated.View>
      </Animated.View>
      <Animated.Text
        style={[typography.tiny, styles.label, labelStyle]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}
