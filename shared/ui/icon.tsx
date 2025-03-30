import React from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  EvilIcons,
  Foundation,
  Feather,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import { IconProps, IconType } from "../../infraestructure/models";

const iconSets: Record<IconType, any> = {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  EvilIcons,
  Foundation,
  Feather,
  Ionicons,
  Fontisto,
};

const Icon: React.FC<IconProps> = ({
  name,
  type,
  size = 24,
  color = "black",
  style
}) => {
  const IconComponent = iconSets[type];
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default Icon;