import { StyleSheet } from "react-native";

import { colors, radius, spacing } from "@/theme";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: radius.xl,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[1],
    marginTop: spacing[2],
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.border.default,
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.brand.primary,
  },
});
