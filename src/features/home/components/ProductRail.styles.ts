import { StyleSheet } from "react-native";

import { colors, fontWeight, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.text.primary,
    fontWeight: fontWeight.bold,
    paddingHorizontal: spacing[5],
    marginBottom: spacing[3],
  },
  listContent: {
    paddingHorizontal: spacing[5],
    gap: spacing[3],
  },
});
