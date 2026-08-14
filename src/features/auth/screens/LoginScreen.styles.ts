import { Platform, StyleSheet } from "react-native";

import { colors, fontWeight, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing[6],
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    minHeight: 56,
    borderRadius: radius.xs,
    borderWidth: 1,
    paddingHorizontal: spacing[4],
    backgroundColor: colors.background.primary,
  },
  inputWrapIdle: { borderColor: colors.border.default },
  inputWrapFocused: { borderColor: colors.brand.primary },
  inputWrapError: { borderColor: colors.status.fieldError },
  prefix: {
    ...typography.body,
    color: colors.text.primary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border.divider,
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    ...typography.body,
    fontFamily: Platform.OS === "android" ? "Inter_400Regular" : undefined,
    color: colors.text.primary,
  },
  error: {
    ...typography.caption,
    color: colors.status.fieldError,
    marginTop: spacing[1],
    marginBottom: spacing[1],
  },
  submitButton: {
    minHeight: 50,
    borderRadius: radius.md,
    marginVertical: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[3],
    backgroundColor: colors.brand.primary,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    ...typography.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
});
