import { StyleSheet } from "react-native";

import { colors, fontWeight, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  promiseSection: {
    marginTop: spacing[6],
    paddingHorizontal: spacing[5],
  },
  promiseTitle: {
    ...typography.title,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  promiseRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  promiseItem: {
    alignItems: "center",
    gap: spacing[2],
  },
  promiseLabel: {
    ...typography.small,
    color: colors.text.secondary,
    textAlign: "center",
  },
  footerLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing[5],
    marginTop: spacing[6],
    marginBottom: spacing[5],
  },
  footerLabelItem: {
    alignItems: "center",
    gap: spacing[2],
    flex: 1,
  },
  footerLabelText: {
    ...typography.tiny,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
