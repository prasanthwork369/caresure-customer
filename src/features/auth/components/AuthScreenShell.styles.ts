import { StyleSheet } from "react-native";

import { colors, fontWeight, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  skipButton: {
    position: "absolute",
    right: spacing[4],
    zIndex: 10,
    borderRadius: radius.full,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  skipBlur: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    backgroundColor: "rgba(255,255,255,0.82)",
  },
  skipText: {
    ...typography.small,
    fontWeight: fontWeight.bold,
    color: colors.brand.primary,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  panel: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: radius["2xl"],
    borderTopRightRadius: radius["2xl"],
    paddingTop: spacing[8],
    paddingHorizontal: spacing[6],
  },
});
