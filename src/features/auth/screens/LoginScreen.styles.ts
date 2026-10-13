import { StyleSheet } from "react-native";

import { colors, fontFamily, fontWeight, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  title: {
    ...typography.authTitle,
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
  // No typography role matches this Figma-specific prefix size (17px) —
  // single use, so only the weight/family primitives are reused.
  prefix: {
    fontSize: 17,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border.divider,
  },
  // Figma input text is 15px — one off from `typography.body` (14) — single
  // use, so only the weight/family primitives are reused.
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    fontSize: 15,
    fontWeight: fontWeight.regular,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  error: {
    ...typography.small,
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
    ...typography.title,
    color: colors.text.inverse,
  },
});
