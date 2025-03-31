// components/CardContact.tsx
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../shared/components/styles/global";
import { UserByContact } from "../../infraestructure/models/globals/contactos";

interface CardContactProps {
  contact: UserByContact;
  onView?: () => void;
  onDelete?: () => void;
}

export const CardContact = ({
  contact,
  onView,
  onDelete,
}: CardContactProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {contact.photo && (
          <Image source={{ uri: contact.photo }} style={styles.avatar} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {contact.name}
      </Text>
      <Text style={styles.email} numberOfLines={1}>
        {contact.email}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onView}>
          <Ionicons name="eye" size={14} color={"#fff"} />
          <Text style={styles.actionText}>ver contacto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: theme.colors.basico,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    flex: 1,
  },
  email: {
    fontSize: 13,
    color: "#0007",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 4,
    marginHorizontal: "auto",
    color: "#fff",
  },
  deleteText: {
    marginLeft: 4,
    color: theme.colors.error,
  },
});
