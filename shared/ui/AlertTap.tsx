// shared/ui/AlertTap.tsx
import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { sizes, theme } from "../components/styles/global";
import { IconType } from "../../infraestructure/models";
import Icon from "./icon";

interface AlertTapProps {
  count: number;
  label: string;
  iconType?: IconType;
  iconName?: string;
  color?: string;
  style?: ViewStyle;
  rotation?: number;
  position?: "left" | "right" | "center";
  offsetY?: number;
}

export const AlertTap: React.FC<AlertTapProps> = ({
  count,
  label,
  iconType = "Ionicons",
  iconName = "alert",
  color = theme.colors.importart,
  rotation = 0,
  position = "center",
  offsetY = 0,
  style,
}) => {
  // Estilos dinámicos con tipos explícitos
  const dynamicStyles: ViewStyle = {
    backgroundColor: color,
    transform: [{ rotate: `${rotation}deg` }, { translateY: offsetY }],
  };

  // Añadir estilos de posición según la prop
  if (position === "left") {
    dynamicStyles.left = 20;
    dynamicStyles.right = undefined;
    dynamicStyles.alignSelf = undefined;
  } else if (position === "right") {
    dynamicStyles.right = 20;
    dynamicStyles.left = undefined;
    dynamicStyles.alignSelf = undefined;
  } else {
    dynamicStyles.alignSelf = "center" as const;
    dynamicStyles.left = undefined;
    dynamicStyles.right = undefined;
  }

  return (
    <View style={[styles.container, dynamicStyles, style]}>
      <View style={styles.content}>
        {iconName && (
          <Icon
            type={iconType}
            name={iconName}
            size={20}
            color="black"
            style={styles.icon}
          />
        )}
        <Text style={styles.text}>
          +{count} {label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.paddingxs,
    paddingHorizontal: sizes.padding,
    borderRadius: sizes.profileWidth,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    flexDirection: "row",
    position: "absolute",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
