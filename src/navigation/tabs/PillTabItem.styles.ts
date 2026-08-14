import { StyleSheet } from "react-native";

import { spacing } from "@/theme";

// Native 24x24 viewBox of the pill icon SVGs — see tabConfig.ts.
export const ICON_SIZE = 24;

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  // Active/inactive icons stack and crossfade instead of swapping.
  iconLayer: {
    position: "absolute",
  },
  label: {
    marginTop: spacing[1],
    textAlign: "center",
    width: "100%",
  },
});
