import { PressableProps } from "react-native";
import { IconType } from "./icons";

export interface ButtonProps extends PressableProps {
  title?: string;
  icon?: string;
  iconType?: IconType;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  iconPosition?: "left" | "right";
  disabled?: boolean;
  color?: string;
  onPress?: () => void;
}
