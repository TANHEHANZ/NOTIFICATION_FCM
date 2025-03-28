import { View, Text } from "react-native";
import Login from "./login";
import { useNotifications } from "../infraestructure/hooks/useNotifications";

export default function HomeScreen() {
  const { permissionGranted } = useNotifications();
  if (!permissionGranted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Se requieren permisos para las notificaciones</Text>
      </View>
    );
  }
  return <Login />;
}
