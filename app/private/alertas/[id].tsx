import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useFetch from "../../../infraestructure/lib/useFetch/useFetch";
import config from "../../../infraestructure/config/config";
import { MaterialIcons } from "@expo/vector-icons";
import { sizes } from "../../../shared/components/styles/global";
import ButtonPrimary from "../../../shared/ui/button";
import AudioPlayer from "../../../shared/components/audioPlayer/player";

export default function AlertDetail() {
  const { id } = useLocalSearchParams() as { id: string };
  const { fetchData } = useFetch();
  const { data: alert } = fetchData(`GET /v1/api/alert/byFind`, {
    params: { id },
  });

  if (!alert) return <Text>Cargando...</Text>;

  const openMap = () => {
    const { lat, lng } = alert.ubicacion;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir mapa:", err)
    );
  };

  const startTracking = () => {
    // Lógica para iniciar seguimiento
    console.log("Iniciar seguimiento para alerta:", alert.id);
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
      >
        {alert.photo.map((photo: any, index: number) => (
          <Image
            key={index}
            source={{ uri: `${config.host}${photo}` }}
            style={styles.image}
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: alert.user.photo }} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{alert.user.name}</Text>
            <Text style={styles.date}>
              {new Date(alert.date).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Audio */}
        {alert.audio && (
          <View style={styles.audioSection}>
            <Text style={styles.sectionTitle}>Audio reportado</Text>
            <AudioPlayer audioUrl={`${config.host}${alert.audio}`} />
          </View>
        )}

        {/* Ubicación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.location}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.locationText}>
              Lat: {alert.ubicacion.lat.toFixed(4)}, Lng:{" "}
              {alert.ubicacion.lng.toFixed(4)}
            </Text>
          </View>
        </View>

        {/* Información adicional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles</Text>
          <Text style={styles.detailText}>
            Reportado el {new Date(alert.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.detailText}>Estado: Activo</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonPrimary
          size="medium"
          variant="outline"
          title="Trazar mapa"
          onPress={openMap}
          icon="map-outline"
          iconType="Ionicons"
        ></ButtonPrimary>
        <ButtonPrimary
          size="medium"
          title="Seguimiento"
          variant="primary"
          icon="radio-button-on"
          iconType="Ionicons"
          onPress={startTracking}
        ></ButtonPrimary>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageGallery: {
    height: 300,
  },
  image: {
    width: sizes.screenWidth,
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 15,
    color: "#666",
    marginLeft: 6,
  },
  detailText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 4,
  },
  audioSection: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#eee",
  },
  button: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  trackingButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  trackingButtonText: {
    color: "#007AFF",
  },
});
