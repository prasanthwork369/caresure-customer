import { Platform, StyleSheet } from "react-native";

import { colors, fontWeight, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  boxRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[2],
    marginVertical: spacing[3],
  },
  otpBox: {
    flex: 1,
    maxWidth: 48,
    aspectRatio: 1,
    borderRadius: radius.sm,
    backgroundColor: colors.background.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  boxBorderThick: { borderWidth: 2 },
  boxIdle: { borderColor: colors.border.divider },
  boxAccent: { borderColor: colors.brand.primary },
  boxError: { borderColor: colors.status.fieldError },
  boxFillActive: { backgroundColor: colors.overlay.activePill },
  otpDigit: {
    fontSize: 24,
    lineHeight: Platform.OS === "android" ? 24 : undefined,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    textAlign: "center",
    includeFontPadding: false,
  },
  // 1x1, tucked in the corner rather than overlaying the boxes — on Android
  // a TextInput still grabs taps even with pointerEvents "none" if it sits
  // under the touch target, so the boxes own every tap instead.
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    opacity: 0,
  },
  error: {
    ...typography.caption,
    color: colors.status.fieldError,
    textAlign: "center",
    marginBottom: spacing[2],
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: spacing[2],
  },
  resendText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  resendHighlight: {
    color: colors.brand.primary,
    fontWeight: fontWeight.bold,
  },
  resendLink: {
    ...typography.small,
    fontWeight: fontWeight.bold,
    color: colors.brand.primary,
  },
});
