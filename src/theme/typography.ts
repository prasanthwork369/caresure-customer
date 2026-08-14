import { TextStyle } from "react-native";

// Reserved for a custom family (e.g. Inter) once font loading is wired up in
// a later step. `undefined` falls back to the platform default (San Francisco
// on iOS, Roboto on Android) so typography is usable today without it.
export const fontFamily = {
  regular: undefined,
  medium: undefined,
  semibold: undefined,
  bold: undefined,
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
    fontFamily: fontFamily.bold,
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
