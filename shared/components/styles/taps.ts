import { StyleSheet } from "react-native";
import { sizes, theme } from "./global";

export const Taps = StyleSheet.create({
  primari: {
    backgroundColor: theme.colors.primary,
    padding: sizes.padding,
    borderRadius: sizes.profileWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  secundari: {},
  terteary: {},
});
