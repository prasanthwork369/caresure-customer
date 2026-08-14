import { StyleSheet } from "react-native";

import { colors, fontWeight, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  phone: {
    ...typography.body,
    color: colors.text.primary,
  },
  editButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.primary,
  },
  editButtonText: {
    ...typography.body,
    fontWeight: fontWeight.semibold,
    color: colors.brand.primary,
  },
  verifyButton: {
    minHeight: 50,
    borderRadius: radius.md,
    marginVertical: spacing[3],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[3],
    backgroundColor: colors.brand.primary,
  },
  verifyButtonDisabled: {
    opacity: 0.6,
  },
  verifyButtonText: {
    ...typography.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
});
