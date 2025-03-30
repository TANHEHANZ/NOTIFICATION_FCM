import { StyleSheet } from "react-native";
import { sizes, theme } from "./global";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 100,
  },
  title: {
    color: theme.colors.text,
    fontSize: sizes.fontSizeXL,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  alertButton: {
    width: sizes.cardHeight,
    height: sizes.cardHeight,
    backgroundColor: theme.colors.accent,
    padding: sizes.padding,
    borderRadius: 5000,
    marginTop: 10,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  ripple: {
    position: "absolute",
    width: sizes.cardHeight,
    height: sizes.cardHeight,
    borderRadius: 5000,
    backgroundColor: theme.colors.accent,
  },
});
