import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    gap: spacing[1],
    paddingTop: spacing[4],
  },
  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  secureText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  policyText: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: "center",
  },
  policyLink: {
    color: colors.brand.primary,
  },
});
