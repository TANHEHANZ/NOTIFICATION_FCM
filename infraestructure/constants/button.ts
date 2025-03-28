export const BUTTON_VARIANTS = {
  primary: {
    background: "#3B82F6",
    text: "white",
    border: "transparent",
  },
  secondary: {
    background: "#6B7280",
    text: "white",
    border: "transparent",
  },
  outline: {
    background: "transparent",
    text: "#3B82F6",
    border: "#3B82F6",
  },
} as const;
export const BUTTON_SIZES = {
  small: {
    padding: { horizontal: 12, vertical: 8 },
    fontSize: 12,
    iconSize: 16,
  },
  medium: {
    padding: { horizontal: 16, vertical: 12 },
    fontSize: 14,
    iconSize: 18,
  },
  large: {
    padding: { horizontal: 24, vertical: 16 },
    fontSize: 16,
    iconSize: 24,
  },
} as const;
