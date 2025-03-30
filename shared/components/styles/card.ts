import { StyleSheet } from "react-native";
import { sizes, theme } from "./global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: sizes.padding,
  },
  card: {
    width: sizes.cardWidth,
    height: sizes.cardHeight,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: sizes.fontSizeLarge,
    color: theme.colors.text,
    fontWeight: "bold",
  },
});
