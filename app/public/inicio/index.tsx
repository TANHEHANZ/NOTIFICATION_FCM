import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { AUTH_TOKEN } from "../../../infraestructure/constants/const";

export default function Inicio() {
  const verificacion = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);

    console.log(token);
  };

  verificacion();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Página Principal 🚀</Text>
    </View>
  );
}
