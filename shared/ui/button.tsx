import React from "react";
import { ViewStyle, Pressable, Text, StyleSheet } from "react-native";
import Icon from "./icon";
import { ButtonProps } from "../../infraestructure/models/interfaces/buttons";
import { theme } from "../components/styles/global";

const ButtonPrimary: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  icon,
  iconType,
  disabled = false,
  onPress,
  style,
}) => {
  // Estilos basados en variant
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: theme.colors.secondary,
          borderWidth: 0,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: theme.colors.primary,
        };
      case "primary":
      default:
        return {
          backgroundColor: theme.colors.primary,
          borderWidth: 0,
        };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return {
          paddingHorizontal: 12,
          height: 32,
          fontSize: 14,
          iconSize: 16,
        };
      case "large":
        return {
          paddingHorizontal: 48,
          height: 48,
          fontSize: 18,
          iconSize: 20,
        };
      case "medium":
      default:
        return {
          paddingHorizontal: 16,
          height: 40,
          fontSize: 16,
          iconSize: 20,
        };
    }
  };

  const sizeStyle = getSizeStyle();
  const variantStyle = getVariantStyle();

  const buttonStyle: ViewStyle = {
    ...styles.button,
    ...variantStyle,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    height: sizeStyle.height,
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const textStyle = {
    ...styles.text,
    color: variant === "outline" ? theme.colors.primary : "#fff",
    fontSize: sizeStyle.fontSize,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      {icon && iconType && (
        <Icon
          type={iconType}
          name={icon}
          size={sizeStyle.iconSize}
          color={textStyle.color}
          style={styles.icon}
        />
      )}
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 8,
  },
  text: {
    textAlignVertical: "center",
  },
  icon: {
    marginRight: 16,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default ButtonPrimary;
