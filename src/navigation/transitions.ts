import { colors } from "@/theme";

// Backed by react-native-screens' native-stack, so these run natively and
// automatically respect the OS "Reduce Motion" setting — no JS/Reanimated
// driven fallback needed here.
const DURATION = {
  push: 220,
  fade: 150,
  modal: 250,
} as const;

export const screenTransitions = {
  /** Default forward navigation — platform-native push/pop motion. */
  push: {
    animation: "slide_from_right",
    animationDuration: DURATION.push,
    gestureEnabled: true,
    contentStyle: { backgroundColor: colors.background.primary },
    freezeOnBlur: true,
  },
  /** Neutral context replacements (e.g. swapping the active root stack). */
  fade: {
    animation: "fade",
    animationDuration: DURATION.fade,
    contentStyle: { backgroundColor: colors.background.primary },
    freezeOnBlur: true,
  },
  /** Sheet-like screens: slide up, support native swipe-to-dismiss. */
  modal: {
    presentation: "modal",
    animation: "slide_from_bottom",
    animationDuration: DURATION.modal,
    gestureEnabled: true,
    freezeOnBlur: true,
  },
  /** Redirects/guards — not a navigation the user made, so it shouldn't animate like one. */
  none: {
    animation: "none",
    freezeOnBlur: true,
  },
} as const;
