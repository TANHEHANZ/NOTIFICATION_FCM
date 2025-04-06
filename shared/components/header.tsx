import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./styles/global";
import { router } from "expo-router";
import {
  PRIVATE_ROUTES,
  ROUTES,
} from "../../infraestructure/models/enums/routes.enum";
import { AUTH_TOKEN } from "../../infraestructure/constants/const";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ role }: { role: string }) {
  const handleNotifications = () => {
    router.push(ROUTES.NOTIFICATIONS);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN);
    router.push(ROUTES.LOGIN);
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
