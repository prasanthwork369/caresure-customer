import * as Haptics from "expo-haptics";
import { useEffect, useMemo } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { durations, springs } from "@/theme";

import { PILL_TAB_COUNT } from "./TabBar.styles";

interface UseTabBarAnimationParams {
  /** Index within the 3 pill tabs, or -1 when Prescription (outside the pill) is active. */
  activePillIndex: number;
  onNavigateToPillTab: (index: number) => void;
}

/**
 * Drives the sliding/stretching active-pill indicator. Position is tracked
 * as a tab index (0..PILL_TAB_COUNT-1) so left/width can be percentages —
 * pixels are only needed to translate a drag touch into that index.
 */
export function useTabBarAnimation({
  activePillIndex,
  onNavigateToPillTab,
}: UseTabBarAnimationParams) {
  // React Compiler misreads Reanimated's shared-value mutation as unsafe.
  // See https://docs.swmansion.com/react-native-reanimated/docs/guides/react-compiler
  "use no memo";

  const reducedMotion = useReducedMotion();

  const leaderX = useSharedValue(Math.max(activePillIndex, 0));
  const followerX = useSharedValue(Math.max(activePillIndex, 0));
  const pillOpacity = useSharedValue(activePillIndex === -1 ? 0 : 1);
  const pillWidthPx = useSharedValue(0);

  // Single write path for "land on a tab" — used by the sync effect and by settle.
  const movePillTo = (index: number) => {
    "worklet";
    if (reducedMotion) {
      leaderX.value = index;
      followerX.value = index;
    } else {
      leaderX.value = withSpring(index, springs.snappy);
      followerX.value = withSpring(index, springs.trailing);
    }
  };

  useEffect(() => {
    if (activePillIndex === -1) {
      pillOpacity.value = reducedMotion
        ? 0
        : withTiming(0, { duration: durations.fade });
      return;
    }
    pillOpacity.value = reducedMotion ? 1 : withSpring(1, springs.snappy);
    movePillTo(activePillIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pillOpacity is a stable shared-value ref; movePillTo only closes over reducedMotion, which is already tracked
  }, [activePillIndex, reducedMotion]);

  const onPillLayout = (event: LayoutChangeEvent) => {
    pillWidthPx.value = event.nativeEvent.layout.width;
  };

  // onNavigateToPillTab must stay a dep of the gesture's useMemo below, or a
  // stale closure would keep firing the original navigate callback.
  const navigateToTab = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onNavigateToPillTab(index);
  };

  // Worklet, but also safely callable directly from JS (Pressable onPress).
  const settleOnTab = (index: number) => {
    "worklet";
    movePillTo(index);
    runOnJS(navigateToTab)(index);
  };

  // Leader tracks the finger 1:1; follower trails — that gap is the drag-time "stretch".
  const trackDrag = (clamped: number) => {
    "worklet";
    leaderX.value = clamped;
    followerX.value = withSpring(clamped, springs.trailing);
  };

  // Each tab is its own Pressable for accessibility, so this only handles
  // drag-to-switch; a wider offset than the old app's ±6px avoids stealing taps.
  const dragGesture = useMemo(() => {
    return Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onUpdate((event) => {
        "worklet";
        if (reducedMotion || pillWidthPx.value <= 0) return;
        const perTabWidth = pillWidthPx.value / PILL_TAB_COUNT;
        const clamped = Math.max(
          0,
          Math.min(PILL_TAB_COUNT - 1, event.x / perTabWidth),
        );
        trackDrag(clamped);
      })
      .onEnd(() => {
        "worklet";
        const finalIndex = Math.min(
          PILL_TAB_COUNT - 1,
          Math.max(0, Math.round(leaderX.value)),
        );
        settleOnTab(finalIndex);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- leaderX/followerX/pillWidthPx are stable shared-value refs
  }, [reducedMotion, onNavigateToPillTab]);

  const pillIndicatorStyle = useAnimatedStyle(() => {
    const cellPercent = 100 / PILL_TAB_COUNT;
    const start = Math.min(leaderX.value, followerX.value);
    const end = Math.max(leaderX.value, followerX.value);
    const stretch = end - start;

    return {
      left: `${start * cellPercent}%`,
      width: `${(1 + stretch) * cellPercent}%`,
      opacity: pillOpacity.value,
      transform: [
        {
          // Squishes slightly while stretched, settling back once it lands.
          scaleY: interpolate(stretch, [0, 1], [1, 0.94], Extrapolation.CLAMP),
        },
      ],
    };
  });

  return { gesture: dragGesture, onPillLayout, pillIndicatorStyle, followerX, pillOpacity };
}
