import { StyleSheet } from "react-native";

import { colors } from "@/theme";

// Figma-sourced dimensions — plain constants, no device-width scaling
// (see theme/typography.ts).

// Pill's indicator math is expressed in fractions of this, not pixels.
export const PILL_TAB_COUNT = 3;

export const PILL_HEIGHT = 65;
export const BAR_HEIGHT = 85;
export const ACTIVE_HEIGHT = 55;
export const ACTIVE_RADIUS = 25;
export const BAR_HORIZONTAL_MARGIN = 12;
export const PILL_FAB_GAP = 12;
// Extra clearance below the pill/FAB, above the device safe-area inset.
export const BAR_BOTTOM_GAP = 6;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: BAR_HORIZONTAL_MARGIN,
  },
  pill: {
    flex: 1,
    height: PILL_HEIGHT,
    marginRight: PILL_FAB_GAP,
    borderRadius: PILL_HEIGHT / 2,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.primary,
    // boxShadow (not elevation) gives an even glow on both platforms —
    // Android's elevation only renders a directional shadow.
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
  },
  androidGlassFallback: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  // Static bits only — left/width/opacity/transform come from the animation hook.
  indicator: {
    position: "absolute",
    height: ACTIVE_HEIGHT,
    top: (PILL_HEIGHT - ACTIVE_HEIGHT) / 2,
    marginHorizontal: 3,
    borderRadius: ACTIVE_RADIUS,
    backgroundColor: colors.overlay.activePill,
  },
});
