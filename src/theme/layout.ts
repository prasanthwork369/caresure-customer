import { StyleSheet } from "react-native";

import { spacing } from "./spacing";

// Grounded in the icon sizes already used across the current screens
// (tab/action icons, list chevrons, empty-state glyphs).
export const iconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 32,
  huge: 40,
} as const;

export const touchTarget = {
  min: 44, // iOS HIG minimum hit target
  comfortable: 48, // Material Design minimum hit target
} as const;

export const controlHeight = {
  sm: 36,
  md: 44,
  lg: 52,
} as const;

export const borderWidth = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  medium: 1.5,
  thick: 2,
} as const;

export const opacity = {
  disabled: 0.4,
  pressed: 0.7,
  subtle: 0.6,
  overlay: 0.5,
} as const;

export const layout = {
  // Common screen/section/card rhythm, expressed via the spacing scale so
  // nothing here is an independent magic number.
  screenPaddingHorizontal: spacing[5], // 20
  sectionGap: spacing[6], // 24
  cardPadding: spacing[4], // 16
  cardGap: spacing[3], // 12

  // Caps mobile-first layouts when rendered in a wide browser viewport.
  contentMaxWidth: 480,
  tabletBreakpoint: 768,
} as const;
