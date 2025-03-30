import { StyleProp, TextStyle } from "react-native";

export interface IconProps {
  name: string;
  type: IconType;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export type IconType =
  | "AntDesign"
  | "FontAwesome"
  | "MaterialIcons"
  | "EvilIcons"
  | "Foundation"
  | "Feather"
  | "Ionicons"
  | "Fontisto";
