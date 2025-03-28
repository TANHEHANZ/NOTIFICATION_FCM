import React from "react";
import { ViewStyle } from "react-native";
import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "./icon";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "../../infraestructure/constants/button";
import { ButtonProps } from "../../infraestructure/models/interfaces/buttons";






const ButtonPrimary: React.FC<ButtonProps> = ({
  title,
  icon,
  iconType,
  variant = 'primary',
  size = 'medium',
  iconPosition = 'left',
  disabled = false,
  color,
  onPress,
  style,
  ...props
}) => {
  const variantStyle = BUTTON_VARIANTS[variant];
  const sizeStyle = BUTTON_SIZES[size];

  const buttonStyle : ViewStyle = {
    ...styles.button,
    paddingHorizontal: sizeStyle.padding.horizontal,
    paddingVertical: sizeStyle.padding.vertical,
    backgroundColor: variantStyle.background,
    borderColor: variantStyle.border,
    borderWidth: variant === 'outline' ? 2 : 0,
    opacity: disabled ? 0.5 : 1,
    ...(style as ViewStyle),
  };

  const textStyle = [
    styles.text,
    {
      fontSize: sizeStyle.fontSize,
      color: color || variantStyle.text,
    },
  ];

  const renderIcon = () => {
    if (!icon || !iconType) return null;
    
    return (
      <Icon
        name={icon}
        type={iconType}
        size={sizeStyle.iconSize}
        color={color || variantStyle.text}
        style={title ? styles[`icon${iconPosition === 'left' ? 'Left' : 'Right'}`] : undefined}
      />
    );
  };

  return (
    <Pressable
      style={buttonStyle}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {title && <Text style={textStyle}>{title}</Text>}
      {iconPosition === 'right' && renderIcon()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default ButtonPrimary;