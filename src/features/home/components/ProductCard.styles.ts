import { StyleSheet } from "react-native";

import { colors, fontFamily, fontWeight, radius, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  card: {
    width: 148,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  imageWrap: {
    height: 110,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: "60%",
    height: "60%",
    borderRadius: radius.sm,
    backgroundColor: colors.background.surface,
  },
  image: {
    width: "70%",
    height: "70%",
  },
  discountBadge: {
    position: "absolute",
    top: spacing[2],
    left: spacing[2],
    zIndex: 1,
    borderRadius: radius.xs,
    backgroundColor: colors.status.success,
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
  },
  discountText: {
    ...typography.tiny,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  info: {
    padding: spacing[3],
  },
  name: {
    ...typography.small,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
    minHeight: 36,
  },
  description: {
    ...typography.tiny,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: spacing[2],
  },
  price: {
    ...typography.subtitle,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  mrp: {
    ...typography.tiny,
    color: colors.text.secondary,
    textDecorationLine: "line-through",
  },
  addToCart: {
    marginTop: spacing[3],
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    ...typography.small,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.bold,
    color: colors.brand.primary,
  },
});
