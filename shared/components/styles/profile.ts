import { StyleSheet } from "react-native";
import { sizes, theme } from "./global";

export const Sprofile = StyleSheet.create({
  potho: {
    backgroundColor: theme.colors.primary,
    padding: sizes.padding,
    width: sizes.profileWidth,
    height: sizes.profileHeight,
    borderRadius: sizes.profileWidth,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 10 },
  },
});
