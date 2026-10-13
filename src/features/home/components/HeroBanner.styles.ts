import { StyleSheet } from "react-native";

import { colors, fontFamily, fontWeight, radius, spacing } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    height: 190,
    marginHorizontal: 14,
    marginTop: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#00D1501A",
  },
  gradientCard: {
    flex: 1,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  textBlock: {
    flex: 1.2,
    paddingLeft: spacing[3],
    paddingRight: 110,
    paddingTop: spacing[8],
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: fontWeight.extrabold,
    fontFamily: fontFamily.extrabold,
    color: colors.text.primary,
  },
  titleHighlight: {
    color: colors.brand.primary,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing[2],
    marginTop: spacing[3],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.white,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.semibold,
    fontFamily: fontFamily.semibold,
    color: colors.brand.primary,
  },
  avatar: {
    position: "absolute",
    width: 184,
    height: 211,
    top: -22,
    right: 1,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
