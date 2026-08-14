import { Platform, TextStyle } from "react-native";

// Android renders Inter (loaded via useAppFonts); iOS stays on the native SF
// Pro system font (undefined = platform default) and never needs these
// files loaded. Each role maps to its own weight-specific Inter family —
// Android has no single variable-weight family, one static file per weight.
const androidFamily = (name: string): TextStyle["fontFamily"] =>
  Platform.OS === "android" ? name : undefined;

export const fontFamily = {
  regular: androidFamily("Inter_400Regular"),
  medium: androidFamily("Inter_500Medium"),
  semibold: androidFamily("Inter_600SemiBold"),
  bold: androidFamily("Inter_700Bold"),
  extrabold: androidFamily("Inter_800ExtraBold"),
} as const satisfies Record<string, TextStyle["fontFamily"]>;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const satisfies Record<string, TextStyle["fontWeight"]>;

export const typography = {
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: fontWeight.extrabold,
    fontFamily: fontFamily.extrabold,
  } satisfies TextStyle,
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.bold,
  } satisfies TextStyle,
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.bold,
  } satisfies TextStyle,
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: fontWeight.semibold,
    fontFamily: fontFamily.semibold,
  } satisfies TextStyle,
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeight.regular,
    fontFamily: fontFamily.regular,
  } satisfies TextStyle,
  small: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.medium,
  } satisfies TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.medium,
  } satisfies TextStyle,
  tiny: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.medium,
  } satisfies TextStyle,
  micro: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.medium,
  } satisfies TextStyle,
  price: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.bold,
  } satisfies TextStyle,
} as const;

export type TypographyToken = keyof typeof typography;
