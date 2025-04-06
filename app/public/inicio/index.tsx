import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { sizes, theme } from "../../../shared/components/styles/global";
import CardInicio from "../../../modules/inicio/cardInicio";
import useFetch from "../../../infraestructure/lib/useFetch/useFetch";
import Flayer from "../../../modules/inicio/flayer";

export default function Inicio() {
  const { fetchData } = useFetch();
  const { data } = fetchData("GET /v1/api/dashboard");

  const alertas = data?.alertas?.generadas || 0;
  const contactos = data?.contactos?.total || 0;
  const informaciones = data?.informaciones?.total || 0;
  // const [token, setToken] = useState<string | null>(null);
  // useEffect(() => {
  //   const connectSocket = async () => {
  //     try {
  //       const tokenAuth = await authService.getToken();
  //       setToken(tokenAuth);
  //       setConnectionStatus("connecting");
  //       if (!token) {
  //         console.log("no hay token de conexion");
  //         return;
  //       }
  //       await socketClient.connect(token);
  //       setConnectionStatus("connected");
  //       socketClient.getSocket().on("test_response", (response) => {
  //         console.log("Respuesta directa del servidor:", response);
  //       });
  //       // Configurar listeners para notificaciones
  //       socketClient.onNotification((data: any) => {
  //         console.log("Nueva notificación personal:", data);
  //         setNotifications((prev) => prev + 1);
  //       });

  //       socketClient.onGlobalNotification((data: any) => {
  //         console.log("Mensaje global", data);
  //         // Aquí puedes manejar notificaciones globales si las necesitas
  //       });
  //     } catch (error) {
  //       console.error("Error de conexión:", error);
  //       setConnectionStatus("error");
  //     }
  //   };

  //   connectSocket();

  //   // Limpieza al desmontar el componente
  //   return () => {
  //     socketClient.disconnect();
  //   };
  // }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <Flayer />
        <CardInicio
          title="Noticias Publicadas"
          icon="document-text-outline"
          value={informaciones}
        />
        <CardInicio
          title="Alertas Generadas"
          icon="alert-circle-outline"
          value={alertas}
        />
        <CardInicio
          title="Contactos Registrados"
          icon="people-outline"
          value={contactos}
          important={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: theme.colors.background,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: sizes.screenWidth - 40,
    gap: 16,
    marginBottom: 20,
  },
  socketStatus: {
    width: sizes.screenWidth - 40,
    marginBottom: 20,
    padding: 10,
    backgroundColor: theme.colors.text,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  notificationText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "bold",
    marginTop: 5,
  },
});
