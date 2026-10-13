import { StyleSheet } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
  },
  placeholder: {
    ...typography.body,
    flex: 1,
    color: colors.text.secondary,
  },
});
