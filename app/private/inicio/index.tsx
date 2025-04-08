import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { sizes, theme } from "../../../shared/components/styles/global";
import CardInicio from "../../../modules/inicio/cardInicio";
import useFetch from "../../../infraestructure/lib/useFetch/useFetch";

export default function InicioAdmin() {
  const { fetchData } = useFetch();
  const { data } = fetchData("GET /v1/api/dashboard");

  const alertas = data?.alertas?.total || 0;
  const informaciones = data?.informaciones?.total || 0;
  const seguimientos = data?.seguimientos?.total || 0;
  const { activos, inactivos, eliminados } = data?.usuarios || {};
  return (
    <View style={styles.container}>
      <View style={styles.mainStatsContainer}>
        <Text style={styles.sectionTitleContainer}>Resumen de Usuarios</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.activeStat]}>{activos}</Text>
            <Text style={styles.statLabel}>ACTIVOS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.inactiveStat]}>
              {inactivos}
            </Text>
            <Text style={styles.statLabel}>INACTIVOS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.eliminatedStat]}>
              {eliminados}
            </Text>
            <Text style={styles.statLabel}>ELIMINADOS</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Métricas Principales</Text>
      <View style={styles.gridContainer}>
        <CardInicio
          title="Noticias Publicadas"
          icon="document-text-outline"
          value={informaciones}
        />
        <CardInicio
          title="Alertas Generadas"
          icon="alert-circle-outline"
          value={alertas}
          important={true}
        />
        <CardInicio
          title="Seguimientos"
          icon="search-outline"
          value={seguimientos}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  mainStatsContainer: {
    backgroundColor: theme.colors.text,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  activeStat: {
    color: "#4CAF50", // Verde
  },
  inactiveStat: {
    color: "#FF9800", // Naranja
  },
  eliminatedStat: {
    color: "#F44336", // Rojo
  },
  alertedStat: {
    color: "#FFEB3B", // Amarillo
  },
  statLabel: {
    color: theme.colors.basico2,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  sectionTitleContainer: {
    fontSize: sizes.fontSizeLarge,
    color: "#fff",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 15,
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
  },
});
