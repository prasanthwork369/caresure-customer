import { screenTransitions } from "./transitions";

export const rootStackScreenOptions = {
  headerShown: false,
  ...screenTransitions.push,
} as const;

export const tabScreenOptions = {
  headerShown: false,
  // A tab switch is a destination change, not a push — no slide animation.
  animation: "none",
  // Inactive tabs stop re-rendering behind the active one.
  freezeOnBlur: true,
  // Small, fixed tab count — eager-mounting all of them costs a little at
  // launch but makes every tab switch instant from the first tap, instead of
  // each tab's first visit paying a mount+fetch cost.
  lazy: false,
} as const;
