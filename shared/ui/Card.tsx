import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { sizes, theme } from "../components/styles/global";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  fullWidth?: boolean;
  style?: object;
  important?: boolean; // Corregí el typo de "importtant" a "important"
}

export const Card = ({
  children,
  onPress,
  fullWidth = false,
  style = {},
  important = false,
}: CardProps) => {
  const cardStyles = [
    styles.card,
    fullWidth && styles.fullWidth,
    important && styles.importantCard,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={cardStyles}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: (sizes.screenWidth - 40) / 2 - 8,
    height: (sizes.screenWidth - 40) / 2 - 8,
    backgroundColor: theme.colors.basico,
    borderRadius: 12,
    justifyContent: "space-around",
    padding: 10,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  importantCard: {
    backgroundColor: theme.colors.secondary,
  },

  fullWidth: {
    width: sizes.screenWidth - 40 - 8,
  },
});
