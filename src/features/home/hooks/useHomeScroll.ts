import {
  interpolate,
  Extrapolation,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { tabBarVisible } from "@/navigation/tabs/tabBarVisibility";
import { durations, easings } from "@/theme";

// Scroll distance before a downward scroll is allowed to hide the bar.
const HIDE_AFTER = 40;
// Ignores sub-pixel jitter so a resting finger can't flip-flop the bar.
const MIN_DELTA = 5;

/**
 * Single scroll handler for Home: shows/hides the tab bar (written straight
 * to the shared module value so the tab bar — a different component tree —
 * animates on the same frame with no re-render), and fades the status-bar
 * background in once the hero has scrolled past.
 */
export function useHomeScroll(heroHeight: number) {
  const lastScrollY = useSharedValue(0);
  const isVisible = useSharedValue(1);
  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      scrollY.value = y;

      const isAtBottom =
        y + event.layoutMeasurement.height >= event.contentSize.height - 24;

      if (isAtBottom) {
        if (isVisible.value !== 1) {
          isVisible.value = 1;
          tabBarVisible.value = withTiming(1, {
            duration: durations.normal,
            easing: easings.standard,
          });
        }
        lastScrollY.value = y;
        return;
      }

      const delta = y - lastScrollY.value;
      if (Math.abs(delta) < MIN_DELTA) return;
      lastScrollY.value = y;

      let next = isVisible.value;
      if (y <= 0) next = 1;
      else if (delta > 0 && y > HIDE_AFTER) next = 0;
      else if (delta < 0) next = 1;

      if (next !== isVisible.value) {
        isVisible.value = next;
        tabBarVisible.value = withTiming(next, {
          duration: durations.normal,
          easing: easings.standard,
        });
      }
    },
  });

  const statusBarBgStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, Math.max(heroHeight, 1)],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return { handleScroll, statusBarBgStyle };
}
