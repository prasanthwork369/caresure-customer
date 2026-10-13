import { StyleSheet } from "react-native";

import {
  colors,
  fontFamily,
  fontWeight,
  radius,
  shadows,
  spacing,
  typography,
} from "@/theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[2],
  },
  locationBlock: {
    flex: 1,
    minWidth: 0,
  },
  deliverLabel: {
    ...typography.tiny,
    fontWeight: fontWeight.semibold,
    fontFamily: fontFamily.semibold,
    letterSpacing: 0.4,
    color: colors.text.secondary,
    textTransform: "uppercase",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: spacing[1],
  },
  locationText: {
    ...typography.subtitle,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    maxWidth: 150,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.sm,
  },
});
