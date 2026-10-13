import { StyleSheet } from "react-native";

import { colors, fontFamily, fontWeight, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  title: {
    ...typography.authTitle,
    color: colors.text.primary,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  // Figma phone display is 14/500/lineHeight 30 — `typography.body` supplies
  // the matching fontSize, weight/family/lineHeight are the Figma deltas.
  phone: {
    ...typography.body,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.medium,
    lineHeight: 30,
    color: colors.text.primary,
  },
  editButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.primary,
  },
  // No typography role matches this Figma-specific size (14/600/16) —
  // single use, so only the weight/family primitives are reused.
  editButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: fontWeight.semibold,
    fontFamily: fontFamily.semibold,
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
    ...typography.title,
    color: colors.text.inverse,
  },
});
