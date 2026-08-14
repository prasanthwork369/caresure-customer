export const colors = {
  brand: {
    primary: "#0F7635",
    secondary: "#FACA15",
  },

  text: {
    primary: "#222222",
    secondary: "#6A6A6A",
    disabled: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    surface: "#F3F4F6",
  },

  border: {
    default: "#919EAB33",
    divider: "#E5E7EB",
  },

  status: {
    success: "#0F7635",
    warning: "#D97706",
    error: "#DC2626",
    info: "#2563EB",
    // Lighter than `error` on purpose — reserved for inline field-level
    // validation (input borders/messages), distinct from app-wide errors.
    fieldError: "#EF4444",
  },

  disabled: {
    background: "#E5E7EB",
    text: "#9CA3AF",
    border: "#D1D5DB",
  },

  // Figma-sourced, single-purpose accents with no equivalent elsewhere in
  // the palette — the tab bar's active-pill tint and prescription CTA.
  overlay: {
    activePill: "rgba(236,253,245,0.82)",
  },
  gradients: {
    upload: ["#CB391C", "#F88004"],
  },
  // Auth background tile colors — cycled behind the medicine photos.
  pastels: ["#FFEBEB", "#EBF5FF", "#F5EBFF", "#EBFFFF", "#FFF9EB", "#F2FFEB"],

  white: "#FFFFFF",
  black: "#000000",
} as const;
