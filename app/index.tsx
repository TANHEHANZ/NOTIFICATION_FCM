import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../infraestructure/hooks/useAuth";
import { useNotifications } from "../infraestructure/hooks/useNotifications";
import Login from "./login";
import { HomeScreenNavigationProp } from "../infraestructure/models/types";

export default function HomeScreen() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { permissionGranted, fcmToken } = useNotifications();
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("public", { screen: "inicio" });
    }
  }, [isAuthenticated, navigation]);

  if (isAuthLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (!permissionGranted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Se requieren permisos para las notificaciones
        </Text>
      </View>
    );
  }

  return <Login fcmToken={fcmToken} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
