import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";
import { AUTH_TOKEN, TOKENFCM } from "../../../infraestructure/constants/const";
import Contactos from "../../../modules/inicio/contactos";
import { sizes, theme } from "../../../shared/components/styles/global";
import CardInicio from "../../../modules/inicio/cardInicio";

export default function Inicio() {
  const verificacion = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    const tokenfCM = await AsyncStorage.getItem(TOKENFCM);
    console.log(token);
    console.log("FCM:", tokenfCM);
  };

  verificacion();

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View
          style={{
            backgroundColor: theme.colors.primary,
            width: sizes.screenWidth - 40,
            height: 200,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
          }}
        ></View>
        <CardInicio
          title="notificaciones"
          icon="notifications-outline"
          value={12}
        />
        <CardInicio
          title="Inoformaciones"
          icon="information-circle-sharp"
          value={12}
        />
      </View>
      <Contactos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: sizes.screenWidth - 40,
    gap: 16,
    marginBottom: 20,
  },
});
