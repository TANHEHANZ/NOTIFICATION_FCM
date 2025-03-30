import { Pressable, Text, StyleSheet } from "react-native";
import { Card } from "../../shared/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../shared/components/styles/global";

interface PropCardInicio {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  onPress?: () => void;
  important?: boolean;
}

export default function CardInicio({
  onPress,
  icon,
  title,
  value,
  important = false, // Valor por defecto
}: PropCardInicio) {
  // Definimos el color del texto basado en si es importante
  const textColor = important ? "#ffffff" : "#000000";

  return (
    <Card onPress={onPress} important={important}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.value, { color: textColor }]}>
        {value}
        <Ionicons name={icon} size={24} color={textColor} style={styles.icon} />
      </Text>

      <Pressable
        onPress={onPress}
        style={[styles.button, important && styles.importantButton]}
      >
        <Text style={styles.buttonText}>Ver {title}</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 64,
    textAlign: "center",
  },
  icon: {
    marginLeft: 4, // Espacio entre el número y el icono
  },
  button: {
    backgroundColor: theme.colors.text,
    alignSelf: "flex-end",
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  importantButton: {
    backgroundColor: "#0007", // Fondo semitransparente para modo importante
  },
  buttonText: {
    fontSize: 12,
    textAlign: "center",
    color: theme.colors.background,
  },
});
