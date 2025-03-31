import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import Contactos from "../../../modules/inicio/contactos";
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

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <Flayer />

        <CardInicio
          title="Noticias Pubicadas"
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
      {/* <Contactos /> */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 18,
    marginTop: 20,
  },
});
