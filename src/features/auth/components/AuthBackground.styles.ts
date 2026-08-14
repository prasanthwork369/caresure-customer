import { StyleSheet } from "react-native";

import { colors, radius, spacing } from "@/theme";

// Exported so the scroll animation's cycle-height math (one tile + its gap)
// uses the exact same numbers as the layout — a single source of truth.
export const TILE_SIZE = 100;
export const TILE_GAP = spacing[4];

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.background.primary,
  },
  column: {
    marginHorizontal: spacing[1],
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    marginBottom: TILE_GAP,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border.default,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing[3],
  },
  tileImage: {
    width: "80%",
    height: "80%",
  },
  topFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
});
