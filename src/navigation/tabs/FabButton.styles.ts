import { StyleSheet } from "react-native";

import { colors, fontWeight, typography } from "@/theme";

import { PILL_HEIGHT } from "./TabBar.styles";

// Fixed width: the icon/label slide needs a stable track — matches the old
// app's Figma value exactly since the motion reuses its distances.
export const FAB_WIDTH = 115;
// Close to the old app's 35; resizeMode "contain" keeps it proportional.
export const FAB_ICON_SIZE = 32;

export const styles = StyleSheet.create({
  button: {
    width: FAB_WIDTH,
    height: PILL_HEIGHT,
    borderTopLeftRadius: PILL_HEIGHT / 2,
    borderBottomLeftRadius: PILL_HEIGHT / 2,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Icon and label independently slide past each other, not a joined row.
  iconLayer: {
    position: "absolute",
  },
  label: {
    ...typography.small,
    position: "absolute",
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
});
