import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // Transparent — the fixed gradient backdrop (rendered behind the list)
  // must show through the hero row; every row below it is opaque on its own.
  list: {
    flex: 1,
    backgroundColor: "transparent",
  },
  centerFill: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  statusBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.white,
  },
  heroBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  searchWrap: {
    marginTop: -40,
    paddingHorizontal: spacing[5],
  },
  sectionGap: {
    marginTop: spacing[6],
  },
});
