import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./styles/global";
import { router } from "expo-router";
import { ROUTES } from "../../infraestructure/models/enums/routes.enum";

export default function Header() {
  const handleNotifications = () => {
    router.push(ROUTES.NOTIFICATIONS);
  };

  const handleLogout = () => {
    router.push(ROUTES.LOGIN);
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el token de autenticación.
    // Por ejemplo:
    // await AsyncStorage.removeItem(AUTH_TOKEN);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Hola, Usuario!</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={handleNotifications}
          style={styles.iconButton}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  iconButton: {
    padding: 4,
  },
});
