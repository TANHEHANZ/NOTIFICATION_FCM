import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useFetch from "../../../infraestructure/lib/useFetch/useFetch";
import config from "../../../infraestructure/config/config";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../../../shared/ui/Card";
import { sizes } from "../../../shared/components/styles/global";
import { router } from "expo-router";

export default function AlertasAdmin() {
  const { fetchData } = useFetch();
  const { data } = fetchData("GET /v1/api/alert/all");

  const handlePressAlert = (alert: any) => {
    router.push(`/private/alertas/${alert.id}`);
  };
  const renderItem = ({ item }: any) => (
    <Card
      onPress={() => handlePressAlert(item)}
      style={{ marginLeft: 10, pading: 0, overflow: "hidden" }}
    >
      <View
        style={{ width: "115%", height: "115%", position: "absolute", top: 0 }}
      >
        {item.photo[0] ? (
          <Image
            source={{ uri: `${config.host}${item.photo[0]}` }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImage}>
            <MaterialIcons name="warning" size={30} color="#fff" />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <View>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>
              {item.user.name}
            </Text>
          </View>

          {item.photo.length > 1 && (
            <View style={styles.photoCount}>
              <MaterialIcons name="photo-library" size={16} color="#fff" />
              <Text style={styles.photoCountText}>
                +{item.photo.length - 1} foto{item.photo.length > 2 ? "s" : ""}
              </Text>
            </View>
          )}
        </View>
        <MaterialIcons
          name="chevron-right"
          size={24}
          color="#fff"
          style={styles.chevron}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas recientes</Text>

      {data?.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="notifications-off" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No hay alertas registradas</Text>
        </View>
      ) : (
        <View
          style={{
            width: sizes.screenWidth,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 8,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  listContent: {
    gap: 16,
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  noImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#0009",
    width: "113%",
    position: "absolute",
    bottom: 0,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    maxWidth: "90%",
  },
  photoCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoCountText: {
    fontSize: 13,
    color: "#fff",
    marginLeft: 4,
  },
  chevron: {
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#888",
  },
});
