import { Easing } from "react-native-reanimated";

export const durations = {
  fast: 150,
  normal: 200,
  slow: 300,
  fade: 150,
} as const;

export const easings = {
  out: Easing.out(Easing.exp),
  inOut: Easing.inOut(Easing.quad),
  standard: Easing.bezier(0.4, 0, 0.2, 1),
} as const;

export const springs = {
  // Fast, firm landing for an active-state snap.
  snappy: { damping: 20, stiffness: 200 },
  // Trails `snappy` — the gap between them reads as a "stretch".
  trailing: { damping: 22, stiffness: 320, mass: 0.6 },
  // Slower, softer settle for less time-critical reveals.
  gentle: { damping: 18, stiffness: 130, mass: 0.6 },
} as const;
