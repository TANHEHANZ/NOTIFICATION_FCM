import { ViewStyle } from "react-native";
import { IconType } from "./icons";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconType?: IconType;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}
