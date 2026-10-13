import { StyleSheet } from "react-native";

import { colors, fontFamily, fontWeight, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  tabsBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  tabsContent: {
    paddingHorizontal: spacing[4],
    gap: spacing[8],
  },
  tabItem: {
    alignItems: "center",
    paddingBottom: spacing[3],
    gap: spacing[2],
  },
  tabIcon: {
    width: 32,
    height: 32,
  },
  tabIconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.surface,
  },
  tabLabel: {
    ...typography.tiny,
    color: colors.text.secondary,
  },
  tabLabelActive: {
    color: colors.text.primary,
    fontWeight: fontWeight.semibold,
    fontFamily: fontFamily.semibold,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: spacing[2],
    right: spacing[2],
    height: 3,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.brand.primary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing[4],
    marginTop: spacing[5],
    rowGap: spacing[3],
  },
  card: {
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  cardLabel: {
    ...typography.small,
    fontWeight: fontWeight.semibold,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    paddingHorizontal: spacing[2],
    paddingTop: spacing[2],
  },
});
